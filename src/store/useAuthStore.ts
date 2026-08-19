import { create } from 'zustand';
import { User } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  authModalOpen: boolean;
  authModalMode: 'signin' | 'signup';
  setAuthModal: (open: boolean, mode?: 'signin' | 'signup') => void;
  setUser: (user: User | null) => void;
  signInWithEmail: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signUpWithEmail: (email: string, pass: string, fullName: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  loginAsDemoUser: (role: 'guest' | 'host') => void;
  initAuth: () => Promise<void>;
}

const DEMO_GUEST: User = {
  id: 'user-guest-1',
  email: 'alex.rivera@skybnb.com',
  full_name: 'Alex Rivera',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  is_host: false,
  joined_date: 'March 2024',
};

const DEMO_HOST: User = {
  id: 'user-host-1',
  email: 'elena.rostova@skybnb.com',
  full_name: 'Elena Rostova (Superhost)',
  avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
  is_host: true,
  bio: 'Architect and passionate hospitality host in the Greek Cyclades.',
  joined_date: 'January 2022',
};

const getStoredLocalUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('skybnb-user');
    return raw ? JSON.parse(raw) : DEMO_GUEST; // default to demo guest for effortless preview
  } catch {
    return DEMO_GUEST;
  }
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: getStoredLocalUser(),
  isLoading: false,
  authModalOpen: false,
  authModalMode: 'signin',

  setAuthModal: (open, mode = 'signin') => {
    set({ authModalOpen: open, authModalMode: mode });
  },

  setUser: (user) => {
    if (user) {
      localStorage.setItem('skybnb-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('skybnb-user');
    }
    set({ user });
  },

  loginAsDemoUser: (role: 'guest' | 'host') => {
    const selected = role === 'host' ? DEMO_HOST : DEMO_GUEST;
    get().setUser(selected);
    set({ authModalOpen: false });
  },

  signInWithEmail: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data.user) {
          const user: User = {
            id: data.user.id,
            email: data.user.email || email,
            full_name: data.user.user_metadata?.full_name || email.split('@')[0],
            avatar_url: data.user.user_metadata?.avatar_url,
            is_host: data.user.user_metadata?.is_host || false,
          };
          get().setUser(user);
          set({ isLoading: false, authModalOpen: false });
          return { success: true };
        }
      }

      // Local / Offline fallback auth
      const user: User = {
        id: 'user-' + Date.now(),
        email,
        full_name: email.split('@')[0],
        avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80',
        is_host: email.toLowerCase().includes('host'),
        joined_date: 'Today',
      };
      get().setUser(user);
      set({ isLoading: false, authModalOpen: false });
      return { success: true };
    } catch (err: any) {
      set({ isLoading: false });
      return { success: false, error: err?.message || 'Authentication failed' };
    }
  },

  signUpWithEmail: async (email: string, password: string, fullName: string) => {
    set({ isLoading: true });
    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName, is_host: false } },
        });
        if (error) throw error;
        if (data.user) {
          const user: User = {
            id: data.user.id,
            email: data.user.email || email,
            full_name: fullName,
            is_host: false,
          };
          get().setUser(user);
          set({ isLoading: false, authModalOpen: false });
          return { success: true };
        }
      }

      // Local fallback
      const user: User = {
        id: 'user-' + Date.now(),
        email,
        full_name: fullName,
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
        is_host: false,
        joined_date: 'Today',
      };
      get().setUser(user);
      set({ isLoading: false, authModalOpen: false });
      return { success: true };
    } catch (err: any) {
      set({ isLoading: false });
      return { success: false, error: err?.message || 'Registration failed' };
    }
  },

  signOut: async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    get().setUser(null);
  },

  initAuth: async () => {
    if (isSupabaseConfigured) {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const user: User = {
          id: session.user.id,
          email: session.user.email || '',
          full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
          avatar_url: session.user.user_metadata?.avatar_url,
          is_host: session.user.user_metadata?.is_host || false,
        };
        get().setUser(user);
      }
    }
  },
}));
