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
        host_name: newListingData.contact_name || user?.full_name || 'Property Owner',
        host_avatar: user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
        host_is_superhost: true,
        rating: 5.0,
        review_count: 0,
        created_at: new Date().toISOString(),
        purpose: newListingData.purpose || 'sale',
        price: newListingData.price || newListingData.price_per_night || 100000,
        price_type: newListingData.price_type || 'total',
        contact_name: newListingData.contact_name || user?.full_name || 'Property Owner',
        contact_phone: newListingData.contact_phone || user?.phone || '+233 24 000 0000',
        contact_whatsapp: newListingData.contact_whatsapp || (newListingData.contact_phone ? newListingData.contact_phone.replace(/[^0-9]/g, '') : '233240000000'),
        contact_role: newListingData.contact_role || 'Owner',
        status: newListingData.status || 'available',
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
