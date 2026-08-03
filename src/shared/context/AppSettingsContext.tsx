import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { AppSettingsContext } from './appSettingsContextImpl';
import { useTheme } from '../hooks/useTheme';
import type { ThemeMode } from '../hooks/useTheme';

interface StoredSettings {
  showCategoryDetails: boolean;
  themeMode: ThemeMode;
}

const SETTINGS_KEY = 'bantar-settings';

const isValidThemeMode = (value: unknown): value is ThemeMode => {
  return value === 'light' || value === 'dark' || value === 'system';
};

interface AppSettingsProviderProps {
  children: ReactNode;
}

export const AppSettingsProvider = ({ children }: AppSettingsProviderProps) => {
  const [storedSettings, setStoredSettings] = useState<StoredSettings>(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as StoredSettings;
        return {
          showCategoryDetails: parsed.showCategoryDetails ?? false,
          themeMode: isValidThemeMode(parsed.themeMode) ? parsed.themeMode : 'system'
        };
      }
    } catch (error) {
      console.error('Failed to parse settings from localStorage:', error);
    }
    return { showCategoryDetails: false, themeMode: 'system' };
  });

  const { themeMode, resolvedTheme, setThemeMode } = useTheme(storedSettings.themeMode);

  useEffect(() => {
    setStoredSettings((prev) => ({ ...prev, themeMode }));
  }, [themeMode]);

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(storedSettings));
    } catch (err) {
      console.error('Failed to save settings to localStorage:', err);
    }
  }, [storedSettings]);

  const setShowCategoryDetails = (value: boolean) => {
    setStoredSettings((prev) => ({ ...prev, showCategoryDetails: value }));
  };

  return (
    <AppSettingsContext.Provider
      value={{
        showCategoryDetails: storedSettings.showCategoryDetails,
        themeMode,
        resolvedTheme,
        setShowCategoryDetails,
        setThemeMode
      }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
};

