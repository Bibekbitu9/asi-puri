import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Image } from '@unpic/react';
import { motion, AnimatePresence } from 'framer-motion';
import './HeroCarousel.css';

const CAROUSEL_SLIDES = [
  {
    id: 1,
    monumentId: 4,
    image: '/images/(4) The Ancient Monument of the Black Pagoda/1 (4).JPG',
    titleKey: 'hero_slider.slide1_title',
    subKey: 'hero_slider.slide1_sub',
    ctaKey: 'hero_slider.slide1_cta',
    link: '/monuments/4',
    locationEn: 'Konark, Puri'
  },
  {
    id: 2,
    monumentId: 1,
    image: '/images/(1) Shri Jagannath Temple/1.jpg',
    titleKey: 'hero_slider.slide2_title',
    subKey: 'hero_slider.slide2_sub',
    ctaKey: 'hero_slider.slide2_cta',
    link: '/monuments/1',
    locationEn: 'Puri, Puri'
  },
  {
    id: 3,
    monumentId: 32,
    image: '/images/(32) Old hill, Ratnagiri, Jajpur/09. Ratnagiri, Jajpur (1).jpg',
    titleKey: 'hero_slider.slide3_title',
    subKey: 'hero_slider.slide3_sub',
    ctaKey: 'hero_slider.slide3_cta',
    link: '/monuments/32',
    locationEn: 'Ratnagiri, Jajpur'
  }
];

const AUTO_ADVANCE_MS = 6000;

export default function HeroCarousel() {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const autoAdvanceTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressStart = useRef(Date.now());

  const totalSlides = CAROUSEL_SLIDES.length;

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
          aria-label={`Slide ${currentSlide + 1} of ${totalSlides}: ${t(currentConfig.titleKey)}`}
        >
          {/* Background Image */}
          <Image
            src={currentConfig.image}
            alt={t(currentConfig.titleKey) as string}
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
            <div className="hero-slide__glass !bg-[rgba(255,255,255,0.75)] !backdrop-blur-xl border border-[var(--color-glass-border)] !shadow-[0_8px_32px_rgba(193,154,107,0.3)]">
              {/* Location Chip */}
              <div className="hero-location !bg-[var(--color-saffron)]/10 !border-[var(--color-saffron)]/30">
                <MapPin className="w-3 h-3 text-[var(--color-primary)]" />
                <span className="hero-location__text !text-[var(--color-text-primary)]">
                  {currentConfig.locationEn}
                </span>
              </div>

              {/* Monument Name */}
              <h2 className="font-serif text-[1.5rem] md:text-[2.5rem] font-bold text-[var(--color-text-primary)] leading-tight mb-2 drop-shadow-sm">
                {t(currentConfig.titleKey)}
              </h2>

              {/* Tagline */}
              <p className="text-sm md:text-base text-[var(--color-text-secondary)] font-medium mb-6 font-sans">
                {t(currentConfig.subKey)}
              </p>

              {/* CTA Button */}
              <Link
                to={currentConfig.link}
                className="hero-cta !bg-gradient-to-r !from-[var(--color-primary)] !to-[var(--color-saffron)] !shadow-[0_4px_15px_rgba(226,122,63,0.35)]"
                id={`hero-cta-slide-${currentSlide}`}
              >
                <span>{t(currentConfig.ctaKey)}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Desktop Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[rgba(255,255,255,0.7)] backdrop-blur-md border border-[var(--color-glass-border)] items-center justify-center text-[var(--color-text-primary)] hover:bg-white hover:shadow-lg transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[rgba(255,255,255,0.7)] backdrop-blur-md border border-[var(--color-glass-border)] items-center justify-center text-[var(--color-text-primary)] hover:bg-white hover:shadow-lg transition-all duration-300 group"
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
            className={`hero-dot ${index === currentSlide ? 'hero-dot--active' : 'hero-dot--inactive'} !shadow-none`}
            style={{
               backgroundColor: index === currentSlide ? 'var(--color-primary)' : 'rgba(255,255,255,0.8)'
            }}
            role="tab"
            aria-selected={index === currentSlide}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
