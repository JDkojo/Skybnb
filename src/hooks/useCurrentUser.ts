import { useAuthStore } from '../store/useAuthStore';

export function useCurrentUser() {
  const user = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.isLoading);
  const signOut = useAuthStore((s) => s.signOut);
  const loginAsDemoUser = useAuthStore((s) => s.loginAsDemoUser);
  const setAuthModal = useAuthStore((s) => s.setAuthModal);

  return {
    user,
    isAuthenticated: Boolean(user),
    isHost: Boolean(user?.is_host),
    isLoading,
    signOut,
    loginAsDemoUser,
    openSignIn: () => setAuthModal(true, 'signin'),
    openSignUp: () => setAuthModal(true, 'signup'),
  };
}
