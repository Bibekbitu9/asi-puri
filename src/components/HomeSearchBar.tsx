import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import monumentsData from '../data/monuments.json';

export default function HomeSearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const getMonumentName = (m: any) => {
    const lang = i18n.language as 'en' | 'hi' | 'od';
    return m.names[lang] || m.names.en;
  };

  const getMonumentLocality = (m: any) => {
    const lang = i18n.language as 'en' | 'hi' | 'od';
    if (lang === 'od') {
      return m.metadata.en?.locality || '';
    }
    return m.metadata[lang]?.locality || m.metadata.en?.locality || '';
  };

  useEffect(() => {
    if (query.trim()) {
      const q = query.toLowerCase();
      const filtered = monumentsData.filter(m => {
        const name = getMonumentName(m).toLowerCase();
        const loc = getMonumentLocality(m).toLowerCase();
        return name.includes(q) || loc.includes(q);
      }).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, i18n.language]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/monuments?search=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (id: number) => {
    navigate(`/monuments/${id}`);
    setShowSuggestions(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 relative z-30 -mt-8 md:-mt-10 mb-12 flex flex-col items-center">
      <form onSubmit={handleSearch} className="relative group w-full mb-6" ref={wrapperRef}>
        <div className="flex items-center bg-white rounded-full p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-[var(--color-muted-gold)]/20 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(196,135,59,0.15)] focus-within:ring-4 focus-within:ring-[var(--color-primary)]/20">
          <div className="pl-5 pr-3 text-slate-400">
            <Search className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <input 
            className="flex-grow bg-transparent border-none focus:ring-0 text-slate-700 placeholder:text-slate-400 font-sans py-3 text-sm md:text-base outline-none" 
            placeholder={t('monuments.search') || "Search monuments, sites..."} 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => { if(query.trim()) setShowSuggestions(true); }}
          />
          <button 
            type="submit"
            className="bg-gradient-to-br from-[var(--color-primary)] to-[#A8451A] text-white w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:brightness-110 active:scale-90 shadow-lg shadow-[var(--color-primary)]/30 shrink-0"
            aria-label="Search"
          >
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 text-left">
            {suggestions.map((m) => (
              <div 
                key={m.id}
                onClick={() => handleSelectSuggestion(m.id)}
                className="px-4 py-3 hover:bg-[var(--color-neutral)] cursor-pointer flex flex-col gap-1 border-b border-slate-100 last:border-0 transition-colors"
              >
                <div className="text-sm font-bold text-slate-800 line-clamp-1">{getMonumentName(m)}</div>
                <div className="text-xs text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {getMonumentLocality(m)}
                </div>
              </div>
            ))}
          </div>
        )}
      </form>

      {/* Show All Action */}
      <button 
        onClick={() => navigate('/monuments')}
        className="group flex items-center gap-2 bg-gradient-to-r from-[var(--color-primary)] to-[#A8451A] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:brightness-110 active:scale-[0.98] transition-all"
      >
        Show all monuments
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
