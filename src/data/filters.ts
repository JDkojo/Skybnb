export interface CategoryOption {
  id: string;
  label: string;
  iconName: string;
}

export const CATEGORIES: CategoryOption[] = [
  { id: 'all', label: 'All Homes', iconName: 'Sparkles' },
  { id: 'trending', label: 'Trending', iconName: 'Flame' },
  { id: 'beachfront', label: 'Beachfront', iconName: 'Palmtree' },
  { id: 'amazing_pools', label: 'Amazing pools', iconName: 'Waves' },
  { id: 'iconic_cities', label: 'Iconic cities', iconName: 'Building2' },
  { id: 'cabins', label: 'Cabins', iconName: 'TreePine' },
  { id: 'luxe', label: 'Luxe', iconName: 'Gem' },
  { id: 'mansions', label: 'Mansions', iconName: 'Castle' },
  { id: 'lakefront', label: 'Lakefront', iconName: 'Compass' },
  { id: 'countryside', label: 'Countryside', iconName: 'Sun' },
  { id: 'skiing', label: 'Skiing', iconName: 'MountainSnow' },
  { id: 'design', label: 'Design', iconName: 'LayoutGrid' },
];

export const POPULAR_LOCATIONS = [
  { name: 'Santorini, Greece', region: 'Europe', lat: 36.3932, lng: 25.4615 },
  { name: 'Kyoto, Japan', region: 'Asia', lat: 35.0116, lng: 135.7681 },
  { name: 'Amalfi Coast, Italy', region: 'Europe', lat: 40.6340, lng: 14.6027 },
  { name: 'Aspen, Colorado, USA', region: 'North America', lat: 39.1911, lng: -106.8175 },
  { name: 'Bali, Indonesia', region: 'Southeast Asia', lat: -8.4095, lng: 115.1889 },
  { name: 'Tulum, Mexico', region: 'Latin America', lat: 20.2114, lng: -87.4654 },
  { name: 'Zermatt, Switzerland', region: 'Europe', lat: 45.9765, lng: 7.7491 },
  { name: 'Paris, France', region: 'Europe', lat: 48.8566, lng: 2.3522 },
  { name: 'New York, USA', region: 'North America', lat: 40.7128, lng: -74.0060 },
  { name: 'Cape Town, South Africa', region: 'Africa', lat: -33.9249, lng: 18.4241 },
];
