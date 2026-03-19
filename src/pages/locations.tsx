import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Clock, Mail, ArrowRight } from 'lucide-react';
import { WorldMap, LocationDetail } from '../components/ui/map';
import { SmokeBackground } from '../components/ui/spooky-smoke-animation';
import { LocationMap } from '../components/ui/location-map';
import { ThreeDPhotoCarousel } from '../components/ui/3d-carousel';

// Extend LocationDetail for coordinates string
interface ExtendedLocationDetail extends LocationDetail {
  coordinates: string;
  gallery: string[];
}

const STORES: ExtendedLocationDetail[] = [
  {
    id: "london",
    label: "London",
    lat: 51.5074,
    lng: -0.1278,
    coordinates: "51.5074° N, 0.1278° W",
    address: "123 Savile Row, Mayfair, London, W1S 3PR",
    phone: "+44 (0) 20 7123 4567",
    hours: "Mon-Sat: 9am - 8pm, Sun: 10am - 6pm",
    image: "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2080006/pexels-photo-2080006.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1319459/pexels-photo-1319459.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2040050/pexels-photo-2040050.jpeg?auto=compress&cs=tinysrgb&w=800"
    ]
  },
  {
    id: "new-york",
    label: "New York",
    lat: 40.7128,
    lng: -74.0060,
    coordinates: "40.7128° N, 74.0060° W",
    address: "West 12th Street, West Village, NY 10014",
    phone: "+1 212-555-0199",
    hours: "Mon-Sun: 8am - 9pm",
    image: "https://images.pexels.com/photos/3389531/pexels-photo-3389531.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/3389531/pexels-photo-3389531.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1570806/pexels-photo-1570806.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/4587635/pexels-photo-4587635.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1319459/pexels-photo-1319459.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg?auto=compress&cs=tinysrgb&w=800"
    ]
  },
  {
    id: "tokyo",
    label: "Tokyo",
    lat: 35.6762,
    lng: 139.6503,
    coordinates: "35.6762° N, 139.6503° E",
    address: "Ginza 6-chome, Chuo City, Tokyo 104-0061",
    phone: "+81 3-5555-0199",
    hours: "Mon-Sun: 10am - 9pm",
    image: "https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1570806/pexels-photo-1570806.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2080006/pexels-photo-2080006.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/4465121/pexels-photo-4465121.jpeg?auto=compress&cs=tinysrgb&w=800"
    ]
  },
  {
    id: "dubai",
    label: "Dubai",
    lat: 25.2048,
    lng: 55.2708,
    coordinates: "25.2048° N, 55.2708° E",
    address: "Financial Center Rd, Downtown Dubai",
    phone: "+971 4 555 0199",
    hours: "Mon-Sun: 10am - 10pm",
    image: "https://images.pexels.com/photos/2080006/pexels-photo-2080006.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/2080006/pexels-photo-2080006.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/4587635/pexels-photo-4587635.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1319459/pexels-photo-1319459.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=800"
    ]
  }
];

// Generate flight paths
const FLIGHT_PATHS = [
  { start: STORES[0], end: STORES[1] },
  { start: STORES[1], end: STORES[0] },
  { start: STORES[0], end: STORES[3] },
  { start: STORES[3], end: STORES[2] },
];

export default function Locations() {
  const [selectedStore, setSelectedStore] = useState<ExtendedLocationDetail | null>(STORES[0]);

  const handleLocationClick = (location: LocationDetail) => {
    const fullStore = STORES.find(s => s.id === location.id);
    if(fullStore) setSelectedStore(fullStore);
  };

  return (
    <div className="min-h-screen selection:bg-primary-bg selection:text-heading-text relative bg-primary-bg-bg font-sans pb-24">
      {/* Universal Background */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -10 }}>
        <SmokeBackground smokeColor="#1a1a1a" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-32 relative z-10">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.4em] text-body-text mb-4">Global Network</p>
          <h1 className="text-5xl md:text-7xl leading-none font-display uppercase tracking-tight text-heading-text mb-6">
            Our Locations
          </h1>
          <p className="text-lg text-body-text font-light max-w-2xl mx-auto">
            Vanguard operates exclusive grooming sanctuaries across the globe. Select a location on the map to view detailed store information and book an appointment.
          </p>
        </div>

        {/* The World Map */}
        <div className="mb-16 rounded-sm border border-white/10 shadow-lg p-4 bg-black/40 backdrop-blur-md relative">
          <WorldMap
            dots={FLIGHT_PATHS}
            lineColor="#ffffff" 
            onLocationClick={handleLocationClick}
          />

          {/* Location Map Overlay */}
          <div className="absolute top-8 right-8 z-20 hidden lg:block">
            <AnimatePresence mode="wait">
              {selectedStore && (
                <motion.div
                  key={selectedStore.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <LocationMap 
                    location={selectedStore.label} 
                    coordinates={selectedStore.coordinates} 
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Selected Store Details */}
        <div className="relative border border-white/10 rounded-sm bg-black/60 backdrop-blur-xl overflow-hidden min-h-[400px]">
          <AnimatePresence mode="wait">
            {selectedStore && (
              <motion.div
                key={selectedStore.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid md:grid-cols-2 h-full"
              >
                <div className="p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="p-3 bg-white/5 rounded-full"><MapPin size={24} className="text-heading-text" /></span>
                    <h2 className="text-4xl font-display uppercase text-heading-text">{selectedStore.label}</h2>
                  </div>
                  
                  <div className="space-y-8 mt-8 border-l border-white/10 pl-6">
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-muted-text font-bold mb-2">Address</h4>
                      <p className="text-lg font-light text-body-text">{selectedStore.address}</p>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-muted-text font-bold mb-2 flex items-center gap-2"><Clock size={14}/> Hours</h4>
                      <p className="text-lg font-light text-body-text">{selectedStore.hours}</p>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-muted-text font-bold mb-2 flex items-center gap-2"><Phone size={14}/> Contact</h4>
                      <p className="text-lg font-light text-body-text">{selectedStore.phone}</p>
                    </div>
                  </div>

                  <button className="mt-12 bg-white text-black px-8 py-4 text-xs uppercase font-bold tracking-[0.2em] hover:bg-neutral-300 transition-colors inline-flex items-center justify-center gap-4 w-fit">
                    Book Appointment <ArrowRight size={16} />
                  </button>
                </div>
                
                <div className="relative hidden md:flex items-center justify-center bg-black/40 border-l border-white/5 py-8">
                  <div className="w-full">
                    <ThreeDPhotoCarousel cards={selectedStore.gallery} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!selectedStore && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-sm uppercase tracking-widest text-muted-text">Select a location on the map.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
