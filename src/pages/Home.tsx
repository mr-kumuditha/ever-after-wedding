import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import OurStory from '../components/sections/OurStory';
import WeddingDetails from '../components/sections/WeddingDetails';
import Schedule from '../components/sections/Schedule';
import MapSection from '../components/sections/MapSection';
import Gallery from '../components/sections/Gallery';
import RSVP from '../components/sections/RSVP';
import GuestBook from '../components/sections/GuestBook';
import Contact from '../components/sections/Contact';

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero id="home" />
      <OurStory id="story" />
      <WeddingDetails id="details" />
      <Schedule id="schedule" />
      <MapSection id="map" />
      <Gallery id="gallery" />
      <RSVP id="rsvp" />
      <GuestBook id="guestbook" />
      <Contact id="contact" />
      <Footer />
    </>
  );
};

export default Home;
