import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../_actions/post.actions";
import { FaTimes, FaImage, FaDollarSign, FaEye, FaEyeSlash, FaPlus, FaMinus } from "react-icons/fa";

function NewPostModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    caption: "",
    audience: "public",
    tags: [],
    isFundingEnabled: false,
    fundingGoal: "",
    photos: [],
    previews: []
  });
  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // Log user ID whenever the component renders or user changes
  useEffect(() => {
    if (user) {
      console.log("Current User ID:", user._id);
    }
  }, [user]);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        caption: "",
        audience: "public",
        tags: [],
        isFundingEnabled: false,
        fundingGoal: "",
        photos: [],
        previews: []
      });
      setNewTag('');
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (newTag.trim() && !formData.tags.includes(newTag.trim().toLowerCase())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim().toLowerCase()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = [];
    const newPreviews = [];

    files.forEach(file => {
      if (formData.photos.length + newPhotos.length < 4) {
        newPhotos.push(file);
        newPreviews.push(URL.createObjectURL(file));
      }
    });

    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos],
      previews: [...prev.previews, ...newPreviews]
    }));
  };

  const handleRemovePhoto = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, index) => index !== indexToRemove),
      previews: prev.previews.filter((_, index) => index !== indexToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.caption.trim()) {
      newErrors.caption = 'Caption is required';
    }

    if (formData.isFundingEnabled) {
      if (!formData.fundingGoal || formData.fundingGoal <= 0) {
        newErrors.fundingGoal = 'Please enter a valid funding goal';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Log user ID when submitting the form
      console.log("Submitting post for User ID:", user._id);

      const formDataToSend = new FormData();
      formDataToSend.append("description", formData.caption);
      formDataToSend.append("visibility", formData.audience);
      
      // Add funding information
      if (formData.isFundingEnabled) {
        formDataToSend.append("isFundingEnabled", "true");
        formDataToSend.append("fundingGoal", formData.fundingGoal);
      } else {
        formDataToSend.append("isFundingEnabled", "false");
      }

      // Add tags
      if (formData.tags.length > 0) {
        formDataToSend.append("tags", JSON.stringify(formData.tags));
      }
      
      // Add user ID to form data if needed for debugging
      if (user._id) {
        formDataToSend.append("userId", user._id);
      }
      
      // Add photos
      formData.photos.forEach(photo => {
        formDataToSend.append("images", photo);
      });

      await dispatch(createPost(formDataToSend, user?.token)); // Redux action

      // Reset form after successful submission
      setFormData({
        caption: "",
        audience: "public",
        tags: [],
        isFundingEnabled: false,
        fundingGoal: "",
        photos: [],
        previews: []
      });
      setNewTag('');
      setErrors({});
      onClose();
    } catch (error) {
      console.error('Error creating post:', error);
      setErrors({ submit: 'Failed to create post. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Create New Post</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            disabled={isSubmitting}
          >
            <FaTimes className="text-gray-500" />
          </button>
        </div>

        {/* User Info and Audience */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {user?.scholarInfo?.firstName?.[0]}{user?.scholarInfo?.lastName?.[0]}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-800">
                  {user?.scholarInfo?.firstName} {user?.scholarInfo?.lastName}
                </span>
                <div className="text-sm text-gray-500">@{user?.username || 'username'}</div>
              </div>
            </div>
            <select
              name="audience"
              value={formData.audience}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isSubmitting}
            >
              <option value="public">🌍 Public</option>
              <option value="sponsors">🔒 Sponsors Only</option>
            </select>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Caption */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What's on your mind? *
            </label>
            <textarea
              name="caption"
              value={formData.caption}
              onChange={handleInputChange}
              placeholder="Share your thoughts, updates, or requests with the community..."
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                errors.caption ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            />
            {errors.caption && (
              <p className="text-red-500 text-sm mt-1">{errors.caption}</p>
            )}
            <div className="text-right text-sm text-gray-500 mt-1">
              {formData.caption.length}/500
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (Optional)
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                >
                  <span>#{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-blue-600 hover:text-blue-800"
                    disabled={isSubmitting}
                  >
                    <FaMinus size={10} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag(e)}
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm flex items-center space-x-1"
                disabled={isSubmitting || !newTag.trim()}
              >
                <FaPlus size={12} />
                <span>Add</span>
              </button>
            </div>
            <p className="text-gray-500 text-xs mt-1">
              Suggested: #study #project #funding #achievement #help
            </p>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images (Optional)
            </label>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {formData.previews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                    disabled={isSubmitting}
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              ))}
            </div>
            {formData.photos.length < 4 && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 transition-colors"
                disabled={isSubmitting}
              >
                <div className="text-center">
                  <FaImage className="text-gray-400 text-2xl mb-2 mx-auto" />
                  <p className="text-gray-500 text-sm">Click to add images</p>
                  <p className="text-gray-400 text-xs">Up to 4 images</p>
                </div>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
              className="hidden"
              disabled={isSubmitting}
            />
          </div>

          {/* Funding Options */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <input
                type="checkbox"
                id="fundingEnabled"
                name="isFundingEnabled"
                checked={formData.isFundingEnabled}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                disabled={isSubmitting}
              />
              <label htmlFor="fundingEnabled" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <FaDollarSign className="text-green-600" />
                <span>Enable funding for this post</span>
              </label>
            </div>
            
            {formData.isFundingEnabled && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Funding Goal (PHP) *
                  </label>
                  <input
                    type="number"
                    name="fundingGoal"
                    value={formData.fundingGoal}
                    onChange={handleInputChange}
                    placeholder="25000"
                    min="1"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.fundingGoal ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.fundingGoal && (
                    <p className="text-red-500 text-sm mt-1">{errors.fundingGoal}</p>
                  )}
                  {formData.fundingGoal && !errors.fundingGoal && (
                    <p className="text-green-600 text-sm mt-1">
                      Goal: {formatCurrency(formData.fundingGoal)}
                    </p>
                  )}
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    💡 <strong>Tip:</strong> Be specific about what the funding will be used for. 
                    This helps sponsors understand how their contribution will make an impact.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Preview */}
          {formData.caption && (
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-3">Preview</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {user?.scholarInfo?.firstName?.[0]}{user?.scholarInfo?.lastName?.[0]}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">
                      {user?.scholarInfo?.firstName} {user?.scholarInfo?.lastName}
                    </div>
                    <div className="text-sm text-gray-500">Just now</div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    formData.audience === 'public' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {formData.audience === 'public' ? '🌍 Public' : '🔒 Sponsors Only'}
                  </span>
                </div>
                <p className="text-gray-700 mb-2">{formData.caption}</p>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                {formData.isFundingEnabled && formData.fundingGoal && (
                  <div className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-medium inline-block">
                    💰 Funding Goal: {formatCurrency(formData.fundingGoal)}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Error Message */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">{errors.submit}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.caption.trim()}
              className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                isSubmitting || !formData.caption.trim()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#D5B527] hover:bg-[#bfa021] text-white'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Creating Post...</span>
                </div>
              ) : (
                'Post'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewPostModal;