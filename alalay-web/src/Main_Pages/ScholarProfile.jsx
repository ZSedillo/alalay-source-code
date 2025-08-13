import React from "react";
import { FaUserCircle } from "react-icons/fa";
import Sidebar from "../_components/Sidebar";

const scholar = {
  name: "Jacob Gareth Cotangco",
  gwa: 1.30,
  bio: "Jacob is a hardworking student with a passion for mathematics and science. He consistently excels in academics and actively participates in community programs.",
};

function ScholarProfile() {
  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="ml-64 flex flex-col flex-1">
        {/* Heading */}
        <header className="px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-800">Scholar Profile</h1>
        </header>

        {/* Centered Card */}
        <div className="flex flex-1 items-center justify-center px-6">
          <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl w-full">
            <div className="flex flex-col items-center text-center">
              <FaUserCircle className="text-gray-400 w-32 h-32 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{scholar.name}</h2>
              <p className="text-lg text-gray-600 mb-4">GWA: {scholar.gwa.toFixed(2)}</p>
              <p className="text-gray-700 leading-relaxed">{scholar.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScholarProfile;
