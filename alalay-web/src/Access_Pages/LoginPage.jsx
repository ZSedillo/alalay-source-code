import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from './_actions/user.actions'; 

function LoginPage() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading for better UX
    setTimeout(() => {
      // dispatch(login(username, password));
      navigate('/Feed'); // instantly redirect without checking backend
      setIsLoading(false);
    }, 800);
  };

  const handleForgotPassword = async () => {
    setIsLoading(true);
    
    // Simulate loading for better UX
    setTimeout(() => {
      navigate('/ForgotPassword');
      setIsLoading(false);
    }, 300);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    navigate('/UserTypeSelection'); // instantly redirect to signup page
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#8A1A1C] to-[#5C1213] relative overflow-hidden">
      {/* Logo/Brand section */}
      <div className="relative z-10 mb-8 text-center">
        <h1 className="text-4xl font-bold text-[#D5B527] mb-2">BPI Alalay</h1>
        <p className="text-white text-opacity-90 text-sm">Empowering educational journeys</p>
      </div>

      {/* Login Form */}
      <div className="relative z-10 bg-white bg-opacity-95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white border-opacity-20">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-600 text-sm">Sign in to continue your journey</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username Input */}
          <div className="relative">
            <label htmlFor="username" className="block text-gray-700 font-semibold mb-2 text-sm">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaUser className="h-4 w-4 text-gray-400" />
              </div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D5B527] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="relative">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2 text-sm">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaLock className="h-4 w-4 text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D5B527] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-[#8A1A1C] transition-colors"
              >
                {showPassword ? (
                  <FaEyeSlash className="h-4 w-4 text-gray-400" />
                ) : (
                  <FaEye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={isLoading}
              className={`text-sm font-medium transition-colors ${
                isLoading 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-[#8A1A1C] hover:text-[#5C1213]'
              }`}
            >
              Forgot password?
            </button>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 pt-2">
            <button
              type="submit"
              disabled={isLoading || !username.trim() || !password.trim()}
              className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 transform ${
                isLoading || !username.trim() || !password.trim()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#D5B527] hover:bg-[#bfa021] text-white hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Don't have an account?</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignup}
              className="w-full bg-white border-2 border-[#8A1A1C] text-[#8A1A1C] py-3 rounded-xl font-semibold hover:bg-[#8A1A1C] hover:text-white transition-all duration-200 transform hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              Create New Account
            </button>
          </div>
        </form>

        {/* Additional Links */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500 mb-4">
            By continuing, you agree to our{' '}
            <button className="text-[#8A1A1C] hover:underline">Terms of Service</button>
            {' '}and{' '}
            <button className="text-[#8A1A1C] hover:underline">Privacy Policy</button>
          </p>
          
          <div className="flex justify-center items-center space-x-6 text-xs text-gray-400">
            <button className="hover:text-[#8A1A1C] transition-colors">Help</button>
            <span>•</span>
            <button className="hover:text-[#8A1A1C] transition-colors">Support</button>
            <span>•</span>
            <button className="hover:text-[#8A1A1C] transition-colors">About</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-8 text-center">
        <p className="text-white text-opacity-60 text-xs">
          © 2024 Scholar Connect. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default LoginPage;