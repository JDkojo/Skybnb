import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Image as ImageIcon,
  Building2,
  MapPin,
  Plus,
  Trash2,
  ShieldCheck,
} from 'lucide-react';
import { useCreateListing } from '../../hooks/useCreateListing';
import { PROPERTY_TYPES } from '../../data/propertyTypes';
import { CATEGORIES } from '../../data/filters';
import { AMENITIES } from '../../data/amenities';
import { useAuthStore } from '../../store/useAuthStore';

export default function CreateListing() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const setAuthModal = useAuthStore((s) => s.setAuthModal);
  const { createListing, isCreating } = useCreateListing();

  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [propertyType, setPropertyType] = useState(PROPERTY_TYPES[0].name);
  const [category, setCategory] = useState('luxe');
  const [location, setLocation] = useState('East Legon, Accra, Greater Accra');
  const [city, setCity] = useState('Accra');
  const [country, setCountry] = useState('Ghana');
  const [pricePerNight, setPricePerNight] = useState(2500);
  const [cleaningFee, setCleaningFee] = useState(250);
  const [serviceFee, setServiceFee] = useState(180);
  const [bedrooms, setBedrooms] = useState(2);
  const [beds, setBeds] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);
  const [maxGuests, setMaxGuests] = useState(4);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'wifi',
    'kitchen',
    'air_conditioning',
    'workspace',
    'free_parking',
  ]);
  const [photos, setPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  ]);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleAmenity = (id: string) => {
    if (selectedAmenities.includes(id)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== id));
    } else {
      setSelectedAmenities([...selectedAmenities, id]);
    }
  };

  const handleAddPhoto = () => {
    if (newPhotoUrl && newPhotoUrl.startsWith('http')) {
      setPhotos([...photos, newPhotoUrl]);
      setNewPhotoUrl('');
    }
  };

  const handleRemovePhoto = (idx: number) => {
    setPhotos(photos.filter((_, i) => i !== idx));
  };

  const handleSubmit = async () => {
    if (!user) {
      setAuthModal(true, 'signin');
      return;
    }

    try {
      await createListing({
        title: title || 'Modern Luxury Apartment in Accra',
        description:
          description ||
          'Enjoy an exquisite stay in Ghana with premium luxury finishes, uninterrupted views, high-speed fiber internet, and 24/7 backup power.',
        type: propertyType,
        category,
        location: location || `${city || 'Accra'}, Ghana`,
        city: city || 'Accra',
        country: 'Ghana',
        latitude: 5.6037 + (Math.random() - 0.5) * 0.05,
        longitude: -0.187 + (Math.random() - 0.5) * 0.05,
        price_per_night: Number(pricePerNight) || 2500,
        cleaning_fee: Number(cleaningFee) || 250,
        service_fee: Number(serviceFee) || 180,
        bedrooms: Number(bedrooms) || 1,
        beds: Number(beds) || 1,
        bathrooms: Number(bathrooms) || 1,
        max_guests: Number(maxGuests) || 2,
        amenities: selectedAmenities,
        photos: photos.length > 0 ? photos : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
        is_featured: true,
      });

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-lg mx-auto my-12 sm:my-16 p-6 sm:p-8 text-center bg-white dark:bg-[#0F1E33] rounded-3xl border border-neutral-200 dark:border-[#1E3557] shadow-2xl space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#C5A059]/20 text-[#C5A059] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
          Congratulations! Your Ghana listing is live!
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
          Your property has been published to the Valpromark portfolio. Guests seeking quality accommodation across Ghana can now discover and book your stay.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            to="/"
            className="flex-1 py-3 rounded-full font-bold text-xs sm:text-sm bg-gradient-to-r from-[#DFB24A] via-[#C5A059] to-[#DFB24A] text-[#0E1E38] shadow-md"
          >
            View on Explore
          </Link>
          <Link
            to="/host/my-listings"
            className="flex-1 py-3 rounded-full font-semibold text-xs sm:text-sm border border-neutral-300 dark:border-[#1E3557] text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-[#0A1422]"
          >
            Manage My Listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-6 py-6 sm:py-8 pb-28">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-[#C5A059] uppercase tracking-wider">
            Host with Valpromark
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
            List your property in Ghana
          </h1>
        </div>
        <div className="text-xs font-bold text-neutral-500">
          Step {step} of {totalSteps}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-neutral-200 dark:bg-[#1E3557] rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-gradient-to-r from-[#DFB24A] via-[#C5A059] to-[#DFB24A] transition-all duration-300 rounded-full"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </div>

      {/* STEP 1: Basic Info & Property Type */}
      {step === 1 && (
        <div className="p-5 sm:p-7 rounded-3xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] space-y-6">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
            1. Property Details & Category
          </h2>

          <div>
            <label className="block text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-2">
              Listing Title
            </label>
            <input
              type="text"
              placeholder="e.g. The Embassy Crest Penthouse & Pool — Cantonments"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-[#1E3557] bg-white dark:bg-[#0A1422] text-sm text-neutral-900 dark:text-white focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-2">
              Property Description
            </label>
            <textarea
              rows={4}
              placeholder="Highlight the architectural highlights, amenities, backup solar/generator, proximity to attractions in Ghana, and executive perks..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-[#1E3557] bg-white dark:bg-[#0A1422] text-sm text-neutral-900 dark:text-white focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-2">
                Property Structure
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-[#1E3557] bg-white dark:bg-[#0A1422] text-sm text-neutral-900 dark:text-white focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
              >
                {PROPERTY_TYPES.map((pt) => (
                  <option key={pt.id} value={pt.name}>
                    {pt.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-2">
                Collection Theme
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-[#1E3557] bg-white dark:bg-[#0A1422] text-sm text-neutral-900 dark:text-white focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Location in Ghana */}
      {step === 2 && (
        <div className="p-5 sm:p-7 rounded-3xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] space-y-6">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
            2. Ghana Location & Neighborhood
          </h2>

          <div>
            <label className="block text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-2">
              Full Address / Neighborhood
            </label>
            <input
              type="text"
              placeholder="e.g. Cantonments, Accra, Greater Accra"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-[#1E3557] bg-white dark:bg-[#0A1422] text-sm text-neutral-900 dark:text-white focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-2">
                City / Town
              </label>
              <input
                type="text"
                placeholder="e.g. Accra, Kumasi, Aburi, Takoradi"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-[#1E3557] bg-white dark:bg-[#0A1422] text-sm text-neutral-900 dark:text-white focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-2">
                Country
              </label>
              <input
                type="text"
                disabled
                value="Ghana"
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-[#1E3557] bg-neutral-100 dark:bg-[#0A1422]/50 text-sm font-bold text-neutral-700 dark:text-neutral-300 cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Capacity, Pricing in Cedis & Amenities */}
      {step === 3 && (
        <div className="p-5 sm:p-7 rounded-3xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] space-y-6">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
            3. Capacity & Pricing (GH₵)
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-1">
                Max Guests
              </label>
              <input
                type="number"
                min={1}
                value={maxGuests}
                onChange={(e) => setMaxGuests(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-[#1E3557] bg-white dark:bg-[#0A1422] text-sm text-neutral-900 dark:text-white focus:ring-2 focus:ring-[#C5A059]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-1">
                Bedrooms
              </label>
              <input
                type="number"
                min={1}
                value={bedrooms}
                onChange={(e) => setBedrooms(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-[#1E3557] bg-white dark:bg-[#0A1422] text-sm text-neutral-900 dark:text-white focus:ring-2 focus:ring-[#C5A059]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-1">
                Beds
              </label>
              <input
                type="number"
                min={1}
                value={beds}
                onChange={(e) => setBeds(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-[#1E3557] bg-white dark:bg-[#0A1422] text-sm text-neutral-900 dark:text-white focus:ring-2 focus:ring-[#C5A059]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-1">
                Bathrooms
              </label>
              <input
                type="number"
                min={1}
                value={bathrooms}
                onChange={(e) => setBathrooms(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-[#1E3557] bg-white dark:bg-[#0A1422] text-sm text-neutral-900 dark:text-white focus:ring-2 focus:ring-[#C5A059]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-1">
                Price per night (GH₵)
              </label>
              <input
                type="number"
                value={pricePerNight}
                onChange={(e) => setPricePerNight(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-[#1E3557] bg-white dark:bg-[#0A1422] text-sm font-bold text-neutral-900 dark:text-white focus:ring-2 focus:ring-[#C5A059]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-1">
                Cleaning fee (GH₵)
              </label>
              <input
                type="number"
                value={cleaningFee}
                onChange={(e) => setCleaningFee(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-[#1E3557] bg-white dark:bg-[#0A1422] text-sm text-neutral-900 dark:text-white focus:ring-2 focus:ring-[#C5A059]"
              />
            </div>
          </div>

          {/* Amenities */}
          <div className="pt-2">
            <label className="block text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-3">
              Included Amenities
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {AMENITIES.map((a) => {
                const isSelected = selectedAmenities.includes(a.id);
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => toggleAmenity(a.id)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-colors flex items-center justify-between ${
                      isSelected
                        ? 'border-[#C5A059] bg-[#C5A059]/15 text-[#C5A059]'
                        : 'border-neutral-200 dark:border-[#1E3557] text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    <span className="truncate">{a.name}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 shrink-0 text-[#C5A059]" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: Photos & Review */}
      {step === 4 && (
        <div className="p-5 sm:p-7 rounded-3xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] space-y-6">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
            4. Photos & Final Publishing
          </h2>

          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400">
              Add Photo URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                value={newPhotoUrl}
                onChange={(e) => setNewPhotoUrl(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-[#1E3557] bg-white dark:bg-[#0A1422] text-xs text-neutral-900 dark:text-white focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddPhoto}
                className="px-4 py-2.5 rounded-xl bg-[#C5A059] text-[#0E1E38] font-bold text-xs flex items-center gap-1 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Photo Preview Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {photos.map((p, idx) => (
              <div key={idx} className="relative aspect-video rounded-xl overflow-hidden group border border-neutral-200 dark:border-[#1E3557]">
                <img src={p} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(idx)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-[#C5A059]/10 border border-[#C5A059]/30 text-xs space-y-1">
            <p className="font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              Valpromark Essence Guarantee for Hosts
            </p>
            <p className="text-neutral-600 dark:text-neutral-300">
              Your listing will receive professional verification, instant host payouts via Ghana Mobile Money or Direct Bank Wire, and 24/7 guest support.
            </p>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="mt-8 flex items-center justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full font-bold text-xs border border-neutral-300 dark:border-[#1E3557] text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-[#0A1422]"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        ) : <div />}

        {step < totalSteps ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="flex items-center gap-1.5 px-6 py-3 rounded-full font-bold text-xs bg-[#C5A059] text-[#0E1E38] shadow-md hover:scale-105 transition-transform"
          >
            <span>Next Step</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            disabled={isCreating}
            onClick={handleSubmit}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm bg-gradient-to-r from-[#DFB24A] via-[#C5A059] to-[#DFB24A] text-[#0E1E38] shadow-xl shadow-[#C5A059]/25 hover:scale-105 transition-transform disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isCreating ? 'Publishing...' : 'Publish Listing'}</span>
          </button>
        )}
      </div>
    </div>
  );
}
