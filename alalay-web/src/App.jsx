import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import Feed from './Main_Pages/Feed';
import Scholars from './Main_Pages/Scholars';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/Login" element={<LoginPage />} />

        {/* Protected routes (Will be done later)*/} 
        <Route path="/Feed" element={<Feed />} />
        <Route path="/Scholars" element={<Scholars />} />
      </Routes>
    </Router>
  );
}

export default App;
