import type { ReactNode } from 'react';
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { HistoryProvider } from './HistoryContext';
import { useHistory } from '../hooks/useHistory';

const wrapper = ({ children }: { children: ReactNode }) => (
    <HistoryProvider>{children}</HistoryProvider>
);

describe('HistoryProvider', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('moves a repeated item to the top instead of duplicating it', () => {
        const { result } = renderHook(() => useHistory(), { wrapper });

        act(() => result.current.addToHistory({ text: 'first', type: 'icebreaker' }));
        act(() => result.current.addToHistory({ text: 'second', type: 'icebreaker' }));
        act(() => result.current.addToHistory({ text: 'first', type: 'icebreaker' }));

        expect(result.current.history.map(item => item.text)).toEqual(['first', 'second']);
    });

    it('keeps only the 50 most recent items', () => {
        const { result } = renderHook(() => useHistory(), { wrapper });

        for (let i = 1; i <= 51; i++) {
            act(() => result.current.addToHistory({ text: `item ${i}`, type: 'debate' }));
        }

        expect(result.current.history).toHaveLength(50);
        expect(result.current.history[0].text).toBe('item 51');
        expect(result.current.history.some(item => item.text === 'item 1')).toBe(false);
    });
});
