import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
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

  return (
    <motion.div
      id={`listing-card-${listing.id}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col cursor-pointer"
    >
      {/* Image Carousel Container */}
      <div className="relative aspect-[20/19] w-full overflow-hidden rounded-[18px] bg-neutral-100 dark:bg-[#0F1E33] border border-neutral-200/70 dark:border-[#1E3557]/80 shadow-sm group-hover:shadow-md transition-shadow">
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
        <div className="absolute top-2.5 right-2.5 z-10">
          <WishlistButton listingId={listing.id} />
        </div>

        {/* Valpromark Superhost / Guest Favorite badge */}
        {listing.host_is_superhost && (
          <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#0A1422]/90 text-[#E5C158] backdrop-blur-md shadow-md border border-[#C5A059]/40 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#C5A059]" />
            <span>Valpromark Luxe</span>
          </div>
        )}

        {/* Carousel Prev/Next Arrows */}
        {photos.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/95 dark:bg-[#0A1422]/95 text-neutral-800 dark:text-[#E5C158] opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all hover:scale-110 shadow-md z-10 touch-manipulation"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/95 dark:bg-[#0A1422]/95 text-neutral-800 dark:text-[#E5C158] opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all hover:scale-110 shadow-md z-10 touch-manipulation"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10 pointer-events-none">
              {photos.slice(0, 5).map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentPhotoIdx
                      ? 'w-4 bg-[#C5A059] shadow-sm'
                      : 'w-1.5 bg-white/70 dark:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Info Section */}
      <Link to={`/listing/${listing.id}`} className="mt-3 flex flex-col">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-bold text-[15px] text-neutral-900 dark:text-neutral-100 truncate">
            {listing.location}
          </h3>
          <div className="flex items-center gap-1 text-[13px] font-bold text-neutral-900 dark:text-[#E5C158] shrink-0">
            <Star className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
            <span>{listing.rating.toFixed(2)}</span>
            <span className="text-neutral-400 text-xs font-normal">({listing.review_count})</span>
          </div>
        </div>

        <p className="text-sm text-neutral-500 dark:text-neutral-400 truncate mt-0.5 font-normal">
          {listing.title}
        </p>

        <p className="text-xs text-neutral-400 dark:text-neutral-400 mt-0.5">
          {listing.bedrooms} bed{listing.bedrooms > 1 ? 's' : ''} · {listing.type}
        </p>

        <div className="mt-1.5 flex items-baseline gap-1.5">
          <span className="font-extrabold text-[15px] text-neutral-900 dark:text-white">
            GH₵ {listing.price_per_night.toLocaleString()}
          </span>
          <span className="text-neutral-500 dark:text-neutral-400 text-xs font-medium">/ night</span>
        </div>
      </Link>
    </motion.div>
  );
}
