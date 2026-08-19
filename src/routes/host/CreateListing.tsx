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
  DollarSign,
  Plus,
  Trash2,
  Camera,
} from 'lucide-react';
import { useCreateListing } from '../../hooks/useCreateListing';
import { PROPERTY_TYPES } from '../../data/propertyTypes';
import { CATEGORIES } from '../../data/filters';
import { AMENITIES } from '../../data/amenities';
import { useAuthStore } from '../../store/useAuthStore';
import { motion, AnimatePresence } from 'motion/react';

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
  const [category, setCategory] = useState('trending');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [pricePerNight, setPricePerNight] = useState(250);
  const [cleaningFee, setCleaningFee] = useState(60);
  const [serviceFee, setServiceFee] = useState(35);
  const [bedrooms, setBedrooms] = useState(2);
  const [beds, setBeds] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);
  const [maxGuests, setMaxGuests] = useState(4);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'wifi',
    'kitchen',
    'air_conditioning',
    'workspace',
  ]);
  const [photos, setPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
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
        title: title || 'Modern Panoramic Sanctuary',
        description:
          description ||
          'Enjoy an exquisite stay with premium luxury finishes, uninterrupted views, and five-star hospitality amenities.',
        type: propertyType,
        category,
        location: location || `${city || 'Kyoto'}, ${country || 'Japan'}`,
        city: city || 'Kyoto',
        country: country || 'Japan',
        latitude: 35.0116 + (Math.random() - 0.5) * 0.1,
        longitude: 135.7681 + (Math.random() - 0.5) * 0.1,
        price_per_night: Number(pricePerNight) || 250,
        cleaning_fee: Number(cleaningFee) || 50,
        service_fee: Number(serviceFee) || 30,
        bedrooms: Number(bedrooms) || 1,
        beds: Number(beds) || 1,
        bathrooms: Number(bathrooms) || 1,
        max_guests: Number(maxGuests) || 2,
        amenities: selectedAmenities,
        photos: photos.length > 0 ? photos : ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'],
        is_featured: true,
      });

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-lg mx-auto my-16 p-8 text-center bg-white dark:bg-[#1E1E1E] rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
          Congratulations! Your listing is live!
        </h2>
        <p className="text-sm text-neutral-500">
          Your property has been published to the global Skybnb directory. Guests from around the world can now discover and reserve their stays.
        </p>
        <div className="flex gap-3 pt-2">
          <Link
            to="/"
            className="flex-1 py-3 rounded-full font-bold text-sm bg-[#0EA5E9] text-white hover:bg-sky-600 shadow-md"
          >
            View on Explore
          </Link>
          <Link
            to="/host/my-listings"
            className="flex-1 py-3 rounded-full font-semibold text-sm border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            Manage Listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pb-28">
      {/* Step Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
          <span>Step {step} of {totalSteps}</span>
          <span>{Math.round((step / totalSteps) * 100)}% Completed</span>
        </div>
        <div className="w-full h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
          <div
            className="h-full bg-[#0EA5E9] transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* STEP 1: Basic Info & Property Type */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div>
            <h1 className="text-2xl font-black text-neutral-900 dark:text-white">
              Tell us about your sanctuary
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Choose the category and property type that best describes your home.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-neutral-500 mb-2">
              Property Headline Title
            </label>
            <input
              type="text"
              placeholder="e.g. Minimalist Panoramic Hillside Villa"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1E1E1E] text-neutral-900 dark:text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-neutral-500 mb-2">
              Description for guests
            </label>
            <textarea
              rows={4}
              placeholder="Describe the atmosphere, unique views, architectural highlights, and surrounding area..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1E1E1E] text-neutral-900 dark:text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-neutral-500 mb-3">
              Property Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PROPERTY_TYPES.map((pt) => (
                <button
                  key={pt.id}
                  type="button"
                  onClick={() => setPropertyType(pt.name)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    propertyType === pt.name
                      ? 'border-[#0EA5E9] bg-sky-50 dark:bg-sky-950/40 text-[#0EA5E9] ring-2 ring-[#0EA5E9]/20'
                      : 'border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <p className="font-bold text-sm">{pt.name}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">
                    {pt.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* STEP 2: Location & Capacities */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div>
            <h1 className="text-2xl font-black text-neutral-900 dark:text-white">
              Where is your place located?
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Provide the city, region, and guest accommodation capacity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-500 mb-1.5">
                City / Town
              </label>
              <input
                type="text"
                placeholder="e.g. Positano"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1E1E1E] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-500 mb-1.5">
                Country
              </label>
              <input
                type="text"
                placeholder="e.g. Italy"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1E1E1E] text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-neutral-500 mb-1.5">
              Full Location Display Name
            </label>
            <input
              type="text"
              placeholder="e.g. Positano, Amalfi Coast, Italy"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1E1E1E] text-sm"
            />
          </div>

          {/* Rooms and Capacity counters */}
          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 space-y-4">
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white">Capacity & Rooms</h3>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Max Guests</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMaxGuests(Math.max(1, maxGuests - 1))}
                  className="w-8 h-8 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-bold"
                >
                  -
                </button>
                <span className="w-6 text-center font-bold">{maxGuests}</span>
                <button
                  type="button"
                  onClick={() => setMaxGuests(maxGuests + 1)}
                  className="w-8 h-8 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Bedrooms</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setBedrooms(Math.max(1, bedrooms - 1))}
                  className="w-8 h-8 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-bold"
                >
                  -
                </button>
                <span className="w-6 text-center font-bold">{bedrooms}</span>
                <button
                  type="button"
                  onClick={() => setBedrooms(bedrooms + 1)}
                  className="w-8 h-8 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Bathrooms</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}
                  className="w-8 h-8 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-bold"
                >
                  -
                </button>
                <span className="w-6 text-center font-bold">{bathrooms}</span>
                <button
                  type="button"
                  onClick={() => setBathrooms(bathrooms + 1)}
                  className="w-8 h-8 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* STEP 3: Amenities & Photos */}
      {step === 3 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div>
            <h1 className="text-2xl font-black text-neutral-900 dark:text-white">
              Amenities and High-Res Photos
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Select all available features and add photo gallery URLs.
            </p>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-xs font-bold uppercase text-neutral-500 mb-3">
              Included Amenities
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto p-1">
              {AMENITIES.map((a) => {
                const isSelected = selectedAmenities.includes(a.id);
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => toggleAmenity(a.id)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'border-[#0EA5E9] bg-sky-50 dark:bg-sky-950/40 text-[#0EA5E9]'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    <span className="truncate">{a.name}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 shrink-0 text-[#0EA5E9]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Photos */}
          <div>
            <label className="block text-xs font-bold uppercase text-neutral-500 mb-2">
              Listing Photography Gallery
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="url"
                placeholder="Paste Unsplash or image URL (https://...)"
                value={newPhotoUrl}
                onChange={(e) => setNewPhotoUrl(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1E1E1E] text-xs"
              />
              <button
                type="button"
                onClick={handleAddPhoto}
                className="px-4 py-2.5 rounded-xl bg-[#0EA5E9] text-white font-bold text-xs flex items-center gap-1 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {photos.map((photo, i) => (
                <div key={i} className="relative aspect-video rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 group">
                  <img src={photo} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(i)}
                    className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* STEP 4: Pricing & Final Review */}
      {step === 4 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div>
            <h1 className="text-2xl font-black text-neutral-900 dark:text-white">
              Set your nightly rate
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              You can adjust and modify your pricing anytime from your host dashboard.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1E1E1E] text-center space-y-3">
            <span className="text-xs font-bold uppercase text-neutral-400">Nightly Base Rate</span>
            <div className="flex items-center justify-center gap-2">
              <span className="text-3xl font-black text-neutral-900 dark:text-white">$</span>
              <input
                type="number"
                value={pricePerNight}
                onChange={(e) => setPricePerNight(Number(e.target.value))}
                className="w-36 text-4xl font-black text-center text-[#0EA5E9] bg-transparent border-b-2 border-[#0EA5E9] focus:outline-none"
              />
              <span className="text-sm font-medium text-neutral-400">/ night</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-500 mb-1.5">
                Cleaning Fee ($)
              </label>
              <input
                type="number"
                value={cleaningFee}
                onChange={(e) => setCleaningFee(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1E1E1E] text-sm font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-500 mb-1.5">
                Skybnb Host Fee ($)
              </label>
              <input
                type="number"
                value={serviceFee}
                onChange={(e) => setServiceFee(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1E1E1E] text-sm font-semibold"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-8 border-t border-neutral-200 dark:border-neutral-800 mt-8">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full font-bold text-sm border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        ) : (
          <div />
        )}

        {step < totalSteps ? (
          <button
            type="button"
            onClick={() => setStep(step + 1)}
            className="flex items-center gap-1.5 px-6 py-3 rounded-full font-bold text-sm bg-[#0EA5E9] hover:bg-sky-600 text-white shadow-md"
          >
            <span>Continue</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            disabled={isCreating}
            onClick={handleSubmit}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full font-extrabold text-sm bg-[#0EA5E9] hover:bg-sky-600 text-white shadow-xl shadow-sky-500/25 transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isCreating ? 'Publishing...' : 'Publish Listing'}</span>
          </button>
        )}
      </div>
    </div>
  );
}
