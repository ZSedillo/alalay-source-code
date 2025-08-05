// export default LoginPage;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listTemps } from './_actions/temp.actions'; // ✅ adjust path as needed
import { login } from './_actions/user.actions'; // ✅ adjust path as needed

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Controlled inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Redux state
  const userState = useSelector((state) => state.user);
  const { loading, error, user } = userState;
  const { temps } = useSelector((state) => state.tempList);

  // On successful login, navigate to /Feed
  useEffect(() => {
    if (user) {
      navigate('/Feed');
    } 
  }, [user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Show error */}
          {error && error !== "No token, authorization denied" && (
            <div className="text-red-500 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Show loading */}
          {loading && (
            <div className="text-gray-500 text-sm font-medium">
              Logging in...
            </div>
          )}

          <div className="flex justify-between space-x-2 pt-4">
            <button
              type="submit"
              className="w-1/2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
            <button
              type="button"
              className="w-1/2 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>



      {/* DO NOT DELETE I WILL USE THIS AS REFERENCE CODE  */}
<div className="bg-white p-4 rounded-xl shadow w-full max-w-sm">
      <h3 className="text-lg font-semibold mb-2">Temp Data Preview</h3>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && Array.isArray(temps) && (
        <ul className="list-disc pl-5 space-y-1">
          {temps.map((temp) => (
            <li key={temp._id}>
              {temp.username} — {temp.age}
            </li>
          ))}
        </ul>
      )}
    </div>


      
    </div>
  );
}

export default LoginPage;

