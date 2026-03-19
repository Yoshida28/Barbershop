import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, Instagram, Facebook, Twitter, Scissors } from 'lucide-react';
import { BGPattern } from '../ui/bg-pattern';
import { Footer } from '../ui/modem-animated-footer';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Products', href: '/products' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Locations', href: '/locations' },
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
    : (isHome ? 'bg-transparent py-8' : 'bg-primary-bg/95 py-6 border-b border-white/10');

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${headerBg}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="text-xl md:text-2xl font-display tracking-[0.3em] text-heading-text hover:text-neutral-300 transition-colors">
          VANGUARD
        </Link>
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.label} 
              to={link.href} 
              className={`text-xs uppercase tracking-[0.2em] font-bold transition-colors ${location.pathname === link.href ? 'text-heading-text' : 'text-muted-text hover:text-heading-text'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button className="md:hidden p-2 text-heading-text">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};

const socialLinks = [
  {
    icon: <Instagram className="w-6 h-6" />,
    href: "https://instagram.com",
    label: "Instagram",
  },
  {
    icon: <Facebook className="w-6 h-6" />,
    href: "https://facebook.com",
    label: "Facebook",
  },
  {
    icon: <Twitter className="w-6 h-6" />,
    href: "https://twitter.com",
    label: "Twitter",
  },
];

const footerNavLinks = [
  { label: "Privacy Policy", href: "/contact" },
  { label: "Terms of Service", href: "/contact" },
  { label: "Career Opportunities", href: "/contact" },
];

export const RootLayout = () => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen selection:bg-primary-bg-bg selection:text-heading-text flex flex-col bg-background relative overflow-x-hidden text-neutral-800">
      {/* Global Background Pattern for non-home pages */}
      {location.pathname !== '/' && (
        <React.Fragment>
          <div className="fixed inset-0 bg-secondary-bg z-[-20]" />
          <BGPattern variant="dots" mask="fade-edges" fill="#d1d1d1" className="opacity-40 fixed" />
        </React.Fragment>
      )}

      <Header />
      
      <main className="flex-grow flex flex-col pt-[104px] [&>*:first-child]:mt-[-104px]">
        {/* The negative margin top pulls the first hero section under the transparent/dark header */}
        <Outlet />
      </main>

      <Footer 
        brandName="VANGUARD"
        brandDescription="The sanctuary for the modern gentleman. Elevating the craft of grooming globally."
        socialLinks={socialLinks}
        navLinks={footerNavLinks}
        creatorName="Vanguard Studios"
        creatorUrl="https://vanguardgrooming.com"
        brandIcon={<Scissors className="w-8 sm:w-10 md:w-14 h-8 sm:h-10 md:h-14 text-background drop-shadow-lg" />}
      />
    </div>
  );
};
