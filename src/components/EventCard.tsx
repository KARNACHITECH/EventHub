import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Tag } from 'lucide-react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  variant?: 'default' | 'featured';
}

const EventCard: React.FC<EventCardProps> = ({ event, variant = 'default' }) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    return new Date(`2024-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const lowestPrice = Math.min(...event.ticketTypes.map(t => t.price));
  const availabilityPercentage = ((event.totalCapacity - event.soldTickets) / event.totalCapacity) * 100;

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
      variant === 'featured' ? 'ring-2 ring-yellow-400' : ''
    }`}>
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 left-4 flex space-x-2">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
            {event.category}
          </span>
          {variant === 'featured' && (
            <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
              Featured
            </span>
          )}
        </div>
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg text-center">
            <div className="text-sm font-bold text-gray-900">
              {formatDate(event.date).split(' ')[1]}
            </div>
            <div className="text-xs text-gray-600">
              {formatDate(event.date).split(' ')[0]}
            </div>
          </div>
        </div>
        {availabilityPercentage < 20 && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Almost Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2 flex-1">
            {event.title}
          </h3>
          <div className="ml-4 text-right">
            <div className="text-sm text-gray-500">From</div>
            <div className="text-lg font-bold text-purple-600">${lowestPrice}</div>
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{formatDate(event.date)} at {formatTime(event.time)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{event.venue}, {event.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            <span>{event.soldTickets} / {event.totalCapacity} attendees</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Availability</span>
            <span>{Math.round(availabilityPercentage)}% remaining</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                availabilityPercentage > 50 ? 'bg-green-500' :
                availabilityPercentage > 20 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${availabilityPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Ticket Types Preview */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Available Tickets</span>
            <Tag className="h-4 w-4 text-gray-400" />
          </div>
          <div className="flex flex-wrap gap-2">
            {event.ticketTypes.slice(0, 3).map((ticket) => (
              <span
                key={ticket.id}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
              >
                {ticket.name} - ${ticket.price}
              </span>
            ))}
            {event.ticketTypes.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{event.ticketTypes.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={`/event/${event.id}`}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium text-center block hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          View Details & Book
        </Link>
      </div>
    </div>
  );
};

export default EventCard;