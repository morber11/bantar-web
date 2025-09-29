import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import IcebreakersPage from './pages/IcebreakersPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/icebreakers" element={<IcebreakersPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
