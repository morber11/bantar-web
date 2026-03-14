import wifiDisable from '../../assets/wifi-disable.svg';
import { useOffline } from '../context/offlineContextImpl';

export default function OfflineIndicator() {
    const { isOffline } = useOffline();

    if (!isOffline) return null;

    return (
        <div
            role="status"
            aria-live="polite"
            aria-label="Offline"
            className="fixed top-4 right-4 z-50 rounded-full bg-red-500/80 p-2 shadow-lg"
        >
            <img src={wifiDisable} alt="" aria-hidden className="h-4 w-4 shrink-0 brightness-0 invert" />
        </div>
    );
}
