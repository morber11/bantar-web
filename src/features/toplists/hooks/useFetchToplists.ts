import { useQuery } from '@tanstack/react-query';
import { fetchToplists } from '../api';
import type { ListItem } from '../types';

const useFetchTopLists = () => {
    const query = useQuery<ListItem[], Error>({
        queryKey: ['toplists'],
        queryFn: fetchToplists
    });

    return {
        list: query.data ?? [],
        loading: query.isLoading,
        error: query.error?.message ?? null
    };
};

export default useFetchTopLists;
