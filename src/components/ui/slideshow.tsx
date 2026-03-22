import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Slideshow component representing the hero section.
 * Using high-quality Unsplash images for the TheBarberShop brand.
 */
const slides = [
  {
    img: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1600&auto=format&fit=crop",
    text: ["BEYOND STYLE", "ELITE GROOMING"],
  },
  {
    img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1600&auto=format&fit=crop",
    text: ["PRECISION CUTS", "TIMELESS TRADITION"],
  },
  {
    img: "https://images.unsplash.com/photo-1621605815841-2dddb7fd1f19?q=80&w=1600&auto=format&fit=crop",
    text: ["THE CRAFT", "OF PROTECTION"],
  },
  {
    img: "https://images.unsplash.com/photo-1592647420148-bfcc175e1599?q=80&w=1600&auto=format&fit=crop",
    text: ["MASTER ARTISTRY", "MODERN VISION"],
  },
  {
    img: "https://images.unsplash.com/photo-1512690118294-700365c3217d?q=80&w=1600&auto=format&fit=crop",
    text: ["LUXURY REDEFINED", "FOR GENTLEMEN"],
  },
];

export const Slideshow = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="slideshow h-screen w-full relative overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`slide absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          style={{ 
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${slide.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="slide-content absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <div className="slide-text space-y-2">
              {slide.text.map((t, j) => (
                <span 
                  key={j} 
                  className="block text-5xl md:text-8xl lg:text-9xl font-extrabold text-heading-text tracking-tighter uppercase leading-none drop-shadow-2xl"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button 
        className="nav absolute left-8 top-1/2 -translate-y-1/2 z-20 text-heading-text opacity-50 hover:opacity-100 transition-opacity p-2 border border-white/20 rounded-full" 
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft size={32} />
      </button>
      <button 
        className="nav absolute right-8 top-1/2 -translate-y-1/2 z-20 text-heading-text opacity-50 hover:opacity-100 transition-opacity p-2 border border-white/20 rounded-full" 
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight size={32} />
      </button>

      {/* Counter */}
      <div className="counter absolute bottom-12 right-12 z-20 text-heading-text font-mono text-sm tracking-widest opacity-70">
        0{current + 1} / 0{slides.length}
      </div>

      {/* Progress Bar (Optional, for visual flair) */}
      <div className="absolute bottom-0 left-0 h-1 bg-primary-bg-bg/20 w-full z-20">
        <div 
          className="h-full bg-primary-bg-bg transition-all duration-300 ease-linear" 
          style={{ width: `${((current + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  );
};
