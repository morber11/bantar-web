import { createContext } from 'react';

export interface OfflineContextValue {
    isOffline: boolean;
    reportOffline: (offline: boolean) => void;
}

export const OfflineContext = createContext<OfflineContextValue | undefined>(undefined);
