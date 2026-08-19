import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  CheckCircle2,
  ShieldCheck,
  Star,
  CreditCard,
  Lock,
  Calendar,
  Users,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { useListing } from '../../hooks/useListing';
import { useBookingStore } from '../../store/useBookingStore';
import { useBookings } from '../../hooks/useBookings';
import { useAuthStore } from '../../store/useAuthStore';
import { motion, AnimatePresence } from 'motion/react';

export default function BookingConfirm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: listing } = useListing(id);

  const user = useAuthStore((s) => s.user);
  const setAuthModal = useAuthStore((s) => s.setAuthModal);

  const storedListing = useBookingStore((s) => s.listing);
  const checkIn = useBookingStore((s) => s.checkIn) || '2026-09-15';
  const checkOut = useBookingStore((s) => s.checkOut) || '2026-09-20';
  const guests = useBookingStore((s) => s.guests) || 2;
  const calculateBreakdown = useBookingStore((s) => s.calculateBreakdown);

  const { createBooking, isCreating } = useBookings();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'google_pay'>('card');
  const [confirmedModalOpen, setConfirmedModalOpen] = useState(false);
  const [bookingRefId, setBookingRefId] = useState('');

  const currentListing = listing || storedListing;

  if (!currentListing) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-white dark:bg-[#1E1E1E] rounded-3xl border border-neutral-200 dark:border-neutral-800">
        <h2 className="text-xl font-bold">No active reservation</h2>
        <p className="text-sm text-neutral-500 mt-2 mb-6">
          Please select a listing from Explore to begin your booking.
        </p>
        <Link
          to="/"
          className="px-6 py-2.5 rounded-full font-bold text-sm bg-[#0EA5E9] text-white"
        >
          Explore Stays
        </Link>
      </div>
    );
  }

  // Calculate pricing
  const start = new Date(checkIn).getTime();
  const end = new Date(checkOut).getTime();
  const nights = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
  const basePrice = currentListing.price_per_night * nights;
  const cleaningFee = currentListing.cleaning_fee || 80;
  const serviceFee = Math.round(basePrice * 0.12);
  const taxes = Math.round(basePrice * 0.08);
  const grandTotal = basePrice + cleaningFee + serviceFee + taxes;

  const handleConfirmReservation = async () => {
    if (!user) {
      setAuthModal(true, 'signin');
      return;
    }

    try {
      const result = await createBooking({
        listing_id: currentListing.id,
        listing_title: currentListing.title,
        listing_location: currentListing.location,
        listing_photo: currentListing.photos[0],
        listing_price: currentListing.price_per_night,
        guest_id: user.id,
        guest_name: user.full_name,
        guest_email: user.email,
        check_in: checkIn,
        check_out: checkOut,
        nights,
        guests_count: guests,
        base_price: basePrice,
        cleaning_fee: cleaningFee,
        service_fee: serviceFee,
        taxes,
        total_price: grandTotal,
        status: 'confirmed',
      });

      setBookingRefId(result.id);
      setConfirmedModalOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28">
      {/* Back button */}
      <div className="mb-6">
        <Link
          to={`/listing/${currentListing.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to listing</span>
        </Link>
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-8">
        Confirm and pay
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Trip details & Payment (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Trip Details Box */}
          <div className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1E1E1E] space-y-5">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Your trip details</h2>

            <div className="flex items-center justify-between py-3 border-b border-neutral-100 dark:border-neutral-800/80">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-[#0EA5E9]">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-neutral-900 dark:text-white">Dates</h4>
                  <p className="text-xs text-neutral-500">
                    {checkIn} to {checkOut} ({nights} nights)
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-[#0EA5E9]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-neutral-900 dark:text-white">Guests</h4>
                  <p className="text-xs text-neutral-500">
                    {guests} guest{guests > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1E1E1E] space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Payment Method</h2>
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <Lock className="w-3.5 h-3.5" /> 256-Bit Encrypted
              </span>
            </div>

            <div className="space-y-3">
              <label
                onClick={() => setPaymentMethod('card')}
                className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'border-[#0EA5E9] bg-sky-50/50 dark:bg-sky-950/30 ring-2 ring-[#0EA5E9]/20'
                    : 'border-neutral-200 dark:border-neutral-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-[#0EA5E9]" />
                  <div>
                    <p className="font-bold text-sm text-neutral-900 dark:text-white">
                      Credit / Debit Card
                    </p>
                    <p className="text-xs text-neutral-500">Visa, Mastercard, Amex</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="text-[#0EA5E9] focus:ring-[#0EA5E9]"
                />
              </label>

              {paymentMethod === 'card' && (
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-3 animate-in fade-in">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-neutral-500 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      defaultValue="4532 •••• •••• 8821"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1E1E1E] text-sm font-mono focus:ring-2 focus:ring-[#0EA5E9] focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-neutral-500 mb-1">
                        Expiration
                      </label>
                      <input
                        type="text"
                        defaultValue="08/29"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1E1E1E] text-sm font-mono focus:ring-2 focus:ring-[#0EA5E9] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-neutral-500 mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        defaultValue="888"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1E1E1E] text-sm font-mono focus:ring-2 focus:ring-[#0EA5E9] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Cancellation Policy & Guarantee */}
          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 flex items-start gap-3.5 text-xs text-neutral-600 dark:text-neutral-400">
            <ShieldCheck className="w-5 h-5 text-[#0EA5E9] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-neutral-900 dark:text-neutral-100">
                Free cancellation before {checkIn}
              </p>
              <p className="mt-0.5 leading-relaxed">
                Cancel up to 48 hours before check in for a 100% full refund with SkyCover guarantee.
              </p>
            </div>
          </div>

          {/* Final Confirm Button */}
          <button
            id="confirm-pay-btn"
            disabled={isCreating}
            onClick={handleConfirmReservation}
            className="w-full py-4 rounded-2xl font-extrabold text-base bg-[#0EA5E9] hover:bg-sky-600 text-white shadow-xl shadow-sky-500/25 transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isCreating ? (
              <span>Confirming Reservation...</span>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Confirm & Pay ${grandTotal}</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Listing Card & Price Summary (5 cols) */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1E1E1E] shadow-xl space-y-6">
            {/* Listing overview */}
            <div className="flex gap-4 items-center pb-6 border-b border-neutral-200 dark:border-neutral-800">
              <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-neutral-100 dark:bg-neutral-800">
                <img
                  src={currentListing.photos[0]}
                  alt={currentListing.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#0EA5E9] uppercase tracking-wider">
                  {currentListing.type}
                </p>
                <h3 className="font-bold text-sm text-neutral-900 dark:text-white truncate mt-0.5">
                  {currentListing.title}
                </h3>
                <p className="text-xs text-neutral-500 truncate mt-0.5">{currentListing.location}</p>
                <div className="flex items-center gap-1 text-xs font-bold mt-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{currentListing.rating.toFixed(2)}</span>
                  <span className="text-neutral-400 font-normal">
                    ({currentListing.review_count} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Price Details */}
            <div className="space-y-3 text-xs text-neutral-600 dark:text-neutral-300">
              <h4 className="font-bold text-sm text-neutral-900 dark:text-white">Price details</h4>
              <div className="flex justify-between">
                <span>
                  ${currentListing.price_per_night} x {nights} nights
                </span>
                <span className="font-medium">${basePrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Cleaning fee</span>
                <span className="font-medium">${cleaningFee}</span>
              </div>
              <div className="flex justify-between">
                <span>Skybnb service fee</span>
                <span className="font-medium">${serviceFee}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span className="font-medium">${taxes}</span>
              </div>

              <div className="flex justify-between font-bold text-base text-neutral-900 dark:text-white pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <span>Total (USD)</span>
                <span className="text-[#0EA5E9]">${grandTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Success Modal */}
      <AnimatePresence>
        {confirmedModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg p-8 rounded-3xl bg-white dark:bg-[#1E1E1E] text-center border border-neutral-200 dark:border-neutral-800 shadow-2xl space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-neutral-900 dark:text-white">
                  Reservation Confirmed!
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Confirmation Code:{' '}
                  <span className="font-mono font-bold text-neutral-800 dark:text-neutral-200">
                    SKY-{bookingRefId ? bookingRefId.slice(-6).toUpperCase() : '8X9K2L'}
                  </span>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 text-left text-xs space-y-2">
                <div className="font-bold text-sm text-neutral-900 dark:text-white">
                  {currentListing.title}
                </div>
                <div className="text-neutral-500">{currentListing.location}</div>
                <div className="text-neutral-700 dark:text-neutral-300 font-semibold pt-1 border-t border-neutral-200 dark:border-neutral-800">
                  {checkIn} → {checkOut} ({nights} nights · {guests} guests)
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  to="/profile?tab=trips"
                  className="flex-1 py-3.5 rounded-full font-bold text-sm bg-[#0EA5E9] text-white hover:bg-sky-600 transition-colors shadow-md"
                >
                  View in My Trips
                </Link>
                <Link
                  to="/"
                  className="flex-1 py-3.5 rounded-full font-semibold text-sm border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  Explore More Stays
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
