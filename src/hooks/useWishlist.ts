import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../store/useAuthStore';
import { Listing } from '../types';
import { useListings } from './useListings';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const getStoredWishlist = (userId: string): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(`skybnb-wishlist-${userId}`);
    return raw ? JSON.parse(raw) : ['listing-1', 'listing-3']; // initial default wishlist
  } catch {
    return ['listing-1'];
  }
};

export function useWishlist() {
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();
  const { data: allListings = [] } = useListings();

  const userId = user?.id || 'guest-session';

  const query = useQuery({
    queryKey: ['wishlist', userId],
    queryFn: async (): Promise<string[]> => {
      if (isSupabaseConfigured && user) {
        try {
          const { data, error } = await supabase
            .from('wishlists')
            .select('listing_id')
            .eq('user_id', user.id);
          if (!error && data) {
            return data.map((item) => item.listing_id);
          }
        } catch {
          // fallback
        }
      }
      return getStoredWishlist(userId);
    },
  });

  const toggleWishlistMutation = useMutation({
    mutationFn: async (listingId: string) => {
      const currentIds = query.data || getStoredWishlist(userId);
      const isSaved = currentIds.includes(listingId);
      const updatedIds = isSaved
        ? currentIds.filter((id) => id !== listingId)
        : [...currentIds, listingId];

      if (isSupabaseConfigured && user) {
        try {
          if (isSaved) {
            await supabase.from('wishlists').delete().eq('user_id', user.id).eq('listing_id', listingId);
          } else {
            await supabase.from('wishlists').insert([{ user_id: user.id, listing_id: listingId }]);
          }
        } catch (e) {
          console.warn('Wishlist Supabase error', e);
        }
      }

      localStorage.setItem(`skybnb-wishlist-${userId}`, JSON.stringify(updatedIds));
      return updatedIds;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist', userId] });
    },
  });

  const wishlistListingIds = query.data || [];
  const wishlistListings: Listing[] = allListings.filter((l) =>
    wishlistListingIds.includes(l.id)
  );

  return {
    wishlistIds: wishlistListingIds,
    wishlistListings,
    isLoading: query.isLoading,
    isSaved: (listingId: string) => wishlistListingIds.includes(listingId),
    toggleWishlist: (listingId: string) => toggleWishlistMutation.mutate(listingId),
  };
}
