'use client';

import { Leaf, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-ayurveda-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-8 w-8 text-ayurveda-beige" />
              <span className="text-2xl font-bold text-ayurveda-beige">AnnapurnaAI</span>
            </div>
            <p className="text-ayurveda-light">
              Ancient Ayurvedic wisdom meets modern AI to bring you personalized health and wellness recommendations.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-ayurveda-beige">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-ayurveda-light hover:text-white transition">Home</a></li>
              <li><a href="/dashboard" className="text-ayurveda-light hover:text-white transition">Dashboard</a></li>
              <li><a href="/remedies" className="text-ayurveda-light hover:text-white transition">Remedies</a></li>
              <li><a href="/chatbot" className="text-ayurveda-light hover:text-white transition">AI Chatbot</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-ayurveda-beige">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-ayurveda-light hover:text-white transition">About Ayurveda</a></li>
              <li><a href="#" className="text-ayurveda-light hover:text-white transition">Health Library</a></li>
              <li><a href="#" className="text-ayurveda-light hover:text-white transition">Dosha Quiz</a></li>
              <li><a href="#" className="text-ayurveda-light hover:text-white transition">Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-ayurveda-beige">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-ayurveda-light">
                <Mail className="h-4 w-4 mr-2" />
                info@annapurnai.com
              </li>
              <li className="flex items-center text-ayurveda-light">
                <Phone className="h-4 w-4 mr-2" />
                +91 1800-AYURVEDA
              </li>
              <li className="flex items-center text-ayurveda-light">
                <MapPin className="h-4 w-4 mr-2" />
                Mumbai, India
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ayurveda-green mt-8 pt-8 text-center text-ayurveda-light">
          <p>&copy; 2025 AnnapurnaAI. All rights reserved. Powered by ancient Ayurvedic wisdom.</p>
        </div>
      </div>
    </footer>
  );
}
