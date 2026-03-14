import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchDebatesByCategories } from '../api';
import type { DebateItem } from '../types';

const useFetchDebates = (categories: string[] = []) => {
    const enabled = categories && categories.length > 0;
    const key = useMemo(() => ['debates', { categories }], [categories]);

    const query = useQuery<DebateItem[], Error>({
        queryKey: key,
        queryFn: () => fetchDebatesByCategories(categories),
        enabled,
    });

    return { list: query.data ?? [], loading: query.isLoading, error: query.error?.message ?? null };
};

export default useFetchDebates;
