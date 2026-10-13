import React, { useState } from 'react';
import { ArrowRight, CalendarDays, MapPin, Users } from 'lucide-react';

const routeData = {
  'Araku Valley': { stops: ['Ananthagiri', 'Borra Caves'] },
  Visakhapatnam: { stops: ['Kailasagiri', 'Bheemili coast'] },
  'Borra Caves': { stops: ['Ananthagiri', 'Araku Valley'] },
  Papikondalu: { stops: ['Rajahmundry', 'Godavari river country'] },
  Gandikota: { stops: ['Jammalamadugu', 'Pennar gorge'] },
  Tirupati: { stops: ['Tirupati foothills', 'Tirumala'] }
};

const cityOptions = ['Visakhapatnam', 'Vijayawada', 'Tirupati', 'Rajahmundry', 'Guntur', 'Kakinada'];

function today() {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 10);
}

export default function TripCalculator({ onBookWithEstimates }) {
  const [origin, setOrigin] = useState('Visakhapatnam');
  const [route, setRoute] = useState('Araku Valley');
  const [selectedCarModel, setSelectedCarModel] = useState('Toyota Innova Crysta');
  const [days, setDays] = useState(3);
  const [travelDate, setTravelDate] = useState(today);
  const [travelTime, setTravelTime] = useState('09:00');
  const [passengers, setPassengers] = useState('4');
  const [mode, setMode] = useState('Self Drive');

  const selectedRoute = routeData[route];
  const itinerary = [origin, ...selectedRoute.stops, route];

  const submitEnquiry = () => onBookWithEstimates?.({
    origin,
    route,
    carModel: selectedCarModel,
    days,
    mode,
    pickupDate: travelDate,
    pickupTime: travelTime,
    passengers: Number(passengers)
  });

  return (
    <section id="calculator" className="section-shell bg-[#0C2D22] text-cream-100">
      <div className="editorial-wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <p className="eyebrow text-lime-accent">A considered way there</p>
          <h2 className="section-title mt-4 max-w-xl">A road trip, mapped your way.</h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-cream-100/65">
            Shape a suggested Andhra Pradesh itinerary. Rental availability and pricing are confirmed by enquiry, not estimated here.
          </p>
          <div className="mt-9 border-l border-lime-accent/50 py-1 pl-5">
            <span className="eyebrow text-cream-100/40">Your route, at a glance</span>
            <ol className="mt-4 space-y-0">
              {itinerary.map((stop, index) => (
                <li key={`${stop}-${index}`} className="relative flex gap-4 pb-5 last:pb-0">
                  <span className={`relative z-10 mt-1.5 h-2 w-2 shrink-0 rounded-full border ${index === 0 || index === itinerary.length - 1 ? 'border-lime-accent bg-lime-accent' : 'border-cream-100/30 bg-[#0C2D22]'}`} />
                  <span className={`text-xs ${index === 0 || index === itinerary.length - 1 ? 'text-cream-100' : 'text-cream-100/55'}`}>{stop}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="planner-panel border border-cream-100/15 bg-forest-950/45 p-5 sm:p-7 lg:p-9">
          <div className="mb-7 flex items-center justify-between gap-3 border-b border-cream-100/10 pb-5">
            <div>
              <p className="eyebrow text-lime-accent">Trip planner</p>
              <h3 className="mt-2 font-serif text-2xl">Make room for the unexpected.</h3>
            </div>
            <span className="hidden font-serif text-4xl text-lime-accent/45 sm:block">↗</span>
          </div>

          <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
            <label>
              <span className="field-label"><MapPin className="h-3.5 w-3.5" />Starting city</span>
              <select value={origin} onChange={(event) => setOrigin(event.target.value)} className="travel-control">
                {cityOptions.map((city) => <option key={city}>{city}</option>)}
              </select>
            </label>
            <label>
              <span className="field-label">Destination</span>
              <select value={route} onChange={(event) => setRoute(event.target.value)} className="travel-control">
                {Object.keys(routeData).map((place) => <option key={place}>{place}</option>)}
              </select>
            </label>
            <label>
              <span className="field-label"><CalendarDays className="h-3.5 w-3.5" />Travel date</span>
              <input type="date" min={today()} value={travelDate} onChange={(event) => setTravelDate(event.target.value)} className="travel-control" />
            </label>
            <label>
              <span className="field-label">Preferred pickup time</span>
              <input type="time" value={travelTime} onChange={(event) => setTravelTime(event.target.value)} className="travel-control" />
            </label>
            <label>
              <span className="field-label"><Users className="h-3.5 w-3.5" />Passengers</span>
              <select value={passengers} onChange={(event) => setPassengers(event.target.value)} className="travel-control">
                {Array.from({ length: 17 }, (_, index) => String(index + 1)).map((count) => <option key={count}>{count}</option>)}
              </select>
            </label>
            <label>
              <span className="field-label">Vehicle model</span>
              <select value={selectedCarModel} onChange={(event) => setSelectedCarModel(event.target.value)} className="travel-control">
                {['Maruti Suzuki Ertiga', 'Toyota Innova Crysta', 'Toyota Innova Hycross', 'Mahindra Scorpio-N', 'Mahindra XUV700', 'Tata Nexon', 'Maruti Suzuki Dzire', 'Maruti Suzuki Swift', 'Force Urbania', 'Maruti Suzuki XL6'].map((model) => <option key={model}>{model}</option>)}
              </select>
            </label>
            <label>
              <span className="field-label">Trip length (days)</span>
              <input type="number" min="1" max="14" value={days} onChange={(event) => setDays(Math.min(14, Math.max(1, Number.parseInt(event.target.value, 10) || 1)))} className="travel-control" />
            </label>
          </div>

          <fieldset className="mt-5">
            <legend className="field-label mb-2">Rental mode</legend>
            <div className="grid grid-cols-2 border border-cream-100/15">
              {['Self Drive', 'With Driver'].map((option) => (
                <button key={option} type="button" aria-pressed={mode === option} onClick={() => setMode(option)} className={`min-h-11 px-3 text-xs transition-colors ${mode === option ? 'bg-lime-accent text-forest-950' : 'text-cream-100/65 hover:text-cream-100'}`}>
                  {option === 'With Driver' ? 'Chauffeur-driven' : 'Self-drive'}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-6 border-y border-cream-100/10 py-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-cream-100/65">Rental pricing</span>
              <span className="font-serif text-xl text-lime-accent">Quote on enquiry</span>
            </div>
            <p className="mt-4 text-[10px] leading-5 text-cream-100/40">
              This route is a starting point for planning, not a live navigation or travel-time estimate. Vehicle availability, transmission and rental price have not been confirmed.
            </p>
          </div>

          <button onClick={submitEnquiry} className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-3 bg-lime-accent px-5 text-xs font-semibold text-forest-950 transition-colors hover:bg-cream-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-accent">
            Prepare an enquiry
            <ArrowRight className="h-4 w-4" />
          </button>
          <p className="mt-3 text-center text-[10px] text-cream-100/40">Enquiry details stay in this demo; nothing is sent to a booking service.</p>
        </div>
      </div>
    </section>
  );
}
