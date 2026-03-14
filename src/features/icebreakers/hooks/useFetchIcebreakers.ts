import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchIcebreakersByCategories } from '../api';
import { useOfflineFallback } from '../../../shared/offline/useOfflineFallback';
import type { ListItem } from '../types';

const useFetchIcebreakers = (categories: string[] = []) => {
    const key = useMemo(() => ['icebreakers', { categories }], [categories]);

    const query = useQuery<ListItem[], Error>({
        queryKey: key,
        queryFn: () => fetchIcebreakersByCategories(categories),
        enabled: categories.length > 0,
    });

    return useOfflineFallback('icebreakers', query, {
        writeOnSuccess: false,
        filterFn: (item) => item.categories.some(c => categories.includes(c)),
    });
};

export default useFetchIcebreakers;
