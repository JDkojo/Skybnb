import React from 'react';
import * as Icons from 'lucide-react';
import { CATEGORIES } from '../data/filters';
import { useSearchStore } from '../store/useSearchStore';

export function CategoryFilterBar() {
  const currentCategory = useSearchStore((s) => s.filters.category) || 'all';
  const setFilter = useSearchStore((s) => s.setFilter);

  return (
    <div className="w-full flex items-center overflow-x-auto no-scrollbar gap-6 sm:gap-8 py-3 px-1 border-b border-neutral-200 dark:border-neutral-800/80">
      {CATEGORIES.map((cat) => {
        const isActive = currentCategory.toLowerCase() === cat.id.toLowerCase();
        const IconComponent = (Icons as any)[cat.iconName] || Icons.Sparkles;

        return (
          <button
            key={cat.id}
            id={`category-${cat.id}`}
            onClick={() => setFilter('category', cat.id)}
            className={`group relative flex flex-col items-center gap-1.5 pb-2 text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
              isActive
                ? 'text-[#0EA5E9] dark:text-[#0EA5E9]'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`}
          >
            <IconComponent
              className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                isActive ? 'stroke-[2.2]' : 'stroke-[1.7]'
              }`}
            />
            <span>{cat.label}</span>

            {/* Active underline indicator */}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0EA5E9] rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}
