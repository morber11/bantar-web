import { createContext, useContext } from 'react';

interface AppSettings {
    showCategoryDetails: boolean;
}

interface AppSettingsContextType extends AppSettings {
    setShowCategoryDetails: (value: boolean) => void;
}

export const AppSettingsContext = createContext<AppSettingsContextType | undefined>(undefined);

export const useAppSettings = () => {
    const context = useContext(AppSettingsContext);
    if (!context) {
        throw new Error('useAppSettings must be used within AppSettingsProvider');
    }
    return context;
};
