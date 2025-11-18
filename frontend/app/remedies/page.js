'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Search, Leaf } from 'lucide-react';

export default function Remedies() {
  const router = useRouter();
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState('all');
  const [selectedFood, setSelectedFood] = useState(null);

  const diseases = ['all', 'diabetes', 'hypertension', 'arthritis', 'cold', 'immunity', 'digestion', 'stress', 'anxiety'];

  useEffect(() => {
    fetchFoods();
  }, []);

  useEffect(() => {
    if (selectedDisease === 'all') {
      setFilteredFoods(foods);
    } else {
      setFilteredFoods(foods.filter(food => food.diseases.includes(selectedDisease)));
    }
  }, [selectedDisease, foods]);

  const fetchFoods = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await axios.get(`${API_URL}/food/all`);
      setFoods(response.data);
      setFilteredFoods(response.data);
    } catch (error) {
      console.error('Error fetching foods:', error);
    }
  };

  return (
    <div className="min-h-screen bg-ayurveda-light">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-ayurveda-primary mb-4">Ayurvedic Food Remedies</h1>
          <p className="text-lg text-gray-700">Discover natural healing through ancient wisdom</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <Search className="h-6 w-6 text-ayurveda-secondary mr-2" />
            <h3 className="text-xl font-bold text-ayurveda-primary">Filter by Condition</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {diseases.map((disease) => (
              <button
                key={disease}
                onClick={() => setSelectedDisease(disease)}
                className={`px-6 py-2 rounded-full font-medium transition ${
                  selectedDisease === disease
                    ? 'bg-ayurveda-primary text-white'
                    : 'bg-ayurveda-beige text-ayurveda-brown hover:bg-ayurveda-accent hover:text-white'
                }`}
              >
                {disease.charAt(0).toUpperCase() + disease.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoods.map((food, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover cursor-pointer" onClick={() => setSelectedFood(food)}>
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
                  <Leaf className="h-5 w-5 text-ayurveda-secondary" />
                </div>
                <p className="text-sm text-ayurveda-accent mb-3">{food.category}</p>
                <div className="mb-4">
                  <p className="text-sm font-semibold text-ayurveda-green mb-2">Good for:</p>
                  <div className="flex flex-wrap gap-2">
                    {food.diseases.slice(0, 4).map((disease, i) => (
                      <span key={i} className="bg-ayurveda-beige text-ayurveda-brown text-xs px-3 py-1 rounded-full">
                        {disease}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600">Click to view full details</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedFood && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedFood(null)}>
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="h-64 overflow-hidden">
              <img
                src={selectedFood.image}
                alt={selectedFood.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-bold text-ayurveda-primary mb-4">{selectedFood.name}</h2>
              <p className="text-ayurveda-accent mb-6">{selectedFood.category}</p>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-ayurveda-green mb-3">Health Benefits</h3>
                <ul className="space-y-2">
                  {selectedFood.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-ayurveda-secondary mr-2">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-ayurveda-green mb-3">Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedFood.ingredients.map((ingredient, i) => (
                    <span key={i} className="bg-ayurveda-light text-ayurveda-brown px-4 py-2 rounded-lg">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-ayurveda-green mb-3">Preparation</h3>
                <p className="text-gray-700 bg-ayurveda-light p-4 rounded-lg">{selectedFood.preparation}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-ayurveda-green mb-3">Ayurvedic Properties</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-ayurveda-light p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Rasa (Taste)</p>
                    <p className="font-semibold text-ayurveda-primary">{selectedFood.ayurvedicProperties.rasa.join(', ')}</p>
                  </div>
                  <div className="bg-ayurveda-light p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Virya (Energy)</p>
                    <p className="font-semibold text-ayurveda-primary">{selectedFood.ayurvedicProperties.virya}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedFood(null)}
                className="w-full bg-ayurveda-primary text-white py-3 rounded-lg hover:bg-ayurveda-green transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
