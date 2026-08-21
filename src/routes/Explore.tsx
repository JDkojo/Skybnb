import React from 'react';
import { useListings } from '../hooks/useListings';
import { useSearchStore } from '../store/useSearchStore';
import { useAppStore } from '../store/useAppStore';
import { CategoryFilterBar } from '../components/CategoryFilterBar';
import { ListingGrid } from '../components/ListingGrid';
import { ListingMapView } from '../components/ListingMapView';
import { SlidersHorizontal, Sparkles } from 'lucide-react';

export default function Explore() {
  const filters = useSearchStore((s) => s.filters);
  const setSearchModalOpen = useSearchStore((s) => s.setSearchModalOpen);
  const viewMode = useAppStore((s) => s.viewMode);
  const { data: listings = [], isLoading } = useListings(filters);

  const activeFiltersCount = [
    Boolean(filters.location),
    Boolean(filters.purpose && filters.purpose !== 'all'),
    Boolean(filters.category && filters.category !== 'all'),
    filters.minPrice !== undefined || filters.maxPrice !== undefined,
    Boolean(filters.propertyType),
    (filters.bedrooms && filters.bedrooms > 0) || (filters.bathrooms && filters.bathrooms > 0),
    filters.amenities.length > 0,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen pb-24">
      {/* Category Bar & Quick Filter Trigger */}
      <div className="sticky top-16 sm:top-20 z-30 bg-white/95 dark:bg-[#070D18]/95 backdrop-blur-md px-3.5 sm:px-6 lg:px-8 pt-2 pb-1 border-b border-neutral-100 dark:border-[#1E3557]/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2.5 sm:gap-4">
          <div className="flex-1 min-w-0">
            <CategoryFilterBar />
          </div>

          {/* Filters Button */}
          <button
            id="filters-modal-btn"
            onClick={() => setSearchModalOpen(true, 'filters')}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] text-xs font-bold text-neutral-800 dark:text-neutral-200 hover:border-[#C5A059] hover:text-[#C5A059] transition-all shadow-sm shrink-0"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A059]" />
            <span className="hidden sm:inline">Ghana Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#C5A059] text-[#0E1E38] text-[10px] sm:text-[11px] font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content Feed */}
      <main className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {/* Results Banner if filtered */}
        {activeFiltersCount > 0 && (
          <div className="mb-6 flex items-center justify-between p-3 rounded-2xl bg-[#C5A059]/10 border border-[#C5A059]/30 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <span>
                Found <strong>{listings.length}</strong> Ghana properties matching your search
              </span>
            </div>
          </div>
        )}

        {/* View Switcher: Grid or Map */}
        {viewMode === 'grid' ? (
          <ListingGrid listings={listings} isLoading={isLoading} />
        ) : (
          <ListingMapView listings={listings} />
        )}
      </main>
    </div>
  );
}
