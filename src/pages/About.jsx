import React from "react";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaUsers,
  FaGlobe,
  FaAward,
  FaRocket,
  FaMapMarkedAlt,
  FaQuoteLeft
} from "react-icons/fa";

export default function About({ darkMode }) {
  const values = [
    {
      icon: <FaHeart className="text-3xl" />,
      title: "Passion for India",
      description: "I love showcasing India's incredible diversity and beauty",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: <FaUsers className="text-3xl" />,
      title: "Community First",
      description: "Building a community of travelers and culture enthusiasts",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaGlobe className="text-3xl" />,
      title: "Accessibility",
      description: "Making travel information free and accessible to everyone",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <FaAward className="text-3xl" />,
      title: "Quality Content",
      description: "Providing accurate, detailed, and helpful travel information",
      color: "from-purple-500 to-indigo-500"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
        : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
    }`}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`relative overflow-hidden py-20 ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 via-purple-900 to-indigo-900"
            : "bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700"
        } text-white`}
      >
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white opacity-10 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-8xl mb-8"
          >
            🏛️
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">Desh Darshan</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto"
          >
            🌟 Connecting travelers with India's incredible heritage and natural beauty
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className={`text-4xl font-bold mb-6 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}>
                🎯 My Mission
              </h2>
              <p className={`text-lg leading-relaxed mb-6 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                Desh Darshan was born from a simple belief: everyone should have access to comprehensive, 
                accurate information about India's most beautiful destinations. I'm passionate about 
                showcasing the rich cultural heritage, stunning landscapes, and diverse attractions 
                that make India truly incredible.
              </p>
              <p className={`text-lg leading-relaxed ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                🚀 From the snow-capped peaks of the Himalayas to the tropical beaches of the south, 
                from ancient temples to modern marvels, I curate the best experiences India has to offer.
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`rounded-3xl p-8 shadow-2xl ${
                darkMode
                  ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700"
                  : "bg-gradient-to-br from-white to-gray-50 border border-gray-200"
              }`}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">🇮🇳</div>
                <h3 className={`text-2xl font-bold mb-4 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}>
                  Incredible India
                </h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className={`text-3xl font-bold ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    }`}>100+</div>
                    <div className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}>Destinations</div>
                  </div>
                  <div>
                    <div className={`text-3xl font-bold ${
                      darkMode ? "text-green-400" : "text-green-600"
                    }`}>28</div>
                    <div className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}>States</div>
                  </div>
                  <div>
                    <div className={`text-3xl font-bold ${
                      darkMode ? "text-purple-400" : "text-purple-600"
                    }`}>5000+</div>
                    <div className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}>Years History</div>
                  </div>
                  <div>
                    <div className={`text-3xl font-bold ${
                      darkMode ? "text-orange-400" : "text-orange-600"
                    }`}>∞</div>
                    <div className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}>Memories</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-6 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}>
              💎 My Values
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}>
              The principles that guide everything I do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`text-center p-8 rounded-3xl shadow-xl border ${
                  darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white`}>
                  {value.icon}
                </div>
                <h3 className={`text-xl font-bold mb-4 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}>
                  {value.title}
                </h3>
                <p className={`${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>



        {/* Testimonial Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className={`rounded-3xl p-12 text-center relative overflow-hidden ${
            darkMode
              ? "bg-gradient-to-br from-gray-800 to-gray-900"
              : "bg-gradient-to-br from-blue-50 to-purple-50"
          }`}>
            <div className="absolute top-8 left-8 text-6xl opacity-20">
              <FaQuoteLeft />
            </div>
            <div className="relative z-10">
              <p className={`text-2xl font-light mb-8 italic ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}>
                "Desh Darshan has transformed how we explore India. The detailed information 
                and beautiful presentation make every trip an adventure!"
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="text-4xl">👨👩👧👦</div>
                <div>
                  <div className={`font-bold text-lg ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}>
                    The Gupta Family
                  </div>
                  <div className={`${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}>
                    Travel Enthusiasts
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-6xl mb-6"
              >
                🚀
              </motion.div>
              <h3 className="text-4xl font-bold mb-6">
                Join This Journey
              </h3>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Discover India's incredible beauty through this passion project
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-2 justify-center"
                >
                  <FaRocket />
                  Start Exploring
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-blue-600 transition-colors flex items-center gap-2 justify-center"
                >
                  <FaMapMarkedAlt />
                  View Map
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}