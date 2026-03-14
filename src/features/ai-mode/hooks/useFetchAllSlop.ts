import { useQuery } from '@tanstack/react-query';
import { fetchAllSlop } from '../api';
import { useOfflineFallback } from '../../../shared/offline/useOfflineFallback';
import type { SlopItem } from '../types';

const useFetchAllSlop = () => {
    const query = useQuery<SlopItem[], Error>({
        queryKey: ['slop', 'allSlop'],
        queryFn: fetchAllSlop
    });

    return useOfflineFallback('slop', query);
};

export default useFetchAllSlop;