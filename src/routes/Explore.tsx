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
    Boolean(filters.checkIn),
    filters.guests > 1,
    filters.minPrice !== undefined || filters.maxPrice !== undefined,
    Boolean(filters.propertyType),
    filters.amenities.length > 0,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen pb-24">
      {/* Category Bar & Quick Filter Trigger */}
      <div className="sticky top-20 z-30 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 pt-2 pb-1 border-b border-neutral-100 dark:border-neutral-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <CategoryFilterBar />
          </div>

          {/* Filters Button */}
          <button
            id="filters-modal-btn"
            onClick={() => setSearchModalOpen(true, 'filters')}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700/80 bg-white dark:bg-[#1E1E1E] text-xs font-bold text-neutral-800 dark:text-neutral-200 hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-all shadow-sm shrink-0"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#0EA5E9] text-white text-[11px] font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content Feed */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Results Banner if filtered */}
        {activeFiltersCount > 0 && (
          <div className="mb-6 flex items-center justify-between p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-800/60 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0EA5E9]" />
              <span>
                Found <strong>{listings.length}</strong> stays matching your search filters
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
