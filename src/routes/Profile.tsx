import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  User as UserIcon,
  Building2,
  MapPin,
  CheckCircle2,
  PlusCircle,
  Key,
  LogOut,
  Moon,
  Sun,
  MessageSquare,
  Phone,
  Eye,
  BadgeCheck,
  Heart,
  ShieldAlert,
  FileCheck,
  Compass,
  Check,
  LayoutDashboard,
  Briefcase,
  ArrowRight,
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useAppStore } from '../store/useAppStore';
import { useListings, getPropertyInquiries } from '../hooks/useListings';
import { useWishlist } from '../hooks/useWishlist';

export default function Profile() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'listings';

  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const loginAsDemoUser = useAuthStore((s) => s.loginAsDemoUser);
  const setAuthModal = useAuthStore((s) => s.setAuthModal);

  const isDark = useAppStore((s) => s.isDark);
  const toggleTheme = useAppStore((s) => s.toggleTheme);

  const { data: allListings = [] } = useListings();
  const { wishlistIds } = useWishlist();
  const savedProperties = allListings.filter((l) => wishlistIds.includes(l.id));
  const myListings = allListings.filter(
    (l) => l.host_id === user?.id || l.id.startsWith('listing-')
  );
  const inquiries = getPropertyInquiries();

  // Local state for listing availability toggles
  const [listingStatuses, setListingStatuses] = useState<Record<string, string>>({});

  const setTab = (tab: string) => {
    setSearchParams({ tab });
  };

  const handleStatusChange = (listingId: string, status: string) => {
    setListingStatuses((prev) => ({ ...prev, [listingId]: status }));
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 p-6 sm:p-8 text-center bg-white dark:bg-[#0F1E33] rounded-3xl border border-neutral-200 dark:border-[#1E3557] shadow-xl space-y-5">
        <div className="w-16 h-16 rounded-full bg-[#C5A059]/20 text-[#C5A059] flex items-center justify-center mx-auto">
          <UserIcon className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Sign in to Valpromark</h2>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
          Sign in to list properties across Ghana freely, manage direct inquiries, or view your saved properties.
        </p>
        <button
          onClick={() => setAuthModal(true, 'signin')}
          className="w-full py-3 rounded-full font-bold text-sm bg-[#C5A059] text-[#0E1E38] hover:bg-[#DFB24A] shadow-md"
        >
          Sign In / Register Free
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-8 pb-28 min-h-screen">
      {/* Profile Header Card */}
      <div className="p-5 sm:p-8 rounded-3xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] shadow-sm mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative">
              {user.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.full_name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-4 ring-[#C5A059]/30"
                />
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#C5A059]/20 flex items-center justify-center text-[#C5A059] font-bold text-2xl">
                  {user.full_name[0]}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-emerald-500 text-white shadow-md">
                <BadgeCheck className="w-3.5 h-3.5" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">
                  {user.full_name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#C5A059]/20 text-[#C5A059]">
                  Property Owner & Seeker Hub
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">{user.email}</p>
              <p className="text-[11px] text-neutral-400 mt-1">Valpromark Direct Real Estate Network · Ghana</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to="/services/admin"
              className="px-4 py-2 rounded-full font-bold text-xs bg-[#0A1422] text-[#C5A059] border border-[#1E3557] hover:bg-[#0E1E38] transition-colors flex items-center gap-1.5"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Services Admin</span>
            </Link>
            <Link
              to="/host/create"
              className="px-4 py-2 rounded-full font-bold text-xs bg-gradient-to-r from-[#DFB24A] via-[#C5A059] to-[#DFB24A] text-[#0E1E38] hover:scale-105 transition-transform shadow-sm flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>List Property Free</span>
            </Link>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 rounded-full font-semibold text-xs border border-neutral-300 dark:border-[#1E3557] text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-[#1E3557] pb-3 mb-6 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setTab('listings')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
            activeTab === 'listings'
              ? 'bg-[#C5A059] text-[#0E1E38]'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>My Listed Properties ({myListings.length})</span>
        </button>

        <button
          onClick={() => setTab('inquiries')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
            activeTab === 'inquiries'
              ? 'bg-[#C5A059] text-[#0E1E38]'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Inquiries & Tours ({inquiries.length})</span>
        </button>

        <button
          onClick={() => setTab('services')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
            activeTab === 'services'
              ? 'bg-[#C5A059] text-[#0E1E38]'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Management & Services</span>
        </button>

        <button
          onClick={() => setTab('saved')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
            activeTab === 'saved'
              ? 'bg-[#C5A059] text-[#0E1E38]'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Saved Properties ({savedProperties.length})</span>
        </button>

        <button
          onClick={() => setTab('guide')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
            activeTab === 'guide'
              ? 'bg-[#C5A059] text-[#0E1E38]'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Ghana Due Diligence Guide</span>
        </button>

        <button
          onClick={() => setTab('settings')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
            activeTab === 'settings'
              ? 'bg-[#C5A059] text-[#0E1E38]'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
          }`}
        >
          <Key className="w-4 h-4" />
          <span>Settings</span>
        </button>
      </div>

      {/* TAB 1: My Listed Properties */}
      {activeTab === 'listings' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-neutral-900 dark:text-white">Properties You Have Listed</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Manage your listings, update availability status, and review details.
              </p>
            </div>
            <Link
              to="/host/create"
              className="text-xs font-bold text-[#C5A059] hover:underline flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add New Listing</span>
            </Link>
          </div>

          {myListings.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-[#0F1E33] rounded-3xl border border-neutral-200 dark:border-[#1E3557] space-y-3">
              <Building2 className="w-10 h-10 text-[#C5A059] mx-auto" />
              <p className="text-sm font-bold text-neutral-900 dark:text-white">No properties listed yet</p>
              <p className="text-xs text-neutral-400">List your land, house, student hostel, or commercial space for free.</p>
              <Link
                to="/host/create"
                className="inline-block px-5 py-2 rounded-full bg-[#C5A059] text-[#0E1E38] font-bold text-xs"
              >
                List Property Now
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {myListings.map((l) => {
                const currentStatus = listingStatuses[l.id] || 'Available';
                return (
                  <div
                    key={l.id}
                    className="p-4 rounded-3xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] space-y-3"
                  >
                    <div className="aspect-[16/9] rounded-2xl overflow-hidden relative">
                      <img src={l.photos[0]} alt={l.title} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-black uppercase bg-[#0E1E38] text-[#E5C158]">
                        {l.purpose || 'sale'}
                      </span>
                      <span
                        className={`absolute top-2 right-2 px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                          currentStatus === 'Available'
                            ? 'bg-emerald-600 text-white'
                            : currentStatus === 'Under Negotiation'
                            ? 'bg-amber-500 text-neutral-950'
                            : 'bg-rose-600 text-white'
                        }`}
                      >
                        {currentStatus}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-neutral-900 dark:text-white truncate">{l.title}</h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{l.location}</p>
                      <p className="text-sm font-black text-[#C5A059] mt-1">
                        GH₵ {(l.price || l.price_per_night || 0).toLocaleString()}
                      </p>
                    </div>

                    {/* Status Switcher for Landlord / Owner */}
                    <div className="pt-2 border-t border-neutral-100 dark:border-[#1E3557]/80">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                        Listing Status:
                      </label>
                      <div className="grid grid-cols-3 gap-1">
                        {['Available', 'Under Negotiation', 'Sold/Rented'].map((st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => handleStatusChange(l.id, st)}
                            className={`py-1 px-1.5 rounded-lg text-[10px] font-bold transition-all ${
                              currentStatus === st
                                ? 'bg-[#C5A059] text-[#0E1E38]'
                                : 'bg-neutral-100 dark:bg-[#1E3557]/50 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Link
                      to={`/listing/${l.id}`}
                      className="w-full py-2 rounded-xl text-center text-xs font-bold bg-[#0A1422] text-[#C5A059] border border-[#1E3557] block hover:bg-[#0E1E38]"
                    >
                      View Public Ad
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Inquiries */}
      {activeTab === 'inquiries' && (
        <div className="p-5 sm:p-6 rounded-3xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-neutral-900 dark:text-white">Direct Inquiries & Tour Requests</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Prospective buyers and tenants who submitted inspection or offer requests.
              </p>
            </div>
          </div>

          {inquiries.length === 0 ? (
            <div className="p-8 text-center bg-neutral-50 dark:bg-[#0A1422]/60 rounded-2xl">
              <MessageSquare className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
              <p className="text-xs text-neutral-400 italic">No inquiries received yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-neutral-100 dark:divide-[#1E3557]/80">
              {inquiries.map((inq) => (
                <div key={inq.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-xs font-bold text-neutral-900 dark:text-white">{inq.sender_name}</strong>
                      <span className="text-[10px] text-neutral-400">· {inq.sender_phone}</span>
                      {inq.preferred_tour_date && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                          Tour: {inq.preferred_tour_date}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300">
                      Property: <strong className="text-[#C5A059]">{inq.listing_title}</strong>
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 italic bg-neutral-50 dark:bg-[#0A1422]/80 p-2 rounded-xl border border-neutral-100 dark:border-[#1E3557]/60">
                      "{inq.message}"
                    </p>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                    <a
                      href={`https://wa.me/${inq.sender_phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${inq.sender_name}, thank you for inquiring about ${inq.listing_title} on Valpromark Ghana.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Reply</span>
                    </a>
                    <a
                      href={`tel:${inq.sender_phone}`}
                      className="p-2 rounded-xl border border-neutral-200 dark:border-[#1E3557] text-neutral-700 dark:text-neutral-300 hover:text-[#C5A059]"
                      title="Call directly"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB: Management & Services */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0E1E38] via-[#0A1424] to-[#070D18] text-white border border-[#1E3557] space-y-6 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-[#C5A059]/20 text-[#E5C158] border border-[#C5A059]/30">
                  Valpromark Advisory & Management
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
                  Property & Facility Management Hub
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mt-1">
                  Dedicated operations for landlords, student hostels, commercial buildings, and diaspora property investors across Ghana.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to="/services/admin"
                  className="px-5 py-2.5 rounded-2xl bg-[#C5A059] hover:bg-[#d6b063] text-[#0E1E38] font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-[#C5A059]/20 transition-all"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Open Services Admin Dashboard</span>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#1E3557]">
              <div className="p-4 rounded-2xl bg-[#0F1E33]/90 border border-[#1E3557]/80 space-y-1">
                <p className="text-xs font-bold text-[#E5C158]">Full Property Management</p>
                <p className="text-xs text-neutral-300">
                  Tenant vetting, monthly rent remittance, and maintenance care at 8–10% commission.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0F1E33]/90 border border-[#1E3557]/80 space-y-1">
                <p className="text-xs font-bold text-[#E5C158]">Lands Title Search</p>
                <p className="text-xs text-neutral-300">
                  Official search at Lands Commission PVLMD, LRD, and cadastral survey validation.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0F1E33]/90 border border-[#1E3557]/80 space-y-1">
                <p className="text-xs font-bold text-[#E5C158]">24/7 Facility Maintenance</p>
                <p className="text-xs text-neutral-300">
                  Certified Ghanaian artisans for plumbing, borehole pumps, and generator care.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                Request a New Management Consultation
              </h3>
              <Link
                to="/services"
                className="text-xs font-bold text-[#C5A059] hover:underline flex items-center gap-1"
              >
                <span>View All Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Whether you are an owner in Ghana or living abroad in the UK, USA, or Canada, our local team ensures your property is leased to vetted tenants, rents are remitted on time, and your title documents are 100% verified.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/services#request-form"
                className="px-4 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold"
              >
                Submit Service Request
              </Link>
              <Link
                to="/services/admin"
                className="px-4 py-2 rounded-xl border border-neutral-300 dark:border-[#1E3557] text-neutral-700 dark:text-neutral-300 text-xs font-bold hover:text-[#C5A059]"
              >
                View Management Portfolio & Tickets
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Saved Properties */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">Saved Properties ({savedProperties.length})</h2>
            <Link to="/" className="text-xs font-bold text-[#C5A059] hover:underline flex items-center gap-1">
              <Compass className="w-3.5 h-3.5" />
              <span>Explore More Properties</span>
            </Link>
          </div>

          {savedProperties.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-[#0F1E33] rounded-3xl border border-neutral-200 dark:border-[#1E3557] space-y-3">
              <Heart className="w-10 h-10 text-neutral-400 mx-auto" />
              <p className="text-sm font-bold text-neutral-900 dark:text-white">No saved properties yet</p>
              <p className="text-xs text-neutral-400">Tap the heart icon on any listing to bookmark it here for quick access.</p>
              <Link
                to="/"
                className="inline-block px-5 py-2 rounded-full bg-[#C5A059] text-[#0E1E38] font-bold text-xs"
              >
                Browse Listings
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {savedProperties.map((p) => (
                <Link
                  key={p.id}
                  to={`/listing/${p.id}`}
                  className="p-3.5 rounded-3xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] hover:shadow-md transition-shadow block group"
                >
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-2 relative">
                    <img src={p.photos[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-black uppercase bg-[#0E1E38] text-[#E5C158]">
                      {p.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white truncate">{p.title}</h4>
                  <p className="text-[11px] text-neutral-400 truncate">{p.location}</p>
                  <p className="text-xs font-black text-[#C5A059] mt-1">GH₵ {(p.price || p.price_per_night || 0).toLocaleString()}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: Ghana Real Estate Due Diligence Guide */}
      {activeTab === 'guide' && (
        <div className="p-5 sm:p-7 rounded-3xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] space-y-6">
          <div className="flex items-center gap-3 border-b border-neutral-200 dark:border-[#1E3557] pb-4">
            <div className="p-3 rounded-2xl bg-[#C5A059]/10 text-[#C5A059]">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                Ghana Property & Land Due Diligence Checklist
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Essential steps to safeguard your property purchase or rental in Ghana.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#0A1422]/60 border border-neutral-200 dark:border-[#1E3557] space-y-2">
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#C5A059]" />
                <span>1. Physical Site Inspection</span>
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Always visit the land or building in person with a licensed surveyor. Inspect boundaries and confirm no ongoing chieftaincy or family disputes on site.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#0A1422]/60 border border-neutral-200 dark:border-[#1E3557] space-y-2">
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#C5A059]" />
                <span>2. Search at Lands Commission</span>
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Conduct an official official search at the Lands Commission (Public and Vested Lands Management Division or Land Registration Division) using the site plan.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#0A1422]/60 border border-neutral-200 dark:border-[#1E3557] space-y-2">
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#C5A059]" />
                <span>3. Title & Indenture Verification</span>
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Verify the grantor's capacity to sell or lease. For stool/skin land, ensure the principal elders and chief have consented.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#0A1422]/60 border border-neutral-200 dark:border-[#1E3557] space-y-2">
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#C5A059]" />
                <span>4. Safe Direct Payment Terms</span>
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Never send mobile money deposits or cash before physically inspecting the property and reviewing original ownership documentation with legal counsel.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Settings & Switchers */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl space-y-6">
          <div className="p-5 sm:p-6 rounded-3xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] space-y-4">
            <h3 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white flex items-center gap-2">
              <Key className="w-4 h-4 text-[#C5A059]" />
              <span>Switch Profile Persona for Testing</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => loginAsDemoUser('guest')}
                className="p-3.5 rounded-2xl border border-neutral-200 dark:border-[#1E3557] hover:border-[#C5A059] text-left transition-colors bg-neutral-50 dark:bg-[#0A1422]/60"
              >
                <p className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">Kwame Mensah (Buyer / Seeker)</p>
                <p className="text-[11px] text-neutral-500 mt-0.5">Looking for houses & serviced lands in Ghana</p>
              </button>

              <button
                onClick={() => loginAsDemoUser('host')}
                className="p-3.5 rounded-2xl border border-neutral-200 dark:border-[#1E3557] hover:border-[#C5A059] text-left transition-colors bg-neutral-50 dark:bg-[#0A1422]/60"
              >
                <p className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">Akosua Boateng (Property Owner)</p>
                <p className="text-[11px] text-neutral-500 mt-0.5">Lists properties & manages inquiries</p>
              </button>
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] flex items-center justify-between">
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">Appearance Theme</h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Active: {isDark ? 'Valpromark Navy Luxury' : 'Daylight Classic'}</p>
            </div>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs border border-neutral-300 dark:border-[#1E3557] text-[#C5A059]"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
              <span>Toggle Theme</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
