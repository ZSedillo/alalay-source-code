import React, { useState, useEffect } from "react";
import { FaTimes, FaHeart, FaEyeSlash, FaEye, FaUser, FaComment, FaDollarSign, FaLock, FaShieldAlt } from "react-icons/fa";

function DonationModal({ isOpen, onClose, scholarName, scholarId, fundingGoal, currentAmount, scholarAvatar }) {
  const [formData, setFormData] = useState({
    amount: "",
    isAnonymous: false,
    comment: "",
    paymentMethod: "card"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Predefined donation amounts
  const quickAmounts = [500, 1000, 2500, 5000, 10000];

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        amount: "",
        isAnonymous: false,
        comment: "",
        paymentMethod: "card"
      });
      setErrors({});
      setIsSubmitting(false);
      setShowConfirmation(false);
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
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

  const handleQuickAmount = (amount) => {
    setFormData(prev => ({ ...prev, amount: amount.toString() }));
    if (errors.amount) {
      setErrors(prev => ({ ...prev, amount: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid donation amount';
    } else if (parseFloat(formData.amount) < 100) {
      newErrors.amount = 'Minimum donation amount is ₱100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call for donation processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would normally call your donation API
      // const response = await donationAPI.processDonation({
      //   scholarId,
      //   amount: parseFloat(formData.amount),
      //   isAnonymous: formData.isAnonymous,
      //   comment: formData.comment,
      //   paymentMethod: formData.paymentMethod
      // });

      setShowConfirmation(true);
    } catch (error) {
      console.error('Error processing donation:', error);
      setErrors({ submit: 'Failed to process donation. Please try again.' });
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

  const calculateProgress = () => {
    if (!fundingGoal || !currentAmount) return 0;
    return Math.min((currentAmount / fundingGoal) * 100, 100);
  };

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 backdrop-blur-md bg-black/30" onClick={onClose} />
        
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200">
          {/* Success Header */}
          <div className="px-8 py-6 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHeart className="text-white text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-green-800">Thank You!</h2>
            <p className="text-green-700 mt-2">Your donation has been processed</p>
          </div>

          {/* Confirmation Details */}
          <div className="px-8 py-6 space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-800 mb-1">
                  {formatCurrency(formData.amount)}
                </div>
                <div className="text-green-700">
                  donated to <span className="font-semibold">{scholarName}</span>
                </div>
                {formData.isAnonymous && (
                  <div className="text-sm text-green-600 mt-2 flex items-center justify-center space-x-1">
                    <FaEyeSlash className="w-3 h-3" />
                    <span>Anonymous donation</span>
                  </div>
                )}
              </div>
            </div>

            {formData.comment && !formData.isAnonymous && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Your message:</div>
                <div className="text-gray-800 italic">"{formData.comment}"</div>
              </div>
            )}

            <div className="text-center text-sm text-gray-600">
              You will receive a confirmation email shortly with your donation receipt.
            </div>
          </div>

          {/* Close Button */}
          <div className="px-8 py-6 bg-gradient-to-r from-green-50 to-emerald-50 border-t border-green-100">
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred backdrop */}
      <div 
        className="absolute inset-0 backdrop-blur-md bg-black/30"
        onClick={onClose}
      />
      
      {/* Modal container */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 bg-gradient-to-r from-red-50 to-rose-50 border-b border-red-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#8A1A1C] to-[#5C1213] rounded-full flex items-center justify-center">
              <FaHeart className="text-white text-lg" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Support {scholarName}</h2>
              <p className="text-sm text-gray-600 mt-1">Make a difference in their educational journey</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-100 rounded-xl transition-all duration-200 group"
            disabled={isSubmitting}
          >
            <FaTimes className="text-gray-500 group-hover:text-red-600 w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto max-h-[calc(95vh-88px)]">
          {/* Scholar Info and Progress */}
          {fundingGoal && (
            <div className="px-8 py-6 bg-white border-b border-gray-50">
              <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Funding Progress</span>
                  <span className="text-sm font-semibold text-[#8A1A1C]">
                    {calculateProgress().toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                  <div
                    className="bg-gradient-to-r from-[#D5B527] to-[#E6C547] h-3 rounded-full transition-all duration-300"
                    style={{ width: `${calculateProgress()}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    Raised: {formatCurrency(currentAmount || 0)}
                  </span>
                  <span className="text-gray-800 font-semibold">
                    Goal: {formatCurrency(fundingGoal)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-8">
            {/* Donation Amount */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-900">
                Donation Amount (PHP) <span className="text-red-500">*</span>
              </label>
              
              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handleQuickAmount(amount)}
                    className={`py-3 px-4 rounded-xl border-2 font-medium transition-all duration-200 ${
                      formData.amount === amount.toString()
                        ? 'border-[#D5B527] bg-[#D5B527] text-white'
                        : 'border-red-200 text-gray-700 hover:border-[#D5B527] hover:bg-red-50'
                    }`}
                    disabled={isSubmitting}
                  >
                    {formatCurrency(amount)}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, amount: "" }))}
                  className={`py-3 px-4 rounded-xl border-2 font-medium transition-all duration-200 ${
                    !quickAmounts.includes(parseInt(formData.amount)) && formData.amount
                      ? 'border-[#D5B527] bg-[#D5B527] text-white'
                      : 'border-red-200 text-gray-700 hover:border-[#D5B527] hover:bg-red-50'
                  }`}
                  disabled={isSubmitting}
                >
                  Custom
                </button>
              </div>

              {/* Custom Amount Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-500 font-medium">₱</span>
                </div>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="Enter custom amount"
                  min="100"
                  className={`w-full pl-8 pr-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-[#D5B527] focus:border-[#D5B527] transition-all duration-200 text-lg font-medium ${
                    errors.amount ? 'border-red-300 bg-red-50' : 'border-red-200 hover:border-red-300'
                  }`}
                  disabled={isSubmitting}
                />
              </div>
              
              {errors.amount && (
                <div className="flex items-center space-x-2 text-red-600 text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{errors.amount}</span>
                </div>
              )}
            </div>

            {/* Donation Options */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-900">
                Donation Preferences
              </label>
              
              {/* Anonymous Option */}
              <div className="border-2 border-red-200 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="anonymous"
                    name="isAnonymous"
                    checked={formData.isAnonymous}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-[#D5B527] border-2 border-red-300 rounded focus:ring-[#D5B527] focus:ring-2"
                    disabled={isSubmitting}
                  />
                  <label htmlFor="anonymous" className="flex items-center space-x-3 text-base font-medium text-gray-900 cursor-pointer">
                    <FaEyeSlash className="text-gray-600 w-4 h-4" />
                    <span>Make this donation anonymous</span>
                  </label>
                </div>
                <p className="text-sm text-gray-600 mt-2 ml-8">
                  Your name will not be displayed publicly with this donation
                </p>
              </div>
            </div>

            {/* Comment Section */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-900">
                Message for {scholarName} (Optional)
              </label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
                placeholder={formData.isAnonymous ? "Your message will be shared anonymously..." : "Share words of encouragement and support..."}
                rows={4}
                maxLength={300}
                className="w-full px-4 py-3 border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-[#D5B527] focus:border-[#D5B527] resize-none transition-all duration-200 text-gray-900 placeholder-gray-400 hover:border-red-300"
                disabled={isSubmitting}
              />
              <div className="text-right text-xs text-gray-400">
                {formData.comment.length}/300
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-900">
                Payment Method
              </label>
              <div className="grid grid-cols-1 gap-3">
                <label className="flex items-center space-x-3 p-4 border-2 border-red-200 rounded-xl cursor-pointer hover:border-[#D5B527] transition-all duration-200">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-[#D5B527] border-red-300 focus:ring-[#D5B527]"
                    disabled={isSubmitting}
                  />
                  <FaDollarSign className="text-green-600 w-5 h-5" />
                  <div>
                    <div className="font-medium text-gray-900">Credit/Debit Card</div>
                    <div className="text-sm text-gray-600">Secure payment via Stripe</div>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3 p-4 border-2 border-red-200 rounded-xl cursor-pointer hover:border-[#D5B527] transition-all duration-200">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="gcash"
                    checked={formData.paymentMethod === 'gcash'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-[#D5B527] border-red-300 focus:ring-[#D5B527]"
                    disabled={isSubmitting}
                  />
                  <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">G</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">GCash</div>
                    <div className="text-sm text-gray-600">Pay using your GCash account</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <FaShieldAlt className="text-green-600 w-5 h-5 mt-0.5" />
                <div>
                  <div className="text-green-900 font-medium text-sm">Secure Donation</div>
                  <div className="text-green-800 text-sm mt-1">
                    Your payment information is encrypted and secure. You'll receive a receipt via email after your donation is processed.
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
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
              className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200 hover:bg-red-100 rounded-xl"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.amount || parseFloat(formData.amount) <= 0}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl ${
                isSubmitting || !formData.amount || parseFloat(formData.amount) <= 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#D5B527] to-[#E6C547] hover:from-[#bfa021] hover:to-[#D5B527] text-white'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <FaHeart className="w-4 h-4" />
                  <span>Donate {formData.amount ? formatCurrency(formData.amount) : ''}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonationModal;