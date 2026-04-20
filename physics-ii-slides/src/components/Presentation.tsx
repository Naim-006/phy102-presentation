import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2, Zap, Sun, Moon } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface PresentationProps {
  children: React.ReactNode[];
}

export const Presentation = ({ children }: PresentationProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [scale, setScale] = useState(1);
  const [isPortrait, setIsPortrait] = useState(false);
  const totalSlides = React.Children.count(children);
  const PRESENTERS = [
     { start: 0, end: 5, name: "Naim Hossain", id: "252-15-178" },
    { start: 6, end: 7, name: "Md Ajmine Adil Sadik", id: "252-15-172" },
    { start: 8, end: 9, name: "Jannat Ferdous Asha", id: "252-15-179" },
    { start: 10, end: 10, name: "Diya Bipasha", id: "252-15-652" },
    { start: 11, end: 12, name: "Tasneem Binte Aziz", id: "252-15-070" },
  ];

  const currentPresenter = PRESENTERS.find(p => currentSlide >= p.start && currentSlide <= p.end);
  const isIntroSlide = currentPresenter?.start === currentSlide;

  const updateScale = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const portrait = height > width;
    setIsPortrait(portrait);

    // Target dimensions
    // Horizontal: 1280x720 (16:9)
    // Vertical: 720x1280 (9:16)
    const targetWidth = portrait ? 720 : 1280;
    const targetHeight = portrait ? 1280 : 720;

    let newScale = 1;

    if (portrait) {
      // Portrait: Fill width exactly
      newScale = width / targetWidth;
    } else {
      // Landscape: Maximize fit
      const scaleW = width / targetWidth;
      const scaleH = height / targetHeight;
      newScale = Math.min(scaleW, scaleH);
    }

    setScale(newScale);
  }, []);

  useEffect(() => {
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [updateScale]);

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1 < totalSlides ? prev + 1 : prev));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  }, []);

  // Swipe Support
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <div 
      className="relative w-screen h-screen flex items-center justify-center bg-physics-bg overflow-hidden font-sans touch-none"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Background Effect */}
      <div className="absolute inset-0 z-0 opacity-50 pointer-events-none grid-background" />

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-900 z-50">
        <motion.div 
          className="h-full bg-physics-accent shadow-[0_0_10px_#00d4ff]"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Presenter Name - Top Right corner for the 1st slide of each presenter */}
      <AnimatePresence>
        {isIntroSlide && currentPresenter && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 20 }}
            className="absolute top-6 right-8 z-[60] flex flex-col items-end pointer-events-none"
          >
            <div className="flex items-center gap-3 bg-physics-surface/90 backdrop-blur-md border border-physics-accent px-6 py-3 rounded-2xl shadow-[0_0_30px_rgba(0,212,255,0.2)]">
              <div className="w-2 h-2 rounded-full bg-physics-accent animate-pulse" />
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-physics-accent uppercase tracking-widest leading-none mb-1">Now Presenting</span>
                <span className="text-sm font-black text-physics-text uppercase tracking-tight">{currentPresenter.name}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide Container with Dual Scaling */}
      <div 
        className="relative flex items-center justify-center transition-all duration-500 ease-in-out origin-center"
        style={{ 
          width: isPortrait ? '720px' : '1280px', 
          height: isPortrait ? '1280px' : '720px', 
          transform: `scale(${scale})` 
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide + (isPortrait ? '-p' : '-l')}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full h-full"
          >
            {React.Children.toArray(children)[currentSlide]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Overlay */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 sm:left-auto sm:right-8 -translate-x-1/2 sm:translate-x-0 flex items-center gap-4 z-50 bg-physics-surface/80 sm:bg-transparent p-2 sm:p-0 rounded-full border border-physics-border sm:border-none backdrop-blur-sm sm:backdrop-blur-none">
        <button 
          onClick={toggleTheme}
          className="p-3 sm:p-2 rounded-lg border border-physics-border bg-physics-surface hover:border-physics-accent hover:text-physics-accent transition-all text-physics-text/70"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5 sm:w-4 sm:h-4" /> : <Moon className="w-5 h-5 sm:w-4 sm:h-4" />}
        </button>
        <div className="text-[10px] sm:text-xs font-mono text-physics-text-dim tracking-widest px-2 sm:px-0 sm:mr-4">
          {String(currentSlide + 1).padStart(2, '0')}/{String(totalSlides).padStart(2, '0')}
        </div>
        <button 
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="p-3 sm:p-2 rounded-full border border-physics-border hover:border-physics-accent hover:text-physics-accent transition-all disabled:opacity-30 text-physics-text bg-physics-surface"
        >
          <ChevronLeft className="w-6 h-6 sm:w-5 sm:h-5" />
        </button>
        <button 
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          className="p-3 sm:p-2 rounded-full border border-physics-border hover:border-physics-accent hover:text-physics-accent transition-all disabled:opacity-30 text-physics-text bg-physics-surface"
        >
          <ChevronRight className="w-6 h-6 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Logo/Identity - Hidden on small mobile */}
      <div className="hidden sm:flex absolute bottom-6 left-8 items-center gap-2 opacity-50 z-50">
        
      </div>
    </div>
  );
};

export const SlideLayout = ({ children, title, subtitle }: { children: React.ReactNode, title?: string, subtitle?: string }) => {
  return (
    <div className="w-full h-full flex flex-col p-6 sm:p-12">
      {(title || subtitle) && (
        <header className="mb-6 sm:mb-12 border-l-4 border-physics-accent pl-4 sm:pl-6">
          {title && <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-physics-text uppercase italic">{title}</h2>}
          {subtitle && <p className="text-physics-accent text-[10px] sm:text-sm font-mono mt-1 uppercase tracking-[0.2em]">{subtitle}</p>}
        </header>
      )}
      <main className="flex-1 overflow-auto custom-scrollbar">
        {children}
      </main>
    </div>
  );
};
