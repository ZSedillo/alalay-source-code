import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../_components/Sidebar";

function Settings() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Settings Page</h1>
        <p className="text-gray-600">This is the settings page content.</p>
      </div>
    </div>
  );
}

export default Settings;