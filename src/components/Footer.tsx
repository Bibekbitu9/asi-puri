import { useTranslation } from 'react-i18next';
import { Mail, Share2, MapPin, Phone } from 'lucide-react';
import { Image } from '@unpic/react';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-r from-[#2D1810] via-[#462819] to-[#603B22] backdrop-blur-md text-[#F8F5F0] pt-16 pb-8 border-t border-[#C19A6B]/30 relative overflow-hidden shadow-[0_-4px_20px_rgba(45,24,16,0.5)]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#C15C20]/20 rounded-full blur-3xl pointer-events-none transform translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-8 mb-8 relative z-10 px-4 sm:px-6 lg:px-8">

        {/* Brand Information */}
        <div className="flex flex-col items-center max-w-lg text-center">
          <div className="flex items-center gap-3 mb-4">
            <Image
              alt="ASI Puri Circle Logo"
              className="h-10 w-10 sm:h-14 sm:w-14 object-contain flex-shrink-0"
              src="/asi_logo.jpg.jpeg"
              layout="fixed"
              width={56}
              height={56}
            />
            <div className="flex flex-col items-start">
              <h3 className="font-sans text-[1.25rem] md:text-[1.5rem] font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent uppercase tracking-wider">
                {t('hero.title')}
              </h3>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-[#E6D8B8] max-w-2xl">
            {t('home.intro_p1')}
          </p>
        </div>
      </div>

      {/* Bottom Rights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-[#E6D8B8]/20 flex justify-center items-center text-center relative z-10">
        <p className="text-xs text-[#E6D8B8]/80 font-medium">
          &copy; {new Date().getFullYear()} {t('hero.title')}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
