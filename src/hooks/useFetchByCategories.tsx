import { useState, useEffect } from 'react';
import { fetchQuestionsByCategories } from '../api/apiService';
import type { ListItem } from '../types';

const useFetchByCategories = (categories: string[] = []) => {
    const [list, setList] = useState<ListItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchQuestionsByCategories(categories);
                setList(data);
            } catch (err) {
                setError('Error fetching questions by categories');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (categories && categories.length > 0) {
            fetchData();
        } else {
            setList([]);
        }
    }, [categories]);

    return { list, loading, error };
};

export default useFetchByCategories;
