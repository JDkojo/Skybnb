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
  Smartphone,
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

  const { createBooking, isCreating } = useBookings();

  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'card'>('momo');
  const [momoProvider, setMomoProvider] = useState<'mtn' | 'telecel' | 'at'>('mtn');
  const [momoNumber, setMomoNumber] = useState('0244 123 456');
  const [confirmedModalOpen, setConfirmedModalOpen] = useState(false);
  const [bookingRefId, setBookingRefId] = useState('');

  const currentListing = listing || storedListing;

  if (!currentListing) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-white dark:bg-[#0F1E33] rounded-3xl border border-neutral-200 dark:border-[#1E3557]">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">No active stay selected</h2>
        <p className="text-sm text-neutral-500 mt-2 mb-6">
          Please select an accommodation in Ghana to begin your reservation.
        </p>
        <Link
          to="/"
          className="px-6 py-2.5 rounded-full font-bold text-sm bg-[#C5A059] text-[#0E1E38]"
        >
          Explore Ghana Stays
        </Link>
      </div>
    );
  }

  // Calculate pricing in Ghana Cedis
  const start = new Date(checkIn).getTime();
  const end = new Date(checkOut).getTime();
  const nights = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
  const basePrice = currentListing.price_per_night * nights;
  const cleaningFee = currentListing.cleaning_fee || 250;
  const serviceFee = Math.round(basePrice * 0.08);
  const taxes = Math.round(basePrice * 0.05);
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
    <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 pb-28">
      {/* Back button */}
      <div className="mb-4 sm:mb-6">
        <Link
          to={`/listing/${currentListing.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:text-[#C5A059] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to property details</span>
        </Link>
      </div>

      <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-6 sm:mb-8">
        Confirm Ghana Stay & Payment
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Left Column: Trip details & Payment */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          {/* Trip Details Box */}
          <div className="p-5 sm:p-6 rounded-3xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] space-y-4 sm:space-y-5">
            <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">Your reservation details</h2>

            <div className="flex items-center justify-between py-2.5 border-b border-neutral-100 dark:border-[#1E3557]/80">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#C5A059]/15 text-[#C5A059]">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm text-neutral-900 dark:text-white">Dates</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {checkIn} to {checkOut} ({nights} night{nights > 1 ? 's' : ''})
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#C5A059]/15 text-[#C5A059]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm text-neutral-900 dark:text-white">Guests</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {guests} guest{guests > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="p-5 sm:p-6 rounded-3xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">Ghana Payment Method</h2>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <Lock className="w-3.5 h-3.5" /> 256-Bit Encrypted
              </span>
            </div>

            <div className="space-y-3">
              {/* Ghana Mobile Money Option */}
              <label
                onClick={() => setPaymentMethod('momo')}
                className={`flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'momo'
                    ? 'border-[#C5A059] bg-[#C5A059]/10 ring-2 ring-[#C5A059]/20'
                    : 'border-neutral-200 dark:border-[#1E3557]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">
                      Ghana Mobile Money (MoMo)
                    </p>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">MTN MoMo, Telecel Cash, AT Money</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'momo'}
                  onChange={() => setPaymentMethod('momo')}
                  className="accent-[#C5A059]"
                />
              </label>

              {paymentMethod === 'momo' && (
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#0A1422]/70 border border-neutral-200 dark:border-[#1E3557] space-y-3 animate-in fade-in">
                  <div className="flex gap-2">
                    {[
                      { id: 'mtn', label: 'MTN MoMo' },
                      { id: 'telecel', label: 'Telecel Cash' },
                      { id: 'at', label: 'AT Money' },
                    ].map((prov) => (
                      <button
                        key={prov.id}
                        type="button"
                        onClick={() => setMomoProvider(prov.id as any)}
                        className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                          momoProvider === prov.id
                            ? 'bg-[#C5A059] text-[#0E1E38] shadow-sm'
                            : 'bg-white dark:bg-[#0F1E33] border border-neutral-200 dark:border-[#1E3557] text-neutral-700 dark:text-neutral-300'
                        }`}
                      >
                        {prov.label}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-1">
                      Mobile Money Number
                    </label>
                    <input
                      type="tel"
                      value={momoNumber}
                      onChange={(e) => setMomoNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] text-sm font-mono focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                      placeholder="024 000 0000"
                    />
                    <p className="text-[10px] text-neutral-400 mt-1">A prompt will be sent to your phone to approve payment.</p>
                  </div>
                </div>
              )}

              {/* Credit/Debit Card Option */}
              <label
                onClick={() => setPaymentMethod('card')}
                className={`flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'border-[#C5A059] bg-[#C5A059]/10 ring-2 ring-[#C5A059]/20'
                    : 'border-neutral-200 dark:border-[#1E3557]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-[#C5A059]" />
                  <div>
                    <p className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">
                      Debit / Credit Card
                    </p>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">Visa, Mastercard, GH-Link</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="accent-[#C5A059]"
                />
              </label>
            </div>
          </div>

          {/* Cancellation Policy & Guarantee */}
          <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 dark:bg-[#0A1422]/60 border border-neutral-200 dark:border-[#1E3557] flex items-start gap-3.5 text-xs text-neutral-600 dark:text-neutral-400">
            <ShieldCheck className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-neutral-900 dark:text-neutral-100">
                Free cancellation before check-in date
              </p>
              <p className="mt-0.5 leading-relaxed">
                Full refund provided with Valpromark Essence Booking Guarantee if cancelled 48 hours prior to arrival.
              </p>
            </div>
          </div>

          {/* Final Confirm Button */}
          <button
            id="confirm-pay-btn"
            disabled={isCreating}
            onClick={handleConfirmReservation}
            className="w-full py-4 rounded-2xl font-extrabold text-sm sm:text-base bg-gradient-to-r from-[#DFB24A] via-[#C5A059] to-[#DFB24A] text-[#0E1E38] shadow-xl shadow-[#C5A059]/20 transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isCreating ? (
              <span>Confirming Reservation...</span>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Confirm & Pay GH₵ {grandTotal.toLocaleString()}</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Listing Card & Price Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 p-5 sm:p-6 rounded-3xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] shadow-xl space-y-5">
            {/* Listing overview */}
            <div className="flex gap-4 items-center pb-5 border-b border-neutral-200 dark:border-[#1E3557]">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 bg-neutral-100 dark:bg-neutral-800">
                <img
                  src={currentListing.photos[0]}
                  alt={currentListing.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-[#C5A059] uppercase tracking-wider">
                  {currentListing.type}
                </p>
                <h3 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white truncate mt-0.5">
                  {currentListing.title}
                </h3>
                <p className="text-xs text-neutral-500 truncate mt-0.5">{currentListing.location}</p>
                <div className="flex items-center gap-1 text-xs font-bold mt-1 text-[#C5A059]">
                  <Star className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                  <span>{currentListing.rating.toFixed(2)}</span>
                  <span className="text-neutral-400 font-normal">
                    ({currentListing.review_count} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Price Details */}
            <div className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-300">
              <h4 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">Price details</h4>
              <div className="flex justify-between">
                <span>
                  GH₵ {currentListing.price_per_night.toLocaleString()} x {nights} nights
                </span>
                <span className="font-medium">GH₵ {basePrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Concierge & cleaning fee</span>
                <span className="font-medium">GH₵ {cleaningFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Valpromark management fee</span>
                <span className="font-medium">GH₵ {serviceFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Ghana tourism & local levy</span>
                <span className="font-medium">GH₵ {taxes.toLocaleString()}</span>
              </div>

              <div className="flex justify-between font-bold text-sm sm:text-base text-neutral-900 dark:text-white pt-3.5 border-t border-neutral-200 dark:border-[#1E3557]">
                <span>Total (GH₵)</span>
                <span className="text-[#C5A059] font-extrabold">GH₵ {grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Success Modal */}
      <AnimatePresence>
        {confirmedModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0F1E33] text-center border border-neutral-200 dark:border-[#1E3557] shadow-2xl space-y-5"
            >
              <div className="w-16 h-16 rounded-full bg-[#C5A059]/20 text-[#C5A059] flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">
                  Reservation Confirmed!
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Valpromark Reference:{' '}
                  <span className="font-mono font-bold text-[#C5A059]">
                    VALPRO-GH-{bookingRefId ? bookingRefId.slice(-6).toUpperCase() : '7K9X2B'}
                  </span>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#0A1422]/60 border border-neutral-200 dark:border-[#1E3557] text-left text-xs space-y-2">
                <div className="font-bold text-sm text-neutral-900 dark:text-white">
                  {currentListing.title}
                </div>
                <div className="text-neutral-500 dark:text-neutral-400">{currentListing.location}</div>
                <div className="text-neutral-700 dark:text-neutral-300 font-semibold pt-1 border-t border-neutral-200 dark:border-[#1E3557]">
                  {checkIn} → {checkOut} ({nights} nights · {guests} guests)
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  to="/profile?tab=trips"
                  className="flex-1 py-3 rounded-full font-bold text-xs sm:text-sm bg-gradient-to-r from-[#DFB24A] via-[#C5A059] to-[#DFB24A] text-[#0E1E38] shadow-md"
                >
                  View in My Ghana Trips
                </Link>
                <Link
                  to="/"
                  className="flex-1 py-3 rounded-full font-semibold text-xs sm:text-sm border border-neutral-300 dark:border-[#1E3557] text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-[#0A1422]"
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
