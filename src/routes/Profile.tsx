import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  User as UserIcon,
  CalendarDays,
  Sparkles,
  ShieldCheck,
  LogOut,
  Moon,
  Sun,
  Database,
  Building2,
  MapPin,
  CheckCircle2,
  PlusCircle,
  Key,
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useAppStore } from '../store/useAppStore';
import { useBookings } from '../hooks/useBookings';
import { isSupabaseConfigured } from '../lib/supabase';

export default function Profile() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'trips';

  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const loginAsDemoUser = useAuthStore((s) => s.loginAsDemoUser);
  const setAuthModal = useAuthStore((s) => s.setAuthModal);

  const isDark = useAppStore((s) => s.isDark);
  const toggleTheme = useAppStore((s) => s.toggleTheme);

  const { bookings, cancelBooking } = useBookings();

  const setTab = (tab: string) => {
    setSearchParams({ tab });
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 p-6 sm:p-8 text-center bg-white dark:bg-[#0F1E33] rounded-3xl border border-neutral-200 dark:border-[#1E3557] shadow-xl space-y-5">
        <div className="w-16 h-16 rounded-full bg-[#C5A059]/20 text-[#C5A059] flex items-center justify-center mx-auto">
          <UserIcon className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Sign in to Valpromark</h2>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
          Sign in to view your confirmed Ghana reservations, manage saved properties, or list accommodation.
        </p>
        <button
          onClick={() => setAuthModal(true, 'signin')}
          className="w-full py-3 rounded-full font-bold text-sm bg-[#C5A059] text-[#0E1E38] hover:bg-[#DFB24A] shadow-md"
        >
          Sign In / Sign Up
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 pb-28 min-h-screen">
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
              {user.is_host && (
                <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-[#C5A059] text-[#0E1E38] shadow-md">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">
                  {user.full_name}
                </h1>
                {user.is_host && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#C5A059]/20 text-[#C5A059]">
                    Host
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">{user.email}</p>
              <p className="text-[11px] text-neutral-400 mt-1">Valpromark Member since {user.joined_date || '2024'}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to="/host/create"
              className="px-4 py-2 rounded-full font-bold text-xs bg-[#C5A059] text-[#0E1E38] hover:bg-[#DFB24A] transition-colors shadow-sm flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>List your Ghana home</span>
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
          onClick={() => setTab('trips')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
            activeTab === 'trips'
              ? 'bg-[#C5A059] text-[#0E1E38]'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
          }`}
        >
          <CalendarDays className="w-4 h-4" />
          <span>My Trips ({bookings.length})</span>
        </button>

        <button
          onClick={() => setTab('host')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
            activeTab === 'host'
              ? 'bg-[#C5A059] text-[#0E1E38]'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Host Portal</span>
        </button>

        <button
          onClick={() => setTab('settings')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
            activeTab === 'settings'
              ? 'bg-[#C5A059] text-[#0E1E38]'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Settings & Personas</span>
        </button>
      </div>

      {/* TAB 1: Trips / Bookings */}
      {activeTab === 'trips' && (
        <div className="space-y-6">
          {bookings.length === 0 ? (
            <div className="max-w-md mx-auto my-12 p-8 text-center bg-white dark:bg-[#0F1E33] rounded-3xl border border-neutral-200 dark:border-[#1E3557] space-y-4">
              <CalendarDays className="w-12 h-12 text-[#C5A059] mx-auto" />
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">No trips booked yet</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Explore luxury penthouses, ocean retreats, and hilltop villas across Ghana.
              </p>
              <Link
                to="/"
                className="inline-block px-6 py-2.5 rounded-full font-bold text-xs bg-[#C5A059] text-[#0E1E38]"
              >
                Start Searching Ghana Stays
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="p-5 rounded-3xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#C5A059]">
                        VALPRO-GH-{booking.id.slice(-6).toUpperCase()}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          booking.status === 'confirmed'
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                            : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <div className="flex gap-4 items-center">
                      <img
                        src={booking.listing_photo}
                        alt={booking.listing_title}
                        className="w-20 h-20 rounded-2xl object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-sm text-neutral-900 dark:text-white truncate">
                          {booking.listing_title}
                        </h4>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#C5A059]" />
                          {booking.listing_location}
                        </p>
                        <p className="text-xs text-neutral-700 dark:text-neutral-300 font-semibold mt-1">
                          {booking.check_in} → {booking.check_out} ({booking.nights} nights)
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-neutral-100 dark:border-[#1E3557]/80 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-neutral-400">Total: </span>
                        <span className="font-bold text-sm text-[#C5A059]">
                          GH₵ {booking.total_price.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-neutral-500">{booking.guests_count} guests</span>
                    </div>
                  </div>

                  {booking.status === 'confirmed' && (
                    <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-[#1E3557]/80 flex items-center justify-between">
                      <Link
                        to={`/listing/${booking.listing_id}`}
                        className="text-xs font-bold text-[#C5A059] hover:underline"
                      >
                        View Stay Details
                      </Link>
                      <button
                        onClick={() => cancelBooking(booking.id)}
                        className="text-xs font-semibold text-rose-500 hover:text-rose-700 transition-colors"
                      >
                        Cancel Reservation
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Host Portal */}
      {activeTab === 'host' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33]">
              <span className="text-xs text-neutral-400 font-bold uppercase">Superhost Rating</span>
              <p className="text-2xl font-black text-neutral-900 dark:text-white mt-1">4.98 ★</p>
              <p className="text-xs text-emerald-600 mt-1 font-semibold">Top host in Accra</p>
            </div>
            <div className="p-5 rounded-2xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33]">
              <span className="text-xs text-neutral-400 font-bold uppercase">Total Bookings</span>
              <p className="text-2xl font-black text-neutral-900 dark:text-white mt-1">28</p>
              <p className="text-xs text-neutral-500 mt-1">100% response rate</p>
            </div>
            <div className="p-5 rounded-2xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33]">
              <span className="text-xs text-neutral-400 font-bold uppercase">Ghana Cedis Earnings</span>
              <p className="text-2xl font-black text-[#C5A059] mt-1">GH₵ 78,500</p>
              <p className="text-xs text-neutral-500 mt-1">Payout via MTN MoMo / Wire</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/host/my-listings"
              className="px-6 py-3 rounded-full font-bold text-xs sm:text-sm bg-[#0E1E38] dark:bg-[#C5A059] text-white dark:text-[#0E1E38] hover:opacity-90"
            >
              Manage My Listings
            </Link>
            <Link
              to="/host/create"
              className="px-6 py-3 rounded-full font-bold text-xs sm:text-sm bg-gradient-to-r from-[#DFB24A] via-[#C5A059] to-[#DFB24A] text-[#0E1E38] shadow-md"
            >
              Add New Ghana Listing
            </Link>
          </div>
        </div>
      )}

      {/* TAB 3: Settings & Personas */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl space-y-6">
          {/* Quick Demo Switcher */}
          <div className="p-5 sm:p-6 rounded-3xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] space-y-4">
            <h3 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white flex items-center gap-2">
              <Key className="w-4 h-4 text-[#C5A059]" />
              <span>Switch Demo Persona for Instant Testing</span>
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Quickly switch between guest and host profiles to explore Ghana accommodation management.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => loginAsDemoUser('guest')}
                className="p-4 rounded-2xl border border-neutral-200 dark:border-[#1E3557] hover:border-[#C5A059] text-left transition-colors bg-neutral-50 dark:bg-[#0A1422]/60"
              >
                <p className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">Kwame Mensah (Guest)</p>
                <p className="text-[11px] text-neutral-500 mt-1">Has confirmed Ghana bookings & saved villas</p>
              </button>

              <button
                onClick={() => loginAsDemoUser('host')}
                className="p-4 rounded-2xl border border-neutral-200 dark:border-[#1E3557] hover:border-[#C5A059] text-left transition-colors bg-neutral-50 dark:bg-[#0A1422]/60"
              >
                <p className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">Akosua Boateng (Superhost)</p>
                <p className="text-[11px] text-neutral-500 mt-1">Hosts executive penthouses in Accra & Aburi</p>
              </button>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="p-5 sm:p-6 rounded-3xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] flex items-center justify-between">
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">Interface Appearance</h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Currently active: {isDark ? 'Valpromark Navy Luxury' : 'Daylight Classic'}</p>
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
