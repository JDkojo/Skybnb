import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Lock } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useAuthStore((s) => s.user);
  const setAuthModal = useAuthStore((s) => s.setAuthModal);

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-white dark:bg-[#1E1E1E] rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xl">
        <div className="w-14 h-14 rounded-2xl bg-sky-50 dark:bg-sky-950/50 text-[#0EA5E9] flex items-center justify-center mx-auto mb-4">
          <Lock className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Authentication Required</h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 mb-6">
          Please sign in or create an account to access this page and manage your bookings or listings.
        </p>
        <button
          onClick={() => setAuthModal(true, 'signin')}
          className="w-full py-3 rounded-full font-bold text-sm bg-[#0EA5E9] text-white hover:bg-sky-600 transition-transform active:scale-95 shadow-md"
        >
          Sign In to Skybnb
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
