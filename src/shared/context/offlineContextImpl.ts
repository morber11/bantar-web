import { useContext } from 'react';
import { OfflineContext, type OfflineContextValue } from './offlineContextTypes';

export function useOffline(): OfflineContextValue {
    const ctx = useContext(OfflineContext);

    if (!ctx) throw new Error('useOffline must be used within OfflineProvider');

    return ctx;
}
