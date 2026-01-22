import React from 'react';
import { useAppSettings } from '../context/appSettingsContextImpl';
import type { ThemeMode } from '../hooks/useTheme';

const getButtonClassName = (currentMode: ThemeMode, buttonMode: ThemeMode, resolvedTheme: 'light' | 'dark'): string => {
  const isActive = currentMode === buttonMode;

  if (isActive) {
    return resolvedTheme === 'dark'
      ? 'bg-slate-700 text-white'
      : 'bg-slate-200 text-slate-900';
  }

  return 'bg-transparent text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/30';
};

const ThemeToggle: React.FC = () => {
  const { themeMode, resolvedTheme, setThemeMode } = useAppSettings();

  const buttons: Array<{ mode: ThemeMode; label: string }> = [
    { mode: 'light', label: 'Light' },
    { mode: 'dark', label: 'Dark' },
    { mode: 'system', label: 'System' },
  ];

  return (
    <div className="text-slate-700 dark:text-slate-200">
      <div className="mb-2 font-medium">Theme</div>
      <div className="flex items-center space-x-2">
        {buttons.map(({ mode, label }) => (
          <button
            key={mode}
            aria-pressed={themeMode === mode}
            onClick={() => setThemeMode(mode)}
            className={`px-3 py-1 rounded-md transition-all ${getButtonClassName(themeMode, mode, resolvedTheme)}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeToggle;
