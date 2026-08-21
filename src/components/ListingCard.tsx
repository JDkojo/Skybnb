import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronLeft, ChevronRight, MapPin, Phone, MessageSquare, BadgeCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Listing } from '../types';
import { WishlistButton } from './WishlistButton';

interface ListingCardProps {
  listing: Listing;
  key?: React.Key;
}

export function ListingCard({ listing }: ListingCardProps) {
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);

  const photos = listing.photos && listing.photos.length > 0
    ? listing.photos
    : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'];

  const nextPhoto = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentPhotoIdx((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentPhotoIdx((prev) => (prev - 1 + photos.length) % photos.length);
  };

  // Helper for Purpose Badge Styling
  const getPurposeBadge = () => {
    switch (listing.purpose) {
      case 'sale':
        return { label: 'FOR SALE', bg: 'bg-amber-600 text-white' };
      case 'rent':
        return { label: 'FOR RENT', bg: 'bg-emerald-600 text-white' };
      case 'hostel':
        return { label: 'STUDENT HOSTEL', bg: 'bg-indigo-600 text-white' };
      case 'short_stay':
        return { label: 'HOTEL / SHORT STAY', bg: 'bg-sky-600 text-white' };
      default:
        if (listing.category === 'land') return { label: 'LAND FOR SALE', bg: 'bg-teal-600 text-white' };
        return { label: 'FEATURED', bg: 'bg-[#C5A059] text-[#0E1E38]' };
    }
  };

  const badge = getPurposeBadge();
  const displayPrice = listing.price || listing.price_per_night || 0;

  const getPriceCadence = () => {
    if (listing.price_type === 'total' || listing.purpose === 'sale') return 'Total Price';
    if (listing.price_type === 'month' || listing.purpose === 'rent') return '/ month';
    if (listing.price_type === 'year') return '/ year';
    if (listing.price_type === 'semester' || listing.purpose === 'hostel') return '/ semester';
    return '/ night';
  };

  return (
    <motion.div
      id={`listing-card-${listing.id}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col cursor-pointer"
    >
      {/* Image Carousel Container */}
      <div className="relative aspect-[20/18] w-full overflow-hidden rounded-[14px] sm:rounded-[18px] bg-neutral-100 dark:bg-[#0F1E33] border border-neutral-200/70 dark:border-[#1E3557]/80 shadow-sm group-hover:shadow-md transition-shadow">
        <Link to={`/listing/${listing.id}`} className="block w-full h-full">
          <img
            src={photos[currentPhotoIdx]}
            alt={listing.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Wishlist Button Overlay */}
        <div className="absolute top-1.5 right-1.5 sm:top-2.5 sm:right-2.5 z-10 scale-90 sm:scale-100">
          <WishlistButton listingId={listing.id} />
        </div>

        {/* Purpose Badge on Top Left */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 flex flex-col gap-1">
          <span className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[9px] sm:text-[10px] font-black tracking-wider uppercase shadow-md ${badge.bg}`}>
            {badge.label}
          </span>
          {listing.title_document && (
            <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[9px] font-semibold text-neutral-200 shadow-sm">
              {listing.title_document.split(' ')[0]} Verified
            </span>
          )}
        </div>

        {/* Carousel Prev/Next Arrows */}
        {photos.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              className="absolute left-1.5 top-1/2 -translate-y-1/2 p-1 sm:p-2 rounded-full bg-white/95 dark:bg-[#0A1422]/95 text-neutral-800 dark:text-[#E5C158] opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-all hover:scale-110 shadow-md z-10 touch-manipulation"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 stroke-[2.5]" />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 sm:p-2 rounded-full bg-white/95 dark:bg-[#0A1422]/95 text-neutral-800 dark:text-[#E5C158] opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-all hover:scale-110 shadow-md z-10 touch-manipulation"
              aria-label="Next photo"
            >
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 stroke-[2.5]" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-2 sm:bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10 pointer-events-none">
              {photos.slice(0, 5).map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentPhotoIdx
                      ? 'w-3 sm:w-4 bg-[#C5A059] shadow-sm'
                      : 'w-1 sm:w-1.5 bg-white/70 dark:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Info Section */}
      <Link to={`/listing/${listing.id}`} className="mt-2.5 sm:mt-3 flex flex-col">
        <div className="flex items-center justify-between gap-1 sm:gap-2">
          <h3 className="font-bold text-xs sm:text-[15px] text-neutral-900 dark:text-neutral-100 truncate flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
            <span className="truncate">{listing.location}</span>
          </h3>
          {listing.contact_name && (
            <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 shrink-0 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded">
              <BadgeCheck className="w-3 h-3" /> Direct
            </span>
          )}
        </div>

        <p className="text-[11px] sm:text-sm text-neutral-700 dark:text-neutral-300 font-semibold truncate mt-1">
          {listing.title}
        </p>

        {/* Specs Line: Bedrooms or Land Size */}
        <div className="text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 truncate flex items-center gap-1.5">
          {listing.category === 'land' ? (
            <span>📐 {listing.land_size || 'Demarcated Plot'}</span>
          ) : listing.bedrooms > 0 ? (
            <span>🛏️ {listing.bedrooms} bed{listing.bedrooms > 1 ? 's' : ''} · 🚿 {listing.bathrooms} bath{listing.bathrooms > 1 ? 's' : ''}</span>
          ) : (
            <span>🏢 {listing.type}</span>
          )}
          <span>·</span>
          <span className="truncate text-neutral-400">{listing.type}</span>
        </div>

        {/* Price & Cadence */}
        <div className="mt-1.5 flex items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-1">
            <span className="font-black text-xs sm:text-[15px] text-[#0E1E38] dark:text-[#E5C158]">
              GH₵ {displayPrice.toLocaleString()}
            </span>
            <span className="text-neutral-500 dark:text-neutral-400 text-[10px] sm:text-xs font-medium">
              {getPriceCadence()}
            </span>
          </div>

          {listing.is_negotiable && (
            <span className="text-[9px] sm:text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-tight">
              Negotiable
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
