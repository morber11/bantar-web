import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import IcebreakersPage from './pages/IcebreakersPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <div className="app-content">
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/icebreakers" element={<IcebreakersPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App