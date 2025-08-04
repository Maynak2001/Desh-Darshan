import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaHeart, FaStar, FaClock, FaFilter } from "react-icons/fa";
import locations from "../data/locatons";

// Fix default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const categories = [
  { id: "All", name: "All Places", icon: "🏛️", color: "blue" },
  { id: "Historical", name: "Historical", icon: "🏛️", color: "purple" },
  { id: "Cultural", name: "Cultural", icon: "🎭", color: "orange" },
  { id: "Nature", name: "Nature", icon: "🌿", color: "green" },
];

export default function MapView() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Get user's current location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    } else {
      console.log("Geolocation not supported.");
    }
  }, []);

  const toggleFavorite = (placeId) => {
    setFavorites((prev) =>
      prev.includes(placeId)
        ? prev.filter((id) => id !== placeId)
        : [...prev, placeId]
    );
  };

  const filteredPlaces =
    selectedCategory === "All"
      ? locations
      : locations.filter((place) => place.category === selectedCategory);

  // Function to get category button classes
  const getCategoryButtonClasses = (categoryId) => {
    if (selectedCategory === categoryId) {
      switch (categoryId) {
        case "All":
          return "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg";
        case "Historical":
          return "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg";
        case "Cultural":
          return "bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg";
        case "Nature":
          return "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg";
        default:
          return "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg";
      }
    }
    return "bg-white text-gray-700 hover:bg-gray-50 shadow-md border border-gray-200";
  };

  return (
    <div className="relative">
      {/* Enhanced Header */}
      <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-600" />
              Interactive Map of India
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Discover {filteredPlaces.length} amazing places across India
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
          >
            <FaFilter className="text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filters</span>
          </motion.button>
        </div>

        {/* Enhanced Category Filter */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: showFilters ? 1 : 0, 
            height: showFilters ? "auto" : 0 
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="flex flex-wrap gap-3 mb-4">
            {categories.map((cat) => (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${getCategoryButtonClasses(cat.id)}`}
              >
                <span className="text-lg">{cat.icon}</span>
                {cat.name}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Enhanced Map Container */}
      <div className="relative">
        <MapContainer
          center={[23.5937, 78.9629]} // Center of India
          zoom={5}
          scrollWheelZoom={true}
          style={{ height: "600px", width: "100%", borderRadius: "0 0 12px 12px" }}
          className="shadow-lg"
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* User Location Marker */}
          {userLocation && (
            <Marker position={[userLocation.lat, userLocation.lng]}>
              <Popup>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600 mb-1">📍 You are here</div>
                  <div className="text-sm text-gray-600">Current Location</div>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Enhanced Place Markers */}
          {filteredPlaces.map((place) => (
            <Marker key={place.id} position={[place.coordinates.lat, place.coordinates.lng]}>
              <Popup className="custom-popup">
                <div className="min-w-[280px]">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg mb-1">
                        {place.name}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <FaMapMarkerAlt className="text-blue-500" />
                        <span>{place.city}, {place.state}</span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleFavorite(place.id)}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <FaHeart 
                        className={`text-lg ${favorites.includes(place.id) ? 'text-red-500' : 'text-gray-400'}`} 
                      />
                    </motion.button>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                    {place.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500 text-sm" />
                      <span className="text-sm font-semibold">{place.rating}</span>
                      <span className="text-xs text-gray-500">({place.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <FaClock className="text-blue-500" />
                      <span>{place.visitTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Get Directions
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:border-blue-500 hover:text-blue-600 transition-colors"
                    >
                      Details
                    </motion.button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
          <div className="text-xs font-semibold text-gray-700 mb-2">Legend</div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">Your Location</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">Places</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
