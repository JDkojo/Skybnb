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

export type ListingPurpose = 'sale' | 'rent' | 'hostel' | 'short_stay';
export type PriceType = 'total' | 'month' | 'year' | 'semester' | 'night';
export type PropertyCategory = 'house' | 'apartment' | 'land' | 'hostel' | 'hotel' | 'commercial';

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
  region?: string;
  latitude: number;
  longitude: number;

  // Real estate purpose & pricing
  purpose: ListingPurpose; // 'sale' | 'rent' | 'hostel' | 'short_stay'
  price: number;
  price_type: PriceType; // 'total' | 'month' | 'year' | 'semester' | 'night'
  is_negotiable?: boolean;

  // Legacy pricing fields for compatibility
  price_per_night: number;
  cleaning_fee: number;
  service_fee: number;

  // Property specs
  type: string; // e.g. 'Single Family House', 'Serviced Land', 'Student Hostel Suite', 'Executive Penthouse', 'Commercial Complex'
  category: string; // 'house' | 'apartment' | 'land' | 'hostel' | 'hotel' | 'commercial'
  bedrooms: number;
  beds: number;
  bathrooms: number;
  max_guests: number;
  land_size?: string; // e.g. '70 x 100 ft (0.16 Acre)', '1 Acre (4 Plots)', '2.5 Acres'
  title_document?: string; // e.g. 'Lands Commission Titled', 'Registered Indenture', 'Gazette', 'Site Plan Registered', 'Freehold'
  furnishing?: 'furnished' | 'semi-furnished' | 'unfurnished';
  status?: 'available' | 'under_negotiation' | 'sold' | 'rented';

  // Direct Owner / Agent Contact Info
  contact_name: string;
  contact_phone: string; // Ghana phone number e.g. +233 24 123 4567
  contact_whatsapp: string; // Direct WhatsApp number with country code e.g. 233241234567
  contact_email?: string;
  contact_role?: 'Owner' | 'Direct Agent' | 'Developer' | 'Property Manager';
  agency_name?: string;

  photos: string[];
  amenities: string[];
  rating: number;
  review_count: number;
  reviews?: Review[];
  created_at: string;
  is_featured?: boolean;
  inquiry_count?: number;
}

export interface PropertyInquiry {
  id: string;
  listing_id: string;
  listing_title: string;
  listing_location: string;
  listing_price: number;
  listing_price_type: string;
  sender_name: string;
  sender_phone: string;
  sender_email: string;
  message: string;
  inquiry_type: 'buy' | 'rent' | 'hostel' | 'tour' | 'offer' | 'general';
  preferred_tour_date?: string;
  created_at: string;
  status: 'new' | 'read' | 'replied';
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
  purpose?: string; // 'all' | 'sale' | 'rent' | 'hostel' | 'short_stay'
  category?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  amenities: string[];
  bedrooms?: number;
  bathrooms?: number;
  guests?: number;
  checkIn?: string;
  checkOut?: string;
}

