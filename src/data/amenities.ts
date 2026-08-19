export interface AmenityOption {
  id: string;
  name: string;
  iconName: string;
  category: 'Essentials' | 'Features' | 'Safety' | 'Location';
}

export const AMENITIES: AmenityOption[] = [
  { id: 'wifi', name: 'Fast WiFi (500+ Mbps)', iconName: 'Wifi', category: 'Essentials' },
  { id: 'kitchen', name: 'Chef’s Kitchen', iconName: 'Utensils', category: 'Essentials' },
  { id: 'workspace', name: 'Dedicated Workspace', iconName: 'Laptop', category: 'Essentials' },
  { id: 'washer', name: 'Washer & Dryer', iconName: 'Shirt', category: 'Essentials' },
  { id: 'air_conditioning', name: 'Air Conditioning', iconName: 'Wind', category: 'Essentials' },
  { id: 'heating', name: 'Central Heating', iconName: 'Flame', category: 'Essentials' },
  { id: 'tv', name: '65" 4K Smart TV', iconName: 'Tv', category: 'Essentials' },
  
  { id: 'pool', name: 'Infinity Pool', iconName: 'Waves', category: 'Features' },
  { id: 'hot_tub', name: 'Private Hot Tub', iconName: 'Sparkles', category: 'Features' },
  { id: 'patio', name: 'Panoramic Balcony / Patio', iconName: 'Sun', category: 'Features' },
  { id: 'bbq', name: 'Outdoor BBQ Grill', iconName: 'FlameKindling', category: 'Features' },
  { id: 'gym', name: 'Private Gym / Fitness', iconName: 'Dumbbell', category: 'Features' },
  { id: 'ev_charger', name: 'EV Charger (Level 2)', iconName: 'Zap', category: 'Features' },
  { id: 'fireplace', name: 'Indoor Fireplace', iconName: 'Flame', category: 'Features' },
  { id: 'sauna', name: 'Cedar Wood Sauna', iconName: 'Thermometer', category: 'Features' },

  { id: 'beach_access', name: 'Direct Beach Access', iconName: 'Palmtree', category: 'Location' },
  { id: 'ski_in_ski_out', name: 'Ski-in / Ski-out', iconName: 'MountainSnow', category: 'Location' },
  { id: 'waterfront', name: 'Lake & Waterfront Views', iconName: 'Ship', category: 'Location' },
  { id: 'skyline_views', name: 'Panoramic Skyline View', iconName: 'Building2', category: 'Location' },

  { id: 'parking', name: 'Free Secure Parking', iconName: 'Car', category: 'Safety' },
  { id: 'smoke_alarm', name: 'Smoke Alarm', iconName: 'ShieldAlert', category: 'Safety' },
  { id: 'first_aid', name: 'First Aid Kit', iconName: 'HeartPulse', category: 'Safety' },
  { id: 'security_cameras', name: 'Exterior Security Cameras', iconName: 'Video', category: 'Safety' },
];
