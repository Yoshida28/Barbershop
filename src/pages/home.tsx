import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Instagram, Facebook, Twitter, Phone, Mail, MapPin,
  ChevronRight, ArrowRight, Scissors, Award, Star, Paperclip, X as XIcon
} from 'lucide-react';
import { HeroSection } from '../components/blocks/hero-section-5';
import ElegantCarousel from '../components/ui/elegant-carousel';
import { SmokeBackground } from '../components/ui/spooky-smoke-animation';
import { ImageAutoSlider } from '../components/ui/image-auto-slider';
import { LocationSelectors } from '../components/ui/location-selectors';
import { supabase } from '../lib/supabase';
import type { Service, Product, RateCardItem, GalleryItem, MediaItem, FranchiseInfo } from '../lib/supabase';
import { FeatureSteps } from '../components/ui/feature-section';
import { Loader } from '../components/ui/loader';


// --- Components ---

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-16">
    {subtitle && <p className="text-xs uppercase tracking-[0.4em] text-muted-text mb-4">{subtitle}</p>}
    <h2 className="text-4xl md:text-7xl leading-none font-display uppercase">{title}</h2>
  </div>
);

const OnePager = () => (
  <section className="py-16 md:py-24 px-5 md:px-6 bg-secondary-bg">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
      <div className="aspect-[4/3] md:aspect-[4/5] overflow-hidden rounded-xl">
        <img 
          src="https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Barber at work" 
          className="w-full h-full object-cover"
          style={{ filter: 'contrast(1.12) brightness(1.06) saturate(1.1)' }}
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="py-4">
        <SectionHeading title="The Art of the Cut" subtitle="Introduction" />
        <p className="text-base md:text-lg leading-relaxed text-body-text mb-8">
          TheBarberShop is more than a barbershop; it's a sanctuary for the modern gentleman. We combine centuries-old traditions with contemporary techniques to deliver an unparalleled grooming experience.
        </p>
        <div className="grid grid-cols-2 gap-6 md:gap-8">
          <div>
            <h4 className="text-xl md:text-2xl mb-2 font-display uppercase">15+ Years</h4>
            <p className="text-xs uppercase text-muted-text">Of Excellence</p>
          </div>
          <div>
            <h4 className="text-xl md:text-2xl mb-2 font-display uppercase">24/7</h4>
            <p className="text-xs uppercase text-muted-text">Booking Available</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const AboutVisionMission = () => (
  <section id="about" className="py-16 md:py-24 px-5 md:px-6 bg-primary-bg-bg">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
        <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          viewport={{ once: true }}
          className="space-y-4 md:space-y-6"
        >
          <h3 className="text-3xl md:text-4xl font-display uppercase">About Us</h3>
          <p className="text-body-text leading-relaxed font-sans text-sm md:text-base">
            Founded in the heart of the city, TheBarberShop was born from a desire to return to the roots of masculine grooming. Our master barbers are artists, dedicated to the precision and detail that defines a true gentleman.
          </p>
        </motion.div>
        <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-4 md:space-y-6"
        >
          <h3 className="text-3xl md:text-4xl font-display uppercase">Our Vision</h3>
          <p className="text-body-text leading-relaxed font-sans text-sm md:text-base">
            To redefine the standard of men's grooming globally, creating a space where style, comfort, and tradition coexist in perfect harmony. We aim to be the benchmark for luxury barbering.
          </p>
        </motion.div>
        <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="space-y-4 md:space-y-6"
        >
          <h3 className="text-3xl md:text-4xl font-display uppercase">Our Mission</h3>
          <p className="text-body-text leading-relaxed font-sans text-sm md:text-base">
            To empower every man who walks through our doors with confidence and a sharp look. We provide meticulous service, premium products, and an atmosphere that honors the craft of barbering.
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('services').select('*').order('sort_order').then(({ data }) => {
      setServices(data || []);
      setLoading(false);
    });
  }, []);

  const categories = ['All', ...Array.from(new Set(services.map(s => s.category).filter(Boolean)))];
  const filtered = activeCategory === 'All' ? services : services.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="py-16 md:py-24 px-5 md:px-6 bg-secondary-bg">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Our Services" subtitle="Expertise" />
        <div className="flex flex-wrap gap-3 mb-10 md:mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 md:px-6 py-2 text-xs uppercase tracking-widest border transition-all rounded-full ${
                activeCategory === cat
                  ? 'bg-primary-bg text-heading-text border-primary border-solid'
                  : 'bg-transparent text-heading-text border-white/10 hover:border-primary border-solid'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <div className="col-span-full py-20 text-center">
              <Loader />
            </div>
          ) : filtered.length > 0 ? (
            filtered.map((service, idx) => (
              <Link to={`/services/${service.id}`} key={service.id} className="block">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative aspect-square overflow-hidden rounded-xl bg-primary-bg-bg"
                >
                  {service.image_url ? (
                    <img
                      src={service.image_url}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-secondary-bg flex items-center justify-center">
                      <Scissors size={40} className="text-white/10" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-heading-text">
                    <p className="text-xs uppercase tracking-widest mb-2 opacity-70">{service.category}</p>
                    <h4 className="text-3xl mb-1 font-display uppercase">{service.title}</h4>
                    <p className="text-sm opacity-80 mb-4 font-sans">{service.description}</p>
                    <p className="text-xl font-display">{service.price}</p>
                  </div>
                </motion.div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-muted-text text-xs uppercase tracking-widest">Loading services…</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const ProductsMerch = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('products').select('*').order('sort_order').then(({ data }) => {
      setProducts(data || []);
      setLoading(false);
    });
  }, []);

  // Split by category: non-Merchandise = Apothecary, Merchandise = Dry Goods
  const apothecary = products.filter(p => p.category !== 'Merchandise').slice(0, 6);
  const merchandise = products.filter(p => p.category === 'Merchandise').slice(0, 6);

  const ProductRow = ({ item }: { item: Product }) => (
    <div className="flex gap-5 md:gap-8 items-center group">
      <div className="w-20 h-20 md:w-32 md:h-32 flex-shrink-0 overflow-hidden bg-secondary-bg rounded-lg">
        {item.image_url ? (
          <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-secondary-bg" />
        )}
      </div>
      <div className="flex-1 border-b border-white/10 border-solid pb-4">
        <div className="flex justify-between items-end mb-2">
          <h4 className="text-lg md:text-2xl font-display uppercase">{item.name}</h4>
          <span className="text-base md:text-lg font-display">{item.price}</span>
        </div>
        <Link to="/products" className="text-xs uppercase tracking-widest font-bold flex items-center gap-2 hover:gap-4 transition-all">
          View Details <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );

  return (
    <section id="products" className="py-16 md:py-24 px-5 md:px-6 bg-primary-bg-bg">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <SectionHeading title="Apothecary" subtitle="Premium Products" />
            <div className="grid grid-cols-1 gap-8 md:gap-12">
              {loading ? (
                <div className="py-8"><Loader /></div>
              ) : apothecary.length > 0 ? apothecary.map(p => <ProductRow key={p.id} item={p} />) : (
                <p className="text-muted-text text-xs uppercase tracking-widest py-8">Our apothecary is currently being restocked.</p>
              )}
            </div>
          </div>
          <div>
            <SectionHeading title="Dry Goods" subtitle="Merchandise" />
            <div className="grid grid-cols-1 gap-8 md:gap-12">
              {loading ? (
                <div className="py-8"><Loader /></div>
              ) : merchandise.length > 0 ? merchandise.map(p => <ProductRow key={p.id} item={p} />) : (
                <p className="text-muted-text text-xs uppercase tracking-widest py-8">Merchandise is currently unavailable.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const RateCard = () => {
  const [rateItems, setRateItems] = useState<RateCardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('rate_card').select('*').order('sort_order').then(({ data }) => {
      setRateItems(data || []);
      setLoading(false);
    });
  }, []);

  // Group by category
  const groups = rateItems.reduce<Record<string, RateCardItem[]>>((acc, item) => {
    const cat = item.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <section id="rate-card" className="py-16 md:py-24 px-5 md:px-6 bg-primary-bg text-heading-text">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-[0.4em] text-body-text mb-4">Investment</p>
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-display uppercase">Rate Card</h2>
        </div>
        <div className="space-y-8">
          {loading ? (
            <div className="py-12"><Loader size="large" /></div>
          ) : Object.entries(groups).map(([cat, items]) => (
            <div key={cat} className="space-y-4">
              <h5 className="text-xs uppercase tracking-widest text-body-text border-b border-white/10 border-solid pb-2">{cat}</h5>
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-end group cursor-default">
                  <span className="text-lg md:text-2xl uppercase tracking-wide group-hover:translate-x-2 transition-transform font-display">{item.service_name}</span>
                  <div className="flex-1 border-b border-dashed border-white/10 mx-4 mb-2 border-solid" />
                  <span className="text-lg md:text-2xl font-display">{item.price}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-12 md:mt-16 text-center">
          <p className="text-xs text-body-text uppercase tracking-widest mb-8">All services include a complimentary beverage and consultation.</p>
          <Link to="/services" className="inline-block bg-primary-bg-bg text-heading-text px-8 md:px-12 py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-white/5 transition-colors w-full md:w-auto">
            View Full Services
          </Link>
        </div>
      </div>
    </section>
  );
};

// Flash overlay for gallery navigation
const GalleryFlash = ({ active }: { active: boolean }) => (
  <AnimatePresence>
    {active && (
      <motion.div
        key="flash"
        className="fixed inset-0 bg-[#0b0a08] z-[999] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      />
    )}
  </AnimatePresence>
);

const FALLBACK_GALLERY = [
  'https://images.pexels.com/photos/1319459/pexels-photo-1319459.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2080006/pexels-photo-2080006.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=800',
];

const Gallery = () => {
  const navigate = useNavigate();
  const [flashing, setFlashing] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('gallery_items').select('image_url').order('sort_order').limit(12).then(({ data }) => {
      const urls = (data || []).map((g: GalleryItem) => g.image_url).filter(Boolean);
      setGalleryImages(urls.length > 0 ? urls : FALLBACK_GALLERY);
      setLoading(false);
    });
  }, []);

  const handleGalleryNav = () => {
    setFlashing(true);
    setTimeout(() => navigate('/gallery'), 340);
  };

  return (
    <section id="gallery" className="bg-[#0b0a08] relative">
      <GalleryFlash active={flashing} />
      {loading ? (
        <div className="py-32"><Loader size="large" /></div>
      ) : (
        <ImageAutoSlider
          images={galleryImages.length > 0 ? galleryImages : FALLBACK_GALLERY}
          title="The Archive"
          subtitle="Visuals"
          speed={38}
          onImageClick={handleGalleryNav}
        />
      )}
    </section>
  );
};

const MediaCenter = () => {
  const [features, setFeatures] = useState<{ step: string; title: string; content: string; image: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('media_items').select('*').order('published_at', { ascending: false }).limit(3).then(({ data }) => {
      const mapped = (data || []).map((m: MediaItem) => ({
        step: new Date(m.published_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        title: m.title,
        content: m.description || '',
        image: m.media_url || 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1200',
      }));
      setFeatures(mapped.length > 0 ? mapped : [
        { step: 'Oct 12, 2025', title: 'New London Flagship', content: 'TheBarberShop opens its most ambitious location yet on Savile Row.', image: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1200' },
        { step: 'Sep 05, 2025', title: 'The Evolution of Craft', content: 'A deep dive into how our master barbers evolve centuries-old techniques.', image: 'https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg?auto=compress&cs=tinysrgb&w=1200' },
      ]);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-secondary-bg">
        <Loader size="large" />
      </section>
    );
  }

  if (features.length === 0) return null;

  return (
    <section className="py-24 bg-secondary-bg">
      <FeatureSteps
        features={features}
        title="Media Center"
        autoPlayInterval={5000}
        imageHeight="h-[600px]"
      />
    </section>
  );
};

const MAX_ATTACH_FILES = 5;
const MAX_ATTACH_MB = 5;

async function uploadAttachments(files: File[]): Promise<string[]> {
  const urls: string[] = [];
  for (const file of files) {
    const path = `submissions/${crypto.randomUUID()}-${file.name}`;
    const { error } = await supabase.storage.from('attachments').upload(path, file, { upsert: false });
    if (!error) {
      const { data } = supabase.storage.from('attachments').getPublicUrl(path);
      urls.push(data.publicUrl);
    }
  }
  return urls;
}

const ContactSection = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'franchise' | 'career'>('general');
  const [franchiseStats, setFranchiseStats] = useState<FranchiseInfo[]>([]);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [attachments, setAttachments] = useState<File[]>([]);
  const [attachError, setAttachError] = useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    supabase.from('franchise_info').select('*').order('sort_order').then(({ data }) => {
      setFranchiseStats(data || []);
      setLoadingStats(false);
    });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttachError('');
    const selected = Array.from(e.target.files || []);
    const combined = [...attachments, ...selected];
    if (combined.length > MAX_ATTACH_FILES) { setAttachError(`Max ${MAX_ATTACH_FILES} files allowed.`); return; }
    const oversized = selected.find(f => f.size > MAX_ATTACH_MB * 1024 * 1024);
    if (oversized) { setAttachError(`Each file must be under ${MAX_ATTACH_MB}MB.`); return; }
    setAttachments(combined.slice(0, MAX_ATTACH_FILES));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeFile = (idx: number) => setAttachments(prev => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('sending');
    const attachmentUrls = attachments.length > 0 ? await uploadAttachments(attachments) : [];
    const { error } = await supabase.from('contact_submissions').insert({
      type: activeTab,
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      message: formData.message || null,
      attachments: attachmentUrls.length > 0 ? attachmentUrls : null,
    });
    if (error) {
      setSubmitStatus('error');
    } else {
      setSubmitStatus('sent');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setAttachments([]);
      setTimeout(() => setSubmitStatus('idle'), 4000);
    }
  };

  const tabConfig = {
    general: { label: 'General', title: 'Get in Touch', subtitle: 'Contact', buttonText: 'Send Message' },
    franchise: { label: 'Franchise', title: 'Join the Franchise', subtitle: 'Franchise', buttonText: 'Submit Application' },
    career: { label: 'Career', title: 'Join Our Team', subtitle: 'Careers', buttonText: 'Submit Application' },
  };

  const config = tabConfig[activeTab];

  return (
    <section id="contact" className="py-16 md:py-24 px-5 md:px-6 bg-secondary-bg">
      <div className="max-w-7xl mx-auto">
        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/5 p-1.5 rounded-full flex gap-2">
            {(Object.keys(tabConfig) as Array<'general' | 'franchise' | 'career'>).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 md:px-8 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-primary-bg text-heading-text shadow-lg'
                    : 'text-body-text hover:text-heading-text'
                }`}
              >
                {tabConfig[tab].label}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24"
        >
          {/* Left — Info */}
          <div>
            <SectionHeading title={config.title} subtitle={config.subtitle} />

            {activeTab === 'general' && (
              <div className="space-y-6 md:space-y-8">
                <p className="text-base text-body-text leading-relaxed mb-4 font-sans">
                  For appointments, press inquiries, or general questions, we invite you to connect with our team.
                </p>
                <div className="flex gap-5"><MapPin size={20} className="text-heading-text shrink-0 mt-1" /><div><h5 className="text-xs uppercase tracking-widest font-bold mb-1">Location</h5><p className="text-body-text font-sans text-sm">123 Savile Row, Mayfair<br />London, W1S 3PR</p></div></div>
                <div className="flex gap-5"><Phone size={20} className="text-heading-text shrink-0 mt-1" /><div><h5 className="text-xs uppercase tracking-widest font-bold mb-1">Phone</h5><p className="text-body-text font-sans text-sm">+44 (0) 20 7123 4567</p></div></div>
                <div className="flex gap-5"><Mail size={20} className="text-heading-text shrink-0 mt-1" /><div><h5 className="text-xs uppercase tracking-widest font-bold mb-1">Email</h5><p className="text-body-text font-sans text-sm">appointments@thebarbershop.com</p></div></div>
                <div className="flex gap-4">
                  <a href="#" className="p-2.5 border border-white/10 border-solid hover:border-primary transition-colors"><Instagram size={18} /></a>
                  <a href="#" className="p-2.5 border border-white/10 border-solid hover:border-primary transition-colors"><Facebook size={18} /></a>
                  <a href="#" className="p-2.5 border border-white/10 border-solid hover:border-primary transition-colors"><Twitter size={18} /></a>
                </div>
              </div>
            )}

            {activeTab === 'franchise' && (
              <div>
                <p className="text-base text-body-text leading-relaxed mb-8 font-sans">
                  We are looking for partners who share our passion for excellence and tradition. Bring the TheBarberShop experience to your city.
                </p>
                {loadingStats ? (
                  <div className="py-4"><Loader /></div>
                ) : (
                  <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                    {franchiseStats.map((item) => (
                      <div key={item.key} className="border-l-2 border-primary pl-4">
                        <p className="text-xs uppercase tracking-widest text-muted-text mb-1">{item.label}</p>
                        <p className="text-lg md:text-xl font-display uppercase">{item.value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'career' && (
              <div>
                <p className="text-base text-body-text leading-relaxed mb-8 font-sans">
                  Join a team of passionate professionals dedicated to the art of grooming. We're always looking for talented barbers, stylists, and creatives.
                </p>
                <div className="bg-primary-bg-bg p-6 md:p-8 rounded-sm border-l-4 border-primary">
                  <h4 className="font-display text-xl md:text-2xl uppercase tracking-widest mb-2">Build Your Career</h4>
                  <p className="text-sm text-body-text font-sans">We invest in our people with world-class training, competitive compensation, and a culture that celebrates craft and creativity.</p>
                </div>
              </div>
            )}
          </div>

          {/* Right — Form */}
          <form className="bg-primary-bg-bg p-6 md:p-12 space-y-5 shadow-2xl rounded-xl" onSubmit={handleSubmit}>
            <div className="space-y-2"><label className="text-xs uppercase tracking-widest font-bold">Name *</label><input required type="text" value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))} className="w-full bg-transparent border border-primary border-solid p-3 md:p-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all font-sans" /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2"><label className="text-xs uppercase tracking-widest font-bold">Email *</label><input required type="email" value={formData.email} onChange={e => setFormData(p => ({...p, email: e.target.value}))} className="w-full bg-transparent border border-primary border-solid p-3 md:p-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all font-sans" /></div>
              <div className="space-y-2"><label className="text-xs uppercase tracking-widest font-bold">Phone Number</label><input type="tel" value={formData.phone} onChange={e => setFormData(p => ({...p, phone: e.target.value}))} className="w-full bg-transparent border border-primary border-solid p-3 md:p-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all font-sans" /></div>
            </div>
            <div className="space-y-2"><label className="text-xs uppercase tracking-widest font-bold">Message</label><textarea rows={4} value={formData.message} onChange={e => setFormData(p => ({...p, message: e.target.value}))} className="w-full bg-transparent border border-primary border-solid p-3 md:p-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all font-sans" /></div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-widest font-bold text-body-text">Attachments (max {MAX_ATTACH_FILES}, {MAX_ATTACH_MB}MB each)</span>
                <button type="button" onClick={() => fileInputRef.current?.click()} disabled={attachments.length >= MAX_ATTACH_FILES}
                  className="flex items-center gap-1 text-xs uppercase tracking-widest font-bold border border-white/20 px-3 py-1.5 hover:bg-white/5 transition-colors disabled:opacity-40">
                  <Paperclip size={12} /> Attach
                </button>
              </div>
              <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileChange} />
              {attachments.length > 0 && (
                <ul className="space-y-1 mt-2">
                  {attachments.map((f, i) => (
                    <li key={i} className="flex items-center justify-between text-xs text-body-text bg-white/5 px-3 py-1.5 rounded">
                      <span className="truncate max-w-50">{f.name}</span>
                      <button type="button" onClick={() => removeFile(i)} className="ml-2 text-muted-text hover:text-heading-text"><XIcon size={12} /></button>
                    </li>
                  ))}
                </ul>
              )}
              {attachError && <p className="text-red-400 text-xs mt-1">{attachError}</p>}
            </div>
            {submitStatus === 'sent' && <p className="text-green-400 text-xs uppercase tracking-widest">✓ Message sent successfully!</p>}
            {submitStatus === 'error' && <p className="text-red-400 text-xs uppercase tracking-widest">Something went wrong. Please try again.</p>}
            <button type="submit" disabled={submitStatus === 'sending'} className="bg-primary-bg text-heading-text w-full py-4 md:py-5 text-xs uppercase tracking-[0.3em] font-bold hover:bg-neutral-800 transition-colors disabled:opacity-60">
              {submitStatus === 'sending' ? 'Sending…' : config.buttonText}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};




export default function Home() {
  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Products', href: '#products' },
    { label: 'Rate Card', href: '#rate-card' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Franchise', href: '#franchise' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Instagram, href: '#' },
    { icon: Facebook, href: '#' },
    { icon: Twitter, href: '#' },
  ];

  return (
    <div className="min-h-screen selection:bg-primary-bg selection:text-heading-text relative">
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -10 }}>
        <SmokeBackground smokeColor="#262626" />
      </div>
      <div className="relative z-10">
      <div className="relative z-10 -mt-24 md:mt-0">
        <HeroSection />
      </div>
      
      {/* Elegant Carousel section moved from Gallery with significant padding */}
      <div className="py-24 md:py-32 bg-background relative z-10 border-t border-b border-white/5">
        <ElegantCarousel />
      </div>
      
      <OnePager />
      <AboutVisionMission />
      <Services />
      <ProductsMerch />
      <RateCard />
      <Gallery />
      <MediaCenter />
      <ContactSection />
      </div>
    </div>
  );
}
