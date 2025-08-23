import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUserCircle, FaArrowLeft, FaShareAlt, FaDonate, FaMapMarkerAlt, FaCalendarAlt, FaGraduationCap, FaUniversity } from "react-icons/fa";
import Sidebar from "../_components/Sidebar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ScholarProfile() {
  const { scholarId } = useParams();
  const navigate = useNavigate();

  const [scholarProfile, setScholarProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  // Dummy scholars list with more complete data
  const sampleScholars = [
    {
      _id: "1",
      fullName: "Juan Dela Cruz",
      username: "juancruz",
      profileImage: null,
      userLevel: "Incoming 4th Year College",
      bio: "I am passionate about technology and education. Hoping to inspire others through my journey and make a positive impact in the field of computer science!",
      donationProgress: 65,
      gwa: 1.75,
      status: "Active",
      course: "Computer Science",
      university: "BPI University",
      location: "Quezon City, Metro Manila, PH",
      joinedDate: "2023-08-15",
      totalFunding: 15000,
      targetFunding: 30000,
      activities: [
        "Attended scholarship orientation",
        "Submitted enrollment form",
        "Received book allowance",
        "Completed mid-term examinations",
        "Participated in coding bootcamp"
      ],
    },
    {
      _id: "2",
      fullName: "Maria Santos",
      username: "marias",
      profileImage: null,
      userLevel: "3rd Year High School",
      bio: "Loves science and math. Dreaming to be an engineer someday and contribute to building a better Philippines!",
      donationProgress: 45,
      gwa: 1.90,
      status: "Active",
      course: "STEM Track",
      university: "Manila Science High School",
      location: "Manila, Metro Manila, PH",
      joinedDate: "2023-06-01",
      totalFunding: 8000,
      targetFunding: 18000,
      activities: [
        "Won 2nd place in Science Fair", 
        "Attended tutorial program",
        "Completed STEM research project"
      ],
    },
    {
      _id: "3",
      fullName: "Pedro Reyes",
      username: "pedroreyes",
      profileImage: null,
      userLevel: "2nd Year College",
      bio: "Future teacher with a passion for literature and education. Committed to shaping young minds and promoting literacy.",
      donationProgress: 80,
      gwa: 1.65,
      status: "Active",
      course: "Bachelor of Secondary Education",
      university: "Philippine Normal University",
      location: "Taguig, Metro Manila, PH",
      joinedDate: "2022-09-12",
      totalFunding: 24000,
      targetFunding: 30000,
      activities: [
        "Submitted thesis proposal", 
        "Presented in class debate",
        "Completed teaching internship"
      ],
    },
  ];

  useEffect(() => {
    const scholar = sampleScholars.find((s) => s._id === scholarId);
    setTimeout(() => {
      setScholarProfile(scholar || sampleScholars[0]);
      setLoading(false);
    }, 600);
  }, [scholarId]);

  const handleBack = () => navigate("/scholars");

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount);
  };

  const formatDateLong = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="md:ml-64">
        {/* Mobile header spacing */}
        <div className="h-16 md:h-0" />
        
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200 sticky top-[52px] md:top-0 z-30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleBack}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <FaArrowLeft size={18} />
                </button>
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Scholar Profile</h1>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base hidden sm:block">View detailed scholar information</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8A1A1C] mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">Loading scholar profile...</p>
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
                  onClick={handleBack}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-medium transition-colors"
                >
                  Back to Scholars
                </button>
              </div>
            </div>
          )}

          {/* Scholar Profile */}
          {!loading && !error && scholarProfile && (
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Cover Photo */}
                <div className="h-32 sm:h-48 bg-gradient-to-r from-[#8A1A1C] to-[#5C1213] relative">
                  {/* Profile Picture */}
                  <div className="absolute -bottom-12 left-4 sm:left-6">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                      {scholarProfile.profileImage ? (
                        <img src={scholarProfile.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                          <span className="text-lg sm:text-2xl font-bold text-white">
                            {scholarProfile.fullName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Profile Info */}
                <div className="p-4 sm:p-6 pt-18 sm:pt-16">
                  <div className="mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between lg:space-x-8 mb-4">
                      <div className="flex-1 mb-6 lg:mb-0">
                        <div className="flex items-center flex-wrap gap-2 mb-2">
                          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{scholarProfile.fullName}</h1>
                          <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium border border-blue-200">
                            📚 Scholar
                          </span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-3">
                          <span>@{scholarProfile.username}</span>
                          <div className="flex items-center space-x-1">
                            <FaMapMarkerAlt size={12} />
                            <span>{scholarProfile.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FaCalendarAlt size={12} />
                            <span>Joined {formatDateLong(scholarProfile.joinedDate)}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">{scholarProfile.bio}</p>
                        
                        {/* Academic Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center space-x-2 text-gray-600">
                            <FaGraduationCap size={14} />
                            <span>{scholarProfile.course}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600">
                            <FaUniversity size={14} />
                            <span className="line-clamp-1">{scholarProfile.university}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress Circle - Desktop */}
                      <div className="hidden lg:flex lg:flex-col lg:items-center lg:justify-center lg:flex-shrink-0">
                        <div className="w-28 h-28 mb-2">
                          <CircularProgressbar
                            value={scholarProfile.donationProgress || 0}
                            text={`${scholarProfile.donationProgress || 0}%`}
                            styles={buildStyles({
                              textSize: "18px",
                              pathColor: "#D5B527",
                              textColor: "#8A1A1C",
                              trailColor: "#f1f1f1",
                            })}
                          />
                        </div>
                        <span className="text-xs text-gray-500 font-medium text-center">Funding Progress</span>
                        <div className="text-center mt-2">
                          <p className="text-xs text-gray-600">{formatCurrency(scholarProfile.totalFunding)}</p>
                          <p className="text-xs text-gray-500">of {formatCurrency(scholarProfile.targetFunding)}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-xl">
                        <div className="text-xl sm:text-2xl font-bold text-[#8A1A1C]">{scholarProfile.gwa.toFixed(2)}</div>
                        <div className="text-xs sm:text-sm text-gray-600">GWA</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-xl">
                        <div className="text-xl sm:text-2xl font-bold text-[#8A1A1C]">{scholarProfile.userLevel.split(' ')[0]}</div>
                        <div className="text-xs sm:text-sm text-gray-600">Year Level</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-xl">
                        <div className="text-lg sm:text-xl font-bold text-emerald-600">{scholarProfile.status}</div>
                        <div className="text-xs sm:text-sm text-gray-600">Status</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-xl">
                        <div className="text-xl sm:text-2xl font-bold text-[#8A1A1C]">{scholarProfile.donationProgress}%</div>
                        <div className="text-xs sm:text-sm text-gray-600">Progress</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Circle - Mobile */}
              <div className="lg:hidden bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Funding Progress</h2>
                <div className="flex justify-center items-center space-x-8">
                  <div className="w-24 h-24">
                    <CircularProgressbar
                      value={scholarProfile.donationProgress || 0}
                      text={`${scholarProfile.donationProgress || 0}%`}
                      styles={buildStyles({
                        textSize: "18px",
                        pathColor: "#D5B527",
                        textColor: "#8A1A1C",
                        trailColor: "#f1f1f1",
                      })}
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-bold text-gray-800">{formatCurrency(scholarProfile.totalFunding)}</p>
                    <p className="text-sm text-gray-500">of {formatCurrency(scholarProfile.targetFunding)} target</p>
                    <p className="text-xs text-emerald-600 mt-1">
                      {formatCurrency(scholarProfile.targetFunding - scholarProfile.totalFunding)} remaining
                    </p>
                  </div>
                </div>
              </div>

              {/* Academic Details */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  📚 Academic Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-xs sm:text-sm text-gray-600 block mb-1">Course</span>
                    <p className="font-medium text-gray-800">{scholarProfile.course}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-xs sm:text-sm text-gray-600 block mb-1">Academic Level</span>
                    <p className="font-medium text-gray-800">{scholarProfile.userLevel}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl sm:col-span-2">
                    <span className="text-xs sm:text-sm text-gray-600 block mb-1">Institution</span>
                    <p className="font-medium text-gray-800">{scholarProfile.university}</p>
                  </div>
                </div>
              </div>

              {/* Activities */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  🏃‍♂️ Recent Activities
                </h2>
                <div className="space-y-3">
                  {scholarProfile.activities && scholarProfile.activities.length > 0 ? (
                    scholarProfile.activities.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-2 h-2 bg-[#D5B527] rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-gray-700 flex-1">{activity}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 italic text-center py-8">No recent activities available.</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                  <button className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors shadow-sm">
                    <FaDonate size={16} />
                    <span>Donate Now</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-sm">
                    <FaShareAlt size={16} />
                    <span>Share Profile</span>
                  </button>
                  <button
                    onClick={handleBack}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-medium transition-colors shadow-sm"
                  >
                    <FaArrowLeft size={16} />
                    <span>Back to Scholars</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default ScholarProfile;