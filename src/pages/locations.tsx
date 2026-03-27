import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import { WorldMap, LocationDetail } from '../components/ui/map';
import { SmokeBackground } from '../components/ui/spooky-smoke-animation';
import { LocationMap } from '../components/ui/location-map';
import { ThreeDPhotoCarousel } from '../components/ui/3d-carousel';
import { supabase } from '../lib/supabase';
import type { Location } from '../lib/supabase';
import { Loader } from '../components/ui/loader';

const FALLBACK_GALLERY = [
  'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2080006/pexels-photo-2080006.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1319459/pexels-photo-1319459.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2040050/pexels-photo-2040050.jpeg?auto=compress&cs=tinysrgb&w=800',
];

interface ExtendedLocation extends Location {
  coordinates: string;
  gallery: string[];
}

function toExtended(loc: Location): ExtendedLocation {
  const lat = loc.lat ?? 0;
  const lng = loc.lng ?? 0;
  const latDir = lat >= 0 ? 'N' : 'S';
  const lngDir = lng >= 0 ? 'E' : 'W';
  const coordinates = `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lng).toFixed(4)}° ${lngDir}`;
  const gallery = loc.image_url ? [loc.image_url, ...FALLBACK_GALLERY.slice(0, 4)] : FALLBACK_GALLERY;
  return { ...loc, coordinates, gallery };
}

function toLocationDetail(loc: Location): LocationDetail {
  return {
    id: loc.id,
    label: loc.name,
    lat: loc.lat ?? 0,
    lng: loc.lng ?? 0,
    address: loc.address ?? undefined,
    phone: loc.phone ?? undefined,
    hours: loc.hours ?? undefined,
    image: loc.image_url ?? undefined,
  };
}

export default function Locations() {
  const [locations, setLocations] = useState<ExtendedLocation[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<ExtendedLocation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('locations')
      .select('*')
      .order('sort_order')
      .then(({ data }) => {
        const extended = (data || []).map(toExtended);
        setLocations(extended);
        if (extended.length > 0) setSelectedLocation(extended[0]);
        setLoading(false);
      });
  }, []);

  // Generate flight path dots between consecutive location pairs
  const flightPaths = locations.length >= 2
    ? locations.slice(0, -1).map((loc, i) => ({
        start: toLocationDetail(loc),
        end: toLocationDetail(locations[i + 1]),
      }))
    : [];

  const handleLocationClick = (location: LocationDetail) => {
    const found = locations.find(l => l.id === location.id);
    if (found) setSelectedLocation(found);
  };

  return (
    <div className="min-h-screen selection:bg-primary-bg selection:text-heading-text relative bg-primary-bg-bg font-sans pb-24">
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
            TheBarberShop operates exclusive grooming sanctuaries across the globe. Select a location on the map to view detailed store information and book an appointment.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader />
          </div>
        ) : locations.length === 0 ? (
          <div className="flex items-center justify-center py-32">
            <p className="text-muted-text text-xs uppercase tracking-widest">No locations found. Add locations via the admin panel.</p>
          </div>
        ) : (
          <>
            {/* World Map */}
            <div className="mb-16 rounded-sm border border-white/10 shadow-lg p-4 bg-black/40 backdrop-blur-md relative">
              <WorldMap
                dots={flightPaths}
                lineColor="#ffffff"
                onLocationClick={handleLocationClick}
              />

              {/* Location Map Overlay */}
              <div className="absolute top-8 right-8 z-20 hidden lg:block">
                <AnimatePresence mode="wait">
                  {selectedLocation && (
                    <motion.div
                      key={selectedLocation.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <LocationMap
                        location={selectedLocation.name}
                        coordinates={selectedLocation.coordinates}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Location Tabs */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {locations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  className={`px-5 py-2 text-xs uppercase tracking-widest font-bold rounded-full transition-all ${
                    selectedLocation?.id === loc.id
                      ? 'bg-white text-black'
                      : 'bg-white/5 text-body-text hover:bg-white/10'
                  }`}
                >
                  {loc.name}
                </button>
              ))}
            </div>

            {/* Selected Location Details */}
            <div className="relative border border-white/10 rounded-sm bg-black/60 backdrop-blur-xl overflow-hidden min-h-[400px]">
              <AnimatePresence mode="wait">
                {selectedLocation && (
                  <motion.div
                    key={selectedLocation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="grid md:grid-cols-2 h-full"
                  >
                    <div className="p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="p-3 bg-white/5 rounded-full"><MapPin size={24} className="text-heading-text" /></span>
                        <h2 className="text-4xl font-display uppercase text-heading-text">{selectedLocation.name}</h2>
                      </div>

                      <div className="space-y-8 mt-8 border-l border-white/10 pl-6">
                        {selectedLocation.address && (
                          <div>
                            <h4 className="text-xs uppercase tracking-widest text-muted-text font-bold mb-2">Address</h4>
                            <p className="text-lg font-light text-body-text">{selectedLocation.address}</p>
                          </div>
                        )}
                        {(selectedLocation.country || selectedLocation.state || selectedLocation.city) && (
                          <div>
                            <h4 className="text-xs uppercase tracking-widest text-muted-text font-bold mb-2">Location</h4>
                            <p className="text-lg font-light text-body-text">
                              {[selectedLocation.city, selectedLocation.state, selectedLocation.country].filter(Boolean).join(', ')}
                            </p>
                          </div>
                        )}
                        {selectedLocation.hours && (
                          <div>
                            <h4 className="text-xs uppercase tracking-widest text-muted-text font-bold mb-2 flex items-center gap-2"><Clock size={14} /> Hours</h4>
                            <p className="text-lg font-light text-body-text">{selectedLocation.hours}</p>
                          </div>
                        )}
                        {selectedLocation.phone && (
                          <div>
                            <h4 className="text-xs uppercase tracking-widest text-muted-text font-bold mb-2 flex items-center gap-2"><Phone size={14} /> Contact</h4>
                            <p className="text-lg font-light text-body-text">{selectedLocation.phone}</p>
                          </div>
                        )}
                      </div>

                      <button className="mt-12 bg-white text-black px-8 py-4 text-xs uppercase font-bold tracking-[0.2em] hover:bg-neutral-300 transition-colors inline-flex items-center justify-center gap-4 w-fit">
                        Book Appointment <ArrowRight size={16} />
                      </button>
                    </div>

                    <div className="relative hidden md:flex items-center justify-center bg-black/40 border-l border-white/5 py-8">
                      <div className="w-full">
                        <ThreeDPhotoCarousel cards={selectedLocation.gallery} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!selectedLocation && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-sm uppercase tracking-widest text-muted-text">Select a location on the map.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
