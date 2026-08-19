import React from 'react';
import { Search } from 'lucide-react';
import { useSearchStore } from '../store/useSearchStore';

export function SearchBar() {
  const filters = useSearchStore((s) => s.filters);
  const setSearchModalOpen = useSearchStore((s) => s.setSearchModalOpen);

  const locationText = filters.location || 'Anywhere';
  const datesText = filters.checkIn && filters.checkOut
    ? `${filters.checkIn.slice(5)} - ${filters.checkOut.slice(5)}`
    : 'Any week';
  const guestsText = filters.guests > 1 ? `${filters.guests} guests` : 'Add guests';

  return (
    <button
      id="search-bar-btn"
      onClick={() => setSearchModalOpen(true, 'location')}
      className="flex items-center divide-x divide-neutral-200 dark:divide-neutral-700/80 rounded-full border border-neutral-200 dark:border-neutral-700/80 bg-white dark:bg-[#1E1E1E] shadow-sm hover:shadow-md transition-all duration-200 py-2 px-3 sm:px-4 text-xs sm:text-sm font-semibold max-w-full"
    >
      <span className="px-2 text-neutral-900 dark:text-neutral-100 truncate max-w-[100px] sm:max-w-[140px]">
        {locationText}
      </span>
      <span className="px-2 text-neutral-600 dark:text-neutral-300 hidden xs:inline truncate">
        {datesText}
      </span>
      <div className="pl-2 flex items-center gap-2">
        <span className="text-neutral-400 dark:text-neutral-400 font-normal hidden sm:inline truncate">
          {guestsText}
        </span>
        <div className="p-2 rounded-full bg-[#0EA5E9] text-white flex items-center justify-center shrink-0">
          <Search className="w-3.5 h-3.5 stroke-[2.5]" />
        </div>
      </div>
    </button>
  );
}
