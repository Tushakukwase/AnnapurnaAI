'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Heart, Droplet, Flame, Moon, TrendingUp, Plus } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [todayStats, setTodayStats] = useState({
    weight: '',
    waterIntake: '',
    caloriesConsumed: '',
    sleep: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetchUserData();
    fetchHealthStats();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await axios.get(`${API_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchHealthStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await axios.get(`${API_URL}/health/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleAddStats = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      await axios.post(
        `${API_URL}/health/log`,
        todayStats,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowModal(false);
      fetchHealthStats();
      setTodayStats({ weight: '', waterIntake: '', caloriesConsumed: '', sleep: '' });
    } catch (error) {
      console.error('Error adding stats:', error);
    }
  };

  const calculateHealthScore = () => {
    if (!stats?.today) return 75;
    const { waterIntake = 0, sleep = 0 } = stats.today;
    let score = 50;
    if (waterIntake >= 2000) score += 25;
    if (sleep >= 7) score += 25;
    return Math.min(score, 100);
  };

  if (!user || !stats) {
    return (
      <div className="min-h-screen bg-ayurveda-light">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <p className="text-ayurveda-primary">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const chartData = stats.week.reverse().map((log, index) => ({
    day: `Day ${index + 1}`,
    weight: log.weight || 0,
    calories: log.caloriesConsumed || 0
  }));

  return (
    <div className="min-h-screen bg-ayurveda-light">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ayurveda-primary">Welcome, {user.name}!</h1>
          <p className="text-gray-600">Track your wellness journey with Ayurvedic insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Health Score</p>
                <p className="text-3xl font-bold">{calculateHealthScore()}</p>
              </div>
              <Heart className="h-12 w-12 text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Water Intake</p>
                <p className="text-3xl font-bold">{stats.today?.waterIntake || 0}ml</p>
              </div>
              <Droplet className="h-12 w-12 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Calories</p>
                <p className="text-3xl font-bold">{stats.today?.caloriesConsumed || 0}</p>
              </div>
              <Flame className="h-12 w-12 text-orange-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Sleep</p>
                <p className="text-3xl font-bold">{stats.today?.sleep || 0}h</p>
              </div>
              <Moon className="h-12 w-12 text-purple-200" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-ayurveda-primary mb-4">Weight Trend (7 Days)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="weight" stroke="#2D5016" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-ayurveda-primary mb-4">Calorie Trend (7 Days)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="calories" stroke="#6B8E23" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-ayurveda-primary">Your Health Profile</h3>
            <button
              onClick={() => setShowModal(true)}
              className="bg-ayurveda-primary text-white px-6 py-2 rounded-lg flex items-center hover:bg-ayurveda-green transition"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Today's Stats
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-ayurveda-light p-4 rounded-lg">
              <p className="text-sm text-gray-600">Height</p>
              <p className="text-xl font-bold text-ayurveda-primary">{user.height} cm</p>
            </div>
            <div className="bg-ayurveda-light p-4 rounded-lg">
              <p className="text-sm text-gray-600">Weight</p>
              <p className="text-xl font-bold text-ayurveda-primary">{user.weight} kg</p>
            </div>
            <div className="bg-ayurveda-light p-4 rounded-lg">
              <p className="text-sm text-gray-600">BMI</p>
              <p className="text-xl font-bold text-ayurveda-primary">
                {(user.weight / ((user.height / 100) ** 2)).toFixed(1)}
              </p>
            </div>
            <div className="bg-ayurveda-light p-4 rounded-lg">
              <p className="text-sm text-gray-600">Activity</p>
              <p className="text-xl font-bold text-ayurveda-primary capitalize">{user.activityLevel}</p>
            </div>
          </div>
          {user.diseases && user.diseases.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Health Conditions:</p>
              <div className="flex flex-wrap gap-2">
                {user.diseases.map((disease, index) => (
                  <span key={index} className="bg-ayurveda-secondary text-white px-3 py-1 rounded-full text-sm">
                    {disease}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-ayurveda-primary mb-6">Add Today's Stats</h3>
            <form onSubmit={handleAddStats} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ayurveda-primary mb-2">Weight (kg)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={todayStats.weight}
                  onChange={(e) => setTodayStats({...todayStats, weight: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ayurveda-primary mb-2">Water Intake (ml)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={todayStats.waterIntake}
                  onChange={(e) => setTodayStats({...todayStats, waterIntake: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ayurveda-primary mb-2">Calories</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={todayStats.caloriesConsumed}
                  onChange={(e) => setTodayStats({...todayStats, caloriesConsumed: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ayurveda-primary mb-2">Sleep (hours)</label>
                <input
                  type="number"
                  step="0.5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={todayStats.sleep}
                  onChange={(e) => setTodayStats({...todayStats, sleep: e.target.value})}
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-ayurveda-primary text-white py-2 rounded-lg hover:bg-ayurveda-green transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
