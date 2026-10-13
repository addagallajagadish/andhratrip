import React from 'react';
import { ArrowRight, MapPin, MessageCircle } from 'lucide-react';

export default function Testimonials({ onBookClick }) {
  const configuredNumber = import.meta.env.VITE_WHATSAPP_NUMBER?.replace(/\D/g, '');
  const whatsappNumber = configuredNumber?.length >= 8 && configuredNumber.length <= 15
    ? configuredNumber
    : null;
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello AndhraTrip, I'd like to ask about a trip.")}`
    : null;

  return (
    <section id="contact" className="relative isolate overflow-hidden bg-[#0C2D22] text-cream-100">
      <div className="absolute inset-y-0 right-0 -z-10 hidden w-[42%] bg-[url('/assets/forest-road-fallback.jpg')] bg-cover bg-[center_54%] opacity-35 lg:block" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0C2D22] via-[#0C2D22]/95 to-[#0C2D22]/45" aria-hidden="true" />
      <div className="contact-content editorial-wrap py-20 sm:py-28 lg:py-36">
        <p className="eyebrow text-lime-accent">Let the road open up</p>
        <h2 className="mt-5 max-w-4xl font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[0.96] tracking-[-0.05em]">
          Your next great journey begins here.
        </h2>
        <p className="mt-6 max-w-lg text-sm leading-7 text-cream-100/65 sm:text-base">
          Share a few details about the trip you have in mind. This demo prepares an enquiry locally; no booking or message is sent.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button onClick={onBookClick} className="inline-flex min-h-12 items-center gap-4 bg-lime-accent px-6 text-xs font-semibold uppercase tracking-[0.1em] text-forest-950 transition-colors duration-300 hover:bg-cream-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-accent">
            Booking enquiry
            <ArrowRight className="h-4 w-4" />
          </button>
          {whatsappUrl ? (
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-3 border border-cream-100/35 px-5 text-xs font-semibold uppercase tracking-[0.1em] text-cream-100 transition-colors hover:border-lime-accent hover:text-lime-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-accent">
              <MessageCircle className="h-4 w-4" />
              WhatsApp booking
            </a>
          ) : (
            <p className="flex min-h-12 max-w-sm items-center gap-3 border border-cream-100/20 px-4 text-xs leading-5 text-cream-100/60">
              <MessageCircle className="h-4 w-4 shrink-0 text-lime-accent" />
              WhatsApp booking can be enabled when a verified business number is configured.
            </p>
          )}
        </div>
        <div className="mt-14 flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-cream-100/45">
          <MapPin className="h-3.5 w-3.5 text-lime-accent" />
          Andhra Pradesh, India
        </div>
      </div>
    </section>
  );
}
