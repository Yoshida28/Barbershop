import React from 'react';
import { motion } from 'framer-motion';

const SectionHeading = ({ title, subtitle, light = false }: { title: string; subtitle?: string, light?: boolean }) => (
  <div className="mb-20 text-center md:text-left">
    {subtitle && (
      <p className={`text-xs uppercase tracking-[0.4em] mb-6 font-bold flex items-center justify-center md:justify-start gap-4 ${light ? 'text-muted-text' : 'text-body-text'}`}>
        <span className={`w-8 h-[1px] block ${light ? 'bg-neutral-600' : 'bg-neutral-300'}`} />
        {subtitle}
      </p>
    )}
    <h2 className={`text-5xl md:text-7xl leading-none uppercase tracking-tight ${light ? 'text-heading-text' : 'text-heading-text'}`}>{title}</h2>
  </div>
);

export default function About() {
  return (
    <div className="w-full relative py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="The Legacy" subtitle="Heritage" />
        
        {/* Bento Grid Layout inspired by modern UI designs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
          {/* Main About Block - spans 2 columns */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 relative p-12 flex flex-col justify-end overflow-hidden group rounded-sm bg-primary-bg"
          >
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1593726850403-2add1a2380f9?q=80&w=1200&auto=format&fit=crop" 
                alt="Barbershop heritage" 
                className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000 grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
            </div>
            <div className="relative z-10 text-heading-text max-w-xl">
              <h3 className="text-4xl mb-6 font-display tracking-wider">About TheBarberShop</h3>
              <p className="text-neutral-300 leading-relaxed font-light">
                Founded in the heart of the city, TheBarberShop was born from a desire to return to the roots of masculine grooming. Our master barbers are artists, dedicated to the precision and detail that defines a true gentleman. We blend old-world tradition with new-school execution.
              </p>
            </div>
          </motion.div>

          {/* Vision Block */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-12 bg-primary-bg-bg flex flex-col justify-center rounded-sm shadow-xl border border-white/10 relative overflow-hidden group"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-secondary-bg rounded-full blur-3xl group-hover:bg-white/5 transition-colors duration-500 z-0" />
            <div className="relative z-10">
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-muted-text mb-4 block">01</span>
              <h3 className="text-3xl mb-6 font-display tracking-wide text-heading-text">Our Vision</h3>
              <p className="text-body-text leading-relaxed text-sm">
                To redefine the standard of men's grooming globally, creating a space where style, comfort, and tradition coexist in perfect harmony. We aim to be the benchmark for luxury barbering.
              </p>
            </div>
          </motion.div>

          {/* Mission Block */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-12 bg-primary-bg-bg flex flex-col justify-center rounded-sm shadow-xl border border-white/10 relative overflow-hidden group"
          >
             <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/5 transition-colors duration-500 z-0" />
            <div className="relative z-10">
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-muted-text mb-4 block">02</span>
              <h3 className="text-3xl mb-6 font-display tracking-wide text-heading-text">Our Mission</h3>
              <p className="text-body-text leading-relaxed text-sm">
                To empower every man who walks through our doors with confidence and a sharp look. We provide meticulous service, premium products, and an atmosphere that honors the craft.
              </p>
            </div>
          </motion.div>

          {/* Image Block */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="md:col-span-2 relative overflow-hidden group rounded-sm"
          >
             <img 
                src="https://images.unsplash.com/photo-1512690118294-700365c3217d?q=80&w=1200&auto=format&fit=crop" 
                alt="Barber tools" 
                className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-sm">
                <p className="text-heading-text font-display text-4xl tracking-widest">Mastery in Detail</p>
              </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
