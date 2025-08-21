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
          {/* ✅ Loading state */}
          {loading && (
            <div className="flex justify-center items-center h-64">
              <p className="text-lg text-gray-600">Loading scholars...</p>
            </div>
          )}

          {/* ✅ Error state */}
          {error && (
            <div className="flex justify-center items-center h-64">
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          )}

          {/* ✅ Success state - display scholars */}
          {!loading && !error && scholars && scholars.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {scholars.map((scholar) => (
                <div
                  key={scholar._id}
                  onClick={() => handleCardClick(scholar._id)}
                  className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center 
                             cursor-pointer hover:shadow-lg transition-shadow duration-200"
                >
                  {/* ✅ Display profile image if available, otherwise show default icon */}
                  {scholar.scholarInfo?.profileImage ? (
                    <img
                      src={scholar.scholarInfo.profileImage}
                      alt={scholar.username}
                      className="w-20 h-20 rounded-full object-cover mb-2"
                    />
                  ) : (
                    <FaUserCircle className="w-20 h-20 text-gray-500 mb-2" />
                  )}
                  
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    {scholar.username}
                  </h2>
                  
                  {/* ✅ Display GWA if available */}
                  <p className="text-sm text-gray-600 mb-1">
                    GWA: {scholar.scholarInfo?.gwa?.toFixed(2) ?? "N/A"}
                  </p>
                  
                  {/* ✅ Display user level if available */}
                  <p className="text-sm text-blue-600 font-medium">
                    {scholar.scholarInfo?.userLevel ?? "No level specified"}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* ✅ Empty state */}
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
