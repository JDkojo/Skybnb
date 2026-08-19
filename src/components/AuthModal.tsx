import React, { useState } from 'react';
import { X, Sparkles, ShieldCheck, Mail, Lock, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuthStore } from '../store/useAuthStore';

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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-md rounded-3xl bg-white dark:bg-[#1E1E1E] text-neutral-900 dark:text-neutral-100 shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
            <h3 className="font-bold text-lg text-neutral-900 dark:text-neutral-100">
              {mode === 'signin' ? 'Welcome back to Skybnb' : 'Create your Skybnb account'}
            </h3>
            <button
              onClick={() => setAuthModal(false)}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-5">
            {/* 1-Click Fast Demo Logins for smooth evaluation */}
            <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0EA5E9] uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Instant 1-Click Test Logins</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => loginAsDemoUser('guest')}
                  className="px-3 py-2 rounded-xl text-xs font-bold bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:border-[#0EA5E9] transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <UserIcon className="w-3.5 h-3.5 text-[#0EA5E9]" />
                  <span>Demo Guest</span>
                </button>
                <button
                  type="button"
                  onClick={() => loginAsDemoUser('host')}
                  className="px-3 py-2 rounded-xl text-xs font-bold bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:border-[#0EA5E9] transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                  <span>Demo Superhost</span>
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
            <form onSubmit={handleSubmit} className="space-y-4">
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
                      placeholder="e.g. Alex Rivera"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
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
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
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
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl font-bold text-sm bg-[#0EA5E9] hover:bg-sky-600 text-white shadow-md transition-transform active:scale-[0.98] disabled:opacity-50"
              >
                {isLoading
                  ? 'Processing...'
                  : mode === 'signin'
                  ? 'Sign In'
                  : 'Create Account'}
              </button>
            </form>

            <div className="text-center text-xs text-neutral-500 dark:text-neutral-400 pt-2">
              {mode === 'signin' ? (
                <span>
                  Don’t have an account?{' '}
                  <button
                    onClick={() => setMode('signup')}
                    className="font-bold text-[#0EA5E9] hover:underline"
                  >
                    Sign up
                  </button>
                </span>
              ) : (
                <span>
                  Already have an account?{' '}
                  <button
                    onClick={() => setMode('signin')}
                    className="font-bold text-[#0EA5E9] hover:underline"
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
