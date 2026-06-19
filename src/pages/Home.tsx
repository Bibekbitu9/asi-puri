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
      
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[var(--color-neutral)] pt-20 pb-12">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%232E2C29\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Text Content (Left Side) */}
          <div className="col-span-1 lg:col-span-6 flex flex-col items-start text-left space-y-6 relative z-40 pt-10 lg:pt-0">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white shadow-sm border border-[var(--color-muted-gold)]/30 text-[var(--color-primary)] font-bold text-[10px] uppercase tracking-[0.2em]"
            >
              <Landmark className="w-4 h-4" />
              <span>{t('hero.subtitle') || 'Odisha Heritage'}</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-[4.2rem] text-[var(--color-dark-stone)] leading-[1.1] tracking-tight mb-2 drop-shadow-sm">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[#A8451A] pb-2">
                  {t('hero.title')?.split(' ')[0] || 'Explore'}
                </span>
                <span className="block text-[var(--color-dark-stone)]">
                  {t('hero.title')?.split(' ').slice(1).join(' ') || 'Ancient Wonders'}
                </span>
              </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-[var(--color-dark-stone)]/70 text-base sm:text-lg font-medium max-w-md leading-relaxed border-l-2 border-[var(--color-primary)]/50 pl-4"
            >
              {t('hero.tagline') || 'Experience the architectural marvels of the 13th-century Sun Temple and other ancient monuments.'}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center gap-6 pt-2"
            >
              <Link
                className="group relative overflow-hidden bg-[var(--color-primary)] text-white px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-[0_8px_30px_rgba(226,122,63,0.3)] hover:shadow-[0_8px_40px_rgba(226,122,63,0.5)] hover:-translate-y-1 flex items-center gap-3 uppercase text-[10px] tracking-[0.2em]"
                to="/monuments"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('hero.explore') || 'Explore Now'}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></div>
              </Link>
              
              <a href="#about" className="group flex items-center gap-3 font-bold text-[var(--color-dark-stone)] text-[10px] uppercase tracking-[0.2em] hover:text-[var(--color-primary)] transition-colors">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-[var(--color-muted-gold)]/20 flex items-center justify-center group-hover:border-[var(--color-primary)] transition-colors">
                  <ArrowRight className="w-4 h-4 transform rotate-90 text-[var(--color-primary)] transition-transform group-hover:translate-y-1" />
                </div>
                Learn More
              </a>
            </motion.div>
          </div>

          {/* Image Composition (Right Side) */}
          <div className="col-span-1 lg:col-span-6 relative h-[400px] sm:h-[500px] lg:h-[550px] w-full flex items-center justify-end mt-10 lg:mt-0 z-10">
            
            {/* Main arched image */}
            <motion.div 
              style={{ y: heroY }}
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              className="absolute right-0 w-[80%] sm:w-[75%] h-[95%] rounded-t-full rounded-b-[2.5rem] overflow-hidden shadow-2xl border-8 border-white z-10"
            >
              <Image
                src="/images/(4) The Ancient Monument of the Black Pagoda/2.JPG"
                layout="fullWidth"
                fetchPriority="high"
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-[2s]"
                alt="Konark Sun Temple"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-stone)]/40 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Secondary floating image */}
            <motion.div 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
              className="absolute top-[10%] left-[5%] lg:left-[10%] w-[45%] sm:w-[35%] aspect-[3/4] rounded-[2rem] overflow-hidden shadow-xl border-8 border-white z-20"
            >
              <Image
                src="/images/(1) Shri Jagannath Temple/1.jpg"
                layout="fullWidth"
                className="object-cover w-full h-full hover:scale-110 transition-transform duration-[2s]"
                alt="Jagannath Temple"
              />
            </motion.div>

            {/* Floating glassmorphic stats card */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="absolute bottom-[10%] left-[10%] sm:left-[15%] bg-white/85 backdrop-blur-md p-4 sm:p-5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-white max-w-[180px] sm:max-w-[220px] z-30"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] flex-shrink-0">
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[9px] font-bold text-[var(--color-primary)] tracking-[0.2em] uppercase">Built In</div>
                  <div className="font-serif font-bold text-[var(--color-dark-stone)] text-sm sm:text-base">13th Century</div>
                </div>
              </div>
              <p className="text-[9px] sm:text-[10px] text-[var(--color-dark-stone)]/70 font-medium leading-relaxed">
                UNESCO World Heritage Site located on the eastern shores.
              </p>
            </motion.div>

          </div>
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
