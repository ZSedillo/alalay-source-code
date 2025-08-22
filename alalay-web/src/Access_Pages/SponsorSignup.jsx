import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Phone, MapPin, Building2, Upload, X, Briefcase } from "lucide-react";

function SponsorSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    organizationName: "",
    organizationType: "",
    contactPerson: "",
    phoneNumber: "",
    website: "",
    address: "",
    city: "",
    province: "",
    zipCode: "",
    description: "",
    profileImage: null
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [completionPercentage, setCompletionPercentage] = useState(0);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
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
      if (!formData.organizationName.trim()) newErrors.organizationName = "Organization name is required";
      if (!formData.organizationType.trim()) newErrors.organizationType = "Organization type is required";
      if (!formData.contactPerson.trim()) newErrors.contactPerson = "Contact person is required";
      if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      console.log("Sponsor form submitted:", formData);
      // Navigate to appropriate page after successful signup
      navigate('/Feed');
    }
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
                placeholder="Enter your organization email"
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
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Organization Information</h2>
            
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                <Building2 className="inline w-4 h-4 mr-1" />
                Organization Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527] ${
                  errors.organizationName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Your organization or company name"
              />
              {errors.organizationName && <p className="text-red-500 text-sm mt-1">{errors.organizationName}</p>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                <Briefcase className="inline w-4 h-4 mr-1" />
                Organization Type <span className="text-red-500">*</span>
              </label>
              <select
                name="organizationType"
                value={formData.organizationType}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527] ${
                  errors.organizationType ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select organization type</option>
                <option value="Corporation">Corporation</option>
                <option value="Non-Profit">Non-Profit Organization</option>
                <option value="Foundation">Foundation</option>
                <option value="Government">Government Agency</option>
                <option value="Educational">Educational Institution</option>
                <option value="Individual">Individual Sponsor</option>
                <option value="Other">Other</option>
              </select>
              {errors.organizationType && <p className="text-red-500 text-sm mt-1">{errors.organizationType}</p>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Contact Person <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527] ${
                  errors.contactPerson ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Primary contact person name"
              />
              {errors.contactPerson && <p className="text-red-500 text-sm mt-1">{errors.contactPerson}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
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
                <label className="block text-gray-700 text-sm font-medium mb-2">Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527]"
                  placeholder="https://www.yourorganization.com"
                />
              </div>
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
                placeholder="Organization address"
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
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Additional Information & Review</h2>
            
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Organization Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527] resize-none"
                placeholder="Describe your organization and its mission..."
              />
            </div>

            <div className="text-center">
              <div className="relative inline-block">
                {formData.profileImage ? (
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(formData.profileImage)}
                      alt="Profile picture preview"
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
                  {formData.profileImage ? 'Change Picture' : 'Upload Profile Picture'}
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
                <p><span className="font-medium">Organization:</span> {formData.organizationName}</p>
                <p><span className="font-medium">Type:</span> {formData.organizationType}</p>
                <p><span className="font-medium">Contact:</span> {formData.contactPerson}</p>
                <p><span className="font-medium">Email:</span> {formData.email}</p>
                <p><span className="font-medium">Username:</span> {formData.username}</p>
                <p><span className="font-medium">Phone:</span> {formData.phoneNumber}</p>
              </div>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <p className="text-amber-800 text-sm">
                By creating a sponsor account, you agree to our Terms of Service and Privacy Policy. 
                Your information will be used to connect you with students seeking scholarship opportunities.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8A1A1C] to-[#5C1213] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative overflow-hidden">
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBackToSelection}
            className="text-gray-600 hover:text-gray-800 flex items-center"
          >
            ← Back to selection
          </button>
          <div className="text-center">
            <h1 className="text-xl font-semibold text-gray-800">Sponsor Registration</h1>
          </div>
          <div className="w-20"></div> {/* Spacer for balance */}
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Step {currentStep} of 3</span>
            <span className="text-sm text-gray-500">{completionPercentage}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#D5B527] h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        <div>
          {renderStepContent()}

          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Previous
              </button>
            )}
            
            <div className="ml-auto">
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-8 py-3 bg-[#D5B527] hover:bg-[#bfa021] text-white rounded-lg font-medium transition"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-gradient-to-r from-[#8A1A1C] to-[#5C1213] text-white rounded-lg font-medium hover:opacity-90 transition"
                >
                  Create Sponsor Account
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <button 
              onClick={handleLoginRedirect}
              className="text-[#8A1A1C] font-medium hover:underline"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SponsorSignup;