import React from 'react';
import { Slideshow } from '../components/ui/slideshow';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import all the separated page components to stack them
import AboutSection from './about';
import ServicesSection from './services';
import ProductsSection from './products';
import GallerySection from './gallery';
import ContactSection from './contact';

// The OnePager section was originally part of Home.
const OnePager = () => (
  <section className="py-32 px-6 bg-secondary relative overflow-hidden">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center relative z-10">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="aspect-[4/5] overflow-hidden relative group rounded-sm shadow-2xl"
      >
        <div className="absolute inset-0 bg-primary/20 z-10 group-hover:bg-transparent transition-colors duration-700" />
        <img 
          src="https://images.unsplash.com/photo-1621605815841-2dddb7fd1f19?q=80&w=1200&auto=format&fit=crop" 
          alt="Barber at work" 
          className="w-full h-full object-cover grayscale group-hover:scale-110 group-hover:grayscale-0 transition-all duration-1000"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <div className="mb-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 mb-6 font-bold flex items-center gap-4">
            <span className="w-8 h-[1px] bg-neutral-400 block" />
            Introduction
          </p>
          <h2 className="text-5xl md:text-7xl leading-tight font-display tracking-tight text-primary uppercase">The Art <br/> <span className="text-neutral-400">of the Cut</span></h2>
        </div>
        <p className="text-lg leading-relaxed text-neutral-600 mb-12 max-w-lg font-light">
          Vanguard is more than a barbershop; it's a sanctuary for the modern gentleman. We combine centuries-old traditions with contemporary, precision techniques to deliver an unparalleled grooming experience tailored specifically to you.
        </p>
        <div className="grid grid-cols-2 gap-12 mb-12">
          <div className="border-l border-neutral-300 pl-6">
            <h4 className="text-4xl mb-2 font-display">15+ Years</h4>
            <p className="text-[10px] uppercase text-neutral-400 font-bold tracking-widest">Of Excellence</p>
          </div>
          <div className="border-l border-neutral-300 pl-6">
            <h4 className="text-4xl mb-2 font-display">24/7</h4>
            <p className="text-[10px] uppercase text-neutral-400 font-bold tracking-widest">Booking Available</p>
          </div>
        </div>
        <Link 
          to="/about" 
          className="inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] font-bold text-primary hover:gap-6 transition-all group"
        >
          <span className="border-b border-primary pb-1 group-hover:border-transparent transition-colors">Discover Our Story</span>
          <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default function Home() {
  return (
    <div className="w-full flex-col flex">
      <Slideshow />
      <OnePager />
      {/* Stacking the robust premium components to recreate the single long-scroll homepage */}
      <AboutSection />
      <ServicesSection />
      <ProductsSection />
      <GallerySection />
      <ContactSection />
    </div>
  );
}
