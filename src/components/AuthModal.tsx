import React, { useState } from 'react';
import { X, Sparkles, ShieldCheck, Mail, Lock, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuthStore } from '../store/useAuthStore';
import { ValpromarkLogo } from './ValpromarkLogo';

export function AuthModal() {
  const authModalOpen = useAuthStore((s) => s.authModalOpen);
  const authModalMode = useAuthStore((s) => s.authModalMode);
  const setAuthModal = useAuthStore((s) => s.setAuthModal);
  const signInWithEmail = useAuthStore((s) => s.signInWithEmail);
  const signUpWithEmail = useAuthStore((s) => s.signUpWithEmail);
  const loginAsDemoUser = useAuthStore((s) => s.loginAsDemoUser);
  const isLoading = useAuthStore((s) => s.isLoading);

  const [mode, setMode] = useState<'signin' | 'signup'>(authModalMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync mode if changed from store
  React.useEffect(() => {
    setMode(authModalMode);
  }, [authModalMode]);

  if (!authModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (mode === 'signin') {
      const res = await signInWithEmail(email, password);
      if (!res.success) {
        setErrorMessage(res.error || 'Invalid credentials');
      }
    } else {
      if (!fullName) {
        setErrorMessage('Please enter your full name');
        return;
      }
      const res = await signUpWithEmail(email, password, fullName);
      if (!res.success) {
        setErrorMessage(res.error || 'Failed to create account');
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-md rounded-3xl bg-white dark:bg-[#0F1E33] text-neutral-900 dark:text-neutral-100 shadow-2xl border border-neutral-200 dark:border-[#1E3557] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-neutral-200 dark:border-[#1E3557]">
            <div className="flex items-center gap-2">
              <ValpromarkLogo size="sm" variant="icon" />
              <h3 className="font-bold text-base sm:text-lg text-neutral-900 dark:text-neutral-100">
                {mode === 'signin' ? 'Sign in to Valpromark' : 'Join Valpromark'}
              </h3>
            </div>
            <button
              onClick={() => setAuthModal(false)}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-[#0A1422] text-neutral-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 sm:p-6 space-y-4 sm:space-y-5">
            {/* 1-Click Fast Demo Logins for smooth evaluation */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#C5A059]/10 border border-[#C5A059]/30 space-y-2.5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#C5A059] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant 1-Click Ghana Demo Accounts</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => loginAsDemoUser('guest')}
                  className="px-2.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-[#0A1422] border border-neutral-200 dark:border-[#1E3557] text-neutral-800 dark:text-neutral-200 hover:border-[#C5A059] transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <UserIcon className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Kwame (Guest)</span>
                </button>
                <button
                  type="button"
                  onClick={() => loginAsDemoUser('host')}
                  className="px-2.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-[#0A1422] border border-neutral-200 dark:border-[#1E3557] text-neutral-800 dark:text-neutral-200 hover:border-[#C5A059] transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Akosua (Host)</span>
                </button>
              </div>
            </div>

            {/* Error banner */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs font-medium">
                {errorMessage}
              </div>
            )}

            {/* Email form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kwame Mensah"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 dark:border-[#1E3557] bg-white dark:bg-[#0A1422] text-neutral-900 dark:text-white placeholder-neutral-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 dark:border-[#1E3557] bg-white dark:bg-[#0A1422] text-neutral-900 dark:text-white placeholder-neutral-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 dark:border-[#1E3557] bg-white dark:bg-[#0A1422] text-neutral-900 dark:text-white placeholder-neutral-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-[#DFB24A] via-[#C5A059] to-[#DFB24A] text-[#0E1E38] shadow-md transition-transform active:scale-[0.98] disabled:opacity-50"
              >
                {isLoading
                  ? 'Processing...'
                  : mode === 'signin'
                  ? 'Sign In to Valpromark'
                  : 'Create Valpromark Account'}
              </button>
            </form>

            <div className="text-center text-xs text-neutral-500 dark:text-neutral-400 pt-2">
              {mode === 'signin' ? (
                <span>
                  Don’t have an account?{' '}
                  <button
                    onClick={() => setMode('signup')}
                    className="font-bold text-[#C5A059] hover:underline"
                  >
                    Sign up
                  </button>
                </span>
              ) : (
                <span>
                  Already have an account?{' '}
                  <button
                    onClick={() => setMode('signin')}
                    className="font-bold text-[#C5A059] hover:underline"
                  >
                    Sign in
                  </button>
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
