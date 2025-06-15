import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, Loader2, Upload, Camera, CreditCard, FileText, Phone } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Register: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    
    // Identity Information
    nationalId: '',
    idCardNumber: '',
    
    // Security
    password: '',
    confirmPassword: '',
    
    // Files
    profileImage: null as File | null,
    idDocument: null as File | null
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [profileImagePreview, setProfileImagePreview] = useState<string>('');
  const [idDocumentPreview, setIdDocumentPreview] = useState<string>('');
  
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'profileImage' | 'idDocument') => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        [type]: file
      });

      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        if (type === 'profileImage') {
          setProfileImagePreview(event.target?.result as string);
        } else {
          setIdDocumentPreview(event.target?.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        if (!formData.name || !formData.email || !formData.phone || !formData.dateOfBirth) {
          setError('Please fill in all personal information fields');
          return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
          setError('Please enter a valid email address');
          return false;
        }
        break;
      case 2:
        if (!formData.nationalId || !formData.idCardNumber) {
          setError('Please fill in all identity information fields');
          return false;
        }
        if (formData.nationalId.length !== 18) {
          setError('National ID (NIN) must be exactly 18 digits');
          return false;
        }
        if (!/^\d{18}$/.test(formData.nationalId)) {
          setError('National ID (NIN) must contain only numbers');
          return false;
        }
        break;
      case 3:
        if (!formData.password || !formData.confirmPassword) {
          setError('Please fill in all password fields');
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return false;
        }
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters long');
          return false;
        }
        break;
      case 4:
        if (!formData.profileImage) {
          setError('Please upload a profile image');
          return false;
        }
        if (!formData.idDocument) {
          setError('Please upload a copy of your ID document');
          return false;
        }
        break;
    }
    setError('');
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateStep(4)) {
      return;
    }

    try {
      // In a real application, you would upload the files to a server
      console.log('Registration data:', formData);
      await register(formData.name, formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Identity', icon: CreditCard },
    { number: 3, title: 'Security', icon: Lock },
    { number: 4, title: 'Documents', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full space-y-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600">Complete all steps to register your account</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.number 
                      ? 'bg-purple-600 border-purple-600 text-white' 
                      : 'border-gray-300 text-gray-400'
                  }`}>
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div className="ml-2 hidden sm:block">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.number ? 'text-purple-600' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 sm:w-16 h-0.5 mx-2 ${
                      currentStep > step.number ? 'bg-purple-600' : 'bg-gray-300'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    required
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Identity Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Identity Information</h3>
                
                <div>
                  <label htmlFor="nationalId" className="block text-sm font-medium text-gray-700 mb-2">
                    National ID Number (NIN) *
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="nationalId"
                      name="nationalId"
                      type="text"
                      required
                      value={formData.nationalId}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      placeholder="Enter your 18-digit National ID Number"
                      maxLength={18}
                      pattern="[0-9]{18}"
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs text-gray-500">
                      Enter your 18-digit National Identification Number
                    </p>
                    <p className={`text-xs ${
                      formData.nationalId.length === 18 ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {formData.nationalId.length}/18
                    </p>
                  </div>
                  {formData.nationalId && formData.nationalId.length !== 18 && (
                    <p className="text-xs text-red-600 mt-1">
                      NIN must be exactly 18 digits
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="idCardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    ID Card Number *
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="idCardNumber"
                      name="idCardNumber"
                      type="text"
                      required
                      value={formData.idCardNumber}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      placeholder="Enter your ID card number"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the number on your government-issued ID card
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-900">Identity Verification</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Your identity information is required for account verification and security purposes. 
                        The National ID Number (NIN) must be exactly 18 digits. All information is encrypted and stored securely.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Security */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Information</h3>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  <div className="mt-2">
                    <div className="text-xs text-gray-500">
                      Password must contain:
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li className={formData.password.length >= 6 ? 'text-green-600' : ''}>
                          At least 6 characters
                        </li>
                        <li className={/[A-Z]/.test(formData.password) ? 'text-green-600' : ''}>
                          One uppercase letter
                        </li>
                        <li className={/[0-9]/.test(formData.password) ? 'text-green-600' : ''}>
                          One number
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-red-600 mt-1">Passwords do not match</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Document Upload */}
            {currentStep === 4 && (
              <div className="w-full">
                <div className="space-y-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Upload Documents</h3>
                  
                  {/* Profile Image Upload */}
                  <div className="bg-gray-50 rounded-xl p-8">
                    <label className="block text-sm font-medium text-gray-700 mb-6">
                      Profile Image *
                    </label>
                    <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
                      <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-white flex-shrink-0">
                        {profileImagePreview ? (
                          <img
                            src={profileImagePreview}
                            alt="Profile preview"
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          <Camera className="h-12 w-12 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 text-center lg:text-left">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, 'profileImage')}
                          className="hidden"
                          id="profileImage"
                        />
                        <label
                          htmlFor="profileImage"
                          className="cursor-pointer bg-white border border-gray-300 rounded-lg px-8 py-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors inline-flex items-center space-x-3"
                        >
                          <Upload className="h-5 w-5" />
                          <span>Choose Profile Image</span>
                        </label>
                        <p className="text-sm text-gray-500 mt-3">
                          Upload a clear photo of yourself (JPG, PNG, max 5MB)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ID Document Upload */}
                  <div className="bg-gray-50 rounded-xl p-8">
                    <label className="block text-sm font-medium text-gray-700 mb-6">
                      ID Document Copy *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 bg-white">
                      {idDocumentPreview ? (
                        <div className="text-center">
                          <img
                            src={idDocumentPreview}
                            alt="ID document preview"
                            className="max-w-full h-48 object-contain mx-auto mb-6 rounded-lg"
                          />
                          <p className="text-sm text-green-600 font-medium mb-4">Document uploaded successfully</p>
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileChange(e, 'idDocument')}
                            className="hidden"
                            id="idDocumentReplace"
                          />
                          <label
                            htmlFor="idDocumentReplace"
                            className="cursor-pointer text-purple-600 hover:text-purple-700 text-sm font-medium"
                          >
                            Replace Document
                          </label>
                        </div>
                      ) : (
                        <div className="text-center">
                          <FileText className="h-20 w-20 text-gray-400 mx-auto mb-6" />
                          <h4 className="text-xl font-medium text-gray-900 mb-3">Upload ID Document</h4>
                          <p className="text-sm text-gray-600 mb-8">
                            Drag and drop your ID document here, or click to browse
                          </p>
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileChange(e, 'idDocument')}
                            className="hidden"
                            id="idDocument"
                          />
                          <label
                            htmlFor="idDocument"
                            className="cursor-pointer bg-purple-600 text-white px-8 py-4 rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center space-x-3"
                          >
                            <Upload className="h-5 w-5" />
                            <span>Choose File</span>
                          </label>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                      Upload a clear photo or scan of your government-issued ID (National ID, Passport, Driver's License)
                    </p>
                  </div>

                  {/* Security Notice */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                    <div className="flex items-start">
                      <FileText className="h-6 w-6 text-yellow-600 mt-0.5 mr-4 flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium text-yellow-900 mb-2">Document Security</h4>
                        <p className="text-sm text-yellow-700">
                          Your documents are encrypted and used only for identity verification. 
                          We comply with all data protection regulations and will never share your documents with third parties.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="pt-6 border-t border-gray-200">
                    <div className="flex items-start">
                      <input
                        id="agree-terms"
                        name="agree-terms"
                        type="checkbox"
                        required
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-1 flex-shrink-0"
                      />
                      <label htmlFor="agree-terms" className="ml-4 block text-sm text-gray-700">
                        I agree to the{' '}
                        <Link to="/terms" className="text-purple-600 hover:text-purple-500 font-medium">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-purple-600 hover:text-purple-500 font-medium">
                          Privacy Policy
                        </Link>
                        , and I confirm that all information provided is accurate and complete.
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  Previous
                </button>
              ) : (
                <div></div>
              )}
              
              <div className="flex items-center space-x-4">
                {/* Step indicator */}
                <span className="text-sm text-gray-500">
                  Step {currentStep} of {steps.length}
                </span>
                
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 font-medium"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <span>Create Account</span>
                    )}
                  </button>
                )}
              </div>
            </div>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-purple-600 hover:text-purple-500 font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;