export interface PropertyTypeOption {
  id: string;
  name: string;
  category: string;
  description: string;
  iconName: string;
}

export const PROPERTY_TYPES: PropertyTypeOption[] = [
  {
    id: 'house_detached',
    name: 'Detached House / Villa',
    category: 'house',
    description: 'Standalone compound with private gate, parking, and compound space.',
    iconName: 'Home',
  },
  {
    id: 'townhouse',
    name: 'Gated Townhouse / Semi-Detached',
    category: 'house',
    description: 'Modern residence within a secure serviced gated community.',
    iconName: 'Building',
  },
  {
    id: 'apartment',
    name: 'Furnished / Unfurnished Apartment',
    category: 'apartment',
    description: '1, 2, 3+ bedroom flats with lift, backup generator and security.',
    iconName: 'Building2',
  },
  {
    id: 'land_residential',
    name: 'Serviced Residential Land / Plot',
    category: 'land',
    description: 'Demarcated plots (70x100ft, 80x100ft) with roads, water and electricity.',
    iconName: 'Map',
  },
  {
    id: 'land_acreage',
    name: 'Acreage / Farmland / Commercial Land',
    category: 'land',
    description: 'Large titled land parcels suitable for estate development or industry.',
    iconName: 'Trees',
  },
  {
    id: 'student_hostel',
    name: 'Student Hostel Room / Suite',
    category: 'hostel',
    description: '1-in-a-room, 2-in-a-room, or 3-in-a-room with study desks & Wi-Fi.',
    iconName: 'GraduationCap',
  },
  {
    id: 'hotel_guest_house',
    name: 'Hotel / Guest House / Boutique Lodge',
    category: 'hotel',
    description: 'Short stay rooms, chalets, beach resorts, or executive hospitality suites.',
    iconName: 'Hotel',
  },
  {
    id: 'commercial_space',
    name: 'Office Space / Shop / Showroom',
    category: 'commercial',
    description: 'Prime retail units, banking halls, corporate offices, or warehouses.',
    iconName: 'Briefcase',
  },
];

