import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IcebreakersPage from '../icebreakers/pages/IcebreakersPage';
import DebatesPage from '../debates/pages/DebatesPage';
import HomePage from '../home/pages/HomePage';

export default function AppRoot() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <div className="app-content">
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/icebreakers" element={<IcebreakersPage />} />
              <Route path="/debates" element={<DebatesPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
