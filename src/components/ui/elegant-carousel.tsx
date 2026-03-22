'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from "../../lib/utils";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface SlideData {
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  imageUrl: string;
}

const slides: SlideData[] = [
  {
    title: 'Precision & Ritual',
    subtitle: 'The Art of the Cut',
    description:
      'Where ancient tradition meets modern execution—a palette drawn from sharp steel, warm lather, and the meticulous craft of the master barber.',
    accent: '#10b981', // emerald-500
    imageUrl:
      'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=900&h=1200&fit=crop&q=80',
  },
  {
    title: 'Classic Heritage',
    subtitle: 'The Hot Towel Shave',
    description:
      'Inspired by the vast stillness of a relaxing chair—clean lines, soothing warmth, and the quiet power of a timeless grooming ritual.',
    accent: '#d4af37', // Gold
    imageUrl:
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=900&h=1200&fit=crop&q=80',
  },
  {
    title: 'Modern Sophistication',
    subtitle: 'TheBarberShop Styling',
    description:
      'Bespoke styling and architectural precision—an ode to the meditative elegance of styling and its undeniable confidence.',
    accent: '#8ba7b8', // Slate blue
    imageUrl:
      'https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?w=900&h=1200&fit=crop&q=80',
  },
  {
    title: 'Culture of Excellence',
    subtitle: 'Community & Craft',
    description:
      'The shop reveals its secrets at dawn—liquid gold oils spilling across amber glass, textures carved by scissors, clippers, and time.',
    accent: '#c4956a', // Copper/Bronze
    imageUrl:
      'https://images.unsplash.com/photo-1621605815971-8bcaf47d6cb0?w=900&h=1200&fit=crop&q=80',
  },
];

export default function ElegantCarousel({ className }: { className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const SLIDE_DURATION = 6000;
  const TRANSITION_DURATION = 800;

  const goToSlide = useCallback(
    (index: number, dir?: 'next' | 'prev') => {
      if (isTransitioning || index === currentIndex) return;
      setDirection(dir || (index > currentIndex ? 'next' : 'prev'));
      setIsTransitioning(true);
      setProgress(0);

      setTimeout(() => {
        setCurrentIndex(index);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, TRANSITION_DURATION / 2);
    },
    [isTransitioning, currentIndex]
  );

  const goNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(nextIndex, 'next');
  }, [currentIndex, goToSlide]);

  const goPrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(prevIndex, 'prev');
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    if (isPaused) return;

    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 100 / (SLIDE_DURATION / 50);
      });
    }, 50);

    intervalRef.current = setInterval(() => {
      goNext();
    }, SLIDE_DURATION);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [currentIndex, isPaused, goNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 60) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  const currentSlide = slides[currentIndex];

  return (
    <div
      className={cn("relative w-full h-[600px] md:h-[800px] overflow-hidden bg-background text-foreground select-none", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background accent wash */}
      <div
        className="absolute inset-0 transition-colors duration-1000 ease-in-out z-0 opacity-40 mix-blend-screen"
        style={{
          background: `radial-gradient(ellipse at 70% 50%, ${currentSlide.accent}40 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 w-full h-full max-w-7xl mx-auto flex flex-col md:flex-row items-center px-6 md:px-12">
        
        {/* Left: Text Content */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center order-2 md:order-1 relative z-20">
          <div className="max-w-md">
            
            {/* Collection number */}
            <div
              className={cn(
                "flex items-center gap-4 mb-6 transition-all duration-700 transform",
                isTransitioning ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
              )}
            >
              <span className="w-12 h-[1px] bg-white/30" />
              <span className="text-sm font-bold tracking-widest text-neutral-400">
                {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </span>
            </div>

            {/* Title */}
            <h2
              className={cn(
                "text-5xl md:text-7xl font-display uppercase tracking-widest leading-tight mb-4 transition-all duration-700 delay-100 transform text-white",
                isTransitioning ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
              )}
            >
              {currentSlide.title}
            </h2>

            {/* Subtitle */}
            <p
              className={cn(
                "text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-6 transition-all duration-700 delay-200 transform",
                isTransitioning ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
              )}
              style={{ color: currentSlide.accent }}
            >
              {currentSlide.subtitle}
            </p>

            {/* Description */}
            <p
              className={cn(
                "text-neutral-400 text-sm md:text-base leading-relaxed max-w-sm mb-12 transition-all duration-700 delay-300 transform",
                isTransitioning ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
              )}
            >
              {currentSlide.description}
            </p>

            {/* Navigation Arrows */}
            <div className="flex gap-4">
              <button
                onClick={goPrev}
                className="w-12 h-12 flex items-center justify-center border border-white/20 rounded-full hover:bg-white/10 hover:border-white/40 transition-all text-white active:scale-95"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goNext}
                className="w-12 h-12 flex items-center justify-center border border-white/20 rounded-full hover:bg-white/10 hover:border-white/40 transition-all text-white active:scale-95"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center md:justify-end order-1 md:order-2 py-8 md:py-24 relative">
          <div
            className={cn(
              "relative w-full max-w-sm aspect-[3/4] overflow-hidden rounded-sm shadow-2xl transition-all duration-1000 transform",
              isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
            )}
          >
            <img
              src={currentSlide.imageUrl}
              alt={currentSlide.title}
              className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            {/* Color overlay burn effect */}
            <div
              className="absolute inset-0 mix-blend-overlay opacity-60 transition-colors duration-1000"
              style={{
                background: `linear-gradient(135deg, ${currentSlide.accent} 0%, transparent 60%)`,
              }}
            />
          </div>

          {/* Decorative frame corner */}
          <div className="absolute top-1/4 right-8 w-16 h-16 border-t-2 border-r-2 opacity-50 transition-colors duration-1000 pointer-events-none hidden md:block" style={{ borderColor: currentSlide.accent }} />
          <div className="absolute bottom-1/4 left-8 md:left-[10%] w-16 h-16 border-b-2 border-l-2 opacity-50 transition-colors duration-1000 pointer-events-none hidden md:block" style={{ borderColor: currentSlide.accent }} />
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-6 md:pb-8 z-30 px-4">
        <div className="flex gap-4 md:gap-8 overflow-x-auto snap-x max-w-7xl w-full hide-scrollbar">
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "group relative flex-1 min-w-[120px] flex flex-col items-start gap-2 pt-4 border-t-2 transition-all duration-300",
                index === currentIndex ? "border-transparent" : "border-white/10 hover:border-white/30"
              )}
              aria-label={`Go to slide ${index + 1}`}
            >
              {/* Animated Progress Border Top */}
              <div className="absolute top-[-2px] left-0 h-[2px] bg-white/10 w-full overflow-hidden">
                <div
                  className="h-full transition-all ease-linear"
                  style={{
                    width: index === currentIndex ? `${progress}%` : index < currentIndex ? '100%' : '0%',
                    backgroundColor: index === currentIndex ? currentSlide.accent : index < currentIndex ? 'rgba(255,255,255,0.3)' : 'transparent',
                    transitionDuration: index === currentIndex ? "50ms" : "300ms"
                  }}
                />
              </div>
              
              <span className={cn(
                "text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors duration-300",
                index === currentIndex ? "text-white" : "text-neutral-500 group-hover:text-neutral-300"
              )}>
                {slide.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
