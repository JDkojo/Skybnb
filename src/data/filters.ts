export interface CategoryOption {
  id: string;
  label: string;
  iconName: string;
  description?: string;
}

export interface PurposeOption {
  id: string;
  label: string;
  description: string;
}

export const LISTING_PURPOSES: PurposeOption[] = [
  { id: 'all', label: 'All Properties', description: 'Browse all available listings across Ghana' },
  { id: 'sale', label: 'For Sale', description: 'Houses, lands & commercial properties to purchase' },
  { id: 'rent', label: 'For Rent', description: 'Long & short term residential and commercial rentals' },
  { id: 'hostel', label: 'Student Hostels', description: 'Hostels near Legon, KNUST, UCC, UPSA, etc.' },
  { id: 'short_stay', label: 'Hotels & Short Stay', description: 'Guest houses, boutique lodges and executive suites' },
];

export const CATEGORIES: CategoryOption[] = [
  { id: 'all', label: 'All Properties', iconName: 'Layers' },
  { id: 'house', label: 'Houses & Villas', iconName: 'Home', description: 'Stand-alone houses, gated villas, townhouses & mansions' },
  { id: 'apartment', label: 'Apartments', iconName: 'Building2', description: 'Studio, 1-3 bedroom furnished & unfurnished apartments' },
  { id: 'land', label: 'Lands & Plots', iconName: 'Map', description: 'Serviced residential, commercial & farmland plots with titled documents' },
  { id: 'hostel', label: 'Student Hostels', iconName: 'GraduationCap', description: 'Executive student accommodation, 1-in-a-room, 2-in-a-room' },
  { id: 'hotel', label: 'Hotels & Lodges', iconName: 'Hotel', description: 'Boutique hotels, beach resorts, guest houses & lakefront retreats' },
  { id: 'commercial', label: 'Commercial & Office', iconName: 'Briefcase', description: 'Offices, shops, showrooms, warehouses & event grounds' },
];

export const GHANA_REGIONS = [
  'Greater Accra',
  'Ashanti Region',
  'Central Region',
  'Eastern Region',
  'Western Region',
  'Volta Region',
  'Northern Region',
  'Bono Region',
  'Upper East',
  'Upper West',
];

export const POPULAR_LOCATIONS = [
  { name: 'East Legon, Accra', region: 'Greater Accra', lat: 5.6358, lng: -0.1582 },
  { name: 'Cantonments, Accra', region: 'Greater Accra', lat: 5.5823, lng: -0.1741 },
  { name: 'Airport Residential, Accra', region: 'Greater Accra', lat: 5.6037, lng: -0.1870 },
  { name: 'Prampram & Tsopoli (Plots)', region: 'Greater Accra', lat: 5.7150, lng: 0.1230 },
  { name: 'KNUST / Ayeduase, Kumasi', region: 'Ashanti Region', lat: 6.6745, lng: -1.5714 },
  { name: 'Ahodwo & Ridge, Kumasi', region: 'Ashanti Region', lat: 6.6784, lng: -1.6244 },
  { name: 'Aburi & Peduase Hills', region: 'Eastern Region', lat: 5.7892, lng: -0.1754 },
  { name: 'Akosombo & Volta River', region: 'Eastern Region', lat: 6.2941, lng: 0.0526 },
  { name: 'Legon & Okponglo (Hostels)', region: 'Greater Accra', lat: 5.6508, lng: -0.1869 },
  { name: 'Cape Coast & Elmina', region: 'Central Region', lat: 5.1054, lng: -1.2466 },
  { name: 'Takoradi & Busua Coast', region: 'Western Region', lat: 4.8967, lng: -1.7554 },
  { name: 'Spintex & Sakumono', region: 'Greater Accra', lat: 5.6291, lng: -0.0984 },
];

