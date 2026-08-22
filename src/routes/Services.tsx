import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  ShieldCheck,
  Users,
  Wrench,
  FileCheck2,
  TrendingUp,
  PhoneCall,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Send,
  MessageSquare,
  LayoutDashboard,
  MapPin,
  FileText,
  BadgeCheck,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { useServicesStore } from '../store/useServicesStore';
import { ServiceType } from '../types/services';

const SERVICE_ITEMS: {
  id: ServiceType;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  icon: any;
  benefits: string[];
  pricing: string;
}[] = [
  {
    id: 'property_management',
    title: 'Full Property & Facility Management',
    badge: 'Popular for Diaspora & Landlords',
    tagline: 'Stress-free tenant care, rent collection & facility oversight across Ghana',
    description:
      'We take 100% burden off property owners and diaspora investors. From tenant screening and prompt rent remittance to 24/7 facility maintenance and routine physical inspections, your property is managed with institutional discipline.',
    icon: Building2,
    benefits: [
      'Automated tenant vetting, Ghana Card check & Rent Act agreement drafting',
      'Timely rent collection & monthly direct bank/MoMo reconciliation reports',
      'Routine physical property inspections with photo & video updates for diaspora owners',
      'Preventive maintenance (plumbing, electrical, generator servicing & water pumps)',
    ],
    pricing: 'Standard 8% – 10% monthly rent management commission',
  },
  {
    id: 'land_title_search',
    title: 'Lands Commission Title Search & Due Diligence',
    badge: 'Critical Land Safety',
    tagline: 'Avoid litigation & double-sales with comprehensive official land verification',
    description:
      'Before paying for land in Greater Accra, Central, Eastern, or Ashanti regions, our legal and cadastral team conducts deep searches across all Lands Commission divisions to confirm legitimate ownership, site plan accuracy, and absence of court disputes.',
    icon: FileCheck2,
    benefits: [
      'Official search at Public & Vested Lands Division (PVLMD) and Land Registration (LRD)',
      'Cadastral survey boundary verification against regional layout masterplans',
      'Stool / Family grantor capacity confirmation & litigation history checks',
      'Formal stamped Valpromark Due Diligence & Risk Advisory Report delivered within 5–7 days',
    ],
    pricing: 'Flat fee per site plan search (GH₵ 1,200 – GH₵ 2,500 depending on region)',
  },
  {
    id: 'tenant_placement',
    title: 'Tenant Screening & Placement',
    badge: 'Reliable Tenants',
    tagline: 'Find high-quality, verified tenants for your houses, apartments, and student hostels',
    description:
      'We market your vacant property across Ghana and our diaspora network, vet applicants through background checks and income verification, and execute legally binding tenancy agreements.',
    icon: Users,
    benefits: [
      'Rigorous tenant background checks, employer verification & guarantor endorsement',
      'Strict adherence to Ghana Rent Act regulations (Act 220 / Rent Bill)',
      'Security deposit escrow holding & detailed inventory handover checklist',
      'Targeted marketing to corporate expats, families, and verified university students',
    ],
    pricing: 'One-time placement fee or included in Full Management',
  },
  {
    id: 'facility_maintenance',
    title: 'Facility Maintenance & Renovation',
    badge: 'Certified Artisans',
    tagline: 'Rapid response maintenance, generator care, borehole water systems & repairs',
    description:
      'Our team of certified Ghanaian electricians, plumbers, masons, and HVAC technicians ensures your buildings, student hostels, and estates remain in pristine condition with transparent billing.',
    icon: Wrench,
    benefits: [
      'Borehole filtration systems, overhead tank booster pumps & water management',
      'Standby generator servicing (Perkins, Cummins, FG Wilson) & ATS switches',
      'Pre-tenancy and post-tenancy painting, deep cleaning & structural touch-ups',
      'Emergency 24/7 callout for electrical trips, burst pipes, and roof leakages',
    ],
    pricing: 'Itemized material + artisan rate with zero hidden markups',
  },
  {
    id: 'property_valuation',
    title: 'Property Valuation & Investment Advisory',
    badge: 'Data-Driven Insights',
    tagline: 'Know the true market value of your lands, residential homes, and commercial assets',
    description:
      'Make informed investment decisions with formal property appraisals for sales, bank financing, estate planning, and diaspora portfolio diversification in prime Ghana growth corridors.',
    icon: TrendingUp,
    benefits: [
      'Comparative Market Analysis (CMA) for Accra, Kumasi, Takoradi, and Prampram corridors',
      'Rental yield projections & capital growth forecasting',
      'Feasibility studies for student hostel developments & gated parcel subdivisions',
      'Professional appraisal certificates accepted by commercial banks and institutions',
    ],
    pricing: 'Based on asset scale & valuation purpose',
  },
  {
    id: 'marketing_mandate',
    title: 'Exclusive Property Marketing Mandate',
    badge: 'Fast Liquidity',
    tagline: 'Sell or lease your prime properties faster through our verified buyer network',
    description:
      'Get your property in front of high-intent local and international buyers with professional aerial drone videography, HD photo staging, and featured placement across Valpromark.',
    icon: Sparkles,
    benefits: [
      '4K Drone video tour and HDR photography of your land or building',
      'Featured placement on Valpromark top search & interactive map views',
      'Direct social & WhatsApp broadcasting to 15,000+ diaspora property investors',
      'Accompanied physical site tours conducted by licensed Valpromark agents',
    ],
    pricing: 'Standard 5% brokerage commission upon successful sale/lease closure',
  },
];

