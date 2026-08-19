import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Navigation, Layers } from 'lucide-react';
import { Listing } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ListingMapViewProps {
  listings: Listing[];
}

export function ListingMapView({ listings }: ListingMapViewProps) {
  const [selectedListing, setSelectedListing] = useState<Listing | null>(
    listings[0] || null
  );

  return (
    <div className="relative w-full h-[calc(100vh-220px)] min-h-[500px] rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-[#E5E9EC] dark:bg-[#1A1F26]">
      {/* Map visual canvas simulation with realistic styled cartography */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-sky-100/40 to-slate-300 dark:from-[#11161d] dark:via-[#161f2b] dark:to-[#0d1218] overflow-hidden">
        {/* Subtle decorative grid lines */}
        <div 
          className="w-full h-full opacity-30 dark:opacity-15"
          style={{
            backgroundImage: `radial-gradient(#0ea5e9 1.5px, transparent 1.5px), radial-gradient(#0ea5e9 1.5px, #f0f4f8 1.5px)`,
            backgroundSize: '48px 48px',
            backgroundPosition: '0 0, 24px 24px'
          }}
        />

        {/* Map Header Status badge */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-md text-xs font-semibold text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800">
          <Navigation className="w-3.5 h-3.5 text-[#0EA5E9]" />
          <span>Showing {listings.length} stays across the map</span>
        </div>

        {/* Interactive Stays Pins */}
        <div className="absolute inset-0 p-8 flex flex-wrap items-center justify-around gap-12 overflow-auto">
          {listings.map((listing, idx) => {
            const isSelected = selectedListing?.id === listing.id;
            // Generate simulated offset positions based on coordinates
            const posX = 15 + ((Math.abs(listing.longitude * 7.5 + idx * 23)) % 70);
            const posY = 15 + ((Math.abs(listing.latitude * 5.3 + idx * 19)) % 65);

            return (
              <button
                key={listing.id}
                id={`map-pin-${listing.id}`}
                onClick={() => setSelectedListing(listing)}
                style={{
                  position: 'absolute',
                  left: `${posX}%`,
                  top: `${posY}%`,
                }}
                className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 shadow-md ${
                  isSelected
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 scale-110 z-30 ring-4 ring-sky-500/30'
                    : 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:scale-105 z-10 border border-neutral-300 dark:border-neutral-700'
                }`}
              >
                <MapPin className="w-3 h-3 text-[#0EA5E9]" />
                <span>${listing.price_per_night}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating Selected Listing Card */}
      <AnimatePresence>
        {selectedListing && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-[340px] sm:max-w-[420px] p-3 rounded-2xl bg-white/95 dark:bg-[#1E1E1E]/95 backdrop-blur-md shadow-2xl border border-neutral-200 dark:border-neutral-800"
          >
            <div className="flex gap-3.5 items-center">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 bg-neutral-100 dark:bg-neutral-800">
                <img
                  src={selectedListing.photos[0]}
                  alt={selectedListing.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-semibold text-[#0EA5E9] uppercase tracking-wider">
                    {selectedListing.type}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-neutral-800 dark:text-neutral-200">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{selectedListing.rating.toFixed(2)}</span>
                  </div>
                </div>

                <h4 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 truncate mt-0.5">
                  {selectedListing.title}
                </h4>

                <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                  {selectedListing.location}
                </p>

                <div className="mt-2 flex items-center justify-between">
                  <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                    ${selectedListing.price_per_night}{' '}
                    <span className="text-xs font-normal text-neutral-500">/ night</span>
                  </div>
                  <Link
                    to={`/listing/${selectedListing.id}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0EA5E9] text-white hover:bg-sky-600 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
