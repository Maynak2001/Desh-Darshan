import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaTrash, FaMapMarkerAlt, FaStar, FaClock, FaTicketAlt } from 'react-icons/fa';
import LocationCard from '../components/LocationCard';
import locations from '../data/locatons';

const Favorites = ({ darkMode, onPageLoad }) => {
  const [favorites, setFavorites] = useState([]);
  const [favoriteLocations, setFavoriteLocations] = useState([]);

  useEffect(() => {
    if (onPageLoad) {
      onPageLoad();
    }
  }, [onPageLoad]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites);
      setFavorites(favoriteIds);
      
      // Get the actual location objects for favorite IDs
      const favoritePlaces = locations.filter(location => favoriteIds.includes(location.id));
      setFavoriteLocations(favoritePlaces);
    }
  }, []);

  const removeFavorite = (locationId) => {
    const updatedFavorites = favorites.filter(id => id !== locationId);
    setFavorites(updatedFavorites);
    setFavoriteLocations(prev => prev.filter(location => location.id !== locationId));
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    setFavoriteLocations([]);
    localStorage.removeItem('favorites');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-pink-600 to-purple-600 opacity-90"></div>
        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="text-6xl mb-6">❤️</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              My <span className="text-yellow-300">Favorites</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Your personal collection of amazing destinations across India
            </p>
            
            {favorites.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearAllFavorites}
                  className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-colors border border-white/30"
                >
                  Clear All Favorites
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="text-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
              <div className="text-3xl font-bold text-red-600 mb-2">{favorites.length}</div>
              <div className="text-gray-600 dark:text-gray-300">Saved Places</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {favoriteLocations.length > 0 
                  ? new Set(favoriteLocations.map(l => l.state)).size 
                  : 0}
              </div>
              <div className="text-gray-600 dark:text-gray-300">States Covered</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {favoriteLocations.length > 0 
                  ? new Set(favoriteLocations.map(l => l.category)).size 
                  : 0}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Categories</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Favorites Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {favoriteLocations.length > 0 ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <h2 className="text-3xl font-bold mb-4">
                  Your Favorite Places
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {favoriteLocations.length} amazing destinations you've saved
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favoriteLocations.map((location, index) => (
                  <motion.div
                    key={location.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="relative group"
                  >
                    <LocationCard
                      location={location}
                      isFavorite={true}
                      onToggleFavorite={() => removeFavorite(location.id)}
                      darkMode={darkMode}
                    />
                    
                    {/* Remove Button */}
                    <motion.button
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFavorite(location.id)}
                      className="absolute top-2 right-2 z-10 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                      title="Remove from favorites"
                    >
                      <FaTrash className="text-sm" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center py-20"
            >
              <div className="text-8xl mb-6">💔</div>
              <h3 className="text-3xl font-bold mb-4">No favorites yet</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                Start exploring amazing places and add them to your favorites to see them here
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/explore'}
                className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-red-700 hover:to-pink-700 transition-colors"
              >
                Start Exploring
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Tips Section */}
      {favoriteLocations.length > 0 && (
        <section className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Travel Tips</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Make the most of your favorite destinations
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-center p-6 rounded-lg bg-white dark:bg-gray-700 shadow-lg"
              >
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaMapMarkerAlt className="text-2xl text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Plan Your Route</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Use your favorites to plan the perfect travel itinerary
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center p-6 rounded-lg bg-white dark:bg-gray-700 shadow-lg"
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaStar className="text-2xl text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Best Times to Visit</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Check the best time to visit each destination for optimal experience
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-center p-6 rounded-lg bg-white dark:bg-gray-700 shadow-lg"
              >
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaClock className="text-2xl text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Visit Duration</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Plan your time wisely based on the recommended visit duration
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Favorites;
