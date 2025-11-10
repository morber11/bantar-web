import { useEffect, useState } from 'react';
import { fetchMindReaderPrompts } from '../api';
import type { MindReaderPrompt } from '../types';

const useFetchMindReader = () => {
    const [list, setList] = useState<MindReaderPrompt[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPrompts = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchMindReaderPrompts();
                setList(data);
            } catch (err) {
                console.error('Failed to load mind reader prompts', err);
                setError('Unable to load mind reader prompts');
            } finally {
                setLoading(false);
            }
        };

        loadPrompts();
    }, []);

    return { list, loading, error };
};

export default useFetchMindReader;