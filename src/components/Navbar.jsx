import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Map, Heart, Home, Sun, Moon } from "lucide-react";

export default function Navbar({ darkMode, setDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Map", path: "/explore", icon: <Map size={18} /> },
    { name: "Favorites", path: "/favorites", icon: <Heart size={18} /> },
  ];

  return (
    <nav className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-800 shadow-gray-900/20 border-gray-700' 
        : 'bg-white shadow-lg border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Clickable Logo */}
        <Link to="/" className="flex items-center pl-2 hover:opacity-80 transition-opacity duration-300">
          <svg
            viewBox="0 0 360 100"
            className="w-[180px] h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="saffronGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF9933" />
                <stop offset="100%" stopColor="#FF7518" />
              </linearGradient>
              <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#34A853" />
                <stop offset="100%" stopColor="#0f9d58" />
              </linearGradient>
            </defs>

            {/* Desh */}
            <text
              x="10"
              y="65"
              fontSize="42"
              fontFamily="'Segoe UI', sans-serif"
              fontWeight="bold"
              fill="url(#saffronGradient)"
            >
              Desh
            </text>

            {/* White Circle for Chakra */}
            <circle cx="140" cy="52" r="20" fill="#ffffff" />

            {/* Chakra */}
            <text
              x="121"
              y="67"
              fontSize="45"
              fontWeight="bold"
              fontFamily="'Segoe UI', sans-serif"
              fill="#000080"
            >
              ☸
            </text>

            {/* Darshan */}
            <text
              x="170"
              y="65"
              fontSize="42"
              fontFamily="'Segoe UI', sans-serif"
              fontWeight="bold"
              fill="url(#greenGradient)"
            >
              Darshan
            </text>
          </svg>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                location.pathname === item.path 
                  ? darkMode
                    ? "text-blue-400 bg-blue-900/20 border border-blue-700"
                    : "text-blue-600 bg-blue-50 border border-blue-200"
                  : darkMode
                    ? "text-gray-300 hover:text-blue-400 hover:bg-gray-700"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
          
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg transition-all duration-300 ${
              darkMode 
                ? 'text-yellow-400 hover:bg-gray-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden transition-colors duration-300 ${
            darkMode ? 'text-gray-300' : 'text-gray-800'
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className={`md:hidden absolute left-0 right-0 top-full border-t shadow-lg transition-colors duration-300 ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-100'
        }`}>
          <div className="py-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors ${
                  location.pathname === item.path 
                    ? darkMode
                      ? "text-blue-400 bg-blue-900/20 border-l-4 border-blue-600"
                      : "text-blue-600 bg-blue-50 border-l-4 border-blue-600"
                    : darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-800 hover:bg-gray-50"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Dark Mode Toggle */}
            <button
              onClick={() => {
                setDarkMode(!darkMode);
                setIsOpen(false);
              }}
              className={`flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors w-full text-left ${
                darkMode 
                  ? 'text-yellow-400 hover:bg-gray-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}