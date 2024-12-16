import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Menu, X } from 'lucide-react';
import ThemeSwitcher from "../common/ThemeSwitcher";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const NavLinks = () => (
    <>
      <Link 
        to="/" 
        className="from-left px-3 py-2 rounded-md transition-colors"
      >
        Home
      </Link>
      <Link 
        to="/turfs" 
        className="from-left px-3 py-2 rounded-md transition-colors"
      >
        Turfs
      </Link>
    </>
  );

  return (
    <nav className="fixed w-full z-20 top-0 left-0 bg-base-100 shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xl font-semibold "
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

        {/* Right Side (Theme Switcher & Login) */}
        <div className="flex items-center space-x-4">
          <ThemeSwitcher />
          <Link 
            to="/login" 
            className="hidden lg:block px-4 py-2 bg-base-100 from-left rounded-md transition-colors"
          >
            Login
          </Link>

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
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={toggleMobileMenu}>
          <div 
            className="absolute top-0 right-0 w-64 h-full bg-base-100  shadow-lg p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end">
              <button onClick={toggleMobileMenu} className="focus:outline-none">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col space-y-3">
              <NavLinks />
              <Link 
                to="/login" 
                className="from-left px-4 py-2 bg-base-100 rounded-md"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;