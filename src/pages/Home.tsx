import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Landmark, Sun, Castle, Compass, Activity, BookOpen, Users } from 'lucide-react';
import { Image } from '@unpic/react';
import { motion, useInView, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import HeroCarousel from '../components/HeroCarousel';
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
      case 4: return <Sun className="w-7 h-7 md:w-8 md:h-8" />;
      case 1: return <Landmark className="w-7 h-7 md:w-8 md:h-8" />;
      case 22: return <Castle className="w-7 h-7 md:w-8 md:h-8" />;
      case 32: return <Compass className="w-7 h-7 md:w-8 md:h-8" />;
      default: return <Landmark className="w-7 h-7 md:w-8 md:h-8" />;
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
      
      {/* Hero Carousel Section */}
      <HeroCarousel />

      {/* About Section */}
      <section className="py-16 md:py-24 bg-[var(--color-neutral)] relative overflow-hidden" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center">
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
              <h2 className="font-serif text-[1.75rem] md:text-[2.5rem] font-bold text-[var(--color-dark-stone)] leading-tight">
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
                  className="w-full h-[300px] md:h-[500px] object-cover hover:scale-105 transition-transform duration-1000"
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
      <section className="py-12 md:py-20 bg-[var(--color-dark-stone)] text-[var(--color-neutral)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
              <Activity className="w-8 h-8 md:w-10 md:h-10 mx-auto text-[var(--color-primary)] mb-4 md:mb-6" />
              <div className="font-serif text-3xl md:text-5xl mb-2 md:mb-3">
                <AnimatedCounter from={1} to={40} />
              </div>
              <div className="text-xs font-bold text-[var(--color-muted-gold)] uppercase tracking-[0.15em]">{t('home.stats_monuments')}</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-center">
              <BookOpen className="w-8 h-8 md:w-10 md:h-10 mx-auto text-[var(--color-primary)] mb-4 md:mb-6" />
              <div className="font-serif text-3xl md:text-5xl mb-2 md:mb-3">
                <AnimatedCounter from={1} to={3} />
              </div>
              <div className="text-xs font-bold text-[var(--color-muted-gold)] uppercase tracking-[0.15em]">{t('home.stats_museums')}</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-center">
              <MapPin className="w-8 h-8 md:w-10 md:h-10 mx-auto text-[var(--color-primary)] mb-4 md:mb-6" />
              <div className="font-serif text-3xl md:text-5xl mb-2 md:mb-3">
                <AnimatedCounter from={1} to={15} />
              </div>
              <div className="text-xs font-bold text-[var(--color-muted-gold)] uppercase tracking-[0.15em]">{t('home.stats_districts')}</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-center">
              <Users className="w-8 h-8 md:w-10 md:h-10 mx-auto text-[var(--color-primary)] mb-4 md:mb-6" />
              <div className="font-serif text-3xl md:text-5xl mb-2 md:mb-3">
                <AnimatedCounter from={1} to={4} />
              </div>
              <div className="text-xs font-bold text-[var(--color-muted-gold)] uppercase tracking-[0.15em]">{t('home.stats_subcircles')}</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Monuments Section - Timeline/Cinematic Layout */}
      <section className="py-16 md:py-32 bg-[var(--color-neutral)] relative overflow-hidden" id="monuments">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12 md:mb-24 space-y-4 md:space-y-6"
          >
            <span className="text-[var(--color-primary)] font-bold uppercase tracking-[0.2em] text-xs block">
              {t('hero.subtitle')}
            </span>
            <h2 className="font-serif text-[1.75rem] md:text-[2.5rem] text-[var(--color-dark-stone)] leading-tight">
              {t('home.featured_monuments')}
            </h2>
          </motion.div>

          <div className="space-y-16 md:space-y-32">
            {featuredMonuments.map((m, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-150px" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-20`}
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
                      <h3 className="font-serif text-[1.25rem] md:text-[1.5rem] text-[var(--color-dark-stone)] leading-snug">
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
            className="text-center mt-16 md:mt-32"
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
