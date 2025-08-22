import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../_components/Sidebar";

function Settings() {
  const [activeSection, setActiveSection] = useState('profile');
  const [userType, setUserType] = useState('student'); // or 'sponsor'
  const [formData, setFormData] = useState({
    // Profile settings
    username: '',
    email: '',
    fullName: '',
    phone: '',
    bio: '',
    
    // Account settings
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    
    // Notification settings
    emailNotifications: true,
    scholarshipAlerts: true,
    messageNotifications: true,
    monthlyReports: false,
    
    // Privacy settings
    profileVisibility: 'public',
    showContactInfo: false,
    allowMessages: true,
    
    // Student-specific
    yearLevel: '',
    fieldOfStudy: '',
    gpa: '',
    
    // Sponsor-specific
    companyName: '',
    industry: '',
    donationPreference: 'monthly'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = (section) => {
    // Handle save logic here
    console.log(`Saving ${section}:`, formData);
    alert(`${section.charAt(0).toUpperCase() + section.slice(1)} settings saved successfully!`);
  };

  const settingSections = [
    { id: 'profile', name: 'Profile Settings', icon: '👤' },
    { id: 'account', name: 'Account Security', icon: '🔐' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'privacy', name: 'Privacy', icon: '🔒' },
    { id: 'preferences', name: 'Preferences', icon: '⚙️' }
  ];

  const renderProfileSettings = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Information</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Choose a unique username"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>

        {userType === 'student' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year Level</label>
              <select
                value={formData.yearLevel}
                onChange={(e) => handleInputChange('yearLevel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                  <option value="">Select year level</option>
                  <option value="1st-Year">1st Year</option>
                  <option value="2nd-Year">2nd Year</option>
                  <option value="3rd-Year">3rd Year</option>
                  <option value="4th-Year">4th Year</option>
                  <option value="5th-Year">5th Year</option>
                  <option value="Graduate">Graduate</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study</label>
              <input
                type="text"
                value={formData.fieldOfStudy}
                onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="e.g., Computer Science"
              />
            </div>
          </div>
        )}

        {userType === 'sponsor' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company/Organization</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Your organization name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="e.g., Technology, Finance"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
          <textarea
            value={formData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Tell us about yourself..."
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => handleSave('profile')}
            className="bg-[#D5B527] hover:bg-[#bfa021] text-white px-6 py-2 rounded-md transition-colors duration-200"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  const renderAccountSecurity = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Security</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
          <input
            type="password"
            value={formData.currentPassword}
            onChange={(e) => handleInputChange('currentPassword', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter current password"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              value={formData.newPassword}
              onChange={(e) => handleInputChange('newPassword', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Create new password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Confirm new password"
            />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-md">
          <h4 className="font-medium text-gray-800 mb-2">Two-Factor Authentication</h4>
          <p className="text-sm text-gray-600 mb-3">Add an extra layer of security to your account</p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200">
            Enable 2FA
          </button>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => handleSave('account')}
            className="bg-[#D5B527] hover:bg-[#bfa021] text-white px-6 py-2 rounded-md transition-colors duration-200"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Preferences</h3>
      <div className="space-y-4">
        {[
          { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
          { key: 'scholarshipAlerts', label: 'Scholarship Alerts', desc: 'Get notified about new scholarship opportunities' },
          { key: 'messageNotifications', label: 'Message Notifications', desc: 'Notifications for new messages' },
          { key: 'monthlyReports', label: 'Monthly Reports', desc: 'Receive monthly activity reports' }
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
            <div>
              <h4 className="font-medium text-gray-800">{item.label}</h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData[item.key]}
                onChange={(e) => handleInputChange(item.key, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D5B527]"></div>
            </label>
          </div>
        ))}

        <div className="flex justify-end">
          <button
            onClick={() => handleSave('notifications')}
            className="bg-[#D5B527] hover:bg-[#bfa021] text-white px-6 py-2 rounded-md transition-colors duration-200"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Privacy Settings</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
          <select
            value={formData.profileVisibility}
            onChange={(e) => handleInputChange('profileVisibility', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="public">Public - Anyone can view</option>
            <option value="verified">Verified Users Only</option>
            <option value="private">Private - By invitation only</option>
          </select>
        </div>

        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
          <div>
            <h4 className="font-medium text-gray-800">Show Contact Information</h4>
            <p className="text-sm text-gray-600">Allow others to see your email and phone</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.showContactInfo}
              onChange={(e) => handleInputChange('showContactInfo', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D5B527]"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
          <div>
            <h4 className="font-medium text-gray-800">Allow Direct Messages</h4>
            <p className="text-sm text-gray-600">Let other users send you private messages</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.allowMessages}
              onChange={(e) => handleInputChange('allowMessages', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D5B527]"></div>
          </label>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => handleSave('privacy')}
            className="bg-[#D5B527] hover:bg-[#bfa021] text-white px-6 py-2 rounded-md transition-colors duration-200"
          >
            Save Privacy Settings
          </button>
        </div>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Preferences</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
          <div className="flex space-x-4">
            <button
              onClick={() => setUserType('student')}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                userType === 'student'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🎓 Student
            </button>
            <button
              onClick={() => setUserType('sponsor')}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                userType === 'sponsor'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🏢 Sponsor
            </button>
          </div>
        </div>

        {userType === 'sponsor' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Donation Preference</label>
            <select
              value={formData.donationPreference}
              onChange={(e) => handleInputChange('donationPreference', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="monthly">Monthly Donations</option>
              <option value="quarterly">Quarterly Donations</option>
              <option value="annual">Annual Donations</option>
              <option value="one-time">One-time Donations</option>
            </select>
          </div>
        )}

        <div className="bg-red-50 p-4 rounded-md border border-red-200">
          <h4 className="font-medium text-red-800 mb-2">⚠️ Delete Account</h4>
          <p className="text-sm text-red-700 mb-3">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200">
            Delete Account
          </button>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => handleSave('preferences')}
            className="bg-[#D5B527] hover:bg-[#bfa021] text-white px-6 py-2 rounded-md transition-colors duration-200"
          >
            Save Preferences
          </button>
        </div>
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
      <div className="ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
            <p className="text-gray-600">Manage your account preferences and security settings</p>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Navigation */}
            <div className="w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <nav className="space-y-2">
                  {settingSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-md flex items-center space-x-3 transition-colors duration-200 ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-[#8A1A1C] to-[#5C1213] text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span className="text-lg">{section.icon}</span>
                      <span className="font-medium">{section.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;