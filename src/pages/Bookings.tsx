import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Ticket, 
  Download, 
  Mail, 
  QrCode, 
  Star,
  Filter,
  Search,
  Eye,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockEvents } from '../data/mockData';

interface BookingData {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
  eventLocation: string;
  eventImage: string;
  ticketType: string;
  quantity: number;
  totalAmount: number;
  bookingDate: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'attended';
  confirmationCode: string;
  qrCode: string;
}

const Bookings: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(null);

  // Mock booking data
  const bookings: BookingData[] = [
    {
      id: 'BK001',
      eventId: '1',
      eventTitle: 'Tech Conference 2024',
      eventDate: '2024-03-15',
      eventTime: '09:00',
      eventVenue: 'Convention Center',
      eventLocation: 'Downtown City',
      eventImage: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
      ticketType: 'VIP',
      quantity: 2,
      totalAmount: 598,
      bookingDate: '2024-02-15',
      status: 'confirmed',
      confirmationCode: 'TC2024-001',
      qrCode: 'QR123456789'
    },
    {
      id: 'BK002',
      eventId: '2',
      eventTitle: 'Music Festival Summer',
      eventDate: '2024-06-20',
      eventTime: '16:00',
      eventVenue: 'City Park',
      eventLocation: 'Central Park',
      eventImage: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
      ticketType: 'General Admission',
      quantity: 1,
      totalAmount: 79,
      bookingDate: '2024-02-20',
      status: 'confirmed',
      confirmationCode: 'MF2024-002',
      qrCode: 'QR987654321'
    },
    {
      id: 'BK003',
      eventId: '3',
      eventTitle: 'Art Exhibition Opening',
      eventDate: '2024-01-10',
      eventTime: '18:00',
      eventVenue: 'Modern Art Gallery',
      eventLocation: 'Arts District',
      eventImage: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=800',
      ticketType: 'Standard Entry',
      quantity: 2,
      totalAmount: 50,
      bookingDate: '2024-01-05',
      status: 'attended',
      confirmationCode: 'AE2024-003',
      qrCode: 'QR456789123'
    }
  ];

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.confirmationCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'attended':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDownloadTicket = (booking: BookingData) => {
    console.log('Downloading ticket for booking:', booking.id);
    // Implement PDF download logic
  };

  const handleResendEmail = (booking: BookingData) => {
    console.log('Resending email for booking:', booking.id);
    // Implement email resend logic
  };

  const handleViewQR = (booking: BookingData) => {
    setSelectedBooking(booking);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Ticket className="h-24 w-24 text-gray-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Please Login</h1>
          <p className="text-gray-600 mb-8">You need to be logged in to view your bookings.</p>
          <Link
            to="/login"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
          >
            Login Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your event tickets and bookings</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Ticket className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
                <p className="text-gray-600">Total Bookings</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {bookings.filter(b => b.status === 'confirmed').length}
                </p>
                <p className="text-gray-600">Upcoming Events</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {bookings.filter(b => b.status === 'attended').length}
                </p>
                <p className="text-gray-600">Events Attended</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-lg">
                <RefreshCw className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  ${bookings.reduce((sum, b) => sum + b.totalAmount, 0)}
                </p>
                <p className="text-gray-600">Total Spent</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search bookings..."
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
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="attended">Attended</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length > 0 ? (
          <div className="space-y-6">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-48">
                    <img
                      src={booking.eventImage}
                      alt={booking.eventTitle}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{booking.eventTitle}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>{new Date(booking.eventDate).toLocaleDateString()} at {booking.eventTime}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>{booking.eventVenue}, {booking.eventLocation}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Ticket className="h-4 w-4 mr-2" />
                            <span>{booking.ticketType} × {booking.quantity}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Confirmation Code</p>
                            <p className="font-medium text-gray-900">{booking.confirmationCode}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Total Amount</p>
                            <p className="text-xl font-bold text-purple-600">${booking.totalAmount}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 md:mt-0 md:ml-6 flex flex-col space-y-2">
                        <button
                          onClick={() => handleDownloadTicket(booking)}
                          className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          <Download className="h-4 w-4" />
                          <span>Download</span>
                        </button>
                        
                        <button
                          onClick={() => handleViewQR(booking)}
                          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <QrCode className="h-4 w-4" />
                          <span>QR Code</span>
                        </button>
                        
                        <button
                          onClick={() => handleResendEmail(booking)}
                          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Mail className="h-4 w-4" />
                          <span>Resend</span>
                        </button>
                        
                        <Link
                          to={`/event/${booking.eventId}`}
                          className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View Event</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Ticket className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bookings Found</h3>
            <p className="text-gray-600 mb-8">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search criteria' 
                : "You haven't booked any events yet"}
            </p>
            <Link
              to="/events"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Browse Events
            </Link>
          </div>
        )}

        {/* QR Code Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">QR Code</h3>
                <div className="w-48 h-48 bg-gray-200 mx-auto rounded-lg flex items-center justify-center mb-4">
                  <QrCode className="h-24 w-24 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 mb-2">{selectedBooking.eventTitle}</p>
                <p className="text-xs text-gray-500 mb-6">Code: {selectedBooking.qrCode}</p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleDownloadTicket(selectedBooking)}
                    className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;