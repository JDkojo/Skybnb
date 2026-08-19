import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Navigation } from 'lucide-react';
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
    <div className="relative w-full h-[calc(100vh-220px)] min-h-[500px] rounded-3xl overflow-hidden border border-neutral-200 dark:border-[#1E3557] bg-[#EAE6DF] dark:bg-[#070D18]">
      {/* Map visual canvas with styled Ghana cartography */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#EAE6DF] via-[#E4DDD3] to-[#D5CDC1] dark:from-[#070D18] dark:via-[#0E1E38] dark:to-[#091322] overflow-hidden">
        {/* Subtle Ghana region coordinate grid */}
        <div 
          className="w-full h-full opacity-20 dark:opacity-10"
          style={{
            backgroundImage: `radial-gradient(#C5A059 1.5px, transparent 1.5px), radial-gradient(#C5A059 1.5px, #f0f4f8 1.5px)`,
            backgroundSize: '48px 48px',
            backgroundPosition: '0 0, 24px 24px'
          }}
        />

        {/* Map Header Status badge */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-[#0F1E33]/95 backdrop-blur-md shadow-md text-xs font-semibold text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-[#1E3557]">
          <Navigation className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Interactive Map · {listings.length} Stays Across Ghana</span>
        </div>

        {/* Interactive Stays Pins */}
        <div className="absolute inset-0 p-8 flex flex-wrap items-center justify-around gap-12 overflow-auto">
          {listings.map((listing, idx) => {
            const isSelected = selectedListing?.id === listing.id;
            // Generate simulated offset positions based on coordinates
            const posX = 12 + ((Math.abs(listing.longitude * 15 + idx * 27)) % 74);
            const posY = 15 + ((Math.abs(listing.latitude * 11 + idx * 21)) % 65);

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
                    ? 'bg-[#C5A059] text-[#0E1E38] scale-110 z-30 ring-4 ring-[#C5A059]/40'
                    : 'bg-white dark:bg-[#0F1E33] text-neutral-900 dark:text-neutral-100 hover:scale-105 z-10 border border-neutral-300 dark:border-[#1E3557]'
                }`}
              >
                <MapPin className={`w-3 h-3 ${isSelected ? 'text-[#0E1E38]' : 'text-[#C5A059]'}`} />
                <span>GH₵ {listing.price_per_night.toLocaleString()}</span>
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
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-[340px] sm:max-w-[420px] p-3.5 rounded-3xl bg-white/95 dark:bg-[#0F1E33]/95 backdrop-blur-md shadow-2xl border border-neutral-200 dark:border-[#1E3557]"
          >
            <div className="flex gap-3.5 items-center">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 bg-neutral-100 dark:bg-neutral-800">
                <img
                  src={selectedListing.photos[0]}
                  alt={selectedListing.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-wider">
                    {selectedListing.type}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-[#C5A059]">
                    <Star className="w-3 h-3 fill-[#C5A059] text-[#C5A059]" />
                    <span>{selectedListing.rating.toFixed(2)}</span>
                  </div>
                </div>

                <h4 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 truncate mt-0.5">
                  {selectedListing.title}
                </h4>

                <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                  {selectedListing.location}
                </p>

                <div className="mt-2.5 flex items-center justify-between">
                  <div className="text-xs sm:text-sm font-black text-neutral-900 dark:text-neutral-100">
                    GH₵ {selectedListing.price_per_night.toLocaleString()}{' '}
                    <span className="text-[10px] font-normal text-neutral-500">/ night</span>
                  </div>
                  <Link
                    to={`/listing/${selectedListing.id}`}
                    className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#C5A059] text-[#0E1E38] hover:bg-[#DFB24A] transition-colors shadow-sm"
                  >
                    View Stay
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
