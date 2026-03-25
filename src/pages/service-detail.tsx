import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, CalendarDays, DollarSign } from 'lucide-react';
import { SmokeBackground } from '../components/ui/spooky-smoke-animation';
import { supabase } from '../lib/supabase';
import type { Service } from '../lib/supabase';

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        setService(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-heading-text">
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -10 }}>
          <SmokeBackground smokeColor="#262626" />
        </div>
        <span className="text-xs uppercase tracking-widest text-body-text">Loading…</span>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center text-heading-text selection:bg-primary-bg selection:text-heading-text">
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -10 }}>
          <SmokeBackground smokeColor="#262626" />
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-display uppercase tracking-widest mb-4">Service Not Found</h1>
          <Link to="/services" className="text-body-text hover:text-primary transition-colors uppercase text-xs tracking-widest font-bold inline-flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen selection:bg-primary-bg selection:text-heading-text relative pb-24">
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -10 }}>
        <SmokeBackground smokeColor="#262626" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-32 relative z-10">
        <Link to="/services" className="text-body-text hover:text-white transition-colors uppercase text-xs tracking-widest font-bold inline-flex items-center gap-2 mb-12">
          <ArrowLeft size={16} /> Back to Services
        </Link>
        
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="aspect-[4/5] overflow-hidden rounded-sm"
          >
            {service.image_url ? (
              <img 
                src={service.image_url} 
                alt={service.title} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-secondary-bg flex items-center justify-center">
                <span className="text-white/10 text-6xl font-display">{service.title[0]}</span>
              </div>
            )}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-10"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-body-text mb-4 border-l pl-4 border-primary">
                {service.category}
              </p>
              <h1 className="text-5xl md:text-7xl leading-none font-display uppercase text-heading-text mb-6">
                {service.title}
              </h1>
              <p className="text-lg leading-relaxed text-body-text font-light">
                {service.description} Experience the mastery of TheBarberShop barbers with an appointment dedicated entirely to your personal style and grooming needs.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/10">
               <div>
                 <div className="flex items-center gap-3 text-body-text mb-2">
                   <DollarSign size={18} />
                   <h4 className="text-xs uppercase tracking-widest font-bold">Investment</h4>
                 </div>
                 <p className="text-3xl font-display text-heading-text">{service.price}</p>
               </div>
               <div>
                 <div className="flex items-center gap-3 text-body-text mb-2">
                   <Clock size={18} />
                   <h4 className="text-xs uppercase tracking-widest font-bold">Duration</h4>
                 </div>
                 <p className="text-3xl font-display text-heading-text">{service.duration || '45 min'}</p>
               </div>
            </div>
            
            <button className="w-full bg-primary-bg-bg border border-white/20 text-heading-text py-5 font-bold uppercase tracking-[0.3em] text-xs hover:bg-white hover:text-black transition-all flex justify-center items-center gap-3">
              <CalendarDays size={18} /> Book Appointment
            </button>
            
          </motion.div>
        </div>
      </div>
    </div>
  );
}
