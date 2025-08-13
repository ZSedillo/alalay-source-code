import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserCircle, FaArrowLeft } from 'react-icons/fa';
import Sidebar from '../_components/Sidebar';
import { getScholarProfile, clearScholarProfile } from '../_actions/user.actions';

function ScholarProfile() {
  const { scholarId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { scholarProfile, loading, error } = useSelector((state) => state.scholarProfile);

  useEffect(() => {
    if (scholarId) {
      dispatch(getScholarProfile(scholarId));
    }

    // Cleanup when component unmounts
    return () => {
      dispatch(clearScholarProfile());
    };
  }, [dispatch, scholarId]);

  const handleBack = () => {
    navigate('/scholars');
  };

  return (
    <div className="bg-gray-100">
      <Sidebar />
      
      <div className="ml-64 h-screen flex flex-col">
        {/* Header */}
        <header className="px-6 py-4 flex items-center">
          <button
            onClick={handleBack}
            className="mr-4 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-full transition-colors"
          >
            <FaArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Scholar Profile</h1>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-6 py-6">
          {loading && (
            <div className="flex justify-center items-center h-64">
              <p className="text-lg text-gray-600">Loading scholar profile...</p>
            </div>
          )}

          {error && (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <p className="text-red-500 text-lg mb-4">{error}</p>
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Back to Scholars
                </button>
              </div>
            </div>
          )}

          {!loading && !error && scholarProfile && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-8">
                {/* Profile Header */}
                <div className="flex flex-col items-center text-center mb-8">
                  {scholarProfile.profileImage ? (
                    <img
                      src={scholarProfile.profileImage}
                      alt={scholarProfile.fullName}
                      className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-200"
                    />
                  ) : (
                    <FaUserCircle className="w-32 h-32 text-gray-400 mb-4" />
                  )}
                  
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {scholarProfile.fullName}
                  </h2>
                  
                  <p className="text-gray-600 text-lg mb-1">
                    @{scholarProfile.username}
                  </p>
                  
                  <p className="text-blue-600 font-semibold text-lg">
                    {scholarProfile.userLevel}
                  </p>
                </div>

                {/* Profile Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* GWA Card */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Grade Weighted Average
                    </h3>
                    <p className="text-3xl font-bold text-blue-600">
                      {scholarProfile.gwa ? scholarProfile.gwa.toFixed(2) : "N/A"}
                    </p>
                  </div>

                  {/* Level Card */}
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Academic Level
                    </h3>
                    <p className="text-xl font-bold text-green-600 capitalize">
                      {scholarProfile.userLevel}
                    </p>
                  </div>
                </div>

                {/* Bio Section */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    About {scholarProfile.fullName.split(' ')[0]}
                  </h3>
                  <div className="text-gray-700 leading-relaxed">
                    {scholarProfile.bio ? (
                      <p className="whitespace-pre-wrap">{scholarProfile.bio}</p>
                    ) : (
                      <p className="text-gray-500 italic">
                        No bio available for this scholar.
                      </p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center mt-8 space-x-4">
                  <button
                    onClick={handleBack}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Back to Scholars
                  </button>
                  
                  {/* You can add more action buttons here like "Send Friend Request" */}
                  {/* 
                  <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Send Friend Request
                  </button>
                  */}
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