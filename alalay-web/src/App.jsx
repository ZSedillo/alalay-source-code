import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from './_actions/user.actions';
import LoginPage from './LoginPage';
import Feed from './Main_Pages/Feed';
import Scholars from './Main_Pages/Scholars';
import ScholarProfile from './Main_Pages/ScholarProfile'; 
import ProtectedRoute from './ProtectedRoute';
import PaymentError from './_components/PaymentFailure';

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
        {/* ✅ FIXED: Change this route to use :scholarId parameter */}
        <Route path="/Scholars/:scholarId" element={<ProtectedRoute><ScholarProfile /></ProtectedRoute>} />

        <Route
          path="/payment-failure"
          element={
          <PaymentError isOpen={true} onClose={() => {}} />
  }
/>
        
        {/* Fallback route */}
      </Routes>
    </Router>
  );
}

export default App;