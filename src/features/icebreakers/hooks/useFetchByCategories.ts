import { useState, useEffect } from 'react';
import { fetchIcebreakersByCategories } from '../api';
import type { ListItem } from '../types';

const useFetchByCategories = (categories: string[] = []) => {
  const [list, setList] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(categories && categories.length > 0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchIcebreakersByCategories(categories);
        setList(data);
      } catch (err) {
        setError('Error fetching icebreakers by categories');
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
