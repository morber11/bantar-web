import { useState, useEffect } from 'react';

export interface HistoryItem {
  id: string;
  text: string;
  type: 'icebreaker' | 'debate'; // for now - can be extended later
  timestamp: number;
}

const HISTORY_KEY = 'bantar-history';
const MAX_HISTORY_ITEMS = 50;

export const useHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse history from localStorage:', error);
        setHistory([]);
      }
    }
  }, []);

  const addToHistory = (item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
    const newItem: HistoryItem = {
      ...item,
      id: `${item.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
    };

    setHistory(prev => {
      const filtered = prev.filter(h => !(h.text === item.text && h.type === item.type));
      const updated = [newItem, ...filtered];

      const trimmed = updated.slice(0, MAX_HISTORY_ITEMS);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
      return trimmed;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  const removeFromHistory = (id: string) => {
    setHistory(prev => {
      const updated = prev.filter(item => item.id !== id);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return {
    history,
    addToHistory,
    clearHistory,
    removeFromHistory,
  };
};