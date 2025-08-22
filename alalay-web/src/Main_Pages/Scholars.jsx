import { FaUserCircle } from "react-icons/fa";
import React/*, { useEffect }*/ from "react";
import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../_components/Sidebar";
// import { getScholars } from "../_actions/user.actions";

function Scholars() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  
  // ✅ Get scholars data from Redux store (disabled)
  // const { scholars, loading, error } = useSelector((state) => state.scholars);

  // ✅ Fetch scholars when component mounts (disabled)
  // useEffect(() => {
  //   dispatch(getScholars());
  // }, [dispatch]);

  // 🔹 Dummy scholars list (since backend is disabled)
  const scholars = [
    {
      _id: "1",
      username: "juancruz",
      scholarInfo: {
        profileImage: null,
        gwa: 1.5,
        userLevel: "Incoming 4th Year College",
      },
    },
    {
      _id: "2",
      username: "marias",
      scholarInfo: {
        profileImage: null,
        gwa: 1.8,
        userLevel: "3rd Year High School",
      },
    },
    {
      _id: "3",
      username: "pedroreyes",
      scholarInfo: {
        profileImage: null,
        gwa: 1.9,
        userLevel: "2nd Year College",
      },
    },
  ];

  const loading = false;
  const error = null;

  const handleCardClick = (scholarId) => {
    // Navigate to individual scholar profile
    navigate(`/scholars/${scholarId}`);
  };

  return (
    <div className="bg-gradient-to-b from-[#f9fafb] to-[#f3f4f6] min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="ml-64 h-screen flex flex-col">
        {/* Heading */}
        <header className="px-6 py-6 bg-white shadow-sm flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#8A1A1C]">Scholars</h1>
            <p className="text-gray-600 mt-1">Meet our inspiring scholars and their academic journeys</p>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto px-8 py-8">
          {/* Loading */}
          {loading && (
            <div className="flex justify-center items-center h-64">
              <p className="text-lg text-gray-600">Loading scholars...</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex justify-center items-center h-64">
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          )}

          {/* Success state - lively scholar cards */}
          {!loading && !error && scholars && scholars.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {scholars.map((scholar) => (
                <div
                  key={scholar._id}
                  onClick={() => handleCardClick(scholar._id)}
                  className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center cursor-pointer 
                             hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 border border-transparent hover:border-[#D5B527]"
                  style={{ minHeight: 270 }}
                >
                  {/* Profile image or icon */}
                  <div className="relative mb-3">
                    {scholar.scholarInfo?.profileImage ? (
                      <img
                        src={scholar.scholarInfo.profileImage}
                        alt={scholar.username}
                        className="w-20 h-20 rounded-full object-cover border-4 border-[#D5B527] shadow"
                      />
                    ) : (
                      <FaUserCircle className="w-20 h-20 text-gray-400" />
                    )}
                    <span className="absolute bottom-0 right-0 bg-[#D5B527] text-white text-xs px-2 py-0.5 rounded-full shadow font-semibold">
                      {scholar.scholarInfo?.userLevel?.split(' ')[0] || "Scholar"}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-800 mb-1">{scholar.username}</h2>
                  <p className="text-sm text-gray-600 mb-2">
                    GWA: <span className="font-semibold text-[#8A1A1C]">{scholar.scholarInfo?.gwa?.toFixed(2) ?? "N/A"}</span>
                  </p>
                  <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium mb-2">
                    {scholar.scholarInfo?.userLevel ?? "No level specified"}
                  </span>
                  <button
                    className="mt-2 bg-[#D5B527] hover:bg-[#bfa021] text-white px-4 py-1 rounded-full text-xs font-semibold shadow transition"
                  >
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && (!scholars || scholars.length === 0) && (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-600 text-lg">No scholars found.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Scholars;
