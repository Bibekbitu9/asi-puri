import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { Building2, Compass, MapPin } from 'lucide-react';

export default function AboutUs() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full min-h-screen bg-[var(--color-surface)] text-[var(--color-dark-stone)] relative overflow-hidden pb-20"
    >
      <SEO title={t('about_page.title')} />
      
      {/* Background Glows for Glassmorphism depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--color-saffron)] opacity-10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--color-muted-gold)] opacity-15 blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[var(--color-glass-surface)] border border-[var(--color-glass-border)] backdrop-blur-xl">
            <span className="text-[var(--color-saffron)] font-bold uppercase tracking-[0.2em] text-xs">
              Heritage Gateway
            </span>
          </div>
          <h1 className="font-serif text-[2.5rem] md:text-[3.5rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-indigo)] via-[#A8451A] to-[var(--color-saffron)] leading-tight drop-shadow-[0_4px_12px_rgba(226,122,63,0.2)]">
            {t('about_page.title')}
          </h1>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 md:space-y-12"
        >
          {/* About ASI */}
          <motion.div variants={itemVariants} className="relative group perspective-1000">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-saffron)] to-[var(--color-muted-gold)] rounded-[28px] blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative bg-[var(--color-glass-surface)] backdrop-blur-xl border border-[var(--color-glass-border)] rounded-[28px] p-6 md:p-10 shadow-[0_20px_40px_rgba(74,28,10,0.05)]">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-white shadow-inner">
                  <Building2 className="w-6 h-6 text-[var(--color-saffron)]" />
                </div>
                <h2 className="font-serif text-[1.5rem] md:text-[2rem] font-bold text-[var(--color-indigo)] tracking-tight">
                  {t('about_page.asi_title')}
                </h2>
              </div>
              <p className="text-[var(--color-dark-stone)] opacity-90 text-base md:text-lg leading-relaxed text-justify">
                {t('about_page.asi_desc')}
              </p>
            </div>
          </motion.div>

          {/* About Puri Circle */}
          <motion.div variants={itemVariants} className="relative group perspective-1000">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-indigo)] to-[var(--color-saffron)] rounded-[28px] blur-md opacity-10 group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="relative bg-[var(--color-glass-surface)] backdrop-blur-xl border border-[var(--color-glass-border)] rounded-[28px] p-6 md:p-10 shadow-[0_20px_40px_rgba(74,28,10,0.05)]">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-white shadow-inner">
                  <Compass className="w-6 h-6 text-[var(--color-saffron)]" />
                </div>
                <h2 className="font-serif text-[1.5rem] md:text-[2rem] font-bold text-[var(--color-indigo)] tracking-tight">
                  {t('about_page.circle_title')}
                </h2>
              </div>
              <p className="text-[var(--color-dark-stone)] opacity-90 text-base md:text-lg leading-relaxed text-justify">
                {t('about_page.circle_desc')}
              </p>
            </div>
          </motion.div>

          {/* Jurisdiction */}
          <motion.div variants={itemVariants} className="relative group perspective-1000">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-muted-gold)] to-[var(--color-indigo)] rounded-[28px] blur-md opacity-10 group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="relative bg-[var(--color-glass-surface)] backdrop-blur-xl border border-[var(--color-glass-border)] rounded-[28px] p-6 md:p-10 shadow-[0_20px_40px_rgba(74,28,10,0.05)]">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-white shadow-inner">
                  <MapPin className="w-6 h-6 text-[var(--color-saffron)]" />
                </div>
                <h2 className="font-serif text-[1.5rem] md:text-[2rem] font-bold text-[var(--color-indigo)] tracking-tight">
                  {t('about_page.jurisdiction_title')}
                </h2>
              </div>
              <p className="text-[var(--color-dark-stone)] opacity-90 text-base md:text-lg leading-relaxed text-justify">
                {t('about_page.jurisdiction_desc')}
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </motion.div>
  );
}
