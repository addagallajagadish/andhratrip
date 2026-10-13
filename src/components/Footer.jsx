import React from 'react';

const footerLinks = [
  { id: 'destinations', label: 'Destinations' },
  { id: 'packages', label: 'Road trips' },
  { id: 'calculator', label: 'Trip planner' },
  { id: 'fleet', label: 'Our fleet' },
  { id: 'contact', label: 'Contact' },
];

export default function Footer({ scrollToSection }) {
  return (
    <footer className="border-t border-cream-100/15 bg-forest-950 px-5 py-10 text-cream-100 sm:px-8">
      <div className="editorial-wrap flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <button
            onClick={() => scrollToSection('hero')}
            className="font-serif text-2xl tracking-wide text-lime-accent"
          >
            AndhraTrip
          </button>
          <p className="mt-2 max-w-sm text-xs leading-5 text-cream-100/50">
            Thoughtful road-trip ideas and vehicle enquiries for journeys across Andhra Pradesh.
          </p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-3">
          {footerLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-[10px] uppercase tracking-[0.1em] text-cream-100/55 transition-colors hover:text-lime-accent"
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="editorial-wrap mt-8 border-t border-cream-100/10 pt-5 text-[10px] text-cream-100/35">
        © {new Date().getFullYear()} AndhraTrip. Demo information only; confirm travel and vehicle details before departure.
      </div>
    </footer>
  );
}
