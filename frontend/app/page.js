'use client';

import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedFoods from './components/FeaturedFoods';
import RemedyOfDay from './components/RemedyOfDay';
import About from './components/About';
import Footer from './components/Footer';

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedFoods />
      <RemedyOfDay />
      <About />
      <Footer />
    </div>
  );
}
