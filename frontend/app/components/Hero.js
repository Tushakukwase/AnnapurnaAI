'use client';

import { Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-ayurveda-primary via-ayurveda-green to-ayurveda-secondary text-white py-20 ayurveda-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-6">
          <Sparkles className="h-16 w-16 text-ayurveda-beige animate-pulse" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Discover Ancient Foods for Modern Health
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-ayurveda-light max-w-3xl mx-auto">
          Harness 5000 years of Ayurvedic wisdom to find personalized food remedies for your health needs
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/signup" className="bg-ayurveda-accent hover:bg-ayurveda-brown text-white px-8 py-3 rounded-lg text-lg font-semibold transition">
            Get Started
          </a>
          <a href="/remedies" className="bg-white hover:bg-ayurveda-light text-ayurveda-primary px-8 py-3 rounded-lg text-lg font-semibold transition">
            Explore Remedies
          </a>
        </div>
      </div>
    </div>
  );
}
