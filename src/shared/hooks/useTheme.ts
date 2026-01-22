import { useState, useEffect } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

interface UseThemeReturn {
    themeMode: ThemeMode;
    resolvedTheme: ResolvedTheme;
    setThemeMode: (mode: ThemeMode) => void;
}

export function useTheme(initialMode: ThemeMode = 'system'): UseThemeReturn {
    const [themeMode, setThemeMode] = useState<ThemeMode>(initialMode);

    const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => {
        if (typeof window === 'undefined') {
            return 'light';
        }

        if (initialMode === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }

        return initialMode as ResolvedTheme;
    });

    useEffect(() => {
        if (typeof window === 'undefined' || themeMode !== 'system') {
            return;
        }

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
            const newTheme = e.matches ? 'dark' : 'light';
            
            setResolvedTheme(newTheme);
        };

        handleChange(mediaQuery);

        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [themeMode]);

    useEffect(() => {
        if (themeMode === 'system') {
            if (typeof window !== 'undefined') {
                const matches = window.matchMedia('(prefers-color-scheme: dark)').matches;

                setResolvedTheme(matches ? 'dark' : 'light');
            }
        } else {
            setResolvedTheme(themeMode as ResolvedTheme);
        }
    }, [themeMode]);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        if (resolvedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [resolvedTheme]);

    return {
        themeMode,
        resolvedTheme,
        setThemeMode,
    };
}
