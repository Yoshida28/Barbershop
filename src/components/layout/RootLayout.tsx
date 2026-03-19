import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, Instagram, Facebook, Twitter } from 'lucide-react';
import { BGPattern } from '../ui/bg-pattern';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Products', href: '/products' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';
  
  // On home, it's transparent at top. On other pages, it should be dark or glass at top.
  const headerBg = isScrolled 
    ? 'bg-black/80 backdrop-blur-md py-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-b border-white/10' 
    : (isHome ? 'bg-transparent py-8' : 'bg-primary/95 py-6 border-b border-white/10');

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${headerBg}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="text-xl md:text-2xl font-display tracking-[0.3em] text-white hover:text-neutral-300 transition-colors">
          VANGUARD
        </Link>
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.label} 
              to={link.href} 
              className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-colors ${location.pathname === link.href ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button className="md:hidden p-2 text-white">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};

const Footer = () => (
  <footer className="py-16 px-6 bg-primary text-white border-t border-neutral-800 relative z-20">
    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 items-center text-center md:text-left">
      <div>
        <h3 className="text-2xl tracking-[0.3em] font-display mb-4">VANGUARD</h3>
        <p className="text-neutral-400 text-sm max-w-xs mx-auto md:mx-0">
          The sanctuary for the modern gentleman. Elevating the craft of grooming.
        </p>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex gap-6 mb-6">
          <a href="#" className="p-3 border border-neutral-800 rounded-full hover:bg-white hover:text-primary transition-all duration-300"><Instagram size={20} /></a>
          <a href="#" className="p-3 border border-neutral-800 rounded-full hover:bg-white hover:text-primary transition-all duration-300"><Facebook size={20} /></a>
          <a href="#" className="p-3 border border-neutral-800 rounded-full hover:bg-white hover:text-primary transition-all duration-300"><Twitter size={20} /></a>
        </div>
        <p className="text-[10px] uppercase tracking-[0.4em] opacity-50">© 2026 Vanguard Grooming.</p>
      </div>
      <div className="flex flex-col md:items-end gap-4">
        <Link to="/contact" className="text-[10px] uppercase tracking-widest hover:text-white text-neutral-400 transition-colors">Privacy Policy</Link>
        <Link to="/contact" className="text-[10px] uppercase tracking-widest hover:text-white text-neutral-400 transition-colors">Terms of Service</Link>
        <Link to="/contact" className="text-[10px] uppercase tracking-widest hover:text-white text-neutral-400 transition-colors">Career Opportunities</Link>
      </div>
    </div>
  </footer>
);

export const RootLayout = () => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen selection:bg-white selection:text-primary flex flex-col bg-background relative overflow-x-hidden text-neutral-800">
      {/* Global Background Pattern for non-home pages */}
      {location.pathname !== '/' && (
        <React.Fragment>
          <div className="fixed inset-0 bg-secondary z-[-20]" />
          <BGPattern variant="dots" mask="fade-edges" fill="#d1d1d1" className="opacity-40 fixed" />
        </React.Fragment>
      )}

      <Header />
      
      <main className="flex-grow flex flex-col pt-[104px] [&>*:first-child]:mt-[-104px]">
        {/* The negative margin top pulls the first hero section under the transparent/dark header */}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