export default function Services() {
  const { addServiceRequest } = useServicesStore();

  const [selectedService, setSelectedService] = useState<ServiceType>('property_management');
  const [formData, setFormData] = useState({
    client_name: '',
    client_phone: '',
    client_whatsapp: '',
    client_email: '',
    property_location: '',
    property_type: 'Residential Apartments',
    estimated_value_or_rent: '',
    units_count: 1,
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.client_name || !formData.client_phone) {
      alert('Please provide your name and phone number.');
      return;
    }

    // Save to services store
    addServiceRequest({
      service_type: selectedService,
      client_name: formData.client_name,
      client_phone: formData.client_phone,
      client_whatsapp: formData.client_whatsapp || formData.client_phone.replace(/[^0-9]/g, ''),
      client_email: formData.client_email,
      property_location: formData.property_location,
      property_type: formData.property_type,
      estimated_value_or_rent: formData.estimated_value_or_rent,
      units_count: Number(formData.units_count) || 1,
      notes: formData.notes,
      status: 'new',
      priority: 'high',
    });

    setIsSubmitted(true);
  };

  const activeServiceObj = SERVICE_ITEMS.find((s) => s.id === selectedService) || SERVICE_ITEMS[0];

  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Valpromark Management Services, I would like to inquire about your ${activeServiceObj.title} for my property in Ghana. Location: ${formData.property_location || 'Ghana'}, Name: ${formData.client_name || 'Prospective Client'}.`
    );
    window.open(`https://wa.me/233241234567?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#070D18] pb-24">
      {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0E1E38] via-[#0A1424] to-[#070D18] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#1E3557]">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#E5C158] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
            <span>Valpromark Property & Facility Management Services</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                Professional Real Estate & Property Management in <span className="text-[#C5A059]">Ghana</span>
              </h1>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                Protect your real estate investments, maximize rental yields, and eliminate tenant stress. Designed specifically for Ghanaian landlords, diaspora property owners, and institutional investors.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="#request-form"
                className="px-5 py-3 rounded-2xl bg-[#C5A059] hover:bg-[#d6b063] text-[#0E1E38] font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-[#C5A059]/20 transition-all"
              >
                <span>Book Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                to="/services/admin"
                className="px-4 py-3 rounded-2xl bg-[#0F1E33] hover:bg-[#152845] text-neutral-200 border border-[#1E3557] font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
              >
                <LayoutDashboard className="w-4 h-4 text-[#C5A059]" />
                <span>Services Admin Hub</span>
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#1E3557]/80">
            <div className="p-3 rounded-2xl bg-[#0F1E33]/60 border border-[#1E3557]/60">
              <p className="text-xl sm:text-2xl font-black text-[#E5C158]">GH₵ 2.4M+</p>
              <p className="text-[11px] text-neutral-400 font-medium">Monthly Rent Managed</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#0F1E33]/60 border border-[#1E3557]/60">
              <p className="text-xl sm:text-2xl font-black text-white">98.5%</p>
              <p className="text-[11px] text-neutral-400 font-medium">On-Time Rent Collection</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#0F1E33]/60 border border-[#1E3557]/60">
              <p className="text-xl sm:text-2xl font-black text-[#E5C158]">350+ Plots</p>
              <p className="text-[11px] text-neutral-400 font-medium">Lands Due Diligence Cleared</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#0F1E33]/60 border border-[#1E3557]/60">
              <p className="text-xl sm:text-2xl font-black text-white">24/7</p>
              <p className="text-[11px] text-neutral-400 font-medium">Facility Emergency Response</p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        {/* SERVICES GRID */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              Our Core Property Services in Ghana
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              Select any service below to learn about our standard operating procedures, deliverables, and pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICE_ITEMS.map((srv) => {
              const Icon = srv.icon;
              const isSelected = selectedService === srv.id;
              return (
                <div
                  key={srv.id}
                  id={`service-card-${srv.id}`}
                  onClick={() => setSelectedService(srv.id)}
                  className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white dark:bg-[#0F1E33] border-[#C5A059] ring-2 ring-[#C5A059]/40 shadow-xl'
                      : 'bg-white dark:bg-[#0F1E33] border-neutral-200 dark:border-[#1E3557] hover:border-[#C5A059]/50 shadow-sm'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-2xl bg-[#C5A059]/10 text-[#C5A059]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/20">
                        {srv.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-neutral-900 dark:text-white">{srv.title}</h3>
                      <p className="text-xs text-[#C5A059] font-medium mt-0.5">{srv.tagline}</p>
                    </div>

                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {srv.description}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-[#1E3557]/60">
                      <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                        Key Deliverables:
                      </p>
                      <ul className="space-y-1.5">
                        {srv.benefits.map((b, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-[#1E3557]/60 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400">
                      {srv.pricing}
                    </span>
                    <a
                      href="#request-form"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedService(srv.id);
                        document.getElementById('request-form')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-xs font-bold text-[#C5A059] hover:underline flex items-center gap-1"
                    >
                      <span>Inquire</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* WHY VALPROMARK SECTION */}
        <section className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0E1E38] to-[#0A1424] text-white border border-[#1E3557] space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E5C158]">
              The Valpromark Advantage
            </span>
            <h3 className="text-xl sm:text-3xl font-black text-white">
              Why Landlords & Diaspora Investors Trust Us
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300">
              Managing properties in Ghana requires boots on the ground, legal mastery, and rapid maintenance support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-[#0F1E33]/80 border border-[#1E3557] space-y-2">
              <BadgeCheck className="w-8 h-8 text-[#C5A059]" />
              <h4 className="text-sm font-bold text-white">Full Transparency & Reporting</h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Receive itemized monthly financial statements, utility receipts, and high-definition video inspection walkthroughs of your assets.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0F1E33]/80 border border-[#1E3557] space-y-2">
              <ShieldCheck className="w-8 h-8 text-[#C5A059]" />
              <h4 className="text-sm font-bold text-white">Ghana Rent Act Compliance</h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Legally binding tenancy contracts, tenancy dispute resolution, and security deposit management in accordance with Ghanaian law.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0F1E33]/80 border border-[#1E3557] space-y-2">
              <Clock className="w-8 h-8 text-[#C5A059]" />
              <h4 className="text-sm font-bold text-white">Rapid Artisan Response</h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Vetted electrical, plumbing, generator, and borehole artisans ready to resolve tenant maintenance tickets within 24 hours.
              </p>
            </div>
          </div>
        </section>

        {/* INTERACTIVE SERVICE REQUEST / CONSULTATION FORM */}
        <section
          id="request-form"
          className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#0F1E33] border border-neutral-200 dark:border-[#1E3557] shadow-xl space-y-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-[#1E3557] pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#C5A059]/15 text-[#C5A059] text-[11px] font-bold uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Custom Proposal & Free Consultation</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">
                Request Property Management or Advisory Service
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                Fill out the details below. Our management team will review your property and reply within 4 hours.
              </p>
            </div>

            <button
              type="button"
              onClick={handleDirectWhatsApp}
              className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shrink-0 self-start sm:self-center shadow-md shadow-emerald-900/20"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </button>
          </div>

          {isSubmitted ? (
            <div className="p-8 text-center bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-emerald-900 dark:text-emerald-200">
                Service Request Successfully Received!
              </h4>
              <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 max-w-md mx-auto">
                Thank you, <strong>{formData.client_name}</strong>. Our property management team in Accra has logged your request for <strong>{activeServiceObj.title}</strong> and will contact you via WhatsApp/Phone shortly.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-bold text-xs"
                >
                  Submit Another Request
                </button>
                <Link
                  to="/services/admin"
                  className="px-4 py-2 rounded-xl bg-[#C5A059] text-[#0E1E38] font-bold text-xs flex items-center gap-1.5"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>View in Admin Dashboard</span>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Select Service Type Pill Buttons */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider block">
                  1. Select Required Service
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {SERVICE_ITEMS.map((srv) => (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => setSelectedService(srv.id)}
                      className={`p-3 rounded-2xl text-left border transition-all ${
                        selectedService === srv.id
                          ? 'bg-[#C5A059]/15 border-[#C5A059] text-[#0E1E38] dark:text-[#E5C158] font-bold ring-1 ring-[#C5A059]'
                          : 'bg-neutral-50 dark:bg-[#0A1422] border-neutral-200 dark:border-[#1E3557] text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      <p className="text-xs font-bold truncate">{srv.title}</p>
                      <p className="text-[10px] text-neutral-400 truncate">{srv.badge}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Client & Property Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                    Your Full Name / Entity *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Kwame Osei or Mensah Family Trust"
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0A1422] text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                    Phone & WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +233 24 123 4567 or UK/US number"
                    value={formData.client_phone}
                    onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0A1422] text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. kwame@example.com"
                    value={formData.client_email}
                    onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0A1422] text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                    Property Location in Ghana *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. East Legon, Cantonments, Prampram, Kumasi Ayeduase"
                    value={formData.property_location}
                    onChange={(e) => setFormData({ ...formData, property_location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0A1422] text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                    Property Type
                  </label>
                  <select
                    value={formData.property_type}
                    onChange={(e) => setFormData({ ...formData, property_type: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0A1422] text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="Residential Apartments">Residential Apartments Complex</option>
                    <option value="Single Family House / Villa">Single Family House / Villa</option>
                    <option value="Student Hostel">Student Hostel (KNUST, Legon, UCC, etc.)</option>
                    <option value="Land / Plots (Due Diligence / Estate)">Land / Plots (Due Diligence / Estate)</option>
                    <option value="Commercial Office / Retail / Warehouse">Commercial Office / Retail / Warehouse</option>
                    <option value="Hotel / Guest House">Hotel / Guest House</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                    Number of Units / Plots / Rooms
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.units_count}
                    onChange={(e) => setFormData({ ...formData, units_count: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0A1422] text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                  Additional Notes or Specific Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe current status (e.g., currently vacant, need tenant eviction support, diaspora owner based in USA/UK, need Lands Commission cadastral search)..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0A1422] text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <p className="text-[11px] text-neutral-400">
                  🔒 Your information is confidential and used solely for management consultation.
                </p>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#C5A059] hover:bg-[#d6b063] text-[#0E1E38] font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#C5A059]/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Service Request</span>
                </button>
              </div>
            </form>
          )}
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">
              Property Management FAQs
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              Everything you need to know about our management terms in Ghana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0F1E33] border border-neutral-200 dark:border-[#1E3557] space-y-2">
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#C5A059]" />
                <span>How are rents collected and remitted to diaspora owners?</span>
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Rent is collected directly into a dedicated escrow account via bank transfer or MTN/Telecel Mobile Money, reconciled, and remitted to your Ghanaian, UK, USA, or European bank account on agreed dates along with digital statements.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0F1E33] border border-neutral-200 dark:border-[#1E3557] space-y-2">
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#C5A059]" />
                <span>How are maintenance and repairs handled?</span>
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                We establish a pre-authorized maintenance buffer (e.g. GH₵ 1,000). For any repairs exceeding this amount, we obtain written owner approval with photo evidence and quotes from certified artisans before work begins.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0F1E33] border border-neutral-200 dark:border-[#1E3557] space-y-2">
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#C5A059]" />
                <span>What is the turnaround time for Lands Commission title search?</span>
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Official searches typically take between 5 to 10 working days, depending on the Lands Commission regional office and whether digital archival coordinate mapping is needed.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0F1E33] border border-neutral-200 dark:border-[#1E3557] space-y-2">
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#C5A059]" />
                <span>Do you manage student hostels near KNUST and Legon?</span>
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Yes. We handle specialized student hostel operations, room-by-room semester billing, student conduct agreements, water supply, security guards, and pre-semester deep sanitization.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
