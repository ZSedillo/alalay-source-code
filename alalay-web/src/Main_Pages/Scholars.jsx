import { FaUserCircle } from "react-icons/fa";
import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../_components/Sidebar";
import ScholarProfile from "./ScholarProfile";

const scholars = [
  {
    id: 1,
    name: "John Mark Jose",
    gwa: 1.25,
    level: "Incoming Senior High",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Mark Josh Bautista",
    gwa: 1.10,
    level: "Incoming College Student",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Christine Marie Rodriguez",
    gwa: 1.50,
    level: "Incoming College Student",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Jacob Gareth Cotangco",
    gwa: 1.30,
    level: "Incoming Senior High",
    image: "https://via.placeholder.com/150",
  },
];

function Scholars() {
  const navigate = useNavigate();

  const handleCardClick = (scholarId) => {
    // For now, all go to the same ScholarProfile page
    navigate("./ScholarProfile");
  };

  return (
    <div className="bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="ml-64 h-screen flex flex-col">
        {/* Heading */}
        <header className="px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-800">Scholars</h1>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto px-6 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {scholars.map((scholar) => (
              <div
                key={scholar.id}
                onClick={() => handleCardClick(scholar.id)}
                className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center 
                           cursor-pointer hover:shadow-lg transition-shadow duration-200"
              >
                <FaUserCircle className="w-20 h-20 text-gray-500 mb-2" />
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  {scholar.name}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  GWA: {scholar.gwa.toFixed(2)}
                </p>
                <p className="text-sm text-blue-600 font-medium">
                  {scholar.level}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Scholars;
