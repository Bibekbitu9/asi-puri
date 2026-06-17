import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Landmark, Sun, Castle, Compass, Activity, BookOpen, Users } from 'lucide-react';
import { Image } from '@unpic/react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import monumentsData from '../data/monuments.json';

export default function Home() {
  const { t, i18n } = useTranslation();

  // Grab featured monuments: Konark (4), Jagannath Temple (1), Barabati Fort (22), Ratnagiri (32)
  const featuredIds = [4, 1, 22, 32];
  const featuredMonuments = monumentsData.filter(m => featuredIds.includes(m.id));

  // Helper to translate monument details dynamically
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
    return m.metadata.en?.district || '';
  };

  // Helper to render distinct icons for monuments
  const getMonumentIcon = (id: number) => {
    switch (id) {
      case 4:
        return <Sun className="w-6 h-6" />;
      case 1:
        return <Landmark className="w-6 h-6" />;
      case 22:
        return <Castle className="w-6 h-6" />;
      case 32:
        return <Compass className="w-6 h-6" />;
      default:
        return <Landmark className="w-6 h-6" />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full bg-slate-200 text-slate-800"
    >
      <SEO title={t('nav.home') || 'Home'} />
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image using unpic for optimization */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/(4) The Ancient Monument of the Black Pagoda/2.JPG"
            layout="fullWidth"
            fetchPriority="high"
            className="object-cover w-full h-full"
            alt="Konark Sun Temple Hero Image"
          />
        </div>
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-slate-900/60 z-10 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-200 via-slate-200/40 to-transparent z-10"></div>


        {/* Hero Content */}
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-sans text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 drop-shadow-2xl leading-tight tracking-tight"
          >
            {t('hero.title')}
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="font-sans text-2xl md:text-3xl bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent font-bold mb-8 tracking-wide drop-shadow-md"
          >
            {t('hero.subtitle')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="text-slate-200 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-10 drop-shadow-lg"
          >
            {t('hero.tagline')}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
            className="flex gap-4"
          >
            <Link
              className="bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-500 hover:to-orange-600 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 shadow-[0_8px_30px_rgba(217,119,6,0.3)] flex items-center gap-2 uppercase text-xs tracking-widest"
              to="/monuments"
            >
              {t('hero.explore')}
              <ArrowRight className="w-4 h-4 animate-pulse" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-slate-200 border-b border-slate-300 relative overflow-hidden" id="about">
        {/* Decorative pattern overlay */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-amber-600/5 via-rose-600/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-amber-600" />
                <span className="text-amber-700 font-bold uppercase tracking-widest text-xs">
                  {t('hero.aboutCircle')}
                </span>
              </div>
              <h2 className="font-sans text-3xl sm:text-4xl font-bold text-slate-900 leading-tight tracking-tight">
                {t('home.intro_title')}
              </h2>
              <p className="text-slate-700 text-sm leading-relaxed text-justify">
                {t('home.intro_p1')}
              </p>
              <p className="text-slate-700 text-sm leading-relaxed text-justify">
                {t('home.intro_p2')}
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 to-orange-500 opacity-20 blur-xl rounded-2xl transform rotate-3" />
              <Image
                alt="Shri Jagannath Temple"
                className="relative rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.15)] object-cover w-full h-[450px] border border-slate-300"
                src="/images/(1) Shri Jagannath Temple/1.jpg"
                layout="fullWidth"
                loading="lazy"
                background="auto"
              />
              {/* Floating Badge */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="absolute -bottom-6 -left-6 bg-slate-100/90 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-xs border border-slate-300 hidden sm:block"
              >
                <Landmark className="text-amber-600 w-8 h-8 mb-2" />
                <h3 className="font-sans font-bold text-lg text-slate-900">Heritage Conservation</h3>
                <p className="text-sm text-slate-700 mt-1">Employing scientific methods to restore ancient stone structures.</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-100 border-b border-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-200"
            >
              <Activity className="w-8 h-8 mx-auto text-amber-600 mb-4" />
              <div className="text-4xl font-bold text-slate-900 mb-2">40</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t('home.stats_monuments')}</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-200"
            >
              <BookOpen className="w-8 h-8 mx-auto text-amber-600 mb-4" />
              <div className="text-4xl font-bold text-slate-900 mb-2">3</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t('home.stats_museums')}</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-200"
            >
              <MapPin className="w-8 h-8 mx-auto text-amber-600 mb-4" />
              <div className="text-4xl font-bold text-slate-900 mb-2">15</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t('home.stats_districts')}</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
              className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-200"
            >
              <Users className="w-8 h-8 mx-auto text-amber-600 mb-4" />
              <div className="text-4xl font-bold text-slate-900 mb-2">4</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t('home.stats_subcircles')}</div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Featured Monuments Section */}
      <section className="py-24 bg-slate-200 relative" id="monuments">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16 space-y-4"
          >
            <span className="text-amber-700 font-bold uppercase tracking-widest text-xs block">
              {t('hero.subtitle')}
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              {t('home.featured_monuments')}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-600 mx-auto rounded-full" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {featuredMonuments.map((m, index) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-300 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:border-amber-400 flex flex-col"
              >
                {/* Image */}
                <div className="h-56 overflow-hidden relative bg-slate-200">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10 pointer-events-none" />
                  <Image
                    alt={getMonumentName(m)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-95 group-hover:opacity-100"
                    src={m.images[0] || '/placeholder.png'}
                    layout="fullWidth"
                    loading="lazy"
                    background="auto"
                  />
                  <div className="absolute top-4 right-4 z-20 bg-slate-100/90 border border-slate-300 backdrop-blur-md text-[10px] font-bold px-3 py-1 rounded-full text-amber-700 uppercase tracking-widest">
                    {m.metadata.en?.period?.split(' ')[0] || 'Ancient'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 relative z-20 flex-grow flex flex-col justify-between">
                  <div className="mb-6">
                    <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg mb-4 text-white">
                      {getMonumentIcon(m.id)}
                    </div>
                    <h3 className="font-sans text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-700 transition-colors leading-snug line-clamp-2">
                      {getMonumentName(m)}
                    </h3>
                    <p className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      <span>{getMonumentLocality(m)}, {getMonumentDistrict(m)}</span>
                    </p>
                  </div>

                  <Link
                    className="inline-flex items-center text-xs font-bold text-amber-700 hover:text-amber-600 transition-colors uppercase tracking-widest"
                    to={`/monuments/${m.id}`}
                  >
                    {t('monuments.view_details')}{' '}
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-16"
          >
            <Link
              className="inline-flex items-center justify-center px-8 py-3 border border-amber-300 bg-amber-100 text-amber-700 hover:bg-amber-600 hover:text-white hover:border-amber-600 transition-all duration-300 font-bold uppercase text-xs tracking-widest rounded-full shadow-sm hover:shadow-[0_8px_30px_rgba(217,119,6,0.3)]"
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
