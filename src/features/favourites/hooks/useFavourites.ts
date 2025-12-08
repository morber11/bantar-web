import { useContext } from 'react';
import { FavouritesContext } from '../context/favouritesContextTypes';

export function useFavourites() {
    const context = useContext(FavouritesContext);

    if (context === undefined) {
        throw new Error('useFavourites must be used within FavouritesProvider');
    }

    return context;
}