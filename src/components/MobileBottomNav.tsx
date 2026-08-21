import React from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Heart, MessageSquare, PlusCircle, User, Compass } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export function MobileBottomNav() {
  const user = useAuthStore((s) => s.user);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0A1422]/95 backdrop-blur-xl border-t border-neutral-200/90 dark:border-[#1E3557] pt-2 pb-[max(0.65rem,env(safe-area-inset-bottom))] px-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_24px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-around max-w-md mx-auto">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-1 text-[11px] font-bold tracking-tight transition-all active:scale-95 ${
              isActive
                ? 'text-[#C5A059]'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Compass className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span>Explore</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#C5A059] -mt-0.5" />
              )}
            </>
          )}
        </NavLink>

        <NavLink
          to="/wishlists"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-1 text-[11px] font-bold tracking-tight transition-all active:scale-95 ${
              isActive
                ? 'text-[#C5A059]'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Heart className={`w-5 h-5 ${isActive ? 'stroke-[2.5] fill-[#C5A059]' : 'stroke-2'}`} />
              <span>Saved</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#C5A059] -mt-0.5" />
              )}
            </>
          )}
        </NavLink>

        <NavLink
          to="/host/create"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-1 text-[11px] font-bold tracking-tight transition-all active:scale-95 ${
              isActive
                ? 'text-[#C5A059]'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <PlusCircle className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span>List Free</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#C5A059] -mt-0.5" />
              )}
            </>
          )}
        </NavLink>

        <NavLink
          to="/profile?tab=inquiries"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-1 text-[11px] font-bold tracking-tight transition-all active:scale-95 ${
              isActive
                ? 'text-[#C5A059]'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <MessageSquare className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span>Inquiries</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#C5A059] -mt-0.5" />
              )}
            </>
          )}
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-1 text-[11px] font-bold tracking-tight transition-all active:scale-95 ${
              isActive
                ? 'text-[#C5A059]'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <User className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span>{user ? 'Profile' : 'Sign in'}</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#C5A059] -mt-0.5" />
              )}
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
}
