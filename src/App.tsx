import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Monuments from './pages/Monuments';
import MonumentDetail from './pages/MonumentDetail';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#F5F0E8] text-[#2D1810] font-sans selection:bg-[#C4873B]/30 selection:text-[#2D1810]">
        <Header />
        
        <main className="flex-grow" id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/monuments" element={<Monuments />} />
            <Route path="/monuments/:id" element={<MonumentDetail />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
