import { useQuery } from '@tanstack/react-query';
import { fetchMindReaderPrompts } from '../api';
import type { MindReaderPrompt } from '../types';

const useFetchMindReader = () => {
    const query = useQuery<MindReaderPrompt[], Error>({ queryKey: ['mindreader'], queryFn: fetchMindReaderPrompts });

    return {
        list: query.data ?? [],
        loading: query.isLoading,
        error: query.error?.message ?? null
    };
};

export default useFetchMindReader;