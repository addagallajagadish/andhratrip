import React, { useState } from 'react';
import { X, Car, MapPin, Phone, User, CheckCircle2, ArrowRight } from 'lucide-react';

function dateOffset(daysFromNow = 0) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 10);
}

function dateAfter(isoDate, days) {
  const date = new Date(`${isoDate}T12:00:00`);
  date.setDate(date.getDate() + days);
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 10);
}

export default function BookingModal({ isOpen, onClose, initialCar, initialEstimates }) {
  const [formData, setFormData] = useState(() => {
    const defaults = {
      fullName: '',
      phone: '',
      email: '',
      pickupCity: 'Visakhapatnam',
      destination: '',
      passengers: '4',
      vehicleModel: 'Toyota Innova Crysta',
      driveMode: 'Self Drive',
      pickupDate: dateOffset(),
      pickupTime: '09:00',
      returnDate: dateOffset(3),
      specialNotes: ''
    };

    if (initialCar?.name) {
      defaults.vehicleModel = initialCar.name;
    }
    if (initialEstimates) {
      defaults.pickupCity = initialEstimates.origin || defaults.pickupCity;
      defaults.destination = initialEstimates.route || defaults.destination;
      defaults.passengers = initialEstimates.passengers ? String(initialEstimates.passengers) : defaults.passengers;
      defaults.vehicleModel = initialEstimates.carModel || defaults.vehicleModel;
      defaults.driveMode = initialEstimates.mode || defaults.driveMode;
      defaults.pickupDate = initialEstimates.pickupDate || defaults.pickupDate;
      defaults.pickupTime = initialEstimates.pickupTime || defaults.pickupTime;
      defaults.specialNotes = initialEstimates.specialNotes || defaults.specialNotes;
      defaults.returnDate = initialEstimates.pickupDate
        ? dateAfter(initialEstimates.pickupDate, initialEstimates.days || 3)
        : defaults.returnDate;
    }

    return defaults;
  });

  const [submitted, setSubmitted] = useState(false);
  const [enquiryDraftId, setEnquiryDraftId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnquiryDraftId(`LOCAL-${Math.floor(1000 + Math.random() * 9000)}`);
    setSubmitted(true);
  };

  const closeModal = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="booking-backdrop fixed inset-0 z-[70] flex items-center justify-center bg-forest-950/85 p-3 backdrop-blur-md sm:p-5" role="dialog" aria-modal="true" aria-labelledby="booking-dialog-title">
      <div className="booking-panel relative max-h-[92vh] w-full max-w-2xl overflow-y-auto border border-cream-100/15 bg-forest-950 p-5 shadow-2xl sm:p-8">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={closeModal}
          aria-label="Close enquiry form"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center border border-cream-100/20 text-cream-100/70 transition-colors hover:border-lime-accent hover:text-lime-accent"
        >
          <X className="h-4 w-4" />
        </button>

        {!submitted ? (
          <div>
            {/* MODAL HEADER */}
            <div className="mb-6 space-y-1">
              <div className="inline-flex items-center gap-1.5 text-lime-accent">
                <Car className="h-3.5 w-3.5" />
                <span className="eyebrow">A journey enquiry</span>
              </div>

              <h3 id="booking-dialog-title" className="mt-2 font-serif text-3xl font-medium text-cream-100 sm:text-4xl">
                Tell us about the journey.
              </h3>
              <p className="mt-2 max-w-lg text-xs leading-5 text-cream-100/60">
                This is a local demo form. Submitting prepares a draft on this page only; it does not send your details or confirm a rental.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="enquiry-name" className="mb-1 block text-xs font-medium text-cream-100/70">Full name *</label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-lime-accent" />
                    <input
                      id="enquiry-name"
                      type="text"
                      required
                      minLength={2}
                      autoComplete="name"
                      placeholder="Your name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="travel-control pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="enquiry-phone" className="mb-1 block text-xs font-medium text-cream-100/70">Phone number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-lime-accent" />
                    <input
                      id="enquiry-phone"
                      type="tel"
                      required
                      minLength={7}
                      maxLength={20}
                      pattern="[0-9+\(\) .\-]{7,20}"
                      autoComplete="tel"
                      placeholder="Include country code if needed"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="travel-control pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* Pickup City & Vehicle Selection */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="enquiry-city" className="mb-1 block text-xs font-medium text-cream-100/70">Pickup city</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-lime-accent" />
                    <select
                      id="enquiry-city"
                      value={formData.pickupCity}
                      onChange={(e) => setFormData({ ...formData, pickupCity: e.target.value })}
                      className="travel-control pl-10"
                    >
                      <option value="Visakhapatnam">Visakhapatnam (Vizag)</option>
                      <option value="Vijayawada">Vijayawada</option>
                      <option value="Tirupati">Tirupati</option>
                      <option value="Rajahmundry">Rajahmundry</option>
                      <option value="Guntur">Guntur</option>
                      <option value="Kakinada">Kakinada</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="enquiry-vehicle" className="mb-1 block text-xs font-medium text-cream-100/70">Vehicle model</label>
                  <div className="relative">
                    <Car className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-lime-accent" />
                    <select
                      id="enquiry-vehicle"
                      value={formData.vehicleModel}
                      onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                      className="travel-control pl-10"
                    >
                      <option value="Toyota Innova Crysta">Toyota Innova Crysta (7-8 Seater MPV)</option>
                      <option value="Toyota Innova Hycross">Toyota Innova Hycross (Hybrid MPV)</option>
                      <option value="Maruti Suzuki Ertiga">Maruti Suzuki Ertiga (7-Seater MPV)</option>
                      <option value="Maruti Suzuki XL6">Maruti Suzuki XL6 (Family MPV)</option>
                      <option value="Mahindra Scorpio-N">Mahindra Scorpio-N (4x4 SUV)</option>
                      <option value="Mahindra XUV700">Mahindra XUV700 (Family SUV)</option>
                      <option value="Tata Nexon">Tata Nexon (Compact SUV)</option>
                      <option value="Maruti Suzuki Dzire">Maruti Suzuki Dzire (Sedan)</option>
                      <option value="Maruti Suzuki Swift">Maruti Suzuki Swift (Hatchback)</option>
                      <option value="Force Urbania">Force Urbania (Group Travel)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="enquiry-destination" className="mb-1 block text-xs font-medium text-cream-100/70">Destination</label>
                  <select
                    id="enquiry-destination"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="travel-control"
                  >
                    <option value="">Choose a destination</option>
                    <option>Araku Valley</option>
                    <option>Visakhapatnam</option>
                    <option>Borra Caves</option>
                    <option>Papikondalu</option>
                    <option>Gandikota</option>
                    <option>Tirupati</option>
                    <option>Rampachodavaram</option>
                    <option>Rajamahendravaram</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="enquiry-passengers" className="mb-1 block text-xs font-medium text-cream-100/70">Passengers</label>
                  <select
                    id="enquiry-passengers"
                    required
                    value={formData.passengers}
                    onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                    className="travel-control"
                  >
                    {Array.from({ length: 17 }, (_, index) => String(index + 1)).map((count) => (
                      <option key={count} value={count}>{count}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="enquiry-pickup-date" className="mb-1 block text-xs font-medium text-cream-100/70">Pickup date</label>
                  <input
                    id="enquiry-pickup-date"
                    type="date"
                    required
                    min={dateOffset()}
                    value={formData.pickupDate}
                    onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value, returnDate: formData.returnDate < e.target.value ? e.target.value : formData.returnDate })}
                    className="travel-control"
                  />
                </div>

                <div>
                  <label htmlFor="enquiry-pickup-time" className="mb-1 block text-xs font-medium text-cream-100/70">Preferred pickup time</label>
                  <input
                    id="enquiry-pickup-time"
                    type="time"
                    required
                    value={formData.pickupTime}
                    onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                    className="travel-control"
                  />
                </div>

                <div>
                  <label htmlFor="enquiry-return-date" className="mb-1 block text-xs font-medium text-cream-100/70">Return date</label>
                  <input
                    id="enquiry-return-date"
                    type="date"
                    required
                    min={formData.pickupDate}
                    value={formData.returnDate}
                    onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                    className="travel-control"
                  />
                </div>
              </div>

              {/* Drive Mode Toggle */}
              <div>
                <span className="field-label">Rental mode</span>
                <div className="grid grid-cols-2 border border-cream-100/15">
                  <button
                    type="button"
                    aria-pressed={formData.driveMode === 'Self Drive'}
                    onClick={() => setFormData({ ...formData, driveMode: 'Self Drive' })}
                    className={`min-h-11 px-3 text-xs transition-colors ${formData.driveMode === 'Self Drive' ? 'bg-lime-accent text-forest-950' : 'text-cream-100/65 hover:text-cream-100'}`}
                  >
                    Self-drive
                  </button>
                  <button
                    type="button"
                    aria-pressed={formData.driveMode === 'With Driver'}
                    onClick={() => setFormData({ ...formData, driveMode: 'With Driver' })}
                    className={`min-h-11 px-3 text-xs transition-colors ${formData.driveMode === 'With Driver' ? 'bg-lime-accent text-forest-950' : 'text-cream-100/65 hover:text-cream-100'}`}
                  >
                    Chauffeur-driven
                  </button>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label htmlFor="enquiry-notes" className="mb-1 block text-xs font-medium text-cream-100/70">Journey notes (optional)</label>
                <textarea
                  id="enquiry-notes"
                  rows="2"
                  placeholder="Share any preferences or questions."
                  value={formData.specialNotes}
                  onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                  className="travel-control min-h-20 resize-y"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-2 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-lime-accent px-5 text-xs font-semibold uppercase tracking-[0.1em] text-forest-950 transition-colors hover:bg-cream-100"
              >
                <span>Prepare enquiry draft</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-center text-[10px] text-cream-100/40">No message is sent and no vehicle is reserved by this demo.</p>
            </form>
          </div>
        ) : (
          /* SUCCESS STATE */
          <div className="space-y-6 py-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center border border-lime-accent/60 text-lime-accent">
              <CheckCircle2 className="h-7 w-7" />
            </div>

            <div>
              <span className="eyebrow text-lime-accent">
                Local draft prepared
              </span>
              <h3 id="booking-dialog-title" className="mt-2 font-serif text-3xl font-medium text-cream-100">
                Your enquiry is ready.
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-cream-100/65">
                This information remains in the current page only. No booking has been made and no one will contact you until a real enquiry service is connected.
              </p>
            </div>

            <div className="space-y-2 border border-cream-100/15 bg-forest-900/50 p-5 text-left text-xs">
              <div className="flex justify-between gap-3 border-b border-cream-100/10 pb-2">
                <span className="text-cream-100/50">Local draft ID</span>
                <span className="font-medium text-lime-accent">{enquiryDraftId} · not sent</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-cream-100/50">Vehicle</span>
                <span className="text-right text-cream-100">{formData.vehicleModel}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-cream-100/50">Journey</span>
                <span className="text-right text-cream-100">{formData.pickupCity}{formData.destination ? ` → ${formData.destination}` : ''}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-cream-100/50">Pickup · dates · passengers</span>
                <span className="text-right text-cream-100">{formData.pickupDate} at {formData.pickupTime} – {formData.returnDate} · {formData.passengers}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={closeModal}
                className="min-h-11 w-full bg-lime-accent px-5 text-xs font-semibold uppercase tracking-[0.1em] text-forest-950 transition-colors hover:bg-cream-100"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
