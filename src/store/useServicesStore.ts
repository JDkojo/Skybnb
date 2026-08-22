import { create } from 'zustand';
import {
  ServiceRequest,
  ManagedProperty,
  MaintenanceTicket,
  LandSearchRecord,
  ServiceRequestStatus,
  MaintenanceStatus,
} from '../types/services';
import {
  initialServiceRequests,
  initialManagedProperties,
  initialMaintenanceTickets,
  initialLandSearchRecords,
} from '../data/servicesData';

interface ServicesState {
  serviceRequests: ServiceRequest[];
  managedProperties: ManagedProperty[];
  maintenanceTickets: MaintenanceTicket[];
  landSearches: LandSearchRecord[];

  // Actions
  addServiceRequest: (request: Omit<ServiceRequest, 'id' | 'created_at'>) => ServiceRequest;
  updateServiceRequestStatus: (id: string, status: ServiceRequestStatus) => void;

  addManagedProperty: (prop: Omit<ManagedProperty, 'id'>) => ManagedProperty;
  updateManagedPropertyStatus: (id: string, status: ManagedProperty['status']) => void;

  addMaintenanceTicket: (ticket: Omit<MaintenanceTicket, 'id' | 'created_at'>) => MaintenanceTicket;
  updateMaintenanceStatus: (id: string, status: MaintenanceStatus) => void;

  addLandSearch: (record: Omit<LandSearchRecord, 'id' | 'date_lodged'>) => LandSearchRecord;
  updateLandSearchStatus: (
    id: string,
    status: LandSearchRecord['status'],
    stage: LandSearchRecord['stage'],
    notes?: string
  ) => void;
}

const STORAGE_KEYS = {
  REQUESTS: 'valpromark_service_requests_v1',
  MANAGED: 'valpromark_managed_properties_v1',
  MAINTENANCE: 'valpromark_maintenance_tickets_v1',
  LAND_SEARCH: 'valpromark_land_searches_v1',
};

const getStored = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
    return fallback;
  }
};

const setStored = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key} to storage:`, err);
  }
};

export const useServicesStore = create<ServicesState>((set) => ({
  serviceRequests: getStored<ServiceRequest[]>(STORAGE_KEYS.REQUESTS, initialServiceRequests),
  managedProperties: getStored<ManagedProperty[]>(STORAGE_KEYS.MANAGED, initialManagedProperties),
  maintenanceTickets: getStored<MaintenanceTicket[]>(STORAGE_KEYS.MAINTENANCE, initialMaintenanceTickets),
  landSearches: getStored<LandSearchRecord[]>(STORAGE_KEYS.LAND_SEARCH, initialLandSearchRecords),

  addServiceRequest: (requestData) => {
    const newReq: ServiceRequest = {
      ...requestData,
      id: `req-${Date.now().toString(36)}`,
      created_at: new Date().toISOString().split('T')[0],
    };

    set((state) => {
      const updated = [newReq, ...state.serviceRequests];
      setStored(STORAGE_KEYS.REQUESTS, updated);
      return { serviceRequests: updated };
    });

    return newReq;
  },

  updateServiceRequestStatus: (id, status) => {
    set((state) => {
      const updated = state.serviceRequests.map((r) => (r.id === id ? { ...r, status } : r));
      setStored(STORAGE_KEYS.REQUESTS, updated);
      return { serviceRequests: updated };
    });
  },

  addManagedProperty: (propData) => {
    const newProp: ManagedProperty = {
      ...propData,
      id: `mp-${Date.now().toString(36)}`,
    };

    set((state) => {
      const updated = [newProp, ...state.managedProperties];
      setStored(STORAGE_KEYS.MANAGED, updated);
      return { managedProperties: updated };
    });

    return newProp;
  },

  updateManagedPropertyStatus: (id, status) => {
    set((state) => {
      const updated = state.managedProperties.map((p) => (p.id === id ? { ...p, status } : p));
      setStored(STORAGE_KEYS.MANAGED, updated);
      return { managedProperties: updated };
    });
  },

  addMaintenanceTicket: (ticketData) => {
    const newTicket: MaintenanceTicket = {
      ...ticketData,
      id: `tkt-${Date.now().toString(36)}`,
      created_at: new Date().toISOString().split('T')[0],
    };

    set((state) => {
      const updated = [newTicket, ...state.maintenanceTickets];
      setStored(STORAGE_KEYS.MAINTENANCE, updated);
      return { maintenanceTickets: updated };
    });

    return newTicket;
  },

  updateMaintenanceStatus: (id, status) => {
    set((state) => {
      const updated = state.maintenanceTickets.map((t) => (t.id === id ? { ...t, status } : t));
      setStored(STORAGE_KEYS.MAINTENANCE, updated);
      return { maintenanceTickets: updated };
    });
  },

  addLandSearch: (recordData) => {
    const newRecord: LandSearchRecord = {
      ...recordData,
      id: `ls-${Date.now().toString(36)}`,
      date_lodged: new Date().toISOString().split('T')[0],
    };

    set((state) => {
      const updated = [newRecord, ...state.landSearches];
      setStored(STORAGE_KEYS.LAND_SEARCH, updated);
      return { landSearches: updated };
    });

    return newRecord;
  },

  updateLandSearchStatus: (id, status, stage, notes) => {
    set((state) => {
      const updated = state.landSearches.map((r) =>
        r.id === id ? { ...r, status, stage, officer_notes: notes ?? r.officer_notes } : r
      );
      setStored(STORAGE_KEYS.LAND_SEARCH, updated);
      return { landSearches: updated };
    });
  },
}));
