import { createContext, useContext } from 'react';
import type { HistoryItemShape } from '../../../shared/types/history';

export type HistoryItem = HistoryItemShape;

export interface HistoryContextValue {
    history: HistoryItem[];
    addToHistory: (item: Omit<HistoryItem, 'id' | 'timestamp'>) => void;
    clearHistory: () => void;
    removeFromHistory: (id: string) => void;
}

export const HistoryContext = createContext<HistoryContextValue | undefined>(undefined);

export const useHistoryContext = (): HistoryContextValue => {
    const context = useContext(HistoryContext);
    if (!context) {
        throw new Error('useHistory must be used within HistoryProvider');
    }

    return context;
};