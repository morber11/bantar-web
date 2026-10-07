import type { ReactNode } from 'react';
import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { FavouritesProvider } from './FavouritesContext';
import { useFavourites } from '../hooks/useFavourites';

const wrapper = ({ children }: { children: ReactNode }) => (
    <FavouritesProvider>{children}</FavouritesProvider>
);

const debate = { text: 'Is a hot dog a sandwich?', type: 'debate' } as const;

describe('FavouritesProvider', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('toggling an item adds it, and toggling again removes it', () => {
        const { result } = renderHook(() => useFavourites(), { wrapper });

        act(() => result.current.toggleFavourite(debate));
        expect(result.current.isFavourited(debate.text, debate.type)).toBe(true);

        act(() => result.current.toggleFavourite(debate));
        expect(result.current.isFavourited(debate.text, debate.type)).toBe(false);
    });

    it('does not store the same text and type twice', () => {
        const { result } = renderHook(() => useFavourites(), { wrapper });

        act(() => {
            result.current.addToFavourites(debate);
            result.current.addToFavourites(debate);
        });

        expect(result.current.favourites).toHaveLength(1);
    });

    it('keeps favourites after the app is reloaded', () => {
        const first = renderHook(() => useFavourites(), { wrapper });
        act(() => first.result.current.toggleFavourite(debate));
        first.unmount();

        const second = renderHook(() => useFavourites(), { wrapper });

        expect(second.result.current.isFavourited(debate.text, debate.type)).toBe(true);
    });

    it('starts empty and logs an error when stored favourites are corrupt', () => {
        const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
        localStorage.setItem('bantar-favourites:v1', '{not json');

        const { result } = renderHook(() => useFavourites(), { wrapper });

        expect(result.current.favourites).toEqual([]);
        expect(consoleError).toHaveBeenCalled();
    });
});
