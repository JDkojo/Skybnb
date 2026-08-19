import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  MapPin,
  Share2,
  Heart,
  ShieldCheck,
  Award,
  Sparkles,
  Bed,
  Bath,
  Users,
  ChevronLeft,
  X,
  CheckCircle2,
  Calendar,
  Building2,
  PhoneCall,
} from 'lucide-react';
import { useListing } from '../../hooks/useListing';
import { WishlistButton } from '../../components/WishlistButton';
import { AmenityChip } from '../../components/AmenityChip';
import { useBookingStore } from '../../store/useBookingStore';
import { motion, AnimatePresence } from 'motion/react';

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: listing, isLoading } = useListing(id);

  // Booking store interaction
  const setBookingListing = useBookingStore((s) => s.setListing);
  const setBookingDates = useBookingStore((s) => s.setDates);
  const setBookingGuests = useBookingStore((s) => s.setGuests);

  const [checkInDate, setCheckInDate] = useState('2026-09-15');
  const [checkOutDate, setCheckOutDate] = useState('2026-09-20');
  const [guestsCount, setGuestsCount] = useState(2);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse space-y-6">
        <div className="h-8 bg-neutral-200 dark:bg-[#0F1E33] rounded w-2/3" />
        <div className="aspect-[16/9] md:aspect-[21/9] bg-neutral-200 dark:bg-[#0F1E33] rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="h-6 bg-neutral-200 dark:bg-[#0F1E33] rounded w-1/2" />
            <div className="h-20 bg-neutral-200 dark:bg-[#0F1E33] rounded" />
          </div>
          <div className="h-64 bg-neutral-200 dark:bg-[#0F1E33] rounded-3xl" />
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Ghana Property Not Found</h2>
        <p className="text-sm text-neutral-500 mt-2">The requested property in Ghana is currently unavailable or has been archived.</p>
        <Link
          to="/"
          className="mt-6 px-6 py-2.5 rounded-full bg-[#C5A059] text-[#0E1E38] font-bold text-sm shadow-md"
        >
          Explore All Ghana Stays
        </Link>
      </div>
    );
  }

  // Calculate pricing breakdown in Ghana Cedis
  const start = new Date(checkInDate).getTime();
  const end = new Date(checkOutDate).getTime();
  const diffDays = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
  const baseTotal = listing.price_per_night * diffDays;
  const serviceFee = Math.round(baseTotal * 0.08);
  const taxes = Math.round(baseTotal * 0.05);
  const grandTotal = baseTotal + listing.cleaning_fee + serviceFee + taxes;

  const handleReserve = () => {
    setBookingListing(listing);
    setBookingDates(checkInDate, checkOutDate);
    setBookingGuests(guestsCount);
    navigate(`/booking/${listing.id}`);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 pb-28">
      {/* Back button */}
      <div className="mb-3 sm:mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:text-[#C5A059] dark:hover:text-[#E5C158] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Ghana stays</span>
        </Link>
      </div>

      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 sm:mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            {listing.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-2">
            <div className="flex items-center gap-1 font-bold text-neutral-900 dark:text-white">
              <Star className="w-4 h-4 fill-[#C5A059] text-[#C5A059]" />
              <span>{listing.rating.toFixed(2)}</span>
            </div>
            <span>·</span>
            <span className="font-semibold underline">{listing.review_count} verified reviews</span>
            {listing.host_is_superhost && (
              <>
                <span>·</span>
                <span className="inline-flex items-center gap-1 font-bold text-[#C5A059] dark:text-[#E5C158]">
                  <Award className="w-3.5 h-3.5" /> Essence Superhost
                </span>
              </>
            )}
            <span>·</span>
            <span className="font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
              {listing.location}
            </span>
          </div>
        </div>

        {/* Share & Wishlist buttons */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-neutral-200 dark:border-[#1E3557] text-xs font-bold text-neutral-700 dark:text-neutral-200 hover:bg-[#C5A059]/10 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>
          <div className="flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded-full border border-neutral-200 dark:border-[#1E3557] text-xs font-bold">
            <WishlistButton listingId={listing.id} size={18} />
            <span className="text-neutral-700 dark:text-neutral-200 pr-1">Save</span>
          </div>
        </div>
      </div>

      {/* Photo Mosaic Gallery */}
      <div className="relative mb-8 sm:mb-10 overflow-hidden rounded-2xl sm:rounded-3xl border border-neutral-200/70 dark:border-[#1E3557]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[260px] sm:h-[380px] md:h-[460px]">
          {/* Main Large Photo */}
          <div
            onClick={() => {
              setSelectedPhotoIndex(0);
              setGalleryModalOpen(true);
            }}
            className="md:col-span-2 h-full cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl group relative"
          >
            <img
              src={listing.photos[0]}
              alt={listing.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* 2x2 grid on right */}
          <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-2 h-full">
            {listing.photos.slice(1, 5).map((photo, i) => (
              <div
                key={i}
                onClick={() => {
                  setSelectedPhotoIndex(i + 1);
                  setGalleryModalOpen(true);
                }}
                className="cursor-pointer overflow-hidden rounded-2xl group relative h-full"
              >
                <img
                  src={photo}
                  alt={`${listing.title} photo ${i + 2}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* View all photos pill button */}
        <button
          onClick={() => setGalleryModalOpen(true)}
          className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white/95 dark:bg-[#0A1422]/95 backdrop-blur-md text-xs font-bold text-neutral-900 dark:text-white shadow-lg border border-neutral-200 dark:border-[#1E3557] hover:scale-105 transition-all flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Show all {listing.photos.length} photos</span>
        </button>
      </div>

      {/* Main Content & Reservation Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Left Column: Details */}
        <div className="lg:col-span-8 space-y-6 sm:space-y-8">
          {/* Host Overview */}
          <div className="flex items-center justify-between pb-6 border-b border-neutral-200 dark:border-[#1E3557]">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                {listing.type} hosted by {listing.host_name}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                {listing.max_guests} guests · {listing.bedrooms} bedrooms · {listing.beds} beds ·{' '}
                {listing.bathrooms} baths
              </p>
            </div>
            {listing.host_avatar ? (
              <img
                src={listing.host_avatar}
                alt={listing.host_name}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-[#C5A059]"
              />
            ) : (
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#C5A059]/20 text-[#C5A059] flex items-center justify-center font-bold text-lg">
                {listing.host_name[0]}
              </div>
            )}
          </div>

          {/* Valpromark Highlights */}
          <div className="space-y-4 pb-6 border-b border-neutral-200 dark:border-[#1E3557]">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="p-2.5 rounded-xl bg-[#C5A059]/15 text-[#C5A059] shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                  Managed by Valpromark Essence Management Services
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Professional hotel-grade linen, 24/7 dedicated concierge, power backup generator & high-speed Wi-Fi guaranteed.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4">
              <div className="p-2.5 rounded-xl bg-[#C5A059]/15 text-[#C5A059] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                  Valpromark Luxe Safety & Booking Guarantee
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Full security protection, verified property inspection in Ghana, and flexible cancellation policies.
                </p>
              </div>
            </div>
          </div>

          {/* About Description */}
          <div className="pb-6 border-b border-neutral-200 dark:border-[#1E3557]">
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-3">
              About this property
            </h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>
          </div>

          {/* Sleeping Arrangements */}
          <div className="pb-6 border-b border-neutral-200 dark:border-[#1E3557]">
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-4">
              Where you’ll sleep
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Array.from({ length: listing.bedrooms }).map((_, i) => (
                <div
                  key={i}
                  className="p-3.5 sm:p-4 rounded-2xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33]"
                >
                  <Bed className="w-5 h-5 text-[#C5A059] mb-2" />
                  <h4 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">
                    Bedroom {i + 1}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">King / Queen Suite</p>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities Grid */}
          <div className="pb-6 border-b border-neutral-200 dark:border-[#1E3557]">
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-4">
              Amenities & features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {listing.amenities.map((amenityId) => (
                <AmenityChip key={amenityId} amenityId={amenityId} />
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div>
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <Star className="w-5 h-5 fill-[#C5A059] text-[#C5A059]" />
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                {listing.rating.toFixed(2)} · {listing.review_count} reviews
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(listing.reviews && listing.reviews.length > 0
                ? listing.reviews
                : [
                    {
                      id: 'demo-rev-gh-1',
                      reviewer_name: 'David Boateng',
                      reviewer_avatar:
                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
                      rating: 5,
                      comment:
                        'Outstanding experience staying here. The Valpromark management made check-in effortless.',
                      created_at: '2 weeks ago',
                    },
                  ]
              ).map((rev, i) => (
                <div
                  key={i}
                  className="p-4 sm:p-5 rounded-2xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] space-y-2.5"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.reviewer_avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
                      alt={rev.reviewer_name}
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-[#C5A059]"
                    />
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">
                        {rev.reviewer_name}
                      </h4>
                      <p className="text-[11px] text-neutral-400">{rev.created_at}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="w-3 h-3 fill-[#C5A059] text-[#C5A059]" />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Reservation Box */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 p-5 sm:p-6 rounded-3xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] shadow-xl space-y-5">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">
                  GH₵ {listing.price_per_night.toLocaleString()}
                </span>
                <span className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm ml-1">/ night</span>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-[#C5A059]">
                <Star className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                <span>{listing.rating.toFixed(2)}</span>
                <span className="text-neutral-400 font-normal">({listing.review_count})</span>
              </div>
            </div>

            {/* Date Pickers & Guest Selector */}
            <div className="rounded-2xl border border-neutral-200 dark:border-[#1E3557] divide-y divide-neutral-200 dark:divide-[#1E3557] overflow-hidden text-xs bg-neutral-50/50 dark:bg-[#0A1422]/50">
              <div className="grid grid-cols-2 divide-x divide-neutral-200 dark:divide-[#1E3557]">
                <div className="p-2.5">
                  <label className="block font-bold uppercase text-[10px] text-neutral-400">
                    Check-in
                  </label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full bg-transparent font-semibold text-neutral-800 dark:text-neutral-200 focus:outline-none cursor-pointer mt-0.5"
                  />
                </div>
                <div className="p-2.5">
                  <label className="block font-bold uppercase text-[10px] text-neutral-400">
                    Check-out
                  </label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full bg-transparent font-semibold text-neutral-800 dark:text-neutral-200 focus:outline-none cursor-pointer mt-0.5"
                  />
                </div>
              </div>

              <div className="p-2.5 flex items-center justify-between">
                <div>
                  <label className="block font-bold uppercase text-[10px] text-neutral-400">
                    Guests
                  </label>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                    {guestsCount} guest{guestsCount > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={guestsCount <= 1}
                    onClick={() => setGuestsCount((c) => Math.max(1, c - 1))}
                    className="w-7 h-7 rounded-full border border-neutral-300 dark:border-[#1E3557] flex items-center justify-center font-bold disabled:opacity-30 hover:border-[#C5A059]"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    disabled={guestsCount >= listing.max_guests}
                    onClick={() => setGuestsCount((c) => Math.min(listing.max_guests, c + 1))}
                    className="w-7 h-7 rounded-full border border-neutral-300 dark:border-[#1E3557] flex items-center justify-center font-bold disabled:opacity-30 hover:border-[#C5A059]"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Reserve Button */}
            <button
              id="reserve-now-btn"
              onClick={handleReserve}
              className="w-full py-3.5 rounded-2xl font-bold text-sm sm:text-base bg-gradient-to-r from-[#DFB24A] via-[#C5A059] to-[#DFB24A] text-[#0E1E38] shadow-lg shadow-[#C5A059]/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Reserve Stay in Ghana
            </button>

            <p className="text-center text-xs text-neutral-400">Instant confirmation · No booking fees</p>

            {/* Pricing Calculation Breakdown */}
            <div className="space-y-2 pt-4 border-t border-neutral-200 dark:border-[#1E3557] text-xs text-neutral-600 dark:text-neutral-300">
              <div className="flex justify-between">
                <span>
                  GH₵ {listing.price_per_night.toLocaleString()} x {diffDays} nights
                </span>
                <span className="font-semibold">GH₵ {baseTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Valpromark concierge & cleaning</span>
                <span className="font-semibold">GH₵ {listing.cleaning_fee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Management & service fee</span>
                <span className="font-semibold">GH₵ {serviceFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Ghana tourism & local levy</span>
                <span className="font-semibold">GH₵ {taxes.toLocaleString()}</span>
              </div>

              <div className="flex justify-between font-bold text-sm text-neutral-900 dark:text-white pt-3 border-t border-neutral-200 dark:border-[#1E3557]">
                <span>Total (GH₵)</span>
                <span className="text-base text-[#C5A059] font-extrabold">GH₵ {grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Photo Gallery Modal */}
      <AnimatePresence>
        {galleryModalOpen && (
          <div className="fixed inset-0 z-50 flex flex-col bg-black/95 text-white backdrop-blur-md">
            {/* Gallery Header */}
            <div className="flex items-center justify-between p-4 px-6 border-b border-neutral-800">
              <span className="font-semibold text-sm">
                Photo {selectedPhotoIndex + 1} of {listing.photos.length}
              </span>
              <button
                onClick={() => setGalleryModalOpen(false)}
                className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Gallery Main Viewer */}
            <div className="flex-1 flex items-center justify-center p-4">
              <img
                src={listing.photos[selectedPhotoIndex]}
                alt={listing.title}
                className="max-h-[80vh] max-w-full rounded-2xl object-contain shadow-2xl"
              />
            </div>

            {/* Thumbnail selector */}
            <div className="flex items-center justify-center gap-2 p-4 overflow-x-auto border-t border-neutral-800">
              {listing.photos.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPhotoIndex(idx)}
                  className={`w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    idx === selectedPhotoIndex ? 'border-[#C5A059] scale-105' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={p} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
