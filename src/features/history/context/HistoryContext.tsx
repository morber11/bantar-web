import { useState, useEffect, type ReactNode } from 'react';
import { generateId } from '../../../shared/utils/generateId';
import { HistoryContext, type HistoryItem } from './historyContextTypes';

const HISTORY_KEY = 'bantar-history';
const MAX_HISTORY_ITEMS = 50;

function loadFromStorage(): HistoryItem[] {
    if (typeof window === 'undefined') return [];
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

    const addToHistory = (item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
        const newItem: HistoryItem = {
            ...item,
            id: generateId(item.type),
            timestamp: Date.now(),
        };

        setHistory(prev => {
            const filtered = prev.filter(h => !(h.text === item.text && h.type === item.type));
            const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);
            try {
                localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
            } catch (err) {
                console.error('[history] failed to write to localStorage', err);
            }
            return updated;
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

    return (
        <HistoryContext.Provider value={{ history, addToHistory, clearHistory, removeFromHistory }}>
            {children}
        </HistoryContext.Provider>
    );
}
