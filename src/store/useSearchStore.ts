import { create } from 'zustand';
import { SearchFilters } from '../types';

interface SearchState {
  filters: SearchFilters;
  isSearchModalOpen: boolean;
  activeTab: 'location' | 'dates' | 'guests' | 'filters';
  setFilter: <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => void;
  resetFilters: () => void;
  setSearchModalOpen: (open: boolean, tab?: 'location' | 'dates' | 'guests' | 'filters') => void;
}

const defaultFilters: SearchFilters = {
  location: '',
  purpose: 'all',
  category: 'all',
  propertyType: '',
  minPrice: undefined,
  maxPrice: undefined,
  amenities: [],
  bedrooms: undefined,
  bathrooms: undefined,
  guests: 1,
  checkIn: '',
  checkOut: '',
};

export const useSearchStore = create<SearchState>((set) => ({
  filters: defaultFilters,
  isSearchModalOpen: false,
  activeTab: 'location',

  setFilter: (key, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    }));
  },

  resetFilters: () => {
    set({ filters: defaultFilters });
  },

  setSearchModalOpen: (open, tab = 'location') => {
    set({ isSearchModalOpen: open, activeTab: tab });
  },
}));
