import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
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
  Building2,
  Search,
} from 'lucide-react';
import { ValpromarkLogo } from './ValpromarkLogo';
import { SearchBar } from './SearchBar';
import { ThemeToggle } from './ThemeToggle';
import { useAuthStore } from '../store/useAuthStore';
import { useAppStore } from '../store/useAppStore';
import { useSearchStore } from '../store/useSearchStore';

export function Navbar() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const setAuthModal = useAuthStore((s) => s.setAuthModal);
  const viewMode = useAppStore((s) => s.viewMode);
  const setViewMode = useAppStore((s) => s.setViewMode);
  const setSearchModalOpen = useSearchStore((s) => s.setSearchModalOpen);

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
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#0A1422]/95 backdrop-blur-md border-b border-neutral-200/80 dark:border-[#1E3557]/80 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Valpromark Company Logo */}
        <Link
          to="/"
          id="valpromark-logo"
          className="flex items-center group shrink-0"
          title="Valpromark Ghana Luxury Stays"
        >
          <div className="hidden lg:block">
            <ValpromarkLogo variant="full" size="md" />
          </div>
          <div className="hidden sm:block lg:hidden">
            <ValpromarkLogo variant="compact" size="md" />
          </div>
          <div className="sm:hidden">
            <ValpromarkLogo variant="compact" size="sm" />
          </div>
        </Link>

        {/* Center Search Pill for Desktop/Tablet */}
        <div className="hidden sm:flex flex-1 min-w-0 max-w-md lg:max-w-lg mx-2 justify-center">
          <SearchBar />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Mobile Search Icon Button */}
          <button
            id="mobile-search-btn"
            type="button"
            onClick={() => setSearchModalOpen(true, 'location')}
            className="sm:hidden p-2.5 rounded-full text-neutral-700 dark:text-[#E5C158] bg-white dark:bg-[#0F1E33] hover:bg-neutral-100 dark:hover:bg-[#1E3557]/60 border border-neutral-200 dark:border-[#1E3557] hover:border-[#C5A059] shadow-sm active:scale-95 transition-all flex items-center justify-center focus:outline-none"
            aria-label="Search properties"
            title="Search Ghana Stays"
          >
            <Search className="w-4 h-4 text-[#C5A059] stroke-[2.5]" />
          </button>

          {/* Host link */}
          <Link
            to="/host/create"
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-neutral-800 dark:text-[#E5C158] hover:bg-[#C5A059]/10 transition-colors border border-transparent hover:border-[#C5A059]/30"
          >
            <PlusCircle className="w-4 h-4 text-[#C5A059]" />
            <span>List with Valpromark</span>
          </Link>

          {/* Grid / Map Toggle Button */}
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'map' : 'grid')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full border border-neutral-200 dark:border-[#1E3557] text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:border-[#C5A059] hover:text-[#C5A059] transition-all bg-white dark:bg-[#0F1E33]"
            title={`Switch to ${viewMode === 'grid' ? 'Map' : 'Grid'} view`}
          >
            {viewMode === 'grid' ? (
              <>
                <Map className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Map</span>
              </>
            ) : (
              <>
                <Grid className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Grid</span>
              </>
            )}
          </button>

          {/* Dark Mode Switcher */}
          <ThemeToggle />

          {/* User Account Menu Button */}
          <div className="relative" ref={menuRef}>
            <button
              id="user-menu-btn"
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 pl-2 sm:pl-3 rounded-full border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] hover:border-[#C5A059] hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 active:scale-95"
              aria-label="User account menu"
            >
              <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-600 dark:text-neutral-300 stroke-[2.2]" />
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.full_name}
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover ring-1.5 ring-[#C5A059]"
                />
              ) : (
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-neutral-100 dark:bg-[#1E3557] flex items-center justify-center text-[#C5A059]">
                  <UserIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              )}
            </button>

            {/* Dropdown Box */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-[#0F1E33] shadow-2xl border border-neutral-200 dark:border-[#1E3557] py-2 z-50 text-sm animate-in fade-in slide-in-from-top-2 duration-150">
                {user ? (
                  <>
                    <div className="px-4 py-2.5 border-b border-neutral-100 dark:border-[#1E3557]/80">
                      <p className="font-bold text-neutral-900 dark:text-white truncate">
                        {user.full_name}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{user.email}</p>
                      {user.is_host && (
                        <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30">
                          <ShieldCheck className="w-3 h-3" /> Essence Superhost
                        </span>
                      )}
                    </div>

                    <Link
                      to="/wishlists"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-neutral-700 dark:text-neutral-200 hover:bg-[#C5A059]/10 hover:text-[#C5A059] transition-colors"
                    >
                      <Heart className="w-4 h-4 text-[#C5A059]" />
                      <span>Saved Wishlists</span>
                    </Link>

                    <Link
                      to="/profile?tab=trips"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-neutral-700 dark:text-neutral-200 hover:bg-[#C5A059]/10 hover:text-[#C5A059] transition-colors"
                    >
                      <CalendarDays className="w-4 h-4 text-[#C5A059]" />
                      <span>My Ghana Trips</span>
                    </Link>

                    <Link
                      to="/host/my-listings"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-neutral-700 dark:text-neutral-200 hover:bg-[#C5A059]/10 hover:text-[#C5A059] transition-colors"
                    >
                      <Building2 className="w-4 h-4 text-[#C5A059]" />
                      <span>Host Property Hub</span>
                    </Link>

                    <Link
                      to="/host/create"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-neutral-700 dark:text-neutral-200 hover:bg-[#C5A059]/10 hover:text-[#C5A059] transition-colors"
                    >
                      <PlusCircle className="w-4 h-4 text-[#C5A059]" />
                      <span>List a Property in Ghana</span>
                    </Link>

                    <Link
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-neutral-700 dark:text-neutral-200 hover:bg-[#C5A059]/10 hover:text-[#C5A059] transition-colors"
                    >
                      <UserIcon className="w-4 h-4 text-[#C5A059]" />
                      <span>Account Settings</span>
                    </Link>

                    <div className="border-t border-neutral-100 dark:border-[#1E3557]/80 my-1" />

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
                      className="w-full text-left px-4 py-2.5 font-bold text-neutral-900 dark:text-[#E5C158] hover:bg-[#C5A059]/10 transition-colors"
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
                    <div className="border-t border-neutral-100 dark:border-[#1E3557]/80 my-1" />
                    <Link
                      to="/host/create"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2.5 text-neutral-700 dark:text-neutral-300 hover:bg-[#C5A059]/10 hover:text-[#C5A059] transition-colors"
                    >
                      List your home with Valpromark
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
