import { useQuery } from '@tanstack/react-query';
import { fetchAllSlop } from '../api';
import type { AiItem } from '../types';

const useFetchAllSlop = () => {
    const query = useQuery<AiItem[], Error>({ 
        queryKey: ['ai', 'allSlop'],
        queryFn: fetchAllSlop 
    });
    
    return {
        list: query.data ?? [],
        loading: query.isLoading,
        error: query.error?.message ?? null
    };
};

export default useFetchAllSlop;