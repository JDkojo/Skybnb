import { create } from 'zustand';

type ThemeMode = 'light' | 'dark' | 'system';

interface AppState {
  theme: ThemeMode;
  isDark: boolean;
  viewMode: 'grid' | 'map';
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setViewMode: (mode: 'grid' | 'map') => void;
  initTheme: () => void;
}

const getStoredTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'system';
  const saved = localStorage.getItem('skybnb-theme') as ThemeMode;
  return saved || 'system';
};

const resolveIsDark = (theme: ThemeMode): boolean => {
  if (theme === 'dark') return true;
  if (theme === 'light') return false;
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
};

const applyDarkClass = (isDark: boolean) => {
  if (typeof document !== 'undefined') {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
};

export const useAppStore = create<AppState>((set, get) => ({
  theme: getStoredTheme(),
  isDark: resolveIsDark(getStoredTheme()),
  viewMode: 'grid',

  setTheme: (theme: ThemeMode) => {
    localStorage.setItem('skybnb-theme', theme);
    const isDark = resolveIsDark(theme);
    applyDarkClass(isDark);
    set({ theme, isDark });
  },

  toggleTheme: () => {
    const currentIsDark = get().isDark;
    const nextTheme = currentIsDark ? 'light' : 'dark';
    get().setTheme(nextTheme);
  },

  setViewMode: (viewMode) => set({ viewMode }),

  initTheme: () => {
    const saved = getStoredTheme();
    const isDark = resolveIsDark(saved);
    applyDarkClass(isDark);
    set({ theme: saved, isDark });

    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = (e: MediaQueryListEvent) => {
        if (get().theme === 'system') {
          applyDarkClass(e.matches);
          set({ isDark: e.matches });
        }
      };
      mediaQuery.addEventListener('change', listener);
    }
  },
}));
