import React, { useState } from 'react';
import { X, Search, MapPin, Users, Calendar, SlidersHorizontal, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchStore } from '../store/useSearchStore';
import { POPULAR_LOCATIONS } from '../data/filters';
import { AMENITIES } from '../data/amenities';
import { PROPERTY_TYPES } from '../data/propertyTypes';

export function SearchModal() {
  const isSearchModalOpen = useSearchStore((s) => s.isSearchModalOpen);
  const setSearchModalOpen = useSearchStore((s) => s.setSearchModalOpen);
  const filters = useSearchStore((s) => s.filters);
  const setFilter = useSearchStore((s) => s.setFilter);
  const resetFilters = useSearchStore((s) => s.resetFilters);

  const [activeSection, setActiveSection] = useState<'where' | 'dates' | 'who' | 'filters'>('where');

  if (!isSearchModalOpen) return null;

  const handleSearch = () => {
    setSearchModalOpen(false);
  };

  const toggleAmenity = (amenityId: string) => {
    const current = filters.amenities || [];
    if (current.includes(amenityId)) {
      setFilter('amenities', current.filter((id) => id !== amenityId));
    } else {
      setFilter('amenities', [...current, amenityId]);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 sm:pt-20 px-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-[#1E1E1E] text-neutral-900 dark:text-neutral-100 shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden mb-12"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Find your ideal stay</h2>
            </div>
            <button
              onClick={() => setSearchModalOpen(false)}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Section Navigation Tabs */}
          <div className="flex border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/40 p-1.5 gap-1 text-sm font-semibold overflow-x-auto">
            <button
              onClick={() => setActiveSection('where')}
              className={`flex-1 min-w-[110px] py-2.5 px-3 rounded-2xl flex items-center justify-center gap-2 transition-all ${
                activeSection === 'where'
                  ? 'bg-white dark:bg-[#1E1E1E] text-[#0EA5E9] shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Where</span>
            </button>
            <button
              onClick={() => setActiveSection('dates')}
              className={`flex-1 min-w-[110px] py-2.5 px-3 rounded-2xl flex items-center justify-center gap-2 transition-all ${
                activeSection === 'dates'
                  ? 'bg-white dark:bg-[#1E1E1E] text-[#0EA5E9] shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Dates</span>
            </button>
            <button
              onClick={() => setActiveSection('who')}
              className={`flex-1 min-w-[110px] py-2.5 px-3 rounded-2xl flex items-center justify-center gap-2 transition-all ${
                activeSection === 'who'
                  ? 'bg-white dark:bg-[#1E1E1E] text-[#0EA5E9] shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Guests</span>
            </button>
            <button
              onClick={() => setActiveSection('filters')}
              className={`flex-1 min-w-[110px] py-2.5 px-3 rounded-2xl flex items-center justify-center gap-2 transition-all ${
                activeSection === 'filters'
                  ? 'bg-white dark:bg-[#1E1E1E] text-[#0EA5E9] shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>More Filters</span>
            </button>
          </div>

          {/* Section Body */}
          <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
            {/* WHERE SECTION */}
            {activeSection === 'where' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                    Search destination
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="e.g. Santorini, Kyoto, Paris, Villa..."
                      value={filters.location}
                      onChange={(e) => setFilter('location', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                    Popular Destinations
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {POPULAR_LOCATIONS.map((loc) => (
                      <button
                        key={loc.name}
                        onClick={() => setFilter('location', loc.name.split(',')[0])}
                        className={`p-3 rounded-xl text-left border transition-all text-xs font-semibold flex flex-col justify-between ${
                          filters.location.toLowerCase().includes(loc.name.split(',')[0].toLowerCase())
                            ? 'border-[#0EA5E9] bg-sky-50 dark:bg-sky-950/40 text-[#0EA5E9]'
                            : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                        }`}
                      >
                        <span className="font-bold text-sm text-neutral-900 dark:text-neutral-100 truncate">
                          {loc.name.split(',')[0]}
                        </span>
                        <span className="text-neutral-500 dark:text-neutral-400 text-xs mt-1">
                          {loc.region}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* DATES SECTION */}
            {activeSection === 'dates' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                      Check-in Date
                    </label>
                    <input
                      type="date"
                      value={filters.checkIn || ''}
                      onChange={(e) => setFilter('checkIn', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                      Check-out Date
                    </label>
                    <input
                      type="date"
                      value={filters.checkOut || ''}
                      onChange={(e) => setFilter('checkOut', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                    />
                  </div>
                </div>

                {/* Quick Presets */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                    Quick Date Select
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        const today = new Date();
                        const checkIn = new Date(today);
                        checkIn.setDate(today.getDate() + 7);
                        const checkOut = new Date(today);
                        checkOut.setDate(today.getDate() + 14);
                        setFilter('checkIn', checkIn.toISOString().split('T')[0]);
                        setFilter('checkOut', checkOut.toISOString().split('T')[0]);
                      }}
                      className="px-3.5 py-1.5 rounded-full text-xs font-semibold border border-neutral-200 dark:border-neutral-700 hover:border-[#0EA5E9]"
                    >
                      Next Week (7 nights)
                    </button>
                    <button
                      onClick={() => {
                        const today = new Date();
                        const checkIn = new Date(today);
                        checkIn.setDate(today.getDate() + 30);
                        const checkOut = new Date(today);
                        checkOut.setDate(today.getDate() + 35);
                        setFilter('checkIn', checkIn.toISOString().split('T')[0]);
                        setFilter('checkOut', checkOut.toISOString().split('T')[0]);
                      }}
                      className="px-3.5 py-1.5 rounded-full text-xs font-semibold border border-neutral-200 dark:border-neutral-700 hover:border-[#0EA5E9]"
                    >
                      Next Month Getaway
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* WHO SECTION */}
            {activeSection === 'who' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between py-3 border-b border-neutral-200 dark:border-neutral-800">
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">Guests</h4>
                    <p className="text-xs text-neutral-500">Adults, children, and infants</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      disabled={filters.guests <= 1}
                      onClick={() => setFilter('guests', Math.max(1, filters.guests - 1))}
                      className="w-9 h-9 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-bold text-lg disabled:opacity-40 hover:border-neutral-900 dark:hover:border-white transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold text-base">{filters.guests}</span>
                    <button
                      onClick={() => setFilter('guests', Math.min(16, filters.guests + 1))}
                      className="w-9 h-9 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-bold text-lg hover:border-neutral-900 dark:hover:border-white transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* MORE FILTERS SECTION */}
            {activeSection === 'filters' && (
              <div className="space-y-6">
                {/* Price Range */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                    Price Range (Per Night)
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs text-neutral-400">Min Price ($)</span>
                      <input
                        type="number"
                        placeholder="0"
                        value={filters.minPrice || ''}
                        onChange={(e) =>
                          setFilter('minPrice', e.target.value ? Number(e.target.value) : undefined)
                        }
                        className="w-full mt-1 px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-[#0EA5E9] focus:outline-none"
                      />
                    </div>
                    <div>
                      <span className="text-xs text-neutral-400">Max Price ($)</span>
                      <input
                        type="number"
                        placeholder="1000"
                        value={filters.maxPrice || ''}
                        onChange={(e) =>
                          setFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)
                        }
                        className="w-full mt-1 px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-[#0EA5E9] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                    Property Type
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {PROPERTY_TYPES.map((pt) => {
                      const isSelected = filters.propertyType === pt.name;
                      return (
                        <button
                          key={pt.id}
                          onClick={() => setFilter('propertyType', isSelected ? '' : pt.name)}
                          className={`p-3 rounded-xl text-left border text-xs font-semibold transition-colors ${
                            isSelected
                              ? 'border-[#0EA5E9] bg-sky-50 dark:bg-sky-950/40 text-[#0EA5E9]'
                              : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-800 dark:text-neutral-200'
                          }`}
                        >
                          <div className="font-bold">{pt.name}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                    Amenities
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {AMENITIES.slice(0, 12).map((a) => {
                      const isSelected = filters.amenities?.includes(a.id);
                      return (
                        <button
                          key={a.id}
                          onClick={() => toggleAmenity(a.id)}
                          className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium text-left transition-colors ${
                            isSelected
                              ? 'border-[#0EA5E9] bg-sky-50 dark:bg-sky-950/40 text-[#0EA5E9]'
                              : 'border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center border ${
                              isSelected
                                ? 'bg-[#0EA5E9] border-[#0EA5E9] text-white'
                                : 'border-neutral-300 dark:border-neutral-700'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="truncate">{a.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
            <button
              onClick={resetFilters}
              className="text-xs sm:text-sm font-semibold underline text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              Clear all
            </button>
            <button
              onClick={handleSearch}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm bg-[#0EA5E9] hover:bg-sky-600 text-white shadow-md transition-transform hover:scale-105"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              <span>Search Stays</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
