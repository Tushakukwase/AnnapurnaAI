'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Star } from 'lucide-react';

export default function FeaturedFoods() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const response = await axios.get(`${API_URL}/food/featured`);
        setFoods(response.data);
      } catch (error) {
        console.error('Error fetching foods:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  if (loading) {
    return (
      <div className="py-16 bg-ayurveda-light">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-ayurveda-primary">Loading featured foods...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-ayurveda-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-ayurveda-primary mb-4">Featured Ayurvedic Foods</h2>
          <p className="text-lg text-ayurveda-green">Time-tested remedies for holistic wellness</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {foods.map((food, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
              <div className="h-48 overflow-hidden">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-ayurveda-primary">{food.name}</h3>
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                </div>
                <p className="text-sm text-ayurveda-accent mb-3">{food.category}</p>
                <div className="mb-4">
                  <p className="text-sm font-semibold text-ayurveda-green mb-2">Benefits:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {food.benefits.slice(0, 3).map((benefit, i) => (
                      <li key={i}>• {benefit}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2">
                  {food.diseases.slice(0, 3).map((disease, i) => (
                    <span key={i} className="bg-ayurveda-beige text-ayurveda-brown text-xs px-3 py-1 rounded-full">
                      {disease}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
