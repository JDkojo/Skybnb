import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Sparkles, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export default function SignUp() {
  const navigate = useNavigate();
  const signUpWithEmail = useAuthStore((s) => s.signUpWithEmail);
  const loginAsDemoUser = useAuthStore((s) => s.loginAsDemoUser);
  const isLoading = useAuthStore((s) => s.isLoading);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!fullName) {
      setError('Please enter your full name');
      return;
    }
    const res = await signUpWithEmail(email, password, fullName);
    if (res.success) {
      navigate('/');
    } else {
      setError(res.error || 'Failed to create account');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-8 rounded-3xl bg-white dark:bg-[#1E1E1E] border border-neutral-200 dark:border-neutral-800 shadow-xl space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-black text-neutral-900 dark:text-white">Create an Account</h1>
          <p className="text-xs text-neutral-500 mt-1">Join the global Skybnb travel community</p>
        </div>

        {/* 1-Click Fast Demo Logins */}
        <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 space-y-2.5">
          <span className="flex items-center gap-1.5 text-xs font-bold text-[#0EA5E9] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Instant Test Login
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                loginAsDemoUser('guest');
                navigate('/');
              }}
              className="p-2.5 rounded-xl text-xs font-bold bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:border-[#0EA5E9] transition-all flex items-center justify-center gap-1"
            >
              <User className="w-3.5 h-3.5 text-[#0EA5E9]" />
              <span>Guest Demo</span>
            </button>
            <button
              type="button"
              onClick={() => {
                loginAsDemoUser('host');
                navigate('/');
              }}
              className="p-2.5 rounded-xl text-xs font-bold bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:border-[#0EA5E9] transition-all flex items-center justify-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>Superhost Demo</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                required
                placeholder="e.g. Alex Rivera"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
              />
            </div>
          </div>

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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl font-bold text-sm bg-[#0EA5E9] hover:bg-sky-600 text-white shadow-md transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center text-xs text-neutral-500">
          Already have an account?{' '}
          <Link to="/sign-in" className="font-bold text-[#0EA5E9] hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
