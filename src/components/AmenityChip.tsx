import React from 'react';
import * as Icons from 'lucide-react';
import { AMENITIES } from '../data/amenities';

interface AmenityChipProps {
  amenityId: string;
  compact?: boolean;
  key?: React.Key;
}

export function AmenityChip({ amenityId, compact = false }: AmenityChipProps) {
  const amenity = AMENITIES.find((a) => a.id === amenityId);
  if (!amenity) return null;

  // Dynamically resolve lucide icon
  const IconComponent = (Icons as any)[amenity.iconName] || Icons.CheckCircle2;

  if (compact) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700/60">
        <IconComponent className="w-3.5 h-3.5 text-[#0EA5E9]" />
        {amenity.name}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1E1E1E] transition-colors">
      <div className="p-2 rounded-lg bg-sky-50 dark:bg-sky-950/40 text-[#0EA5E9]">
        <IconComponent className="w-5 h-5" />
      </div>
      <div>
        <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{amenity.name}</p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">{amenity.category}</p>
      </div>
    </div>
  );
}
