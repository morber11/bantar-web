import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchIcebreakersByCategories } from '../api';
import type { ListItem } from '../types';

const useFetchIcebreakers = (categories: string[] = []) => {
    const enabled = categories && categories.length > 0;
    const key = useMemo(() => ['icebreakers', { categories }], [categories]);

    const query = useQuery<ListItem[], Error>({
        queryKey: key,
        queryFn: () => fetchIcebreakersByCategories(categories),
        enabled,
    });

    return {
        list: query.data ?? [],
        loading: query.isLoading,
        error: query.error?.message ?? null
    };
};

export default useFetchIcebreakers;
