import { createContext, useContext } from 'react';
import type { ThemeMode, ResolvedTheme } from '../hooks/useTheme';

interface AppSettings {
    showCategoryDetails: boolean;
    themeMode: ThemeMode;
    resolvedTheme: ResolvedTheme;
}

interface AppSettingsContextType extends AppSettings {
    setShowCategoryDetails: (value: boolean) => void;
    setThemeMode: (mode: ThemeMode) => void;
}

export const AppSettingsContext = createContext<AppSettingsContextType | undefined>(undefined);

export const useAppSettings = () => {
    const context = useContext(AppSettingsContext);
    if (!context) {
        throw new Error('useAppSettings must be used within AppSettingsProvider');
    }
    return context;
};
