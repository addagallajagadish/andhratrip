import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

const trips = [
  {
    title: 'Highland roads',
    route: 'Visakhapatnam to Araku Valley',
    origin: 'Visakhapatnam',
    destination: 'Araku Valley',
    stops: ['Ananthagiri', 'Borra Caves'],
    description: 'A suggested Eastern Ghats journey through coffee country and limestone caves.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/32/A_bridge_of_the_KK_line_near_Araku_02.jpg/960px-A_bridge_of_the_KK_line_near_Araku_02.jpg',
    imageAlt: 'Rail bridge among the green hills near Araku Valley',
    imageSource: 'https://commons.wikimedia.org/wiki/File:A_bridge_of_the_KK_line_near_Araku_02.jpg'
  },
  {
    title: 'Godavari country',
    route: 'Rajahmundry to Papikondalu',
    origin: 'Rajahmundry',
    destination: 'Papikondalu',
    stops: ['Rajahmundry', 'Godavari river country'],
    description: 'Plan a slower escape to the river bends and green landscapes of Papikondalu.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/67/Papikondalu%2C_Andhra_Pradesh%2C_India.jpg/960px-Papikondalu%2C_Andhra_Pradesh%2C_India.jpg',
    imageAlt: 'Green hills around Papikondalu',
    imageSource: 'https://commons.wikimedia.org/wiki/File:Papikondalu,_Andhra_Pradesh,_India.jpg'
  },
  {
    title: 'Southern trails',
    route: 'Tirupati to Gandikota',
    origin: 'Tirupati',
    destination: 'Gandikota',
    stops: ['Tirupati foothills', 'Gandikota'],
    description: 'Pair a southern Andhra starting point with the open landscape of Pennar gorge.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8e/A_sunset_view_of_Gandikota_canyon_River_Pennar_Andhra_Pradesh_India.jpg/960px-A_sunset_view_of_Gandikota_canyon_River_Pennar_Andhra_Pradesh_India.jpg',
    imageAlt: 'Pennar gorge landscape at Gandikota',
    imageSource: 'https://commons.wikimedia.org/wiki/File:A_sunset_view_of_Gandikota_canyon_River_Pennar_Andhra_Pradesh_India.jpg'
  }
];

export default function PopularTrips({ onPlanTrip }) {
  return (
    <section id="packages" className="section-shell bg-forest-900 text-cream-100">
      <div className="editorial-wrap">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-14 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-lime-accent">Journeys to make your own</p>
            <h2 className="section-title mt-4 max-w-3xl">Popular Andhra road trips.</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-cream-100/65">
            Suggested routes, not fixed itineraries. Add your dates and preferences to start a local enquiry.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {trips.map((trip) => (
            <article key={trip.title} className="trip-card reveal group border border-cream-100/10 bg-forest-950/45">
              <div className="relative aspect-[1.55/1] overflow-hidden bg-forest-950">
                <img
                  src={trip.image}
                  alt={trip.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/75 via-transparent to-transparent" aria-hidden="true" />
                <span className="absolute bottom-4 left-5 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-cream-100">
                  <MapPin className="h-3.5 w-3.5 text-lime-accent" />
                  {trip.route}
                </span>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="font-serif text-2xl">{trip.title}</h3>
                <p className="mt-3 text-sm leading-6 text-cream-100/65">{trip.description}</p>
                <p className="mt-4 text-[10px] leading-5 text-cream-100/45">
                  Suggested stops: {trip.stops.join(' · ')}
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <a href={trip.imageSource} target="_blank" rel="noreferrer" className="text-[9px] text-cream-100/45 transition-colors hover:text-cream-100/75">
                    Image: Wikimedia Commons
                  </a>
                  <button
                    type="button"
                    onClick={() => onPlanTrip?.({
                      origin: trip.origin,
                      route: trip.destination,
                      specialNotes: `${trip.title} suggested route: ${trip.stops.join(', ')}. Please confirm itinerary and access details.`
                    })}
                    className="inline-flex min-h-10 items-center gap-2 border-b border-lime-accent/60 pb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-cream-100 transition-colors hover:text-lime-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-accent"
                  >
                    Enquire about this route
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-7 text-[10px] leading-5 text-cream-100/40">
          Stops are inspiration only. Route access, travel times and any local transport arrangements should be confirmed before travel.
        </p>
      </div>
    </section>
  );
}
