import React, { useState } from 'react';
import { ArrowRight, Users } from 'lucide-react';

const vehicles = [
  { id: 'ertiga', name: 'Maruti Suzuki Ertiga', image: 'ertiga.jpg', category: 'Family MPV', seats: 'Up to 7 seats' },
  { id: 'innova-crysta', name: 'Toyota Innova Crysta', image: 'innova-crysta.jpg', category: 'Family MPV', seats: '7 or 8 seats, by trim' },
  { id: 'innova-hycross', name: 'Toyota Innova Hycross', image: 'innova-hycross.jpg', category: 'Hybrid MPV', seats: '7 or 8 seats, by trim' },
  { id: 'scorpio-n', name: 'Mahindra Scorpio-N', image: 'scorpio-n.jpg', category: 'SUV', seats: '6 or 7 seats, by trim' },
  { id: 'xuv700', name: 'Mahindra XUV700', image: 'xuv700.jpg', category: 'SUV', seats: '5 or 7 seats, by trim' },
  { id: 'nexon', name: 'Tata Nexon', image: 'nexon.jpg', category: 'Compact SUV', seats: 'Up to 5 seats' },
  { id: 'dzire', name: 'Maruti Suzuki Dzire', image: 'dzire.jpg', category: 'Sedan', seats: 'Up to 5 seats' },
  { id: 'swift', name: 'Maruti Suzuki Swift', image: 'swift.jpg', category: 'Hatchback', seats: 'Up to 5 seats' },
  { id: 'urbania', name: 'Force Urbania', image: 'urbania.jpg', category: 'Group travel', seats: 'Multiple seating layouts' },
  { id: 'xl6', name: 'Maruti Suzuki XL6', image: 'xl6.jpg', category: 'Family MPV', seats: '6 seats' }
];

const filters = ['All', 'Family MPV', 'SUV', 'Compact SUV', 'Sedan', 'Hatchback', 'Group travel', 'Hybrid MPV'];

export default function FleetSection({ onSelectCarForBooking }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const visibleVehicles = activeFilter === 'All'
    ? vehicles
    : vehicles.filter((vehicle) => vehicle.category === activeFilter);

  return (
    <section id="fleet" className="section-shell bg-forest-950 text-cream-100">
      <div className="editorial-wrap">
        <div className="mb-10 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-lime-accent">The AndhraTrip collection</p>
            <h2 className="section-title mt-4 max-w-3xl">Your journey. Your kind of ride.</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-cream-100/60">
            Choose the shape of your journey. Vehicle photos are model references; exact trim and rental details are confirmed by enquiry.
          </p>
        </div>

        <div className="mb-7 flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Filter vehicles">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
              className={`shrink-0 border px-3.5 py-2 text-[10px] font-medium transition-colors duration-200 sm:px-4 ${activeFilter === filter ? 'border-lime-accent bg-lime-accent text-forest-950' : 'border-cream-100/15 text-cream-100/65 hover:border-cream-100/50 hover:text-cream-100'}`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {visibleVehicles.map((vehicle, index) => (
            <article key={vehicle.id} className="fleet-card reveal group min-w-0">
              <div className="relative flex aspect-[1.55/1] items-end overflow-hidden bg-forest-900">
                <img
                  src={`/assets/cars/${vehicle.image}`}
                  alt={`${vehicle.name} vehicle`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/10 to-transparent" aria-hidden="true" />
                <span className="absolute right-5 top-5 z-10 font-serif text-5xl text-cream-100/70 sm:text-6xl">{String(index + 1).padStart(2, '0')}</span>
                <div className="relative z-10 p-5 sm:p-6">
                  <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-lime-accent">AndhraTrip · vehicle collection</span>
                  <p className="mt-2 max-w-[230px] font-serif text-xl leading-tight text-cream-100 sm:text-2xl">{vehicle.name}</p>
                </div>
              </div>
              <div className="border-b border-cream-100/15 pb-4 pt-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-lime-accent">{vehicle.category}</p>
                    <h3 className="mt-1 font-serif text-xl leading-snug text-cream-100 sm:text-2xl">{vehicle.name}</h3>
                    <p className="mt-2 flex items-center gap-2 text-xs text-cream-100/65">
                      <Users className="h-3.5 w-3.5 text-lime-accent/80" />
                      {vehicle.seats}
                    </p>
                    <p className="mt-2 text-[10px] text-cream-100/45">Transmission and pricing by enquiry</p>
                  </div>
                  <button
                    onClick={() => onSelectCarForBooking?.({ id: vehicle.id, name: vehicle.name, category: vehicle.category, seats: vehicle.seats })}
                    className="mt-2 inline-flex h-10 w-10 shrink-0 items-center justify-center border border-cream-100/25 text-cream-100 transition-colors hover:border-lime-accent hover:bg-lime-accent hover:text-forest-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-accent"
                    aria-label={`Enquire about ${vehicle.name}`}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 text-[10px] leading-5 text-cream-100/40">
          Seating depends on the vehicle configuration supplied. Transmission, availability and rental pricing are confirmed for each enquiry.
        </p>
      </div>
    </section>
  );
}
