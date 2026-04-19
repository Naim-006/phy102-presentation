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
  const totalSlides = React.Children.count(children);

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-physics-bg overflow-hidden font-sans">
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

      {/* Slide Content */}
      <div className="relative w-full h-full max-w-[1920px] aspect-video flex items-center justify-center p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
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
      <div className="absolute bottom-6 right-8 flex items-center gap-4 z-50">
        <button 
          onClick={toggleTheme}
          className="p-2 mr-2 rounded-lg border border-physics-border bg-physics-surface hover:border-physics-accent hover:text-physics-accent transition-all text-physics-text/70"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <div className="text-xs font-mono text-physics-text-dim tracking-widest mr-4">
          {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </div>
        <button 
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="p-2 rounded-full border border-physics-border hover:border-physics-accent hover:text-physics-accent transition-all disabled:opacity-30 text-physics-text"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          className="p-2 rounded-full border border-physics-border hover:border-physics-accent hover:text-physics-accent transition-all disabled:opacity-30 text-physics-text"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Logo/Identity */}
      <div className="absolute bottom-6 left-8 flex items-center gap-2 opacity-50 z-50">
        <Zap className="w-4 h-4 text-physics-accent" />
        <span className="text-[10px] font-mono tracking-widest uppercase">DIU | PHY 102 | Quantum Theory</span>
      </div>
    </div>
  );
};

export const SlideLayout = ({ children, title, subtitle }: { children: React.ReactNode, title?: string, subtitle?: string }) => {
  return (
    <div className="w-full h-full flex flex-col p-12">
      {(title || subtitle) && (
        <header className="mb-12 border-l-4 border-physics-accent pl-6">
          {title && <h2 className="text-4xl font-bold tracking-tight text-physics-text uppercase italic">{title}</h2>}
          {subtitle && <p className="text-physics-accent text-sm font-mono mt-1 uppercase tracking-[0.2em]">{subtitle}</p>}
        </header>
      )}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};
