import { useQuery } from '@tanstack/react-query';
import { Listing } from '../types';
import { SEED_LISTINGS } from '../data/seedListings';
import { getCustomListings } from './useListings';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export function useListing(id?: string) {
  return useQuery({
    queryKey: ['listing', id],
    queryFn: async (): Promise<Listing | null> => {
      if (!id) return null;

      if (isSupabaseConfigured) {
        try {
          const { data, error } = await supabase.from('listings').select('*').eq('id', id).single();
          if (!error && data) return data;
        } catch {
          // fallback
        }
      }

      const custom = getCustomListings();
      const all = [...custom, ...SEED_LISTINGS];
      const match = all.find((item) => item.id === id);
      return match || null;
    },
    enabled: Boolean(id),
  });
}
