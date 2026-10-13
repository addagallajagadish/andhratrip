import React, { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

const navLinks = [
  { id: 'destinations', label: 'Destinations' },
  { id: 'packages', label: 'Road trips' },
  { id: 'calculator', label: 'Trip planner' },
  { id: 'fleet', label: 'Our fleet' },
];

export default function Navbar({ scrollToSection, onPlanTrip }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-cream-100/10 bg-forest-950/85 py-3.5 text-cream-100 shadow-lg backdrop-blur-xl">
      <div className="editorial-wrap flex items-center justify-between gap-4 px-5 sm:px-8">
        <button
          onClick={() => scrollToSection('hero')}
          className="group flex items-center gap-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-accent"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-lime-accent/60 font-serif text-lg text-lime-accent">
            A
          </span>
          <span className="flex flex-col">
            <span className="font-serif text-lg leading-none tracking-wide group-hover:text-lime-accent">AndhraTrip</span>
            <span className="mt-1 text-[9px] uppercase tracking-[0.2em] text-cream-100/55">Roads worth taking</span>
          </span>
        </button>

        <nav aria-label="Main navigation" className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="site-nav-link inline-flex min-h-11 items-center px-3 text-[11px] font-medium uppercase tracking-[0.1em] text-cream-100/75 transition-colors hover:text-lime-accent"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button
          onClick={onPlanTrip}
          className="hidden min-h-11 items-center gap-2 bg-lime-accent px-5 text-[11px] font-semibold uppercase tracking-[0.1em] text-forest-950 transition-colors hover:bg-cream-100 lg:inline-flex"
        >
          Plan a journey
          <ArrowRight className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-cream-100/25 text-cream-100 transition-colors hover:border-lime-accent hover:text-lime-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-accent lg:hidden"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav aria-label="Mobile navigation" className="editorial-wrap mt-3 flex flex-col gap-1 px-5 pb-3 sm:px-8 lg:hidden">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                scrollToSection(link.id);
                setMobileMenuOpen(false);
              }}
              className="min-h-11 border-b border-cream-100/10 py-3 text-left text-xs font-medium uppercase tracking-[0.12em] text-cream-100/80 transition-colors hover:text-lime-accent"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              onPlanTrip();
              setMobileMenuOpen(false);
            }}
            className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 bg-lime-accent px-4 text-xs font-semibold uppercase tracking-[0.12em] text-forest-950"
          >
            Plan a journey
            <ArrowRight className="h-4 w-4" />
          </button>
        </nav>
      )}
    </header>
  );
}
