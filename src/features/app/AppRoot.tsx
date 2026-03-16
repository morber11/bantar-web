import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import IcebreakersPage from '../icebreakers/pages/IcebreakersPage';
import DebatesPage from '../debates/pages/DebatesPage';
import TopListsPage from '../toplists/pages/TopListsPage';
import HomePage from '../home/pages/HomePage';
import HistoryPage from '../history/pages/HistoryPage';
import FavouritesPage from '../favourites/pages/FavouritesPage';
import AiModePage from '../ai-mode/pages/AiModePage';
import MindReaderPage from '../mindreader/pages/MindReaderPage';
import EventsPage from '../events/pages/EventsPage';
import { AppSettingsProvider } from '../../shared/context/AppSettingsContext';
import { FavouritesProvider } from '../favourites/context/FavouritesContext';
import { HistoryProvider } from '../history/context/HistoryContext';
import { OfflineProvider } from '../../shared/context/OfflineContext';
import { OfflineIndicator } from '../../shared/ui';
import { ErrorBoundary } from './ErrorBoundary';
import NotFoundPage from './NotFoundPage';
import { warmOfflineCache } from './warmOfflineCache';

// consider moving to .env
const STALE_TIME = 1000 * 60 * 5; // 5 minutes

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { retry: 0, staleTime: STALE_TIME, refetchOnWindowFocus: false },
    },
});

void warmOfflineCache();

export default function AppRoot() {
    return (
        <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
                <OfflineProvider>
                    <AppSettingsProvider>
                        <FavouritesProvider>
                            <HistoryProvider>
                                <BrowserRouter>
                                    <OfflineIndicator />
                                    <Routes>
                                        <Route path="/" element={<HomePage />} />
                                        <Route path="/home" element={<HomePage />} />
                                        <Route path="/icebreakers" element={<IcebreakersPage />} />
                                        <Route path="/debates" element={<DebatesPage />} />
                                        <Route path="/toplists" element={<TopListsPage />} />
                                        <Route path="/mindreader" element={<MindReaderPage />} />
                                        <Route path="/ai" element={<AiModePage />} />
                                        <Route path="/events" element={<EventsPage />} />
                                        <Route path="/history" element={<HistoryPage />} />
                                        <Route path="/favourites" element={<FavouritesPage />} />
                                        <Route path="*" element={<NotFoundPage />} />
                                    </Routes>
                                </BrowserRouter>
                            </HistoryProvider>
                        </FavouritesProvider>
                    </AppSettingsProvider>
                </OfflineProvider>
            </QueryClientProvider>
        </ErrorBoundary>
    );
}