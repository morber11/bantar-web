import { useState, useEffect } from 'react';
import { fetchAllSlop } from '../api';
import type { AiItem } from '../types';

const useFetchAllSlop = () => {
    const [list, setList] = useState<AiItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchAllSlop();
                if (mounted) setList(data);
            } catch (err) {
                setError('Error fetching AI items');
                console.error(err);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchData();
        return () => {
            mounted = false;
        };
    }, []);

    return { list, loading, error };
};

export default useFetchAllSlop;