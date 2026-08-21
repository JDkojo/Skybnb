import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Share2,
  ShieldCheck,
  Award,
  Sparkles,
  Bed,
  Bath,
  ChevronLeft,
  X,
  CheckCircle2,
  Calendar,
  Building2,
  Phone,
  MessageSquare,
  FileCheck2,
  Ruler,
  Clock,
  Send,
  AlertTriangle,
  UserCheck,
  BadgeCheck,
  ExternalLink,
} from 'lucide-react';
import { useListing } from '../../hooks/useListing';
import { WishlistButton } from '../../components/WishlistButton';
import { AmenityChip } from '../../components/AmenityChip';
import { savePropertyInquiry } from '../../hooks/useListings';
import { PropertyInquiry } from '../../types';
import { motion, AnimatePresence } from 'motion/react';

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: listing, isLoading } = useListing(id);

  // Gallery state
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Inquiry Form state
  const [inquiryType, setInquiryType] = useState<'buy' | 'rent' | 'hostel' | 'tour' | 'offer' | 'general'>('tour');
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [tourDate, setTourDate] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);

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
          Explore All Ghana Properties
        </Link>
      </div>
    );
  }

  const displayPrice = listing.price || listing.price_per_night || 0;

  const getPriceCadence = () => {
    if (listing.price_type === 'total' || listing.purpose === 'sale') return 'Total Price';
    if (listing.price_type === 'month' || listing.purpose === 'rent') return '/ month';
    if (listing.price_type === 'year') return '/ year';
    if (listing.price_type === 'semester' || listing.purpose === 'hostel') return '/ semester';
    return '/ night';
  };

  const getPurposeBadge = () => {
    switch (listing.purpose) {
      case 'sale':
        return { label: 'FOR SALE', bg: 'bg-amber-600 text-white' };
      case 'rent':
        return { label: 'FOR RENT', bg: 'bg-emerald-600 text-white' };
      case 'hostel':
        return { label: 'STUDENT HOSTEL', bg: 'bg-indigo-600 text-white' };
      case 'short_stay':
        return { label: 'HOTEL / SHORT STAY', bg: 'bg-sky-600 text-white' };
      default:
        if (listing.category === 'land') return { label: 'LAND FOR SALE', bg: 'bg-teal-600 text-white' };
        return { label: 'AVAILABLE', bg: 'bg-[#C5A059] text-[#0E1E38]' };
    }
  };

  const badge = getPurposeBadge();

  // Clean phone / WhatsApp number format
  const rawWhatsApp = (listing.contact_whatsapp || listing.contact_phone || '233240000000').replace(/[^0-9]/g, '');
  const cleanWhatsApp = rawWhatsApp.startsWith('0') ? '233' + rawWhatsApp.slice(1) : rawWhatsApp;
  const directPhone = listing.contact_phone || '+233 24 000 0000';
  const ownerName = listing.contact_name || listing.host_name || 'Property Owner';
  const ownerRole = listing.contact_role || 'Property Owner';

  // WhatsApp Pre-filled message generator
  const getWhatsAppLink = (customText?: string) => {
    const defaultText = customText || `Hello ${ownerName}, I saw your property listing on Valpromark: "${listing.title}" located in ${listing.location} (GH₵ ${displayPrice.toLocaleString()} ${getPriceCadence()}). I am interested and would like to discuss further / arrange a site inspection.`;
    return `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(defaultText)}`;
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderPhone) return;

    setIsSubmitting(true);
    const newInquiry: PropertyInquiry = {
      id: 'inq-' + Date.now(),
      listing_id: listing.id,
      listing_title: listing.title,
      listing_location: listing.location,
      listing_price: displayPrice,
      listing_price_type: getPriceCadence(),
      sender_name: senderName,
      sender_phone: senderPhone,
      sender_email: senderEmail,
      message: inquiryMessage || `Inquiry for ${listing.title} (${inquiryType})`,
      inquiry_type: inquiryType,
      preferred_tour_date: tourDate || undefined,
      created_at: new Date().toISOString(),
      status: 'new',
    };

    savePropertyInquiry(newInquiry);
    setTimeout(() => {
      setIsSubmitting(false);
      setInquirySuccess(true);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-6 pb-28">
      {/* Back button */}
      <div className="mb-3 sm:mb-4 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:text-[#C5A059] dark:hover:text-[#E5C158] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to all Ghana properties</span>
        </Link>

        {/* Free Listing Notice */}
        <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
          <BadgeCheck className="w-3.5 h-3.5" />
          <span>Direct Contact · Zero Transaction Fees</span>
        </div>
      </div>

      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4 sm:mb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${badge.bg}`}>
              {badge.label}
            </span>
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-neutral-100 dark:bg-[#1E3557] text-neutral-700 dark:text-neutral-300">
              {listing.type}
            </span>
            {listing.title_document && (
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30 flex items-center gap-1">
                <FileCheck2 className="w-3 h-3" />
                {listing.title_document}
              </span>
            )}
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            {listing.title}
          </h1>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-2">
            <span className="font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
              {listing.location}
            </span>
            {listing.region && (
              <>
                <span>·</span>
                <span className="font-semibold text-neutral-500 dark:text-neutral-400">{listing.region}</span>
              </>
            )}
            <span>·</span>
            <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
              <UserCheck className="w-3.5 h-3.5" /> Listed by {ownerRole}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
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

      {/* Main Content Grid: Specs & Description on Left, Direct Contact Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Left Column: Details */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          {/* Key Property Specs Card */}
          <div className="p-4 sm:p-6 rounded-3xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-400 mb-4">
              Property Overview & Specifications
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-[#0A1422] border border-neutral-100 dark:border-[#1E3557]/60">
                <span className="text-[10px] font-bold text-neutral-400 uppercase">Property Type</span>
                <p className="text-xs sm:text-sm font-black text-neutral-900 dark:text-white mt-0.5 truncate">
                  {listing.type}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-[#0A1422] border border-neutral-100 dark:border-[#1E3557]/60">
                <span className="text-[10px] font-bold text-neutral-400 uppercase">Listing Purpose</span>
                <p className="text-xs sm:text-sm font-black text-[#C5A059] uppercase mt-0.5">
                  {badge.label}
                </p>
              </div>

              {listing.category === 'land' || listing.land_size ? (
                <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-[#0A1422] border border-neutral-100 dark:border-[#1E3557]/60">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase">Land / Plot Size</span>
                  <p className="text-xs sm:text-sm font-black text-neutral-900 dark:text-white mt-0.5 truncate">
                    {listing.land_size || 'Demarcated Plot'}
                  </p>
                </div>
              ) : (
                <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-[#0A1422] border border-neutral-100 dark:border-[#1E3557]/60">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase">Bedrooms & Baths</span>
                  <p className="text-xs sm:text-sm font-black text-neutral-900 dark:text-white mt-0.5">
                    {listing.bedrooms} Beds · {listing.bathrooms} Baths
                  </p>
                </div>
              )}

              {listing.title_document && (
                <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-[#0A1422] border border-neutral-100 dark:border-[#1E3557]/60 sm:col-span-2">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase">Documentation / Land Title</span>
                  <p className="text-xs sm:text-sm font-black text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center gap-1 truncate">
                    <FileCheck2 className="w-3.5 h-3.5 shrink-0" />
                    {listing.title_document}
                  </p>
                </div>
              )}

              {listing.furnishing && (
                <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-[#0A1422] border border-neutral-100 dark:border-[#1E3557]/60">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase">Furnishing</span>
                  <p className="text-xs sm:text-sm font-black text-neutral-900 dark:text-white mt-0.5 capitalize">
                    {listing.furnishing}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Owner / Agent Profile Snapshot */}
          <div className="flex items-center justify-between p-4 sm:p-5 rounded-3xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33]">
            <div className="flex items-center gap-3 sm:gap-4">
              {listing.host_avatar ? (
                <img
                  src={listing.host_avatar}
                  alt={ownerName}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-[#C5A059]"
                />
              ) : (
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#C5A059]/20 text-[#C5A059] flex items-center justify-center font-bold text-lg">
                  {ownerName[0]}
                </div>
              )}
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
                    {ownerName}
                  </h3>
                  <BadgeCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {ownerRole} {listing.agency_name ? `· ${listing.agency_name}` : '· Direct Listing'}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-[#C5A059] font-medium mt-0.5">
                  <Clock className="w-3 h-3" />
                  <span>Typically responds within 15 mins via WhatsApp</span>
                </div>
              </div>
            </div>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 sm:px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm shrink-0"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">WhatsApp</span>
            </a>
          </div>

          {/* Detailed Description */}
          <div className="p-5 sm:p-6 rounded-3xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33]">
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-3">
              Full Property Description
            </h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>
          </div>

          {/* Amenities & Features */}
          {listing.amenities && listing.amenities.length > 0 && (
            <div className="p-5 sm:p-6 rounded-3xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33]">
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-4">
                Amenities, Utilities & Infrastructure
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {listing.amenities.map((amenityId) => (
                  <AmenityChip key={amenityId} amenityId={amenityId} />
                ))}
              </div>
            </div>
          )}

          {/* Ghana Real Estate Safety & Transparency Notice */}
          <div className="p-5 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-xs text-neutral-700 dark:text-neutral-300 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Valpromark Ghana Property Buyer & Tenant Advisory</span>
            </div>
            <p className="leading-relaxed">
              • <strong>No Middleman Payments:</strong> Valpromark is a free property connection platform. No financial transactions or reservation deposits are processed on this site.
            </p>
            <p className="leading-relaxed">
              • <strong>Site Verification:</strong> Always meet the property owner or accredited agent for physical site inspection before making any financial commitment.
            </p>
            <p className="leading-relaxed">
              • <strong>Land Documents:</strong> For lands and houses for sale, conduct official search and due diligence at the Lands Commission (Accra / Regional offices).
            </p>
          </div>
        </div>

        {/* Right Column: Sticky Direct Contact & Free Inquiry Hub */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 p-5 sm:p-6 rounded-3xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] shadow-xl space-y-5">
            {/* Price Header */}
            <div className="flex items-baseline justify-between pb-4 border-b border-neutral-200 dark:border-[#1E3557]">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-[#0E1E38] dark:text-[#E5C158]">
                  GH₵ {displayPrice.toLocaleString()}
                </span>
                <span className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm font-semibold ml-1.5">
                  {getPriceCadence()}
                </span>
              </div>
              {listing.is_negotiable && (
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-[10px] font-extrabold uppercase">
                  Price Negotiable
                </span>
              )}
            </div>

            {/* Quick 1-Tap Direct Action Buttons */}
            <div className="space-y-2.5">
              {/* WhatsApp Direct */}
              <a
                id="whatsapp-owner-btn"
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Directly on WhatsApp</span>
              </a>

              {/* Direct Phone Call */}
              <a
                id="call-owner-btn"
                href={`tel:${directPhone}`}
                className="w-full py-3 px-4 rounded-2xl font-bold text-sm bg-neutral-100 dark:bg-[#1E3557] hover:bg-neutral-200 dark:hover:bg-[#2A4875] text-neutral-800 dark:text-neutral-100 transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#C5A059]" />
                <span>Call Owner: {directPhone}</span>
              </a>
            </div>

            {/* Free Inquiry / Inspection Booking Form */}
            <div className="pt-4 border-t border-neutral-200 dark:border-[#1E3557]">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                  Send Direct Inquiry to Owner
                </h4>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">100% Free</span>
              </div>

              {inquirySuccess ? (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-center space-y-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <div>
                    <h5 className="font-bold text-sm text-emerald-900 dark:text-emerald-200">
                      Inquiry Sent Successfully!
                    </h5>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1">
                      {ownerName} has received your inquiry details. You can also message them directly on WhatsApp now:
                    </p>
                  </div>
                  <a
                    href={getWhatsAppLink(`Hello ${ownerName}, my name is ${senderName}. I just submitted an inquiry for "${listing.title}" on Valpromark. Message: ${inquiryMessage || 'I would like to schedule a site inspection.'}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow hover:bg-emerald-700 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Open WhatsApp Chat with {ownerName}</span>
                  </a>
                  <div>
                    <button
                      onClick={() => setInquirySuccess(false)}
                      className="text-[11px] text-neutral-500 underline mt-2 block mx-auto"
                    >
                      Send another inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSendInquiry} className="space-y-3">
                  {/* Inquiry Type selector */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">
                      I am interested in:
                    </label>
                    <div className="grid grid-cols-2 gap-1.5 text-xs">
                      {[
                        { id: 'tour', label: 'Site Inspection / Visit' },
                        { id: 'buy', label: 'Buying Property' },
                        { id: 'rent', label: 'Renting / Hostel' },
                        { id: 'offer', label: 'Make an Offer' },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setInquiryType(t.id as any)}
                          className={`px-2 py-1.5 rounded-lg font-bold text-[11px] transition-all text-center border ${
                            inquiryType === t.id
                              ? 'bg-[#0E1E38] text-[#E5C158] border-[#C5A059] dark:bg-[#E5C158] dark:text-[#0E1E38]'
                              : 'bg-neutral-50 dark:bg-[#0A1422] border-neutral-200 dark:border-[#1E3557] text-neutral-600 dark:text-neutral-300 hover:border-[#C5A059]'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-0.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Kwame Boateng"
                      className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-[#1E3557] bg-neutral-50/50 dark:bg-[#0A1422] text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-0.5">
                      Your Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      placeholder="e.g. +233 24 123 4567"
                      className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-[#1E3557] bg-neutral-50/50 dark:bg-[#0A1422] text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  {/* Tour Date (Optional) */}
                  {inquiryType === 'tour' && (
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-0.5">
                        Preferred Inspection Date
                      </label>
                      <input
                        type="date"
                        value={tourDate}
                        onChange={(e) => setTourDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-[#1E3557] bg-neutral-50/50 dark:bg-[#0A1422] text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                  )}

                  {/* Custom Message */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-0.5">
                      Message / Questions for Owner (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      placeholder={`Hello ${ownerName}, I would like to check when I can view this property...`}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-[#1E3557] bg-neutral-50/50 dark:bg-[#0A1422] text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#C5A059] resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    id="submit-inquiry-btn"
                    type="submit"
                    disabled={isSubmitting || !senderName || !senderPhone}
                    className="w-full py-3 rounded-2xl font-bold text-xs sm:text-sm bg-gradient-to-r from-[#DFB24A] via-[#C5A059] to-[#DFB24A] text-[#0E1E38] shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Sending to {ownerName}...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Free Inquiry to Owner</span>
                      </>
                    )}
                  </button>
                </form>
              )}
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
