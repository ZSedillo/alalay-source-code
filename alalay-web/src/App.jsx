import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from './_actions/user.actions';
import LoginPage from './LoginPage';
import Feed from './Main_Pages/Feed';
import Scholars from './Main_Pages/Scholars';
import ScholarProfile from './Main_Pages/ScholarProfile'; 
import ProtectedRoute from './ProtectedRoute';

function App() {
  const dispatch = useDispatch();

  // ✅ Restore session on initial load
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/Login" element={<LoginPage />} />
        
        {/* Protected Routes */}
        <Route path="/Feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
        <Route path="/Scholars" element={<ProtectedRoute><Scholars /></ProtectedRoute>} />
        <Route path="/Scholars/ScholarProfile" element={<ProtectedRoute><ScholarProfile /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
