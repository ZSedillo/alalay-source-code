import { FaUserCircle } from "react-icons/fa";
import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../_components/Sidebar";

function Scholars() {
  const navigate = useNavigate();

  // Dummy scholars list
  const scholars = [
    {
      _id: "1",
      username: "juancruz",
      fullName: "Juan Dela Cruz",
      scholarInfo: {
        profileImage: null,
        gwa: 1.5,
        userLevel: "Incoming 4th Year College",
        course: "Computer Science",
        university: "BPI University"
      },
    },
    {
      _id: "2",
      username: "marias",
      fullName: "Maria Santos",
      scholarInfo: {
        profileImage: null,
        gwa: 1.8,
        userLevel: "3rd Year High School",
        course: "STEM Track",
        university: "Manila Science High School"
      },
    },
    {
      _id: "3",
      username: "pedroreyes",
      fullName: "Pedro Reyes",
      scholarInfo: {
        profileImage: null,
        gwa: 1.9,
        userLevel: "2nd Year College",
        course: "Education",
        university: "Philippine Normal University"
      },
    },
    {
      _id: "4",
      username: "annalim",
      fullName: "Anna Lim",
      scholarInfo: {
        profileImage: null,
        gwa: 1.6,
        userLevel: "1st Year College",
        course: "Engineering",
        university: "UP Diliman"
      },
    },
    {
      _id: "5",
      username: "carlosmendez",
      fullName: "Carlos Mendez",
      scholarInfo: {
        profileImage: null,
        gwa: 1.7,
        userLevel: "4th Year High School",
        course: "HUMSS Track",
        university: "Ateneo High School"
      },
    },
    {
      _id: "6",
      username: "sophiatan",
      fullName: "Sophia Tan",
      scholarInfo: {
        profileImage: null,
        gwa: 1.4,
        userLevel: "3rd Year College",
        course: "Medicine",
        university: "UST Faculty of Medicine"
      },
    }
  ];

  const loading = false;
  const error = null;

  const handleCardClick = (scholarId) => {
    navigate(`/scholars/${scholarId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="md:ml-64">
        {/* Mobile header spacing */}
        <div className="h-16 md:h-0" />
        
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200 top-[52px] md:top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Scholars</h1>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">Meet our inspiring scholars and their academic journeys</p>
              </div>
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                  {scholars.length} Scholars
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8A1A1C] mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">Loading scholars...</p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-center justify-center h-96">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-md">
                <div className="text-red-500 text-4xl mb-4">⚠️</div>
                <p className="text-red-600 text-lg font-medium mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-medium transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Scholar Cards */}
          {!loading && !error && scholars && scholars.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {scholars.map((scholar) => (
                <div
                  key={scholar._id}
                  onClick={() => handleCardClick(scholar._id)}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 cursor-pointer 
                             hover:shadow-md hover:-translate-y-1 transition-all duration-200 hover:border-[#D5B527]"
                >
                  {/* Profile Section */}
                  <div className="flex flex-col items-center text-center mb-4">
                    {/* Profile Image */}
                    <div className="relative mb-3">
                      {scholar.scholarInfo?.profileImage ? (
                        <img
                          src={scholar.scholarInfo.profileImage}
                          alt={scholar.fullName}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-[#D5B527] shadow-sm"
                        />
                      ) : (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center border-4 border-[#D5B527] shadow-sm">
                          <span className="text-sm sm:text-lg font-bold text-white">
                            {scholar.fullName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}
                      {/* Level Badge */}
                      <span className="absolute -bottom-1 -right-1 bg-[#D5B527] text-white text-xs px-2 py-0.5 rounded-full shadow font-medium">
                        {scholar.scholarInfo?.userLevel?.split(' ')[0] || "Scholar"}
                      </span>
                    </div>
                    
                    {/* Name and Username */}
                    <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-1 line-clamp-1">
                      {scholar.fullName}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 mb-3">@{scholar.username}</p>
                  </div>

                  {/* Stats Section */}
                  <div className="space-y-3 mb-4">
                    {/* GWA */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">GWA:</span>
                      <span className="font-bold text-[#8A1A1C]">
                        {scholar.scholarInfo?.gwa?.toFixed(2) ?? "N/A"}
                      </span>
                    </div>
                    
                    {/* Level Badge */}
                    <div className="flex justify-center">
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium border border-blue-200 text-center line-clamp-1">
                        {scholar.scholarInfo?.userLevel ?? "No level specified"}
                      </span>
                    </div>
                    
                    {/* Course */}
                    {scholar.scholarInfo?.course && (
                      <div className="text-center">
                        <p className="text-xs text-gray-600 line-clamp-1">
                          {scholar.scholarInfo.course}
                        </p>
                      </div>
                    )}
                    
                    {/* University */}
                    {scholar.scholarInfo?.university && (
                      <div className="text-center">
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {scholar.scholarInfo.university}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="mt-auto">
                    <button className="w-full bg-[#D5B527] hover:bg-[#bfa021] text-white py-2 px-4 rounded-xl text-sm font-medium shadow-sm transition-colors duration-200">
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && (!scholars || scholars.length === 0) && (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="text-6xl mb-4">🎓</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Scholars Found</h3>
                <p className="text-gray-600">There are currently no scholars to display.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Scholars;