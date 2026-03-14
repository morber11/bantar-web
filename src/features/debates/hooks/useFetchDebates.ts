import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchDebatesByCategories } from '../api';
import { useOfflineFallback } from '../../../shared/offline/useOfflineFallback';
import type { DebateItem } from '../types';

const useFetchDebates = (categories: string[] = []) => {
    const key = useMemo(() => ['debates', { categories }], [categories]);

    const query = useQuery<DebateItem[], Error>({
        queryKey: key,
        queryFn: () => fetchDebatesByCategories(categories),
        enabled: categories.length > 0,
    });

    return useOfflineFallback('debates', query, { writeOnSuccess: false });
};

export default useFetchDebates;
