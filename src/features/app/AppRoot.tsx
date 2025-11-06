import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IcebreakersPage from '../icebreakers/pages/IcebreakersPage';
import DebatesPage from '../debates/pages/DebatesPage';
import HomePage from '../home/pages/HomePage';
import HistoryPage from '../history/pages/HistoryPage';

export default function AppRoot() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/icebreakers" element={<IcebreakersPage />} />
        <Route path="/debates" element={<DebatesPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}
