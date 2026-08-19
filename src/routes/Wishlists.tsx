import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Compass, Sparkles } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';
import { ListingCard } from '../components/ListingCard';

export default function Wishlists() {
  const { wishlistListings, isLoading } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 pb-28 min-h-screen">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Saved Ghana Accommodations
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            {wishlistListings.length} saved stay{wishlistListings.length === 1 ? '' : 's'} in Ghana
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 sm:gap-x-6 gap-y-6 sm:gap-y-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse space-y-2.5 sm:space-y-3">
              <div className="aspect-[20/19] bg-neutral-200 dark:bg-[#0F1E33] rounded-2xl" />
              <div className="h-3.5 sm:h-4 bg-neutral-200 dark:bg-[#0F1E33] rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : wishlistListings.length === 0 ? (
        <div className="max-w-md mx-auto my-12 sm:my-16 p-6 sm:p-8 text-center bg-white dark:bg-[#0F1E33] rounded-3xl border border-neutral-200 dark:border-[#1E3557] shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#C5A059]/20 text-[#C5A059] flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8 stroke-[1.8]" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">Your wishlist is empty</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
            As you explore Ghana destinations, tap the heart icon on any stay to save your favorite accommodations to this collection.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs sm:text-sm bg-gradient-to-r from-[#DFB24A] via-[#C5A059] to-[#DFB24A] text-[#0E1E38] hover:scale-105 transition-transform shadow-md"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Ghana Stays</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 sm:gap-x-6 gap-y-6 sm:gap-y-10">
          {wishlistListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
