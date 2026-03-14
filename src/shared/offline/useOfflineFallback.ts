import { useState, useEffect } from 'react';
import type { UseQueryResult } from '@tanstack/react-query';
import { readCache, writeCache, type CacheKey } from './offlineCache';
import { useOffline } from '../context/offlineContextImpl';

interface Options {
    writeOnSuccess?: boolean;
}

function getRandomBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function useOfflineFallback<T>(
    cacheKey: CacheKey,
    query: UseQueryResult<T[], Error>,
    { writeOnSuccess = true }: Options = {}
): { list: T[]; loading: boolean; error: string | null } {
    const { reportOffline } = useOffline();
    const [cachedFallback, setCachedFallback] = useState<T[] | null>(null);
    const [minLoading, setMinLoading] = useState(true);

    // on mount for user experience, simulate loading as otherwise it changes instantly
    // bonus feature - we can lie about improving performance by reducing this number
    useEffect(() => {
        const timer = setTimeout(() => setMinLoading(false), getRandomBetween(800, 1600));
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        let cancelled = false;

        if (query.isSuccess) {
            if (writeOnSuccess && query.data.length > 0) {
                void writeCache<T>(cacheKey, query.data);
            }
            reportOffline(false);
            setCachedFallback(null);
        } else if (query.isError && cachedFallback === null) {
            reportOffline(true);
            readCache<T>(cacheKey).then(cached => {
                if (!cancelled && cached) {
                    setCachedFallback(cached);
                }
            }).catch(() => undefined);
        }

        return () => { cancelled = true; };
    }, [query.isSuccess, query.isError, query.data, cacheKey, writeOnSuccess, reportOffline, cachedFallback]);

    return {
        list: query.isError && cachedFallback !== null ? cachedFallback : (query.data ?? []),
        loading: query.isLoading || minLoading,
        error: query.isError && cachedFallback === null && !minLoading ? (query.error?.message ?? null) : null,
    };
}
