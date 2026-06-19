import { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';

// Lazy loaded routes for code splitting
const Home = lazy(() => import('./pages/Home'));
const Monuments = lazy(() => import('./pages/Monuments'));
const MonumentDetail = lazy(() => import('./pages/MonumentDetail'));

import KonarkLoader from './components/KonarkLoader';

// Loading Fallback Component
const LoadingFallback = () => (
  <div className="flex-grow flex items-center justify-center min-h-[50vh]">
    <KonarkLoader className="w-20 h-20" />
  </div>
);

// Inner component to access location for AnimatePresence
function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/monuments" element={<Monuments />} />
        <Route path="/monuments/:id" element={<MonumentDetail />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-[#F5F0E8] text-[#2D1810] font-sans selection:bg-[#C4873B]/30 selection:text-[#2D1810]">
          <Header />
          
          <main className="flex-grow flex flex-col" id="main-content">
            <Suspense fallback={<LoadingFallback />}>
              <AnimatedRoutes />
            </Suspense>
          </main>

          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}
