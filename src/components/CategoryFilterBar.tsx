import React from 'react';
import {
  Layers,
  Home,
  Building2,
  Map,
  GraduationCap,
  Hotel,
  Briefcase,
  Sparkles,
} from 'lucide-react';
import { CATEGORIES, LISTING_PURPOSES } from '../data/filters';
import { useSearchStore } from '../store/useSearchStore';

const ICONS_MAP: Record<string, React.ElementType> = {
  Layers,
  Home,
  Building2,
  Map,
  GraduationCap,
  Hotel,
  Briefcase,
  Sparkles,
};

export function CategoryFilterBar() {
  const currentCategory = useSearchStore((s) => s.filters.category) || 'all';
  const currentPurpose = useSearchStore((s) => s.filters.purpose) || 'all';
  const setFilter = useSearchStore((s) => s.setFilter);

  return (
    <div className="w-full flex flex-col gap-2 py-1.5">
      {/* Purpose Quick-Filter Chips */}
      <div className="flex items-center overflow-x-auto no-scrollbar gap-1.5 sm:gap-2">
        {LISTING_PURPOSES.map((purpose) => {
          const isActive = currentPurpose.toLowerCase() === purpose.id.toLowerCase();
          return (
            <button
              key={purpose.id}
              id={`purpose-pill-${purpose.id}`}
              onClick={() => setFilter('purpose', purpose.id)}
              className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-[#0E1E38] text-[#E5C158] dark:bg-[#E5C158] dark:text-[#0E1E38] shadow-sm ring-1 ring-[#C5A059]'
                  : 'bg-neutral-100 dark:bg-[#0F1E33] text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-[#1E3557]'
              }`}
            >
              {purpose.label}
            </button>
          );
        })}
      </div>

      {/* Property Category Icons Bar */}
      <div className="flex items-center overflow-x-auto no-scrollbar gap-4 sm:gap-6 pt-1 border-t border-neutral-100 dark:border-[#1E3557]/40">
        {CATEGORIES.map((cat) => {
          const isActive = currentCategory.toLowerCase() === cat.id.toLowerCase();
          const IconComponent = ICONS_MAP[cat.iconName] || Sparkles;

          return (
            <button
              key={cat.id}
              id={`category-${cat.id}`}
              onClick={() => setFilter('category', cat.id)}
              className={`group relative flex flex-col items-center gap-1 pb-1.5 text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 touch-manipulation min-w-[52px] ${
                isActive
                  ? 'text-[#C5A059] dark:text-[#E5C158]'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
            >
              <IconComponent
                className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform group-hover:scale-110 ${
                  isActive ? 'stroke-[2.5] text-[#C5A059] dark:text-[#E5C158]' : 'stroke-[1.8]'
                }`}
              />
              <span className="text-[10px] sm:text-[11px]">{cat.label}</span>

              {/* Active gold underline indicator */}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A059] dark:bg-[#E5C158] rounded-full shadow-[0_0_8px_rgba(197,160,89,0.5)]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
