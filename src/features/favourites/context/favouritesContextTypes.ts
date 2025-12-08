import { createContext } from 'react';
import type { HistoryType } from '../../../shared/types/history';
import type { FavouriteItem } from '../types';

export interface FavouritesContextValue {
    favourites: FavouriteItem[];
    addToFavourites: (item: Omit<FavouriteItem, 'id' | 'timestamp'>) => FavouriteItem;
    removeFromFavourites: (id: string) => void;
    toggleFavourite: (item: Omit<FavouriteItem, 'id' | 'timestamp'>) => void;
    isFavourited: (text: string, type: HistoryType) => boolean;
    clearFavourites: () => void;
}

export const FavouritesContext = createContext<FavouritesContextValue | null>(null);
