import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  Menu,
  User as UserIcon,
  PlusCircle,
  Heart,
  CalendarDays,
  LogOut,
  Sparkles,
  Map,
  Grid,
  ShieldCheck,
} from 'lucide-react';
import { SearchBar } from './SearchBar';
import { ThemeToggle } from './ThemeToggle';
import { useAuthStore } from '../store/useAuthStore';
import { useAppStore } from '../store/useAppStore';

export function Navbar() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const setAuthModal = useAuthStore((s) => s.setAuthModal);
  const viewMode = useAppStore((s) => s.viewMode);
  const setViewMode = useAppStore((s) => s.setViewMode);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          to="/"
          id="skybnb-logo"
          className="flex items-center gap-2.5 group shrink-0"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0EA5E9] to-sky-400 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Compass className="w-6 h-6 stroke-[2.2]" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Sky<span className="text-[#0EA5E9]">bnb</span>
          </span>
        </Link>

        {/* Center Search Pill */}
        <div className="flex-1 max-w-lg mx-2 flex justify-center">
          <SearchBar />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Host link */}
          <Link
            to="/host/create"
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <PlusCircle className="w-4 h-4 text-[#0EA5E9]" />
            <span>Skybnb your home</span>
          </Link>

          {/* Grid / Map Toggle Button */}
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'map' : 'grid')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-all bg-white dark:bg-[#1E1E1E]"
            title={`Switch to ${viewMode === 'grid' ? 'Map' : 'Grid'} view`}
          >
            {viewMode === 'grid' ? (
              <>
                <Map className="w-3.5 h-3.5" />
                <span>Map</span>
              </>
            ) : (
              <>
                <Grid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </>
            )}
          </button>

          {/* Dark Mode Switcher */}
          <ThemeToggle />

          {/* User Menu Dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              id="user-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2.5 p-1.5 pl-3 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#1E1E1E] hover:shadow-md transition-all duration-200"
            >
              <Menu className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.full_name}
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-[#0EA5E9]/40"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-300">
                  <UserIcon className="w-4 h-4" />
                </div>
              )}
            </button>

            {/* Dropdown Box */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-[#1E1E1E] shadow-2xl border border-neutral-200 dark:border-neutral-800 py-2 z-50 text-sm animate-in fade-in slide-in-from-top-2 duration-150">
                {user ? (
                  <>
                    <div className="px-4 py-2.5 border-b border-neutral-100 dark:border-neutral-800/80">
                      <p className="font-bold text-neutral-900 dark:text-white truncate">
                        {user.full_name}
                      </p>
                      <p className="text-xs text-neutral-500 truncate">{user.email}</p>
                      {user.is_host && (
                        <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                          <ShieldCheck className="w-3 h-3" /> Superhost
                        </span>
                      )}
                    </div>

                    <Link
                      to="/wishlists"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors"
                    >
                      <Heart className="w-4 h-4 text-[#0EA5E9]" />
                      <span>Wishlists</span>
                    </Link>

                    <Link
                      to="/profile?tab=trips"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors"
                    >
                      <CalendarDays className="w-4 h-4 text-[#0EA5E9]" />
                      <span>My Trips & Bookings</span>
                    </Link>

                    <Link
                      to="/host/my-listings"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors"
                    >
                      <Sparkles className="w-4 h-4 text-[#0EA5E9]" />
                      <span>Manage Listings</span>
                    </Link>

                    <Link
                      to="/host/create"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors"
                    >
                      <PlusCircle className="w-4 h-4 text-[#0EA5E9]" />
                      <span>Create New Listing</span>
                    </Link>

                    <Link
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors"
                    >
                      <UserIcon className="w-4 h-4 text-[#0EA5E9]" />
                      <span>Account Profile</span>
                    </Link>

                    <div className="border-t border-neutral-100 dark:border-neutral-800/80 my-1" />

                    <button
                      onClick={async () => {
                        await signOut();
                        setMenuOpen(false);
                        navigate('/');
                      }}
                      className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setAuthModal(true, 'signin');
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 font-bold text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                      Sign in
                    </button>
                    <button
                      onClick={() => {
                        setAuthModal(true, 'signup');
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                      Sign up
                    </button>
                    <div className="border-t border-neutral-100 dark:border-neutral-800/80 my-1" />
                    <Link
                      to="/host/create"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2.5 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                      Skybnb your home
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
