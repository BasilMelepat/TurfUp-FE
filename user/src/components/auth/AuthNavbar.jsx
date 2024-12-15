import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Menu, X, User, BookOpen, LogOut, ChevronDown } from 'lucide-react';
import ThemeSwitcher from "../common/ThemeSwitcher.jsx";
import { logout } from "../../redux/slices/authSlice.js";

export default function AuthNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { user } = useSelector((state) => state.auth);
  
  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const NavLinks = () => (
    <>
      <Link
        to="/auth/turfs"
        className="from-left px-3 py-2 rounded-md transition-colors"
      >
        Turfs
      </Link>
      <Link
        to="/auth/become-owner"
        className="from-left px-3 py-2 rounded-md transition-colors"
      >
        Become an Owner
      </Link>
    </>
  );

  return (
    <nav className="fixed top-0 left-0 w-full bg-base-100 shadow-md z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link 
            to="/auth" 
            className="flex items-center space-x-2 text-xl font-semibold"
          >
            <img 
              src="/logo.png" 
              alt="TurfUp" 
              className="h-10 w-10 rounded-full"
            />
            <span>TurfUp</span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-4">
          <NavLinks />
        </div>

        {/* Right Side (Theme Switcher & User Menu) */}
        <div className="flex items-center space-x-4">
          <ThemeSwitcher />

          {/* User Dropdown for Desktop */}
          <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <User className="w-6 h-6" />
          </div>
          <ul tabIndex={0} className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li className="menu-title">
              <span>{user?.name || user?.email || 'User'}</span>
            </li>
            <li>
              <Link to="/auth/booking-history" className="from-left">My Bookings</Link>
            </li>
            <li>
              <a onClick={handleLogout} className="from-left">Logout</a>
            </li>
          </ul>
        </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={toggleMobileMenu} 
            className="lg:hidden focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={toggleMobileMenu}>
          <div 
            className="absolute top-0 right-0 w-64 h-full bg-base-100 shadow-lg p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end">
              <button onClick={toggleMobileMenu} className="focus:outline-none">
                <X size={24} />
              </button>
            </div>
            
            {/* User Info for Mobile */}
            <div className="flex items-center space-x-3 pb-4 border-b">
              <User className="w-10 h-10 text-gray-600" />
              <div>
                <div className="font-semibold">{user?.name || user?.email || 'User'}</div>
                <div className="text-sm text-gray-500">{user?.email}</div>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <NavLinks />
              
              <Link 
                to="/auth/booking-history"
                className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 rounded-md"
              >
                <BookOpen className="w-5 h-5" />
                <span>My Bookings</span>
              </Link>
              
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 rounded-md w-full text-left"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}