import { useCallback, useState, type ReactNode } from 'react';
import { OfflineContext } from './offlineContextTypes';


export function OfflineProvider({ children }: { children: ReactNode }) {
    const [isOffline, setIsOffline] = useState(false);

    const reportOffline = useCallback((offline: boolean) => {
        setIsOffline(offline);
    }, []);

    return (
        <OfflineContext.Provider value={{ isOffline, reportOffline }}>
            {children}
        </OfflineContext.Provider>
    );
}
