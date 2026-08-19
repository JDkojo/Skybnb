import React from 'react';
import * as Icons from 'lucide-react';
import { CATEGORIES } from '../data/filters';
import { useSearchStore } from '../store/useSearchStore';

export function CategoryFilterBar() {
  const currentCategory = useSearchStore((s) => s.filters.category) || 'all';
  const setFilter = useSearchStore((s) => s.setFilter);

  return (
    <div className="w-full flex items-center overflow-x-auto no-scrollbar gap-5 sm:gap-7 py-3 px-1 border-b border-neutral-200/80 dark:border-[#1E3557]/80">
      {CATEGORIES.map((cat) => {
        const isActive = currentCategory.toLowerCase() === cat.id.toLowerCase();
        const IconComponent = (Icons as any)[cat.iconName] || Icons.Sparkles;

        return (
          <button
            key={cat.id}
            id={`category-${cat.id}`}
            onClick={() => setFilter('category', cat.id)}
            className={`group relative flex flex-col items-center gap-1.5 pb-2 text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 touch-manipulation min-w-[50px] ${
              isActive
                ? 'text-[#C5A059] dark:text-[#E5C158]'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            <IconComponent
              className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                isActive ? 'stroke-[2.5] text-[#C5A059] dark:text-[#E5C158]' : 'stroke-[1.8]'
              }`}
            />
            <span className="text-[11px] sm:text-xs">{cat.label}</span>

            {/* Active gold underline indicator */}
            {isActive && (
              <span className="absolute bottom-0 left-1 right-1 h-[2.5px] bg-[#C5A059] dark:bg-[#E5C158] rounded-full shadow-[0_0_8px_rgba(197,160,89,0.5)]" />
            )}
          </button>
        );
      })}
    </div>
  );
}
