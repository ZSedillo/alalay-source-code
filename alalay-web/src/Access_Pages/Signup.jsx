import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Phone, MapPin, Calendar, Upload, X } from "lucide-react";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dateOfBirth: "",
    address: "",
    city: "",
    province: "",
    zipCode: "",
    school: "",
    course: "",
    yearLevel: "",
    gpa: "",
    bio: "",
    profileImage: null
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalCountdown, setModalCountdown] = useState(10);
  const countdownRef = useRef();

  // Calculate completion percentage based on filled fields
  useEffect(() => {
    const totalFields = Object.keys(formData).length - 1; // Exclude profileImage as it's optional
    const filledFields = Object.values(formData).filter(value => {
      if (typeof value === 'string') return value.trim() !== '';
      return value !== null;
    }).length;
    
    const percentage = Math.round((filledFields / totalFields) * 100);
    setCompletionPercentage(percentage);
  }, [formData]);

  useEffect(() => {
    if (showSuccessModal) {
      setModalCountdown(10);
      countdownRef.current = setInterval(() => {
        setModalCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownRef.current);
            navigate('/Login');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(countdownRef.current);
    }
  }, [showSuccessModal, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Only allow numbers for phone number field
    if (name === 'phoneNumber') {
      const numbersOnly = value.replace(/[^0-9]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: numbersOnly
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profileImage: file
      }));
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      profileImage: null
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.username.trim()) newErrors.username = "Username is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords don't match";
    }

    if (step === 2) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    }

    if (step === 3) {
      if (!formData.school.trim()) newErrors.school = "School is required";
      if (!formData.course.trim()) newErrors.course = "Course is required";
      if (!formData.yearLevel) newErrors.yearLevel = "Year level is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      // Here you would typically send the data to your backend
      console.log("Form submitted:", formData);
      // Show modal instead of navigating immediately
      setShowSuccessModal(true);
    }
  };

  const handleModalSignIn = () => {
    setShowSuccessModal(false);
    navigate('/Login');
  };

  const handleBackToSelection = () => {
    navigate('/UserTypeSelection');
  };

  const handleLoginRedirect = () => {
    navigate('/Login');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Account Information</h2>
            
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                <User className="inline w-4 h-4 mr-1" />
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527] ${
                  errors.username ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Choose a unique username"
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                <Mail className="inline w-4 h-4 mr-1" />
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527] ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email address"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="relative">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527] ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Create a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div className="relative">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527] ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Personal Information</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">First Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527] ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Your first name"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Last Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527] ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Your last name"
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                <Phone className="inline w-4 h-4 mr-1" />
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527] ${
                  errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="09123456789"
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                <Calendar className="inline w-4 h-4 mr-1" />
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527] ${
                  errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                <MapPin className="inline w-4 h-4 mr-1" />
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527]"
                placeholder="Street address"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527]"
                  placeholder="City"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Province</label>
                <input
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527]"
                  placeholder="Province"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527]"
                  placeholder="ZIP"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Academic Information</h2>
            
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">School/University <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="school"
                value={formData.school}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527] ${
                  errors.school ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Your school or university"
              />
              {errors.school && <p className="text-red-500 text-sm mt-1">{errors.school}</p>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Course/Program <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527] ${
                  errors.course ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Your course or degree program"
              />
              {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Year Level <span className="text-red-500">*</span></label>
                <select
                  name="yearLevel"
                  value={formData.yearLevel}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527] ${
                    errors.yearLevel ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select year level</option>
                  <option value="1st-Year">1st Year</option>
                  <option value="2nd-Year">2nd Year</option>
                  <option value="3rd-Year">3rd Year</option>
                  <option value="4th-Year">4th Year</option>
                  <option value="5th-Year">5th Year</option>
                  <option value="Graduate">Graduate</option>
                </select>
                {errors.yearLevel && <p className="text-red-500 text-sm mt-1">{errors.yearLevel}</p>}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">GPA (Optional)</label>
                <input
                  type="number"
                  step="0.01"
                  min="1"
                  max="5"
                  name="gpa"
                  value={formData.gpa}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527]"
                  placeholder="e.g. 3.75"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Bio/About You</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527] resize-none"
                placeholder="Tell potential sponsors about yourself, your goals, and why you deserve support..."
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Profile Picture & Review</h2>
            
            <div className="text-center">
              <div className="relative inline-block">
                {formData.profileImage ? (
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(formData.profileImage)}
                      alt="Profile preview"
                      className="w-32 h-32 rounded-full object-cover border-4 border-[#D5B527]"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-dashed border-gray-300 flex items-center justify-center">
                    <Upload className="text-gray-400" size={32} />
                  </div>
                )}
              </div>
              
              <div className="mt-4">
                <label className="bg-[#D5B527] hover:bg-[#bfa021] text-white px-4 py-2 rounded-lg cursor-pointer transition">
                  {formData.profileImage ? 'Change Photo' : 'Upload Photo'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Review Your Information:</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</p>
                <p><span className="font-medium">Email:</span> {formData.email}</p>
                <p><span className="font-medium">Username:</span> {formData.username}</p>
                <p><span className="font-medium">School:</span> {formData.school}</p>
                <p><span className="font-medium">Course:</span> {formData.course}</p>
                <p><span className="font-medium">Year:</span> {formData.yearLevel}</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-blue-800 text-sm">
                By creating an account, you agree to our Terms of Service and Privacy Policy. 
                Your information will be used to connect you with potential sponsors and manage your scholarship applications.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8A1A1C] to-[#5C1213] flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-4 sm:p-8 relative overflow-hidden">
        {/* Header with back button */}
        <div className="mb-6">
          {/* On small screens, stack vertically; on sm+ screens, center with absolute back button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center relative">
            {/* Back button: top on mobile, left absolute on sm+ */}
            <button
              onClick={handleBackToSelection}
              className="text-gray-600 hover:text-gray-800 flex items-center text-sm sm:text-base mb-2 sm:mb-0 sm:absolute sm:left-0"
              style={{ minWidth: "fit-content" }}
            >
              ← Back to selection
            </button>
            <div className="flex-1 text-center">
              <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Student Registration</h1>
            </div>
            {/* Spacer for symmetry on sm+ */}
            <div className="hidden sm:block sm:absolute sm:right-0 sm:w-20"></div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-2 gap-1">
            <span className="text-xs sm:text-sm font-medium text-gray-600">Step {currentStep} of 4</span>
            <span className="text-xs sm:text-sm text-gray-500">{completionPercentage}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#D5B527] h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {renderStepContent()}
          </div>

          <div className="flex flex-col sm:flex-row justify-between mt-8 gap-2">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm sm:text-base"
              >
                Previous
              </button>
            )}
            
            <div className="ml-auto">
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-8 py-3 bg-[#D5B527] hover:bg-[#bfa021] text-white rounded-lg font-medium transition text-sm sm:text-base"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-[#8A1A1C] to-[#5C1213] text-white rounded-lg font-medium hover:opacity-90 transition text-sm sm:text-base"
                >
                  Create Account
                </button>
              )}
            </div>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-xs sm:text-sm">
            Already have an account?{" "}
            <button 
              onClick={handleLoginRedirect}
              className="text-[#8A1A1C] font-medium hover:underline"
            >
              Sign in here
            </button>
          </p>
        </div>

        {/* Success Modal */}
        {showSuccessModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
              background: "rgba(0,0,0,0.45)", // Proper opacity for overlay
              backdropFilter: "blur(1.5px)"
            }}
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center relative">
              <div className="flex flex-col items-center">
                <div className="mb-4">
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                    <circle cx="28" cy="28" r="28" fill="#D5B527"/>
                    <path d="M18 29l7 7 13-13" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-[#8A1A1C] mb-2">Account Created!</h2>
                <p className="text-gray-700 mb-4">Your account was successfully created.<br />You can now sign in and start your journey.</p>
                <p className="text-gray-500 text-sm mb-6">
                  Redirecting to sign in in <span className="font-semibold text-[#D5B527]">{modalCountdown}</span> seconds...
                </p>
                <button
                  onClick={handleModalSignIn}
                  className="w-full bg-gradient-to-r from-[#8A1A1C] to-[#5C1213] text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Sign In Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Signup;