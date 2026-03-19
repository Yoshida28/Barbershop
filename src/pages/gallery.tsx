import React, { useState, useEffect } from 'react';
import { PhotoGallery } from '../components/ui/gallery';
import { ShuffleHero } from '../components/ui/shuffle-grid';
import { ArcGalleryHero } from '../components/ui/arc-gallery-hero-component';
import ClippedShapeGallery from '../components/ui/clipped-shape-image';
import { motion } from 'framer-motion';

const memoryImages = [
  'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1621605815971-8bcaf47d6cb0?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1605497788044-5a32c707d30f?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1567894340315-735d7c361db0?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512690459411-b9245aed614b?q=80&w=600&auto=format&fit=crop',
];

// A modern horizontal scrolling carousel / marquee
const InfiniteMarquee = () => {
  return (
    <div className="w-full relative py-20 bg-background overflow-hidden border-t border-white/5">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <div className="flex flex-col gap-8">
        <h3 className="text-center text-xs md:text-sm uppercase tracking-[0.4em] font-bold text-neutral-500 mb-8">
          The Vanguard Archive
        </h3>
        
        <div className="flex w-[200vw] sm:w-[150vw] md:w-[120vw] animate-marquee gap-6 items-center hover:[animation-play-state:paused] group">
          {[...memoryImages, ...memoryImages].map((src, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 w-[280px] h-[350px] overflow-hidden rounded-sm relative cursor-pointer"
            >
              <img 
                src={src} 
                alt="Archive" 
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 hover:!grayscale-0 hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default function Gallery() {
  const [heroIndex, setHeroIndex] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Randomize on client mount to avoid hydration mismatch if SSR
    setHeroIndex(Math.floor(Math.random() * 3));
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-primary-bg-bg" />;

  return (
    <div className="min-h-screen bg-background relative flex flex-col justify-between overflow-x-hidden selection:bg-emerald-500/30">
      {/* Universal Background for Gallery */}
      <div className="fixed inset-0 z-0 bg-primary-bg-bg" />

      {/* Frame for the entire UI */}
      <div className="relative z-10 w-full flex-grow flex flex-col items-center">
        
        <div className="w-full min-h-[90vh]">
          {heroIndex === 0 && <PhotoGallery animationDelay={0.2} />}
          {heroIndex === 1 && <ShuffleHero />}
          {heroIndex === 2 && <ArcGalleryHero images={memoryImages} />}
        </div>
        
        {/* Featured Snippets using Clipped Shapes */}
        <div className="w-full py-24 bg-primary-bg-light/30 border-t border-white/5 relative">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <h3 className="text-center text-xs md:text-sm uppercase tracking-[0.4em] font-bold text-emerald-500 mb-12">
              Signature Styles
            </h3>
            <ClippedShapeGallery />
          </div>
        </div>
        
        {/* Modern horizontal carousel below the chosen hero */}
        <InfiniteMarquee />
        
      </div>
    </div>
  );
}
