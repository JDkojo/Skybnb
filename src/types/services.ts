export type ServiceType =
  | 'property_management'
  | 'land_title_search'
  | 'tenant_placement'
  | 'facility_maintenance'
  | 'property_valuation'
  | 'marketing_mandate';

export type ServiceRequestStatus =
  | 'new'
  | 'consultation_scheduled'
  | 'proposal_sent'
  | 'contract_signed'
  | 'completed'
  | 'declined';

export interface ServiceRequest {
  id: string;
  service_type: ServiceType;
  client_name: string;
  client_phone: string;
  client_whatsapp: string;
  client_email: string;
  property_location: string;
  property_type: string;
  estimated_value_or_rent?: string;
  units_count?: number;
  notes: string;
  status: ServiceRequestStatus;
  priority: 'high' | 'medium' | 'normal';
  created_at: string;
}

export type ManagedPropertyType =
  | 'Residential Apartments'
  | 'Single Family Villa'
  | 'Student Hostel'
  | 'Commercial Complex'
  | 'Gated Land Estate';

export interface ManagedProperty {
  id: string;
  name: string;
  location: string;
  city: string;
  property_type: ManagedPropertyType;
  total_units: number;
  occupied_units: number;
  monthly_rent_total: number; // in GHS
  management_fee_rate: number; // percentage (e.g. 8%, 10%)
  owner_name: string;
  owner_phone: string;
  owner_whatsapp: string;
  assigned_manager: string;
  status: 'active' | 'pending_handover' | 'renovation' | 'inactive';
  image: string;
  rent_cycle: 'monthly' | 'quarterly' | 'bi-annual' | 'annual';
  last_inspection_date: string;
  next_inspection_date: string;
}

export type MaintenanceCategory =
  | 'Plumbing'
  | 'Electrical'
  | 'Generator / Power'
  | 'Water Pump / Borehole'
  | 'Painting & Structural'
  | 'Security / Locks'
  | 'AC / Ventilation';

export type MaintenancePriority = 'urgent' | 'high' | 'medium' | 'low';
export type MaintenanceStatus = 'open' | 'in_progress' | 'completed' | 'billed_to_owner';

export interface MaintenanceTicket {
  id: string;
  managed_property_id: string;
  property_name: string;
  unit_number?: string;
  category: MaintenanceCategory;
  title: string;
  description: string;
  reported_by: string;
  tenant_phone: string;
  priority: MaintenancePriority;
  estimated_cost: number; // in GHS
  status: MaintenanceStatus;
  assigned_artisan?: string;
  created_at: string;
}

export type LandSearchDivision =
  | 'Public & Vested Lands (PVLMD)'
  | 'Land Registration Division (LRD)'
  | 'Survey & Mapping Division';

export type LandSearchStage =
  | 'Search Lodged'
  | 'Survey Digitization'
  | 'Records & Archive Search'
  | 'Search Report Ready'
  | 'Clear Title Confirmed'
  | 'Encumbrance Flagged';

export interface LandSearchRecord {
  id: string;
  client_name: string;
  client_phone: string;
  parcel_location: string;
  cadastral_plan_no: string;
  approx_acres: string;
  claimed_grantor: string;
  search_division: LandSearchDivision;
  stage: LandSearchStage;
  officer_notes: string;
  status: 'in_progress' | 'cleared' | 'caution_flagged';
  date_lodged: string;
}
