import React, { useState, useEffect } from 'react';
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

export const AppSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [storedSettings, setStoredSettings] = useState<StoredSettings>(() => {
    if (typeof window === 'undefined') {
      return { showCategoryDetails: false, themeMode: 'system' };
    }
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
    setStoredSettings((prev) => {
      const newSettings = { ...prev, themeMode };
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
        }
      } catch (err) {
        console.error('Failed to save settings to localStorage:', err);
      }
      return newSettings;
    });
  }, [themeMode]);

  const setShowCategoryDetails = (value: boolean) => {
    setStoredSettings((prev) => {
      const newSettings = { ...prev, showCategoryDetails: value };
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
        }
      } catch (err) {
        console.error('Failed to save settings to localStorage:', err);
      }
      return newSettings;
    });
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

