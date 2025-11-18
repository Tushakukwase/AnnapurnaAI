'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { ArrowLeft } from 'lucide-react';

export default function AddFood() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Beverage',
    diseases: '',
    benefits: '',
    ingredients: '',
    preparation: '',
    image: '',
    featured: false,
    rasa: '',
    guna: '',
    virya: 'hot',
    vipaka: 'sweet'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

      const foodData = {
        name: formData.name,
        category: formData.category,
        diseases: formData.diseases.split(',').map(d => d.trim().toLowerCase()),
        benefits: formData.benefits.split(',').map(b => b.trim()),
        ingredients: formData.ingredients.split(',').map(i => i.trim()),
        preparation: formData.preparation,
        image: formData.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        featured: formData.featured,
        ayurvedicProperties: {
          rasa: formData.rasa.split(',').map(r => r.trim().toLowerCase()),
          guna: formData.guna.split(',').map(g => g.trim().toLowerCase()),
          virya: formData.virya,
          vipaka: formData.vipaka
        }
      };

      await axios.post(`${API_URL}/food/add`, foodData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Food added successfully!');
      router.push('/admin');
    } catch (error) {
      alert('Error adding food: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ayurveda-light">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => router.push('/admin')}
          className="flex items-center space-x-2 text-ayurveda-primary mb-6 hover:text-ayurveda-green"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Admin Panel</span>
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-ayurveda-primary mb-6">Add New Food</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-ayurveda-primary mb-2">
                  Food Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayurveda-secondary"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ayurveda-primary mb-2">
                  Category *
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayurveda-secondary"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="Beverage">Beverage</option>
                  <option value="Sweet">Sweet</option>
                  <option value="Main Dish">Main Dish</option>
                  <option value="Herbal Supplement">Herbal Supplement</option>
                  <option value="Herbal Ghee">Herbal Ghee</option>
                  <option value="Preserve">Preserve</option>
                  <option value="Herbal Jam">Herbal Jam</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ayurveda-primary mb-2">
                Diseases (comma separated) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., cold, cough, fever"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayurveda-secondary"
                value={formData.diseases}
                onChange={(e) => setFormData({...formData, diseases: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ayurveda-primary mb-2">
                Benefits (comma separated) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Boosts immunity, Improves digestion"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayurveda-secondary"
                value={formData.benefits}
                onChange={(e) => setFormData({...formData, benefits: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ayurveda-primary mb-2">
                Ingredients (comma separated) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Ginger, Honey, Water"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayurveda-secondary"
                value={formData.ingredients}
                onChange={(e) => setFormData({...formData, ingredients: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ayurveda-primary mb-2">
                Preparation Method *
              </label>
              <textarea
                required
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayurveda-secondary"
                value={formData.preparation}
                onChange={(e) => setFormData({...formData, preparation: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ayurveda-primary mb-2">
                Image URL
              </label>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayurveda-secondary"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-ayurveda-primary mb-2">
                  Rasa (Taste) - comma separated *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., sweet, bitter, pungent"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayurveda-secondary"
                  value={formData.rasa}
                  onChange={(e) => setFormData({...formData, rasa: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ayurveda-primary mb-2">
                  Guna (Quality) - comma separated *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., light, dry, heavy"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayurveda-secondary"
                  value={formData.guna}
                  onChange={(e) => setFormData({...formData, guna: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-ayurveda-primary mb-2">
                  Virya (Potency) *
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayurveda-secondary"
                  value={formData.virya}
                  onChange={(e) => setFormData({...formData, virya: e.target.value})}
                >
                  <option value="hot">Hot</option>
                  <option value="cold">Cold</option>
                  <option value="neutral">Neutral</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-ayurveda-primary mb-2">
                  Vipaka (Post-digestive effect) *
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayurveda-secondary"
                  value={formData.vipaka}
                  onChange={(e) => setFormData({...formData, vipaka: e.target.value})}
                >
                  <option value="sweet">Sweet</option>
                  <option value="sour">Sour</option>
                  <option value="pungent">Pungent</option>
                </select>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                className="h-4 w-4 text-ayurveda-primary focus:ring-ayurveda-secondary border-gray-300 rounded"
                checked={formData.featured}
                onChange={(e) => setFormData({...formData, featured: e.target.checked})}
              />
              <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                Featured Item
              </label>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-ayurveda-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-ayurveda-green disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Add Food'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/admin')}
                className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
