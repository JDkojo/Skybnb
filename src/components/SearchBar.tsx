import React from 'react';
import { Search } from 'lucide-react';
import { useSearchStore } from '../store/useSearchStore';

export function SearchBar() {
  const filters = useSearchStore((s) => s.filters);
  const setSearchModalOpen = useSearchStore((s) => s.setSearchModalOpen);

  const locationText = filters.location || 'Anywhere in Ghana';
  const datesText = filters.checkIn && filters.checkOut
    ? `${filters.checkIn.slice(5)} - ${filters.checkOut.slice(5)}`
    : 'Any dates';
  const guestsText = filters.guests > 1 ? `${filters.guests} guests` : 'Add guests';

  return (
    <button
      id="search-bar-btn"
      onClick={() => setSearchModalOpen(true, 'location')}
      className="flex items-center divide-x divide-neutral-200 dark:divide-[#1E3557] rounded-full border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] shadow-sm hover:shadow-md hover:border-[#C5A059]/60 transition-all duration-200 py-1.5 sm:py-2 px-2.5 sm:px-4 text-xs sm:text-sm font-semibold max-w-full text-left"
    >
      <span className="px-1.5 sm:px-2 text-neutral-900 dark:text-neutral-100 truncate max-w-[90px] sm:max-w-[130px] md:max-w-[160px]">
        {locationText}
      </span>
      <span className="px-1.5 sm:px-2 text-neutral-600 dark:text-neutral-300 hidden xs:inline truncate text-xs">
        {datesText}
      </span>
      <div className="pl-1.5 sm:pl-2 flex items-center gap-1.5 sm:gap-2">
        <span className="text-neutral-400 dark:text-neutral-400 font-normal hidden md:inline truncate text-xs">
          {guestsText}
        </span>
        <div className="p-1.5 sm:p-2 rounded-full bg-[#C5A059] hover:bg-[#DFB24A] text-[#0E1E38] flex items-center justify-center shrink-0 shadow-sm transition-colors">
          <Search className="w-3.5 h-3.5 stroke-[2.5]" />
        </div>
      </div>
    </button>
  );
}
