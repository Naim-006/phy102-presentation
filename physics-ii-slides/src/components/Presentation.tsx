import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2, Zap } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface PresentationProps {
  children: React.ReactNode[];
}

export const Presentation = ({ children }: PresentationProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = React.Children.count(children);

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
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

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
        <div className="text-xs font-mono text-gray-500 tracking-widest mr-4">
          {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </div>
        <button 
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="p-2 rounded-full border border-gray-800 hover:border-physics-accent hover:text-physics-accent transition-all disabled:opacity-30"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          className="p-2 rounded-full border border-gray-800 hover:border-physics-accent hover:text-physics-accent transition-all disabled:opacity-30"
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
          {title && <h2 className="text-4xl font-bold tracking-tight text-white uppercase italic">{title}</h2>}
          {subtitle && <p className="text-physics-accent text-sm font-mono mt-1 uppercase tracking-[0.2em]">{subtitle}</p>}
        </header>
      )}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};
