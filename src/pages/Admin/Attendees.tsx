import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Mail, 
  Eye, 
  UserPlus,
  Calendar,
  MapPin,
  Ticket,
  Phone,
  MoreVertical,
  Edit,
  Trash2,
  Send,
  FileText,
  BarChart3,
  TrendingUp,
  UserCheck,
  Clock
} from 'lucide-react';

interface AttendeeData {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  ticketType: string;
  registrationDate: string;
  status: 'registered' | 'checked-in' | 'no-show';
  totalSpent: number;
  eventsAttended: number;
  lastActivity: string;
}

const Attendees: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [eventFilter, setEventFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([]);
  const [showAttendeeDetails, setShowAttendeeDetails] = useState<AttendeeData | null>(null);
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Mock attendee data
  const attendees: AttendeeData[] = [
    {
      id: 'ATT001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      eventId: '1',
      eventTitle: 'Tech Conference 2024',
      eventDate: '2024-03-15',
      ticketType: 'VIP',
      registrationDate: '2024-02-15',
      status: 'registered',
      totalSpent: 1250,
      eventsAttended: 5,
      lastActivity: '2024-02-20'
    },
    {
      id: 'ATT002',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 (555) 987-6543',
      eventId: '1',
      eventTitle: 'Tech Conference 2024',
      eventDate: '2024-03-15',
      ticketType: 'Regular',
      registrationDate: '2024-02-16',
      status: 'checked-in',
      totalSpent: 890,
      eventsAttended: 3,
      lastActivity: '2024-03-15'
    },
    {
      id: 'ATT003',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      phone: '+1 (555) 456-7890',
      eventId: '2',
      eventTitle: 'Music Festival Summer',
      eventDate: '2024-06-20',
      ticketType: 'General Admission',
      registrationDate: '2024-02-17',
      status: 'registered',
      totalSpent: 320,
      eventsAttended: 2,
      lastActivity: '2024-02-18'
    },
    {
      id: 'ATT004',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      phone: '+1 (555) 321-0987',
      eventId: '3',
      eventTitle: 'Art Exhibition Opening',
      eventDate: '2024-04-10',
      ticketType: 'Collector Pass',
      registrationDate: '2024-01-05',
      status: 'no-show',
      totalSpent: 150,
      eventsAttended: 1,
      lastActivity: '2024-01-10'
    },
    {
      id: 'ATT005',
      name: 'David Brown',
      email: 'david.brown@example.com',
      phone: '+1 (555) 654-3210',
      eventId: '4',
      eventTitle: 'Business Summit 2024',
      eventDate: '2024-05-08',
      ticketType: 'Executive',
      registrationDate: '2024-02-10',
      status: 'registered',
      totalSpent: 2100,
      eventsAttended: 8,
      lastActivity: '2024-02-22'
    }
  ];

  const events = [
    { id: '1', title: 'Tech Conference 2024' },
    { id: '2', title: 'Music Festival Summer' },
    { id: '3', title: 'Art Exhibition Opening' },
    { id: '4', title: 'Business Summit 2024' }
  ];

  const filteredAttendees = attendees.filter(attendee => {
    const matchesSearch = 
      attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.phone.includes(searchTerm);
    
    const matchesEvent = eventFilter === 'all' || attendee.eventId === eventFilter;
    const matchesStatus = statusFilter === 'all' || attendee.status === statusFilter;
    
    return matchesSearch && matchesEvent && matchesStatus;
  });

  const stats = {
    totalAttendees: attendees.length,
    checkedIn: attendees.filter(a => a.status === 'checked-in').length,
    registered: attendees.filter(a => a.status === 'registered').length,
    noShow: attendees.filter(a => a.status === 'no-show').length,
    totalRevenue: attendees.reduce((sum, a) => sum + a.totalSpent, 0)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'registered':
        return 'bg-blue-100 text-blue-800';
      case 'checked-in':
        return 'bg-green-100 text-green-800';
      case 'no-show':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSelectAttendee = (attendeeId: string) => {
    setSelectedAttendees(prev => 
      prev.includes(attendeeId) 
        ? prev.filter(id => id !== attendeeId)
        : [...prev, attendeeId]
    );
  };

  const handleSelectAll = () => {
    setSelectedAttendees(
      selectedAttendees.length === filteredAttendees.length 
        ? [] 
        : filteredAttendees.map(attendee => attendee.id)
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} for attendees:`, selectedAttendees);
    setSelectedAttendees([]);
    setShowBulkActions(false);
  };

  const handleViewDetails = (attendee: AttendeeData) => {
    setShowAttendeeDetails(attendee);
  };

  const handleSendEmail = (attendee: AttendeeData) => {
    console.log('Sending email to:', attendee.email);
  };

  const handleExportData = () => {
    console.log('Exporting attendee data...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Attendee Management</h1>
            <p className="text-gray-600">Manage event attendees and track participation</p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <button
              onClick={handleExportData}
              className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all"
            >
              <Download className="h-5 w-5" />
              <span>Export Data</span>
            </button>
            <button className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all">
              <UserPlus className="h-5 w-5" />
              <span>Add Attendee</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.totalAttendees}</p>
                <p className="text-gray-600">Total Attendees</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.checkedIn}</p>
                <p className="text-gray-600">Checked In</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.registered}</p>
                <p className="text-gray-600">Registered</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.noShow}</p>
                <p className="text-gray-600">No Show</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
                <p className="text-gray-600">Total Revenue</p>
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
                  placeholder="Search attendees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            <select
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Events</option>
              {events.map(event => (
                <option key={event.id} value={event.id}>{event.title}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="registered">Registered</option>
              <option value="checked-in">Checked In</option>
              <option value="no-show">No Show</option>
            </select>
          </div>

          {/* Bulk Actions */}
          {selectedAttendees.length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-700">
                  {selectedAttendees.length} attendee(s) selected
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
                    onClick={() => handleBulkAction('checkin')}
                    className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                  >
                    <UserCheck className="h-4 w-4" />
                    <span>Check In</span>
                  </button>
                  <button
                    onClick={() => handleBulkAction('export')}
                    className="flex items-center space-x-1 px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
                  >
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Attendees Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6">
                    <input
                      type="checkbox"
                      checked={selectedAttendees.length === filteredAttendees.length && filteredAttendees.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Attendee</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Event</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Ticket Type</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Registration</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Status</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Total Spent</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendees.map((attendee) => (
                  <tr key={attendee.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <input
                        type="checkbox"
                        checked={selectedAttendees.includes(attendee.id)}
                        onChange={() => handleSelectAttendee(attendee.id)}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {attendee.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{attendee.name}</p>
                          <p className="text-sm text-gray-600">{attendee.email}</p>
                          <p className="text-xs text-gray-500">{attendee.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-900">{attendee.eventTitle}</p>
                        <p className="text-sm text-gray-600">{new Date(attendee.eventDate).toLocaleDateString()}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {attendee.ticketType}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {new Date(attendee.registrationDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(attendee.status)}`}>
                        {attendee.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-900">${attendee.totalSpent}</p>
                        <p className="text-xs text-gray-500">{attendee.eventsAttended} events</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetails(attendee)}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleSendEmail(attendee)}
                          className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
                          title="Send Email"
                        >
                          <Mail className="h-4 w-4" />
                        </button>
                        <button
                          className="p-1 text-purple-600 hover:bg-purple-100 rounded transition-colors"
                          title="Edit Attendee"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                          title="Delete Attendee"
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
            Showing {filteredAttendees.length} of {attendees.length} attendees
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

        {/* Attendee Details Modal */}
        {showAttendeeDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Attendee Details</h3>
                <button
                  onClick={() => setShowAttendeeDetails(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl font-bold">
                      {showAttendeeDetails.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{showAttendeeDetails.name}</h4>
                    <p className="text-gray-600">{showAttendeeDetails.email}</p>
                    <p className="text-gray-600">{showAttendeeDetails.phone}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event</label>
                    <p className="text-gray-900">{showAttendeeDetails.eventTitle}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                    <p className="text-gray-900">{new Date(showAttendeeDetails.eventDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Type</label>
                    <p className="text-gray-900">{showAttendeeDetails.ticketType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Registration Date</label>
                    <p className="text-gray-900">{new Date(showAttendeeDetails.registrationDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(showAttendeeDetails.status)}`}>
                      {showAttendeeDetails.status.replace('-', ' ')}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Spent</label>
                    <p className="text-lg font-semibold text-purple-600">${showAttendeeDetails.totalSpent}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Events Attended</label>
                    <p className="text-gray-900">{showAttendeeDetails.eventsAttended} events</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Activity</label>
                    <p className="text-gray-900">{new Date(showAttendeeDetails.lastActivity).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleSendEmail(showAttendeeDetails)}
                    className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Send Email</span>
                  </button>
                  <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <Edit className="h-4 w-4" />
                    <span>Edit Details</span>
                  </button>
                  <button
                    onClick={() => setShowAttendeeDetails(null)}
                    className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <span>Close</span>
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

export default Attendees;