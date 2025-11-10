import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IcebreakersPage from '../icebreakers/pages/IcebreakersPage';
import DebatesPage from '../debates/pages/DebatesPage';
import HomePage from '../home/pages/HomePage';
import HistoryPage from '../history/pages/HistoryPage';
import AiModePage from '../ai-mode/pages/AiModePage';
import MindReaderPage from '../mindreader/pages/MindReaderPage';
import { AppSettingsProvider } from '../../shared/context/AppSettingsContext';

export default function AppRoot() {
  return (
    <AppSettingsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/icebreakers" element={<IcebreakersPage />} />
          <Route path="/debates" element={<DebatesPage />} />
          <Route path="/mindreader" element={<MindReaderPage />} />
          <Route path="/ai" element={<AiModePage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </BrowserRouter>
    </AppSettingsProvider>
  );
}