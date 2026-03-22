import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, CalendarDays, DollarSign } from 'lucide-react';
import { SmokeBackground } from '../components/ui/spooky-smoke-animation';

// Define the services data to look up
interface Service {
  title: string;
  price: string;
  description: string;
  category: 'Hair' | 'Beard' | 'Grooming' | 'Premium';
  image: string;
  duration?: string;
}

const SERVICES: Service[] = [
  { title: "Executive Haircut", price: "$65", description: "Precision cut with hot towel finish.", category: 'Hair', image: "https://images.pexels.com/photos/1319459/pexels-photo-1319459.jpeg?auto=compress&cs=tinysrgb&w=800", duration: "45 min" },
  { title: "Signature Beard Trim", price: "$40", description: "Sculpting and conditioning treatment.", category: 'Beard', image: "https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg?auto=compress&cs=tinysrgb&w=800", duration: "30 min" },
  { title: "Classic Hot Shave", price: "$50", description: "Traditional straight razor experience.", category: 'Grooming', image: "https://images.pexels.com/photos/2080006/pexels-photo-2080006.jpeg?auto=compress&cs=tinysrgb&w=800", duration: "40 min" },
  { title: "The TheBarberShop Package", price: "$120", description: "Full hair, beard, and facial treatment.", category: 'Premium', image: "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=800", duration: "90 min" },
  { title: "Scalp Therapy", price: "$35", description: "Invigorating massage and deep conditioning.", category: 'Hair', image: "https://images.pexels.com/photos/2040050/pexels-photo-2040050.jpeg?auto=compress&cs=tinysrgb&w=800", duration: "30 min" },
  { title: "Grey Blending", price: "$45", description: "Subtle, natural color integration.", category: 'Premium', image: "https://images.pexels.com/photos/1570806/pexels-photo-1570806.jpeg?auto=compress&cs=tinysrgb&w=800", duration: "45 min" },
];

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();

  // Find the service by converting title to slug
  const service = SERVICES.find((s) => s.title.toLowerCase().replace(/\\s+/g, '-') === id);

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
      {/* Universal Background for Theme */}
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
            <img 
              src={service.image} 
              alt={service.title} 
              className="w-full h-full object-cover grayscale opacity-80"
              referrerPolicy="no-referrer"
            />
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
