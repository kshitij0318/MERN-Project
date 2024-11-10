import React from 'react';
import HeroSection from '../components/HeroSection';
import About from '../components/About';
import Qualities from '../components/Qualities';
import Menu from '../components/Menu';
import Team from '../components/Team';
import Reservation from '../components/Reservation';
import SearchReservation from '../components/Search';  // Import the SearchReservation component
import ShowAll from '../components/ShowAll';

const Home = () => {
  return (
    <>
      <HeroSection />
      <About />
      <Qualities />
      <Menu />
      <Reservation />
      <ShowAll/>
      <SearchReservation />  
      <Team />
    </>
  );
};

export default Home;
