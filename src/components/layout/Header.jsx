import { useState, useEffect } from "react";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("bg-black", "text-white");
    } else {
      document.body.classList.remove("bg-black", "text-white");
    }
  }, [isDarkMode]);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="flex items-center justify-between py-4 px-6 w-full bg-black text-white relative z-50">
      {/* Title */}
      <div className="flex items-center space-x-4">
        <span className="lg:text-2xl text-xl font-bold font-poppins tracking-wide">
          CODERS & DEVELOPERS CLUB
        </span>
      </div>

      {/* Desktop & Tablet Links */}
      <ul className="hidden lg:flex space-x-8 text-lg font-roboto-slab font-semibold">
        <li className="group">
          <NavLink
            to="/"
            className="hover:text-gray-300 transition-colors duration-300 block p-2"
          >
            Home
          </NavLink>
        </li>
        <li className="group">
          <NavLink
            to="events"
            className="hover:text-gray-300 transition-colors duration-300 block p-2"
          >
            Events
          </NavLink>
        </li>
        <li className="group">
          <NavLink
            to="team"
            className="hover:text-gray-300 transition-colors duration-300 block p-2"
          >
            Team
          </NavLink>
        </li>
        <li className="group">
          <NavLink
            to="contact"
            className="hover:text-gray-300 transition-colors duration-300 block p-2"
          >
            Contact
          </NavLink>
        </li>
        <li className="group">
          <NavLink
            to="verify"
            className="hover:text-gray-300 transition-colors duration-300 block p-2"
          >
            DashBoard
          </NavLink>
        </li>
      </ul>

      {/* Mobile Menu Button (Visible on mobile & tablet) */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden text-white text-2xl focus:outline-none"
      >
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Login and Dark Mode Toggle - Always Visible */}
      <div className="hidden lg:flex items-center space-x-4">
        <NavLink
          to="login"
          className="text-lg font-roboto-slab font-semibold hover:text-gray-300 transition-colors duration-300 block p-2"
        >
          LOGIN
        </NavLink>
      </div>

      {/* Mobile & Tablet Menu - Only visible on smaller screens */}
      {isMobileMenuOpen && (
        <ul className="absolute top-full left-0 w-full h-screen bg-black bg-opacity-90 text-center py-4 lg:hidden">
          <li className="group">
            <NavLink
              to="/"
              className="text-white text-lg font-roboto-slab hover:text-gray-300 transition-colors duration-300 block py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li className="group">
            <NavLink
              to="events"
              className="text-white text-lg font-roboto-slab hover:text-gray-300 transition-colors duration-300 block py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Events
            </NavLink>
          </li>
          <li className="group">
            <NavLink
              to="team"
              className="text-white text-lg font-roboto-slab hover:text-gray-300 transition-colors duration-300 block py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Team
            </NavLink>
          </li>
          <li className="group">
            <NavLink
              to="contact"
              className="text-white text-lg font-roboto-slab hover:text-gray-300 transition-colors duration-300 block py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </NavLink>
          </li>
          <li className="group">
            <NavLink
              to="verify"
              className="text-white text-lg font-roboto-slab hover:text-gray-300 transition-colors duration-300 block py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="login"
              className="text-white text-lg font-roboto-slab hover:text-gray-300 transition-colors duration-300 block py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              LOGIN
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};
