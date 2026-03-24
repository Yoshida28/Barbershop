import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight, CheckCircle, Star, Users, TrendingUp } from 'lucide-react';
import { useLocationAPI } from '../hooks/use-location-api';
import { supabase } from '../lib/supabase';

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-20 text-center md:text-left w-full">
    {subtitle && (
      <p className="text-xs uppercase tracking-[0.4em] mb-6 font-bold flex items-center justify-center md:justify-start gap-4 text-body-text">
        <span className="w-8 h-px block bg-neutral-300" />
        {subtitle}
      </p>
    )}
    <h2 className="text-5xl md:text-7xl leading-none uppercase tracking-tight text-heading-text">{title}</h2>
  </div>
);

const FloatingInput = ({
  label, type = 'text', id, value, onChange,
}: { label: string; type?: string; id: string; value: string; onChange: (v: string) => void }) => (
  <div className="relative z-0 w-full mb-8 group">
    <input
      type={type} name={id} id={id} value={value}
      onChange={(e) => onChange(e.target.value)}
      className="block py-4 px-0 w-full text-base text-heading-text bg-transparent border-0 border-b-2 border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-colors"
      placeholder=" " required
    />
    <label htmlFor={id} className="peer-focus:font-medium absolute text-sm text-body-text duration-300 transform -translate-y-8 scale-75 top-4 -z-10 origin-left peer-focus:left-0 peer-focus:text-heading-text peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 tracking-widest uppercase font-bold">
      {label}
    </label>
  </div>
);

const FloatingTextarea = ({
  label, id, value, onChange,
}: { label: string; id: string; value: string; onChange: (v: string) => void }) => (
  <div className="relative z-0 w-full mb-8 group">
    <textarea
      name={id} id={id} rows={4} value={value}
      onChange={(e) => onChange(e.target.value)}
      className="block py-4 px-0 w-full text-base text-heading-text bg-transparent border-0 border-b-2 border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-colors resize-none"
      placeholder=" " required
    />
    <label htmlFor={id} className="peer-focus:font-medium absolute text-sm text-body-text duration-300 transform -translate-y-8 scale-75 top-4 -z-10 origin-left peer-focus:left-0 peer-focus:text-heading-text peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 tracking-widest uppercase font-bold">
      {label}
    </label>
  </div>
);

const FloatingSelect = ({
  label, id, options, value, onChange, isLoading, disabled,
}: { label: string; id: string; options: string[]; value: string; onChange: (v: string) => void; isLoading: boolean; disabled: boolean }) => (
  <div className="relative z-0 w-full mb-8 group">
    <select
      name={id} id={id} value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled || isLoading}
      className="block py-4 px-0 w-full text-base text-heading-text bg-transparent border-0 border-b-2 border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-colors"
    >
      <option value="" disabled className="bg-primary-bg-bg text-muted-text"></option>
      {options.map((opt) => (
        <option key={opt} value={opt} className="bg-primary-bg-bg text-heading-text">{opt}</option>
      ))}
    </select>
    <label htmlFor={id} className={`absolute text-sm text-body-text duration-300 transform top-4 -z-10 origin-left tracking-widest uppercase font-bold ${value || isLoading ? '-translate-y-8 scale-75 text-heading-text' : ''} peer-focus:left-0 peer-focus:text-heading-text peer-focus:scale-75 peer-focus:-translate-y-8`}>
      {isLoading ? 'Loading...' : label}
    </label>
  </div>
);

const perks = [
  { icon: <Star size={20} />, title: 'World-Class Training', desc: 'Learn from master barbers and industry leaders.' },
  { icon: <TrendingUp size={20} />, title: 'Growth Path', desc: 'Clear career progression from barber to senior and beyond.' },
  { icon: <Users size={20} />, title: 'Elite Community', desc: 'Join a team that celebrates craft, creativity, and excellence.' },
];

