import { useState, useEffect } from 'react';
import { fetchDebatesByCategories } from '../api';
import type { DebateItem } from '../types';

const useFetchByCategories = (categories: string[] = []) => {
  const [list, setList] = useState<DebateItem[]>([]);
  const [loading, setLoading] = useState<boolean>(categories && categories.length > 0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchDebatesByCategories(categories);
        setList(data);
      } catch (err) {
        setError('Error fetching debates by categories');
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
