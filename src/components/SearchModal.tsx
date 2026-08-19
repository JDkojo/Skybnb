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
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-6 sm:pt-16 px-3 sm:px-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-[#0F1E33] text-neutral-900 dark:text-neutral-100 shadow-2xl border border-neutral-200 dark:border-[#1E3557] overflow-hidden mb-12"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-neutral-200 dark:border-[#1E3557]">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                Find Stays in Ghana
              </h2>
            </div>
            <button
              onClick={() => setSearchModalOpen(false)}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-[#1E3557] text-neutral-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Section Navigation Tabs */}
          <div className="flex border-b border-neutral-200 dark:border-[#1E3557] bg-neutral-50/80 dark:bg-[#0A1422]/60 p-1.5 gap-1 text-xs sm:text-sm font-semibold overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveSection('where')}
              className={`flex-1 min-w-[80px] sm:min-w-[100px] py-2 px-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                activeSection === 'where'
                  ? 'bg-white dark:bg-[#0F1E33] text-[#C5A059] shadow-sm font-bold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              <MapPin className="w-4 h-4 shrink-0" />
              <span>Where</span>
            </button>
            <button
              onClick={() => setActiveSection('dates')}
              className={`flex-1 min-w-[80px] sm:min-w-[100px] py-2 px-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                activeSection === 'dates'
                  ? 'bg-white dark:bg-[#0F1E33] text-[#C5A059] shadow-sm font-bold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span>Dates</span>
            </button>
            <button
              onClick={() => setActiveSection('who')}
              className={`flex-1 min-w-[80px] sm:min-w-[100px] py-2 px-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                activeSection === 'who'
                  ? 'bg-white dark:bg-[#0F1E33] text-[#C5A059] shadow-sm font-bold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              <Users className="w-4 h-4 shrink-0" />
              <span>Guests</span>
            </button>
            <button
              onClick={() => setActiveSection('filters')}
              className={`flex-1 min-w-[80px] sm:min-w-[100px] py-2 px-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                activeSection === 'filters'
                  ? 'bg-white dark:bg-[#0F1E33] text-[#C5A059] shadow-sm font-bold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4 shrink-0" />
              <span>Filters</span>
            </button>
          </div>

          {/* Section Body */}
          <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto space-y-6">
            {/* WHERE SECTION */}
            {activeSection === 'where' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                    Search Ghana Location / Neighborhood
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C5A059]" />
                    <input
                      type="text"
                      placeholder="e.g. Cantonments, East Legon, Aburi, Kumasi, Busua..."
                      value={filters.location}
                      onChange={(e) => setFilter('location', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-300 dark:border-[#1E3557] bg-white dark:bg-[#0A1422] text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                    Top Ghana Destinations
                  </h4>
                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                    {POPULAR_LOCATIONS.map((loc) => (
                      <button
                        key={loc.name}
                        onClick={() => setFilter('location', loc.name.split(',')[0])}
                        className={`p-2.5 sm:p-3 rounded-xl text-left border transition-all text-xs font-semibold flex flex-col justify-between ${
                          filters.location.toLowerCase().includes(loc.name.split(',')[0].toLowerCase())
                            ? 'border-[#C5A059] bg-[#C5A059]/10 text-[#C5A059] font-bold'
                            : 'border-neutral-200 dark:border-[#1E3557] hover:border-[#C5A059]/60'
                        }`}
                      >
                        <span className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 truncate">
                          {loc.name.split(',')[0]}
                        </span>
                        <span className="text-neutral-500 dark:text-neutral-400 text-[11px] mt-1">
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
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                      Check-in Date
                    </label>
                    <input
                      type="date"
                      value={filters.checkIn || ''}
                      onChange={(e) => setFilter('checkIn', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-[#1E3557] bg-white dark:bg-[#0A1422] text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                      Check-out Date
                    </label>
                    <input
                      type="date"
                      value={filters.checkOut || ''}
                      onChange={(e) => setFilter('checkOut', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-[#1E3557] bg-white dark:bg-[#0A1422] text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                    />
                  </div>
                </div>

                {/* Quick Presets */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                    Quick Stay Packages
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        const today = new Date();
                        const checkIn = new Date(today);
                        checkIn.setDate(today.getDate() + 3);
                        const checkOut = new Date(today);
                        checkOut.setDate(today.getDate() + 6);
                        setFilter('checkIn', checkIn.toISOString().split('T')[0]);
                        setFilter('checkOut', checkOut.toISOString().split('T')[0]);
                      }}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold border border-neutral-200 dark:border-[#1E3557] hover:border-[#C5A059] text-neutral-700 dark:text-neutral-200"
                    >
                      Weekend Retreat (3 nights)
                    </button>
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
                      className="px-3 py-1.5 rounded-full text-xs font-semibold border border-neutral-200 dark:border-[#1E3557] hover:border-[#C5A059] text-neutral-700 dark:text-neutral-200"
                    >
                      7-Night Ghana Vacation
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* WHO SECTION */}
            {activeSection === 'who' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between py-3 border-b border-neutral-200 dark:border-[#1E3557]">
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white">Guests</h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Adults, children, and infants</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      disabled={filters.guests <= 1}
                      onClick={() => setFilter('guests', Math.max(1, filters.guests - 1))}
                      className="w-9 h-9 rounded-full border border-neutral-300 dark:border-[#1E3557] flex items-center justify-center font-bold text-lg disabled:opacity-40 hover:border-[#C5A059] transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold text-base text-neutral-900 dark:text-white">
                      {filters.guests}
                    </span>
                    <button
                      onClick={() => setFilter('guests', Math.min(16, filters.guests + 1))}
                      className="w-9 h-9 rounded-full border border-neutral-300 dark:border-[#1E3557] flex items-center justify-center font-bold text-lg hover:border-[#C5A059] transition-colors"
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
                {/* Price Range in Ghana Cedis */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                    Price Range (GH₵ per night)
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs text-neutral-400">Min (GH₵)</span>
                      <input
                        type="number"
                        placeholder="0"
                        value={filters.minPrice || ''}
                        onChange={(e) =>
                          setFilter('minPrice', e.target.value ? Number(e.target.value) : undefined)
                        }
                        className="w-full mt-1 px-3 py-2 rounded-xl border border-neutral-300 dark:border-[#1E3557] bg-white dark:bg-[#0A1422] text-neutral-900 dark:text-white focus:ring-2 focus:ring-[#C5A059] focus:outline-none text-sm"
                      />
                    </div>
                    <div>
                      <span className="text-xs text-neutral-400">Max (GH₵)</span>
                      <input
                        type="number"
                        placeholder="10000"
                        value={filters.maxPrice || ''}
                        onChange={(e) =>
                          setFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)
                        }
                        className="w-full mt-1 px-3 py-2 rounded-xl border border-neutral-300 dark:border-[#1E3557] bg-white dark:bg-[#0A1422] text-neutral-900 dark:text-white focus:ring-2 focus:ring-[#C5A059] focus:outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                    Property Type
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {PROPERTY_TYPES.map((pt) => {
                      const isSelected = filters.propertyType === pt.name;
                      return (
                        <button
                          key={pt.id}
                          onClick={() => setFilter('propertyType', isSelected ? '' : pt.name)}
                          className={`p-2.5 rounded-xl text-left border text-xs font-semibold transition-colors ${
                            isSelected
                              ? 'border-[#C5A059] bg-[#C5A059]/15 text-[#C5A059] font-bold'
                              : 'border-neutral-200 dark:border-[#1E3557] hover:border-[#C5A059]/40 text-neutral-800 dark:text-neutral-200'
                          }`}
                        >
                          <div className="font-bold truncate">{pt.name}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                    Luxury Amenities
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {AMENITIES.slice(0, 12).map((a) => {
                      const isSelected = filters.amenities?.includes(a.id);
                      return (
                        <button
                          key={a.id}
                          onClick={() => toggleAmenity(a.id)}
                          className={`flex items-center gap-2 p-2 rounded-xl border text-xs font-medium text-left transition-colors ${
                            isSelected
                              ? 'border-[#C5A059] bg-[#C5A059]/15 text-[#C5A059] font-bold'
                              : 'border-neutral-200 dark:border-[#1E3557] text-neutral-700 dark:text-neutral-300 hover:border-neutral-300'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                              isSelected
                                ? 'bg-[#C5A059] border-[#C5A059] text-[#0E1E38]'
                                : 'border-neutral-300 dark:border-[#1E3557]'
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
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-t border-neutral-200 dark:border-[#1E3557] bg-neutral-50 dark:bg-[#0A1422]">
            <button
              onClick={resetFilters}
              className="text-xs sm:text-sm font-semibold underline text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            >
              Reset filters
            </button>
            <button
              onClick={handleSearch}
              className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm bg-gradient-to-r from-[#DFB24A] via-[#C5A059] to-[#DFB24A] text-[#0E1E38] shadow-md hover:shadow-lg transition-transform hover:scale-105"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              <span>Search Ghana Stays</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
