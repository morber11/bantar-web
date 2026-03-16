import { useMemo, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllEvents } from '../api';
import type { EventItem } from '../types';

export function useFetchEvents(opts?: { simulateMountLoading?: boolean; minMsRange?: [number, number] }) {
    const key = useMemo(() => ['events-list'], []);

    const query = useQuery<EventItem[], Error>({
        queryKey: key,
        queryFn: () => fetchAllEvents(),
    });

    const simulate = opts?.simulateMountLoading ?? false;
    const range: [number, number] = opts?.minMsRange ?? [800, 1200];

    function getRandomBetween(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const [minLoading, setMinLoading] = useState<boolean>(simulate ? true : false);

    // simulate loading on mount so navigating into the page shows spinner
    useEffect(() => {
        if (!simulate) return;
        const minMs = getRandomBetween(range[0], range[1]);
        const timer = setTimeout(() => setMinLoading(false), minMs);
        return () => clearTimeout(timer);
    }, [simulate]);

    const loading = query.isLoading || minLoading;
    
    // events returns events detail with a list of questions in it - need to flatten to get questions
    const list = (query.data ?? []).flatMap((ev) => {
        const label = ev.friendlyName ?? ev.name;
        if (!ev.questions || ev.questions.length === 0) return [] as Array<{ id: string; text: string; categories?: string[] }>;
        return ev.questions.map((q) => ({ id: `${ev.id}-${q.id}`, text: q.text, categories: [label] }));
    });

    const eventName = query.data?.[0]?.friendlyName ?? query.data?.[0]?.name ?? 'Events';
    const eventStyle = query.data?.[0]?.style?.style ?? null;
    const available = !query.isError && (query.data?.length ?? 0) > 0;

    return {
        list,
        eventName,
        eventStyle,
        available,
        loading,
        error: query.isError ? (query.error?.message ?? 'Unknown error') : null,
    };
}
