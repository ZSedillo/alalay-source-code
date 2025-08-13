import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../_actions/user.actions";

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/Login");
  };

  return (
    <aside
      className="w-64 p-6 shadow-lg hidden md:flex flex-col justify-between fixed top-0 left-0 h-screen"
      style={{ backgroundColor: "#B11116" }}
    >
      {/* Top section */}
      <div>
        <div className="mb-8 text-white">
          <h2 className="text-xl font-bold">BPI Alalay</h2>
        </div>
        <nav>
          <ul className="space-y-2">
            <li
              className="cursor-pointer text-white hover:text-gray-200 transition"
              onClick={() => navigate("/")}
            >
              Feed
            </li>
            <li
              className="cursor-pointer text-white hover:text-gray-200 transition"
              onClick={() => navigate("/scholars")}
            >
              Our Scholars
            </li>
            <li className="cursor-pointer text-white hover:text-gray-200 transition">
              Profile
            </li>
            <li className="cursor-pointer text-white hover:text-gray-200 transition">
              Settings
            </li>
          </ul>
        </nav>
      </div>

      {/* Bottom Logout Button */}
      <div>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 text-white rounded-lg transition"
          style={{ backgroundColor: '#D5B527' }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#bfa021'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#D5B527'}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
