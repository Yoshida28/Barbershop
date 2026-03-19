import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, ArrowUpRight } from 'lucide-react';

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1621605815841-2dddb7fd1f19?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1593726850403-2add1a2380f9?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512690118294-700365c3217d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1592647420148-bfcc175e1599?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1634449507606-5704d7013bd2?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1554519934-e32b1629d9ee?q=80&w=800&auto=format&fit=crop"
];

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between w-full">
    <div>
        {subtitle && (
        <p className="text-[10px] uppercase tracking-[0.4em] mb-6 font-bold flex items-center justify-center md:justify-start gap-4 text-neutral-500">
            <span className="w-8 h-[1px] block bg-neutral-300" />
            {subtitle}
        </p>
        )}
        <h2 className="text-5xl md:text-7xl leading-none uppercase tracking-tight text-primary">{title}</h2>
    </div>
    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hidden md:inline-flex items-center gap-2 px-6 py-3 border border-neutral-200 rounded-full hover:bg-neutral-100 hover:border-neutral-300 transition-all text-xs font-bold uppercase tracking-widest text-primary mt-6 md:mt-0">
       <Instagram size={16} /> Follow Our Feed
    </a>
  </div>
);

export default function Gallery() {
  return (
    <div className="w-full relative py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="The Archives" subtitle="Gallery" />
        
        {/* Modern Masonry-style layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-max">
          {GALLERY_IMAGES.map((src, i) => {
             // Create organic varied heights for modern feel
             const heights = ['h-64', 'h-96', 'h-80', 'h-112', 'h-72', 'h-96', 'h-112', 'h-64'];
             const spanClasses = (i === 0 || i === 4) ? 'col-span-2' : 'col-span-1';
             
             return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative overflow-hidden group rounded-sm cursor-pointer ${heights[i % heights.length]} ${spanClasses}`}
              >
                <img 
                  src={src} 
                  alt={`Vanguard Gallery ${i+1}`} 
                  className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                      <ArrowUpRight size={20} />
                   </div>
                </div>
              </motion.div>
             )
          })}
        </div>

        <div className="mt-16 flex justify-center md:hidden">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-200 rounded-full hover:bg-neutral-100 transition-all text-xs font-bold uppercase tracking-widest text-primary">
               <Instagram size={16} /> Follow Our Feed
            </a>
        </div>
      </div>
    </div>
  );
}
