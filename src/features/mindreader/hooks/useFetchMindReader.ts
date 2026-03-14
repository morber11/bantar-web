import { useQuery } from '@tanstack/react-query';
import { fetchMindReaderPrompts } from '../api';
import { useOfflineFallback } from '../../../shared/offline/useOfflineFallback';
import type { MindReaderPrompt } from '../types';

const useFetchMindReader = () => {
    const query = useQuery<MindReaderPrompt[], Error>({
        queryKey: ['mindreader'],
        queryFn: fetchMindReaderPrompts
    });

    return useOfflineFallback('mindreader', query);
};

export default useFetchMindReader;