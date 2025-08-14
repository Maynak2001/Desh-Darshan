import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Map, Heart, Home, Sun, Moon, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ darkMode, setDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Map", path: "/explore", icon: <Map size={18} /> },
    { name: "About", path: "/about", icon: <Info size={18} /> },
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

        {/* Enhanced Mobile Menu Button with Animation */}
        <motion.button
          className={`md:hidden p-3 rounded-xl transition-all duration-300 border ${
            darkMode 
              ? 'text-gray-300 hover:text-white hover:bg-gray-700 border-gray-600' 
              : 'text-gray-800 hover:text-blue-600 hover:bg-blue-50 border-gray-200'
          }`}
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </motion.div>
        </motion.button>
      </div>

      {/* Enhanced Mobile Dropdown Menu with Animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`md:hidden absolute left-0 right-0 top-full border-t shadow-2xl backdrop-blur-sm z-50 overflow-hidden ${
              darkMode 
                ? 'bg-gray-800/95 border-gray-700' 
                : 'bg-white/95 border-gray-100'
            }`}
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              className="py-4 px-2"
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-4 mx-2 mb-2 px-6 py-5 text-lg font-medium rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                      location.pathname === item.path 
                        ? darkMode
                          ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg border-2 border-blue-500"
                          : "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg border-2 border-blue-500"
                        : darkMode
                          ? "text-gray-300 hover:text-white hover:bg-gray-700 border-2 border-transparent hover:border-gray-600"
                          : "text-gray-800 hover:text-blue-600 hover:bg-blue-50 border-2 border-transparent hover:border-blue-200"
                    }`}
                  >
                    <motion.div 
                      className={`p-2 rounded-xl ${
                        location.pathname === item.path
                          ? 'bg-white/20'
                          : darkMode
                            ? 'bg-gray-600/50'
                            : 'bg-gray-100'
                      }`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {React.cloneElement(item.icon, { size: 22 })}
                    </motion.div>
                    <span className="font-semibold">{item.name}</span>
                    {location.pathname === item.path && (
                      <motion.div 
                        className="ml-auto"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                      >
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      </motion.div>
                    )}
                  </Link>
                </motion.div>
              ))}
              
              {/* Enhanced Mobile Dark Mode Toggle */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: navItems.length * 0.1, duration: 0.3 }}
                className="border-t border-gray-200/20 mt-4 pt-4 mx-2"
              >
                <button
                  onClick={() => {
                    setDarkMode(!darkMode);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-4 w-full px-6 py-5 text-lg font-medium rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 ${
                    darkMode 
                      ? 'text-yellow-400 hover:text-yellow-300 hover:bg-yellow-900/20 border-transparent hover:border-yellow-600/50' 
                      : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-transparent hover:border-blue-200'
                  }`}
                >
                  <motion.div 
                    className={`p-2 rounded-xl ${
                      darkMode
                        ? 'bg-yellow-900/30'
                        : 'bg-blue-100'
                    }`}
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    {darkMode ? <Sun size={22} /> : <Moon size={22} />}
                  </motion.div>
                  <span className="font-semibold">
                    {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                  </span>
                  <div className="ml-auto">
                    <motion.div 
                      className={`w-12 h-6 rounded-full transition-colors duration-300 relative ${
                        darkMode ? 'bg-yellow-600' : 'bg-gray-300'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div 
                        className="absolute top-1 w-4 h-4 rounded-full bg-white"
                        animate={{ x: darkMode ? 28 : 4 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </motion.div>
                  </div>
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}