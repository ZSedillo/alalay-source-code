import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from './_actions/user.actions';
import LoginPage from './Access_Pages/LoginPage';
import UserTypeSelection from './Access_Pages/UserTypeSelection';
import Signup from './Access_Pages/Signup';
import ForgotPassword from './Access_Pages/ForgotPassword';
import SponsorSignup from './Access_Pages/SponsorSignup';

import Feed from './Main_Pages/Feed';
import Scholars from './Main_Pages/Scholars';
import ScholarProfile from './Main_Pages/ScholarProfile'; 
import SponsorProfile from './Main_Pages/SponsorProfile';

import Profile from './Main_Pages/Profile';
import Settings from './Main_Pages/Settings';

import ProtectedRoute from './_auth/ProtectedRoute';
import PaymentError from './_components/PaymentFailure';
import DonationModal from './_components/DonationModal';

function App() {
  // const dispatch = useDispatch();

  // ✅ Restore session on initial load
  // useEffect(() => {
  //   dispatch(fetchCurrentUser());
  // }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/UserTypeSelection" element={<UserTypeSelection />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/SponsorSignup" element={<SponsorSignup />} />
        
        {/* Protected Routes */}
        {/* <Route path="/Feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} /> */}
        {/* <Route path="/Scholars" element={<ProtectedRoute><Scholars /></ProtectedRoute>} /> */}
        {/* ✅ FIXED: Change this route to use :scholarId parameter */}
        {/* <Route path="/Scholars/:scholarId" element={<ProtectedRoute><ScholarProfile /></ProtectedRoute>} /> */}

        <Route path="/Feed" element={<Feed />} />
        <Route path="/Scholars" element={<Scholars />} />
        {/* ✅ FIXED: Change this route to use :scholarId parameter */}
        <Route path="/Scholars/:scholarId" element={<ScholarProfile />} />
        <Route path="/sponsors/:sponsorId" element={<SponsorProfile />} />
        
        {/* Protected Profile and Settings Routes */}
        <Route path="/Settings" element={<Settings />} />
        <Route path="/Profile" element={<Profile />} />


        <Route
          path="/payment-failure"
          element={
          <PaymentError isOpen={true} onClose={() => {}} />
          }
          />
        <Route
          path="/donation-modal"
          element={
          <DonationModal isOpen={true} onClose={() => {}} />
          }
          />


      </Routes>
    </Router>
  );
}

export default App;