import React from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Heart, CalendarDays, PlusCircle, User } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export function MobileBottomNav() {
  const user = useAuthStore((s) => s.user);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-lg border-t border-neutral-200 dark:border-neutral-800 py-2 px-3 shadow-lg">
      <div className="flex items-center justify-around">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
              isActive
                ? 'text-[#0EA5E9]'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`
          }
        >
          <Search className="w-5 h-5" />
          <span>Explore</span>
        </NavLink>

        <NavLink
          to="/wishlists"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
              isActive
                ? 'text-[#0EA5E9]'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`
          }
        >
          <Heart className="w-5 h-5" />
          <span>Wishlists</span>
        </NavLink>

        <NavLink
          to="/host/create"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
              isActive
                ? 'text-[#0EA5E9]'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`
          }
        >
          <PlusCircle className="w-5 h-5" />
          <span>Host</span>
        </NavLink>

        <NavLink
          to="/profile?tab=trips"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
              isActive
                ? 'text-[#0EA5E9]'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`
          }
        >
          <CalendarDays className="w-5 h-5" />
          <span>Trips</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
              isActive
                ? 'text-[#0EA5E9]'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`
          }
        >
          <User className="w-5 h-5" />
          <span>{user ? 'Profile' : 'Log in'}</span>
        </NavLink>
      </div>
    </nav>
  );
}
