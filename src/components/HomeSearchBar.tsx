import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function HomeSearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/monuments?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 relative z-30 -mt-8 md:-mt-10 mb-12">
      <form onSubmit={handleSearch} className="relative group">
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
          />
          <button 
            type="submit"
            className="bg-[var(--color-primary)] text-white w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#A8451A] active:scale-90 shadow-lg shadow-[var(--color-primary)]/30 shrink-0"
            aria-label="Search"
          >
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </form>
    </div>
  );
}
