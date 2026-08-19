import { useQuery } from '@tanstack/react-query';
import { Listing, SearchFilters } from '../types';
import { SEED_LISTINGS } from '../data/seedListings';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

// Local storage helper for user created listings
export const getCustomListings = (): Listing[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('skybnb-custom-listings');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveCustomListing = (listing: Listing) => {
  const current = getCustomListings();
  const updated = [listing, ...current];
  localStorage.setItem('skybnb-custom-listings', JSON.stringify(updated));
};

export function useListings(filters?: SearchFilters) {
  return useQuery({
    queryKey: ['listings', filters],
    queryFn: async () => {
      let listings: Listing[] = [];

      if (isSupabaseConfigured) {
        try {
          const { data, error } = await supabase.from('listings').select('*');
          if (!error && data && data.length > 0) {
            listings = data;
          }
        } catch {
          // fallback to seed + local
        }
      }

      if (listings.length === 0) {
        const custom = getCustomListings();
        listings = [...custom, ...SEED_LISTINGS];
      }

      // Apply client-side filters
      if (filters) {
        if (filters.category && filters.category !== 'all') {
          listings = listings.filter(
            (l) => l.category.toLowerCase() === filters.category?.toLowerCase()
          );
        }

        if (filters.location && filters.location.trim() !== '') {
          const q = filters.location.toLowerCase().trim();
          listings = listings.filter(
            (l) =>
              l.location.toLowerCase().includes(q) ||
              l.city.toLowerCase().includes(q) ||
              l.country.toLowerCase().includes(q) ||
              l.title.toLowerCase().includes(q)
          );
        }

        if (filters.guests && filters.guests > 1) {
          listings = listings.filter((l) => l.max_guests >= filters.guests);
        }

        if (filters.minPrice !== undefined) {
          listings = listings.filter((l) => l.price_per_night >= filters.minPrice!);
        }

        if (filters.maxPrice !== undefined) {
          listings = listings.filter((l) => l.price_per_night <= filters.maxPrice!);
        }

        if (filters.propertyType && filters.propertyType !== '') {
          listings = listings.filter((l) =>
            l.type.toLowerCase().includes(filters.propertyType!.toLowerCase())
          );
        }

        if (filters.amenities && filters.amenities.length > 0) {
          listings = listings.filter((l) =>
            filters.amenities.every((a) => l.amenities.includes(a))
          );
        }
      }

      return listings;
    },
  });
}
