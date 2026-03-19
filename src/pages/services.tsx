import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Award, Star, ArrowRight } from 'lucide-react';

interface Service {
  title: string;
  price: string;
  description: string;
  category: 'Hair' | 'Beard' | 'Premium' | 'Grooming';
  image: string;
}

const SERVICES: Service[] = [
  { title: "Executive Haircut", price: "$65", description: "Precision cut with hot towel finish.", category: 'Hair', image: "https://images.unsplash.com/photo-1621605815841-2dddb7fd1f19?q=80&w=800&auto=format&fit=crop" },
  { title: "Signature Beard Trim", price: "$40", description: "Sculpting and conditioning treatment.", category: 'Beard', image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop" },
  { title: "Classic Hot Shave", price: "$50", description: "Traditional straight razor experience.", category: 'Grooming', image: "https://images.unsplash.com/photo-1592647420148-bfcc175e1599?q=80&w=800&auto=format&fit=crop" },
  { title: "The Vanguard Package", price: "$120", description: "Full hair, beard, and facial treatment.", category: 'Premium', image: "https://images.unsplash.com/photo-1512690118294-700365c3217d?q=80&w=800&auto=format&fit=crop" },
  { title: "Scalp Therapy", price: "$35", description: "Invigorating massage and deep conditioning.", category: 'Hair', image: "https://images.unsplash.com/photo-1634449507606-5704d7013bd2?q=80&w=800&auto=format&fit=crop" },
  { title: "Grey Blending", price: "$45", description: "Subtle, natural color integration.", category: 'Premium', image: "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?q=80&w=800&auto=format&fit=crop" },
];

const CATEGORIES = ['All', 'Hair', 'Beard', 'Premium', 'Grooming'];

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-20 text-center md:text-left">
    {subtitle && (
      <p className="text-[10px] uppercase tracking-[0.4em] mb-6 font-bold flex items-center justify-center md:justify-start gap-4 text-neutral-500">
        <span className="w-8 h-[1px] block bg-neutral-300" />
        {subtitle}
      </p>
    )}
    <h2 className="text-5xl md:text-7xl leading-none uppercase tracking-tight text-primary">{title}</h2>
  </div>
);

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredServices = activeCategory === 'All' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === activeCategory);

  return (
    <div className="w-full relative py-24 md:py-32 px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Our Services" subtitle="Expertise" />

        {/* Categories */}
        <div className="flex flex-wrap gap-4 mb-16 justify-center md:justify-start">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-primary text-white scale-105 shadow-lg' 
                  : 'bg-white text-neutral-500 hover:bg-neutral-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Services Grid with Reveal Effect */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          <AnimatePresence>
            {filteredServices.map((service, index) => (
              <motion.div
                 key={service.title}
                 layout
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.9 }}
                 transition={{ duration: 0.4 }}
                 className="group relative h-96 rounded-sm overflow-hidden cursor-pointer"
              >
                 <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                     <span className="text-[10px] uppercase text-neutral-400 tracking-widest font-bold mb-2 block">{service.category}</span>
                     <h3 className="text-2xl font-display text-white mb-2">{service.title}</h3>
                     <p className="text-neutral-300 text-sm mb-6 line-clamp-2 h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden font-light">
                       {service.description}
                     </p>
                     <div className="flex justify-between items-center border-t border-white/20 pt-4 mt-auto">
                        <span className="text-white font-mono text-xl">{service.price}</span>
                        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-primary transition-colors">
                           <ArrowRight size={16} />
                        </div>
                     </div>
                  </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Rate Card Section - Premium Sticky Setup */}
        <div className="mt-32 border-t border-neutral-200 pt-32">
           <div className="grid md:grid-cols-3 gap-16">
              <div className="md:col-span-1 md:sticky top-32 self-start">
                 <SectionHeading title="Tiered Services" subtitle="Rate Card" />
                 <p className="text-neutral-500 font-light leading-relaxed mb-8">
                   We offer varied pricing based on the experience level of our barbers. Choose the tier that best suits your needs.
                 </p>
                 <button className="bg-primary text-white px-8 py-4 text-[10px] uppercase font-bold tracking-widest hover:bg-black transition-colors rounded-sm inline-flex items-center gap-4">
                    Book Appointment <ArrowRight size={16} />
                 </button>
              </div>

              <div className="md:col-span-2 space-y-12">
                 {/* Tier 1 */}
                 <div className="bg-white p-10 rounded-sm shadow-xl border border-neutral-100 hover:border-primary/20 transition-colors">
                    <div className="flex items-center gap-4 mb-6">
                       <div className="p-3 bg-secondary rounded-full"><Scissors className="text-primary" size={24} /></div>
                       <div>
                          <h4 className="text-2xl font-display uppercase tracking-widest text-primary">Senior Barber</h4>
                          <p className="text-[10px] uppercase text-neutral-400 tracking-widest font-bold">5+ Years Experience</p>
                       </div>
                    </div>
                    <ul className="space-y-4 font-mono text-sm border-t border-neutral-100 pt-6">
                      <li className="flex justify-between items-end"><span>Haircut</span><span className="border-b border-dotted border-neutral-300 flex-grow mx-4"></span><span>$65</span></li>
                      <li className="flex justify-between items-end"><span>Beard Trim</span><span className="border-b border-dotted border-neutral-300 flex-grow mx-4"></span><span>$40</span></li>
                      <li className="flex justify-between items-end"><span>Hot Shave</span><span className="border-b border-dotted border-neutral-300 flex-grow mx-4"></span><span>$50</span></li>
                    </ul>
                 </div>

                 {/* Tier 2 */}
                 <div className="bg-primary p-10 rounded-sm shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><Award size={120} className="text-white" /></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                         <div className="p-3 bg-white/10 rounded-full"><Star className="text-white" size={24} /></div>
                         <div>
                            <h4 className="text-2xl font-display uppercase tracking-widest text-white">Master Barber</h4>
                            <p className="text-[10px] uppercase text-neutral-400 tracking-widest font-bold">10+ Years Experience</p>
                         </div>
                      </div>
                      <ul className="space-y-4 font-mono text-sm text-neutral-300 border-t border-white/10 pt-6">
                        <li className="flex justify-between items-end"><span className="text-white">Haircut</span><span className="border-b border-dotted border-white/20 flex-grow mx-4"></span><span className="text-white">$85</span></li>
                        <li className="flex justify-between items-end"><span className="text-white">Beard Trim</span><span className="border-b border-dotted border-white/20 flex-grow mx-4"></span><span className="text-white">$55</span></li>
                        <li className="flex justify-between items-end"><span className="text-white">Hot Shave</span><span className="border-b border-dotted border-white/20 flex-grow mx-4"></span><span className="text-white">$70</span></li>
                      </ul>
                    </div>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
