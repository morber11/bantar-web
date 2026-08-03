import { useEffect, useState, type ReactNode } from 'react';
import type { HistoryType } from '../../../shared/types/history';
import { generateId } from '../../../shared/utils/generateId';
import type { FavouriteItem } from '../types';
import { FavouritesContext } from './favouritesContextTypes';

const FAV_KEY = 'bantar-favourites';
const MAX_FAV_ITEMS = 300;

function loadFromStorage(): FavouriteItem[] {
    try {
        const stored = localStorage.getItem(FAV_KEY);
        return stored ? (JSON.parse(stored) as FavouriteItem[]) : [];
    } catch (err) {
        console.error('[favourites] failed to parse favourites from localStorage', err);
        return [];
    }
}

function saveToStorage(items: FavouriteItem[]): void {
    try {
        localStorage.setItem(FAV_KEY, JSON.stringify(items.slice(0, MAX_FAV_ITEMS)));
    } catch (err) {
        console.error('[favourites] failed to persist favourites', err);
    }
}

function dedupeByTextType(items: FavouriteItem[]): FavouriteItem[] {
    const seen = new Set<string>();
    const result: FavouriteItem[] = [];
    for (const it of items) {
        const key = `${it.type}:${it.text}`;
        if (!seen.has(key)) {
            seen.add(key);
            result.push(it);
        }
    }
    return result;
}

export function FavouritesProvider({ children }: { children: ReactNode }) {
    const [favourites, setFavourites] = useState<FavouriteItem[]>(loadFromStorage);

    useEffect(() => {
        const storageHandler = (event: StorageEvent) => {
            if (event.storageArea === localStorage && event.key === FAV_KEY) {
                try {
                    const newFavourites = event.newValue ? (JSON.parse(event.newValue) as FavouriteItem[]) : [];
                    setFavourites(newFavourites);
                } catch (err) {
                    console.error('[favourites] failed to parse favourites from storage event', err);
                }
            }
        };

        window.addEventListener('storage', storageHandler);
        return () => window.removeEventListener('storage', storageHandler);
    }, []);

    useEffect(() => {
        saveToStorage(favourites);
    }, [favourites]);

    const addToFavourites = (item: Omit<FavouriteItem, 'id' | 'timestamp'>): FavouriteItem => {
        const newItem: FavouriteItem = {
            ...item,
            id: generateId(item.type),
            timestamp: Date.now(),
        };

        setFavourites(prev => {
            const exists = prev.some(f => f.text === item.text && f.type === item.type);
            if (exists) {
                return prev;
            }

            const updated = dedupeByTextType([newItem, ...prev]).slice(0, MAX_FAV_ITEMS);

            return updated;
        });

        return newItem;
    };

    const removeFromFavourites = (id: string): void => {
        setFavourites(prev => {
            return prev.filter(f => f.id !== id);
        });
    };

    const toggleFavourite = (item: Omit<FavouriteItem, 'id' | 'timestamp'>): void => {
        setFavourites(prev => {
            const existing = prev.find(f => f.text === item.text && f.type === item.type);

            if (existing) {
                return prev.filter(f => f.id !== existing.id);
            }

            const newItem: FavouriteItem = {
                ...item,
                id: generateId(item.type),
                timestamp: Date.now(),
            };

            return dedupeByTextType([newItem, ...prev]).slice(0, MAX_FAV_ITEMS);
        });
    };

    const isFavourited = (text: string, type: HistoryType): boolean => {
        return favourites.some(f => f.text === text && f.type === type);
    };

    const clearFavourites = (): void => {
        setFavourites([]);
    };

    return (
        <FavouritesContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
                toggleFavourite,
                isFavourited,
                clearFavourites,
            }}
        >
            {children}
        </FavouritesContext.Provider>
    );
}