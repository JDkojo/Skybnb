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
  XCircle,
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
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-white dark:bg-[#1E1E1E] rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xl space-y-5">
        <div className="w-16 h-16 rounded-full bg-sky-50 dark:bg-sky-950/40 text-[#0EA5E9] flex items-center justify-center mx-auto">
          <UserIcon className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Sign in to your Profile</h2>
        <p className="text-sm text-neutral-500">
          Sign in to view your confirmed bookings, manage wishlists, or host your properties on Skybnb.
        </p>
        <button
          onClick={() => setAuthModal(true, 'signin')}
          className="w-full py-3 rounded-full font-bold text-sm bg-[#0EA5E9] text-white hover:bg-sky-600 shadow-md"
        >
          Sign In / Sign Up
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 min-h-screen">
      {/* Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1E1E1E] shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              {user.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.full_name}
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-[#0EA5E9]/30"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300 font-bold text-2xl">
                  {user.full_name[0]}
                </div>
              )}
              {user.is_host && (
                <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-amber-500 text-white shadow-md">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-neutral-900 dark:text-white">
                  {user.full_name}
                </h1>
                {user.is_host && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                    Superhost
                  </span>
                )}
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">{user.email}</p>
              <p className="text-xs text-neutral-400 mt-1">Member since {user.joined_date || '2024'}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to="/host/create"
              className="px-4 py-2 rounded-full font-bold text-xs bg-[#0EA5E9] text-white hover:bg-sky-600 transition-colors shadow-sm flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Skybnb your home</span>
            </Link>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 rounded-full font-semibold text-xs border border-neutral-300 dark:border-neutral-700 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3 mb-6 overflow-x-auto">
        <button
          onClick={() => setTab('trips')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
            activeTab === 'trips'
              ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
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
              ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
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
              ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Settings & Demo Accounts</span>
        </button>
      </div>

      {/* TAB 1: Trips / Bookings */}
      {activeTab === 'trips' && (
        <div className="space-y-6">
          {bookings.length === 0 ? (
            <div className="max-w-md mx-auto my-12 p-8 text-center bg-white dark:bg-[#1E1E1E] rounded-3xl border border-neutral-200 dark:border-neutral-800 space-y-4">
              <CalendarDays className="w-12 h-12 text-neutral-400 mx-auto" />
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">No trips booked... yet!</h3>
              <p className="text-xs text-neutral-500">
                Time to dust off your bags and start planning your next great accommodation escape.
              </p>
              <Link
                to="/"
                className="inline-block px-6 py-2.5 rounded-full font-bold text-xs bg-[#0EA5E9] text-white"
              >
                Start Searching
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="p-5 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1E1E1E] shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-neutral-400">
                        REF: {booking.id.slice(-8).toUpperCase()}
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
                        <p className="text-xs text-neutral-500 truncate mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#0EA5E9]" />
                          {booking.listing_location}
                        </p>
                        <p className="text-xs text-neutral-700 dark:text-neutral-300 font-semibold mt-1">
                          {booking.check_in} → {booking.check_out} ({booking.nights} nights)
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-neutral-400">Total Paid: </span>
                        <span className="font-bold text-sm text-neutral-900 dark:text-white">
                          ${booking.total_price}
                        </span>
                      </div>
                      <span className="text-neutral-500">{booking.guests_count} guests</span>
                    </div>
                  </div>

                  {booking.status === 'confirmed' && (
                    <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                      <Link
                        to={`/listing/${booking.listing_id}`}
                        className="text-xs font-bold text-[#0EA5E9] hover:underline"
                      >
                        View Listing
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
            <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1E1E1E]">
              <span className="text-xs text-neutral-400 font-bold uppercase">Superhost Rating</span>
              <p className="text-2xl font-black text-neutral-900 dark:text-white mt-1">4.98 ★</p>
              <p className="text-xs text-emerald-600 mt-1 font-semibold">Top 1% of hosts</p>
            </div>
            <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1E1E1E]">
              <span className="text-xs text-neutral-400 font-bold uppercase">Total Bookings</span>
              <p className="text-2xl font-black text-neutral-900 dark:text-white mt-1">28</p>
              <p className="text-xs text-neutral-500 mt-1">100% response rate</p>
            </div>
            <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1E1E1E]">
              <span className="text-xs text-neutral-400 font-bold uppercase">Host Earnings</span>
              <p className="text-2xl font-black text-[#0EA5E9] mt-1">$14,280</p>
              <p className="text-xs text-neutral-500 mt-1">Auto deposited</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Link
              to="/host/my-listings"
              className="px-6 py-3 rounded-full font-bold text-sm bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-90"
            >
              Manage My Listings
            </Link>
            <Link
              to="/host/create"
              className="px-6 py-3 rounded-full font-bold text-sm bg-[#0EA5E9] text-white hover:bg-sky-600"
            >
              Create Another Listing
            </Link>
          </div>
        </div>
      )}

      {/* TAB 3: Settings & Demo Accounts */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl space-y-6">
          {/* Quick Demo Switcher */}
          <div className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1E1E1E] space-y-4">
            <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
              <Key className="w-4 h-4 text-[#0EA5E9]" />
              <span>Switch Demo Persona for Instant Testing</span>
            </h3>
            <p className="text-xs text-neutral-500">
              Quickly switch between guest and superhost profiles without entering any passwords.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => loginAsDemoUser('guest')}
                className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-700 hover:border-[#0EA5E9] text-left transition-colors bg-neutral-50 dark:bg-neutral-900/40"
              >
                <p className="font-bold text-sm text-neutral-900 dark:text-white">Alex Rivera (Guest)</p>
                <p className="text-xs text-neutral-500 mt-1">Has confirmed bookings & wishlists</p>
              </button>

              <button
                onClick={() => loginAsDemoUser('host')}
                className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-700 hover:border-[#0EA5E9] text-left transition-colors bg-neutral-50 dark:bg-neutral-900/40"
              >
                <p className="font-bold text-sm text-neutral-900 dark:text-white">Elena Rostova (Superhost)</p>
                <p className="text-xs text-neutral-500 mt-1">Owns cave villa in Santorini</p>
              </button>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1E1E1E] flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sm text-neutral-900 dark:text-white">Interface Appearance</h4>
              <p className="text-xs text-neutral-500">Currently active: {isDark ? 'Dark Mode' : 'Light Mode'}</p>
            </div>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs border border-neutral-300 dark:border-neutral-700"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
              <span>Toggle Theme</span>
            </button>
          </div>

          {/* Supabase Status */}
          <div className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1E1E1E] flex items-start gap-4">
            <div className="p-2.5 rounded-2xl bg-sky-50 dark:bg-sky-950/40 text-[#0EA5E9]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-neutral-900 dark:text-white">Database & Auth Engine</h4>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    isSupabaseConfigured
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300'
                  }`}
                >
                  {isSupabaseConfigured ? 'Supabase Connected' : 'Local Fast-Storage Active'}
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                {isSupabaseConfigured
                  ? 'All listings, bookings, and wishlists are syncing with your real Supabase cloud project.'
                  : 'Operating in self-contained high performance mode. Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in settings anytime to switch to cloud Postgres.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
