import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Compass, Sparkles } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';
import { ListingCard } from '../components/ListingCard';
import { images } from '../constants/images';

export default function Wishlists() {
  const { wishlistListings, isLoading } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Wishlists
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            {wishlistListings.length} saved stay{wishlistListings.length === 1 ? '' : 's'} across the globe
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse space-y-3">
              <div className="aspect-[20/19] bg-neutral-200 dark:bg-neutral-800 rounded-2xl" />
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : wishlistListings.length === 0 ? (
        <div className="max-w-md mx-auto my-16 p-8 text-center bg-white dark:bg-[#1E1E1E] rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8 stroke-[1.8]" />
          </div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Your wishlist is empty</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
            As you search, tap the heart icon on any stay to save your favorite accommodations to this collection.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm bg-[#0EA5E9] text-white hover:bg-sky-600 transition-colors shadow-md"
          >
            <Compass className="w-4 h-4" />
            <span>Start exploring</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {wishlistListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
