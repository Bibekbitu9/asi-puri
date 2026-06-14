import { useTranslation } from 'react-i18next';
import { Mail, Share2, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-slate-100 pt-16 pb-8 border-t border-slate-700 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none transform translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-8 mb-8 relative z-10 px-4 sm:px-6 lg:px-8">
        
        {/* Brand Information */}
        <div className="flex flex-col items-center max-w-lg text-center">
          <div className="flex items-center gap-3 mb-4">
            <img
              alt="ASI Logo"
              className="h-10 w-10 brightness-200 contrast-100 opacity-90 bg-white p-1 rounded-full border border-slate-300 shadow-[0_4px_15px_rgba(0,0,0,0.05)]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWyb98dUAZQ5Uqkfb9RMCiPybf3oVtTyJPP-OEYw-nqza1PLcZZ6wzPOGYAQV3XoxNkfF_qehF9SSLyamK8fXDPpRB1-S8_kNyP_-9Q2Xla6Pk_ehB2sa6jgT2-VSRynNGOXBpVssCfapY8iFt3lsqgzD3a17S1k4t3Pz-AIPL3Z3ZuRHeojbip6oLEw-hFiNvOFgquex7IZsehaOPDBkk1OasIzdS5yPLJEjUOA07r3f8sf1OoF5RzsXBSTAtZBzWdvlC8DQon2Rr"
            />
            <div className="flex flex-col items-start">
              <h3 className="font-sans text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent uppercase tracking-wider">
                {t('hero.title')}
              </h3>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-300 max-w-2xl">
            {t('home.intro_p1')}
          </p>
        </div>
      </div>

      {/* Bottom Rights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-700/50 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <p className="text-xs text-slate-400 font-medium">
          &copy; {new Date().getFullYear()} {t('hero.title')}. All rights reserved.
        </p>
        <div className="flex gap-6 text-xs text-slate-400 font-medium">
          <span className="hover:text-amber-400 cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-amber-400 cursor-pointer transition-colors">Terms of Use</span>
          <span className="hover:text-amber-400 cursor-pointer transition-colors">Sitemap</span>
        </div>
        <div className="flex gap-4">
          <button aria-label="Share" className="hover:text-amber-400 transition-colors bg-slate-800 p-2 rounded-full border border-slate-700 shadow-sm hover:border-amber-500">
            <Share2 className="w-4 h-4" />
          </button>
          <button aria-label="Contact" className="hover:text-amber-400 transition-colors bg-slate-800 p-2 rounded-full border border-slate-700 shadow-sm hover:border-amber-500">
            <Mail className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
