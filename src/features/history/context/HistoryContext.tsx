import { useState, useEffect, useMemo, type ReactNode } from 'react';
import { generateId } from '../../../shared/utils/generateId';
import { HistoryContext, type HistoryItem } from './historyContextTypes';

const HISTORY_KEY = 'bantar-history:v1';
const MAX_HISTORY_ITEMS = 50;

function loadFromStorage(): HistoryItem[] {
    try {
        const stored = localStorage.getItem(HISTORY_KEY);
        return stored ? (JSON.parse(stored) as HistoryItem[]) : [];
    } catch (err) {
        console.error('[history] failed to parse history from localStorage', err);
        return [];
    }
}

export function HistoryProvider({ children }: { children: ReactNode }) {
    const [history, setHistory] = useState<HistoryItem[]>(loadFromStorage);

    useEffect(() => {
        const storageHandler = (event: StorageEvent) => {
            if (event.storageArea === localStorage && event.key === HISTORY_KEY) {
                try {
                    const updated = event.newValue
                        ? (JSON.parse(event.newValue) as HistoryItem[])
                        : [];
                    setHistory(updated);
                } catch (err) {
                    console.error('[history] failed to parse history from storage event', err);
                }
            }
        };

        window.addEventListener('storage', storageHandler);
        return () => window.removeEventListener('storage', storageHandler);
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
        } catch (err) {
            console.error('[history] failed to write to localStorage', err);
        }
    }, [history]);

    const addToHistory = (item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
        const newItem: HistoryItem = {
            ...item,
            id: generateId(item.type),
            timestamp: Date.now(),
        };

        setHistory(prev => {
            const filtered = prev.filter(h => !(h.text === item.text && h.type === item.type));
            return [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);
        });
    };

    const clearHistory = () => {
        setHistory([]);
    };

    const removeFromHistory = (id: string) => {
        setHistory(prev => prev.filter(item => item.id !== id));
    };

    const contextValue = useMemo(
        () => ({ history, addToHistory, clearHistory, removeFromHistory }),
        [history]
    );

    return (
        <HistoryContext.Provider value={contextValue}>
            {children}
        </HistoryContext.Provider>
    );
}
