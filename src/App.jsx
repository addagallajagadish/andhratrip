import React, { useState } from 'react';
import BookingModal from './components/BookingModal';
import DestinationsSection from './components/DestinationsSection';
import FleetSection from './components/FleetSection';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import PopularTrips from './components/PopularTrips';
import Testimonials from './components/Testimonials';
import TripCalculator from './components/TripCalculator';
import WhyChooseUs from './components/WhyChooseUs';

export default function App() {
  const [booking, setBooking] = useState({
    isOpen: false,
    initialCar: null,
    initialEstimates: null,
    formKey: 0
  });

  const openBooking = ({ initialCar = null, initialEstimates = null } = {}) => {
    setBooking((current) => ({
      isOpen: true,
      initialCar,
      initialEstimates,
      formKey: current.formKey + 1
    }));
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-cream-100 text-forest-950">
      <Navbar scrollToSection={scrollToSection} onPlanTrip={() => openBooking()} />
      <main>
        <HeroSection scrollToSection={scrollToSection} />
        <DestinationsSection
          onSelectDestinationForCar={(destination) => openBooking({
            initialEstimates: {
              route: destination.title,
              specialNotes: `I'm interested in visiting ${destination.title}. Please share route and access details.`
            }
          })}
        />
        <PopularTrips
          onPlanTrip={(initialEstimates) => openBooking({ initialEstimates })}
        />
        <TripCalculator
          onBookWithEstimates={(initialEstimates) => openBooking({ initialEstimates })}
        />
        <FleetSection
          onSelectCarForBooking={(car) => openBooking({ initialCar: car })}
        />
        <WhyChooseUs />
        <Testimonials onBookClick={() => openBooking()} />
      </main>
      <Footer scrollToSection={scrollToSection} />
      <BookingModal
        key={booking.formKey}
        isOpen={booking.isOpen}
        onClose={() => setBooking((current) => ({ ...current, isOpen: false }))}
        initialCar={booking.initialCar}
        initialEstimates={booking.initialEstimates}
      />
    </div>
  );
}
