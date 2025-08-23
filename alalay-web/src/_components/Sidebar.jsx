import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Users, User, Settings, LogOut, Menu, X } from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile view
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close drawer on route change (mobile)
  useEffect(() => {
    if (isMobile) {
      setDrawerOpen(false);
    }
  }, [location.pathname, isMobile]);

  // Prevent body scroll when drawer is open on mobile
  useEffect(() => {
    if (drawerOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [drawerOpen, isMobile]);

  const handleLogout = async () => {
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
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#8A1A1C] to-[#5C1213] text-white shadow-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-1 rounded-md hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/20"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="font-bold text-lg tracking-wide">BPI Alalay</h1>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {drawerOpen && isMobile && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          
          {/* Drawer */}
          <div className={`
            absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-[#8A1A1C] to-[#5C1213] 
            text-white shadow-2xl transform transition-transform duration-300 ease-out
            ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/20">
                <div>
                  <h2 className="text-xl font-bold tracking-wide">BPI Alalay</h2>
                  <p className="text-sm text-gray-200 mt-1">Your trusted partner</p>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/20"
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
                      <li key={index}>
                        <button
                          onClick={() => handleNavigate(item.path)}
                          className={`
                            w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left
                            transition-all duration-200 transform hover:scale-[1.02]
                            ${isActive 
                              ? "bg-white/20 font-semibold shadow-lg" 
                              : "hover:bg-white/10 active:bg-white/15"
                            }
                          `}
                        >
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

              {/* Logout Button */}
              <div className="p-4 border-t border-white/20">
                <button
                  onClick={handleLogout}
                  className="
                    w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl
                    bg-[#D5B527] hover:bg-[#bfa021] text-black font-semibold
                    transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg
                    focus:outline-none focus:ring-2 focus:ring-[#D5B527]/50
                  "
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
      <aside className="
        hidden md:flex fixed left-0 top-0 h-full w-64 z-40
        bg-gradient-to-b from-[#8A1A1C] to-[#5C1213] text-white
        shadow-2xl flex-col justify-between
      ">
        {/* Header */}
        <div>
          <div className="p-6 border-b border-white/20">
            <h2 className="text-2xl font-bold tracking-wide">BPI Alalay</h2>
            <p className="text-sm text-gray-200 mt-1">Your trusted partner</p>
          </div>

          {/* Navigation */}
          <nav className="px-4 py-6">
            <ul className="space-y-2">
              {navItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={index}>
                    <button
                      onClick={() => handleNavigate(item.path)}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left
                        transition-all duration-200 transform hover:scale-[1.02]
                        ${isActive 
                          ? "bg-white/20 font-semibold shadow-lg" 
                          : "hover:bg-white/10 active:bg-white/15"
                        }
                      `}
                    >
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

        {/* Logout Button */}
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="
              w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl
              bg-[#D5B527] hover:bg-[#bfa021] text-black font-semibold
              transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg
              focus:outline-none focus:ring-2 focus:ring-[#D5B527]/50
            "
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