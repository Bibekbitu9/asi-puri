import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Landmark, Sun, Castle, Compass, Activity, BookOpen, Users } from 'lucide-react';
import { Image } from '@unpic/react';
import { motion, useInView, animate, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import monumentsData from '../data/monuments.json';

function AnimatedCounter({ from, to }: { from: number; to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!inView) return;

    const controls = animate(from, to, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate(value) {
        element.textContent = Math.round(value).toString();
      },
    });

    return () => controls.stop();
  }, [from, to, inView]);

  return <span ref={ref}>{from}</span>;
}

export default function Home() {
  const { t, i18n } = useTranslation();
  
  // Parallax setup for Hero
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Grab featured monuments
  const featuredIds = [4, 1, 22, 32];
  const featuredMonuments = monumentsData.filter(m => featuredIds.includes(m.id));

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

  const getMonumentDistrict = (m: any) => m.metadata.en?.district || '';

  const getMonumentIcon = (id: number) => {
    switch (id) {
      case 4: return <Sun className="w-8 h-8" />;
      case 1: return <Landmark className="w-8 h-8" />;
      case 22: return <Castle className="w-8 h-8" />;
      case 32: return <Compass className="w-8 h-8" />;
      default: return <Landmark className="w-8 h-8" />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full bg-[var(--color-neutral)] text-[var(--color-dark-stone)]"
    >
      <SEO title={t('nav.home') || 'Home'} />
      
      {/* Bento Grid Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-[var(--color-neutral)] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        
        {/* Main Bento Container */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 md:gap-5 h-auto md:h-[600px] lg:h-[700px]">
          
          {/* Cell 1: Main Hero (Spans 3 cols, 2 rows) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="col-span-1 md:col-span-3 md:row-span-2 relative rounded-[2rem] overflow-hidden group shadow-sm flex flex-col justify-end p-6 sm:p-10 min-h-[400px] md:min-h-0"
          >
            {/* Background Image */}
            <Image
              src="/images/(4) The Ancient Monument of the Black Pagoda/2.JPG"
              layout="fullWidth"
              fetchPriority="high"
              className="absolute inset-0 object-cover w-full h-full group-hover:scale-105 transition-transform duration-[3s] ease-out"
              alt="Konark Sun Temple"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a100c]/90 via-[#1a100c]/30 to-transparent" />
            
            {/* Content Overlay */}
            <div className="relative z-10 w-full">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 font-bold text-[10px] uppercase tracking-[0.2em] mb-6"
              >
                <Landmark className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                <span>{t('hero.subtitle') || 'Odisha Heritage'}</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] text-white leading-[1.05] tracking-tight max-w-3xl drop-shadow-xl"
              >
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                  {t('hero.title')?.split(' ')[0] || 'Explore'}
                </span>
                <span className="block text-[var(--color-primary)]">
                  {t('hero.title')?.split(' ').slice(1).join(' ') || 'Ancient Wonders'}
                </span>
              </motion.h1>
            </div>
          </motion.div>

          {/* Cell 2: Stats Bento (Top Right) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="col-span-1 md:col-span-1 md:row-span-1 bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col justify-center relative overflow-hidden group hover:border-[var(--color-muted-gold)] transition-colors min-h-[150px]"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-[var(--color-primary)]/5 rounded-full blur-2xl group-hover:bg-[var(--color-primary)]/10 transition-colors" />
            
            <div className="flex items-center gap-4 mb-3 relative z-10">
              <div className="w-10 h-10 rounded-full bg-[var(--color-neutral)] flex items-center justify-center text-[var(--color-primary)] border border-[var(--color-muted-gold)]/30">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">Era</div>
                <div className="font-serif font-bold text-[var(--color-dark-stone)] text-lg">13th Century</div>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed relative z-10">
              UNESCO World Heritage Site located on the eastern shores.
            </p>
          </motion.div>

          {/* Cell 3: Secondary Image Bento (Bottom Right) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="col-span-1 md:col-span-1 md:row-span-2 relative rounded-[2rem] overflow-hidden shadow-sm group min-h-[250px] md:min-h-0"
          >
            <Image
              src="/images/(1) Shri Jagannath Temple/1.jpg"
              layout="fullWidth"
              className="absolute inset-0 object-cover w-full h-full group-hover:scale-110 transition-transform duration-[3s] ease-out"
              alt="Jagannath Temple"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-stone)]/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <div className="text-[10px] font-bold tracking-[0.1em] uppercase text-white/80 mb-1">Puri</div>
              <div className="font-serif font-bold text-xl">Jagannath Temple</div>
            </div>
          </motion.div>

          {/* Cell 4: Tagline Bento (Bottom Left) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="col-span-1 md:col-span-2 md:row-span-1 bg-[#2D1810] rounded-[2rem] p-6 sm:p-8 shadow-sm flex items-center relative overflow-hidden group min-h-[150px]"
          >
            <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')] mix-blend-overlay" />
            <div className="w-1.5 h-full bg-[var(--color-primary)] rounded-full mr-6 flex-shrink-0" />
            <p className="text-white/90 text-sm sm:text-base md:text-lg font-medium leading-relaxed font-sans max-w-lg">
              {t('hero.tagline') || 'Experience the architectural marvels of the 13th-century Sun Temple and other ancient monuments.'}
            </p>
          </motion.div>

          {/* Cell 5: Action CTA Bento (Bottom Middle) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="col-span-1 md:col-span-1 md:row-span-1 min-h-[150px]"
          >
            <Link
              to="/monuments"
              className="w-full h-full bg-[var(--color-primary)] rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between items-start group relative overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgba(226,122,63,0.4)] transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-md transition-transform duration-500 group-hover:scale-110 group-hover:bg-white group-hover:text-[var(--color-primary)]">
                <ArrowRight className="w-5 h-5 transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
              </div>
              <div className="mt-4">
                <span className="block font-bold text-white text-xs uppercase tracking-[0.2em] mb-1 opacity-80">Discover</span>
                <span className="block font-serif text-white text-2xl font-bold leading-none">Explore Now</span>
              </div>
            </Link>
          </motion.div>

        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-[var(--color-neutral)] relative overflow-hidden" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <div className="h-px w-16 bg-[var(--color-primary)]" />
                <span className="text-[var(--color-primary)] font-bold uppercase tracking-widest text-xs">
                  {t('hero.aboutCircle')}
                </span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--color-dark-stone)] leading-tight">
                {t('home.intro_title')}
              </h2>
              <p className="text-[var(--color-dark-stone)] opacity-80 text-base leading-relaxed text-justify">
                {t('home.intro_p1')}
              </p>
              <p className="text-[var(--color-dark-stone)] opacity-80 text-base leading-relaxed text-justify">
                {t('home.intro_p2')}
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-6 border-2 border-[var(--color-muted-gold)]/30 rounded-[2rem] transform rotate-3 scale-105" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  alt="Shri Jagannath Temple"
                  className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-1000"
                  src="/images/(1) Shri Jagannath Temple/1.jpg"
                  layout="fullWidth"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[var(--color-dark-stone)] text-[var(--color-neutral)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
              <Activity className="w-10 h-10 mx-auto text-[var(--color-primary)] mb-6" />
              <div className="font-serif text-5xl mb-3">
                <AnimatedCounter from={1} to={40} />
              </div>
              <div className="text-xs font-bold text-[var(--color-muted-gold)] uppercase tracking-[0.15em]">{t('home.stats_monuments')}</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-center">
              <BookOpen className="w-10 h-10 mx-auto text-[var(--color-primary)] mb-6" />
              <div className="font-serif text-5xl mb-3">
                <AnimatedCounter from={1} to={3} />
              </div>
              <div className="text-xs font-bold text-[var(--color-muted-gold)] uppercase tracking-[0.15em]">{t('home.stats_museums')}</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-center">
              <MapPin className="w-10 h-10 mx-auto text-[var(--color-primary)] mb-6" />
              <div className="font-serif text-5xl mb-3">
                <AnimatedCounter from={1} to={15} />
              </div>
              <div className="text-xs font-bold text-[var(--color-muted-gold)] uppercase tracking-[0.15em]">{t('home.stats_districts')}</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-center">
              <Users className="w-10 h-10 mx-auto text-[var(--color-primary)] mb-6" />
              <div className="font-serif text-5xl mb-3">
                <AnimatedCounter from={1} to={4} />
              </div>
              <div className="text-xs font-bold text-[var(--color-muted-gold)] uppercase tracking-[0.15em]">{t('home.stats_subcircles')}</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Monuments Section - Timeline/Cinematic Layout */}
      <section className="py-32 bg-[var(--color-neutral)] relative overflow-hidden" id="monuments">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-24 space-y-6"
          >
            <span className="text-[var(--color-primary)] font-bold uppercase tracking-[0.2em] text-xs block">
              {t('hero.subtitle')}
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[var(--color-dark-stone)] leading-tight">
              {t('home.featured_monuments')}
            </h2>
          </motion.div>

          <div className="space-y-32">
            {featuredMonuments.map((m, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-150px" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}
                >
                  {/* Image Block */}
                  <div className="w-full lg:w-3/5 relative group perspective-1000">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-2xl">
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-stone)]/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <Image
                        alt={getMonumentName(m)}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        src={m.images[0] || '/placeholder.png'}
                        layout="fullWidth"
                        loading="lazy"
                      />
                      {/* Floating Info */}
                      <div className="absolute bottom-6 left-6 z-20 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <Link
                          to={`/monuments/${m.id}`}
                          className="bg-white/95 backdrop-blur px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors flex items-center gap-2"
                        >
                          Explore Monument <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                    {/* Decorative Elements */}
                    <div className={`absolute -z-10 w-full h-full border border-[var(--color-muted-gold)]/40 rounded-2xl top-4 ${isEven ? '-right-4' : '-left-4'}`} />
                  </div>

                  {/* Content Block */}
                  <div className="w-full lg:w-2/5 space-y-8">
                    <div className="text-[var(--color-primary)]">
                      {getMonumentIcon(m.id)}
                    </div>
                    <div className="space-y-4">
                      <div className="text-xs font-bold tracking-widest text-[var(--color-muted-gold)] uppercase flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {getMonumentLocality(m)}, {getMonumentDistrict(m)}
                      </div>
                      <h3 className="font-serif text-3xl md:text-4xl text-[var(--color-dark-stone)] leading-snug">
                        {getMonumentName(m)}
                      </h3>
                      <p className="text-[var(--color-dark-stone)] opacity-70 text-sm leading-relaxed border-l-2 border-[var(--color-primary)] pl-4">
                        {m.metadata.en?.period || 'Ancient Heritage of Odisha'}
                      </p>
                    </div>
                    <Link
                      className="inline-flex items-center text-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-muted-gold)] transition-colors uppercase tracking-[0.15em] group"
                      to={`/monuments/${m.id}`}
                    >
                      {t('monuments.view_details')}{' '}
                      <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-2" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-32"
          >
            <Link
              className="inline-flex items-center justify-center px-10 py-4 border-2 border-[var(--color-primary)] bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 font-bold uppercase text-xs tracking-[0.2em] rounded-full shadow-[0_8px_30px_rgba(226,122,63,0.15)]"
              to="/monuments"
            >
              {t('home.view_all')}
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
