'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Heart } from 'lucide-react';

export default function RemedyOfDay() {
  const [remedy, setRemedy] = useState(null);

  useEffect(() => {
    const fetchRemedy = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const response = await axios.get(`${API_URL}/food/remedy-of-day`);
        setRemedy(response.data);
      } catch (error) {
        console.error('Error fetching remedy:', error);
      }
    };

    fetchRemedy();
  }, []);

  if (!remedy) return null;

  return (
    <section className="py-16 bg-gradient-to-r from-ayurveda-secondary to-ayurveda-green">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={remedy.image}
                alt={remedy.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <div className="flex items-center mb-4">
                <Heart className="h-8 w-8 text-red-500 mr-2" />
                <h2 className="text-3xl font-bold text-ayurveda-primary">Remedy of the Day</h2>
              </div>
              <h3 className="text-2xl font-bold text-ayurveda-green mb-4">{remedy.name}</h3>

              <div className="mb-4">
                <h4 className="font-semibold text-ayurveda-primary mb-2">Benefits:</h4>
                <ul className="space-y-2">
                  {remedy.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-ayurveda-secondary mr-2">✓</span>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-ayurveda-primary mb-2">Preparation:</h4>
                <p className="text-gray-700">{remedy.preparation}</p>
              </div>

              <div>
                <h4 className="font-semibold text-ayurveda-primary mb-2">Key Ingredients:</h4>
                <div className="flex flex-wrap gap-2">
                  {remedy.ingredients.map((ingredient, i) => (
                    <span key={i} className="bg-ayurveda-beige text-ayurveda-brown px-3 py-1 rounded-full text-sm">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
