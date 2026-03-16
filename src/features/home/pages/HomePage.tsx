import { Link } from 'react-router-dom';
import Sidebar from '../../navigation/components/Sidebar';
import StyledButton from '../../../shared/ui/StyledButton';
import { useFetchEvents } from '../../events/hooks/useFetchEvents';
import { useAppSettings } from '../../../shared/context/appSettingsContextImpl';

export default function HomePage() {
    const { available: eventsAvailable, loading: eventsLoading, eventName, eventStyle } = useFetchEvents();
    const { resolvedTheme } = useAppSettings();
    const rawEventStyle = eventStyle?.[resolvedTheme] ?? null;
    const eventBgColor = rawEventStyle
        ? rawEventStyle.split(':').slice(1).join(':').replace(/;$/, '').trim() || null
        : null;
    return (
        <>
            <Sidebar />
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-full max-w-5xl p-4 py-20">
                    <div>
                        <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Bantar</h1>
                    </div>

                    <ul className="flex flex-col items-center justify-center space-y-4">
                        <li className="w-full max-w-xs">
                            <Link to="/icebreakers" className="block w-full">
                                <StyledButton className="w-full">Icebreakers</StyledButton>
                            </Link>
                        </li>

                        <li className="w-full max-w-xs">
                            <Link to="/debates" className="block w-full">
                                <StyledButton className="w-full">Debates</StyledButton>
                            </Link>
                        </li>
                        <li className="w-full max-w-xs">
                            <Link to="/toplists" className="block w-full">
                                <StyledButton className="w-full">Top Lists</StyledButton>
                            </Link>
                        </li>
                        <li className="w-full max-w-xs">
                            <Link to="/mindreader" className="block w-full">
                                <StyledButton className="w-full">Mind Reader</StyledButton>
                            </Link>
                        </li>
                        {!eventsLoading && eventsAvailable && (
                            <li className="w-full max-w-xs">
                                <Link to="/events" className="block w-full">
                                    <StyledButton
                                        className="w-full event-pop"
                                        style={eventBgColor ? { backgroundColor: eventBgColor } : undefined}
                                    >
                                        {eventName}
                                    </StyledButton>
                                </Link>
                            </li>
                        )}
                        <li className="w-full max-w-xs">
                            <Link to="/ai" className="block w-full">
                                <StyledButton className="w-full">AI Mode</StyledButton>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
