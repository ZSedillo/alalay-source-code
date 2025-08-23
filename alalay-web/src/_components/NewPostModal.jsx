import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../_actions/post.actions";
import { FaTimes, FaImage, FaDollarSign, FaEye, FaEyeSlash, FaPlus, FaMinus, FaGlobe, FaLock } from "react-icons/fa";
import { CheckCircle } from "lucide-react";

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
  const [newTag, setNewTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef(null);

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
      setNewTag("");
      setErrors({});
      setIsSubmitting(false);
      setSuccessMessage("");
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    const cleaned = newTag.trim().toLowerCase();
    if (cleaned && !formData.tags.includes(cleaned)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, cleaned]
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove)
    }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const newPhotos = [];
    const newPreviews = [];

    files.forEach((file) => {
      if (formData.photos.length + newPhotos.length < 4) {
        newPhotos.push(file);
        newPreviews.push(URL.createObjectURL(file));
      }
    });

    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos],
      previews: [...prev.previews, ...newPreviews]
    }));
  };

  const handleRemovePhoto = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, index) => index !== indexToRemove),
      previews: prev.previews.filter((_, index) => index !== indexToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.caption.trim()) {
      newErrors.caption = "Caption is required";
    }

    if (formData.isFundingEnabled) {
      const goal = Number(formData.fundingGoal);
      if (!goal || goal <= 0) {
        newErrors.fundingGoal = "Please enter a valid funding goal";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Mock success: no API call, no error path
    setTimeout(() => {
      console.log("Mock post published for User ID:", user?._id);

      // Reset form
      setFormData({
        caption: "",
        audience: "public",
        tags: [],
        isFundingEnabled: false,
        fundingGoal: "",
        photos: [],
        previews: []
      });
      setNewTag("");
      setErrors({});
      setIsSubmitting(false);

      // Show toast and auto-close
      setSuccessMessage("Post published successfully!");
      setTimeout(() => {
        setSuccessMessage("");
        onClose();
      }, 1800);
    }, 700);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP"
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-md bg-black/30"
        onClick={onClose}
      />

      {/* Modal container */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 bg-gradient-to-r from-red-50 to-rose-50 border-b border-red-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create New Post</h2>
            <p className="text-sm text-gray-600 mt-1">
              Share your story with the community
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-xl transition-all duration-200 group"
            disabled={isSubmitting}
            aria-label="Close"
          >
            <FaTimes className="text-gray-500 group-hover:text-gray-700 w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto max-h-[calc(95vh-88px)]">
          {/* User Info and Audience */}
          <div className="px-8 py-6 bg-white border-b border-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#8A1A1C] to-[#5C1213] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-lg font-bold text-white">
                    {user?.scholarInfo?.firstName?.[0]}
                    {user?.scholarInfo?.lastName?.[0]}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-lg">
                    {user?.scholarInfo?.firstName} {user?.scholarInfo?.lastName}
                  </div>
                  <div className="text-sm text-gray-500">
                    @{user?.username || "username"}
                  </div>
                </div>
              </div>

              <div className="relative">
                <select
                  name="audience"
                  value={formData.audience}
                  onChange={handleInputChange}
                  className="appearance-none bg-white border-2 border-red-200 rounded-xl px-4 py-3 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#D5B527] focus:border-[#D5B527] transition-all duration-200 cursor-pointer hover:border-red-300"
                  disabled={isSubmitting}
                >
                  <option value="public">🌍 Public</option>
                  <option value="sponsors">🔒 Sponsors Only</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-8">
            {/* Caption */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-900">
                What's on your mind? <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  name="caption"
                  value={formData.caption}
                  onChange={handleInputChange}
                  placeholder="Share your thoughts, updates, milestones, or requests with the community..."
                  rows={5}
                  maxLength={500}
                  className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-[#D5B527] focus:border-[#D5B527] resize-none transition-all duration-200 text-gray-900 placeholder-gray-400 ${
                    errors.caption
                      ? "border-red-300 bg-red-50"
                      : "border-red-200 hover:border-red-300"
                  }`}
                  disabled={isSubmitting}
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                  {formData.caption.length}/500
                </div>
              </div>
              {errors.caption && (
                <div className="flex items-center space-x-2 text-red-600 text-sm">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{errors.caption}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-900">
                Tags
              </label>

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-[#D5B527] to-[#E6C547] text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 border border-[#D5B527]"
                    >
                      <span>#{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-white hover:text-gray-200 transition-colors"
                        disabled={isSubmitting}
                        aria-label={`Remove tag ${tag}`}
                      >
                        <FaTimes size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <div className="flex space-x-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag (e.g., study, project, funding)..."
                    className="w-full px-4 py-3 border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-[#D5B527] focus:border-[#D5B527] text-sm transition-all duration-200 hover:border-red-300"
                    onKeyDown={(e) => e.key === "Enter" && handleAddTag(e)}
                    disabled={isSubmitting}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="bg-gradient-to-r from-[#D5B527] to-[#E6C547] text-white px-6 py-3 rounded-xl hover:from-[#bfa021] hover:to-[#D5B527] transition-all duration-200 text-sm font-medium flex items-center space-x-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting || !newTag.trim()}
                >
                  <FaPlus size={12} />
                  <span>Add</span>
                </button>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-800 text-sm">
                  <span className="font-medium">Suggested tags:</span> #study
                  #project #funding #achievement #help #milestone #scholarship
                </p>
              </div>
            </div>

            {/* Images */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-900">
                Images
              </label>

              {formData.previews.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {formData.previews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-40 object-cover rounded-xl border-2 border-gray-200 shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(index)}
                        className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-lg"
                        disabled={isSubmitting}
                        aria-label="Remove image"
                      >
                        <FaTimes size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {formData.photos.length < 4 && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-40 border-2 border-dashed border-red-300 rounded-xl flex items-center justify-center hover:border-[#D5B527] hover:bg-red-50 transition-all duration-200 group"
                  disabled={isSubmitting}
                >
                  <div className="text-center">
                    <FaImage className="text-red-400 group-hover:text-[#D5B527] text-3xl mb-3 mx-auto transition-colors duration-200" />
                    <p className="text-red-600 group-hover:text-[#D5B527] font-medium">
                      Click to add images
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      Up to 4 images • JPG, PNG, GIF
                    </p>
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
            <div className="border-2 border-red-200 rounded-xl p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="fundingEnabled"
                  name="isFundingEnabled"
                  checked={formData.isFundingEnabled}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-[#D5B527] border-2 border-red-300 rounded focus:ring-[#D5B527] focus:ring-2"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="fundingEnabled"
                  className="flex items-center space-x-3 text-base font-semibold text-gray-900 cursor-pointer"
                >
                  <FaDollarSign className="text-green-600 w-5 h-5" />
                  <span>Enable funding for this post</span>
                </label>
              </div>

              {formData.isFundingEnabled && (
                <div className="space-y-4 pt-4 border-t border-red-200">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Funding Goal (PHP) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="fundingGoal"
                      value={formData.fundingGoal}
                      onChange={handleInputChange}
                      placeholder="25000"
                      min="1"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-[#D5B527] focus:border-[#D5B527] transition-all duration-200 text-lg font-medium ${
                        errors.fundingGoal
                          ? "border-red-300 bg-red-50"
                          : "border-red-200 hover:border-red-300"
                      }`}
                      disabled={isSubmitting}
                    />
                    {errors.fundingGoal && (
                      <div className="flex items-center space-x-2 text-red-600 text-sm mt-2">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{errors.fundingGoal}</span>
                      </div>
                    )}
                    {formData.fundingGoal && !errors.fundingGoal && (
                      <div className="bg-green-50 border border-green-200 rounded-xl p-3 mt-3">
                        <p className="text-green-800 font-medium">
                          Target: {formatCurrency(formData.fundingGoal)}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-red-600 mt-0.5">💡</div>
                      <div>
                        <p className="text-red-900 font-medium text-sm">
                          Pro Tip
                        </p>
                        <p className="text-red-800 text-sm mt-1">
                          Be specific about what the funding will be used for.
                          This helps sponsors understand how their contribution
                          will make an impact on your educational journey.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Preview */}
            {formData.caption && (
              <div className="border-2 border-red-200 rounded-xl p-6 bg-gradient-to-br from-red-50 to-rose-50">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <FaEye className="text-[#8A1A1C]" />
                  <span>Post Preview</span>
                </h3>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#8A1A1C] to-[#5C1213] rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-white">
                        {user?.scholarInfo?.firstName?.[0]}
                        {user?.scholarInfo?.lastName?.[0]}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">
                        {user?.scholarInfo?.firstName}{" "}
                        {user?.scholarInfo?.lastName}
                      </div>
                      <div className="text-sm text-gray-500">Just now</div>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-semibold border ${
                        formData.audience === "public"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-purple-100 text-purple-700 border-purple-200"
                      }`}
                    >
                      {formData.audience === "public" ? (
                        <>
                          <FaGlobe className="inline mr-1" /> Public
                        </>
                      ) : (
                        <>
                          <FaLock className="inline mr-1" /> Sponsors Only
                        </>
                      )}
                    </span>
                  </div>

                  <p className="text-gray-800 mb-3 leading-relaxed">
                    {formData.caption}
                  </p>

                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {formData.isFundingEnabled && formData.fundingGoal && (
                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 text-green-800 px-4 py-3 rounded-xl text-sm font-semibold inline-block">
                      Funding Goal: {formatCurrency(formData.fundingGoal)}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* (Optional) Error Message for submit – will not be used in mock mode */}
            {errors.submit && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-red-800 font-medium">{errors.submit}</p>
                </div>
              </div>
            )}
          </form>

          {/* Action Buttons */}
          <div className="flex items-center justify-between px-8 py-6 bg-gradient-to-r from-red-50 to-rose-50 border-t border-red-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200 hover:bg-gray-200 rounded-xl"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.caption.trim()}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl ${
                isSubmitting || !formData.caption.trim()
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#D5B527] to-[#E6C547] hover:from-[#bfa021] hover:to-[#D5B527] text-white"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Publishing Post...</span>
                </>
              ) : (
                <>
                  <span>Publish Post</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Success Toast (no emojis) */}
      {successMessage && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          {/* Blurred background */}
          <div className="absolute inset-0 backdrop-blur-sm bg-black/40" />

          {/* Success Card */}
          <div className="relative bg-white px-8 py-6 rounded-2xl shadow-2xl border border-green-200 flex items-center space-x-4 animate-fadeIn">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <span className="text-lg font-semibold text-gray-900">{successMessage}</span>
          </div>
        </div>
      )}

    </div>
  );
}

export default NewPostModal;
