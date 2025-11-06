import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { AppSettingsContext } from './appSettingsContextImpl';

interface AppSettings {
  showCategoryDetails: boolean;
}

const SETTINGS_KEY = 'bantar-settings';

export const AppSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [settings, setSettings] = useState<AppSettings>(() => {
    if (typeof window === 'undefined') {
      return { showCategoryDetails: false };
    }
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (stored) {
        return JSON.parse(stored) as AppSettings;
      }
    } catch (error) {
      console.error('Failed to parse settings from localStorage:', error);
    }
    return { showCategoryDetails: false };
  });

  const setShowCategoryDetails = (value: boolean) => {
    setSettings((prev) => {
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
    <AppSettingsContext.Provider value={{ ...settings, setShowCategoryDetails }}>
      {children}
    </AppSettingsContext.Provider>
  );
};

