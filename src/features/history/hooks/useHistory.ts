import { useState, useEffect } from 'react';
import type { HistoryItemShape } from '../../../shared/types/history';
import { generateId } from '../../../shared/utils/generateId';

export type HistoryItem = HistoryItemShape;

const HISTORY_KEY = 'bantar-history';
const MAX_HISTORY_ITEMS = 50;

export const useHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
        return;
      }
    } catch (err) {
      console.error('Failed to parse history from localStorage:', err);
    }
    setHistory([]);
  }, []);

  const addToHistory = (item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
    const newItem: HistoryItem = {
      ...item,
      id: generateId(item.type),
      timestamp: Date.now(),
    };

    setHistory(prev => {
      const filtered = prev.filter(h => !(h.text === item.text && h.type === item.type));
      const updated = [newItem, ...filtered];

      const trimmed = updated.slice(0, MAX_HISTORY_ITEMS);
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
      } catch (err) {
        console.error('[history] failed to write to localStorage', err);
      }
      return trimmed;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch (err) {
      console.error('[history] failed to remove history from localStorage', err);
    }
  };

  const removeFromHistory = (id: string) => {
    setHistory(prev => {
      const updated = prev.filter(item => item.id !== id);
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('[history] failed to write to localStorage', err);
      }
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