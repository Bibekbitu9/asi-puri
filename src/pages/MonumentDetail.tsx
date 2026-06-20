import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  FileText, 
  Compass, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Image as ImageIcon 
} from 'lucide-react';
import { Image } from '@unpic/react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import monumentsData from '../data/monuments.json';

// Helper to extract a clean era/period from a potentially dirty text field
const getCleanPeriod = (periodStr: string) => {
  if (!periodStr) return '';
  const ceMatch = periodStr.match(/^(.*?(?:C\.E\.|C\.E|B\.C\.|B\.C|period|Cent\.|Century))/i);
  if (ceMatch) {
    return ceMatch[1].trim();
  }
  const dotIndex = periodStr.indexOf('.');
  if (dotIndex !== -1 && dotIndex < 40) {
    return periodStr.substring(0, dotIndex + 1).trim();
  }
  return periodStr.split(' ').slice(0, 4).join(' ');
};

export default function MonumentDetail() {
  const { id } = useParams<{ id: string }>();
  const monumentId = id;
  const { t, i18n } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const monument = monumentsData.find(m => m.id === Number(monumentId));

  if (!monument) {
    return (
      <div className="py-20 text-center min-h-screen bg-[var(--color-neutral)] flex flex-col justify-center items-center px-4">
        <AlertCircle className="w-16 h-16 text-[var(--color-primary)] mb-4 animate-bounce" />
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-dark-stone)] mb-4">Monument Not Found</h1>
        <Link 
          className="text-white bg-[var(--color-primary)] px-6 py-2.5 rounded-full font-bold shadow-md hover:bg-orange-600 transition-colors text-sm" 
          to="/monuments"
        >
          {t('monuments.back_to_list') || 'Back to Monuments'}
        </Link>
      </div>
    );
  }

  const lang = i18n.language as 'en' | 'hi' | 'od';
  const name = monument.names[lang] || monument.names.en;

  // Metadata translation fallback logic
  const meta = monument.metadata[lang === 'od' ? 'en' : lang] || monument.metadata.en;
  const description = monument.descriptions[lang === 'od' ? 'en' : lang] || monument.descriptions.en;
  const isOdiaFallback = lang === 'od';

  const paragraphs = description ? description.split('\n\n') : [];
  const hasLongDescription = paragraphs.length > 2;
  const visibleParagraphs = isExpanded ? paragraphs : paragraphs.slice(0, 2);
  const cleanPeriod = getCleanPeriod(meta?.period || '');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[var(--color-neutral)] min-h-screen pb-20 flex flex-col"
    >
      <SEO title={name} description={paragraphs[0]?.substring(0, 150) + '...'} image={monument.images[0]} />

      {/* Cinematic Hero Header Section */}
      <section className="relative w-full min-h-[50vh] md:min-h-[65vh] flex flex-col justify-between overflow-hidden bg-[var(--color-dark-stone)] pb-6 gap-6 md:gap-8">
        {/* Main Background Image */}
        <Image
          alt={name}
          className="absolute inset-0 w-full h-full object-cover select-none z-0"
          src={monument.images[0]}
          layout="fullWidth"
          fetchPriority="high"
          background="auto"
        />

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2E2C29]/60 via-transparent to-[#2E2C29]/95 z-10" />

        {/* Glassmorphic Navbar Overlay */}
        <div className="relative z-25 p-4 md:p-6 flex justify-between items-center w-full max-w-5xl mx-auto">
          <Link
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all shadow-lg"
            to="/monuments"
            title={t('monuments.back_to_list') || 'Back'}
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white text-xs font-bold tracking-[0.1em] uppercase">
            {t('hero.subtitle') || 'Puri Circle'}
          </div>
        </div>

        {/* Bottom Title Content */}
        <div className="relative z-20 mt-auto p-6 md:p-12 w-full">
          <div className="max-w-5xl mx-auto space-y-4">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block bg-[var(--color-primary)] text-white text-[10px] md:text-xs font-extrabold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-white/10 shadow-md"
            >
              Monument #{monument.id}
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight drop-shadow-2xl max-w-4xl"
            >
              {name}
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-bold text-slate-300 tracking-wider uppercase"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0" />
                <span>{meta.locality}, {meta.district}</span>
              </div>
              {cleanPeriod && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0" />
                  <span>{cleanPeriod}</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Details Body */}
      <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* Main Narrative Column (2 cols wide on desktop) */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Description Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-10 border border-[var(--color-muted-gold)]/20 shadow-[0_4px_25px_rgba(0,0,0,0.03)] space-y-6"
            >
              <div className="flex items-center gap-3 border-b border-[var(--color-muted-gold)]/20 pb-4">
                <div className="w-1.5 h-6 bg-[var(--color-primary)] rounded-full" />
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-dark-stone)]">
                  {t('monuments.description') || 'History & Architecture'}
                </h2>
              </div>
              
              {isOdiaFallback && (
                <div className="bg-[var(--color-sandstone)]/10 border-l-4 border-[var(--color-primary)] p-4 text-xs sm:text-sm text-[var(--color-dark-stone)] rounded-r-xl flex items-start gap-2.5 font-semibold">
                  <AlertCircle className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                  <div>
                    ଓଡ଼ିଆରେ ବିବରଣୀ ଉପଲବ୍ଧ ନାହିଁ । ଇଂରାଜୀ ସଂସ୍କରଣ ପ୍ରଦର୍ଶିତ ହେଉଛି :
                  </div>
                </div>
              )}

              <div className="font-sans text-slate-700 leading-relaxed text-justify whitespace-pre-line space-y-6 text-sm sm:text-base">
                {paragraphs.length > 0 ? (
                  <>
                    <AnimatePresence initial={false}>
                      {visibleParagraphs.map((para, idx) => {
                        const isFirstPara = idx === 0;
                        return (
                          <motion.p 
                            key={idx}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`${isFirstPara ? 'first-letter:font-serif first-letter:text-5xl first-letter:font-bold first-letter:text-[var(--color-primary)] first-letter:float-left first-letter:mr-3 first-letter:mt-1' : ''}`}
                          >
                            {para}
                          </motion.p>
                        );
                      })}
                    </AnimatePresence>
                    
                    {hasLongDescription && (
                      <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="mt-6 flex items-center justify-center w-full gap-2 py-3.5 bg-[var(--color-neutral)] hover:bg-[var(--color-sandstone)]/30 text-[var(--color-dark-stone)] rounded-2xl font-bold text-xs uppercase tracking-[0.2em] transition-colors border border-[var(--color-muted-gold)]/40 shadow-sm"
                      >
                        {isExpanded ? (
                          <>Read Less <ChevronUp className="w-4 h-4 text-[var(--color-primary)]" /></>
                        ) : (
                          <>Read More <ChevronDown className="w-4 h-4 text-[var(--color-primary)]" /></>
                        )}
                      </button>
                    )}
                  </>
                ) : (
                  <p className="text-[var(--color-muted-gold)] italic font-semibold">Detailed description not available.</p>
                )}
              </div>
            </motion.div>

            {/* Media/Visual Gallery */}
            {monument.images && monument.images.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[var(--color-muted-gold)]/20 shadow-[0_4px_25px_rgba(0,0,0,0.03)] space-y-6"
              >
                <div className="flex items-center gap-3 border-b border-[var(--color-muted-gold)]/20 pb-4">
                  <ImageIcon className="w-5 h-5 text-[var(--color-primary)]" />
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--color-dark-stone)]">
                    {t('monuments.related_images') || 'Photo Gallery'}
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {monument.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className="aspect-[4/3] rounded-2xl overflow-hidden border border-slate-100 hover:border-[var(--color-primary)] hover:shadow-md transition-all duration-300 relative bg-slate-100 group shadow-sm focus:outline-none"
                    >
                      <Image
                        alt={`${name} gallery thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                        src={img}
                        layout="fullWidth"
                        loading="lazy"
                        background="auto"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors pointer-events-none" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Quick Facts Sidebar (1 col wide on desktop) */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[var(--color-muted-gold)]/20 shadow-[0_4px_25px_rgba(0,0,0,0.03)] space-y-6"
            >
              <h3 className="font-serif text-xl font-bold text-[var(--color-dark-stone)] border-b border-[var(--color-muted-gold)]/20 pb-3 flex items-center gap-2">
                <Compass className="w-5 h-5 text-[var(--color-primary)]" />
                Quick Facts
              </h3>
              
              <div className="space-y-5 text-xs sm:text-sm font-sans text-[var(--color-dark-stone)]">
                {meta?.district && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[var(--color-primary)] font-extrabold uppercase tracking-[0.15em] text-[9px]">
                      <MapPin className="w-3.5 h-3.5" />
                      {t('monuments.district')}
                    </div>
                    <div className="font-semibold text-slate-700 pl-5.5">{meta.district}</div>
                  </div>
                )}

                {meta?.locality && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[var(--color-primary)] font-extrabold uppercase tracking-[0.15em] text-[9px]">
                      <MapPin className="w-3.5 h-3.5" />
                      {t('monuments.locality')}
                    </div>
                    <div className="font-semibold text-slate-700 pl-5.5">{meta.locality}</div>
                  </div>
                )}

                {meta?.period && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[var(--color-primary)] font-extrabold uppercase tracking-[0.15em] text-[9px]">
                      <Calendar className="w-3.5 h-3.5" />
                      {t('monuments.period')}
                    </div>
                    <div className="font-semibold text-slate-700 pl-5.5 leading-relaxed">
                      {cleanPeriod}
                    </div>
                  </div>
                )}

                {meta?.geo && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[var(--color-primary)] font-extrabold uppercase tracking-[0.15em] text-[9px]">
                      <Compass className="w-3.5 h-3.5" />
                      {t('monuments.coordinates')}
                    </div>
                    <div className="font-medium text-slate-600 pl-5.5 text-[11px] leading-relaxed break-all">
                      {meta.geo}
                    </div>
                  </div>
                )}

                {meta?.notification && (
                  <div className="space-y-1 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-[var(--color-primary)] font-extrabold uppercase tracking-[0.15em] text-[9px]">
                      <FileText className="w-3.5 h-3.5" />
                      {t('monuments.notification')}
                    </div>
                    <div className="font-medium text-slate-500 pl-5.5 text-[11px] leading-relaxed">
                      {meta.notification}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Advisory Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#2D1810] text-white rounded-3xl p-6 border border-amber-950 shadow-[0_4px_25px_rgba(0,0,0,0.03)] relative overflow-hidden group"
            >
              <div className="absolute inset-0 opacity-5 bg-[url('/pattern.png')] mix-blend-overlay pointer-events-none" />
              <h4 className="font-serif text-lg font-bold text-[var(--color-primary)] mb-2 relative z-10">Protected Area</h4>
              <p className="text-xs text-slate-300 leading-relaxed relative z-10 mb-4">
                This monument is a protected site under the Archaeological Survey of India (ASI) Puri Circle. Defacement or destruction is a punishable offence.
              </p>
              <Link 
                to="/monuments"
                className="inline-flex items-center gap-1.5 text-[10px] font-extrabold tracking-widest text-[var(--color-muted-gold)] hover:text-white uppercase transition-colors relative z-10"
              >
                <span>Learn More</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Lightbox Modal Overlay */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#2E2C29]/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            {/* Close Overlay */}
            <div className="absolute inset-0 z-10 cursor-zoom-out" onClick={() => setActiveImageIndex(null)} />

            {/* Close Button */}
            <button
              onClick={() => setActiveImageIndex(null)}
              className="absolute top-6 right-6 text-white hover:text-[var(--color-primary)] bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors border border-white/10 z-30 cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={() => {
                setActiveImageIndex(prev => 
                  prev !== null ? (prev === 0 ? monument.images.length - 1 : prev - 1) : null
                );
              }}
              className="absolute left-6 text-white hover:text-[var(--color-primary)] bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors border border-white/10 z-30 cursor-pointer"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image Card Container */}
            <motion.div
              key={activeImageIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center gap-4 relative z-20 pointer-events-none"
            >
              <img
                src={monument.images[activeImageIndex]}
                alt={`${name} detail`}
                className="max-w-full max-h-[75vh] object-contain rounded-2xl border border-white/10 shadow-2xl"
              />
              <div className="text-white/80 font-sans text-xs sm:text-sm font-semibold tracking-wide bg-[#2E2C29]/80 px-4 py-2 rounded-full border border-white/5 pointer-events-auto select-none">
                Image {activeImageIndex + 1} of {monument.images.length}
              </div>
            </motion.div>

            {/* Next Button */}
            <button
              onClick={() => {
                setActiveImageIndex(prev => 
                  prev !== null ? (prev === monument.images.length - 1 ? 0 : prev + 1) : null
                );
              }}
              className="absolute right-6 text-white hover:text-[var(--color-primary)] bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors border border-white/10 z-30 cursor-pointer"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
