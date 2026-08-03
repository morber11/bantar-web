import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { OfflineContext } from './offlineContextTypes';


export function OfflineProvider({ children }: { children: ReactNode }) {
    const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);

    const reportOffline = useCallback((offline: boolean) => {
        setIsOffline(offline);
    }, []);

    useEffect(() => {
        const handleOnline = () => reportOffline(false);
        const handleOffline = () => reportOffline(true);

        // ensure initial state is correct on mount
        reportOffline(!navigator.onLine);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [reportOffline]);

    const contextValue = useMemo(
        () => ({ isOffline, reportOffline }),
        [isOffline, reportOffline]
    );

    return (
        <OfflineContext.Provider value={contextValue}>
            {children}
        </OfflineContext.Provider>
    );
}
