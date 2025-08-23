import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Users, User, Settings, LogOut, Menu, X } from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (isMobile) setDrawerOpen(false);
  }, [location.pathname, isMobile]);

  useEffect(() => {
    if (drawerOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [drawerOpen, isMobile]);

  const handleLogout = () => {
    setDrawerOpen(false);
    navigate("/Login");
  };

  const navItems = [
    { label: "Feed", icon: <Home className="w-5 h-5" />, path: "/Feed" },
    { label: "Our Scholars", icon: <Users className="w-5 h-5" />, path: "/scholars" },
    { label: "Profile", icon: <User className="w-5 h-5" />, path: "/profile" },
    { label: "Settings", icon: <Settings className="w-5 h-5" />, path: "/settings" },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    if (isMobile) setDrawerOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#8A1A1C] to-[#5C1213] text-white shadow-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-1 rounded-md hover:bg-white/10 transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="font-bold text-lg tracking-wide">BPI Alalay</h1>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobile && (
        <div className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer */}
          <div
            className={`absolute left-0 top-0 h-full w-72 bg-gradient-to-b from-[#8A1A1C] to-[#5C1213] text-white shadow-2xl transform transition-transform duration-300 ease-in-out
              ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/20">
                <div>
                  <h2 className="text-xl font-bold tracking-wide">BPI Alalay</h2>
                  <p className="text-sm text-gray-200 mt-1">Your trusted partner</p>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-4 py-6 overflow-y-auto">
                <ul className="space-y-2">
                  {navItems.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <li key={index} className="relative">
                        <button
                          onClick={() => handleNavigate(item.path)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200
                            ${isActive ? "bg-white/20 font-semibold" : "hover:bg-white/10"}`}
                        >
                          {isActive && (
                            <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#D5B527] rounded-r-md" />
                          )}
                          <span className={isActive ? "text-[#D5B527]" : ""}>
                            {item.icon}
                          </span>
                          <span className="font-medium">{item.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Logout */}
              <div className="p-4 border-t border-white/20">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl
                    bg-[#D5B527] hover:bg-[#bfa021] text-black font-semibold
                    transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 z-40 bg-gradient-to-b from-[#8A1A1C] to-[#5C1213] text-white shadow-2xl flex-col justify-between">
        <div>
          <div className="p-6 border-b border-white/20">
            <h2 className="text-2xl font-bold tracking-wide">BPI Alalay</h2>
            <p className="text-sm text-gray-200 mt-1">Your trusted partner</p>
          </div>

          <nav className="px-4 py-6">
            <ul className="space-y-2">
              {navItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={index} className="relative">
                    <button
                      onClick={() => handleNavigate(item.path)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200
                        ${isActive ? "bg-white/20 font-semibold" : "hover:bg-white/10"}`}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#D5B527] rounded-r-md" />
                      )}
                      <span className={isActive ? "text-[#D5B527]" : ""}>
                        {item.icon}
                      </span>
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl
              bg-[#D5B527] hover:bg-[#bfa021] text-black font-semibold
              transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
