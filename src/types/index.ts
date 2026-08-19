export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  is_host: boolean;
  phone?: string;
  bio?: string;
  joined_date?: string;
  created_at?: string;
}

export interface Review {
  id: string;
  listing_id: string;
  reviewer_id: string;
  reviewer_name: string;
  reviewer_avatar?: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface Listing {
  id: string;
  host_id: string;
  host_name: string;
  host_avatar?: string;
  host_is_superhost?: boolean;
  title: string;
  description: string;
  location: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  price_per_night: number;
  cleaning_fee: number;
  service_fee: number;
  photos: string[];
  amenities: string[];
  type: string; // e.g. Apartment, Villa, Cabin, Beachfront, Loft, Penthouse
  category: string; // Icon category e.g. 'Trending', 'Beachfront', 'Cabins', 'Luxe', 'Mansions', 'Iconic cities', 'Countryside', 'Lakefront', 'Amazing pools'
  bedrooms: number;
  beds: number;
  bathrooms: number;
  max_guests: number;
  rating: number;
  review_count: number;
  reviews?: Review[];
  created_at: string;
  is_featured?: boolean;
}

export interface Booking {
  id: string;
  listing_id: string;
  listing_title: string;
  listing_location: string;
  listing_photo: string;
  listing_price: number;
  guest_id: string;
  guest_name: string;
  guest_email: string;
  check_in: string; // YYYY-MM-DD
  check_out: string; // YYYY-MM-DD
  nights: number;
  guests_count: number;
  base_price: number;
  cleaning_fee: number;
  service_fee: number;
  taxes: number;
  total_price: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  created_at: string;
}

export interface WishlistItem {
  id: string;
  user_id: string;
  listing_id: string;
  created_at: string;
}

export interface SearchFilters {
  location: string;
  checkIn?: string;
  checkOut?: string;
  guests: number;
  category?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  amenities: string[];
  bedrooms?: number;
  bathrooms?: number;
}
