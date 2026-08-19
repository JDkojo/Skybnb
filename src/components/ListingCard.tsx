import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
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
    : ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'];

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
      <div className="relative aspect-[20/19] w-full overflow-hidden rounded-[16px] bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-800">
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

        {/* Superhost / Featured badge */}
        {listing.host_is_superhost && (
          <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-white/90 dark:bg-black/80 backdrop-blur-md text-neutral-900 dark:text-neutral-100 shadow-sm border border-black/5">
            Guest Favorite
          </div>
        )}

        {/* Carousel Prev/Next Arrows */}
        {photos.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 dark:bg-neutral-900/90 text-neutral-800 dark:text-neutral-200 opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-md z-10"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 dark:bg-neutral-900/90 text-neutral-800 dark:text-neutral-200 opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-md z-10"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10">
              {photos.slice(0, 5).map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentPhotoIdx
                      ? 'w-4 bg-white shadow-sm'
                      : 'w-1.5 bg-white/60'
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
          <h3 className="font-semibold text-[15px] text-neutral-900 dark:text-neutral-100 truncate">
            {listing.location}
          </h3>
          <div className="flex items-center gap-1 text-[13px] font-medium text-neutral-900 dark:text-neutral-100 shrink-0">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{listing.rating.toFixed(2)}</span>
            <span className="text-neutral-400 text-xs font-normal">({listing.review_count})</span>
          </div>
        </div>

        <p className="text-sm text-neutral-500 dark:text-neutral-400 truncate mt-0.5 font-normal">
          {listing.title}
        </p>

        <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">
          {listing.bedrooms} bed{listing.bedrooms > 1 ? 's' : ''} · {listing.type}
        </p>

        <div className="mt-1.5 flex items-baseline gap-1.5">
          <span className="font-bold text-[15px] text-neutral-900 dark:text-neutral-100">
            ${listing.price_per_night}
          </span>
          <span className="text-neutral-500 dark:text-neutral-400 text-sm">night</span>
        </div>
      </Link>
    </motion.div>
  );
}
