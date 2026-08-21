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
  Home,
  Map,
  GraduationCap,
  Hotel,
  Briefcase,
  Phone,
  MessageSquare,
  FileCheck2,
  BadgeCheck,
} from 'lucide-react';
import { useCreateListing } from '../../hooks/useCreateListing';
import { PROPERTY_TYPES } from '../../data/propertyTypes';
import { CATEGORIES, LISTING_PURPOSES, GHANA_REGIONS } from '../../data/filters';
import { AMENITIES } from '../../data/amenities';
import { useAuthStore } from '../../store/useAuthStore';
import { ListingPurpose, PriceType, PropertyCategory } from '../../types';

export default function CreateListing() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const setAuthModal = useAuthStore((s) => s.setAuthModal);
  const { createListing, isCreating } = useCreateListing();

  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Form State
  const [purpose, setPurpose] = useState<ListingPurpose>('sale');
  const [category, setCategory] = useState<PropertyCategory>('house');
  const [propertyType, setPropertyType] = useState('Single Family House / Villa');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Location & Region
  const [region, setRegion] = useState('Greater Accra');
  const [city, setCity] = useState('Accra');
  const [neighborhood, setNeighborhood] = useState('East Legon');

  // Pricing
  const [price, setPrice] = useState<number>(4500000);
  const [priceType, setPriceType] = useState<PriceType>('total');
  const [isNegotiable, setIsNegotiable] = useState(true);

  // Specs
  const [bedrooms, setBedrooms] = useState(4);
  const [bathrooms, setBathrooms] = useState(4);
  const [landSize, setLandSize] = useState('100 x 80 ft (0.18 Acre)');
  const [titleDocument, setTitleDocument] = useState('Lands Commission Titled');
  const [furnishing, setFurnishing] = useState<'furnished' | 'semi-furnished' | 'unfurnished'>('semi-furnished');

  // Contact Details
  const [contactName, setContactName] = useState(user?.full_name || '');
  const [contactPhone, setContactPhone] = useState(user?.phone || '+233 ');
  const [contactWhatsApp, setContactWhatsApp] = useState(user?.phone ? user.phone.replace(/[^0-9]/g, '') : '233');
  const [contactRole, setContactRole] = useState<'Owner' | 'Direct Agent' | 'Developer' | 'Property Manager'>('Owner');
  const [agencyName, setAgencyName] = useState('');

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'air_conditioning',
    'kitchen',
    'free_parking',
    'wifi',
  ]);

  const [photos, setPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
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

  // Adjust default price cadence based on purpose
  const handlePurposeChange = (p: ListingPurpose) => {
    setPurpose(p);
    if (p === 'sale') {
      setPriceType('total');
      if (price < 50000) setPrice(500000);
    } else if (p === 'rent') {
      setPriceType('month');
      if (price > 100000) setPrice(15000);
    } else if (p === 'hostel') {
      setPriceType('semester');
      setCategory('hostel');
      setPropertyType('Student Hostel Suite');
      if (price > 100000) setPrice(3800);
    } else if (p === 'short_stay') {
      setPriceType('night');
      setCategory('hotel');
      setPropertyType('Hotel / Guest House Suite');
      if (price > 100000) setPrice(1200);
    }
  };

  const handleCategoryChange = (c: PropertyCategory) => {
    setCategory(c);
    if (c === 'land') {
      setPropertyType('Serviced Residential Land / Plot');
      setPurpose('sale');
      setPriceType('total');
    } else if (c === 'hostel') {
      setPropertyType('Student Hostel Suite');
      setPurpose('hostel');
      setPriceType('semester');
    } else if (c === 'hotel') {
      setPropertyType('Hotel / Guest House');
      setPurpose('short_stay');
      setPriceType('night');
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      setAuthModal(true, 'signin');
      return;
    }

    try {
      const fullLocation = `${neighborhood ? neighborhood + ', ' : ''}${city}, ${region}`;

      await createListing({
        title: title || `${propertyType} in ${neighborhood || city}`,
        description:
          description ||
          `Direct listing by ${contactRole}. Well located in ${neighborhood || city}, ${region}. Clean documents, ready for physical inspection. Contact owner directly on WhatsApp or phone for full details and viewing schedule.`,
        type: propertyType,
        category,
        purpose,
        location: fullLocation,
        city,
        country: 'Ghana',
        region,
        latitude: 5.6037 + (Math.random() - 0.5) * 0.05,
        longitude: -0.187 + (Math.random() - 0.5) * 0.05,
        price: Number(price) || 100000,
        price_type: priceType,
        is_negotiable: isNegotiable,
        price_per_night: Number(price) || 100000,
        cleaning_fee: 0,
        service_fee: 0,
        bedrooms: category === 'land' ? 0 : Number(bedrooms) || 0,
        beds: category === 'land' ? 0 : Number(bedrooms) || 0,
        bathrooms: category === 'land' ? 0 : Number(bathrooms) || 0,
        max_guests: category === 'land' ? 0 : Number(bedrooms) * 2 || 2,
        land_size: landSize || undefined,
        title_document: titleDocument || undefined,
        furnishing: category === 'land' ? undefined : furnishing,
        contact_name: contactName || user.full_name || 'Property Owner',
        contact_phone: contactPhone || '+233 24 000 0000',
        contact_whatsapp: contactWhatsApp || (contactPhone ? contactPhone.replace(/[^0-9]/g, '') : '233240000000'),
        contact_role: contactRole,
        agency_name: agencyName || undefined,
        photos: photos.length > 0 ? photos : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'],
        amenities: selectedAmenities,
        status: 'available',
      });

      setIsSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error('Failed to create listing', err);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
          Property Listed Successfully!
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2">
          Your listing is now live across Ghana on Valpromark. Buyers and interested tenants can contact you directly via WhatsApp and phone.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            to="/"
            className="px-6 py-3 rounded-full bg-[#0E1E38] text-[#E5C158] dark:bg-[#E5C158] dark:text-[#0E1E38] font-bold text-sm shadow-md hover:scale-105 transition-transform"
          >
            View Live Marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 pb-28">
      {/* Top Header */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-[#C5A059] mb-3"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-neutral-900 dark:text-white">
              List Your Property for Free
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
              Houses, Lands, Hostels, Hotels & Commercial Spaces · Zero Listing Fees
            </p>
          </div>

          <div className="px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 font-bold text-xs flex items-center gap-1">
            <BadgeCheck className="w-4 h-4" />
            <span>100% Free</span>
          </div>
        </div>

        {/* Multi-step progress bar */}
        <div className="mt-4 flex items-center gap-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                i + 1 <= step ? 'bg-[#C5A059]' : 'bg-neutral-200 dark:bg-[#1E3557]'
              }`}
            />
          ))}
        </div>
        <p className="text-right text-[11px] font-bold text-neutral-400 mt-1">
          Step {step} of {totalSteps}
        </p>
      </div>

      {/* Step 1: Purpose & Category */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase text-neutral-500 dark:text-neutral-400 mb-2">
              1. What is the Purpose of this Listing?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'sale', label: 'For Sale', desc: 'Outright purchase of house or land' },
                { id: 'rent', label: 'For Rent', desc: 'Monthly or yearly lease / rent' },
                { id: 'hostel', label: 'Student Hostel', desc: 'Semester student accommodation' },
                { id: 'short_stay', label: 'Hotel / Short Stay', desc: 'Guest house or boutique lodge' },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handlePurposeChange(p.id as any)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    purpose === p.id
                      ? 'border-[#C5A059] bg-[#C5A059]/10 text-neutral-900 dark:text-white shadow-sm ring-1 ring-[#C5A059]'
                      : 'border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] text-neutral-700 dark:text-neutral-300 hover:border-neutral-300'
                  }`}
                >
                  <span className="block font-black text-sm">{p.label}</span>
                  <span className="block text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug">
                    {p.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-neutral-500 dark:text-neutral-400 mb-2">
              2. Select Property Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'house', label: 'Houses & Villas', icon: Home },
                { id: 'apartment', label: 'Apartments & Flats', icon: Building2 },
                { id: 'land', label: 'Lands & Plots', icon: Map },
                { id: 'hostel', label: 'Student Hostels', icon: GraduationCap },
                { id: 'hotel', label: 'Hotels & Lodges', icon: Hotel },
                { id: 'commercial', label: 'Commercial & Office', icon: Briefcase },
              ].map((c) => {
                const Icon = c.icon;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleCategoryChange(c.id as any)}
                    className={`p-3 rounded-2xl border flex items-center gap-2.5 transition-all text-left ${
                      category === c.id
                        ? 'border-[#C5A059] bg-[#C5A059]/10 text-neutral-900 dark:text-white font-bold ring-1 ring-[#C5A059]'
                        : 'border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 font-medium'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${category === c.id ? 'text-[#C5A059]' : 'text-neutral-400'}`} />
                    <span className="text-xs">{c.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-neutral-500 dark:text-neutral-400 mb-2">
              3. Specific Property Type Description
            </label>
            <input
              type="text"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              placeholder="e.g. 4-Bedroom Gated House, 2 Demarcated Plots, Student Suite"
              className="w-full px-4 py-3 rounded-2xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-[#C5A059]"
            />
          </div>
        </div>
      )}

      {/* Step 2: Location, Pricing & Specifications */}
      {step === 2 && (
        <div className="space-y-6">
          {/* Location Section */}
          <div className="p-4 sm:p-5 rounded-3xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] space-y-4">
            <h3 className="font-black text-sm uppercase text-neutral-700 dark:text-neutral-300">
              Location in Ghana
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">
                  Region *
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-[#1E3557] bg-neutral-50 dark:bg-[#0A1422] text-xs font-semibold text-neutral-900 dark:text-white"
                >
                  {GHANA_REGIONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">
                  City / Town *
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Accra, Kumasi, Prampram, Takoradi"
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-[#1E3557] bg-neutral-50 dark:bg-[#0A1422] text-xs text-neutral-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">
                  Area / Neighborhood *
                </label>
                <input
                  type="text"
                  required
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  placeholder="e.g. East Legon, Ayeduase, Beach Lane"
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-[#1E3557] bg-neutral-50 dark:bg-[#0A1422] text-xs text-neutral-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="p-4 sm:p-5 rounded-3xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] space-y-4">
            <h3 className="font-black text-sm uppercase text-neutral-700 dark:text-neutral-300">
              Pricing in Ghana Cedis (GH₵)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">
                  Price Amount (GH₵) *
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-[#1E3557] bg-neutral-50 dark:bg-[#0A1422] text-sm font-black text-[#0E1E38] dark:text-[#E5C158]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">
                  Price Cadence / Type
                </label>
                <select
                  value={priceType}
                  onChange={(e) => setPriceType(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-[#1E3557] bg-neutral-50 dark:bg-[#0A1422] text-xs font-semibold text-neutral-900 dark:text-white"
                >
                  <option value="total">Total Price (For Sale / Purchase)</option>
                  <option value="month">Per Month (Rental)</option>
                  <option value="year">Per Year (Advance Lease)</option>
                  <option value="semester">Per Semester (Student Hostel)</option>
                  <option value="night">Per Night (Hotel / Guest House)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is-negotiable-check"
                checked={isNegotiable}
                onChange={(e) => setIsNegotiable(e.target.checked)}
                className="w-4 h-4 accent-[#C5A059] rounded cursor-pointer"
              />
              <label htmlFor="is-negotiable-check" className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 cursor-pointer">
                Price is negotiable upon physical inspection
              </label>
            </div>
          </div>

          {/* Specifications */}
          <div className="p-4 sm:p-5 rounded-3xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] space-y-4">
            <h3 className="font-black text-sm uppercase text-neutral-700 dark:text-neutral-300">
              Property Specifications & Documents
            </h3>

            {category === 'land' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">
                    Land / Plot Size *
                  </label>
                  <input
                    type="text"
                    value={landSize}
                    onChange={(e) => setLandSize(e.target.value)}
                    placeholder="e.g. 70 x 100 ft, 1 Acre (4 Plots), 2.5 Acres"
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-[#1E3557] bg-neutral-50 dark:bg-[#0A1422] text-xs text-neutral-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">
                    Land Title / Documentation Status
                  </label>
                  <input
                    type="text"
                    value={titleDocument}
                    onChange={(e) => setTitleDocument(e.target.value)}
                    placeholder="e.g. Lands Commission Titled, Registered Indenture, Gazette"
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-[#1E3557] bg-neutral-50 dark:bg-[#0A1422] text-xs text-neutral-900 dark:text-white"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-[#1E3557] bg-neutral-50 dark:bg-[#0A1422] text-xs text-neutral-900 dark:text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-[#1E3557] bg-neutral-50 dark:bg-[#0A1422] text-xs text-neutral-900 dark:text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">
                    Furnishing Status
                  </label>
                  <select
                    value={furnishing}
                    onChange={(e) => setFurnishing(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-[#1E3557] bg-neutral-50 dark:bg-[#0A1422] text-xs font-semibold text-neutral-900 dark:text-white"
                  >
                    <option value="furnished">Fully Furnished</option>
                    <option value="semi-furnished">Semi-Furnished</option>
                    <option value="unfurnished">Unfurnished</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 3: Title, Description & Photos */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase text-neutral-500 dark:text-neutral-400 mb-1">
              Listing Headline Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 4-Bedroom Luxury Smart Villa with Swimming Pool in East Legon"
              className="w-full px-4 py-3 rounded-2xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] text-sm text-neutral-900 dark:text-white font-bold focus:outline-none focus:border-[#C5A059]"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-neutral-500 dark:text-neutral-400 mb-1">
              Detailed Property Description *
            </label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the property, road access, security, utilities (light/water), terms, proximity to landmarks, etc."
              className="w-full px-4 py-3 rounded-2xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#C5A059]"
            />
          </div>

          {/* Amenities & Utilities */}
          <div>
            <label className="block text-xs font-black uppercase text-neutral-500 dark:text-neutral-400 mb-2">
              Features & Utilities Available
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {AMENITIES.map((amenity) => (
                <button
                  key={amenity.id}
                  type="button"
                  onClick={() => toggleAmenity(amenity.id)}
                  className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 transition-all ${
                    selectedAmenities.includes(amenity.id)
                      ? 'border-[#C5A059] bg-[#C5A059]/10 text-neutral-900 dark:text-white font-bold'
                      : 'border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${
                      selectedAmenities.includes(amenity.id) ? 'text-[#C5A059]' : 'text-neutral-300 dark:text-neutral-600'
                    }`}
                  />
                  <span className="truncate">{amenity.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Photo Gallery Management */}
          <div>
            <label className="block text-xs font-black uppercase text-neutral-500 dark:text-neutral-400 mb-2">
              Property Photos ({photos.length})
            </label>

            <div className="flex gap-2 mb-3">
              <input
                type="url"
                value={newPhotoUrl}
                onChange={(e) => setNewPhotoUrl(e.target.value)}
                placeholder="Paste direct image link (e.g. https://...)"
                className="flex-1 px-3 py-2 rounded-xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] text-xs text-neutral-900 dark:text-white"
              />
              <button
                type="button"
                onClick={handleAddPhoto}
                className="px-4 py-2 rounded-xl bg-[#C5A059] text-[#0E1E38] font-bold text-xs shadow hover:scale-105 transition-transform"
              >
                Add Photo
              </button>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {photos.map((url, idx) => (
                <div key={idx} className="relative aspect-video rounded-xl overflow-hidden group border border-neutral-200 dark:border-[#1E3557]">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(idx)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Direct Owner / Agent Contact Information */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="p-4 sm:p-6 rounded-3xl border border-neutral-200 dark:border-[#1E3557] bg-white dark:bg-[#0F1E33] space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-400">
              <Phone className="w-4 h-4" />
              <span>Direct Contact Details for Prospective Buyers & Tenants</span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Interested people on Valpromark will directly call you and message your WhatsApp to ask questions or arrange physical site visits.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">
                  Your Full Name / Contact Person *
                </label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Kofi Mensah / Nana Yaa"
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-[#1E3557] bg-neutral-50 dark:bg-[#0A1422] text-xs font-bold text-neutral-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">
                  Your Relationship / Role *
                </label>
                <select
                  value={contactRole}
                  onChange={(e) => setContactRole(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-[#1E3557] bg-neutral-50 dark:bg-[#0A1422] text-xs font-semibold text-neutral-900 dark:text-white"
                >
                  <option value="Owner">Property Owner</option>
                  <option value="Direct Agent">Direct Mandate Agent</option>
                  <option value="Developer">Property Developer</option>
                  <option value="Property Manager">Hostel / Property Manager</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">
                  Primary Phone Number (for calls) *
                </label>
                <input
                  type="tel"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="e.g. +233 24 123 4567"
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-[#1E3557] bg-neutral-50 dark:bg-[#0A1422] text-xs font-bold text-neutral-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">
                  WhatsApp Number (with country code) *
                </label>
                <input
                  type="text"
                  required
                  value={contactWhatsApp}
                  onChange={(e) => setContactWhatsApp(e.target.value)}
                  placeholder="e.g. 233241234567"
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-[#1E3557] bg-neutral-50 dark:bg-[#0A1422] text-xs font-bold text-emerald-600 dark:text-emerald-400"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">
                  Agency / Estate Name (Optional)
                </label>
                <input
                  type="text"
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                  placeholder="e.g. Coastline Prime Properties / Direct Family Sale"
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-[#1E3557] bg-neutral-50 dark:bg-[#0A1422] text-xs text-neutral-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#0A1422] border border-neutral-200 dark:border-[#1E3557] text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
            <p className="font-bold text-neutral-900 dark:text-neutral-200">
              Valpromark Free Listing Guarantee:
            </p>
            <p>
              Your property will be immediately searchable and viewable across Ghana. No commissions or transaction cuts are deducted by Valpromark.
            </p>
          </div>
        </div>
      )}

      {/* Navigation Step Buttons */}
      <div className="mt-8 flex items-center justify-between border-t border-neutral-200 dark:border-[#1E3557] pt-4">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="px-5 py-2.5 rounded-xl border border-neutral-200 dark:border-[#1E3557] text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-[#1E3557] flex items-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
        ) : (
          <div />
        )}

        {step < totalSteps ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="px-6 py-2.5 rounded-xl bg-[#0E1E38] text-[#E5C158] dark:bg-[#E5C158] dark:text-[#0E1E38] text-xs font-bold shadow hover:scale-105 transition-transform flex items-center gap-1.5"
          >
            <span>Continue</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            id="publish-listing-btn"
            type="button"
            disabled={isCreating}
            onClick={handleSubmit}
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-[#DFB24A] via-[#C5A059] to-[#DFB24A] text-[#0E1E38] text-sm font-black shadow-lg shadow-[#C5A059]/25 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {isCreating ? (
              <span>Publishing Listing...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Publish Property Free</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
