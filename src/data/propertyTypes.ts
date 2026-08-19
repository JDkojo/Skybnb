export interface PropertyTypeOption {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export const PROPERTY_TYPES: PropertyTypeOption[] = [
  {
    id: 'apartment',
    name: 'Entire Apartment',
    description: 'A stylish place with private entrance and all modern amenities.',
    iconName: 'Building2',
  },
  {
    id: 'villa',
    name: 'Luxury Villa',
    description: 'Private estate with grounds, luxury pool, and supreme tranquility.',
    iconName: 'Castle',
  },
  {
    id: 'cabin',
    name: 'Cozy Cabin',
    description: 'Immersive wooden retreat tucked into alpine forests or lakesides.',
    iconName: 'TreePine',
  },
  {
    id: 'beachfront',
    name: 'Beachfront House',
    description: 'Step right out from your deck onto warm golden sand and waves.',
    iconName: 'Palmtree',
  },
  {
    id: 'loft',
    name: 'Designer Penthouse Loft',
    description: 'High ceilings, expansive city skyline terraces, and modern art.',
    iconName: 'Gem',
  },
  {
    id: 'mansion',
    name: 'Architectural Mansion',
    description: 'Grand architectural wonder with curated art and cinematic amenities.',
    iconName: 'Crown',
  },
];
