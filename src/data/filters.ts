export interface CategoryOption {
  id: string;
  label: string;
  iconName: string;
}

export const CATEGORIES: CategoryOption[] = [
  { id: 'all', label: 'All Stays', iconName: 'Sparkles' },
  { id: 'luxe', label: 'Valpromark Luxe', iconName: 'Gem' },
  { id: 'iconic_cities', label: 'Accra & Cities', iconName: 'Building2' },
  { id: 'beachfront', label: 'Atlantic Coast', iconName: 'Palmtree' },
  { id: 'amazing_pools', label: 'Infinity Pools', iconName: 'Waves' },
  { id: 'cabins', label: 'Aburi Mountain Lodges', iconName: 'TreePine' },
  { id: 'lakeside', label: 'Lake Volta & Ada', iconName: 'Compass' },
  { id: 'design', label: 'Executive Penthouses', iconName: 'LayoutGrid' },
  { id: 'mansions', label: 'Private Estates', iconName: 'Castle' },
];

export const POPULAR_LOCATIONS = [
  { name: 'Cantonments, Accra', region: 'Greater Accra', lat: 5.5823, lng: -0.1741 },
  { name: 'East Legon, Accra', region: 'Greater Accra', lat: 5.6358, lng: -0.1582 },
  { name: 'Airport Residential, Accra', region: 'Greater Accra', lat: 5.6037, lng: -0.1870 },
  { name: 'Labone & Osu, Accra', region: 'Greater Accra', lat: 5.5684, lng: -0.1652 },
  { name: 'Aburi Mountains, Peduase', region: 'Eastern Region', lat: 5.7892, lng: -0.1754 },
  { name: 'Akosombo, Lake Volta', region: 'Eastern Region', lat: 6.2941, lng: 0.0526 },
  { name: 'Ada Foah & Estuary', region: 'Greater Accra', lat: 5.7932, lng: 0.6274 },
  { name: 'Busua Beach & Western Coast', region: 'Western Region', lat: 4.8115, lng: -1.9367 },
  { name: 'Cape Coast & Elmina', region: 'Central Region', lat: 5.1054, lng: -1.2466 },
  { name: 'Ahodwo, Kumasi', region: 'Ashanti Region', lat: 6.6784, lng: -1.6244 },
];
