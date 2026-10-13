import React from 'react';
import { ArrowDown, ArrowRight, MapPin } from 'lucide-react';

export default function HeroSection({ scrollToSection }) {
  return (
    <section id="hero" className="hero-section relative flex min-h-[92vh] items-end overflow-hidden bg-forest-950 pt-28 text-cream-100 sm:min-h-screen">
      <video
        className="absolute inset-0 h-full w-full object-cover object-center"
        src="/forest-road-trip.mp4"
        poster="/assets/cars/hero-forest-suv.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="Forest road trip through Andhra Pradesh"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-950/90 via-forest-950/55 to-forest-950/10" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-forest-950/20" aria-hidden="true" />

      <div className="hero-content editorial-wrap relative z-10 px-5 pb-16 sm:px-8 sm:pb-24">
        <div className="max-w-3xl">
          <p className="eyebrow flex items-center gap-2 text-lime-accent">
            <MapPin className="h-3.5 w-3.5" />
            Andhra Pradesh, India
          </p>
          <h1 className="mt-6 max-w-3xl font-serif text-[clamp(3.5rem,10vw,8.5rem)] leading-[0.88] tracking-[-0.055em]">
            Take the road <span className="text-lime-accent">less hurried.</span>
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-7 text-cream-100/75 sm:text-base">
            Find a vehicle, discover a route and make space for the places in between. Start planning your Andhra road trip.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => scrollToSection('calculator')}
              className="hero-action hero-action-primary inline-flex min-h-12 items-center gap-3 bg-lime-accent px-5 text-xs font-semibold uppercase tracking-[0.1em] text-forest-950 transition-colors hover:bg-cream-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-accent"
            >
              Plan your trip
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollToSection('destinations')}
              className="hero-action inline-flex min-h-12 items-center gap-3 border border-cream-100/50 px-5 text-xs font-semibold uppercase tracking-[0.1em] text-cream-100 transition-colors hover:border-lime-accent hover:text-lime-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-accent"
            >
              Explore destinations
            </button>
          </div>
        </div>
        <button
          onClick={() => scrollToSection('destinations')}
          className="mt-16 inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-cream-100/65 transition-colors hover:text-lime-accent"
        >
          Scroll to explore
          <ArrowDown className="h-3.5 w-3.5" />
        </button>
      </div>
    </section>
  );
}
