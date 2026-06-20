import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, Menu, X } from 'lucide-react';
import { Image } from '@unpic/react';

export default function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangMenuOpen(false);
  };

  const navItems = [
    { key: 'about', path: '/#about-us' },
    { key: 'updates', path: '/#latest-updates' },
    { key: 'news', path: '/#news-press' },
    { key: 'featured_monuments', path: '/#featured-monuments' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith('/#') && location.pathname === '/') {
      e.preventDefault();
      const id = path.substring(2);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileMenuOpen(false);
    } else {
      setMobileMenuOpen(false);
    }
  };

  const currentLangLabel = () => {
    switch (i18n.language) {
      case 'hi': return 'हि';
      case 'od': return 'ଓ';
      default: return 'EN';
    }
  };

  return (
    <div className="w-full bg-[#4A1C0A] text-[#F8F5F0]">
      {/* TopAppBar (Sticky Header) */}
      <header className="bg-gradient-to-r from-[#7A2A10] via-[#A8451A] to-[#D46A25] border-b border-[#C19A6B]/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)] top-0 z-40 sticky transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Brand/Logo */}
            <div className="flex-shrink-0">
              <Link className="flex items-center gap-2 sm:gap-3" to="/">
                <Image
                  alt="ASI Puri Circle Logo"
                  className="h-10 w-10 sm:h-14 sm:w-14 object-contain rounded-full border border-[#C4873B]/30 bg-white p-0.5 flex-shrink-0"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWyb98dUAZQ5Uqkfb9RMCiPybf3oVtTyJPP-OEYw-nqza1PLcZZ6wzPOGYAQV3XoxNkfF_qehF9SSLyamK8fXDPpRB1-S8_kNyP_-9Q2Xla6Pk_ehB2sa6jgT2-VSRynNGOXBpVssCfapY8iFt3lsqgzD3a17S1k4t3Pz-AIPL3Z3ZuRHeojbip6oLEw-hFiNvOFgquex7IZsehaOPDBkk1OasIzdS5yPLJEjUOA07r3f8sf1OoF5RzsXBSTAtZBzWdvlC8DQon2Rr"
                  layout="fixed"
                  width={56}
                  height={56}
                />
                <div className="flex flex-col">
                  <span className="font-sans text-[10px] sm:text-sm md:text-base font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent tracking-tight uppercase leading-tight max-w-[160px] sm:max-w-none">
                    {t('hero.title')}
                  </span>
                  <span className="text-slate-300 text-[8px] sm:text-[10px] font-bold tracking-widest uppercase">
                    {t('hero.subtitle')}
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1 lg:space-x-4 items-center">
              {navItems.map(item => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.key}
                    onClick={(e) => handleNavClick(e, item.path)}
                    className={`font-sans font-bold uppercase tracking-widest text-[10px] lg:text-xs px-3 lg:px-4 py-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-[#C15C20] text-white shadow-[0_4px_15px_rgba(193,92,32,0.4)]'
                        : 'text-[#E6D8B8] hover:text-white hover:bg-[#8C3310]/50'
                    }`}
                    to={item.path}
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                );
              })}
              <div className="h-6 w-px bg-[#8C3310] mx-2" />
              
              {/* Language Switcher Dropdown */}
              <div className="relative">
                <button
                  aria-label="Language Selector"
                  className="hover:text-white transition-colors flex items-center font-bold text-xs bg-[#4A1C0A] border border-[#8C3310] text-[#F8F5F0] px-4 py-2 rounded-full shadow-sm hover:bg-[#8C3310]"
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                >
                  <Globe className="w-3.5 h-3.5 mr-1" />
                  {currentLangLabel()}
                </button>
                {langMenuOpen && (
                  <div className="absolute right-0 mt-3 w-32 rounded-xl shadow-xl bg-[#4A1C0A] border border-[#8C3310] backdrop-blur-xl z-50 overflow-hidden">
                    <div className="py-1" role="menu">
                      <button
                        className="w-full text-left px-4 py-2.5 text-xs font-semibold text-[#F8F5F0] hover:bg-[#8C3310] hover:text-[#E6D8B8] transition-colors"
                        onClick={() => changeLanguage('en')}
                      >
                        English (EN)
                      </button>
                      <button
                        className="w-full text-left px-4 py-2.5 text-xs font-semibold text-[#F8F5F0] hover:bg-[#8C3310] hover:text-[#E6D8B8] transition-colors"
                        onClick={() => changeLanguage('hi')}
                      >
                        हिंदी (HI)
                      </button>
                      <button
                        className="w-full text-left px-4 py-2.5 text-xs font-semibold text-[#F8F5F0] hover:bg-[#8C3310] hover:text-[#E6D8B8] transition-colors"
                        onClick={() => changeLanguage('od')}
                      >
                        ଓଡ଼ିଆ (OD)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-3">
              {/* Mobile Lang Button */}
              <div className="relative">
                <button
                  className="flex items-center text-xs font-bold bg-[#4A1C0A] border border-[#8C3310] text-[#F8F5F0] px-3 py-2 rounded-full shadow-sm"
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                >
                  <Globe className="w-3.5 h-3.5 mr-1" />
                  {currentLangLabel()}
                </button>
                {langMenuOpen && (
                  <div className="absolute right-0 mt-2 w-28 rounded-xl shadow-xl bg-[#4A1C0A] border border-[#8C3310] z-50 overflow-hidden">
                    <div className="py-1">
                      <button className="w-full text-left px-4 py-2 text-xs font-semibold text-[#F8F5F0] hover:bg-[#8C3310] hover:text-[#E6D8B8]" onClick={() => changeLanguage('en')}>EN</button>
                      <button className="w-full text-left px-4 py-2 text-xs font-semibold text-[#F8F5F0] hover:bg-[#8C3310] hover:text-[#E6D8B8]" onClick={() => changeLanguage('hi')}>हि</button>
                      <button className="w-full text-left px-4 py-2 text-xs font-semibold text-[#F8F5F0] hover:bg-[#8C3310] hover:text-[#E6D8B8]" onClick={() => changeLanguage('od')}>ଓ</button>
                    </div>
                  </div>
                )}
              </div>
              <button
                className="text-[#F8F5F0] hover:text-[#E6D8B8] p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#4A1C0A]/95 backdrop-blur-xl border-t border-[#8C3310] px-4 pt-3 pb-5 space-y-2 shadow-xl transition-all duration-300">
            {navItems.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.key}
                  className={`block px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest ${
                    isActive
                      ? 'bg-[#C15C20] text-white shadow-md'
                      : 'text-[#E6D8B8] hover:bg-[#8C3310] hover:text-white'
                  }`}
                  to={item.path}
                  onClick={(e) => handleNavClick(e, item.path)}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              );
            })}
          </div>
        )}
      </header>
    </div>
  );
}
