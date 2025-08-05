import React from "react";
import { useNavigate } from "react-router-dom";

const scholars = [
  {
    id: 1,
    name: "John Doe",
    gpa: 1.25,
    level: "Incoming Senior High",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Jane Smith",
    gpa: 1.10,
    level: "Incoming College Student",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Mark Lee",
    gpa: 1.50,
    level: "Incoming College Student",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Ella Cruz",
    gpa: 1.30,
    level: "Incoming Senior High",
    image: "https://via.placeholder.com/150",
  },
];

  const handleLogout = async () => {
    await dispatch(logout()); // ✅ Redux logout action
    navigate("/Login"); // ✅ Go to login page without reloading the browser
  };

function Scholars() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-lg hidden md:block">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800">Your Profile</h2>
          <p className="text-gray-600 mt-2">
            Username: <span className="font-medium">you</span>
          </p>
          <p className="text-gray-600">Posts: 3</p>
          <p className="text-gray-600">Likes: 15</p>
        </div>
        <nav>
          <ul className="space-y-2">
            <li
              className="text-gray-600 hover:text-blue-600 cursor-pointer"
              onClick={() => navigate("/Feed")}
            >
              📃 Feed
            </li>
            <li className="text-blue-600 font-semibold">🎓 Our Scholars</li>
            <li className="text-gray-600 hover:text-blue-600 cursor-pointer">⚙️ Settings</li>
            <li className="text-gray-600 hover:text-red-600 cursor-pointer" onClick={handleLogout}> 🚪 Logout</li>
          </ul>
        </nav>
      </aside>

      {/* Scholars Grid */}
      <main className="flex-1 flex justify-center px-4 py-6">
        <div className="w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Scholars</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {scholars.map((scholar) => (
              <div
                key={scholar.id}
                className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center"
              >
                <img
                  src={scholar.image}
                  alt={scholar.name}
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  {scholar.name}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  GPA: {scholar.gpa.toFixed(2)}
                </p>
                <p className="text-sm text-blue-600 font-medium">
                  {scholar.level}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Scholars;
