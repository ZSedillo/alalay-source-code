import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from './_actions/user.actions'; 

function LoginPage() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // dispatch(login(username, password));
    navigate('/Feed'); // instantly redirect without checking backend
  };

  const handleSignup = (e) => {
    e.preventDefault();
    navigate('/Signup'); // instantly redirect to signup page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#8A1A1C] to-[#5C1213]">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm mb-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-700 font-medium mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527]"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5B527]"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex justify-between space-x-2 pt-4">
            <button
              type="submit"
              className="w-1/2 text-white py-2 rounded-lg hover:opacity-90 transition"
              style={{ backgroundColor: '#D5B527' }}
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleSignup}
              className="w-1/2 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
