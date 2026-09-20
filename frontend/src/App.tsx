import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import BottomNav from './components/layout/BottomNav';
import HomePage from './pages/HomePage';
import GeneratorPage from './pages/GeneratorPage';
import BuddiesPage from './pages/BuddiesPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      {/* ── Fixed background layer ────────────────────────────────────────────── */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {/* Grid */}
        <div className="grid-overlay" />

        {/* Orb top-left */}
        <div
          className="orb-green"
          style={{ width: 600, height: 600, top: -150, left: -150 }}
        />
        {/* Orb right */}
        <div
          className="orb-violet"
          style={{ width: 700, height: 700, top: '20%', right: -200 }}
        />
        {/* Orb bottom-center */}
        <div
          className="orb-green"
          style={{ width: 500, height: 500, bottom: -100, left: '30%', animationDelay: '5s' }}
        />
      </div>

      {/* ── Content layer ─────────────────────────────────────────────────────── */}
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <Navbar />

        {/* Main scroll area */}
        <div
          style={{
            paddingTop: '88px',         /* navbar height (56px) + 16px top offset + 16px gap */
            paddingBottom: '80px',      /* room for bottom nav on mobile */
          }}
        >
          <Routes>
            <Route path="/"         element={<HomePage />} />
            <Route path="/generate" element={<GeneratorPage />} />
            <Route path="/buddies"  element={<BuddiesPage />} />
            <Route path="*"         element={<NotFoundPage />} />
          </Routes>
        </div>

        <BottomNav />
      </div>
    </BrowserRouter>
  );
}
