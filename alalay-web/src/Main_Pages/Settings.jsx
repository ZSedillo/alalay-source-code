import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../_components/Sidebar";
import { 
  User, 
  Shield, 
  Bell, 
  Lock, 
  Settings as SettingsIcon,
  Save,
  Eye,
  EyeOff,
  Check,
  X,
  AlertTriangle,
  Camera,
  Edit2,
  Trash2
} from "lucide-react";

function Settings() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');
  const [userType, setUserType] = useState('student');
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    // Profile settings
    username: 'juancruz',
    email: 'juan.delacruz@email.com',
    fullName: 'Juan Dela Cruz',
    phone: '+63 912 345 6789',
    bio: 'Computer Science student passionate about technology and education.',
    profileImage: null,
    
    // Account settings
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    
    // Notification settings
    emailNotifications: true,
    scholarshipAlerts: true,
    messageNotifications: true,
    monthlyReports: false,
    desktopNotifications: true,
    
    // Privacy settings
    profileVisibility: 'public',
    showContactInfo: false,
    allowMessages: true,
    searchableProfile: true,
    
    // Student-specific
    yearLevel: '4th-Year',
    fieldOfStudy: 'Computer Science',
    gpa: '1.75',
    university: 'BPI University',
    
    // Sponsor-specific
    companyName: '',
    industry: '',
    donationPreference: 'monthly'
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (section) => {
    const newErrors = {};

    if (section === 'profile') {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.username.trim()) newErrors.username = 'Username is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    }

    if (section === 'account') {
      if (formData.newPassword) {
        if (!formData.currentPassword) newErrors.currentPassword = 'Current password required';
        if (formData.newPassword.length < 8) newErrors.newPassword = 'Password must be at least 8 characters';
        if (formData.newPassword !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (section) => {
    if (!validateForm(section)) return;

    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log(`Saving ${section}:`, formData);
      setHasChanges(false);
      
      // Show success message
      const message = document.createElement('div');
      message.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all';
      message.textContent = 'Settings saved successfully!';
      document.body.appendChild(message);
      setTimeout(() => message.remove(), 3000);
      
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  const settingSections = [
    { id: 'profile', name: 'Profile', icon: User, description: 'Personal information and bio' },
    { id: 'account', name: 'Account & Security', icon: Shield, description: 'Password and security settings' },
    { id: 'notifications', name: 'Notifications', icon: Bell, description: 'Email and push notifications' },
    { id: 'privacy', name: 'Privacy', icon: Lock, description: 'Profile visibility and data' },
    { id: 'preferences', name: 'Preferences', icon: SettingsIcon, description: 'App preferences and account type' }
  ];

  const FormField = ({ label, required, error, children, description }) => (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-900">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {description && <p className="text-xs text-gray-500">{description}</p>}
      {children}
      {error && (
        <div className="flex items-center space-x-1 text-red-600 text-xs">
          <X size={12} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );

  const ToggleSwitch = ({ checked, onChange, disabled = false }) => (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D5B527] ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${
        checked ? 'bg-[#D5B527]' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const renderProfileSettings = () => (
    <div className="space-y-8">
      {/* Profile Image Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Profile Picture</h3>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-[#8A1A1C] to-[#5C1213] rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {formData.fullName.split(' ').map(n => n[0]).join('')}
            </div>
            <button className="absolute -bottom-1 -right-1 bg-white border-2 border-gray-200 rounded-full p-1.5 hover:bg-gray-50 transition-colors">
              <Camera size={14} className="text-gray-600" />
            </button>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-2">
              Upload a new profile picture. Recommended size: 400x400px
            </p>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-[#D5B527] text-white rounded-lg text-sm font-medium hover:bg-[#bfa021] transition-colors">
                Upload New
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormField label="Full Name" required error={errors.fullName}>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527] focus:border-transparent"
              placeholder="Enter your full name"
            />
          </FormField>

          <FormField label="Username" required error={errors.username}>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527] focus:border-transparent"
              placeholder="Choose a unique username"
            />
          </FormField>

          <FormField label="Email Address" required error={errors.email}>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527] focus:border-transparent"
              placeholder="your.email@example.com"
            />
          </FormField>

          <FormField label="Phone Number" error={errors.phone}>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527] focus:border-transparent"
              placeholder="+63 912 345 6789"
            />
          </FormField>
        </div>

        <div className="mt-6">
          <FormField label="Bio" description="Tell others about yourself in a few sentences">
            <textarea
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527] focus:border-transparent resize-none"
              placeholder="Write something about yourself..."
              maxLength={500}
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {formData.bio.length}/500 characters
            </div>
          </FormField>
        </div>
      </div>

      {/* Academic Information (for students) */}
      {userType === 'student' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Academic Information</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FormField label="Year Level">
              <select
                value={formData.yearLevel}
                onChange={(e) => handleInputChange('yearLevel', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527] focus:border-transparent"
              >
                <option value="">Select year level</option>
                <option value="1st-Year">1st Year</option>
                <option value="2nd-Year">2nd Year</option>
                <option value="3rd-Year">3rd Year</option>
                <option value="4th-Year">4th Year</option>
                <option value="5th-Year">5th Year</option>
                <option value="Graduate">Graduate</option>
              </select>
            </FormField>

            <FormField label="Field of Study">
              <input
                type="text"
                value={formData.fieldOfStudy}
                onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527] focus:border-transparent"
                placeholder="e.g., Computer Science"
              />
            </FormField>

            <FormField label="University">
              <input
                type="text"
                value={formData.university}
                onChange={(e) => handleInputChange('university', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527] focus:border-transparent"
                placeholder="Your university name"
              />
            </FormField>

            <FormField label="GPA/GWA">
              <input
                type="text"
                value={formData.gpa}
                onChange={(e) => handleInputChange('gpa', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527] focus:border-transparent"
                placeholder="e.g., 1.75"
              />
            </FormField>
          </div>
        </div>
      )}

      {/* Organization Information (for sponsors) */}
      {userType === 'sponsor' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Organization Information</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FormField label="Company/Organization">
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527] focus:border-transparent"
                placeholder="Your organization name"
              />
            </FormField>

            <FormField label="Industry">
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527] focus:border-transparent"
                placeholder="e.g., Technology, Finance"
              />
            </FormField>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={() => handleSave('profile')}
          disabled={saving}
          className="flex items-center space-x-2 px-6 py-3 bg-[#D5B527] text-white rounded-lg font-medium hover:bg-[#bfa021] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save size={16} />
          )}
          <span>{saving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>
    </div>
  );

  const renderAccountSecurity = () => (
    <div className="space-y-8">
      {/* Password Change */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Change Password</h3>
        <div className="space-y-6 max-w-md">
          <FormField label="Current Password" required error={errors.currentPassword}>
            <div className="relative">
              <input
                type={showPassword.current ? "text" : "password"}
                value={formData.currentPassword}
                onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527] focus:border-transparent"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => ({ ...prev, current: !prev.current }))}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword.current ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </FormField>

          <FormField label="New Password" required error={errors.newPassword}>
            <div className="relative">
              <input
                type={showPassword.new ? "text" : "password"}
                value={formData.newPassword}
                onChange={(e) => handleInputChange('newPassword', e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527] focus:border-transparent"
                placeholder="Create new password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => ({ ...prev, new: !prev.new }))}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword.new ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </FormField>

          <FormField label="Confirm New Password" required error={errors.confirmPassword}>
            <div className="relative">
              <input
                type={showPassword.confirm ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527] focus:border-transparent"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </FormField>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Two-Factor Authentication</h3>
            <p className="text-gray-600 text-sm mt-1">Add an extra layer of security to your account</p>
          </div>
          <ToggleSwitch
            checked={formData.twoFactorEnabled}
            onChange={(checked) => handleInputChange('twoFactorEnabled', checked)}
          />
        </div>
        
        {formData.twoFactorEnabled && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2 text-green-800">
              <Check size={16} />
              <span className="font-medium">Two-factor authentication is enabled</span>
            </div>
            <p className="text-green-700 text-sm mt-2">
              Your account is protected with two-factor authentication
            </p>
          </div>
        )}
      </div>

      {/* Login Sessions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Active Sessions</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <p className="font-medium text-gray-900">Current Session</p>
                <p className="text-sm text-gray-600">Chrome on Windows • Quezon City, Philippines</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">Active now</span>
          </div>
        </div>
        <button className="mt-4 text-red-600 hover:text-red-700 text-sm font-medium">
          Sign out of all other sessions
        </button>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => handleSave('account')}
          disabled={saving}
          className="flex items-center space-x-2 px-6 py-3 bg-[#D5B527] text-white rounded-lg font-medium hover:bg-[#bfa021] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save size={16} />
          )}
          <span>{saving ? 'Saving...' : 'Update Security'}</span>
        </button>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Email Notifications</h3>
        <div className="space-y-6">
          {[
            { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive general notifications via email' },
            { key: 'scholarshipAlerts', label: 'Scholarship Alerts', desc: 'Get notified about new scholarship opportunities' },
            { key: 'messageNotifications', label: 'Message Notifications', desc: 'Notifications for new direct messages' },
            { key: 'monthlyReports', label: 'Monthly Reports', desc: 'Receive monthly activity and progress reports' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-3">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{item.label}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
              <ToggleSwitch
                checked={formData[item.key]}
                onChange={(checked) => handleInputChange(item.key, checked)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Push Notifications</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between py-3">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">Desktop Notifications</h4>
              <p className="text-sm text-gray-600">Show notifications on your desktop when the app is open</p>
            </div>
            <ToggleSwitch
              checked={formData.desktopNotifications}
              onChange={(checked) => handleInputChange('desktopNotifications', checked)}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => handleSave('notifications')}
          disabled={saving}
          className="flex items-center space-x-2 px-6 py-3 bg-[#D5B527] text-white rounded-lg font-medium hover:bg-[#bfa021] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save size={16} />
          )}
          <span>{saving ? 'Saving...' : 'Save Preferences'}</span>
        </button>
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Profile Visibility</h3>
        <div className="space-y-6">
          <FormField label="Who can view your profile">
            <select
              value={formData.profileVisibility}
              onChange={(e) => handleInputChange('profileVisibility', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527] focus:border-transparent"
            >
              <option value="public">Public - Anyone can view</option>
              <option value="verified">Verified Users Only</option>
              <option value="private">Private - By invitation only</option>
            </select>
          </FormField>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Show Contact Information</h4>
                <p className="text-sm text-gray-600">Allow others to see your email and phone number</p>
              </div>
              <ToggleSwitch
                checked={formData.showContactInfo}
                onChange={(checked) => handleInputChange('showContactInfo', checked)}
              />
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Allow Direct Messages</h4>
                <p className="text-sm text-gray-600">Let other users send you private messages</p>
              </div>
              <ToggleSwitch
                checked={formData.allowMessages}
                onChange={(checked) => handleInputChange('allowMessages', checked)}
              />
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Searchable Profile</h4>
                <p className="text-sm text-gray-600">Allow your profile to appear in search results</p>
              </div>
              <ToggleSwitch
                checked={formData.searchableProfile}
                onChange={(checked) => handleInputChange('searchableProfile', checked)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Data & Privacy</h3>
        <div className="space-y-4">
          <button className="flex items-center justify-between w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-left">
              <h4 className="font-medium text-gray-900">Download Your Data</h4>
              <p className="text-sm text-gray-600">Get a copy of your data in a downloadable format</p>
            </div>
            <Edit2 size={16} className="text-gray-400" />
          </button>

          <button className="flex items-center justify-between w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-left">
              <h4 className="font-medium text-gray-900">Data Usage</h4>
              <p className="text-sm text-gray-600">View how your data is being used</p>
            </div>
            <Edit2 size={16} className="text-gray-400" />
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => handleSave('privacy')}
          disabled={saving}
          className="flex items-center space-x-2 px-6 py-3 bg-[#D5B527] text-white rounded-lg font-medium hover:bg-[#bfa021] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save size={16} />
          )}
          <span>{saving ? 'Saving...' : 'Save Privacy Settings'}</span>
        </button>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Account Type</h3>
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">Choose the account type that best describes you</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setUserType('student')}
              className={`p-6 border-2 rounded-xl transition-all ${
                userType === 'student'
                  ? 'border-[#D5B527] bg-yellow-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-left">
                <div className="text-2xl mb-2">🎓</div>
                <h4 className="font-semibold text-gray-900 mb-1">Student</h4>
                <p className="text-sm text-gray-600">I'm a student looking for scholarships and educational opportunities</p>
              </div>
            </button>

            <button
              onClick={() => setUserType('sponsor')}
              className={`p-6 border-2 rounded-xl transition-all ${
                userType === 'sponsor'
                  ? 'border-[#D5B527] bg-yellow-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-left">
                <div className="text-2xl mb-2">🏢</div>
                <h4 className="font-semibold text-gray-900 mb-1">Sponsor</h4>
                <p className="text-sm text-gray-600">I want to support students through scholarships and donations</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {userType === 'sponsor' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Donation Preferences</h3>
          <FormField label="Preferred Donation Frequency">
            <select
              value={formData.donationPreference}
              onChange={(e) => handleInputChange('donationPreference', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527] focus:border-transparent"
            >
              <option value="monthly">Monthly Donations</option>
              <option value="quarterly">Quarterly Donations</option>
              <option value="annual">Annual Donations</option>
              <option value="one-time">One-time Donations</option>
            </select>
          </FormField>
        </div>
      )}

      {/* Danger Zone */}
      <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
        <h3 className="text-xl font-semibold text-red-800 mb-4 flex items-center">
          <AlertTriangle size={20} className="mr-2" />
          Danger Zone
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-red-800 mb-2">Delete Account</h4>
                <p className="text-red-700 text-sm mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone and you will lose access to all your scholarship applications, messages, and profile information.
                </p>
                <ul className="text-red-700 text-sm space-y-1 mb-4">
                  <li>• All your personal data will be permanently deleted</li>
                  <li>• Active scholarship applications will be cancelled</li>
                  <li>• Message history will be lost</li>
                  <li>• This action cannot be reversed</li>
                </ul>
              </div>
            </div>
            <button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              <Trash2 size={14} />
              <span>Delete My Account</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => handleSave('preferences')}
          disabled={saving}
          className="flex items-center space-x-2 px-6 py-3 bg-[#D5B527] text-white rounded-lg font-medium hover:bg-[#bfa021] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save size={16} />
          )}
          <span>{saving ? 'Saving...' : 'Save Preferences'}</span>
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile': return renderProfileSettings();
      case 'account': return renderAccountSecurity();
      case 'notifications': return renderNotifications();
      case 'privacy': return renderPrivacy();
      case 'preferences': return renderPreferences();
      default: return renderProfileSettings();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="md:ml-64">
        {/* Mobile header spacing */}
        <div className="h-16 md:h-0" />
        
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-[52px] md:top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600 mt-1 text-sm md:text-base">Manage your account preferences and security settings</p>
              </div>
              {hasChanges && (
                <div className="hidden md:flex items-center space-x-2 text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
                  <AlertTriangle size={16} />
                  <span>You have unsaved changes</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sticky top-32">
                <nav className="space-y-2">
                  {settingSections.map((section) => {
                    const IconComponent = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full text-left px-4 py-4 rounded-lg flex items-start space-x-3 transition-all duration-200 ${
                          activeSection === section.id
                            ? 'bg-gradient-to-r from-[#8A1A1C] to-[#5C1213] text-white shadow-md'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <IconComponent size={20} className={`mt-0.5 flex-shrink-0 ${
                          activeSection === section.id ? 'text-white' : 'text-gray-400'
                        }`} />
                        <div>
                          <div className="font-semibold">{section.name}</div>
                          <div className={`text-xs mt-0.5 ${
                            activeSection === section.id ? 'text-red-100' : 'text-gray-500'
                          }`}>
                            {section.description}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </nav>

                {/* Mobile warning for unsaved changes */}
                {hasChanges && (
                  <div className="mt-4 lg:hidden flex items-center space-x-2 text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
                    <AlertTriangle size={16} />
                    <span>Unsaved changes</span>
                  </div>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;