import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Instagram, Facebook, Twitter, Phone, Mail, MapPin, 
  ChevronRight, ArrowRight, Scissors, Award, Star
} from 'lucide-react';
import { HeroSection } from '../components/blocks/hero-section-5';
import ElegantCarousel from '../components/ui/elegant-carousel';
import { SmokeBackground } from '../components/ui/spooky-smoke-animation';
import { ImageAutoSlider } from '../components/ui/image-auto-slider';

// --- Types ---
interface Service {
  title: string;
  price: string;
  description: string;
  category: 'Hair' | 'Beard' | 'Grooming' | 'Premium';
  image: string;
}

interface Product {
  name: string;
  price: string;
  image: string;
}

// --- Data ---
const SERVICES: Service[] = [
  { title: "Executive Haircut", price: "$65", description: "Precision cut with hot towel finish.", category: 'Hair', image: "https://images.pexels.com/photos/1319459/pexels-photo-1319459.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { title: "Signature Beard Trim", price: "$40", description: "Sculpting and conditioning treatment.", category: 'Beard', image: "https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { title: "Classic Hot Shave", price: "$50", description: "Traditional straight razor experience.", category: 'Grooming', image: "https://images.pexels.com/photos/2080006/pexels-photo-2080006.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { title: "The Vanguard Package", price: "$120", description: "Full hair, beard, and facial treatment.", category: 'Premium', image: "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { title: "Scalp Therapy", price: "$35", description: "Invigorating massage and deep conditioning.", category: 'Hair', image: "https://images.pexels.com/photos/2040050/pexels-photo-2040050.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { title: "Grey Blending", price: "$45", description: "Subtle, natural color integration.", category: 'Premium', image: "https://images.pexels.com/photos/1570806/pexels-photo-1570806.jpeg?auto=compress&cs=tinysrgb&w=800" },
];

const PRODUCTS: Product[] = [
  { name: "Matte Clay", price: "$28", image: "https://images.pexels.com/photos/4587635/pexels-photo-4587635.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Beard Oil", price: "$32", image: "https://images.pexels.com/photos/672629/pexels-photo-672629.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Sea Salt Spray", price: "$24", image: "https://images.pexels.com/photos/4465121/pexels-photo-4465121.jpeg?auto=compress&cs=tinysrgb&w=400" },
];

const MERCHANDISE: Product[] = [
  { name: "Vanguard Tee", price: "$45", image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Leather Apron", price: "$180", image: "https://images.pexels.com/photos/3389531/pexels-photo-3389531.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Steel Comb", price: "$35", image: "https://images.pexels.com/photos/10153406/pexels-photo-10153406.jpeg?auto=compress&cs=tinysrgb&w=400" },
];

const GALLERY_IMAGES = [
  "https://images.pexels.com/photos/1319459/pexels-photo-1319459.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/2080006/pexels-photo-2080006.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/2040050/pexels-photo-2040050.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1570806/pexels-photo-1570806.jpeg?auto=compress&cs=tinysrgb&w=800",
];

// --- Components ---

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-16">
    {subtitle && <p className="text-xs uppercase tracking-[0.4em] text-muted-text mb-4">{subtitle}</p>}
    <h2 className="text-5xl md:text-7xl leading-none font-display uppercase">{title}</h2>
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
          Vanguard is more than a barbershop; it's a sanctuary for the modern gentleman. We combine centuries-old traditions with contemporary techniques to deliver an unparalleled grooming experience.
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
            Founded in the heart of the city, Vanguard was born from a desire to return to the roots of masculine grooming. Our master barbers are artists, dedicated to the precision and detail that defines a true gentleman.
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
  const [activeCategory, setActiveCategory] = useState<'All' | 'Hair' | 'Beard' | 'Grooming' | 'Premium'>('All');
  
  const filteredServices = activeCategory === 'All' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="py-16 md:py-24 px-5 md:px-6 bg-secondary-bg">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Our Services" subtitle="Expertise" />
        
        {/* Filter - scrollable on mobile */}
        <div className="flex flex-wrap gap-3 mb-10 md:mb-12">
          {['All', 'Hair', 'Beard', 'Grooming', 'Premium'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
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
          {filteredServices.length > 0 ? (
            filteredServices.map((service, idx) => (
              <Link to={`/services/${service.title.toLowerCase().replace(/\\s+/g, '-')}`} key={service.title} className="block">
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative aspect-square overflow-hidden rounded-xl bg-primary-bg-bg"
                >
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    style={{ filter: 'contrast(1.15) brightness(1.05) saturate(1.1)' }}
                    referrerPolicy="no-referrer"
                  />
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
              <p className="text-muted-text text-xs uppercase tracking-widest">No services found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const ProductsMerch = () => (
  <section id="products" className="py-16 md:py-24 px-5 md:px-6 bg-primary-bg-bg">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        {/* Products */}
        <div>
          <SectionHeading title="Apothecary" subtitle="Premium Products" />
          <div className="grid grid-cols-1 gap-8 md:gap-12">
            {PRODUCTS.length > 0 ? (
              PRODUCTS.map((product) => (
                <div key={product.name} className="flex gap-5 md:gap-8 items-center group">
                  <div className="w-20 h-20 md:w-32 md:h-32 flex-shrink-0 overflow-hidden bg-secondary-bg rounded-lg">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" style={{ filter: 'contrast(1.12) brightness(1.06) saturate(1.1)' }} referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 border-b border-white/10 border-solid pb-4">
                    <div className="flex justify-between items-end mb-2">
                      <h4 className="text-lg md:text-2xl font-display uppercase">{product.name}</h4>
                      <span className="text-base md:text-lg font-display">{product.price}</span>
                    </div>
                    <button className="text-xs uppercase tracking-widest font-bold flex items-center gap-2 hover:gap-4 transition-all">
                      Add to Cart <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-text text-xs uppercase tracking-widest py-8">Our apothecary is currently being restocked.</p>
            )}
          </div>
        </div>

        {/* Merchandise */}
        <div>
          <SectionHeading title="Dry Goods" subtitle="Merchandise" />
          <div className="grid grid-cols-1 gap-8 md:gap-12">
            {MERCHANDISE.length > 0 ? (
              MERCHANDISE.map((item) => (
                <div key={item.name} className="flex gap-5 md:gap-8 items-center group">
                  <div className="w-20 h-20 md:w-32 md:h-32 flex-shrink-0 overflow-hidden bg-secondary-bg rounded-lg">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" style={{ filter: 'contrast(1.12) brightness(1.06) saturate(1.1)' }} referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 border-b border-white/10 border-solid pb-4">
                    <div className="flex justify-between items-end mb-2">
                      <h4 className="text-lg md:text-2xl font-display uppercase">{item.name}</h4>
                      <span className="text-base md:text-lg font-display">{item.price}</span>
                    </div>
                    <button className="text-xs uppercase tracking-widest font-bold flex items-center gap-2 hover:gap-4 transition-all">
                      Add to Cart <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-text text-xs uppercase tracking-widest py-8">Merchandise is currently unavailable.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const RateCard = () => (
  <section id="rate-card" className="py-16 md:py-24 px-5 md:px-6 bg-primary-bg text-heading-text">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12 md:mb-16">
        <p className="text-xs uppercase tracking-[0.4em] text-body-text mb-4">Investment</p>
        <h2 className="text-5xl md:text-8xl font-display uppercase">Rate Card</h2>
      </div>
      
      <div className="space-y-8">
        {[
          { category: 'Hair', items: [{ n: 'Executive Cut', p: '$65' }, { n: 'Clipper Cut', p: '$45' }, { n: 'Grey Blending', p: '$45' }] },
          { category: 'Beard', items: [{ n: 'Signature Trim', p: '$40' }, { n: 'Hot Razor Shave', p: '$55' }, { n: 'Beard Conditioning', p: '$25' }] },
          { category: 'Combos', items: [{ n: 'The Vanguard', p: '$120' }, { n: 'Cut & Shave', p: '$100' }] },
        ].map((group) => (
          <div key={group.category} className="space-y-4">
            <h5 className="text-xs uppercase tracking-widest text-body-text border-b border-white/10 border-solid pb-2">{group.category}</h5>
            {group.items.map((item) => (
              <div key={item.n} className="flex justify-between items-end group cursor-default">
                <span className="text-lg md:text-2xl uppercase tracking-wide group-hover:translate-x-2 transition-transform font-display">{item.n}</span>
                <div className="flex-1 border-b border-dashed border-white/10 mx-4 mb-2 border-solid" />
                <span className="text-lg md:text-2xl font-display">{item.p}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-12 md:mt-16 text-center">
        <p className="text-xs text-body-text uppercase tracking-widest mb-8">All services include a complimentary beverage and consultation.</p>
        <button className="bg-primary-bg-bg text-heading-text px-8 md:px-12 py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-white/5 transition-colors w-full md:w-auto">
          Download PDF Menu
        </button>
      </div>
    </div>
  </section>
);

const ARCHIVE_IMAGES = [
  'https://images.pexels.com/photos/1319459/pexels-photo-1319459.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2080006/pexels-photo-2080006.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2040050/pexels-photo-2040050.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1570806/pexels-photo-1570806.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/668196/pexels-photo-668196.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg?auto=compress&cs=tinysrgb&w=800',
];

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

const Gallery = () => {
  const navigate = useNavigate();
  const [flashing, setFlashing] = useState(false);

  const handleGalleryNav = () => {
    setFlashing(true);
    setTimeout(() => navigate('/gallery'), 340);
  };

  return (
    <section id="gallery" className="bg-[#0b0a08] relative">
      <GalleryFlash active={flashing} />
      <ImageAutoSlider
        images={ARCHIVE_IMAGES}
        title="The Archive"
        subtitle="Visuals"
        speed={38}
        onImageClick={handleGalleryNav}
      />
    </section>
  );
};

import { FeatureSteps } from '../components/ui/feature-section';

const MEDIA_FEATURES = [
  { 
    step: 'Oct 12, 2025', 
    title: 'New London Flagship',
    content: 'Vanguard opens its most ambitious location yet on Savile Row, bridging the gap between traditional tailoring and modern grooming.', 
    image: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1200' 
  },
  { 
    step: 'Sep 05, 2025',
    title: 'The Evolution of Craft',
    content: 'A deep dive into how our master barbers are evolving centuries-old techniques for the 21st-century gentleman.',
    image: 'https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  { 
    step: 'Aug 20, 2025',
    title: 'Partnership with Baxter',
    content: 'Vanguard is proud to announce an exclusive partnership with Baxter of California, bringing luxury apothecary to all locations.',
    image: 'https://images.pexels.com/photos/4587635/pexels-photo-4587635.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
];

const MediaCenter = () => {
  return (
    <section className="py-24 bg-secondary-bg">
      <FeatureSteps 
        features={MEDIA_FEATURES}
        title="Media Center"
        autoPlayInterval={5000}
        imageHeight="h-[600px]"
      />
    </section>
  );
};

const FranchiseForm = () => (
  <section id="franchise" className="py-16 md:py-24 px-5 md:px-6 bg-primary-bg-bg">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
      <div>
        <SectionHeading title="Join the Legacy" subtitle="Franchise" />
        <p className="text-base md:text-lg text-body-text leading-relaxed mb-8 font-sans">
          We are looking for partners who share our passion for excellence and tradition. Bring the Vanguard experience to your city.
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-xs uppercase tracking-widest font-bold">
            <Award size={20} /> Proven Business Model
          </div>
          <div className="flex items-center gap-4 text-xs uppercase tracking-widest font-bold">
            <Scissors size={20} /> Master Barber Training
          </div>
          <div className="flex items-center gap-4 text-xs uppercase tracking-widest font-bold">
            <Star size={20} /> Global Brand Recognition
          </div>
        </div>
      </div>
      
      <form className="space-y-5 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold">Name</label>
            <input type="text" className="w-full bg-transparent border border-primary border-solid p-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all font-sans" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold">Email</label>
            <input type="email" className="w-full bg-transparent border border-primary border-solid p-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all font-sans" placeholder="john@example.com" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold">City</label>
            <input type="text" className="w-full bg-transparent border border-primary border-solid p-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all font-sans" />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold">State</label>
            <input type="text" className="w-full bg-transparent border border-primary border-solid p-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all font-sans" />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold">Country</label>
            <input type="text" className="w-full bg-transparent border border-primary border-solid p-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all font-sans" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold">Message</label>
          <textarea rows={4} className="w-full bg-transparent border border-primary border-solid p-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all font-sans" placeholder="Tell us about your vision..." />
        </div>
        <button className="bg-primary-bg text-heading-text w-full py-5 text-xs uppercase tracking-[0.3em] font-bold hover:bg-neutral-800 transition-colors">
          Submit Enquiry
        </button>
      </form>
    </div>
  </section>
);

const ContactUs = () => (
  <section id="contact" className="py-16 md:py-24 px-5 md:px-6 bg-secondary-bg">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
      <div className="space-y-8 md:space-y-12">
        <SectionHeading title="Get in Touch" subtitle="Contact" />
        <div className="space-y-6 md:space-y-8">
          <div className="flex gap-5"><MapPin size={20} className="text-heading-text shrink-0 mt-1" /><div><h5 className="text-xs uppercase tracking-widest font-bold mb-1">Location</h5><p className="text-body-text font-sans text-sm">123 Savile Row, Mayfair<br />London, W1S 3PR</p></div></div>
          <div className="flex gap-5"><Phone size={20} className="text-heading-text shrink-0 mt-1" /><div><h5 className="text-xs uppercase tracking-widest font-bold mb-1">Phone</h5><p className="text-body-text font-sans text-sm">+44 (0) 20 7123 4567</p></div></div>
          <div className="flex gap-5"><Mail size={20} className="text-heading-text shrink-0 mt-1" /><div><h5 className="text-xs uppercase tracking-widest font-bold mb-1">Email</h5><p className="text-body-text font-sans text-sm">appointments@vanguard.com</p></div></div>
        </div>
        <div className="flex gap-4">
          <a href="#" className="p-2.5 border border-white/10 border-solid hover:border-primary transition-colors"><Instagram size={18} /></a>
          <a href="#" className="p-2.5 border border-white/10 border-solid hover:border-primary transition-colors"><Facebook size={18} /></a>
          <a href="#" className="p-2.5 border border-white/10 border-solid hover:border-primary transition-colors"><Twitter size={18} /></a>
        </div>
      </div>
      <form className="bg-primary-bg-bg p-6 md:p-12 space-y-5 shadow-2xl rounded-xl" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2"><label className="text-xs uppercase tracking-widest font-bold">Name</label><input type="text" className="w-full bg-transparent border border-primary border-solid p-3 md:p-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all font-sans" /></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-2"><label className="text-xs uppercase tracking-widest font-bold">Email</label><input type="email" className="w-full bg-transparent border border-primary border-solid p-3 md:p-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all font-sans" /></div>
          <div className="space-y-2"><label className="text-xs uppercase tracking-widest font-bold">Phone</label><input type="tel" className="w-full bg-transparent border border-primary border-solid p-3 md:p-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all font-sans" /></div>
        </div>
        <div className="space-y-2"><label className="text-xs uppercase tracking-widest font-bold">Message</label><textarea rows={4} className="w-full bg-transparent border border-primary border-solid p-3 md:p-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all font-sans" /></div>
        <button className="bg-primary-bg text-heading-text w-full py-4 md:py-5 text-xs uppercase tracking-[0.3em] font-bold hover:bg-neutral-800 transition-colors">
          Send Message
        </button>
      </form>
    </div>
  </section>
);




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
      <FranchiseForm />
      <ContactUs />
      </div>
    </div>
  );
}
