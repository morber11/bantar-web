import { useEffect, useState } from 'react';
import type { HistoryType } from '../../../shared/types/history';
import { generateId } from '../../../shared/utils/generateId';

export interface FavouriteItem {
    id: string;
    text: string;
    type: HistoryType;
    categories?: string[];
    timestamp: number;
}

const FAV_KEY = 'bantar-favourites';
const MAX_FAV_ITEMS = 300; // arbitrary amount

export const useFavourites = () => {
    const [favourites, setFavourites] = useState<FavouriteItem[]>(() => {
        if (typeof window === 'undefined') return [];
        try {
            const stored = localStorage.getItem(FAV_KEY);
            
            return stored ? (JSON.parse(stored) as FavouriteItem[]) : [];
        } catch (err) {
            console.error('[favourites] failed to parse favourites from localStorage', err);
            return [];
        }
    });

    useEffect(() => {
        const handler = (event: StorageEvent) => {
            if (event.storageArea === localStorage && event.key === FAV_KEY) {
                try {
                    setFavourites(event.newValue ? (JSON.parse(event.newValue) as FavouriteItem[]) : []);
                } catch (err) {
                    console.error('[favourites] failed to parse favourites from storage event', err);
                }
            }
        };
        window.addEventListener('storage', handler);
        return () => window.removeEventListener('storage', handler);
    }, []);

    const persist = (items: FavouriteItem[]) => {
        try {
            if (typeof window !== 'undefined') {
                localStorage.setItem(FAV_KEY, JSON.stringify(items.slice(0, MAX_FAV_ITEMS)));
            }
        } catch (err) {
            console.error('[favourites] failed to persist favourites', err);
        }
    };

    const addToFavourites = (item: Omit<FavouriteItem, 'id' | 'timestamp'>) => {
        const next: FavouriteItem = {
            ...item,
            id: generateId(item.type),
            timestamp: Date.now(),
        };

        setFavourites(prev => {
            const exists = prev.some(f => f.text === item.text && f.type === item.type);
            
            if (exists) {
                return prev;
            }

            const updated = [next, ...prev];
            persist(updated);

            return updated;
        });

        return next;
    };

    const removeFromFavourites = (id: string) => {
        setFavourites(prev => {
            const updated = prev.filter(f => f.id !== id);
            persist(updated);

            return updated;
        });
    };

    const isFavourited = (text: string, type: HistoryType) => {
        return favourites.some(f => f.text === text && f.type === type);
    };

    const toggleFavourite = (item: Omit<FavouriteItem, 'id' | 'timestamp'>) => {
        setFavourites(prev => {
            const existing = prev.find(f => f.text === item.text && f.type === item.type);
            let updated: FavouriteItem[];

            if (existing) {
                updated = prev.filter(f => f.id !== existing.id);
            } else {
                const next: FavouriteItem = {
                    ...item,
                    id: generateId(item.type),
                    timestamp: Date.now(),
                };
                updated = [next, ...prev];
            }
            persist(updated);

            return updated;
        });
    };

    const clearFavourites = () => {
        setFavourites([]);
        try {
            if (typeof window !== 'undefined') {
                localStorage.removeItem(FAV_KEY);
            }
        } catch (err) {
            console.error('[favourites] failed to clear favourites', err);
        }
    };

    return {
        favourites,
        addToFavourites,
        removeFromFavourites,
        toggleFavourite,
        isFavourited,
        clearFavourites,
    };
};

export default useFavourites;