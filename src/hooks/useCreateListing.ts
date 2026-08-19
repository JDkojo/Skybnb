import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Listing } from '../types';
import { useAuthStore } from '../store/useAuthStore';
import { saveCustomListing } from './useListings';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export function useCreateListing() {
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (
      newListingData: Omit<
        Listing,
        'id' | 'host_id' | 'host_name' | 'host_avatar' | 'created_at' | 'rating' | 'review_count'
      >
    ) => {
      const fullListing: Listing = {
        ...newListingData,
        id: 'listing-' + Date.now(),
        host_id: user?.id || 'host-current',
        host_name: user?.full_name || 'Host Member',
        host_avatar: user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
        host_is_superhost: true,
        rating: 5.0,
        review_count: 0,
        created_at: new Date().toISOString(),
      };

      if (isSupabaseConfigured) {
        try {
          await supabase.from('listings').insert([fullListing]);
        } catch (e) {
          console.warn('Listing Supabase insert fallback', e);
        }
      }

      saveCustomListing(fullListing);
      return fullListing;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
    },
  });

  return {
    createListing: mutation.mutateAsync,
    isCreating: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
}
