import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, TrendingUp, Star } from 'lucide-react';
import { mockEvents } from '../data/mockData';

const Categories: React.FC = () => {
  const categories = [
    {
      name: 'Technology',
      icon: '💻',
      description: 'Conferences, workshops, and tech meetups',
      color: 'from-blue-500 to-purple-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      events: mockEvents.filter(e => e.category === 'Technology'),
      trending: true
    },
    {
      name: 'Music',
      icon: '🎵',
      description: 'Concerts, festivals, and live performances',
      color: 'from-pink-500 to-red-600',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600',
      events: mockEvents.filter(e => e.category === 'Music'),
      trending: false
    },
    {
      name: 'Art',
      icon: '🎨',
      description: 'Exhibitions, galleries, and creative workshops',
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      events: mockEvents.filter(e => e.category === 'Art'),
      trending: false
    },
    {
      name: 'Business',
      icon: '💼',
      description: 'Networking events, summits, and conferences',
      color: 'from-green-500 to-teal-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      events: mockEvents.filter(e => e.category === 'Business'),
      trending: true
    },
    {
      name: 'Food',
      icon: '🍽️',
      description: 'Food festivals, cooking classes, and tastings',
      color: 'from-orange-500 to-yellow-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      events: mockEvents.filter(e => e.category === 'Food'),
      trending: false
    },
    {
      name: 'Sports',
      icon: '⚽',
      description: 'Sporting events, tournaments, and competitions',
      color: 'from-red-500 to-pink-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      events: [],
      trending: false
    },
    {
      name: 'Education',
      icon: '📚',
      description: 'Workshops, seminars, and learning experiences',
      color: 'from-indigo-500 to-blue-600',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      events: [],
      trending: false
    },
    {
      name: 'Health',
      icon: '🏥',
      description: 'Wellness events, fitness classes, and health talks',
      color: 'from-teal-500 to-green-600',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600',
      events: [],
      trending: false
    }
  ];

  const totalEvents = mockEvents.length;
  const totalAttendees = mockEvents.reduce((sum, event) => sum + event.soldTickets, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Event Categories</h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Explore events by your interests and discover new experiences
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{categories.length}</div>
                <div className="text-gray-300">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{totalEvents}+</div>
                <div className="text-gray-300">Events</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{totalAttendees}+</div>
                <div className="text-gray-300">Attendees</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">25+</div>
                <div className="text-gray-300">Cities</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find events that match your interests and discover new passions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/events?category=${category.name}`}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Trending Badge */}
                {category.trending && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>Trending</span>
                  </div>
                )}

                <div className="p-6">
                  {/* Icon */}
                  <div className={`w-16 h-16 ${category.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-3xl">{category.icon}</span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {category.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{category.events.length} events</span>
                    </div>
                    {category.events.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{category.events.reduce((sum, event) => sum + event.soldTickets, 0)} attendees</span>
                      </div>
                    )}
                  </div>

                  {/* Popular Events Preview */}
                  {category.events.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500 mb-2">Popular events:</p>
                      <div className="space-y-1">
                        {category.events.slice(0, 2).map((event) => (
                          <div key={event.id} className="text-xs text-gray-600 truncate">
                            • {event.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Hover Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trending Categories</h2>
            <p className="text-xl text-gray-600">Most popular event categories this month</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.filter(cat => cat.trending).map((category) => (
              <div key={category.name} className="relative bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">{category.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{category.name}</h3>
                      <p className="text-white/80">{category.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span>{category.events.length} events</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>{category.events.reduce((sum, event) => sum + event.soldTickets, 0)} attendees</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 fill-current" />
                      <span>4.8 rating</span>
                    </div>
                  </div>
                  
                  <Link
                    to={`/events?category=${category.name}`}
                    className="inline-flex items-center space-x-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    <span>Explore {category.name}</span>
                    <Calendar className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Can't Find Your Interest?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We're constantly adding new categories and events. Let us know what you're looking for!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/events"
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse All Events
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-colors"
            >
              Suggest Category
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;