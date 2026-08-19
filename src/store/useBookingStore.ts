import { create } from 'zustand';
import { Listing } from '../types';

interface BookingState {
  listing: Listing | null;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  guests: number;
  setListing: (listing: Listing | null) => void;
  setDates: (checkIn: string, checkOut: string) => void;
  setGuests: (guests: number) => void;
  getNights: () => number;
  calculateBreakdown: () => {
    nights: number;
    baseTotal: number;
    cleaningFee: number;
    serviceFee: number;
    taxes: number;
    grandTotal: number;
  };
  resetBooking: () => void;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  listing: null,
  checkIn: '',
  checkOut: '',
  guests: 1,

  setListing: (listing) => set({ listing }),
  setDates: (checkIn, checkOut) => set({ checkIn, checkOut }),
  setGuests: (guests) => set({ guests }),

  getNights: () => {
    const { checkIn, checkOut } = get();
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn).getTime();
    const end = new Date(checkOut).getTime();
    const diff = end - start;
    if (diff <= 0) return 0;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  },

  calculateBreakdown: () => {
    const { listing } = get();
    const nights = get().getNights() || 1;
    const pricePerNight = listing?.price_per_night || 0;
    const cleaningFee = listing?.cleaning_fee || 0;
    const baseTotal = pricePerNight * nights;
    const serviceFee = Math.round(baseTotal * 0.12);
    const taxes = Math.round(baseTotal * 0.08);
    const grandTotal = baseTotal + cleaningFee + serviceFee + taxes;

    return {
      nights,
      baseTotal,
      cleaningFee,
      serviceFee,
      taxes,
      grandTotal,
    };
  },

  resetBooking: () => set({ listing: null, checkIn: '', checkOut: '', guests: 1 }),
}));
