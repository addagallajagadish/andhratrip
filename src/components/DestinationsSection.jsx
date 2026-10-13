import React, { useState } from 'react';
import { ArrowRight, MapPin, X } from 'lucide-react';

const destinations = [
  {
    id: 'araku',
    title: 'Araku Valley',
    location: 'Alluri Sitharama Raju district',
    description: 'A winding ascent into coffee country, forested slopes and cool highland air.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/32/A_bridge_of_the_KK_line_near_Araku_02.jpg/960px-A_bridge_of_the_KK_line_near_Araku_02.jpg',
    credit: 'Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:A_bridge_of_the_KK_line_near_Araku_02.jpg'
  },
  {
    id: 'vizag',
    title: 'Visakhapatnam',
    location: 'Bay of Bengal coast',
    description: 'A meeting of sea breeze, city life and a long, light-filled coastline.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a5/Rushikonda_beach_view_001.jpg/960px-Rushikonda_beach_view_001.jpg',
    credit: 'Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:Rushikonda_beach_view_001.jpg'
  },
  {
    id: 'borra',
    title: 'Borra Caves',
    location: 'Ananthagiri hills',
    description: 'A dramatic detour through the Eastern Ghats to limestone caverns and shaded trails.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d9/Borra_caves_1.jpg/960px-Borra_caves_1.jpg',
    credit: 'Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:Borra_caves_1.jpg'
  },
  {
    id: 'papikondalu',
    title: 'Papikondalu',
    location: 'Godavari river country',
    description: 'River bends frame a slower journey through green hills and quiet waterfronts.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/67/Papikondalu%2C_Andhra_Pradesh%2C_India.jpg/960px-Papikondalu%2C_Andhra_Pradesh%2C_India.jpg',
    credit: 'Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:Papikondalu,_Andhra_Pradesh,_India.jpg'
  },
  {
    id: 'gandikota',
    title: 'Gandikota',
    location: 'Pennar river gorge',
    description: 'Red rock, old fort walls and a wide-open view over the Pennar canyon.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8e/A_sunset_view_of_Gandikota_canyon_River_Pennar_Andhra_Pradesh_India.jpg/960px-A_sunset_view_of_Gandikota_canyon_River_Pennar_Andhra_Pradesh_India.jpg',
    credit: 'Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:A_sunset_view_of_Gandikota_canyon_River_Pennar_Andhra_Pradesh_India.jpg'
  },
  {
    id: 'tirupati',
    title: 'Tirupati',
    location: 'Tirumala foothills',
    description: 'A hillside pilgrimage route shaped by forested bends and an enduring sense of arrival.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/Tirumala_090615.jpg/960px-Tirumala_090615.jpg',
    credit: 'Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:Tirumala_090615.jpg'
  },
  {
    id: 'rampachodavaram',
    title: 'Rampachodavaram',
    location: 'Alluri Sitharama Raju district',
    description: 'A forest-fringed escape through the Eastern Ghats, with quiet waters at Bhupatipalem reservoir.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/Bhupatipalem_reservoir%2C_Rampachodavaram.jpg/960px-Bhupatipalem_reservoir%2C_Rampachodavaram.jpg',
    credit: 'Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:Bhupatipalem_reservoir,_Rampachodavaram.jpg'
  },
  {
    id: 'rajamahendravaram',
    title: 'Rajamahendravaram',
    location: 'Godavari riverfront',
    description: 'A riverside city where the Godavari bridges open onto broad, memorable views.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Pushkara_ghat_rajamahendravaram.jpg/960px-Pushkara_ghat_rajamahendravaram.jpg',
    credit: 'Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:Pushkara_ghat_rajamahendravaram.jpg'
  }
];

export default function DestinationsSection({ onSelectDestinationForCar }) {
  const [selectedDestination, setSelectedDestination] = useState(null);

  const selectForJourney = (destination) => {
    setSelectedDestination(null);
    onSelectDestinationForCar?.({ title: destination.title, id: destination.id });
  };

  return (
    <section id="destinations" className="section-shell bg-cream-100 text-forest-950">
      <div className="editorial-wrap">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-14 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-forest-700">Journeys worth the detour</p>
            <h2 className="section-title mt-4 max-w-3xl text-forest-950">Some roads stay with you forever.</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-forest-950/65">
            Eight ways to see Andhra Pradesh at a different pace. Choose a place and start imagining the drive.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[260px_260px]">
          {destinations.map((destination, index) => (
            <article
              key={destination.id}
              className={`destination-tile reveal group relative isolate min-h-[250px] overflow-hidden bg-forest-900 ${index === 0 ? 'sm:col-span-2 sm:row-span-2 sm:min-h-[520px]' : index === 5 ? 'lg:col-span-2' : ''}`}
            >
              <img
                src={destination.image}
                alt={`${destination.title} landscape`}
                loading={index === 0 ? 'eager' : 'lazy'}
                onError={(event) => {
                  event.currentTarget.style.display = 'none';
                }}
                className={`destination-image absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-500 ${destination.id === 'papikondalu' ? 'destination-image-crop' : 'group-hover:scale-105'}`}
              />
              <div className="destination-overlay absolute inset-0 -z-10 bg-gradient-to-t from-forest-950/95 via-forest-950/25 to-forest-950/10 transition-colors duration-300 group-hover:from-forest-950/90" />
              <div className="destination-copy absolute inset-x-0 bottom-0 p-5 text-cream-100 sm:p-6">
                <span className="destination-location flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.17em] text-lime-accent">
                  <MapPin className="h-3 w-3" />
                  {destination.location}
                </span>
                <h3 className="destination-title mt-2 font-serif text-2xl leading-tight sm:text-3xl">{destination.title}</h3>
                <p className={`destination-description mt-2 max-w-lg text-xs leading-5 text-cream-100/85 sm:text-sm ${index === 0 ? 'max-w-md' : ''}`}>{destination.description}</p>
                <div className="destination-actions mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                  <button onClick={() => setSelectedDestination(destination)} className="destination-action group/explore inline-flex min-h-10 shrink-0 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-cream-100 transition-colors hover:text-lime-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-accent">
                    Explore this place
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/explore:translate-x-1" />
                  </button>
                  <a href={destination.source} target="_blank" rel="noreferrer" className="destination-credit text-[10px] text-cream-100/70 transition-colors hover:text-cream-100">
                    Image: {destination.credit}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedDestination && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-forest-950/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="destination-dialog-title" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedDestination(null); }}>
          <div className="relative w-full max-w-lg border border-cream-100/15 bg-forest-950 p-6 text-cream-100 shadow-2xl sm:p-8">
            <button onClick={() => setSelectedDestination(null)} className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center border border-cream-100/20 text-cream-100/70 transition-colors hover:text-lime-accent" aria-label="Close destination details"><X className="h-4 w-4" /></button>
            <p className="eyebrow text-lime-accent">{selectedDestination.location}</p>
            <h3 id="destination-dialog-title" className="mt-4 font-serif text-3xl">{selectedDestination.title}</h3>
            <p className="mt-4 text-sm leading-7 text-cream-100/70">{selectedDestination.description}</p>
            <p className="mt-4 text-xs leading-5 text-cream-100/45">Travel details and road conditions can change; please confirm local access before travelling.</p>
            <button onClick={() => selectForJourney(selectedDestination)} className="mt-7 inline-flex min-h-11 items-center gap-3 bg-lime-accent px-5 text-xs font-semibold text-forest-950 transition-colors hover:bg-cream-100">
              Plan this journey
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
