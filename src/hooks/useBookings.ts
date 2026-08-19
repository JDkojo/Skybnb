import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Booking } from '../types';
import { useAuthStore } from '../store/useAuthStore';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const getStoredBookings = (): Booking[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('skybnb-bookings');
    return raw ? JSON.parse(raw) : [
      {
        id: 'booking-sample-1',
        listing_id: 'listing-1',
        listing_title: 'Aura Cliffside Cave Villa with Sunset Caldera Pool',
        listing_location: 'Oia, Santorini, Greece',
        listing_photo: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
        listing_price: 480,
        guest_id: 'user-guest-1',
        guest_name: 'Alex Rivera',
        guest_email: 'alex.rivera@skybnb.com',
        check_in: '2026-09-12',
        check_out: '2026-09-16',
        nights: 4,
        guests_count: 2,
        base_price: 1920,
        cleaning_fee: 95,
        service_fee: 230,
        taxes: 153,
        total_price: 2398,
        status: 'confirmed',
        created_at: '2026-08-01T10:00:00Z',
      }
    ];
  } catch {
    return [];
  }
};

export function useBookings() {
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['bookings', user?.id],
    queryFn: async (): Promise<Booking[]> => {
      if (!user) return [];

      if (isSupabaseConfigured) {
        try {
          const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .eq('guest_id', user.id)
            .order('created_at', { ascending: false });
          if (!error && data) return data;
        } catch {
          // fallback
        }
      }

      const all = getStoredBookings();
      return all.filter((b) => b.guest_id === user.id || user.id === 'user-guest-1');
    },
    enabled: Boolean(user),
  });

  const createBookingMutation = useMutation({
    mutationFn: async (newBooking: Omit<Booking, 'id' | 'created_at'>) => {
      const fullBooking: Booking = {
        ...newBooking,
        id: 'book-' + Date.now(),
        created_at: new Date().toISOString(),
      };

      if (isSupabaseConfigured) {
        try {
          await supabase.from('bookings').insert([fullBooking]);
        } catch (e) {
          console.warn('Supabase booking insert fallback to local', e);
        }
      }

      const existing = getStoredBookings();
      const updated = [fullBooking, ...existing];
      localStorage.setItem('skybnb-bookings', JSON.stringify(updated));
      return fullBooking;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings', user?.id] });
    },
  });

  const cancelBookingMutation = useMutation({
    mutationFn: async (bookingId: string) => {
      if (isSupabaseConfigured) {
        try {
          await supabase.from('bookings').update({ status: 'cancelled' }).eq('id', bookingId);
        } catch (e) {
          console.warn(e);
        }
      }
      const existing = getStoredBookings();
      const updated = existing.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' as const } : b));
      localStorage.setItem('skybnb-bookings', JSON.stringify(updated));
      return bookingId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings', user?.id] });
    },
  });

  return {
    bookings: query.data || [],
    isLoading: query.isLoading,
    createBooking: createBookingMutation.mutateAsync,
    cancelBooking: cancelBookingMutation.mutateAsync,
    isCreating: createBookingMutation.isPending,
  };
}
