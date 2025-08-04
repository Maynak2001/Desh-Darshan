import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FaHeart, 
  FaMapPin, 
  FaClock, 
  FaStar, 
  FaPlay, 
  FaPause, 
  FaTicketAlt, 
  FaSun, 
  FaImage,
  FaPhone,
  FaGlobe,
  FaCar,
  FaUtensils,
  FaHotel,
  FaCamera,
  FaWifi,
  FaParking,
  FaWheelchair,
  FaBaby,
  FaDog
} from "react-icons/fa";
import AudioGuide from "./AudioGuide";
import LocationDetailsOverlay from "./LocationDetailsOverlay";

export default function LocationCard({ place, onGetDirections, onViewDetails, onFavorite, isFavorited, darkMode }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetailsOverlay, setShowDetailsOverlay] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!place) {
    return null;
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Historical":
      case "Museum":
        return "🏛️";
      case "Nature":
        return "🌿";
      case "Cultural":
        return "🎭";
      default:
        return "📍";
    }
  };

  const getCategoryColorClasses = (category) => {
    switch (category) {
      case "Historical":
        return "from-purple-500 to-indigo-600";
      case "Museum":
        return "from-blue-500 to-cyan-600";
      case "Nature":
        return "from-green-500 to-emerald-600";
      case "Cultural":
        return "from-orange-500 to-red-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getImageUrl = (place) => {
    // If place has a specific image URL, use it
    if (place.imageUrl) {
      return place.imageUrl;
    }
    
    // Otherwise, use dynamic Unsplash images
    const searchTerms = [
      `${place.name} ${place.city} India`,
      `${place.name} ${place.category} India`,
      `${place.name} tourist attraction`,
      `${place.category} ${place.city} India`
    ];
    
    const randomSearchTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
    const encodedTerm = encodeURIComponent(randomSearchTerm);
    return `https://source.unsplash.com/800x600/?${encodedTerm}&sig=${place.id}`;
  };

  const getOpeningHours = (category) => {
    switch (category) {
      case "Historical":
      case "Museum":
        return "6:00 AM - 6:00 PM";
      case "Nature":
        return "24/7";
      case "Cultural":
        return "5:00 AM - 9:00 PM";
      default:
        return "6:00 AM - 6:00 PM";
    }
  };

  const getFacilities = (category) => {
    const baseFacilities = [FaParking, FaWifi];
    
    switch (category) {
      case "Historical":
      case "Museum":
        return [...baseFacilities, FaCamera, FaUtensils, FaHotel];
      case "Nature":
        return [...baseFacilities, FaCamera, FaCar];
      case "Cultural":
        return [...baseFacilities, FaUtensils, FaHotel, FaCamera];
      default:
        return baseFacilities;
    }
  };

  const handleLikeToggle = () => {
    if (onFavorite) {
      onFavorite();
    }
  };

  const handleGetDirections = () => {
    if (onGetDirections) {
      onGetDirections();
    } else {
      const { lat, lng } = place.coordinates;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      window.open(url, '_blank');
    }
  };

  const handleViewDetails = () => {
    setShowDetailsOverlay(true);
    if (onViewDetails) {
      onViewDetails();
    }
  };

  const facilities = getFacilities(place.category);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8, scale: 1.02 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`group relative rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <div className="relative h-56 overflow-hidden">
          {!imageError ? (
            <img
              src={getImageUrl(place)}
              alt={place.name}
              className={`w-full h-full object-cover transition-all duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              } group-hover:scale-110`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          ) : (
            <div 
              className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${getCategoryColorClasses(place.category || "Historical")}`}
            >
              <div className="text-6xl text-white opacity-80">
                {getCategoryIcon(place.category || "Historical")}
              </div>
            </div>
          )}

          {!imageError && (
            <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-10 transition-opacity duration-300"></div>
          )}

          {/* Category Badge */}
          <div className={`absolute top-4 left-4 backdrop-blur-sm rounded-full px-3 py-1 ${
            darkMode ? 'bg-gray-800/90 text-gray-200' : 'bg-white/90 text-gray-800'
          }`}>
            <span className="text-sm font-semibold">{place.category || "Historical"}</span>
          </div>

          {/* Like Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLikeToggle}
            className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
          >
            <FaHeart className={`text-lg ${isFavorited ? 'text-red-500' : 'text-white'}`} />
          </motion.button>

          {/* Rating Badge */}
          <div className={`absolute bottom-4 left-4 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 ${
            darkMode ? 'bg-gray-800/90 text-gray-200' : 'bg-white/90 text-gray-800'
          }`}>
            <FaStar className="text-yellow-500 text-sm" />
            <span className="text-sm font-semibold">{place.rating || "4.5"}</span>
          </div>

          {/* Entry Fee Badge */}
          {place.entryFee && (
            <div className={`absolute bottom-4 right-4 backdrop-blur-sm rounded-full px-3 py-1 ${
              darkMode ? 'bg-gray-800/90 text-gray-200' : 'bg-white/90 text-gray-800'
            }`}>
              <FaTicketAlt className="text-green-600 text-sm" />
            </div>
          )}

          {/* Image Count Badge */}
          <div className={`absolute bottom-4 right-12 backdrop-blur-sm rounded-full px-3 py-1 ${
            darkMode ? 'bg-gray-800/90 text-gray-200' : 'bg-white/90 text-gray-800'
          }`}>
            <FaImage className="text-blue-600 text-sm" />
          </div>
        </div>

        <div className="p-6">
          {/* Title and Location */}
          <div className="mb-4">
            <h3 className={`text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors ${
              darkMode ? 'text-gray-100' : 'text-gray-800'
            }`}>
              {place.name || "Unknown Place"}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FaMapPin className="text-blue-500" />
              <span>{place.city}, {place.state}</span>
            </div>
          </div>

          {/* Description */}
          <p className={`text-sm mb-4 line-clamp-3 leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {place.description || "A beautiful place to visit in India."}
          </p>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <FaClock className="text-blue-500" />
              <span>{place.visitTime || "2-3 hours"}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <FaStar className="text-yellow-500" />
              <span>{place.reviews || "100"} reviews</span>
            </div>
            {place.bestTime && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <FaSun className="text-orange-500" />
                <span>Best: {place.bestTime}</span>
              </div>
            )}
            {place.entryFee && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <FaTicketAlt className="text-green-500" />
                <span className="truncate">{place.entryFee}</span>
              </div>
            )}
          </div>

          {/* Opening Hours */}
          <div className="mb-4">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <FaClock className="text-blue-500" />
              <span>Opening Hours: {getOpeningHours(place.category)}</span>
            </div>
          </div>

          {/* Facilities */}
          <div className="mb-4">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <span>Facilities:</span>
            </div>
            <div className="flex gap-2">
              {facilities.map((Icon, index) => (
                <div key={index} className="p-1 rounded-full bg-gray-100 text-gray-600">
                  <Icon className="text-xs" />
                </div>
              ))}
            </div>
          </div>

          {/* Audio Guide Section */}
          <div className={`border-t pt-4 mb-4 ${
            darkMode ? 'border-gray-700' : 'border-gray-100'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className={`text-sm font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Audio Guide Available</span>
              </div>
              <AudioGuide text={place.description || "A beautiful place to visit in India."} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGetDirections}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FaMapPin className="text-sm" />
              Get Directions
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleViewDetails}
              className={`px-4 py-3 border-2 rounded-xl font-semibold transition-all duration-300 ${
                darkMode 
                  ? 'border-gray-600 text-gray-300 hover:border-blue-500 hover:text-blue-400'
                  : 'border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600'
              }`}
            >
              Details
            </motion.button>
          </div>
        </div>

        {/* Hover Effect Overlay */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent pointer-events-none"
          />
        )}
      </motion.div>

      <LocationDetailsOverlay
        place={place}
        isOpen={showDetailsOverlay}
        onClose={() => setShowDetailsOverlay(false)}
        darkMode={darkMode}
      />
    </>
  );
}
