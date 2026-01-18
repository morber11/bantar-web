import { useEffect, useState } from 'react';
import { fetchToplists } from '../api';
import type { ListItem } from '../types';

const useFetchToplists = () => {
    const [list, setList] = useState<ListItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchToplists();
                setList(data);
            } catch (err) {
                console.error('Failed to load top lists', err);
                setError('Unable to load top lists');
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    return { list, loading, error };
};

export default useFetchToplists;
