import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowRight, Building } from 'lucide-react';

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-20 text-center md:text-left w-full">
    {subtitle && (
      <p className="text-xs uppercase tracking-[0.4em] mb-6 font-bold flex items-center justify-center md:justify-start gap-4 text-body-text">
        <span className="w-8 h-[1px] block bg-neutral-300" />
        {subtitle}
      </p>
    )}
    <h2 className="text-5xl md:text-7xl leading-none uppercase tracking-tight text-heading-text">{title}</h2>
  </div>
);

// Modern floating label input component
const FloatingInput = ({ label, type = "text", id }: { label: string, type?: string, id: string }) => (
  <div className="relative z-0 w-full mb-8 group">
      <input 
        type={type} 
        name={id} 
        id={id} 
        className="block py-4 px-0 w-full text-base text-heading-text bg-transparent border-0 border-b-2 border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-colors" 
        placeholder=" " 
        required 
      />
      <label 
        htmlFor={id} 
        className="peer-focus:font-medium absolute text-sm text-body-text duration-300 transform -translate-y-8 scale-75 top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-heading-text peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 tracking-widest uppercase font-bold"
      >
        {label}
      </label>
  </div>
);

const FloatingTextarea = ({ label, id }: { label: string, id: string }) => (
   <div className="relative z-0 w-full mb-8 group">
       <textarea 
         name={id} 
         id={id} 
         rows={4}
         className="block py-4 px-0 w-full text-base text-heading-text bg-transparent border-0 border-b-2 border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-colors resize-none" 
         placeholder=" " 
         required 
       />
       <label 
         htmlFor={id} 
         className="peer-focus:font-medium absolute text-sm text-body-text duration-300 transform -translate-y-8 scale-75 top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-heading-text peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 tracking-widest uppercase font-bold"
       >
         {label}
       </label>
   </div>
 );

export default function Contact() {
  const [activeTab, setActiveTab] = useState<'contact' | 'franchise'>('contact');

  return (
    <div className="w-full relative py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Tab Switcher */}
        <div className="flex justify-center mb-16">
           <div className="bg-white/5 p-2 rounded-full flex gap-2">
              <button 
                onClick={() => setActiveTab('contact')}
                className={`px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold transition-all duration-300 ${activeTab === 'contact' ? 'bg-primary-bg text-heading-text shadow-lg' : 'text-body-text hover:text-heading-text'}`}
              >
                 Contact Us
              </button>
              <button 
                onClick={() => setActiveTab('franchise')}
                className={`px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold transition-all duration-300 ${activeTab === 'franchise' ? 'bg-primary-bg text-heading-text shadow-lg' : 'text-body-text hover:text-heading-text'}`}
              >
                 Franchise Inquiries
              </button>
           </div>
        </div>

        <motion.div 
           key={activeTab}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="bg-primary-bg-bg p-8 md:p-16 rounded-sm shadow-2xl border border-white/10 grid md:grid-cols-2 gap-16 md:gap-24 relative overflow-hidden"
        >
           {/* Decorative Background Element */}
           <div className="absolute -top-40 -right-40 w-96 h-96 bg-secondary-bg rounded-full blur-3xl opacity-50 pointer-events-none" />

           <div className="relative z-10">
              <SectionHeading 
                 title={activeTab === 'contact' ? "Get in Touch" : "Join the Legacy"} 
                 subtitle={activeTab === 'contact' ? "Enquiries" : "Franchise"} 
              />
              
              {activeTab === 'contact' ? (
                 <div className="space-y-10 mt-12">
                    <p className="text-body-text font-light leading-relaxed mb-12">
                       For appointments, press inquiries, or general questions, we invite you to connect with our concierge team.
                    </p>
                    <div className="flex items-start gap-6 group">
                      <div className="bg-white/5 p-4 rounded-full group-hover:bg-primary-bg group-hover:text-heading-text transition-colors"><MapPin size={24} className="group-hover:text-heading-text text-heading-text" /></div>
                      <div>
                        <h4 className="font-display tracking-widest uppercase text-xl mb-1">LONDON, UK</h4>
                        <p className="text-sm text-muted-text">12 Savile Row, Mayfair, W1S 3PQ</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-6 group">
                      <div className="bg-white/5 p-4 rounded-full group-hover:bg-primary-bg group-hover:text-heading-text transition-colors"><Phone size={24} className="group-hover:text-heading-text text-heading-text" /></div>
                      <div>
                        <h4 className="font-display tracking-widest uppercase text-xl mb-1">PHONE</h4>
                        <p className="text-sm text-muted-text">+44 20 7946 0958</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-6 group">
                      <div className="bg-white/5 p-4 rounded-full group-hover:bg-primary-bg group-hover:text-heading-text transition-colors"><Mail size={24} className="group-hover:text-heading-text text-heading-text" /></div>
                      <div>
                        <h4 className="font-display tracking-widest uppercase text-xl mb-1">EMAIL</h4>
                        <p className="text-sm text-muted-text">concierge@thebarbershop.com</p>
                      </div>
                    </div>
                 </div>
              ) : (
                 <div className="space-y-10 mt-12">
                    <p className="text-body-text font-light leading-relaxed mb-8">
                       Partner with TheBarberShop to bring premium grooming to your city. We offer comprehensive support, training, and a proven business model.
                    </p>
                    <div className="bg-secondary-bg p-8 rounded-sm border-l-4 border-primary">
                       <Building className="text-heading-text mb-4" size={32} />
                       <h4 className="font-display text-2xl uppercase tracking-widest mb-2">Global Expansion</h4>
                       <p className="text-sm text-body-text font-light">We are actively seeking strategic partners in major metropolitan areas across Europe, North America, and Asia.</p>
                    </div>
                 </div>
              )}
           </div>

           {/* Form Section */}
           <div className="relative z-10 md:mt-16">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                 <div className="grid md:grid-cols-2 gap-8">
                    <FloatingInput label="First Name" id="firstName" />
                    <FloatingInput label="Last Name" id="lastName" />
                 </div>
                 <FloatingInput label="Email Address" type="email" id="email" />
                 
                 {activeTab === 'franchise' && (
                    <div className="grid md:grid-cols-2 gap-8">
                       <FloatingInput label="City of Interest" id="city" />
                       <FloatingInput label="Investment Capital ($)" type="number" id="capital" />
                    </div>
                 )}

                 <FloatingTextarea label="Your Message" id="message" />
                 
                 <button className="w-full mt-4 bg-primary-bg text-heading-text py-5 px-8 flex justify-between items-center group hover:bg-black transition-colors rounded-sm shadow-xl">
                    <span className="text-xs uppercase font-bold tracking-[0.3em]">
                       {activeTab === 'contact' ? 'Send Message' : 'Submit Application'}
                    </span>
                    <ArrowRight size={20} className="transform group-hover:translate-x-2 transition-transform" />
                 </button>
              </form>
           </div>

        </motion.div>
      </div>
    </div>
  );
}
