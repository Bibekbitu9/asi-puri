import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Landmark, ArrowUpDown } from 'lucide-react';
import { Image } from '@unpic/react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import KonarkLoader from '../components/KonarkLoader';
import SkeletonCard from '../components/SkeletonCard';
import monumentsData from '../data/monuments.json';

export default function Monuments() {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [sortBy, setSortBy] = useState<'id' | 'name'>('id');
  
  // Infinite Scroll State
  const ITEMS_PER_BATCH = 12;
  const [loadedCount, setLoadedCount] = useState(ITEMS_PER_BATCH);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

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
    return m.metadata.en?.district || 'Other';
  };

  const districts = useMemo(() => {
    const set = new Set<string>();
    monumentsData.forEach(m => {
      const dist = getMonumentDistrict(m);
      if (dist) set.add(dist);
    });
    return Array.from(set).sort();
  }, []);

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

  // Reset loaded count when filters change
  useEffect(() => {
    setLoadedCount(ITEMS_PER_BATCH);
  }, [searchQuery, selectedDistrict, sortBy]);

  const displayedMonuments = filteredMonuments.slice(0, loadedCount);
  const hasMore = loadedCount < filteredMonuments.length;

  // Intersection Observer for Infinite Scroll
  const lastElementRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoadingMore) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setIsLoadingMore(true);
        // Simulate a slight network delay for the smooth loader effect
        setTimeout(() => {
          setLoadedCount(prev => prev + ITEMS_PER_BATCH);
          setIsLoadingMore(false);
        }, 800);
      }
    }, { rootMargin: '200px' }); // Trigger 200px before reaching the bottom

    if (node) observerRef.current.observe(node);
  }, [isLoadingMore, hasMore]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-12 px-4 sm:px-6 lg:px-8 bg-[var(--color-neutral)] min-h-screen"
    >
      <SEO title={t('nav.monuments') || 'Monuments'} />
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-dark-stone)] tracking-tight">
            {t('monuments.title')}
          </h1>
          <p className="font-sans text-sm sm:text-base text-slate-700">
            {t('monuments.subtitle')}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[var(--color-primary)] to-orange-600 mx-auto rounded-full" />
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-center z-10 relative">
          <div className="relative w-full md:max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
              <Search className="w-5 h-5" />
            </span>
            <input
              className="w-full bg-[var(--color-neutral)] border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent text-[var(--color-dark-stone)] shadow-sm transition-all"
              placeholder={t('monuments.search')}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
            <select
              className="w-full sm:w-48 bg-[var(--color-neutral)] border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-dark-stone)] shadow-sm font-semibold transition-all"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              <option value="">{t('monuments.all_districts')}</option>
              {districts.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <button
              className="w-full sm:w-auto flex items-center justify-center gap-2 border border-slate-200 hover:bg-[var(--color-neutral)] hover:border-[var(--color-muted-gold)] rounded-xl py-2.5 px-4 text-sm font-bold text-slate-700 hover:text-[var(--color-primary)] transition-all shadow-sm"
              onClick={() => setSortBy(sortBy === 'id' ? 'name' : 'id')}
            >
              <ArrowUpDown className="w-4 h-4 text-[var(--color-primary)]" />
              <span>
                {sortBy === 'id' ? 'Sort: Numeric' : 'Sort: Alphabetical'}
              </span>
            </button>
          </div>
        </div>

        {/* Monuments Directory Grid */}
        {displayedMonuments.length > 0 ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedMonuments.map((m, index) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index % ITEMS_PER_BATCH) * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-[0_4px_20px_rgb(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgb(226,122,63,0.15)] hover:border-[var(--color-muted-gold)] transition-all duration-300 flex flex-col group"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-neutral)]">
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-stone)]/60 via-transparent to-transparent z-10 opacity-60 pointer-events-none" />
                    <Image
                      alt={getMonumentName(m)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      src={m.images[0] || '/placeholder.png'}
                      layout="fullWidth"
                      loading="lazy"
                      background="auto"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[var(--color-primary)] border border-slate-200 text-[10px] font-extrabold px-2 py-1 rounded shadow-sm z-20">
                      #{m.id}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div className="space-y-4">
                      <h2 className="font-sans text-lg font-bold text-[var(--color-dark-stone)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-2 leading-snug">
                        {getMonumentName(m)}
                      </h2>
                      
                      <div className="space-y-2 text-xs text-slate-500 font-sans font-semibold">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[var(--color-muted-gold)] flex-shrink-0" />
                          <span className="line-clamp-1">{getMonumentLocality(m)}, {getMonumentDistrict(m)}</span>
                        </div>
                        {m.metadata.en?.period && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[var(--color-muted-gold)] flex-shrink-0" />
                            <span>{m.metadata.en.period}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <Link
                      className="mt-6 w-full text-center bg-[var(--color-neutral)] border border-[var(--color-muted-gold)] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] text-[var(--color-primary)] shadow-sm font-sans font-bold uppercase tracking-widest text-xs py-3 rounded-xl transition-all duration-300 block"
                      to={`/monuments/${m.id}`}
                    >
                      {t('monuments.view_details')}
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Loading Indicator & Sentinel */}
            {hasMore && (
              <div ref={lastElementRef} className="py-8">
                {isLoadingMore ? (
                  <div className="space-y-8">
                    <div className="flex justify-center">
                      <KonarkLoader className="w-12 h-12" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      <SkeletonCard />
                      <SkeletonCard />
                      <SkeletonCard />
                    </div>
                  </div>
                ) : (
                  <div className="h-10" /> /* Invisible sentinel target */
                )}
              </div>
            )}
            {!hasMore && displayedMonuments.length > 0 && (
              <div className="text-center py-8 text-slate-400 font-semibold text-sm">
                You have reached the end.
              </div>
            )}
          </div>
        ) : (
          <div className="text-center bg-white rounded-2xl p-16 border border-slate-200 shadow-[0_4px_20px_rgb(0,0,0,0.05)]">
            <Landmark className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="font-sans text-sm font-semibold text-slate-500">
              {t('monuments.no_results')}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
