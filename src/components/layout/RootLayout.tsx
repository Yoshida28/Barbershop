import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, Twitter, Scissors } from 'lucide-react';
import { BGPattern } from '../ui/bg-pattern';
import { Footer } from '../ui/modem-animated-footer';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Shop', href: '/products' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Locations', href: '/locations' },
  { label: 'Career', href: '/contact' },
  { label: 'Franchise', href: '/contact' },
  { label: 'Contact', href: '/contact' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isHome = location.pathname === '/';
  const headerBg = isScrolled
    ? 'bg-black/85 backdrop-blur-md py-3 shadow-[0_4px_30px_rgba(0,0,0,0.2)] border-b border-white/10'
    : (isHome ? 'bg-transparent py-6' : 'bg-[#0b0a08]/95 py-5 border-b border-white/10');

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${headerBg}`}>
        <div className="max-w-[1600px] mx-auto px-5 md:px-12 flex justify-between items-center">
          <Link
            to="/"
            className="text-base md:text-xl xl:text-2xl font-display tracking-[0.2em] md:tracking-[0.3em] text-[#c4a15a] hover:text-[#d4b56a] transition-colors shrink-0 mr-4"
          >
            THEBARBERSHOP
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex gap-4 xl:gap-6 flex-wrap justify-end">
            {navLinks.map(link => (
              <Link
                key={link.label}
                to={link.href}
                className={`text-[10px] xl:text-xs uppercase tracking-[0.15em] xl:tracking-[0.2em] font-bold transition-colors whitespace-nowrap ${
                  location.pathname === link.href
                    ? 'text-[#c4a15a]'
                    : 'text-[#7f6738] hover:text-[#c4a15a]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="lg:hidden p-2 text-[#c4a15a] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[75vw] max-w-xs z-50 bg-[#0f0d09] border-l border-[#c4a15a]/15 flex flex-col py-24 px-8 md:hidden transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <Link
          to="/"
          className="text-lg font-display tracking-[0.3em] text-[#c4a15a] mb-12"
        >
          THEBARBERSHOP
        </Link>
        <nav className="flex flex-col gap-6">
          {navLinks.map(link => (
            <Link
              key={link.label}
              to={link.href}
              className={`text-sm uppercase tracking-[0.2em] font-bold transition-colors border-b border-[#c4a15a]/10 pb-4 ${
                location.pathname === link.href
                  ? 'text-[#c4a15a]'
                  : 'text-[#a88a4e] hover:text-[#c4a15a]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex gap-4">
          <a href="https://instagram.com" className="p-2 border border-[#c4a15a]/20 text-[#c4a15a] hover:border-[#c4a15a]/60 transition-colors rounded-sm">
            <Instagram size={16} />
          </a>
          <a href="https://facebook.com" className="p-2 border border-[#c4a15a]/20 text-[#c4a15a] hover:border-[#c4a15a]/60 transition-colors rounded-sm">
            <Facebook size={16} />
          </a>
          <a href="https://twitter.com" className="p-2 border border-[#c4a15a]/20 text-[#c4a15a] hover:border-[#c4a15a]/60 transition-colors rounded-sm">
            <Twitter size={16} />
          </a>
        </div>
      </div>
    </>
  );
};

const socialLinks = [
  { icon: <Instagram className="w-6 h-6" />, href: "https://instagram.com", label: "Instagram" },
  { icon: <Facebook className="w-6 h-6" />, href: "https://facebook.com", label: "Facebook" },
  { icon: <Twitter className="w-6 h-6" />, href: "https://twitter.com", label: "Twitter" },
];

const footerNavLinks = [
  { label: "Privacy Policy", href: "/contact" },
  { label: "Terms of Service", href: "/contact" },
  { label: "Career Opportunities", href: "/contact" },
];

export const RootLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen selection:bg-[#18140f] selection:text-[#c4a15a] flex flex-col bg-[#0b0a08] relative overflow-x-hidden">
      {location.pathname !== '/' && (
        <React.Fragment>
          <div className="fixed inset-0 bg-[#18140f] z-[-20]" />
          <BGPattern variant="dots" mask="fade-edges" fill="#d1d1d1" className="opacity-40 fixed" />
        </React.Fragment>
      )}

      <Header />

      <main className="flex-grow flex flex-col pt-[80px] [&>*:first-child]:mt-[-80px]">
        <Outlet />
      </main>

      <Footer
        brandName="THEBARBERSHOP"
        brandDescription="The sanctuary for the modern gentleman. Elevating the craft of grooming globally."
        socialLinks={socialLinks}
        navLinks={footerNavLinks}
        creatorName="TheBarberShop Studio"
        creatorUrl="https://thebarbershop.com"
        brandIcon={<Scissors className="w-8 sm:w-10 md:w-14 h-8 sm:h-10 md:h-14 text-background drop-shadow-lg" />}
      />
    </div>
  );
};
