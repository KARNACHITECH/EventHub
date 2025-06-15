import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Copy, 
  Calendar,
  MapPin,
  Users,
  DollarSign,
  QrCode,
  Mail,
  Download,
  X,
  CheckCircle,
  AlertCircle,
  Star,
  BarChart3
} from 'lucide-react';
import { mockEvents } from '../../data/mockData';

const EventManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [showEventDetails, setShowEventDetails] = useState<any>(null);
  const [showAnalytics, setShowAnalytics] = useState<any>(null);
  const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const showMessage = (type: 'success' | 'error', message: string) => {
    setActionMessage({ type, message });
    setTimeout(() => setActionMessage(null), 3000);
  };

  const handleSelectEvent = (eventId: string) => {
    setSelectedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleSelectAll = () => {
    setSelectedEvents(
      selectedEvents.length === filteredEvents.length 
        ? [] 
        : filteredEvents.map(event => event.id)
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} for events:`, selectedEvents);
    
    switch (action) {
      case 'email':
        showMessage('success', `Email sent to ${selectedEvents.length} event organizers`);
        break;
      case 'export':
        showMessage('success', `${selectedEvents.length} events exported successfully`);
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${selectedEvents.length} events?`)) {
          showMessage('success', `${selectedEvents.length} events deleted successfully`);
        }
        break;
    }
    setSelectedEvents([]);
  };

  const handleViewDetails = (event: any) => {
    setShowEventDetails(event);
  };

  const handleEditEvent = (eventId: string) => {
    console.log('Editing event:', eventId);
    showMessage('success', 'Redirecting to edit page...');
    // In a real app, navigate to edit page
  };

  const handleViewAnalytics = (event: any) => {
    setShowAnalytics(event);
  };

  const handleDuplicateEvent = (event: any) => {
    console.log('Duplicating event:', event.id);
    showMessage('success', `Event "${event.title}" duplicated successfully`);
  };

  const handleDeleteEvent = (event: any) => {
    if (window.confirm(`Are you sure you want to delete "${event.title}"?`)) {
      console.log('Deleting event:', event.id);
      showMessage('success', `Event "${event.title}" deleted successfully`);
    }
  };

  const handleGenerateQR = (event: any) => {
    console.log('Generating QR codes for event:', event.id);
    showMessage('success', `QR codes generated for "${event.title}"`);
  };

  const handleSendEmail = (event: any) => {
    console.log('Sending email for event:', event.id);
    showMessage('success', `Email sent to attendees of "${event.title}"`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Action Message */}
        {actionMessage && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            actionMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}>
            <div className="flex items-center space-x-2">
              {actionMessage.type === 'success' ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
              <span>{actionMessage.message}</span>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Management</h1>
            <p className="text-gray-600">Create, edit, and manage your events</p>
          </div>
          <Link
            to="/admin/events/create"
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all mt-4 md:mt-0"
          >
            <Plus className="h-5 w-5" />
            <span>Create Event</span>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="live">Live</option>
              <option value="ended">Ended</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
            </button>
          </div>

          {/* Bulk Actions */}
          {selectedEvents.length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-700">
                  {selectedEvents.length} event(s) selected
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleBulkAction('email')}
                    className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Send Email</span>
                  </button>
                  <button
                    onClick={() => handleBulkAction('export')}
                    className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                  >
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                  <button
                    onClick={() => handleBulkAction('delete')}
                    className="flex items-center space-x-1 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Events Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6">
                    <input
                      type="checkbox"
                      checked={selectedEvents.length === filteredEvents.length && filteredEvents.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Event</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Date & Time</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Location</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Tickets</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Revenue</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Status</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event) => (
                  <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <input
                        type="checkbox"
                        checked={selectedEvents.includes(event.id)}
                        onChange={() => handleSelectEvent(event.id)}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-4">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{event.title}</h3>
                          <p className="text-sm text-gray-600">{event.category}</p>
                          {event.featured && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <div>
                          <p className="font-medium">{new Date(event.date).toLocaleDateString()}</p>
                          <p className="text-sm">{event.time}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <div>
                          <p className="font-medium">{event.venue}</p>
                          <p className="text-sm">{event.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{event.soldTickets}</span>
                        <span className="text-gray-500">/ {event.totalCapacity}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${(event.soldTickets / event.totalCapacity) * 100}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-900">
                          ${(event.soldTickets * 150).toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                        event.status === 'live' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetails(event)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEditEvent(event.id)}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                          title="Edit Event"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleViewAnalytics(event)}
                          className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                          title="View Analytics"
                        >
                          <BarChart3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleGenerateQR(event)}
                          className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors"
                          title="Generate QR Codes"
                        >
                          <QrCode className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleSendEmail(event)}
                          className="p-2 text-cyan-600 hover:bg-cyan-100 rounded-lg transition-colors"
                          title="Send Email to Attendees"
                        >
                          <Mail className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDuplicateEvent(event)}
                          className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors"
                          title="Duplicate Event"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete Event"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-600">
            Showing {filteredEvents.length} of {mockEvents.length} events
          </p>
          <div className="flex space-x-2">
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-2 bg-purple-600 text-white rounded-lg">1</button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>

        {/* Event Details Modal */}
        {showEventDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Event Details</h3>
                <button
                  onClick={() => setShowEventDetails(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <img
                    src={showEventDetails.image}
                    alt={showEventDetails.title}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{showEventDetails.title}</h4>
                  <p className="text-gray-600 mb-4">{showEventDetails.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{new Date(showEventDetails.date).toLocaleDateString()} at {showEventDetails.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{showEventDetails.venue}, {showEventDetails.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{showEventDetails.soldTickets} / {showEventDetails.totalCapacity} attendees</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 mb-4">Ticket Types</h5>
                  <div className="space-y-3">
                    {showEventDetails.ticketTypes.map((ticket: any) => (
                      <div key={ticket.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h6 className="font-medium text-gray-900">{ticket.name}</h6>
                          <span className="text-lg font-bold text-purple-600">${ticket.price}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{ticket.description}</p>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Available: {ticket.available}</span>
                          <span>Total: {ticket.total}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h6 className="font-semibold text-gray-900 mb-2">Event Statistics</h6>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Revenue:</span>
                        <span className="font-medium text-gray-900 ml-2">
                          ${(showEventDetails.soldTickets * 150).toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Capacity:</span>
                        <span className="font-medium text-gray-900 ml-2">
                          {Math.round((showEventDetails.soldTickets / showEventDetails.totalCapacity) * 100)}%
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium text-gray-900 ml-2">{showEventDetails.category}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Organizer:</span>
                        <span className="font-medium text-gray-900 ml-2">{showEventDetails.organizer}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => handleEditEvent(showEventDetails.id)}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit Event</span>
                </button>
                <button
                  onClick={() => handleViewAnalytics(showEventDetails)}
                  className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>View Analytics</span>
                </button>
                <button
                  onClick={() => setShowEventDetails(null)}
                  className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <span>Close</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Modal */}
        {showAnalytics && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Event Analytics</h3>
                <button
                  onClick={() => setShowAnalytics(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">{showAnalytics.soldTickets}</p>
                      <p className="text-gray-600">Tickets Sold</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">
                        ${(showAnalytics.soldTickets * 150).toLocaleString()}
                      </p>
                      <p className="text-gray-600">Revenue</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <BarChart3 className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">
                        {Math.round((showAnalytics.soldTickets / showAnalytics.totalCapacity) * 100)}%
                      </p>
                      <p className="text-gray-600">Capacity</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Ticket Sales Breakdown</h4>
                <div className="space-y-4">
                  {showAnalytics.ticketTypes.map((ticket: any) => (
                    <div key={ticket.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{ticket.name}</p>
                        <p className="text-sm text-gray-600">${ticket.price} each</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          {ticket.total - ticket.available} sold
                        </p>
                        <p className="text-sm text-gray-600">
                          ${((ticket.total - ticket.available) * ticket.price).toLocaleString()} revenue
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-200">
                <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Export Report</span>
                </button>
                <button
                  onClick={() => setShowAnalytics(null)}
                  className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <span>Close</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventManagement;