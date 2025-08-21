import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { logout } from "../_actions/user.actions";
import { Home, Users, User, Settings, LogOut } from "lucide-react"; // icons

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation(); // to detect current route
  // const dispatch = useDispatch();

  const handleLogout = async () => {
    // await dispatch(logout()); // 🔒 Disabled backend logout for now
    navigate("/Login"); // Just redirect without backend
  };

  const navItems = [
    { label: "Feed", icon: <Home className="w-5 h-5" />, path: "/Feed" },
    { label: "Our Scholars", icon: <Users className="w-5 h-5" />, path: "/scholars" },
    { label: "Profile", icon: <User className="w-5 h-5" />, path: "/profile" },
    { label: "Settings", icon: <Settings className="w-5 h-5" />, path: "/settings" },
  ];

  return (
    <aside
      className="w-56 p-6 shadow-xl hidden md:flex flex-col justify-between fixed top-0 left-0 h-screen
                 bg-gradient-to-b from-[#8A1A1C] to-[#5C1213] text-white"
    >
      {/* Top section */}
      <div>
        <div className="mb-8 border-b border-white/20 pb-4">
          <h2 className="text-2xl font-extrabold tracking-wide">BPI Alalay</h2>
          <p className="text-sm text-gray-200">Your trusted partner</p>
        </div>

        <nav>
          <ul className="space-y-2">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <li
                  key={index}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all 
                    ${isActive ? "bg-white/20 font-semibold" : "hover:bg-white/10"}`}
                  onClick={() => navigate(item.path)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Bottom Logout Button */}
      <div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg 
                     bg-[#D5B527] hover:bg-[#bfa021] text-black font-medium transition"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
