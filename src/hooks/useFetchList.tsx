import { useState, useEffect } from 'react';
import { fetchAllQuestions } from '../api/apiService';
import type { ListItem } from '../types';

const useFetchList = () => {
    const [list, setList] = useState<ListItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchAllQuestions();

                setList(data);
            } catch (error) {
                setError('Error fetching the list');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { list, loading, error };
};

export default useFetchList;
