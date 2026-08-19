import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Star, Trash2, Edit3, Sparkles, Building2, MapPin } from 'lucide-react';
import { useListings } from '../../hooks/useListings';
import { useAuthStore } from '../../store/useAuthStore';

export default function MyListings() {
  const user = useAuthStore((s) => s.user);
  const { data: allListings = [], isLoading } = useListings();

  // Filter listings belonging to this user or created custom
  const myListings = allListings.filter(
    (l) => l.host_id === user?.id || l.id.startsWith('listing-17') || l.id.startsWith('listing-')
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Host Management Hub
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Manage your accommodations, rates, and guest reservations
          </p>
        </div>

        <Link
          to="/host/create"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm bg-[#0EA5E9] hover:bg-sky-600 text-white shadow-md transition-transform hover:scale-105"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Listing</span>
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-28 bg-neutral-200 dark:bg-neutral-800 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : myListings.length === 0 ? (
        <div className="max-w-md mx-auto my-16 p-8 text-center bg-white dark:bg-[#1E1E1E] rounded-3xl border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-sky-50 dark:bg-sky-950/40 text-[#0EA5E9] flex items-center justify-center mx-auto">
            <Building2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white">No properties listed yet</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Share your home with travelers worldwide and start earning. Creating a listing takes less than 3 minutes.
          </p>
          <Link
            to="/host/create"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm bg-[#0EA5E9] text-white hover:bg-sky-600 transition-colors shadow-md"
          >
            <PlusCircle className="w-4 h-4" />
            <span>List your property</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myListings.map((listing) => (
            <div
              key={listing.id}
              className="p-4 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1E1E1E] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                  <img
                    src={listing.photos[0]}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-500 text-white shadow-sm">
                    Active
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-[#0EA5E9] uppercase tracking-wider">
                    {listing.type}
                  </span>
                  <h3 className="font-bold text-base text-neutral-900 dark:text-white truncate mt-0.5">
                    {listing.title}
                  </h3>
                  <p className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#0EA5E9]" />
                    {listing.location}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800/80 text-xs">
                  <span className="font-bold text-sm text-neutral-900 dark:text-white">
                    ${listing.price_per_night}{' '}
                    <span className="font-normal text-xs text-neutral-500">/ night</span>
                  </span>
                  <div className="flex items-center gap-1 font-bold text-neutral-800 dark:text-neutral-200">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{listing.rating.toFixed(2)}</span>
                    <span className="text-neutral-400 font-normal">({listing.review_count})</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
                <Link
                  to={`/listing/${listing.id}`}
                  className="flex-1 py-2 rounded-xl text-center text-xs font-bold bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 transition-colors"
                >
                  Preview
                </Link>
                <Link
                  to="/host/create"
                  className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-[#0EA5E9] text-neutral-600 dark:text-neutral-300"
                  title="Edit details"
                >
                  <Edit3 className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
