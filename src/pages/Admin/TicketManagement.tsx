import React, { useState } from 'react';
import { 
  QrCode, 
  Scan, 
  Upload, 
  Download, 
  Mail, 
  Check, 
  X, 
  Search,
  Filter,
  RefreshCw,
  Eye,
  Calendar,
  User,
  Ticket,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface TicketData {
  id: string;
  eventId: string;
  eventTitle: string;
  ticketType: string;
  customerName: string;
  customerEmail: string;
  purchaseDate: string;
  status: 'valid' | 'redeemed' | 'cancelled';
  qrCode: string;
  price: number;
}

const TicketManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('scan');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [scanResult, setScanResult] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);
  const [showTicketDetails, setShowTicketDetails] = useState<TicketData | null>(null);
  const [showQRModal, setShowQRModal] = useState<TicketData | null>(null);
  const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  // Mock ticket data
  const [tickets, setTickets] = useState<TicketData[]>([
    {
      id: 'TKT-001',
      eventId: '1',
      eventTitle: 'Tech Conference 2024',
      ticketType: 'VIP',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      purchaseDate: '2024-02-15',
      status: 'valid',
      qrCode: 'QR123456789',
      price: 299
    },
    {
      id: 'TKT-002',
      eventId: '1',
      eventTitle: 'Tech Conference 2024',
      ticketType: 'Regular',
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      purchaseDate: '2024-02-16',
      status: 'redeemed',
      qrCode: 'QR987654321',
      price: 149
    },
    {
      id: 'TKT-003',
      eventId: '2',
      eventTitle: 'Music Festival Summer',
      ticketType: 'General Admission',
      customerName: 'Mike Johnson',
      customerEmail: 'mike@example.com',
      purchaseDate: '2024-02-17',
      status: 'valid',
      qrCode: 'QR456789123',
      price: 79
    }
  ]);

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.eventTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const showMessage = (type: 'success' | 'error', message: string) => {
    setActionMessage({ type, message });
    setTimeout(() => setActionMessage(null), 3000);
  };

  const handleScanQR = () => {
    setIsScanning(true);
    // Simulate QR scanning
    setTimeout(() => {
      setScanResult('QR123456789');
      setIsScanning(false);
    }, 2000);
  };

  const handleViewTicketDetails = (ticket: TicketData) => {
    setShowTicketDetails(ticket);
  };

  const handleViewQRCode = (ticket: TicketData) => {
    setShowQRModal(ticket);
  };

  const handleResendEmail = (ticket: TicketData) => {
    console.log('Resending email for ticket:', ticket.id);
    showMessage('success', `Email resent successfully to ${ticket.customerEmail}`);
  };

  const handleRedeemTicket = (ticketId: string) => {
    setTickets(prevTickets => 
      prevTickets.map(ticket => 
        ticket.id === ticketId 
          ? { ...ticket, status: 'redeemed' as const }
          : ticket
      )
    );
    showMessage('success', `Ticket ${ticketId} has been redeemed successfully`);
  };

  const handleCancelTicket = (ticketId: string) => {
    if (window.confirm('Are you sure you want to cancel this ticket?')) {
      setTickets(prevTickets => 
        prevTickets.map(ticket => 
          ticket.id === ticketId 
            ? { ...ticket, status: 'cancelled' as const }
            : ticket
        )
      );
      showMessage('success', `Ticket ${ticketId} has been cancelled`);
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} for tickets:`, selectedTickets);
    
    switch (action) {
      case 'redeem':
        setTickets(prevTickets => 
          prevTickets.map(ticket => 
            selectedTickets.includes(ticket.id) && ticket.status === 'valid'
              ? { ...ticket, status: 'redeemed' as const }
              : ticket
          )
        );
        showMessage('success', `${selectedTickets.length} tickets redeemed successfully`);
        break;
      case 'resend':
        showMessage('success', `Emails resent to ${selectedTickets.length} customers`);
        break;
      case 'export':
        showMessage('success', `${selectedTickets.length} tickets exported successfully`);
        break;
    }
    setSelectedTickets([]);
  };

  const handleSelectTicket = (ticketId: string) => {
    setSelectedTickets(prev => 
      prev.includes(ticketId) 
        ? prev.filter(id => id !== ticketId)
        : [...prev, ticketId]
    );
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ticket Management</h1>
          <p className="text-gray-600">Scan, redeem, and manage event tickets</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('scan')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'scan'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Scan className="h-5 w-5" />
                  <span>QR Scanner</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('tickets')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'tickets'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Ticket className="h-5 w-5" />
                  <span>All Tickets</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('upload')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'upload'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Upload QR</span>
                </div>
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* QR Scanner Tab */}
            {activeTab === 'scan' && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-64 h-64 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                    {isScanning ? (
                      <div className="text-center">
                        <RefreshCw className="h-12 w-12 text-purple-600 animate-spin mx-auto mb-4" />
                        <p className="text-gray-600">Scanning QR Code...</p>
                      </div>
                    ) : scanResult ? (
                      <div className="text-center">
                        <Check className="h-12 w-12 text-green-600 mx-auto mb-4" />
                        <p className="text-gray-900 font-medium">QR Code Detected</p>
                        <p className="text-gray-600 text-sm">{scanResult}</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <QrCode className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Position QR code in the frame</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <button
                      onClick={handleScanQR}
                      disabled={isScanning}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50"
                    >
                      {isScanning ? 'Scanning...' : 'Start Camera Scan'}
                    </button>
                    
                    {scanResult && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-green-900">Ticket Found</p>
                            <p className="text-sm text-green-700">Tech Conference 2024 - VIP Ticket</p>
                            <p className="text-sm text-green-700">John Doe (john@example.com)</p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleRedeemTicket('TKT-001')}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                            >
                              Redeem Ticket
                            </button>
                            <button
                              onClick={() => setScanResult('')}
                              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                              Scan Next
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* All Tickets Tab */}
            {activeTab === 'tickets' && (
              <div className="space-y-6">
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search tickets..."
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
                    <option value="valid">Valid</option>
                    <option value="redeemed">Redeemed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Bulk Actions */}
                {selectedTickets.length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-700">
                        {selectedTickets.length} ticket(s) selected
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleBulkAction('redeem')}
                          className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                        >
                          <Check className="h-4 w-4" />
                          <span>Redeem</span>
                        </button>
                        <button
                          onClick={() => handleBulkAction('resend')}
                          className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                        >
                          <Mail className="h-4 w-4" />
                          <span>Resend</span>
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

                {/* Tickets Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-4">
                          <input
                            type="checkbox"
                            onChange={() => {
                              if (selectedTickets.length === filteredTickets.length) {
                                setSelectedTickets([]);
                              } else {
                                setSelectedTickets(filteredTickets.map(t => t.id));
                              }
                            }}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Ticket ID</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Event</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Purchase Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTickets.map((ticket) => (
                        <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <input
                              type="checkbox"
                              checked={selectedTickets.includes(ticket.id)}
                              onChange={() => handleSelectTicket(ticket.id)}
                              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                          </td>
                          <td className="py-3 px-4 font-medium text-gray-900">{ticket.id}</td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium text-gray-900">{ticket.eventTitle}</p>
                              <p className="text-sm text-gray-600">${ticket.price}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium text-gray-900">{ticket.customerName}</p>
                              <p className="text-sm text-gray-600">{ticket.customerEmail}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{ticket.ticketType}</td>
                          <td className="py-3 px-4 text-gray-600">
                            {new Date(ticket.purchaseDate).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              ticket.status === 'valid' ? 'bg-green-100 text-green-800' :
                              ticket.status === 'redeemed' ? 'bg-blue-100 text-blue-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {ticket.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleViewTicketDetails(ticket)}
                                className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                                title="View Details"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleViewQRCode(ticket)}
                                className="p-1 text-purple-600 hover:bg-purple-100 rounded transition-colors"
                                title="View QR Code"
                              >
                                <QrCode className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleResendEmail(ticket)}
                                className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
                                title="Resend Email"
                              >
                                <Mail className="h-4 w-4" />
                              </button>
                              {ticket.status === 'valid' && (
                                <button
                                  onClick={() => handleRedeemTicket(ticket.id)}
                                  className="p-1 text-orange-600 hover:bg-orange-100 rounded transition-colors"
                                  title="Redeem Ticket"
                                >
                                  <Check className="h-4 w-4" />
                                </button>
                              )}
                              <button
                                onClick={() => handleCancelTicket(ticket.id)}
                                className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                                title="Cancel Ticket"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Upload QR Tab */}
            {activeTab === 'upload' && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Upload QR Code Image</h3>
                    <p className="text-gray-600 mb-4">
                      Drag and drop a QR code image or click to browse
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="qr-upload"
                    />
                    <label
                      htmlFor="qr-upload"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all cursor-pointer inline-block"
                    >
                      Choose File
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Ticket Details Modal */}
        {showTicketDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Ticket Details</h3>
                <button
                  onClick={() => setShowTicketDetails(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ticket ID</label>
                    <p className="text-lg font-semibold text-gray-900">{showTicketDetails.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      showTicketDetails.status === 'valid' ? 'bg-green-100 text-green-800' :
                      showTicketDetails.status === 'redeemed' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {showTicketDetails.status}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event</label>
                    <p className="text-gray-900">{showTicketDetails.eventTitle}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Type</label>
                    <p className="text-gray-900">{showTicketDetails.ticketType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                    <p className="text-gray-900">{showTicketDetails.customerName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer Email</label>
                    <p className="text-gray-900">{showTicketDetails.customerEmail}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Date</label>
                    <p className="text-gray-900">{new Date(showTicketDetails.purchaseDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <p className="text-lg font-semibold text-purple-600">${showTicketDetails.price}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">QR Code</label>
                  <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{showTicketDetails.qrCode}</p>
                </div>
                
                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleResendEmail(showTicketDetails)}
                    className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Resend Email</span>
                  </button>
                  {showTicketDetails.status === 'valid' && (
                    <button
                      onClick={() => {
                        handleRedeemTicket(showTicketDetails.id);
                        setShowTicketDetails(null);
                      }}
                      className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      <Check className="h-4 w-4" />
                      <span>Redeem Ticket</span>
                    </button>
                  )}
                  <button
                    onClick={() => setShowTicketDetails(null)}
                    className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <span>Close</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* QR Code Modal */}
        {showQRModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
              <div className="text-center">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">QR Code</h3>
                  <button
                    onClick={() => setShowQRModal(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="w-48 h-48 bg-gray-200 mx-auto rounded-lg flex items-center justify-center mb-6">
                  <QrCode className="h-24 w-24 text-gray-400" />
                </div>
                
                <div className="space-y-2 mb-6">
                  <p className="font-medium text-gray-900">{showQRModal.eventTitle}</p>
                  <p className="text-sm text-gray-600">{showQRModal.ticketType}</p>
                  <p className="text-sm text-gray-600">{showQRModal.customerName}</p>
                  <p className="text-xs text-gray-500">Code: {showQRModal.qrCode}</p>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowQRModal(null)}
                    className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      console.log('Downloading QR code for:', showQRModal.id);
                      showMessage('success', 'QR code downloaded successfully');
                    }}
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

export default TicketManagement;