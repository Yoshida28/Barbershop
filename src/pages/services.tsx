import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scissors, Award, Star, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Service, RateCardItem } from '../lib/supabase';

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-20 text-center md:text-left">
    {subtitle && (
      <p className="text-xs uppercase tracking-[0.4em] mb-6 font-bold flex items-center justify-center md:justify-start gap-4 text-body-text">
        <span className="w-8 h-[1px] block bg-neutral-300" />
        {subtitle}
      </p>
    )}
    <h2 className="text-5xl md:text-7xl leading-none uppercase tracking-tight text-heading-text">{title}</h2>
  </div>
);

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [rateItems, setRateItems] = useState<RateCardItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loadingServices, setLoadingServices] = useState(true);

  useEffect(() => {
    supabase.from('services').select('*').order('sort_order').then(({ data }) => {
      setServices(data || []);
      setLoadingServices(false);
    });
    supabase.from('rate_card').select('*').order('sort_order').then(({ data }) => {
      setRateItems(data || []);
    });
  }, []);

  const categories = ['All', ...Array.from(new Set(services.map(s => s.category).filter(Boolean) as string[]))];
  const filteredServices = activeCategory === 'All'
    ? services
    : services.filter(s => s.category === activeCategory);

  // Group rate card by category
  const rateGroups = rateItems.reduce<Record<string, RateCardItem[]>>((acc, item) => {
    const cat = item.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <div className="w-full relative py-24 md:py-32 px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Our Services" subtitle="Expertise" />

        {/* Categories */}
        <div className="flex flex-wrap gap-4 mb-16 justify-center md:justify-start">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest font-bold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary-bg text-heading-text scale-105 shadow-lg'
                  : 'bg-primary-bg-bg text-body-text hover:bg-white/5'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          <AnimatePresence>
            {loadingServices ? (
              <div className="col-span-full py-20 text-center">
                <p className="text-muted-text text-xs uppercase tracking-widest">Loading services…</p>
              </div>
            ) : filteredServices.length === 0 ? (
              <div className="col-span-full py-20 text-center">
                <p className="text-muted-text text-xs uppercase tracking-widest">No services found.</p>
              </div>
            ) : (
              filteredServices.map((service) => (
                <Link to={`/services/${service.id}`} key={service.id} className="block">
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="group relative h-96 rounded-sm overflow-hidden cursor-pointer"
                  >
                    {service.image_url ? (
                      <img
                        src={service.image_url}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                        style={{ filter: 'contrast(1.18) brightness(1.06) saturate(1.12)' }}
                      />
                    ) : (
                      <div className="w-full h-full bg-secondary-bg flex items-center justify-center">
                        <Scissors size={48} className="text-white/10" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />

                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <span className="text-xs uppercase text-muted-text tracking-widest font-bold mb-2 block">{service.category}</span>
                      <h3 className="text-2xl font-display text-heading-text mb-2">{service.title}</h3>
                      <p className="text-neutral-300 text-sm mb-6 line-clamp-2 h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden font-light">
                        {service.description}
                      </p>
                      <div className="flex justify-between items-center border-t border-white/20 pt-4 mt-auto">
                        <span className="text-heading-text font-mono text-xl">{service.price}</span>
                        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-heading-text group-hover:bg-primary-bg-bg group-hover:text-heading-text transition-colors">
                          <ArrowRight size={16} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {/* Rate Card Section */}
        <div className="mt-32 border-t border-white/10 pt-32">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="md:col-span-1 md:sticky top-32 self-start">
              <SectionHeading title="Tiered Services" subtitle="Rate Card" />
              <p className="text-body-text font-light leading-relaxed mb-8">
                We offer varied pricing based on the experience level of our barbers. Choose the tier that best suits your needs.
              </p>
              <button className="bg-primary-bg text-heading-text px-8 py-4 text-xs uppercase font-bold tracking-widest hover:bg-black transition-colors rounded-sm inline-flex items-center gap-4">
                Book Appointment <ArrowRight size={16} />
              </button>
            </div>

            <div className="md:col-span-2 space-y-12">
              {Object.entries(rateGroups).length === 0 ? (
                // Fallback static tiers if rate_card table is empty
                <>
                  <div className="bg-primary-bg-bg p-10 rounded-sm shadow-xl border border-white/10 hover:border-primary/20 transition-colors">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-secondary-bg rounded-full"><Scissors className="text-heading-text" size={24} /></div>
                      <div>
                        <h4 className="text-2xl font-display uppercase tracking-widest text-heading-text">Senior Barber</h4>
                        <p className="text-xs uppercase text-muted-text tracking-widest font-bold">5+ Years Experience</p>
                      </div>
                    </div>
                    <p className="text-muted-text text-xs uppercase tracking-widest">No rate card items yet.</p>
                  </div>
                </>
              ) : (
                Object.entries(rateGroups).map(([cat, items], idx) => (
                  <div
                    key={cat}
                    className={idx % 2 === 0
                      ? "bg-primary-bg-bg p-10 rounded-sm shadow-xl border border-white/10 hover:border-primary/20 transition-colors"
                      : "bg-primary-bg p-10 rounded-sm shadow-2xl relative overflow-hidden group"
                    }
                  >
                    {idx % 2 !== 0 && (
                      <div className="absolute top-0 right-0 p-4 opacity-10"><Award size={120} className="text-heading-text" /></div>
                    )}
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`p-3 rounded-full ${idx % 2 === 0 ? 'bg-secondary-bg' : 'bg-primary-bg-bg/10'}`}>
                          {idx % 2 === 0 ? <Scissors className="text-heading-text" size={24} /> : <Star className="text-heading-text" size={24} />}
                        </div>
                        <div>
                          <h4 className="text-2xl font-display uppercase tracking-widest text-heading-text">{cat}</h4>
                        </div>
                      </div>
                      <ul className="space-y-4 font-mono text-sm border-t border-white/10 pt-6">
                        {items.map((item) => (
                          <li key={item.id} className="flex justify-between items-end">
                            <span className={idx % 2 !== 0 ? 'text-heading-text' : ''}>{item.service_name}</span>
                            <span className="border-b border-dotted border-white/10 flex-grow mx-4" />
                            <span className={idx % 2 !== 0 ? 'text-heading-text' : ''}>{item.price}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
