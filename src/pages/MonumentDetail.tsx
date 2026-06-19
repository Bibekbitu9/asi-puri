import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, MapPin, Calendar, FileText, Compass, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Image } from '@unpic/react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import monumentsData from '../data/monuments.json';

export default function MonumentDetail() {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const monument = monumentsData.find(m => m.id === Number(id));

  if (!monument) {
    return (
      <div className="py-20 text-center min-h-screen bg-[var(--color-neutral)] flex flex-col justify-center items-center">
        <AlertCircle className="w-16 h-16 text-[var(--color-primary)] mb-4" />
        <h1 className="font-sans text-2xl font-bold text-[var(--color-dark-stone)] mb-4">Monument Not Found</h1>
        <Link className="text-[var(--color-primary)] hover:text-[var(--color-muted-gold)] hover:underline font-bold" to="/monuments">
          {t('monuments.back_to_list')}
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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="py-12 px-4 sm:px-6 lg:px-8 bg-[var(--color-neutral)] min-h-screen"
    >
      <SEO title={name} description={paragraphs[0]?.substring(0, 150) + '...'} image={monument.images[0]} />
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Back Button */}
        <Link
          className="inline-flex items-center gap-2 text-xs font-bold text-[var(--color-primary)] hover:text-[var(--color-muted-gold)] transition-colors uppercase tracking-[0.2em] bg-white py-3 px-6 rounded-full shadow-sm border border-[var(--color-muted-gold)]/30 hover:shadow-md w-fit"
          to="/monuments"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('monuments.back_to_list')}
        </Link>

        {/* Monument Header */}
        <div className="space-y-4">
          <span className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-4 py-1.5 rounded-full border border-[var(--color-primary)]/20 shadow-sm">
            Monument #{monument.id}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[var(--color-dark-stone)] leading-tight">
            {name}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-muted-gold)] rounded-full" />
        </div>

        {/* Gallery Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.05)] border border-[var(--color-muted-gold)]/20 p-3"
        >
          {monument.images && monument.images.length > 0 ? (
            <div className="space-y-4">
              {/* Main Hero Image */}
              <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden bg-slate-200 relative group">
                <div className="absolute inset-0 bg-[var(--color-dark-stone)]/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <Image
                  alt={name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  src={monument.images[0]}
                  layout="fullWidth"
                  fetchPriority="high"
                  background="auto"
                />
              </div>
              
              {/* Masonry Layout for Additional Thumbnails */}
              {monument.images.length > 1 && (
                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 px-1 pb-1">
                  {monument.images.slice(1).map((img, idx) => (
                    <a
                      key={idx}
                      className="break-inside-avoid rounded-xl overflow-hidden border border-transparent hover:border-[var(--color-primary)] transition-all duration-300 block shadow-sm relative bg-slate-200 group"
                      href={img}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Image
                        alt={`${name} gallery image ${idx + 1}`}
                        className="w-full object-cover hover:scale-105 transition-transform duration-700"
                        src={img}
                        layout="fullWidth"
                        loading="lazy"
                        background="auto"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="aspect-[21/9] bg-[var(--color-neutral)] flex items-center justify-center text-[var(--color-dark-stone)] opacity-50 rounded-2xl font-semibold">
              No images available
            </div>
          )}
        </motion.div>

        {/* Details & Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Metadata Card */}
          <div className="md:col-span-1 bg-white rounded-3xl p-8 border border-[var(--color-muted-gold)]/20 shadow-[0_8px_30px_rgb(0,0,0,0.05)] h-fit space-y-8">
            <h3 className="font-serif text-2xl font-bold text-[var(--color-dark-stone)] border-b border-[var(--color-muted-gold)]/30 pb-4">
              Quick Facts
            </h3>
            
            <div className="space-y-6 text-sm font-sans text-[var(--color-dark-stone)]">
              {meta?.district && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold uppercase tracking-[0.15em] text-[10px]">
                    <MapPin className="w-4 h-4" />
                    {t('monuments.district')}
                  </div>
                  <div className="font-semibold pl-6">{meta.district}</div>
                </div>
              )}
              {meta?.locality && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold uppercase tracking-[0.15em] text-[10px]">
                    <MapPin className="w-4 h-4" />
                    {t('monuments.locality')}
                  </div>
                  <div className="font-semibold pl-6">{meta.locality}</div>
                </div>
              )}
              {meta?.period && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold uppercase tracking-[0.15em] text-[10px]">
                    <Calendar className="w-4 h-4" />
                    {t('monuments.period')}
                  </div>
                  <div className="font-semibold pl-6">{meta.period}</div>
                </div>
              )}
              {meta?.geo && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold uppercase tracking-[0.15em] text-[10px]">
                    <Compass className="w-4 h-4" />
                    {t('monuments.coordinates')}
                  </div>
                  <div className="font-semibold pl-6 break-words text-xs">{meta.geo}</div>
                </div>
              )}
              {meta?.notification && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold uppercase tracking-[0.15em] text-[10px]">
                    <FileText className="w-4 h-4" />
                    {t('monuments.notification')}
                  </div>
                  <div className="font-medium pl-6 text-xs leading-relaxed break-words opacity-80">{meta.notification}</div>
                </div>
              )}
            </div>
          </div>

          {/* Description Section */}
          <div className="md:col-span-2 bg-white rounded-3xl p-10 border border-[var(--color-muted-gold)]/20 shadow-[0_8px_30px_rgb(0,0,0,0.05)] space-y-8">
            <h2 className="font-serif text-3xl font-bold text-[var(--color-dark-stone)] border-b border-[var(--color-muted-gold)]/30 pb-4">
              {t('monuments.description')}
            </h2>
            
            {isOdiaFallback && (
              <div className="bg-[var(--color-sandstone)]/30 border-l-4 border-[var(--color-primary)] p-5 text-sm text-[var(--color-dark-stone)] rounded-r-xl flex items-start gap-3 font-semibold shadow-sm">
                <AlertCircle className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                <div>
                  ଓଡ଼ିଆରେ ବିବରଣୀ ଉପଲବ୍ଧ ନାହିଁ । ଇଂରାଜୀ ସଂସ୍କରଣ ପ୍ରଦର୍ଶିତ ହେଉଛି :
                </div>
              </div>
            )}

            <div className="font-sans text-base text-[var(--color-dark-stone)] opacity-90 leading-loose text-justify whitespace-pre-line space-y-6">
              {paragraphs.length > 0 ? (
                <>
                  <AnimatePresence initial={false}>
                    {visibleParagraphs.map((para, idx) => (
                      <motion.p 
                        key={idx}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      >
                        {para}
                      </motion.p>
                    ))}
                  </AnimatePresence>
                  
                  {hasLongDescription && (
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="mt-8 flex items-center justify-center w-full gap-2 py-4 bg-[var(--color-neutral)] hover:bg-[var(--color-sandstone)] text-[var(--color-dark-stone)] rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-colors border border-[var(--color-muted-gold)]/50 shadow-sm"
                    >
                      {isExpanded ? (
                        <>Read Less <ChevronUp className="w-5 h-5" /></>
                      ) : (
                        <>Read More <ChevronDown className="w-5 h-5" /></>
                      )}
                    </button>
                  )}
                </>
              ) : (
                <p className="text-[var(--color-muted-gold)] italic font-medium">Detailed description not available.</p>
              )}
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
