import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Image } from '@unpic/react';
import { motion, AnimatePresence } from 'framer-motion';
import monumentsData from '../data/monuments.json';
import './HeroCarousel.css';

// Carousel slides configuration
const CAROUSEL_SLIDES = [
  {
    monumentId: 1,
    shortName: 'Shri Jagannath Temple',
    tagline: 'The Abode of Lord Jagannath',
    image: '/images/(1) Shri Jagannath Temple/1.jpg',
  },
  {
    monumentId: 22,
    shortName: 'Barabati Fortress',
    tagline: 'Medieval Stone Fortress',
    image: '/images/(22) Churanga Garh Fort locally known as Sarangarh, Cuttack &Khurda/24. Churanga Garh Fort  (1).jpg',
  },
  {
    monumentId: 32,
    shortName: 'Ratnagiri Buddhist Ruins',
    tagline: 'Buddhist Heritage of Odisha',
    image: '/images/(32) Old hill, Ratnagiri, Jajpur/09. Ratnagiri, Jajpur (1).jpg',
  },
];

const AUTO_ADVANCE_MS = 6000;

export default function HeroCarousel() {
  const { t, i18n } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const autoAdvanceTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressStart = useRef(Date.now());

  const totalSlides = CAROUSEL_SLIDES.length;

  const getMonumentName = useCallback((id: number) => {
    const m = monumentsData.find((mon: any) => mon.id === id);
    if (!m) return '';
    const lang = i18n.language as 'en' | 'hi' | 'od';
    return (m as any).names[lang] || (m as any).names.en;
  }, [i18n.language]);

  const getMonumentLocality = useCallback((id: number) => {
    const m = monumentsData.find((mon: any) => mon.id === id);
    if (!m) return '';
    const lang = i18n.language as 'en' | 'hi' | 'od';
    if (lang === 'od') {
      return (m as any).metadata.en?.locality || '';
    }
    return (m as any).metadata[lang]?.locality || (m as any).metadata.en?.locality || '';
  }, [i18n.language]);

  const getMonumentDistrict = useCallback((id: number) => {
    const m = monumentsData.find((mon: any) => mon.id === id);
    if (!m) return '';
    return (m as any).metadata.en?.district || '';
  }, []);

  // Navigate to a specific slide
  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    progressStart.current = Date.now();
  }, [currentSlide]);

  // Next slide
  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    progressStart.current = Date.now();
  }, [totalSlides]);

  // Previous slide
  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    progressStart.current = Date.now();
  }, [totalSlides]);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    progressStart.current = Date.now();
    autoAdvanceTimer.current = setInterval(() => {
      nextSlide();
    }, AUTO_ADVANCE_MS);
    return () => {
      if (autoAdvanceTimer.current) clearInterval(autoAdvanceTimer.current);
    };
  }, [isPaused, nextSlide]);

  // Progress bar animation
  useEffect(() => {
    if (isPaused) return;
    let raf: number;
    const animate = () => {
      if (progressRef.current) {
        const elapsed = Date.now() - progressStart.current;
        const progress = Math.min((elapsed / AUTO_ADVANCE_MS) * 100, 100);
        progressRef.current.style.width = `${progress}%`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isPaused, currentSlide]);

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - endX;
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    setIsPaused(false);
  }, [nextSlide, prevSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Slide animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      scale: 1.08,
      x: dir > 0 ? 60 : -60,
    }),
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
    },
    exit: (dir: number) => ({
      opacity: 0,
      scale: 1.04,
      x: dir > 0 ? -60 : 60,
    }),
  };

  const contentVariants = {
    enter: { opacity: 0, y: 30 },
    center: { opacity: 1, y: 0, transition: { delay: 0.25, duration: 0.5, ease: 'easeOut' as const } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  const currentConfig = CAROUSEL_SLIDES[currentSlide];

  return (
    <section
      className="hero-carousel"
      role="region"
      aria-label="Featured Monuments Carousel"
      aria-roledescription="carousel"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Progress Bar */}
      <div ref={progressRef} className="hero-progress" />

      {/* Background Slides */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="hero-slide"
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${currentSlide + 1} of ${totalSlides}: ${getMonumentName(currentConfig.monumentId)}`}
        >
          {/* Background Image */}
          <Image
            src={currentConfig.image}
            alt={getMonumentName(currentConfig.monumentId)}
            layout="fullWidth"
            className="hero-slide__image"
            fetchPriority={currentSlide === 0 ? 'high' : 'auto'}
          />

          {/* Gradient Overlay */}
          <div className="hero-slide__overlay" />

          {/* Content Card */}
          <motion.div
            variants={contentVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="hero-slide__content"
          >
            <div className="hero-slide__glass">
              {/* Location Chip */}
              <div className="hero-location">
                <MapPin className="w-3 h-3 text-[var(--color-primary)]" />
                <span className="hero-location__text">
                  {getMonumentLocality(currentConfig.monumentId)}, {getMonumentDistrict(currentConfig.monumentId)}
                </span>
              </div>

              {/* Monument Name */}
              <h2 className="font-serif text-[1.5rem] md:text-[2.5rem] font-bold text-white leading-tight mb-1 drop-shadow-lg line-clamp-2">
                {currentConfig.shortName}
              </h2>

              {/* Tagline */}
              <p className="text-sm md:text-base text-white/75 italic mb-5 font-sans">
                '{currentConfig.tagline}'
              </p>

              {/* CTA Button */}
              <Link
                to={`/monuments/${currentConfig.monumentId}`}
                className="hero-cta"
                id={`hero-cta-slide-${currentSlide}`}
              >
                <span>{t('hero.explore') || 'Explore Monument'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Desktop Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Dot Indicators */}
      <div className="hero-dots" role="tablist" aria-label="Carousel navigation">
        {CAROUSEL_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`hero-dot ${index === currentSlide ? 'hero-dot--active' : 'hero-dot--inactive'}`}
            role="tab"
            aria-selected={index === currentSlide}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
