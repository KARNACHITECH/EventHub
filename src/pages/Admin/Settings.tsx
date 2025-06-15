import React, { useState } from 'react';
import { 
  Save, 
  Mail, 
  FileText, 
  Palette, 
  Settings as SettingsIcon,
  Upload,
  Eye,
  Download,
  MapPin,
  Bell
} from 'lucide-react';

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('email');
  const [emailTemplate, setEmailTemplate] = useState(`
<!DOCTYPE html>
<html>
<head>
    <title>Your Event Ticket</title>
</head>
<body>
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <h1 style="color: #7c3aed;">Your Ticket is Ready!</h1>
        <p>Dear {{customer_name}},</p>
        <p>Thank you for purchasing tickets to <strong>{{event_title}}</strong>.</p>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2>Event Details</h2>
            <p><strong>Event:</strong> {{event_title}}</p>
            <p><strong>Date:</strong> {{event_date}}</p>
            <p><strong>Time:</strong> {{event_time}}</p>
            <p><strong>Venue:</strong> {{event_venue}}</p>
            <p><strong>Location:</strong> {{event_location}}</p>
        </div>
        
        <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2>Ticket Information</h2>
            <p><strong>Ticket Type:</strong> {{ticket_type}}</p>
            <p><strong>Quantity:</strong> {{ticket_quantity}}</p>
            <p><strong>Total Amount:</strong> ${{total_amount}}</p>
            <p><strong>Confirmation Code:</strong> {{confirmation_code}}</p>
        </div>
        
        <p>Your PDF ticket is attached to this email. Please bring it with you to the event.</p>
        
        <p>Best regards,<br>EventHub Team</p>
    </div>
</body>
</html>
  `);

  const [reminderTemplate, setReminderTemplate] = useState(`
<!DOCTYPE html>
<html>
<head>
    <title>Event Reminder</title>
</head>
<body>
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <h1 style="color: #7c3aed;">Don't Forget Your Event!</h1>
        <p>Dear {{customer_name}},</p>
        <p>This is a friendly reminder that <strong>{{event_title}}</strong> is coming up soon!</p>
        
        <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2>Event Details</h2>
            <p><strong>Event:</strong> {{event_title}}</p>
            <p><strong>Date:</strong> {{event_date}}</p>
            <p><strong>Time:</strong> {{event_time}}</p>
            <p><strong>Venue:</strong> {{event_venue}}</p>
            <p><strong>Location:</strong> {{event_location}}</p>
        </div>
        
        <p>Don't forget to bring your ticket! We look forward to seeing you there.</p>
        
        <p>Best regards,<br>EventHub Team</p>
    </div>
</body>
</html>
  `);

  const [pdfSettings, setPdfSettings] = useState({
    headerColor: '#7c3aed',
    logoUrl: '',
    footerText: 'EventHub - Your Premier Event Platform',
    includeQR: true,
    includeMap: true,
    template: 'modern'
  });

  const [reminderSettings, setReminderSettings] = useState({
    enabled: true,
    daysBefore: 3,
    timeOfDay: '09:00',
    includeDirections: true
  });

  const handleSaveEmailTemplate = () => {
    console.log('Saving email template:', emailTemplate);
    // Implement save logic
  };

  const handleSaveReminderTemplate = () => {
    console.log('Saving reminder template:', reminderTemplate);
    // Implement save logic
  };

  const handleSavePdfSettings = () => {
    console.log('Saving PDF settings:', pdfSettings);
    // Implement save logic
  };

  const handleSaveReminderSettings = () => {
    console.log('Saving reminder settings:', reminderSettings);
    // Implement save logic
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Customize email templates, PDF tickets, and system settings</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('email')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'email'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>Email Templates</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('pdf')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'pdf'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>PDF Tickets</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('reminders')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'reminders'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Reminders</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('general')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'general'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <SettingsIcon className="h-5 w-5" />
                  <span>General</span>
                </div>
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Email Templates Tab */}
            {activeTab === 'email' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Ticket Confirmation Email</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Template (HTML)
                      </label>
                      <textarea
                        value={emailTemplate}
                        onChange={(e) => setEmailTemplate(e.target.value)}
                        rows={20}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
                      />
                      <div className="mt-4 flex space-x-2">
                        <button
                          onClick={handleSaveEmailTemplate}
                          className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
                        >
                          <Save className="h-4 w-4" />
                          <span>Save Template</span>
                        </button>
                        <button className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                          <Eye className="h-4 w-4" />
                          <span>Preview</span>
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Available Variables
                      </label>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                        <div><code className="bg-white px-2 py-1 rounded">{'{{customer_name}}'}</code> - Customer's name</div>
                        <div><code className="bg-white px-2 py-1 rounded">{'{{event_title}}'}</code> - Event title</div>
                        <div><code className="bg-white px-2 py-1 rounded">{'{{event_date}}'}</code> - Event date</div>
                        <div><code className="bg-white px-2 py-1 rounded">{'{{event_time}}'}</code> - Event time</div>
                        <div><code className="bg-white px-2 py-1 rounded">{'{{event_venue}}'}</code> - Venue name</div>
                        <div><code className="bg-white px-2 py-1 rounded">{'{{event_location}}'}</code> - Event location</div>
                        <div><code className="bg-white px-2 py-1 rounded">{'{{ticket_type}}'}</code> - Ticket type</div>
                        <div><code className="bg-white px-2 py-1 rounded">{'{{ticket_quantity}}'}</code> - Number of tickets</div>
                        <div><code className="bg-white px-2 py-1 rounded">{'{{total_amount}}'}</code> - Total amount paid</div>
                        <div><code className="bg-white px-2 py-1 rounded">{'{{confirmation_code}}'}</code> - Booking confirmation</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Reminder Email Template</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <textarea
                        value={reminderTemplate}
                        onChange={(e) => setReminderTemplate(e.target.value)}
                        rows={15}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
                      />
                      <div className="mt-4 flex space-x-2">
                        <button
                          onClick={handleSaveReminderTemplate}
                          className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
                        >
                          <Save className="h-4 w-4" />
                          <span>Save Template</span>
                        </button>
                        <button className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                          <Eye className="h-4 w-4" />
                          <span>Preview</span>
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Template Tips
                      </label>
                      <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-700">
                        <ul className="space-y-1">
                          <li>• Keep reminders friendly and informative</li>
                          <li>• Include essential event details</li>
                          <li>• Add parking or transportation info</li>
                          <li>• Include contact information for questions</li>
                          <li>• Use the same variables as confirmation emails</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PDF Tickets Tab */}
            {activeTab === 'pdf' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">PDF Ticket Customization</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Header Color
                        </label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="color"
                            value={pdfSettings.headerColor}
                            onChange={(e) => setPdfSettings({...pdfSettings, headerColor: e.target.value})}
                            className="w-12 h-10 border border-gray-300 rounded-lg"
                          />
                          <input
                            type="text"
                            value={pdfSettings.headerColor}
                            onChange={(e) => setPdfSettings({...pdfSettings, headerColor: e.target.value})}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Logo Upload
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-2">Upload your logo</p>
                          <input type="file" accept="image/*" className="hidden" id="logo-upload" />
                          <label
                            htmlFor="logo-upload"
                            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                          >
                            Choose File
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Footer Text
                        </label>
                        <input
                          type="text"
                          value={pdfSettings.footerText}
                          onChange={(e) => setPdfSettings({...pdfSettings, footerText: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Template Style
                        </label>
                        <select
                          value={pdfSettings.template}
                          onChange={(e) => setPdfSettings({...pdfSettings, template: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="modern">Modern</option>
                          <option value="classic">Classic</option>
                          <option value="minimal">Minimal</option>
                          <option value="elegant">Elegant</option>
                        </select>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="include-qr"
                            checked={pdfSettings.includeQR}
                            onChange={(e) => setPdfSettings({...pdfSettings, includeQR: e.target.checked})}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                          <label htmlFor="include-qr" className="ml-2 text-sm text-gray-700">
                            Include QR Code
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="include-map"
                            checked={pdfSettings.includeMap}
                            onChange={(e) => setPdfSettings({...pdfSettings, includeMap: e.target.checked})}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                          <label htmlFor="include-map" className="ml-2 text-sm text-gray-700">
                            Include Google Map
                          </label>
                        </div>
                      </div>

                      <button
                        onClick={handleSavePdfSettings}
                        className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
                      >
                        <Save className="h-5 w-5" />
                        <span>Save PDF Settings</span>
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preview
                      </label>
                      <div className="border border-gray-300 rounded-lg p-6 bg-white">
                        <div 
                          className="text-white p-4 rounded-t-lg text-center"
                          style={{ backgroundColor: pdfSettings.headerColor }}
                        >
                          <h2 className="text-xl font-bold">EVENT TICKET</h2>
                        </div>
                        <div className="p-6 space-y-4">
                          <div className="text-center">
                            <h3 className="text-lg font-bold">Tech Conference 2024</h3>
                            <p className="text-gray-600">March 15, 2024 • 9:00 AM</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="font-medium">Venue:</p>
                              <p className="text-gray-600">Convention Center</p>
                            </div>
                            <div>
                              <p className="font-medium">Ticket Type:</p>
                              <p className="text-gray-600">VIP</p>
                            </div>
                          </div>
                          {pdfSettings.includeQR && (
                            <div className="text-center">
                              <div className="w-20 h-20 bg-gray-200 mx-auto rounded"></div>
                              <p className="text-xs text-gray-500 mt-1">QR Code</p>
                            </div>
                          )}
                          {pdfSettings.includeMap && (
                            <div className="text-center">
                              <div className="w-full h-16 bg-gray-200 rounded flex items-center justify-center">
                                <MapPin className="h-6 w-6 text-gray-400" />
                                <span className="text-gray-500 ml-2">Map Location</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="text-center text-xs text-gray-500 p-2 border-t">
                          {pdfSettings.footerText}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Reminders Tab */}
            {activeTab === 'reminders' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Email Reminder Settings</h2>
                  <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="enable-reminders"
                        checked={reminderSettings.enabled}
                        onChange={(e) => setReminderSettings({...reminderSettings, enabled: e.target.checked})}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <label htmlFor="enable-reminders" className="ml-2 text-sm font-medium text-gray-700">
                        Enable automatic reminder emails
                      </label>
                    </div>

                    {reminderSettings.enabled && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Send reminder X days before event
                          </label>
                          <select
                            value={reminderSettings.daysBefore}
                            onChange={(e) => setReminderSettings({...reminderSettings, daysBefore: parseInt(e.target.value)})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          >
                            <option value={1}>1 day before</option>
                            <option value={2}>2 days before</option>
                            <option value={3}>3 days before</option>
                            <option value={7}>1 week before</option>
                            <option value={14}>2 weeks before</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Send time
                          </label>
                          <input
                            type="time"
                            value={reminderSettings.timeOfDay}
                            onChange={(e) => setReminderSettings({...reminderSettings, timeOfDay: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="include-directions"
                        checked={reminderSettings.includeDirections}
                        onChange={(e) => setReminderSettings({...reminderSettings, includeDirections: e.target.checked})}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <label htmlFor="include-directions" className="ml-2 text-sm text-gray-700">
                        Include directions and parking information
                      </label>
                    </div>

                    <button
                      onClick={handleSaveReminderSettings}
                      className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
                    >
                      <Save className="h-5 w-5" />
                      <span>Save Reminder Settings</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* General Tab */}
            {activeTab === 'general' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">General Settings</h2>
                  <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Google Maps Integration</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Google Maps API Key
                          </label>
                          <input
                            type="password"
                            placeholder="Enter your Google Maps API key"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                          <p className="text-sm text-gray-500 mt-1">
                            Required for displaying event locations on maps
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">QR Code Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            QR Code Size (pixels)
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                            <option value="200">200x200</option>
                            <option value="300">300x300</option>
                            <option value="400">400x400</option>
                          </select>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="qr-logo"
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                          <label htmlFor="qr-logo" className="ml-2 text-sm text-gray-700">
                            Include logo in QR code center
                          </label>
                        </div>
                      </div>
                    </div>

                    <button className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all">
                      <Save className="h-5 w-5" />
                      <span>Save General Settings</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;