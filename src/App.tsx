/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { useAppStore } from './store/useAppStore';
import { useAuthStore } from './store/useAuthStore';

// Layout & Global Components
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';
import { ProtectedRoute } from './components/ProtectedRoute';

// Routes
import Explore from './routes/Explore';
import ListingDetail from './routes/listing/ListingDetail';
import BookingConfirm from './routes/booking/BookingConfirm';
import Wishlists from './routes/Wishlists';
import CreateListing from './routes/host/CreateListing';
import MyListings from './routes/host/MyListings';
import Profile from './routes/Profile';
import SignIn from './routes/auth/SignIn';
import SignUp from './routes/auth/SignUp';

export default function App() {
  const initTheme = useAppStore((s) => s.initTheme);
  const initAuth = useAuthStore((s) => s.initAuth);

  useEffect(() => {
    initTheme();
    initAuth();
  }, [initTheme, initAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#070D18] text-neutral-900 dark:text-neutral-100 transition-colors duration-200 flex flex-col selection:bg-[#C5A059]/30 selection:text-[#0E1E38]">
          {/* Top Desktop Navigation */}
          <Navbar />

          {/* Page Routing Views */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Explore />} />
              <Route path="/listing/:id" element={<ListingDetail />} />
              <Route
                path="/booking/:id"
                element={
                  <ProtectedRoute>
                    <BookingConfirm />
                  </ProtectedRoute>
                }
              />
              <Route path="/wishlists" element={<Wishlists />} />
              <Route
                path="/host/create"
                element={
                  <ProtectedRoute>
                    <CreateListing />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/host/my-listings"
                element={
                  <ProtectedRoute>
                    <MyListings />
                  </ProtectedRoute>
                }
              />
              <Route path="/profile" element={<Profile />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>

          {/* Bottom Tab Bar on Mobile Viewports */}
          <MobileBottomNav />

          {/* Modals */}
          <SearchModal />
          <AuthModal />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

