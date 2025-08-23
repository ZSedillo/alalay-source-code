import React, { useState } from 'react';
// Mock navigation for demo purposes
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCheckCircle, FaShieldAlt } from 'react-icons/fa';

function ForgotPassword() {
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1); // 1: Email, 2: Verification, 3: New Password, 4: Success
  const [formData, setFormData] = useState({
    email: '',
    verificationCode: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [timer, setTimer] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  // Step 1: Email submission
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email) {
      setErrors({ email: 'Email is required' });
      return;
    }
    
    if (!validateEmail(formData.email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call to send verification email
      setTimeout(() => {
        setCurrentStep(2);
        setIsLoading(false);
        startTimer();
      }, 1000);
    } catch (error) {
      setErrors({ email: 'Failed to send verification email. Please try again.' });
      setIsLoading(false);
    }
  };

  // Step 2: Verification code
  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.verificationCode) {
      setErrors({ verificationCode: 'Verification code is required' });
      return;
    }
    
    if (formData.verificationCode.length !== 6) {
      setErrors({ verificationCode: 'Please enter the complete 6-digit code' });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call to verify code
      setTimeout(() => {
        setCurrentStep(3);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      setErrors({ verificationCode: 'Invalid verification code. Please try again.' });
      setIsLoading(false);
    }
  };

  // Step 3: New password
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (!validatePassword(formData.newPassword)) {
      newErrors.newPassword = 'Password must be at least 8 characters long';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call to reset password
      setTimeout(() => {
        setCurrentStep(4);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setErrors({ newPassword: 'Failed to reset password. Please try again.' });
      setIsLoading(false);
    }
  };

  const startTimer = () => {
    setTimer(60);
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resendCode = async () => {
    if (timer > 0) return;
    
    setIsLoading(true);
    try {
      // Simulate resend API call
      setTimeout(() => {
        startTimer();
        setIsLoading(false);
      }, 500);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-[#8A1A1C] bg-opacity-10 rounded-full mb-3 sm:mb-4">
                <FaEnvelope className="text-[#8A1A1C] text-lg sm:text-2xl" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Reset Your Password</h2>
              <p className="text-gray-600 text-xs sm:text-sm px-2">Enter your email address and we'll send you a verification code</p>
            </div>

            <div onSubmit={handleEmailSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2 text-xs sm:text-sm">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D5B527] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white text-sm sm:text-base ${
                      errors.email ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <button
                onClick={handleEmailSubmit}
                disabled={isLoading || !formData.email.trim()}
                className={`w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 transform text-sm sm:text-base ${
                  isLoading || !formData.email.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#D5B527] hover:bg-[#bfa021] text-white hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent"></div>
                    <span>Sending Code...</span>
                  </div>
                ) : (
                  'Send Verification Code'
                )}
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-[#8A1A1C] bg-opacity-10 rounded-full mb-3 sm:mb-4">
                <FaShieldAlt className="text-[#8A1A1C] text-lg sm:text-2xl" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Check Your Email</h2>
              <p className="text-gray-600 text-xs sm:text-sm mb-2 px-2">
                We've sent a 6-digit verification code to
              </p>
              <p className="text-[#8A1A1C] font-semibold text-xs sm:text-sm break-all px-2">{formData.email}</p>
            </div>

            <div onSubmit={handleVerificationSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="verificationCode" className="block text-gray-700 font-semibold mb-2 text-xs sm:text-sm">
                  Verification Code
                </label>
                <input
                  id="verificationCode"
                  name="verificationCode"
                  type="text"
                  value={formData.verificationCode}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D5B527] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white text-center text-lg sm:text-2xl tracking-widest ${
                    errors.verificationCode ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="000000"
                  maxLength="6"
                  required
                />
                {errors.verificationCode && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.verificationCode}</p>
                )}
              </div>

              <button
                onClick={handleVerificationSubmit}
                disabled={isLoading || formData.verificationCode.length !== 6}
                className={`w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 transform text-sm sm:text-base ${
                  isLoading || formData.verificationCode.length !== 6
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#D5B527] hover:bg-[#bfa021] text-white hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent"></div>
                    <span>Verifying...</span>
                  </div>
                ) : (
                  'Verify Code'
                )}
              </button>

              <div className="text-center">
                <p className="text-gray-500 text-xs sm:text-sm">
                  Didn't receive the code?{' '}
                  <button
                    type="button"
                    onClick={resendCode}
                    disabled={timer > 0}
                    className={`font-semibold ${
                      timer > 0 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-[#8A1A1C] hover:text-[#5C1213]'
                    } transition-colors`}
                  >
                    {timer > 0 ? `Resend in ${timer}s` : 'Resend Code'}
                  </button>
                </p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-[#8A1A1C] bg-opacity-10 rounded-full mb-3 sm:mb-4">
                <FaLock className="text-[#8A1A1C] text-lg sm:text-2xl" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Create New Password</h2>
              <p className="text-gray-600 text-xs sm:text-sm px-2">Choose a strong password for your account</p>
            </div>

            <div onSubmit={handlePasswordSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="newPassword" className="block text-gray-700 font-semibold mb-2 text-xs sm:text-sm">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                    <FaLock className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                  </div>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className={`w-full pl-9 sm:pl-11 pr-10 sm:pr-12 py-2.5 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D5B527] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white text-sm sm:text-base ${
                      errors.newPassword ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder="Enter new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center hover:text-[#8A1A1C] transition-colors"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                    ) : (
                      <FaEye className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.newPassword}</p>
                )}
                <p className="text-gray-500 text-xs mt-1">Password must be at least 8 characters long</p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2 text-xs sm:text-sm">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                    <FaLock className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full pl-9 sm:pl-11 pr-10 sm:pr-12 py-2.5 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D5B527] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white text-sm sm:text-base ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder="Confirm new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center hover:text-[#8A1A1C] transition-colors"
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                    ) : (
                      <FaEye className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <button
                onClick={handlePasswordSubmit}
                disabled={isLoading || !formData.newPassword || !formData.confirmPassword}
                className={`w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 transform text-sm sm:text-base ${
                  isLoading || !formData.newPassword || !formData.confirmPassword
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#D5B527] hover:bg-[#bfa021] text-white hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent"></div>
                    <span>Updating Password...</span>
                  </div>
                ) : (
                  'Update Password'
                )}
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full mb-4 sm:mb-6">
              <FaCheckCircle className="text-green-500 text-2xl sm:text-3xl" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Password Reset Successful!</h2>
            <p className="text-gray-600 text-xs sm:text-sm mb-6 sm:mb-8 px-2">
              Your password has been successfully updated. You can now sign in with your new password.
            </p>
            
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-[#D5B527] hover:bg-[#bfa021] text-white py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 transform hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base"
            >
              Sign In Now
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#8A1A1C] to-[#5C1213] relative overflow-hidden px-4 py-8">
      {/* Brand section */}
      <div className="relative z-10 mb-6 sm:mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#D5B527] mb-1 sm:mb-2">BPI Alalay</h1>
        <p className="text-white text-opacity-90 text-xs sm:text-sm">Empowering educational journeys</p>
      </div>

      {/* Main Form Container */}
      <div className="relative z-10 bg-white bg-opacity-95 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md border border-white border-opacity-20">
        {/* Back Button */}
        {currentStep < 4 && (
          <div className="mb-4 sm:mb-6">
            <button
              onClick={() => {
                if (currentStep === 1) {
                  navigate('/login');
                } else {
                  setCurrentStep(currentStep - 1);
                  setErrors({});
                }
              }}
              className="flex items-center space-x-2 text-gray-600 hover:text-[#8A1A1C] transition-colors"
            >
              <FaArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm">Back</span>
            </button>
          </div>
        )}

        {/* Progress Indicator */}
        {currentStep < 4 && (
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-center space-x-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors ${
                    step <= currentStep
                      ? 'bg-[#D5B527]'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-center text-xs text-gray-500 mt-2">
              Step {currentStep} of 3
            </p>
          </div>
        )}

        {/* Step Content */}
        {renderStepContent()}

        {/* Footer */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            Remember your password?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-[#8A1A1C] hover:underline font-medium"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-6 sm:mt-8 text-center">
        <p className="text-white text-opacity-60 text-xs">
          © 2024 BPI Alalay. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;