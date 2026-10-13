import React from 'react';

const features = [
  { number: '01', title: 'Plans with room to flex', description: 'Choose a self-drive or chauffeur-driven enquiry to suit the shape of your trip.' },
  { number: '02', title: 'Space for the whole family', description: 'Explore a range of Indian-market cars, MPVs and group-travel options.' },
  { number: '03', title: 'Estimates, made transparent', description: 'See the sample assumptions behind the planner instead of a promise of a final fare.' },
  { number: '04', title: 'Pick-up, made convenient', description: 'Choose a starting city and share your preferred pick-up details in an enquiry.' },
  { number: '05', title: 'Inspiration for the in-between', description: 'Find routes from highland roads and river bends to coastal drives.' },
  { number: '06', title: 'A helpful place to start', description: 'Use the enquiry form to note your travel plans; live support is not connected in this demo.' }
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="section-shell bg-cream-100 text-forest-950">
      <div className="editorial-wrap">
        <div className="mb-10 max-w-3xl sm:mb-14">
          <p className="eyebrow text-forest-700">The journey matters</p>
          <h2 className="section-title mt-4">More considered. More your own.</h2>
        </div>

        <div className="grid border-l border-t border-forest-950/15 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.number} className="feature-card reveal border-b border-r border-forest-950/15 p-5 transition-colors duration-300 hover:bg-white/45 sm:p-7 lg:p-8">
              <span className="font-serif text-lg text-forest-700/55">{feature.number}</span>
              <h3 className="mt-5 font-serif text-xl leading-snug sm:text-2xl">{feature.title}</h3>
              <p className="mt-3 max-w-xs text-xs leading-6 text-forest-950/60 sm:text-sm">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
