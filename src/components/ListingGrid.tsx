import React from 'react';
import { Listing } from '../types';
import { ListingCard } from './ListingCard';
import { SearchX } from 'lucide-react';
import { useSearchStore } from '../store/useSearchStore';

interface ListingGridProps {
  listings: Listing[];
  isLoading?: boolean;
}

export function ListingGrid({ listings, isLoading = false }: ListingGridProps) {
  const resetFilters = useSearchStore((s) => s.resetFilters);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-3 sm:gap-x-6 gap-y-6 sm:gap-y-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse flex flex-col space-y-2.5 sm:space-y-3">
            <div className="aspect-[20/19] bg-neutral-200 dark:bg-neutral-800 rounded-2xl sm:rounded-[18px]" />
            <div className="h-3.5 sm:h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4" />
            <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2" />
            <div className="h-3.5 sm:h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-8 border border-dashed border-neutral-300 dark:border-neutral-800 rounded-2xl bg-neutral-50/50 dark:bg-neutral-900/30">
        <div className="p-4 rounded-full bg-sky-50 dark:bg-sky-950/40 text-[#0EA5E9] mb-4">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">No properties found</h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 max-w-md">
          Try adjusting your search criteria, clearing selected filters, or exploring other global destinations.
        </p>
        <button
          onClick={resetFilters}
          className="mt-6 px-6 py-2.5 rounded-full font-semibold text-sm bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
        >
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-3 sm:gap-x-6 gap-y-6 sm:gap-y-10">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
