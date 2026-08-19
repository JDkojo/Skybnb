import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export function ThemeToggle() {
  const isDark = useAppStore((s) => s.isDark);
  const toggleTheme = useAppStore((s) => s.toggleTheme);

  return (
    <button
      id="theme-toggle-btn"
      type="button"
      onClick={toggleTheme}
      className="relative p-2.5 rounded-full text-neutral-600 dark:text-neutral-300 hover:text-[#C5A059] dark:hover:text-[#E5C158] bg-white dark:bg-[#0F1E33] hover:bg-neutral-100 dark:hover:bg-[#1E3557]/60 transition-all duration-200 border border-neutral-200 dark:border-[#1E3557] hover:border-[#C5A059] shadow-sm active:scale-95 focus:outline-none"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode (Valpromark Navy)'}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[#E5C158] transition-transform duration-300 rotate-0" />
      ) : (
        <Moon className="w-4 h-4 text-[#0E1E38] transition-transform duration-300" />
      )}
    </button>
  );
}

