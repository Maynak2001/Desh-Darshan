import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaTimes, 
  FaMapPin, 
  FaClock, 
  FaStar, 
  FaTicketAlt, 
  FaSun, 
  FaPhone, 
  FaGlobe, 
  FaCar, 
  FaPlane, 
  FaTrain, 
  FaBus,
  FaCamera,
  FaWifi,
  FaParking,
  FaWheelchair,
  FaUtensils,
  FaHotel,
  FaShoppingBag,
  FaCalendarAlt,
  FaThermometerHalf,
  FaCloud,
  FaUmbrella,
  FaShieldAlt,
  FaInfoCircle,
  FaLightbulb,
  FaCheckCircle,
  FaExclamationTriangle
} from "react-icons/fa";

export default function LocationDetailsOverlay({ place, isOpen, onClose, darkMode }) {
  const getImageUrl = () => {
  if (place.imageUrl) return place.imageUrl;

  const searchTerms = [
    `${place.name} ${place.city} India`,
    `${place.name} ${place.category} India`,
    `${place.name} tourist attraction`,
    `${place.category} ${place.city} India`
  ];
  const encoded = encodeURIComponent(searchTerms[Math.floor(Math.random() * searchTerms.length)]);
  return `https://source.unsplash.com/800x600/?${encoded}&sig=${place.id}`;
};
  // Close overlay on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!place) return null;

  // Get category icon and color
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Historical": return "🏛️";
      case "Museum": return "🏛️";
      case "Nature": return "🌿";
      case "Cultural": return "🎭";
      default: return "📍";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Historical": return "from-purple-500 to-indigo-600";
      case "Museum": return "from-blue-500 to-cyan-600";
      case "Nature": return "from-green-500 to-emerald-600";
      case "Cultural": return "from-orange-500 to-red-600";
      default: return "from-gray-500 to-gray-600";
    }
  };

  // Generate additional details
  const getTransportationInfo = () => {
    const transport = [];
    if (place.coordinates) {
      transport.push("Car: Available via GPS navigation");
      transport.push("Public Transport: Bus and train connections available");
      transport.push("Airport: Nearest airport with taxi services");
    }
    return transport;
  };

  const getAmenities = () => {
    return place.facilities || [
      "Parking Available",
      "Wheelchair Accessible",
      "Restrooms",
      "Food & Beverages",
      "Souvenir Shops",
      "Guided Tours",
      "Photography Allowed",
      "WiFi Available"
    ];
  };

  const getBestTimeToVisit = () => {
    const month = new Date().getMonth();
    if (month >= 10 || month <= 2) return "Winter (October to March)";
    if (month >= 3 && month <= 5) return "Spring (March to May)";
    if (month >= 6 && month <= 9) return "Monsoon (June to September)";
    return "Year-round";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
          />

          {/* Overlay Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 z-50 overflow-y-auto"
          >
            <div className="min-h-full flex items-center justify-center p-4">
              <div className={`rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                {/* Header */}
                <div className={`relative h-64 bg-gradient-to-br ${getCategoryColor(place.category || "Historical")} overflow-hidden`}>
                  <div className="absolute inset-0 bg-black opacity-30"></div>
                  
                  {/* Close Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="absolute top-6 right-6 p-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-30 transition-all duration-300 z-10"
                  >
                    <FaTimes className="text-white text-xl" />
                  </motion.button>

                  {/* Category Badge */}
                  <img
  src={getImageUrl()}
  alt={place.name}
  className="w-full h-64 object-cover rounded-t-lg"
/>

                  {/* Main Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-8xl mb-4 opacity-80">
                        {getCategoryIcon(place.category || "Historical")}
                      </div>
                      <h1 className="text-4xl font-bold mb-2">{place.name}</h1>
                      <div className="flex items-center justify-center gap-4 text-lg">
                        <FaMapPin className="text-yellow-300" />
                        <span>{place.city}, {place.state}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`p-8 overflow-y-auto max-h-[calc(90vh-16rem)] ${
                  darkMode ? 'text-gray-100' : 'text-gray-800'
                }`}>
                  {/* Description */}
                  <div className="mb-8">
                    <h2 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${
                      darkMode ? 'text-gray-100' : 'text-gray-800'
                    }`}>
                      <FaInfoCircle className="text-blue-600" />
                      About This Place
                    </h2>
                    <p className={`leading-relaxed text-lg ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {place.description}
                    </p>
                  </div>

                  {/* Key Information Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Visit Information */}
                    <div className={`rounded-2xl p-6 ${
                      darkMode 
                        ? 'bg-gray-700 border border-gray-600' 
                        : 'bg-gradient-to-br from-blue-50 to-indigo-50'
                    }`}>
                      <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                        darkMode ? 'text-gray-100' : 'text-gray-800'
                      }`}>
                        <FaClock className="text-blue-600" />
                        Visit Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <FaClock className="text-blue-500" />
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                            <strong>Visit Time:</strong> {place.visitTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <FaSun className="text-orange-500" />
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                            <strong>Best Time:</strong> {place.bestTime || getBestTimeToVisit()}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <FaTicketAlt className="text-green-600" />
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                            <strong>Entry Fee:</strong> {place.entryFee || "Free"}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <FaStar className="text-yellow-500" />
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                            <strong>Rating:</strong> {place.rating}/5 ({place.reviews} reviews)
                          </span>
                        </div>
                        {place.openingHours && (
                          <div className="flex items-center gap-3">
                            <FaClock className="text-blue-500" />
                            <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                              <strong>Opening Hours:</strong> {place.openingHours}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Location Details */}
                    <div className={`rounded-2xl p-6 ${
                      darkMode 
                        ? 'bg-gray-700 border border-gray-600' 
                        : 'bg-gradient-to-br from-green-50 to-emerald-50'
                    }`}>
                      <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                        darkMode ? 'text-gray-100' : 'text-gray-800'
                      }`}>
                        <FaMapPin className="text-green-600" />
                        Location Details
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <FaMapPin className="text-green-500" />
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                            <strong>City:</strong> {place.city}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <FaMapPin className="text-green-500" />
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                            <strong>State:</strong> {place.state}
                          </span>
                        </div>
                        {place.coordinates && (
                          <div className="flex items-center gap-3">
                            <FaMapPin className="text-green-500" />
                            <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                              <strong>Coordinates:</strong> {place.coordinates.lat.toFixed(4)}, {place.coordinates.lng.toFixed(4)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  {place.highlights && (
                    <div className="mb-8">
                      <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                        darkMode ? 'text-gray-100' : 'text-gray-800'
                      }`}>
                        <FaCheckCircle className="text-green-600" />
                        Highlights
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {place.highlights.map((highlight, index) => (
                          <div key={index} className={`rounded-lg p-3 flex items-center gap-2 ${
                            darkMode ? 'bg-gray-700 border border-gray-600' : 'bg-green-50'
                          }`}>
                            <FaCheckCircle className="text-green-500 text-sm" />
                            <span className={`text-sm ${
                              darkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Transportation */}
                  <div className="mb-8">
                    <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                      darkMode ? 'text-gray-100' : 'text-gray-800'
                    }`}>
                      <FaCar className="text-purple-600" />
                      How to Reach
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {getTransportationInfo().map((info, index) => (
                        <div key={index} className={`rounded-xl p-4 flex items-center gap-3 ${
                          darkMode ? 'bg-gray-700 border border-gray-600' : 'bg-gray-50'
                        }`}>
                          <FaCar className="text-purple-500" />
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{info}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="mb-8">
                    <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                      darkMode ? 'text-gray-100' : 'text-gray-800'
                    }`}>
                      <FaWifi className="text-orange-600" />
                      Available Amenities
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {getAmenities().map((amenity, index) => (
                        <div key={index} className={`rounded-lg p-3 flex items-center gap-2 ${
                          darkMode ? 'bg-gray-700 border border-gray-600' : 'bg-orange-50'
                        }`}>
                          <FaWifi className="text-orange-500 text-sm" />
                          <span className={`text-sm ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Travel Tips */}
                  <div className={`rounded-2xl p-6 mb-8 ${
                    darkMode 
                      ? 'bg-gray-700 border border-gray-600' 
                      : 'bg-gradient-to-br from-yellow-50 to-orange-50'
                  }`}>
                    <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                      darkMode ? 'text-gray-100' : 'text-gray-800'
                    }`}>
                      <FaShieldAlt className="text-orange-600" />
                      Travel Tips
                    </h3>
                    <div className={`space-y-3 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {place.tips ? (
                        <p>• <strong>Pro Tip:</strong> {place.tips}</p>
                      ) : (
                        <>
                          <p>• <strong>Best Time to Visit:</strong> {place.bestTime || getBestTimeToVisit()}</p>
                          <p>• <strong>Photography:</strong> Photography is allowed, but check for any restrictions</p>
                          <p>• <strong>Dress Code:</strong> Dress modestly and respect local customs</p>
                          <p>• <strong>Safety:</strong> Keep your belongings safe and follow local guidelines</p>
                          <p>• <strong>Booking:</strong> Consider booking tickets online to avoid queues</p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        if (place.coordinates) {
                          const url = `https://www.google.com/maps/dir/?api=1&destination=${place.coordinates.lat},${place.coordinates.lng}`;
                          window.open(url, '_blank');
                        }
                      }}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <FaMapPin className="text-sm" />
                      Get Directions
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onClose}
                      className={`px-6 py-4 border-2 rounded-xl font-semibold transition-all duration-300 ${
                        darkMode 
                          ? 'border-gray-600 text-gray-300 hover:border-blue-500 hover:text-blue-400'
                          : 'border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600'
                      }`}
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 