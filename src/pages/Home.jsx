import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaMapMarkedAlt,
  FaHeart,
  FaStar,
  FaGlobe,
  FaArrowRight,
  FaCompass,
  FaRocket,
  FaPlay,
  FaMapPin,
  FaUsers,
  FaAward,
  FaShieldAlt,
  FaQuoteLeft,
  FaEnvelope,
  FaCheckCircle
} from "react-icons/fa";
import bgImage from "../assets/vm.jpg";

export default function Home({ darkMode }) {
  const features = [
    {
      icon: <FaMapMarkedAlt className="text-3xl" />,
      title: "Interactive Maps",
      description: "Explore 100+ famous places across India with detailed locations and directions",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaHeart className="text-3xl" />,
      title: "Save Favorites",
      description: "Create your personal list of must-visit destinations",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: <FaStar className="text-3xl" />,
      title: "Rich Information",
      description: "Get detailed descriptions, ratings, and visitor tips for each location",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <FaGlobe className="text-3xl" />,
      title: "All India Coverage",
      description: "Discover places from Kashmir to Kanyakumari, from Gujarat to Assam",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const popularCategories = [
    { name: "Historical Sites", icon: "🏛️", count: "40+ places", color: "from-purple-500 to-indigo-600", desc: "Ancient monuments and heritage sites" },
    { name: "Cultural Heritage", icon: "🎭", count: "35+ places", color: "from-orange-500 to-red-600", desc: "Traditional arts and cultural centers" },
    { name: "Natural Beauty", icon: "🌿", count: "25+ places", color: "from-green-500 to-emerald-600", desc: "National parks and scenic landscapes" },
    { name: "Religious Sites", icon: "🕍", count: "30+ places", color: "from-yellow-500 to-orange-600", desc: "Temples, mosques, and spiritual places" }
  ];

  const stats = [
    { number: "100+", label: "Amazing Places", icon: <FaMapPin className="text-2xl" />, color: "from-blue-500 to-cyan-500" },
    { number: "28+", label: "States & UTs", icon: <FaGlobe className="text-2xl" />, color: "from-purple-500 to-indigo-500" },
    { number: "24/7", label: "Audio Guides", icon: <FaPlay className="text-2xl" />, color: "from-indigo-500 to-purple-500" },
    { number: "100%", label: "Free Access", icon: <FaHeart className="text-2xl" />, color: "from-green-500 to-emerald-500" }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-screen">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className={`absolute inset-0 ${
            darkMode 
              ? 'bg-gradient-to-r from-gray-900/90 via-purple-900/90 to-indigo-900/90' 
              : 'bg-gradient-to-r from-blue-900/80 via-purple-900/80 to-indigo-900/80'
          }`}></div>
        </div>

        {/* Creative Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating particles */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-white opacity-5 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-40 w-24 h-24 bg-white opacity-5 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-32 left-1/3 w-16 h-16 bg-white opacity-5 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Creative floating elements */}
          <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse opacity-30" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-2/3 left-1/2 w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-bounce opacity-50" style={{ animationDelay: '0.9s' }}></div>
          
          {/* Geometric shapes */}
          <div className="absolute top-1/5 right-1/5 w-6 h-6 border-2 border-white/10 rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
          <div className="absolute bottom-1/4 left-1/5 w-4 h-4 border border-white/20 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
          
          {/* Additional creative elements */}
          <div className="absolute top-1/4 right-1/3 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-float opacity-30"></div>
          <div className="absolute bottom-1/3 left-1/4 w-6 h-6 bg-gradient-to-r from-pink-400 to-red-400 rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20 pb-32">
          <div className="max-w-6xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex justify-center mb-6 sm:mb-8"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-6 sm:p-8 shadow-2xl border border-white/20">
                  <FaGlobe className="text-5xl sm:text-6xl md:text-7xl text-white drop-shadow-lg" />
                </div>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-6 sm:mb-8 leading-tight tracking-tight"
              >
                <span className="block mb-2 drop-shadow-lg">Discover</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 drop-shadow-2xl">
                  Incredible India
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl sm:text-2xl md:text-3xl mb-8 sm:mb-10 opacity-95 max-w-5xl mx-auto leading-relaxed px-4 font-light drop-shadow-lg"
              >
                Embark on an extraordinary journey through 100+ iconic landmarks, hidden gems, and cultural treasures.
                <span className="block mt-3 text-lg sm:text-xl md:text-2xl opacity-80">
                  From the majestic Taj Mahal to the serene backwaters of Kerala.
                </span>
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/explore"
                    className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 lg:px-10 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 rounded-full text-white font-bold text-lg sm:text-xl shadow-2xl hover:shadow-3xl w-full sm:w-auto justify-center backdrop-blur-sm border border-white/20"
                  >
                    <FaCompass className="text-xl sm:text-2xl" />
                    Start Exploring
                    <FaArrowRight className="text-xl sm:text-2xl" />
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/favorites"
                    className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 lg:px-10 py-4 sm:py-5 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 rounded-full text-white font-bold text-lg sm:text-xl border-2 border-white/30 hover:border-white/50 shadow-xl hover:shadow-2xl w-full sm:w-auto justify-center"
                  >
                    <FaHeart className="text-xl sm:text-2xl" />
                    My Favorites
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center backdrop-blur-sm bg-white/5"
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-4 bg-gradient-to-b from-white to-white/50 rounded-full mt-3"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`relative z-30 mx-4 sm:mx-6 lg:mx-8 -mt-20 mb-16 rounded-3xl border overflow-hidden shadow-2xl transition-colors duration-300 ${
          darkMode
            ? 'bg-gradient-to-br from-gray-800/95 to-gray-900/95 border-gray-700 shadow-gray-900/50 backdrop-blur-xl'
            : 'bg-gradient-to-br from-white/95 to-gray-50/95 border-gray-100 backdrop-blur-xl'
        }`}
      >
        <div className={`absolute inset-0 opacity-20 ${
          darkMode
            ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30'
            : 'bg-gradient-to-r from-blue-50/50 to-purple-50/50'
        }`}></div>
        <div className="relative z-10">
          <div className={`text-center py-8 border-b ${
            darkMode ? 'border-gray-700/50' : 'border-gray-200/50'
          }`}>
            <h3 className={`text-2xl md:text-3xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Thousands</span>
            </h3>
            <p className={`text-lg mt-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Join our growing community of explorers
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 p-8 sm:p-10 lg:p-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`text-center group cursor-pointer p-6 rounded-3xl backdrop-blur-sm transition-all duration-300 border ${
                  darkMode
                    ? 'bg-gray-700/30 hover:bg-gray-600/40 border-gray-600/30 hover:border-gray-500/50'
                    : 'bg-white/40 hover:bg-white/60 border-gray-200/30 hover:border-gray-300/50'
                }`}
                whileHover={{ scale: 1.05, y: -8 }}
              >
                <motion.div
                  className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-white text-2xl">
                    {stat.icon}
                  </div>
                </motion.div>
                <motion.div
                  className={`text-4xl md:text-5xl font-extrabold mb-3 ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {stat.number}
                </motion.div>
                <div className={`font-bold text-lg ${
                  darkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Enhanced Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold mb-6 ${
              darkMode 
                ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30 text-blue-300 border border-blue-700/30' 
                : 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800'
            }`}>
              <FaAward className="text-lg" />
              Premium Features
            </div>
            <h2 className={`text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">LocalTour</span>?
            </h2>
            <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Experience India like never before with our comprehensive, user-friendly travel platform designed for modern explorers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                whileHover={{ y: -12, scale: 1.03 }}
                className={`group rounded-3xl p-8 lg:p-10 shadow-2xl transition-all duration-500 border-2 relative overflow-hidden ${
                  darkMode
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-gray-600'
                    : 'bg-gradient-to-br from-white to-gray-50 border-gray-100 hover:border-gray-200 hover:shadow-3xl'
                }`}
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${feature.color}`}></div>
                <div className="relative z-10">
                  <motion.div
                    className={`w-24 h-24 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl`}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="text-white text-3xl">
                      {feature.icon}
                    </div>
                  </motion.div>
                  <h3 className={`text-2xl font-bold mb-5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${feature.color.replace('bg-gradient-to-br', 'from')} transition-all duration-300 ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}>{feature.title}</h3>
                  <p className={`leading-relaxed text-lg ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>{feature.description}</p>
                  <div className={`mt-6 w-12 h-1 bg-gradient-to-r ${feature.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Categories Section */}
      <section className={`py-16 sm:py-20 lg:py-24 px-4 sm:px-6 relative overflow-hidden ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      }`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold mb-6 ${
              darkMode 
                ? 'bg-gradient-to-r from-green-900/30 to-emerald-900/30 text-green-300 border border-green-700/30' 
                : 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800'
            }`}>
              <FaCompass className="text-lg" />
              Explore Categories
            </div>
            <h2 className={`text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Explore by <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">Category</span>
            </h2>
            <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Discover places that perfectly match your interests and travel style across India's diverse landscape
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {popularCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                whileHover={{ scale: 1.05, y: -15, rotateY: 5 }}
                className="group cursor-pointer perspective-1000"
              >
                <div className={`bg-gradient-to-br ${category.color} rounded-3xl p-8 lg:p-10 text-white text-center shadow-2xl hover:shadow-3xl transition-all duration-500 transform group-hover:rotate-1 relative overflow-hidden`}>
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <motion.div
                    className="text-8xl mb-8 relative z-10"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.4 }}
                  >
                    {category.icon}
                  </motion.div>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 relative z-10">{category.name}</h3>
                  <div className="bg-white/20 rounded-full px-4 py-2 inline-block mb-4 relative z-10">
                    <p className="text-white font-bold text-lg">{category.count}</p>
                  </div>
                  <p className="text-white/90 text-lg leading-relaxed relative z-10">{category.desc}</p>
                  
                  {/* Hover indicator */}
                  <motion.div
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ width: 0 }}
                    whileHover={{ width: 48 }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About This Site Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-6xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">This Site</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Your gateway to discovering the incredible diversity and beauty of India
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className={`rounded-3xl p-8 shadow-2xl transition-all duration-300 border ${
                darkMode
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-100'
              }`}
            >
              <h3 className={`text-2xl font-bold mb-6 ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>Our Mission</h3>
              <p className={`text-lg leading-relaxed mb-6 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                LocalTour is dedicated to showcasing the rich cultural heritage, stunning landscapes,
                and diverse attractions that make India truly incredible. We believe every traveler
                should have access to comprehensive information about India's most beautiful destinations.
              </p>
              <p className={`text-lg leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                From the snow-capped peaks of the Himalayas to the tropical beaches of the south,
                from ancient temples to modern marvels, we curate the best experiences India has to offer.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className={`rounded-2xl p-6 shadow-lg transition-all duration-300 border ${
                darkMode
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-100'
              }`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <FaGlobe className="text-white text-xl" />
                  </div>
                  <h4 className={`text-xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}>Comprehensive Coverage</h4>
                </div>
                <p className={`${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Explore over 100 carefully selected destinations across all 28 states and 8 union territories of India.
                </p>
              </div>

              <div className={`rounded-2xl p-6 shadow-lg transition-all duration-300 border ${
                darkMode
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-100'
              }`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <FaHeart className="text-white text-xl" />
                  </div>
                  <h4 className={`text-xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}>Free & Accessible</h4>
                </div>
                <p className={`${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  All our content is completely free and accessible to everyone who wants to explore India's beauty.
                </p>
              </div>

              <div className={`rounded-2xl p-6 shadow-lg transition-all duration-300 border ${
                darkMode
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-100'
              }`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <FaStar className="text-white text-xl" />
                  </div>
                  <h4 className={`text-xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}>Quality Information</h4>
                </div>
                <p className={`${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Each destination features detailed descriptions, ratings, and practical travel information.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-12 sm:py-16 lg:py-20 px-4 sm:px-6 ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 to-gray-800'
          : 'bg-gradient-to-br from-blue-50 to-indigo-50'
      }`}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-6xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              What <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Travelers Say</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Join thousands of satisfied explorers who've discovered India with LocalTour
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                location: "Mumbai, India",
                text: "LocalTour helped me discover hidden gems in my own country! The detailed information and audio guides made every trip memorable.",
                rating: 5
              },
              {
                name: "David Johnson",
                location: "London, UK",
                text: "As a foreign tourist, LocalTour was invaluable. The comprehensive coverage and cultural insights made my India trip extraordinary.",
                rating: 5
              },
              {
                name: "Rajesh Kumar",
                location: "Delhi, India",
                text: "The interactive maps and detailed descriptions helped me plan perfect weekend getaways. Highly recommended for every travel enthusiast!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`rounded-3xl p-8 shadow-2xl transition-all duration-300 border relative ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-100'
                }`}
              >
                <div className={`absolute top-6 left-8 text-4xl opacity-20 ${
                  darkMode ? 'text-gray-600' : 'text-gray-300'
                }`}>
                  <FaQuoteLeft />
                </div>
                <div className="relative z-10">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-xl" />
                    ))}
                  </div>
                  <p className={`text-lg mb-6 leading-relaxed ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg mr-4`}>
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className={`font-bold ${
                        darkMode ? 'text-white' : 'text-gray-800'
                      }`}>{testimonial.name}</h4>
                      <p className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={`py-12 sm:py-16 lg:py-20 px-4 sm:px-6 ${
        darkMode
          ? 'bg-gradient-to-r from-gray-800 to-gray-900'
          : 'bg-gradient-to-r from-gray-50 to-blue-50'
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className={`w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-8`}>
              <FaEnvelope className="text-white text-3xl" />
            </div>
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Stay Updated with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">LocalTour</span>
            </h2>
            <p className={`text-xl mb-8 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Get the latest travel guides, hidden gems, and exclusive content delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className={`flex-1 px-6 py-4 rounded-full border-2 focus:outline-none focus:ring-4 transition-all duration-300 ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20'
                    : 'bg-white border-gray-200 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20'
                }`}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 justify-center"
              >
                <FaCheckCircle className="text-lg" />
                Subscribe
              </motion.button>
            </div>
            <p className={`text-sm mt-4 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className={`py-16 sm:py-20 lg:py-24 px-4 sm:px-6 relative overflow-hidden ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900'
          : 'bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700'
      }`}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        <div className="max-w-5xl mx-auto text-center text-white relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <FaRocket className="text-white text-4xl" />
              </div>
            </motion.div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight">
              Ready to Start Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 mt-2">
                Epic Adventure?
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl mb-4 opacity-95 max-w-3xl mx-auto leading-relaxed">
              Join <span className="font-bold text-yellow-300">50,000+</span> travelers discovering the beauty of India
            </p>
            
            <p className="text-lg mb-12 opacity-80 max-w-2xl mx-auto">
              Start exploring today and create memories that will last a lifetime
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center px-4 mb-8">
              <motion.div
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link
                  to="/explore"
                  className="group inline-flex items-center gap-3 px-8 lg:px-12 py-5 lg:py-6 bg-white text-blue-600 rounded-full font-bold text-lg lg:text-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl w-full sm:w-auto justify-center relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <FaRocket className="text-2xl group-hover:rotate-12 transition-transform duration-300" />
                  <span className="relative z-10">Start Exploring Now</span>
                  <FaArrowRight className="text-xl group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link
                  to="/favorites"
                  className="group inline-flex items-center gap-3 px-8 lg:px-12 py-5 lg:py-6 border-2 border-white/50 text-white rounded-full font-bold text-lg lg:text-xl hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm w-full sm:w-auto justify-center"
                >
                  <FaHeart className="text-2xl group-hover:scale-110 transition-transform duration-300" />
                  <span>View Favorites</span>
                </Link>
              </motion.div>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
              <div className="flex items-center gap-2">
                <FaUsers className="text-2xl" />
                <span className="text-lg font-semibold">50K+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <FaStar className="text-2xl text-yellow-400" />
                <span className="text-lg font-semibold">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-2xl" />
                <span className="text-lg font-semibold">100% Free</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