export default function Career() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const {
    countries, states, cities,
    loadingCountries, loadingStates, loadingCities,
    selectedCountry, setSelectedCountry,
    selectedState, setSelectedState,
    selectedCity, setSelectedCity,
  } = useLocationAPI();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    const { error: err } = await supabase.from('contact_submissions').insert({
      type: 'career',
      name, email, phone, message,
      country: selectedCountry || null,
      state: selectedState || null,
      city: selectedCity || null,
    });
    setSubmitting(false);
    if (err) { setError('Something went wrong. Please try again.'); return; }
    setSubmitted(true);
  };

  return (
    <div className="w-full relative py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-primary-bg-bg p-8 md:p-16 rounded-sm shadow-2xl border border-white/10 grid md:grid-cols-2 gap-16 md:gap-24 relative overflow-hidden"
        >
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-secondary-bg rounded-full blur-3xl opacity-50 pointer-events-none" />

          <div className="relative z-10">
            <SectionHeading title="Join Our Team" subtitle="Careers" />
            <p className="text-body-text font-light leading-relaxed mb-10">
              Join a team of passionate professionals dedicated to the art of grooming. We're always looking for talented barbers, stylists, and creatives who want to build something extraordinary.
            </p>
            <div className="bg-secondary-bg p-8 rounded-sm border-l-4 border-primary mb-10">
              <Briefcase className="text-heading-text mb-4" size={32} />
              <h4 className="font-display text-2xl uppercase tracking-widest mb-2">Build Your Career</h4>
              <p className="text-sm text-body-text font-light">We invest in our people with competitive compensation and a culture that celebrates craft and creativity.</p>
            </div>
            <div className="space-y-6">
              {perks.map((p) => (
                <div key={p.title} className="flex items-start gap-4">
                  <div className="bg-white/5 p-3 rounded-full text-heading-text shrink-0">{p.icon}</div>
                  <div>
                    <h5 className="font-display tracking-widest uppercase text-sm mb-1 text-heading-text">{p.title}</h5>
                    <p className="text-xs text-muted-text font-light">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 md:mt-16">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full gap-6 text-center py-16"
              >
                <CheckCircle size={56} className="text-heading-text" />
                <h3 className="text-2xl font-display uppercase tracking-widest text-heading-text">Application Received</h3>
                <p className="text-body-text font-light">Thank you for your interest. Our team will review your application and be in touch.</p>
                <button onClick={() => setSubmitted(false)} className="text-xs uppercase tracking-widest font-bold text-muted-text hover:text-heading-text transition-colors mt-4">
                  Submit Another
                </button>
              </motion.div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <FloatingInput label="Full Name" id="name" value={name} onChange={setName} />
                <FloatingInput label="Email Address" type="email" id="email" value={email} onChange={setEmail} />
                <FloatingInput label="Phone Number" type="tel" id="phone" value={phone} onChange={setPhone} />
                <div className="grid md:grid-cols-3 gap-4">
                  <FloatingSelect label="Country" id="country" options={countries} value={selectedCountry} onChange={setSelectedCountry} isLoading={loadingCountries} disabled={false} />
                  <FloatingSelect label="State" id="state" options={states} value={selectedState} onChange={setSelectedState} isLoading={loadingStates} disabled={!selectedCountry} />
                  <FloatingSelect label="City" id="city" options={cities} value={selectedCity} onChange={setSelectedCity} isLoading={loadingCities} disabled={!selectedState} />
                </div>
                <FloatingTextarea label="Tell us about yourself & your experience" id="message" value={message} onChange={setMessage} />
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full mt-4 bg-primary-bg text-heading-text py-5 px-8 flex justify-between items-center group hover:bg-black transition-colors rounded-sm shadow-xl disabled:opacity-60"
                >
                  <span className="text-xs uppercase font-bold tracking-[0.3em]">
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  </span>
                  <ArrowRight size={20} className="transform group-hover:translate-x-2 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
