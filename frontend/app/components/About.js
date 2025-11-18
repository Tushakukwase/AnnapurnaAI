'use client';

import { BookOpen, Leaf, Heart, Sparkles } from 'lucide-react';

export default function About() {
  const principles = [
    {
      icon: <Leaf className="h-12 w-12 text-ayurveda-secondary" />,
      title: "Natural Healing",
      description: "Ayurveda believes in treating the root cause using natural ingredients from nature"
    },
    {
      icon: <Heart className="h-12 w-12 text-red-500" />,
      title: "Holistic Wellness",
      description: "Balance of mind, body, and spirit through personalized dietary recommendations"
    },
    {
      icon: <Sparkles className="h-12 w-12 text-yellow-500" />,
      title: "Ancient Wisdom",
      description: "5000+ years of tested knowledge passed down through generations"
    },
    {
      icon: <BookOpen className="h-12 w-12 text-ayurveda-accent" />,
      title: "Dosha Balance",
      description: "Understanding your unique constitution (Vata, Pitta, Kapha) for optimal health"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-ayurveda-primary mb-4">About Ayurveda</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Ayurveda is the world's oldest holistic healing system, developed over 5,000 years ago in India.
            It's based on the belief that health and wellness depend on a delicate balance between mind, body, and spirit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {principles.map((principle, index) => (
            <div key={index} className="text-center p-6 bg-ayurveda-light rounded-xl card-hover">
              <div className="flex justify-center mb-4">
                {principle.icon}
              </div>
              <h3 className="text-xl font-bold text-ayurveda-primary mb-3">{principle.title}</h3>
              <p className="text-gray-700">{principle.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-ayurveda-primary to-ayurveda-green text-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Start Your Ayurvedic Journey Today</h3>
          <p className="mb-6 text-ayurveda-light">Get personalized food recommendations based on your unique health profile</p>
          <a href="/signup" className="inline-block bg-white text-ayurveda-primary px-8 py-3 rounded-lg font-semibold hover:bg-ayurveda-light transition">
            Create Free Account
          </a>
        </div>
      </div>
    </section>
  );
}
