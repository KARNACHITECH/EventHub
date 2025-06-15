import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <button 
              onClick={() => handleNavigation('/')} 
              className="flex items-center space-x-2 text-left"
            >
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                <Ticket className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">EventHub</span>
            </button>
            <p className="text-gray-400">
              Your premier destination for discovering and booking amazing events. 
              Connect with experiences that matter.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <button 
                onClick={() => handleNavigation('/events')} 
                className="block text-gray-400 hover:text-white transition-colors text-left"
              >
                Browse Events
              </button>
              <button 
                onClick={() => handleNavigation('/categories')} 
                className="block text-gray-400 hover:text-white transition-colors text-left"
              >
                Categories
              </button>
              <button 
                onClick={() => handleNavigation('/about')} 
                className="block text-gray-400 hover:text-white transition-colors text-left"
              >
                About Us
              </button>
              <button 
                onClick={() => handleNavigation('/contact')} 
                className="block text-gray-400 hover:text-white transition-colors text-left"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <div className="space-y-2">
              <button 
                onClick={() => handleNavigation('/help')} 
                className="block text-gray-400 hover:text-white transition-colors text-left"
              >
                Help Center
              </button>
              <button 
                onClick={() => handleNavigation('/faq')} 
                className="block text-gray-400 hover:text-white transition-colors text-left"
              >
                FAQ
              </button>
              <button 
                onClick={() => handleNavigation('/privacy')} 
                className="block text-gray-400 hover:text-white transition-colors text-left"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => handleNavigation('/terms')} 
                className="block text-gray-400 hover:text-white transition-colors text-left"
              >
                Terms of Service
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">support@eventhub.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">123 Event Street, City, State 12345</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 EventHub. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <button 
                onClick={() => handleNavigation('/privacy')} 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy
              </button>
              <button 
                onClick={() => handleNavigation('/terms')} 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms
              </button>
              <button 
                onClick={() => handleNavigation('/cookies')} 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cookies
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;