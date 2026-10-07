import type { ReactNode } from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useOfflineFallback } from './useOfflineFallback';
import { readCache } from './offlineCache';
import { OfflineProvider } from '../context/OfflineContext';

vi.mock('./offlineCache', () => ({
    readCache: vi.fn(),
    writeCache: vi.fn(),
}));

type Item = { text: string; category: string };

const cachedItems: Item[] = [
    { text: 'kept', category: 'a' },
    { text: 'filtered out', category: 'b' },
];

let queryClient: QueryClient;

const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
        <OfflineProvider>{children}</OfflineProvider>
    </QueryClientProvider>
);

const useFailingRequest = () => {
    const query = useQuery<Item[], Error>({
        queryKey: ['items'],
        queryFn: () => Promise.reject(new Error('network down')),
    });

    return useOfflineFallback<Item>('debates', query, {
        filterFn: item => item.category === 'a',
    });
};

describe('useOfflineFallback', () => {
    beforeEach(() => {
        queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
        vi.spyOn(Math, 'random').mockReturnValue(0);
    });

    it('serves the cached items matching the filter when the request fails', async () => {
        vi.mocked(readCache).mockResolvedValue(cachedItems);

        const { result } = renderHook(() => useFailingRequest(), { wrapper });

        await waitFor(() => expect(result.current.list).toEqual([cachedItems[0]]), { timeout: 3000 });

        expect(result.current.error).toBeNull();
    });

    it('reports the error when the request fails and nothing is cached', async () => {
        vi.mocked(readCache).mockResolvedValue(null);

        const { result } = renderHook(() => useFailingRequest(), { wrapper });

        await waitFor(() => expect(result.current.error).toBe('network down'), { timeout: 3000 });

        expect(result.current.list).toEqual([]);
    });
});
