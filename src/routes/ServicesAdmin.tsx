import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Users,
  Wrench,
  FileCheck2,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Phone,
  MessageSquare,
  DollarSign,
  Calendar,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  LayoutDashboard,
  Check,
  X,
  MapPin,
  ExternalLink,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { useServicesStore } from '../store/useServicesStore';
import {
  ServiceType,
  ServiceRequestStatus,
  ManagedPropertyType,
  MaintenanceCategory,
  MaintenancePriority,
  MaintenanceStatus,
  LandSearchDivision,
  LandSearchStage,
} from '../types/services';

type TabKey = 'requests' | 'portfolio' | 'maintenance' | 'land_searches';

export default function ServicesAdmin() {
  const {
    serviceRequests,
    managedProperties,
    maintenanceTickets,
    landSearches,
    updateServiceRequestStatus,
    addServiceRequest,
    addManagedProperty,
    updateManagedPropertyStatus,
    addMaintenanceTicket,
    updateMaintenanceStatus,
    addLandSearch,
    updateLandSearchStatus,
  } = useServicesStore();

  const [activeTab, setActiveTab] = useState<TabKey>('requests');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals state
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [showAddTicketModal, setShowAddTicketModal] = useState(false);
  const [showAddLandSearchModal, setShowAddLandSearchModal] = useState(false);

  // Form states for modals
  const [newLeadForm, setNewLeadForm] = useState({
    service_type: 'property_management' as ServiceType,
    client_name: '',
    client_phone: '',
    client_whatsapp: '',
    client_email: '',
    property_location: '',
    property_type: 'Residential Apartments',
    estimated_value_or_rent: '',
    units_count: 1,
    notes: '',
    priority: 'high' as const,
  });

  const [newPropertyForm, setNewPropertyForm] = useState({
    name: '',
    location: '',
    city: 'Accra',
    property_type: 'Residential Apartments' as ManagedPropertyType,
    total_units: 4,
    occupied_units: 4,
    monthly_rent_total: 25000,
    management_fee_rate: 10,
    owner_name: '',
    owner_phone: '',
    owner_whatsapp: '',
    assigned_manager: 'Valpromark Operations Team',
    status: 'active' as const,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    rent_cycle: 'monthly' as const,
    last_inspection_date: new Date().toISOString().split('T')[0],
    next_inspection_date: new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0],
  });

  const [newTicketForm, setNewTicketForm] = useState({
    managed_property_id: managedProperties[0]?.id || '',
    property_name: managedProperties[0]?.name || 'Managed Property',
    unit_number: 'Unit 1',
    category: 'Plumbing' as MaintenanceCategory,
    title: '',
    description: '',
    reported_by: 'Tenant',
    tenant_phone: '',
    priority: 'high' as MaintenancePriority,
    estimated_cost: 500,
    status: 'open' as MaintenanceStatus,
    assigned_artisan: '',
  });

  const [newLandSearchForm, setNewLandSearchForm] = useState({
    client_name: '',
    client_phone: '',
    parcel_location: '',
    cadastral_plan_no: '',
    approx_acres: '1 Acre',
    claimed_grantor: '',
    search_division: 'Public & Vested Lands (PVLMD)' as LandSearchDivision,
    stage: 'Search Lodged' as LandSearchStage,
    officer_notes: 'Initial cadastral submission lodged at regional Lands Commission registry.',
    status: 'in_progress' as const,
  });

  // Derived metrics
  const totalRentRoll = managedProperties.reduce((acc, p) => acc + (p.monthly_rent_total || 0), 0);
  const totalCommission = managedProperties.reduce(
    (acc, p) => acc + (p.monthly_rent_total * (p.management_fee_rate / 100) || 0),
    0
  );
  const totalManagedUnits = managedProperties.reduce((acc, p) => acc + (p.total_units || 0), 0);
  const totalOccupiedUnits = managedProperties.reduce((acc, p) => acc + (p.occupied_units || 0), 0);
  const openTicketsCount = maintenanceTickets.filter((t) => t.status === 'open' || t.status === 'in_progress').length;
  const activeLandSearchesCount = landSearches.filter((l) => l.status === 'in_progress').length;

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#070D18] text-neutral-900 dark:text-white pb-24">
      {/* HEADER SECTION */}
      <section className="bg-[#0E1E38] text-white border-b border-[#1E3557] px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#C5A059]/20 text-[#E5C158] border border-[#C5A059]/30">
                  Valpromark Operations Hub
                </span>
                <span className="text-xs text-neutral-400">Ghana Property Management & Advisory</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                <LayoutDashboard className="w-7 h-7 text-[#C5A059]" />
                <span>Services & Property Management Admin</span>
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                to="/services"
                className="px-4 py-2 rounded-xl bg-[#0F1E33] hover:bg-[#152845] border border-[#1E3557] text-xs font-bold text-neutral-300 flex items-center gap-1.5 transition-colors"
              >
                <span>View Public Services Page</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C5A059]" />
              </Link>

              {activeTab === 'requests' && (
                <button
                  onClick={() => setShowAddLeadModal(true)}
                  className="px-4 py-2 rounded-xl bg-[#C5A059] hover:bg-[#d6b063] text-[#0E1E38] text-xs font-black flex items-center gap-1.5 shadow-md shadow-[#C5A059]/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Log Client Lead</span>
                </button>
              )}

              {activeTab === 'portfolio' && (
                <button
                  onClick={() => setShowAddPropertyModal(true)}
                  className="px-4 py-2 rounded-xl bg-[#C5A059] hover:bg-[#d6b063] text-[#0E1E38] text-xs font-black flex items-center gap-1.5 shadow-md shadow-[#C5A059]/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Managed Property</span>
                </button>
              )}

              {activeTab === 'maintenance' && (
                <button
                  onClick={() => setShowAddTicketModal(true)}
                  className="px-4 py-2 rounded-xl bg-[#C5A059] hover:bg-[#d6b063] text-[#0E1E38] text-xs font-black flex items-center gap-1.5 shadow-md shadow-[#C5A059]/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Log Artisan Ticket</span>
                </button>
              )}

              {activeTab === 'land_searches' && (
                <button
                  onClick={() => setShowAddLandSearchModal(true)}
                  className="px-4 py-2 rounded-xl bg-[#C5A059] hover:bg-[#d6b063] text-[#0E1E38] text-xs font-black flex items-center gap-1.5 shadow-md shadow-[#C5A059]/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Land Search File</span>
                </button>
              )}
            </div>
          </div>

          {/* KEY PERFORMANCE METRIC CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-[#0F1E33]/90 border border-[#1E3557] space-y-1">
              <p className="text-[11px] font-bold uppercase text-neutral-400">Total Monthly Rent Managed</p>
              <p className="text-lg sm:text-xl font-black text-[#E5C158]">
                GH₵ {totalRentRoll.toLocaleString()}
              </p>
              <p className="text-[10px] text-neutral-400">
                Mgmt Commission: ~GH₵ {Math.round(totalCommission).toLocaleString()}/mo
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0F1E33]/90 border border-[#1E3557] space-y-1">
              <p className="text-[11px] font-bold uppercase text-neutral-400">Managed Portfolio</p>
              <p className="text-lg sm:text-xl font-black text-white">
                {managedProperties.length} Properties
              </p>
              <p className="text-[10px] text-emerald-400 font-bold">
                {totalOccupiedUnits} / {totalManagedUnits} Units Occupied ({Math.round((totalOccupiedUnits / (totalManagedUnits || 1)) * 100)}%)
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0F1E33]/90 border border-[#1E3557] space-y-1">
              <p className="text-[11px] font-bold uppercase text-neutral-400">Client Service Leads</p>
              <p className="text-lg sm:text-xl font-black text-[#E5C158]">
                {serviceRequests.length} Leads
              </p>
              <p className="text-[10px] text-neutral-300">
                {serviceRequests.filter((r) => r.status === 'new' || r.status === 'consultation_scheduled').length} Pending Action
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0F1E33]/90 border border-[#1E3557] space-y-1">
              <p className="text-[11px] font-bold uppercase text-neutral-400">Open Maintenance</p>
              <p className="text-lg sm:text-xl font-black text-rose-400">
                {openTicketsCount} Active Tickets
              </p>
              <p className="text-[10px] text-neutral-400">
                Artisan dispatch active
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0F1E33]/90 border border-[#1E3557] space-y-1 col-span-2 sm:col-span-1">
              <p className="text-[11px] font-bold uppercase text-neutral-400">Lands Title Due Diligence</p>
              <p className="text-lg sm:text-xl font-black text-[#E5C158]">
                {activeLandSearchesCount} In-Progress
              </p>
              <p className="text-[10px] text-neutral-400">
                {landSearches.length} Total Searched
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD BODY */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* NAV TABS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-neutral-200 dark:border-[#1E3557] scrollbar-none">
          <button
            onClick={() => {
              setActiveTab('requests');
              setStatusFilter('all');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'requests'
                ? 'bg-[#C5A059] text-[#0E1E38] shadow-md shadow-[#C5A059]/20'
                : 'bg-white dark:bg-[#0F1E33] border border-neutral-200 dark:border-[#1E3557] text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Service Leads & Inquiries ({serviceRequests.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('portfolio');
              setStatusFilter('all');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'portfolio'
                ? 'bg-[#C5A059] text-[#0E1E38] shadow-md shadow-[#C5A059]/20'
                : 'bg-white dark:bg-[#0F1E33] border border-neutral-200 dark:border-[#1E3557] text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Managed Properties ({managedProperties.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('maintenance');
              setStatusFilter('all');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'maintenance'
                ? 'bg-[#C5A059] text-[#0E1E38] shadow-md shadow-[#C5A059]/20'
                : 'bg-white dark:bg-[#0F1E33] border border-neutral-200 dark:border-[#1E3557] text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Artisan Maintenance ({maintenanceTickets.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('land_searches');
              setStatusFilter('all');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'land_searches'
                ? 'bg-[#C5A059] text-[#0E1E38] shadow-md shadow-[#C5A059]/20'
                : 'bg-white dark:bg-[#0F1E33] border border-neutral-200 dark:border-[#1E3557] text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Lands Due Diligence ({landSearches.length})</span>
          </button>
        </div>

        {/* ===================== TAB 1: SERVICE LEADS & INQUIRIES ===================== */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#0F1E33] p-4 rounded-3xl border border-neutral-200 dark:border-[#1E3557]">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search leads by client name, location, or notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-neutral-50 dark:bg-[#0A1422] border border-neutral-200 dark:border-[#1E3557] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-neutral-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl text-xs bg-neutral-50 dark:bg-[#0A1422] border border-neutral-200 dark:border-[#1E3557] text-neutral-700 dark:text-neutral-300 focus:outline-none"
                >
                  <option value="all">All Lead Statuses</option>
                  <option value="new">New Requests</option>
                  <option value="consultation_scheduled">Consultation Scheduled</option>
                  <option value="proposal_sent">Proposal Sent</option>
                  <option value="contract_signed">Contract Signed</option>
                  <option value="completed">Completed</option>
                  <option value="declined">Declined</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {serviceRequests
                .filter((r) => {
                  const matchQuery =
                    r.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    r.property_location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    r.notes.toLowerCase().includes(searchQuery.toLowerCase());
                  const matchStatus = statusFilter === 'all' || r.status === statusFilter;
                  return matchQuery && matchStatus;
                })
                .map((req) => (
                  <div
                    key={req.id}
                    className="p-5 rounded-3xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] space-y-4 hover:border-[#C5A059]/40 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30">
                            {req.service_type.replace('_', ' ')}
                          </span>
                          <strong className="text-sm font-bold text-neutral-900 dark:text-white">
                            {req.client_name}
                          </strong>
                          <span className="text-xs text-neutral-400">· {req.created_at}</span>
                        </div>
                        <p className="text-xs text-neutral-600 dark:text-neutral-300 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                          <span>{req.property_location}</span>
                          <span className="text-neutral-400 font-normal">({req.property_type} {req.units_count ? `· ${req.units_count} Units` : ''})</span>
                        </p>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase">Status:</span>
                        <select
                          value={req.status}
                          onChange={(e) => updateServiceRequestStatus(req.id, e.target.value as ServiceRequestStatus)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                            req.status === 'contract_signed' || req.status === 'completed'
                              ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                              : req.status === 'consultation_scheduled' || req.status === 'proposal_sent'
                              ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                              : req.status === 'new'
                              ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30'
                              : 'bg-neutral-500/15 text-neutral-400 border-neutral-500/30'
                          }`}
                        >
                          <option value="new">New Request</option>
                          <option value="consultation_scheduled">Consultation Scheduled</option>
                          <option value="proposal_sent">Proposal Sent</option>
                          <option value="contract_signed">Contract Signed</option>
                          <option value="completed">Completed</option>
                          <option value="declined">Declined</option>
                        </select>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-[#0A1422] border border-neutral-100 dark:border-[#1E3557]/60 text-xs text-neutral-600 dark:text-neutral-300">
                      <p className="font-semibold text-neutral-700 dark:text-neutral-200 mb-0.5">
                        Client Scope & Financials: {req.estimated_value_or_rent || 'Consultation requested'}
                      </p>
                      <p className="italic">"{req.notes}"</p>
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                        <span>📞 {req.client_phone}</span>
                        {req.client_email && <span>✉️ {req.client_email}</span>}
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`https://wa.me/${req.client_whatsapp || req.client_phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Hello ${req.client_name}, this is Valpromark Property Management Services in Accra regarding your request for ${req.service_type.replace('_', ' ')} in ${req.property_location}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp Client</span>
                        </a>

                        <a
                          href={`tel:${req.client_phone}`}
                          className="px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-[#1E3557] hover:bg-neutral-200 text-neutral-800 dark:text-neutral-200 font-bold text-xs flex items-center gap-1.5"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                          <span>Call</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ===================== TAB 2: MANAGED PROPERTIES PORTFOLIO ===================== */}
        {activeTab === 'portfolio' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {managedProperties.map((prop) => (
                <div
                  key={prop.id}
                  className="rounded-3xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="aspect-[16/8] relative overflow-hidden">
                      <img src={prop.image} alt={prop.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0E1E38] via-transparent to-transparent opacity-80" />
                      <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                        <div>
                          <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-[#C5A059] text-[#0E1E38]">
                            {prop.property_type}
                          </span>
                          <h3 className="text-base font-black text-white drop-shadow-md mt-1">{prop.name}</h3>
                          <p className="text-xs text-neutral-200 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#E5C158]" />
                            <span>{prop.location}</span>
                          </p>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-600 text-white uppercase">
                          {prop.status}
                        </span>
                      </div>
                    </div>

                    {/* Property Specs & Financials */}
                    <div className="p-5 space-y-4">
                      <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-neutral-50 dark:bg-[#0A1422] border border-neutral-100 dark:border-[#1E3557]/60 text-center">
                        <div>
                          <p className="text-[10px] text-neutral-400 font-bold uppercase">Monthly Rent</p>
                          <p className="text-xs font-black text-[#C5A059]">
                            GH₵ {prop.monthly_rent_total.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-neutral-400 font-bold uppercase">Mgmt Fee ({prop.management_fee_rate}%)</p>
                          <p className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                            GH₵ {Math.round(prop.monthly_rent_total * (prop.management_fee_rate / 100)).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-neutral-400 font-bold uppercase">Occupancy</p>
                          <p className="text-xs font-black text-neutral-900 dark:text-white">
                            {prop.occupied_units} / {prop.total_units} Units
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-300">
                        <p>
                          <strong className="text-neutral-900 dark:text-white">Owner:</strong> {prop.owner_name} ({prop.owner_phone})
                        </p>
                        <p>
                          <strong className="text-neutral-900 dark:text-white">Assigned Valpromark Lead:</strong> {prop.assigned_manager}
                        </p>
                        <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
                          <span>Last Inspected: {prop.last_inspection_date}</span>
                          <span className="text-[#C5A059] font-bold">Next Routine: {prop.next_inspection_date}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-neutral-50 dark:bg-[#0A1422] border-t border-neutral-100 dark:border-[#1E3557]/60 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${prop.owner_whatsapp || prop.owner_phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Owner WhatsApp</span>
                      </a>
                      <a
                        href={`tel:${prop.owner_phone}`}
                        className="p-1.5 rounded-xl border border-neutral-200 dark:border-[#1E3557] text-neutral-600 dark:text-neutral-300"
                        title="Call Landlord"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTicketProperty(prop);
                        setShowAddTicketModal(true);
                      }}
                      className="text-xs font-bold text-[#C5A059] hover:underline flex items-center gap-1"
                    >
                      <Wrench className="w-3.5 h-3.5" />
                      <span>Log Ticket</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB 3: ARTISAN & MAINTENANCE TICKETS ===================== */}
        {activeTab === 'maintenance' && (
          <div className="space-y-4">
            <div className="space-y-3">
              {maintenanceTickets.map((tkt) => (
                <div
                  key={tkt.id}
                  className="p-5 rounded-3xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            tkt.priority === 'urgent'
                              ? 'bg-rose-500/20 text-rose-500 border border-rose-500/30'
                              : tkt.priority === 'high'
                              ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
                              : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          }`}
                        >
                          {tkt.priority} Priority
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-100 dark:bg-[#1E3557] text-neutral-700 dark:text-neutral-200">
                          {tkt.category}
                        </span>
                        <strong className="text-sm font-bold text-neutral-900 dark:text-white">
                          {tkt.title}
                        </strong>
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                        Property: <strong className="text-[#C5A059]">{tkt.property_name}</strong> {tkt.unit_number ? `(${tkt.unit_number})` : ''} · Reported on {tkt.created_at}
                      </p>
                    </div>

                    {/* Status update selector */}
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase">Status:</span>
                      <select
                        value={tkt.status}
                        onChange={(e) => updateMaintenanceStatus(tkt.id, e.target.value as MaintenanceStatus)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                          tkt.status === 'completed' || tkt.status === 'billed_to_owner'
                            ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                            : tkt.status === 'in_progress'
                            ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                            : 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30'
                        }`}
                      >
                        <option value="open">Open / Pending Artisan</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="billed_to_owner">Billed to Owner</option>
                      </select>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed bg-neutral-50 dark:bg-[#0A1422] p-3 rounded-2xl border border-neutral-100 dark:border-[#1E3557]/60">
                    {tkt.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    <div className="space-y-0.5">
                      <p>
                        <strong>Reported by:</strong> {tkt.reported_by} ({tkt.tenant_phone})
                      </p>
                      <p>
                        <strong>Assigned Artisan:</strong> {tkt.assigned_artisan || 'Unassigned'}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] uppercase font-bold text-neutral-400">Estimated Cost</p>
                      <p className="text-sm font-black text-[#C5A059]">GH₵ {tkt.estimated_cost.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB 4: LANDS COMMISSION DUE DILIGENCE ===================== */}
        {activeTab === 'land_searches' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {landSearches.map((ls) => (
                <div
                  key={ls.id}
                  className="p-5 rounded-3xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30">
                        {ls.cadastral_plan_no}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          ls.status === 'cleared'
                            ? 'bg-emerald-600 text-white'
                            : ls.status === 'caution_flagged'
                            ? 'bg-rose-600 text-white'
                            : 'bg-amber-500 text-neutral-950'
                        }`}
                      >
                        {ls.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-white">{ls.parcel_location}</h4>
                      <p className="text-xs text-[#C5A059] font-medium mt-0.5">Scale: {ls.approx_acres}</p>
                    </div>

                    <div className="space-y-1 text-xs text-neutral-600 dark:text-neutral-300">
                      <p>
                        <strong>Client:</strong> {ls.client_name} ({ls.client_phone})
                      </p>
                      <p>
                        <strong>Claimed Grantor:</strong> {ls.claimed_grantor}
                      </p>
                      <p>
                        <strong>Lands Division:</strong> {ls.search_division}
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-[#0A1422] border border-neutral-100 dark:border-[#1E3557]/60 space-y-1">
                      <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                        Stage: <span className="text-[#C5A059]">{ls.stage}</span>
                      </p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-300 italic">
                        "{ls.officer_notes}"
                      </p>
                    </div>
                  </div>

                  {/* Update Stage & Status */}
                  <div className="pt-2 border-t border-neutral-100 dark:border-[#1E3557]/60 space-y-2">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase block">
                      Update Search Stage:
                    </label>
                    <select
                      value={ls.stage}
                      onChange={(e) => {
                        const newStage = e.target.value as LandSearchStage;
                        const newStatus =
                          newStage === 'Clear Title Confirmed'
                            ? 'cleared'
                            : newStage === 'Encumbrance Flagged'
                            ? 'caution_flagged'
                            : 'in_progress';
                        updateLandSearchStatus(ls.id, newStatus, newStage);
                      }}
                      className="w-full px-3 py-1.5 rounded-xl text-xs bg-neutral-50 dark:bg-[#0A1422] border border-neutral-200 dark:border-[#1E3557] text-neutral-800 dark:text-white"
                    >
                      <option value="Search Lodged">Search Lodged</option>
                      <option value="Survey Digitization">Survey Digitization</option>
                      <option value="Records & Archive Search">Records & Archive Search</option>
                      <option value="Search Report Ready">Search Report Ready</option>
                      <option value="Clear Title Confirmed">Clear Title Confirmed</option>
                      <option value="Encumbrance Flagged">Encumbrance Flagged</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ===================== MODALS ===================== */}

      {/* 1. ADD CLIENT LEAD MODAL */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0F1E33] border border-neutral-200 dark:border-[#1E3557] rounded-3xl p-6 max-w-lg w-full space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-[#1E3557] pb-3">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">Log New Client Lead / Mandate</h3>
              <button onClick={() => setShowAddLeadModal(false)} className="p-1 rounded-lg text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                addServiceRequest({
                  ...newLeadForm,
                  client_whatsapp: newLeadForm.client_whatsapp || newLeadForm.client_phone.replace(/[^0-9]/g, ''),
                  units_count: Number(newLeadForm.units_count) || 1,
                  status: 'new',
                });
                setShowAddLeadModal(false);
              }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-400 uppercase">Service Category</label>
                <select
                  value={newLeadForm.service_type}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, service_type: e.target.value as ServiceType })}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 dark:bg-[#0A1422] border border-neutral-200 dark:border-[#1E3557]"
                >
                  <option value="property_management">Full Property & Facility Management</option>
                  <option value="land_title_search">Lands Commission Title Search</option>
                  <option value="tenant_placement">Tenant Screening & Placement</option>
                  <option value="facility_maintenance">Facility Maintenance</option>
                  <option value="property_valuation">Property Valuation & Advisory</option>
                  <option value="marketing_mandate">Exclusive Property Marketing Mandate</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-400 uppercase">Client Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nana Kwame"
                    value={newLeadForm.client_name}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, client_name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 dark:bg-[#0A1422] border border-neutral-200 dark:border-[#1E3557]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-400 uppercase">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+233 24..."
                    value={newLeadForm.client_phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, client_phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 dark:bg-[#0A1422] border border-neutral-200 dark:border-[#1E3557]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-400 uppercase">Property Location in Ghana *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cantonments, East Legon, Prampram"
                  value={newLeadForm.property_location}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, property_location: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 dark:bg-[#0A1422] border border-neutral-200 dark:border-[#1E3557]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-400 uppercase">Scope & Notes</label>
                <textarea
                  rows={2}
                  placeholder="Details about units, rent rate, landlord expectations..."
                  value={newLeadForm.notes}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 dark:bg-[#0A1422] border border-neutral-200 dark:border-[#1E3557]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-neutral-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C5A059] text-[#0E1E38] font-bold text-xs"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. ADD MANAGED PROPERTY MODAL */}
      {showAddPropertyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0F1E33] border border-neutral-200 dark:border-[#1E3557] rounded-3xl p-6 max-w-lg w-full space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-[#1E3557] pb-3">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">Add Managed Property to Portfolio</h3>
              <button onClick={() => setShowAddPropertyModal(false)} className="p-1 rounded-lg text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                addManagedProperty({
                  ...newPropertyForm,
                  total_units: Number(newPropertyForm.total_units) || 1,
                  occupied_units: Number(newPropertyForm.occupied_units) || 1,
                  monthly_rent_total: Number(newPropertyForm.monthly_rent_total) || 10000,
                  management_fee_rate: Number(newPropertyForm.management_fee_rate) || 10,
                });
                setShowAddPropertyModal(false);
              }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-400 uppercase">Property Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Airport Hills Executive Villa"
                  value={newPropertyForm.name}
                  onChange={(e) => setNewPropertyForm({ ...newPropertyForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 dark:bg-[#0A1422] border border-neutral-200 dark:border-[#1E3557]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-400 uppercase">Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Airport Hills, Accra"
                    value={newPropertyForm.location}
                    onChange={(e) => setNewPropertyForm({ ...newPropertyForm, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 dark:bg-[#0A1422] border border-neutral-200 dark:border-[#1E3557]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-400 uppercase">Property Type</label>
                  <select
                    value={newPropertyForm.property_type}
                    onChange={(e) => setNewPropertyForm({ ...newPropertyForm, property_type: e.target.value as ManagedPropertyType })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 dark:bg-[#0A1422] border border-neutral-200 dark:border-[#1E3557]"
                  >
                    <option value="Residential Apartments">Residential Apartments</option>
                    <option value="Single Family Villa">Single Family Villa</option>
                    <option value="Student Hostel">Student Hostel</option>
                    <option value="Commercial Complex">Commercial Complex</option>
                    <option value="Gated Land Estate">Gated Land Estate</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-400 uppercase">Total Units</label>
                  <input
                    type="number"
                    value={newPropertyForm.total_units}
                    onChange={(e) => setNewPropertyForm({ ...newPropertyForm, total_units: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 dark:bg-[#0A1422] border border-neutral-200 dark:border-[#1E3557]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-400 uppercase">Monthly Rent (GH₵)</label>
                  <input
                    type="number"
                    value={newPropertyForm.monthly_rent_total}
                    onChange={(e) => setNewPropertyForm({ ...newPropertyForm, monthly_rent_total: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 dark:bg-[#0A1422] border border-neutral-200 dark:border-[#1E3557]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-400 uppercase">Mgmt Fee %</label>
                  <input
                    type="number"
                    value={newPropertyForm.management_fee_rate}
                    onChange={(e) => setNewPropertyForm({ ...newPropertyForm, management_fee_rate: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 dark:bg-[#0A1422] border border-neutral-200 dark:border-[#1E3557]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-400 uppercase">Owner Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Kwame Osei"
                    value={newPropertyForm.owner_name}
                    onChange={(e) => setNewPropertyForm({ ...newPropertyForm, owner_name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 dark:bg-[#0A1422] border border-neutral-200 dark:border-[#1E3557]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-400 uppercase">Owner Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+233..."
                    value={newPropertyForm.owner_phone}
                    onChange={(e) => setNewPropertyForm({ ...newPropertyForm, owner_phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 dark:bg-[#0A1422] border border-neutral-200 dark:border-[#1E3557]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddPropertyModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-neutral-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C5A059] text-[#0E1E38] font-bold text-xs"
                >
                  Add Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. ADD MAINTENANCE TICKET MODAL */}
      {showAddTicketModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0F1E33] border border-neutral-200 dark:border-[#1E3557] rounded-3xl p-6 max-w-lg w-full space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-[#1E3557] pb-3">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">Log Artisan Maintenance Ticket</h3>
              <button onClick={() => setShowAddTicketModal(false)} className="p-1 rounded-lg text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                addMaintenanceTicket({
                  ...newTicketForm,
                  estimated_cost: Number(newTicketForm.estimated_cost) || 300,
                  status: 'open',
                });
                setShowAddTicketModal(false);
              }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-400 uppercase">Target Property *</label>
                <select
                  value={newTicketForm.managed_property_id}
                  onChange={(e) => {
                    const sel = managedProperties.find((p) => p.id === e.target.value);
                    setNewTicketForm({
                      ...newTicketForm,
                      managed_property_id: e.target.value,
                      property_name: sel?.name || 'Managed Property',
                    });
                  }}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 dark:bg-[#0A1422] border border-neutral-200 dark:border-[#1E3557]"
                >
                  {managedProperties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.location})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-400 uppercase">Category</label>
                  <select
                    value={newTicketForm.category}
                    onChange={(e) => setNewTicketForm({ ...newTicketForm, category: e.target.value as MaintenanceCategory })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 dark:bg-[#0A1422] border border-neutral-200 dark:border-[#1E3557]"
                  >
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Generator / Power">Generator / Power</option>
                    <option value="Water Pump / Borehole">Water Pump / Borehole</option>
                    <option value="Painting & Structural">Painting & Structural</option>
                    <option value="Security / Locks">Security / Locks</option>
                    <option value="AC / Ventilation">AC / Ventilation</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-400 uppercase">Priority</label>
                  <select
                    value={newTicketForm.priority}
                    onChange={(e) => setNewTicketForm({ ...newTicketForm, priority: e.target.value as MaintenancePriority })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 dark:bg-[#0A1422] border border-neutral-200 dark:border-[#1E3557]"
                  >
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-400 uppercase">Issue Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Burst kitchen drain pipe under sink"
                  value={newTicketForm.title}
                  onChange={(e) => setNewTicketForm({ ...newTicketForm, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 dark:bg-[#0A1422] border border-neutral-200 dark:border-[#1E3557]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-400 uppercase">Description & Artisan Notes</label>
                <textarea
                  rows={2}
                  placeholder="Details of required materials and scope..."
                  value={newTicketForm.description}
                  onChange={(e) => setNewTicketForm({ ...newTicketForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 dark:bg-[#0A1422] border border-neutral-200 dark:border-[#1E3557]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-400 uppercase">Assigned Artisan</label>
                  <input
                    type="text"
                    placeholder="e.g. Master Kojo (Plumbing)"
                    value={newTicketForm.assigned_artisan}
                    onChange={(e) => setNewTicketForm({ ...newTicketForm, assigned_artisan: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 dark:bg-[#0A1422] border border-neutral-200 dark:border-[#1E3557]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-400 uppercase">Est. Cost (GH₵)</label>
                  <input
                    type="number"
                    value={newTicketForm.estimated_cost}
                    onChange={(e) => setNewTicketForm({ ...newTicketForm, estimated_cost: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 dark:bg-[#0A1422] border border-neutral-200 dark:border-[#1E3557]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddTicketModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-neutral-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C5A059] text-[#0E1E38] font-bold text-xs"
                >
                  Log Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. ADD LAND SEARCH MODAL */}
      {showAddLandSearchModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0F1E33] border border-neutral-200 dark:border-[#1E3557] rounded-3xl p-6 max-w-lg w-full space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-[#1E3557] pb-3">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">New Lands Due Diligence Search</h3>
              <button onClick={() => setShowAddLandSearchModal(false)} className="p-1 rounded-lg text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                addLandSearch(newLandSearchForm);
                setShowAddLandSearchModal(false);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-400 uppercase">Client Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mrs. Abigail Mensah"
                    value={newLandSearchForm.client_name}
                    onChange={(e) => setNewLandSearchForm({ ...newLandSearchForm, client_name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 dark:bg-[#0A1422] border border-neutral-200 dark:border-[#1E3557]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-400 uppercase">Client Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+233..."
                    value={newLandSearchForm.client_phone}
                    onChange={(e) => setNewLandSearchForm({ ...newLandSearchForm, client_phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 dark:bg-[#0A1422] border border-neutral-200 dark:border-[#1E3557]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-400 uppercase">Parcel Location *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Prampram Phase 2, Kpone-Katamanso District"
                  value={newLandSearchForm.parcel_location}
                  onChange={(e) => setNewLandSearchForm({ ...newLandSearchForm, parcel_location: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 dark:bg-[#0A1422] border border-neutral-200 dark:border-[#1E3557]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-400 uppercase">Cadastral Plan No. *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. LC/GAR/2026/0942"
                    value={newLandSearchForm.cadastral_plan_no}
                    onChange={(e) => setNewLandSearchForm({ ...newLandSearchForm, cadastral_plan_no: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 dark:bg-[#0A1422] border border-neutral-200 dark:border-[#1E3557]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-400 uppercase">Claimed Grantor</label>
                  <input
                    type="text"
                    placeholder="e.g. Prampram Stool / Family"
                    value={newLandSearchForm.claimed_grantor}
                    onChange={(e) => setNewLandSearchForm({ ...newLandSearchForm, claimed_grantor: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 dark:bg-[#0A1422] border border-neutral-200 dark:border-[#1E3557]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-400 uppercase">Lands Commission Division</label>
                <select
                  value={newLandSearchForm.search_division}
                  onChange={(e) => setNewLandSearchForm({ ...newLandSearchForm, search_division: e.target.value as LandSearchDivision })}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 dark:bg-[#0A1422] border border-neutral-200 dark:border-[#1E3557]"
                >
                  <option value="Public & Vested Lands (PVLMD)">Public & Vested Lands (PVLMD)</option>
                  <option value="Land Registration Division (LRD)">Land Registration Division (LRD)</option>
                  <option value="Survey & Mapping Division">Survey & Mapping Division</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddLandSearchModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-neutral-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C5A059] text-[#0E1E38] font-bold text-xs"
                >
                  Lodged File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper to keep track of property selection in modal
let selectedTicketProperty: any = null;
function setSelectedTicketProperty(prop: any) {
  selectedTicketProperty = prop;
}
