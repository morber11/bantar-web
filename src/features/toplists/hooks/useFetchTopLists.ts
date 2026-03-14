import { useQuery } from '@tanstack/react-query';
import { fetchToplists } from '../api';
import { useOfflineFallback } from '../../../shared/offline/useOfflineFallback';
import type { ListItem } from '../types';

const useFetchTopLists = () => {
    const query = useQuery<ListItem[], Error>({
        queryKey: ['toplists'],
        queryFn: fetchToplists
    });

    return useOfflineFallback('toplists', query);
};

export default useFetchTopLists;
