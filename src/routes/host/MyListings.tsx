import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PlusCircle,
  Building2,
  MapPin,
  MessageSquare,
  Phone,
  CheckCircle2,
  Trash2,
  Eye,
  FileCheck2,
  BadgeCheck,
} from 'lucide-react';
import { useListings, deleteCustomListing, updateCustomListing, getPropertyInquiries } from '../../hooks/useListings';
import { useAuthStore } from '../../store/useAuthStore';

export default function MyListings() {
  const user = useAuthStore((s) => s.user);
  const { data: allListings = [], isLoading, refetch } = useListings();
  const inquiries = getPropertyInquiries();

  // Filter listings belonging to this user or created custom
  const myListings = allListings.filter(
    (l) => l.host_id === user?.id || l.id.startsWith('listing-')
  );

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this property listing?')) {
      deleteCustomListing(id);
      refetch();
    }
  };

  const handleStatusChange = (id: string, newStatus: 'available' | 'under_negotiation' | 'sold' | 'rented') => {
    updateCustomListing(id, { status: newStatus });
    refetch();
  };

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-8 pb-28 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Property Owner Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Manage your free property listings across Ghana and view buyer/tenant inquiries
          </p>
        </div>

        <Link
          to="/host/create"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm bg-gradient-to-r from-[#DFB24A] via-[#C5A059] to-[#DFB24A] text-[#0E1E38] shadow-md transition-transform hover:scale-105"
        >
          <PlusCircle className="w-4 h-4" />
          <span>List Another Property (Free)</span>
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-28 bg-neutral-200 dark:bg-[#0F1E33] rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : myListings.length === 0 ? (
        <div className="max-w-md mx-auto my-12 sm:my-16 p-6 sm:p-8 text-center bg-white dark:bg-[#0F1E33] rounded-3xl border border-neutral-200 dark:border-[#1E3557] space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#C5A059]/20 text-[#C5A059] flex items-center justify-center mx-auto">
            <Building2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">No properties listed yet</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Freely list your houses, lands, student hostels, apartments, or guest houses for direct contact with interested buyers across Ghana.
          </p>
          <Link
            to="/host/create"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs sm:text-sm bg-[#C5A059] text-[#0E1E38] hover:bg-[#DFB24A] transition-colors shadow-md"
          >
            <PlusCircle className="w-4 h-4" />
            <span>List Your Property Free</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Properties Grid */}
          <div>
            <h2 className="text-base font-bold text-neutral-900 dark:text-white mb-4">
              My Active Listings ({myListings.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {myListings.map((listing) => {
                const displayPrice = listing.price || listing.price_per_night || 0;
                const getCadence = () => {
                  if (listing.price_type === 'total' || listing.purpose === 'sale') return 'Total Price';
                  if (listing.price_type === 'month' || listing.purpose === 'rent') return '/ mo';
                  if (listing.price_type === 'semester' || listing.purpose === 'hostel') return '/ sem';
                  return '/ night';
                };

                return (
                  <div
                    key={listing.id}
                    className="p-4 rounded-3xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                        <img
                          src={listing.photos[0]}
                          alt={listing.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-[#0E1E38] text-[#E5C158] shadow-sm">
                          {listing.purpose || 'sale'}
                        </div>
                        <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize bg-emerald-600 text-white shadow-sm">
                          {listing.status || 'Available'}
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-wider">
                          {listing.type}
                        </span>
                        <h3 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white truncate mt-0.5">
                          {listing.title}
                        </h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                          {listing.location}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-[#1E3557]/80 text-xs">
                        <span className="font-bold text-sm text-neutral-900 dark:text-white">
                          GH₵ {displayPrice.toLocaleString()}{' '}
                          <span className="font-normal text-xs text-neutral-500">{getCadence()}</span>
                        </span>
                        {listing.contact_phone && (
                          <span className="text-[11px] text-neutral-400">
                            {listing.contact_phone}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-neutral-100 dark:border-[#1E3557]/80">
                      <Link
                        to={`/listing/${listing.id}`}
                        className="flex-1 py-2 rounded-xl text-center text-xs font-bold bg-[#0A1422] text-[#C5A059] hover:bg-[#0E1E38] transition-colors border border-[#1E3557] flex items-center justify-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Listing</span>
                      </Link>

                      <button
                        onClick={() => handleDelete(listing.id)}
                        className="p-2 rounded-xl border border-neutral-200 dark:border-[#1E3557] hover:border-red-500 hover:text-red-500 text-neutral-400 transition-colors"
                        title="Delete listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Inquiries Section */}
          <div className="p-5 sm:p-6 rounded-3xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33]">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#C5A059]" />
              <span>Direct Inquiries from Buyers & Tenants ({inquiries.length})</span>
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
              Visitors who submitted inspection or purchase requests for your properties.
            </p>

            {inquiries.length === 0 ? (
              <p className="text-xs text-neutral-400 italic">No inquiries received yet. They will appear here when visitors contact you.</p>
            ) : (
              <div className="divide-y divide-neutral-100 dark:divide-[#1E3557]/80">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">{inq.sender_name}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#C5A059]/15 text-[#C5A059] uppercase">{inq.inquiry_type}</span>
                        <span className="text-[10px] text-neutral-400">{new Date(inq.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="text-xs text-neutral-600 dark:text-neutral-300">
                        Property: <strong className="text-neutral-900 dark:text-white">{inq.listing_title}</strong>
                      </p>
                      <p className="text-xs text-neutral-500 italic">"{inq.message}"</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={`https://wa.me/${inq.sender_phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${inq.sender_name}, thank you for your inquiry on Valpromark regarding ${inq.listing_title}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1 shadow-sm"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Reply WhatsApp</span>
                      </a>
                      <a
                        href={`tel:${inq.sender_phone}`}
                        className="px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-[#1E3557] font-bold text-xs flex items-center gap-1 text-neutral-700 dark:text-neutral-200"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
