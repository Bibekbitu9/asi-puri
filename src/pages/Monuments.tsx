import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Landmark, ArrowUpDown } from 'lucide-react';
import monumentsData from '../data/monuments.json';

export default function Monuments() {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [sortBy, setSortBy] = useState<'id' | 'name'>('id');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  // Translate monument details dynamically
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

  const getMonumentDistrict = (m: any) => {
    // Return English district as primary grouping key
    return m.metadata.en?.district || 'Other';
  };

  // Get unique districts for filtering
  const districts = useMemo(() => {
    const set = new Set<string>();
    monumentsData.forEach(m => {
      const dist = getMonumentDistrict(m);
      if (dist) set.add(dist);
    });
    return Array.from(set).sort();
  }, []);

  // Filter and sort monuments
  const filteredMonuments = useMemo(() => {
    return monumentsData
      .filter(m => {
        const name = getMonumentName(m).toLowerCase();
        const loc = getMonumentLocality(m).toLowerCase();
        const dist = getMonumentDistrict(m).toLowerCase();
        const query = searchQuery.toLowerCase();
        
        const matchesQuery = name.includes(query) || loc.includes(query) || dist.includes(query) || m.id.toString() === query;
        const matchesDistrict = selectedDistrict ? getMonumentDistrict(m) === selectedDistrict : true;
        
        return matchesQuery && matchesDistrict;
      })
      .sort((a, b) => {
        if (sortBy === 'name') {
          return getMonumentName(a).localeCompare(getMonumentName(b));
        }
        return a.id - b.id;
      });
  }, [searchQuery, selectedDistrict, sortBy, i18n.language]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDistrict, sortBy]);

  const totalPages = Math.ceil(filteredMonuments.length / ITEMS_PER_PAGE);
  const paginatedMonuments = filteredMonuments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-200 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t('monuments.title')}
          </h1>
          <p className="font-sans text-sm sm:text-base text-slate-700">
            {t('monuments.subtitle')}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-600 mx-auto rounded-full" />
        </div>

        {/* Filters and Search */}
        <div className="bg-slate-100 rounded-2xl p-4 sm:p-6 shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-slate-300 flex flex-col md:flex-row gap-4 justify-between items-center z-10 relative">
          
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
              <Search className="w-5 h-5" />
            </span>
            <input
              className="w-full bg-white border border-slate-300 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-800 shadow-sm"
              placeholder={t('monuments.search')}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Dropdown Filters and Sort */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
            
            {/* District dropdown */}
            <select
              className="w-full sm:w-48 bg-white border border-slate-300 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-800 shadow-sm font-semibold"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              <option value="">{t('monuments.all_districts')}</option>
              {districts.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            {/* Sort Toggle */}
            <button
              className="w-full sm:w-auto flex items-center justify-center gap-2 border border-slate-300 hover:bg-slate-200 hover:border-amber-300 rounded-xl py-2.5 px-4 text-sm font-bold text-slate-700 hover:text-amber-700 transition-all shadow-sm"
              onClick={() => setSortBy(sortBy === 'id' ? 'name' : 'id')}
            >
              <ArrowUpDown className="w-4 h-4 text-amber-600" />
              <span>
                {sortBy === 'id' ? 'Sort: Numeric' : 'Sort: Alphabetical'}
              </span>
            </button>
          </div>
        </div>

        {/* Monuments Directory Grid */}
        {paginatedMonuments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedMonuments.map(m => (
              <div
                key={m.id}
                className="bg-slate-100 rounded-2xl overflow-hidden border border-slate-300 shadow-[0_4px_20px_rgb(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent z-10 opacity-60" />
                  <img
                    alt={getMonumentName(m)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src={m.images[0] || '/placeholder.png'}
                  />
                  <div className="absolute top-3 left-3 bg-slate-100/90 backdrop-blur-md text-amber-700 border border-slate-300 text-[10px] font-extrabold px-2 py-1 rounded shadow-sm z-20">
                    #{m.id}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    <h2 className="font-sans text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug">
                      {getMonumentName(m)}
                    </h2>
                    
                    <div className="space-y-2 text-xs text-slate-600 font-sans font-semibold">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        <span className="line-clamp-1">{getMonumentLocality(m)}, {getMonumentDistrict(m)}</span>
                      </div>
                      {m.metadata.en?.period && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-amber-600 flex-shrink-0" />
                          <span>{m.metadata.en.period}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Link
                    className="mt-6 w-full text-center bg-amber-100 border border-amber-300 hover:bg-amber-600 hover:text-white hover:border-amber-600 text-amber-700 shadow-sm font-sans font-bold uppercase tracking-widest text-xs py-3 rounded-xl transition-all duration-300 block"
                    to={`/monuments/${m.id}`}
                  >
                    {t('monuments.view_details')}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center bg-slate-100 rounded-2xl p-16 border border-slate-300 shadow-[0_4px_20px_rgb(0,0,0,0.05)]">
            <Landmark className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <p className="font-sans text-sm font-semibold text-slate-600">
              {t('monuments.no_results')}
            </p>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-12">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-xl bg-slate-100 border border-slate-300 text-slate-700 font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 transition-colors shadow-sm"
            >
              Previous
            </button>
            <div className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-800 font-bold text-sm shadow-sm">
              Page {currentPage} of {totalPages}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-xl bg-slate-100 border border-slate-300 text-slate-700 font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 transition-colors shadow-sm"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
