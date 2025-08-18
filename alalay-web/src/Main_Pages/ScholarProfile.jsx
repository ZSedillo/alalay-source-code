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

  const { scholarProfile, loading, error } = useSelector(
    (state) => state.scholarProfile
  );

  useEffect(() => {
    if (scholarId) dispatch(getScholarProfile(scholarId));
    return () => dispatch(clearScholarProfile());
  }, [dispatch, scholarId]);

  const handleBack = () => navigate('/scholars');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Sidebar (w-56) */}
      <Sidebar />

      {/* Right section offset by the sidebar width */}
      <div className="md:ml-56 flex flex-col min-h-screen">
        {/* Header (sticky, sits flush next to the sidebar) */}
        <header className="sticky top-0 z-10 h-16 flex items-center px-6 border-b bg-white">
          <button
            onClick={handleBack}
            className="mr-4 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-full transition-colors"
          >
            <FaArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Scholar Profile</h1>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-6 py-8">
          {/* Loading */}
          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex justify-center items-center h-64">
              <div className="bg-red-50 p-6 rounded-xl shadow text-center max-w-md">
                <p className="text-red-600 text-lg font-semibold mb-4">
                  {error}
                </p>
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Back to Scholars
                </button>
              </div>
            </div>
          )}

          {/* Scholar Profile */}
          {!loading && !error && scholarProfile && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-md p-8">
                {/* Profile Section */}
                <div className="flex items-center gap-8 mb-8">
                  {/* Avatar */}
                  {scholarProfile.profileImage ? (
                    <img
                      src={scholarProfile.profileImage}
                      alt={scholarProfile.fullName}
                      className="w-36 h-36 rounded-full object-cover border-4 border-gray-200 shadow"
                    />
                  ) : (
                    <FaUserCircle className="w-36 h-36 text-gray-400" />
                  )}

                  {/* Info */}
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {scholarProfile.fullName}
                    </h2>
                    <p className="text-gray-500">@{scholarProfile.username}</p>
                    <span className="mt-2 inline-block px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
                      {scholarProfile.userLevel}
                    </span>

                    {/* Bio */}
                    <p className="mt-4 text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {scholarProfile.bio || (
                        <span className="text-gray-400 italic">
                          No bio available for this scholar.
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-600">GWA</h3>
                    <p className="text-2xl font-bold text-blue-700">
                      {scholarProfile.gwa ? scholarProfile.gwa.toFixed(2) : 'N/A'}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-600">Academic Level</h3>
                    <p className="text-xl font-bold text-green-700 capitalize">
                      {scholarProfile.userLevel}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-600">Scholarship Status</h3>
                    <p className="text-xl font-bold text-purple-700">
                      {scholarProfile.status || 'Active'}
                    </p>
                  </div>
                </div>

                {/* Back Button */}
                <div className="flex justify-center mt-6">
                  <button
                    onClick={handleBack}
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Back to Scholars
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
