import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkedAlt,
  FaStar,
  FaMapPin,
  FaFilter,
  FaSearch,
  FaGlobe,
  FaCity,
  FaEye,
  FaThumbsUp,
  FaShare,
  FaBookmark,
  FaCompass,
  FaCamera,
  FaUsers,
  FaAward,
  FaRocket,
  FaGift,
} from "react-icons/fa";
import MapView from "../components/MapView";
import LocationCard from "../components/LocationCard";
import locations from "../data/locatons";

export default function Explore({ darkMode }) {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("all");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [sortBy, setSortBy] = useState("name"); // name, rating, reviews
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [showAllStates, setShowAllStates] = useState(false);
  const [favorites, setFavorites] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [bookmarks, setBookmarks] = useState([]);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  // Enhanced safety check for locations data with error handling
  const safeLocations = useMemo(() => {
    try {
      if (!locations) {
        console.warn('Locations data is null or undefined');
        return [];
      }
      if (!Array.isArray(locations)) {
        console.warn('Locations data is not an array:', typeof locations);
        return [];
      }
      // Filter out invalid location objects
      return locations.filter(location => {
        if (!location || typeof location !== 'object') {
          console.warn('Invalid location object found:', location);
          return false;
        }
        if (!location.id || !location.name) {
          console.warn('Location missing required fields (id, name):', location);
          return false;
        }
        return true;
      });
    } catch (error) {
      console.error('Error processing locations data:', error);
      return [];
    }
  }, []);

  // Memoized categories with proper counting and null safety
  const categories = useMemo(() => {
    const safeCounts = {
      all: safeLocations.length,
      Historical: safeLocations.filter((l) => l && l.category === "Historical").length,
      Cultural: safeLocations.filter((l) => l && l.category === "Cultural").length,
      Nature: safeLocations.filter((l) => l && l.category === "Nature").length,
      Museum: safeLocations.filter((l) => l && l.category === "Museum").length,
    };

    return [
      { id: "all", name: "All Places", icon: "🏛️", count: safeCounts.all },
      { id: "Historical", name: "Historical", icon: "🏛️", count: safeCounts.Historical },
      { id: "Cultural", name: "Cultural", icon: "🎭", count: safeCounts.Cultural },
      { id: "Nature", name: "Nature", icon: "🌿", count: safeCounts.Nature },
      { id: "Museum", name: "Museum", icon: "🏛️", count: safeCounts.Museum },
    ];
  }, [safeLocations]);

  // Memoized states with proper normalization and null safety
  const states = useMemo(() => {
    const uniqueStates = new Set();
    
    safeLocations.forEach(location => {
      if (location && location.state && typeof location.state === 'string') {
        // Normalize state names: trim whitespace and standardize casing
        const normalizedState = location.state.trim();
        if (normalizedState.length > 0) {
          uniqueStates.add(normalizedState);
        }
      }
    });
    
    return ["all", ...Array.from(uniqueStates).sort()];
  }, [safeLocations]);

  // Debounced search suggestions with improved null safety
  useEffect(() => {
    if (searchTerm.length > 0) {
      setIsLoading(true);
      // Debounce search for better performance
      const timer = setTimeout(() => {
        const searchLower = searchTerm.toLowerCase().trim();
        const filtered = safeLocations
          .filter((location) => {
            if (!location || typeof location !== 'object') return false;
            
            return [
              location.name || '',
              location.city || '',
              location.state || '',
              location.description || ''
            ].some(field =>
              typeof field === 'string' &&
              field.toLowerCase().includes(searchLower)
            );
          })
          .slice(0, 5);
        
        setSuggestions(filtered);
        setShowSuggestions(true);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
    }
  }, [searchTerm, safeLocations]);

  // Handle click outside search dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Keyboard shortcut to focus search (Ctrl/Cmd + K)
  useEffect(() => {
    function handleKeyDown(event) {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Load bookmarks from localStorage on component mount with error handling
  useEffect(() => {
    try {
      const savedBookmarks = JSON.parse(
        localStorage.getItem("bookmarks") || "[]"
      );
      if (Array.isArray(savedBookmarks)) {
        setBookmarks(savedBookmarks);
      } else {
        console.warn('Invalid bookmarks data in localStorage, resetting');
        localStorage.setItem("bookmarks", "[]");
        setBookmarks([]);
      }
    } catch (error) {
      console.error('Error loading bookmarks from localStorage:', error);
      setBookmarks([]);
    }
  }, []);

  // Define handleSearchSelect before it's used in useEffect
  const handleSearchSelect = useCallback((location) => {
    try {
      if (!location || !location.name) {
        console.warn('Invalid location selected:', location);
        return;
      }
      
      setSearchTerm(location.name);
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
      
      // Scroll to the selected location if it exists in the filtered results
      setTimeout(() => {
        try {
          const element = document.getElementById(`location-${location.id}`);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            element.classList.add("ring-4", "ring-blue-500", "ring-opacity-50");
            setTimeout(() => {
              try {
                element.classList.remove(
                  "ring-4",
                  "ring-blue-500",
                  "ring-opacity-50"
                );
              } catch (error) {
                console.warn('Error removing highlight classes:', error);
              }
            }, 3000);
          }
        } catch (error) {
          console.warn('Error scrolling to location:', error);
        }
      }, 100);
    } catch (error) {
      console.error('Error in handleSearchSelect:', error);
    }
  }, []);

  // Keyboard navigation for search suggestions
  useEffect(() => {
    function handleSearchKeyDown(event) {
      if (!showSuggestions || suggestions.length === 0) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setSelectedSuggestionIndex((prev) =>
            prev < suggestions.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          event.preventDefault();
          if (
            selectedSuggestionIndex >= 0 &&
            suggestions[selectedSuggestionIndex]
          ) {
            handleSearchSelect(suggestions[selectedSuggestionIndex]);
          }
          break;
        case "Escape":
          setShowSuggestions(false);
          setSelectedSuggestionIndex(-1);
          break;
        default:
          // Handle other keys if needed
          break;
      }
    }

    const currentSearchInput = searchInputRef.current;
    if (currentSearchInput) {
      currentSearchInput.addEventListener("keydown", handleSearchKeyDown);
      return () =>
        currentSearchInput.removeEventListener("keydown", handleSearchKeyDown);
    }
  }, [showSuggestions, suggestions, selectedSuggestionIndex, handleSearchSelect]);

  // Memoized filtering with comprehensive null safety and performance optimization
  const filteredLocations = useMemo(() => {
    if (!Array.isArray(safeLocations) || safeLocations.length === 0) {
      return [];
    }

    return safeLocations.filter((location) => {
      // Null safety checks
      if (!location || typeof location !== 'object') return false;
      if (!location.name || typeof location.name !== 'string') return false;

      // Search filter with null safety
      const searchLower = searchTerm.toLowerCase().trim();
      const matchesSearch = searchLower === '' || [
        location.name,
        location.description || '',
        location.city || '',
        location.state || ''
      ].some(field =>
        typeof field === 'string' &&
        field.toLowerCase().includes(searchLower)
      );

      // Category filter with null safety
      const locationCategory = location.category || '';
      const matchesCategory = activeTab === "all" || locationCategory === activeTab;

      // State filter with improved normalization
      const locationState = (location.state || '').trim();
      const selectedStateNormalized = selectedState.trim();
      const matchesState = selectedStateNormalized === "all" ||
                          locationState === selectedStateNormalized;

      return matchesSearch && matchesCategory && matchesState;
    });
  }, [safeLocations, searchTerm, activeTab, selectedState]);


  // Memoized sorting with proper null safety and type checking
  const sortedLocations = useMemo(() => {
    if (!Array.isArray(filteredLocations) || filteredLocations.length === 0) {
      return [];
    }

    return [...filteredLocations].sort((a, b) => {
      // Null safety checks
      if (!a || !b) return 0;
      
      switch (sortBy) {
        case "rating":
          const ratingA = typeof a.rating === 'number' ? a.rating : 0;
          const ratingB = typeof b.rating === 'number' ? b.rating : 0;
          return ratingB - ratingA;
        case "reviews":
          const reviewsA = typeof a.reviews === 'number' ? a.reviews : 0;
          const reviewsB = typeof b.reviews === 'number' ? b.reviews : 0;
          return reviewsB - reviewsA;
        default:
          const nameA = (a.name || '').toString();
          const nameB = (b.name || '').toString();
          return nameA.localeCompare(nameB);
      }
    });
  }, [filteredLocations, sortBy]);


  const handleSearchSubmit = useCallback((e) => {
    try {
      e.preventDefault();
      if (suggestions.length > 0 && selectedSuggestionIndex >= 0) {
        handleSearchSelect(suggestions[selectedSuggestionIndex]);
      } else if (suggestions.length > 0) {
        handleSearchSelect(suggestions[0]);
      }
    } catch (error) {
      console.error('Error in handleSearchSubmit:', error);
    }
  }, [suggestions, selectedSuggestionIndex, handleSearchSelect]);

  const handleExploreNow = () => {
    // Scroll to places section
    const placesSection = document.getElementById("places-section");
    if (placesSection) {
      placesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGetDirections = useCallback((location) => {
    try {
      if (!location || !location.coordinates) {
        console.warn('Invalid location or missing coordinates:', location);
        alert('Location coordinates not available');
        return;
      }
      
      const { lat, lng } = location.coordinates;
      if (typeof lat !== 'number' || typeof lng !== 'number') {
        console.warn('Invalid coordinates:', { lat, lng });
        alert('Invalid location coordinates');
        return;
      }
      
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      window.open(url, "_blank");
    } catch (error) {
      console.error('Error getting directions:', error);
      alert('Unable to get directions. Please try again.');
    }
  }, []);

  const handleViewDetails = (location) => {
    // The overlay is handled directly in the LocationCard component
    // This function is kept for potential future functionality
  };

  const handleGetStarted = () => {
    // In a real app, this would trigger app download or registration
    alert("Redirecting to app download page...");
  };

  const handleShare = useCallback(async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Discover India - Amazing Places",
          text: "Check out these amazing places across India!",
          url: window.location.href,
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(window.location.href);
          alert("Link copied to clipboard!");
        } else {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = window.location.href;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          alert("Link copied to clipboard!");
        }
      }
    } catch (error) {
      console.error('Error sharing:', error);
      alert('Unable to share. Please copy the URL manually.');
    }
  }, []);

  const handleBookmark = useCallback(() => {
    try {
      const currentPage = {
        title: "Explore Page",
        url: window.location.href,
        timestamp: new Date().toISOString(),
      };

      const existingBookmarks = JSON.parse(
        localStorage.getItem("bookmarks") || "[]"
      );
      
      if (!Array.isArray(existingBookmarks)) {
        console.warn('Invalid bookmarks data in localStorage, resetting');
        localStorage.setItem("bookmarks", "[]");
        setBookmarks([]);
        return;
      }
      
      const isAlreadyBookmarked = existingBookmarks.some(
        (bookmark) => bookmark && bookmark.url === currentPage.url
      );

      if (isAlreadyBookmarked) {
        const updatedBookmarks = existingBookmarks.filter(
          (bookmark) => bookmark && bookmark.url !== currentPage.url
        );
        localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
        setBookmarks(updatedBookmarks);
        alert("Removed from bookmarks!");
      } else {
        const updatedBookmarks = [...existingBookmarks, currentPage];
        localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
        setBookmarks(updatedBookmarks);
        alert("Added to bookmarks!");
      }
    } catch (error) {
      console.error('Error handling bookmark:', error);
      alert('Unable to bookmark. Please try again.');
    }
  }, []);

  const handleLearnMore = () => {
    // Scroll to a specific section or show more information
    const featuresSection = document.getElementById("features-section");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    } else {
      // If no features section, scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleClearFilters = () => {
    try {
      setSearchTerm("");
      setActiveTab("all");
      setSelectedState("all");
      setSortBy("name");
      setViewMode("grid");
      setShowAllStates(false);
      setShowSuggestions(false);
      setSuggestions([]);
    } catch (error) {
      console.error('Error clearing filters:', error);
    }
  };

  const handleFavorite = useCallback((locationId) => {
    try {
      if (!locationId) {
        console.warn('Invalid location ID for favorite:', locationId);
        return;
      }
      
      setFavorites((prev) => {
        if (!Array.isArray(prev)) {
          console.warn('Invalid favorites state, resetting');
          return [locationId];
        }
        
        const isFavorited = prev.includes(locationId);
        if (isFavorited) {
          return prev.filter((id) => id !== locationId);
        } else {
          return [...prev, locationId];
        }
      });
    } catch (error) {
      console.error('Error handling favorite:', error);
    }
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
      }`}
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`relative overflow-visible min-h-screen flex items-center ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 via-purple-900 to-indigo-900"
            : "bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700"
        } text-white`}
        style={{ zIndex: 1 }}
      >
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-10 rounded-full animate-pulse"></div>
          <div
            className="absolute top-20 right-20 w-24 h-24 bg-white opacity-10 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-10 left-1/4 w-16 h-16 bg-white opacity-10 rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/3 w-20 h-20 bg-white opacity-10 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>

          {/* Floating particles */}
          <div
            className="absolute top-1/4 right-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-bounce"
            style={{ animationDelay: "0.3s" }}
          ></div>
          <div
            className="absolute top-3/4 left-1/3 w-1 h-1 bg-pink-300 rounded-full animate-bounce"
            style={{ animationDelay: "1.2s" }}
          ></div>
          <div
            className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-bounce"
            style={{ animationDelay: "0.8s" }}
          ></div>

          {/* Creative floating elements */}
          <div
            className="absolute top-1/3 left-1/4 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse opacity-60"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse opacity-40"
            style={{ animationDelay: "1.5s" }}
          ></div>
          <div
            className="absolute top-2/3 left-1/2 w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-bounce opacity-70"
            style={{ animationDelay: "0.9s" }}
          ></div>

          {/* Geometric shapes */}
          <div
            className="absolute top-1/5 right-1/5 w-6 h-6 border-2 border-white/20 rotate-45 animate-spin"
            style={{ animationDuration: "20s" }}
          ></div>
          <div
            className="absolute bottom-1/5 left-1/5 w-4 h-4 border border-white/30 rounded-full animate-ping"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 px-6 py-16 md:py-24 w-full">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-8"
              >
                <div className="text-8xl mb-4 animate-bounce">🗺️</div>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight"
              >
                Discover India
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed"
              >
                Explore the most iconic landmarks and hidden gems across India
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="mb-8 text-sm opacity-75"
              >
                <div className="flex flex-wrap justify-center gap-6 text-xs">
                  <motion.span
                    className="flex items-center gap-2 px-3 py-2 bg-white bg-opacity-10 rounded-full backdrop-blur-sm"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(255,255,255,0.2)",
                    }}
                  >
                    <FaMapPin className="text-blue-300" />
                    Search by place name
                  </motion.span>
                  <motion.span
                    className="flex items-center gap-2 px-3 py-2 bg-white bg-opacity-10 rounded-full backdrop-blur-sm"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(255,255,255,0.2)",
                    }}
                  >
                    <FaGlobe className="text-blue-300" />
                    Search by city or state
                  </motion.span>
                  <motion.span
                    className="flex items-center gap-2 px-3 py-2 bg-white bg-opacity-10 rounded-full backdrop-blur-sm"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(255,255,255,0.2)",
                    }}
                  >
                    <FaStar className="text-blue-300" />
                    Search by category
                  </motion.span>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-3xl mx-auto"
              >
                <div
                  className="relative w-full z-50"
                  ref={searchRef}
                  style={{ position: "relative", zIndex: 50 }}
                >
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <FaSearch
                      className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-10 transition-colors ${
                        isLoading ? "text-blue-500" : "text-gray-400"
                      }`}
                    />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search places, cities, or states... (Ctrl+K)"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onFocus={() => setShowSuggestions(true)}
                      className={`pl-12 pr-12 py-5 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 shadow-2xl relative z-10 transition-all duration-300 hover:shadow-3xl text-lg ${
                        darkMode
                          ? "bg-gray-800 text-gray-100 border border-gray-600 placeholder-gray-400"
                          : "bg-white text-gray-800"
                      } ${isLoading ? "ring-2 ring-blue-500" : ""}`}
                    />
                    {isLoading && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                      </div>
                    )}
                    {searchTerm && !isLoading && (
                      <button
                        type="button"
                        onClick={() => setSearchTerm("")}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        ✕
                      </button>
                    )}
                  </form>

                  {/* Search Suggestions */}
                  {showSuggestions &&
                    (suggestions.length > 0 ||
                      isLoading ||
                      searchTerm.length > 0) && (
                      <>
                        {/* Backdrop */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="fixed inset-0 bg-black bg-opacity-20 z-[999998]"
                          onClick={() => setShowSuggestions(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-gray-200 z-[999999] max-h-80 overflow-y-auto min-w-full backdrop-blur-sm bg-white/95"
                          style={{
                            position: "absolute",
                            zIndex: 999999,
                            top: "calc(100% + 12px)",
                            left: 0,
                            right: 0,
                          }}
                        >
                          {isLoading ? (
                            <div className="p-6 text-center">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-3"></div>
                              <div className="text-sm text-gray-500 font-medium">
                                Searching...
                              </div>
                            </div>
                          ) : suggestions.length > 0 ? (
                            <>
                              <div className="p-4 border-b border-gray-100 bg-gray-50 rounded-t-2xl">
                                <div className="text-sm font-medium text-gray-700">
                                  Search Results
                                </div>
                                <div className="text-xs text-gray-500">
                                  Found {suggestions.length} places
                                </div>
                              </div>
                              {suggestions.map((suggestion, index) => (
                                <motion.div
                                  key={suggestion.id}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  whileHover={{
                                    backgroundColor: "#f3f4f6",
                                    scale: 1.01,
                                  }}
                                  className={`p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 last:rounded-b-2xl ${
                                    selectedSuggestionIndex === index
                                      ? "bg-blue-50 border-blue-200"
                                      : "hover:bg-gray-50"
                                  }`}
                                  onClick={() => handleSearchSelect(suggestion)}
                                  onMouseEnter={() =>
                                    setSelectedSuggestionIndex(index)
                                  }
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                      <FaMapPin className="text-white text-sm" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="font-semibold text-gray-800 truncate">
                                        {suggestion.name}
                                      </div>
                                      <div className="text-sm text-gray-500 mt-1">
                                        {suggestion.city}, {suggestion.state}
                                      </div>
                                      {suggestion.category && (
                                        <div className="text-xs text-blue-600 mt-1 font-medium">
                                          {suggestion.category}
                                        </div>
                                      )}
                                    </div>
                                    <div className="text-xs text-gray-400 self-start mt-1">
                                      {suggestion.rating && (
                                        <div className="flex items-center gap-1">
                                          <FaStar className="text-yellow-500" />
                                          {suggestion.rating}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </>
                          ) : searchTerm.length > 0 ? (
                            <div className="p-6 text-center">
                              <div className="text-6xl mb-3">🔍</div>
                              <div className="text-sm text-gray-500 font-medium">
                                No places found
                              </div>
                              <div className="text-xs text-gray-400 mt-1">
                                Try a different search term
                              </div>
                              <div className="mt-3 text-xs text-gray-400">
                                Try searching for: "Taj Mahal", "Mumbai",
                                "Kerala"
                              </div>
                            </div>
                          ) : null}
                        </motion.div>
                      </>
                    )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleExploreNow}
                  className="bg-white text-blue-600 px-8 py-5 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-2xl"
                >
                  <FaCompass className="inline mr-2" />
                  Explore Now
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className={`shadow-2xl -mt-12 relative z-10 mx-6 rounded-3xl border overflow-hidden transition-colors duration-300 ${
          darkMode
            ? "bg-gray-800 border-gray-700 shadow-gray-900/50"
            : "bg-white border-gray-100"
        }`}
      >
        <div
          className={`absolute inset-0 opacity-50 ${
            darkMode
              ? "bg-gradient-to-r from-gray-700 to-gray-800"
              : "bg-gradient-to-r from-blue-50 to-purple-50"
          }`}
        ></div>
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8 p-10">
          <motion.div
            className={`text-center group cursor-pointer p-6 rounded-2xl backdrop-blur-sm transition-colors duration-300 ${
              darkMode
                ? "bg-gray-700/80 hover:bg-gray-600/80"
                : "bg-white/80 hover:bg-gray-50/80"
            }`}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaMapPin className="text-white text-2xl" />
            </div>
            <div
              className={`text-4xl font-bold mb-2 group-hover:text-blue-700 transition-colors ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              {safeLocations.length}+
            </div>
            <div
              className={`font-semibold ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Amazing Places
            </div>
            <div
              className={`text-sm mt-1 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Across India
            </div>
          </motion.div>
          <motion.div
            className={`text-center group cursor-pointer p-6 rounded-2xl backdrop-blur-sm transition-colors duration-300 ${
              darkMode
                ? "bg-gray-700/80 hover:bg-gray-600/80"
                : "bg-white/80 hover:bg-gray-50/80"
            }`}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaGlobe className="text-white text-2xl" />
            </div>
            <div
              className={`text-4xl font-bold mb-2 group-hover:text-purple-700 transition-colors ${
                darkMode ? "text-purple-400" : "text-purple-600"
              }`}
            >
              {states.length - 1}
            </div>
            <div
              className={`font-semibold ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              States & UTs
            </div>
            <div
              className={`text-sm mt-1 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Complete Coverage
            </div>
          </motion.div>
          <motion.div
            className={`text-center group cursor-pointer p-6 rounded-2xl backdrop-blur-sm transition-colors duration-300 ${
              darkMode
                ? "bg-gray-700/80 hover:bg-gray-600/80"
                : "bg-white/80 hover:bg-gray-50/80"
            }`}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUsers className="text-white text-2xl" />
            </div>
            <div
              className={`text-4xl font-bold mb-2 group-hover:text-indigo-700 transition-colors ${
                darkMode ? "text-indigo-400" : "text-indigo-600"
              }`}
            >
              24/7
            </div>
            <div
              className={`font-semibold ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Audio Guides
            </div>
            <div
              className={`text-sm mt-1 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Multilingual
            </div>
          </motion.div>
          <motion.div
            className={`text-center group cursor-pointer p-6 rounded-2xl backdrop-blur-sm transition-colors duration-300 ${
              darkMode
                ? "bg-gray-700/80 hover:bg-gray-600/80"
                : "bg-white/80 hover:bg-gray-50/80"
            }`}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaGift className="text-white text-2xl" />
            </div>
            <div
              className={`text-4xl font-bold mb-2 group-hover:text-green-700 transition-colors ${
                darkMode ? "text-green-400" : "text-green-600"
              }`}
            >
              100%
            </div>
            <div
              className={`font-semibold ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Free Access
            </div>
            <div
              className={`text-sm mt-1 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              No Hidden Costs
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div
        className={`max-w-7xl mx-auto px-6 py-12 transition-colors duration-300 ${
          darkMode ? "text-gray-100" : "text-gray-800"
        }`}
      >
        {/* Enhanced Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8"
        >
          {/* Category Tabs with Counts */}
          <div className="mb-8">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <FaFilter className="text-white text-lg" />
              </div>
              Filter by Category
            </motion.h3>
            <div className="flex flex-wrap gap-4">
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(category.id)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === category.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl transform -translate-y-1"
                      : darkMode
                      ? "bg-gray-700 text-gray-200 hover:bg-gray-600 shadow-lg border border-gray-600 hover:shadow-xl"
                      : "bg-white text-gray-700 hover:bg-gray-50 shadow-lg border border-gray-200 hover:shadow-xl"
                  }`}
                >
                  <span className="text-2xl">{category.icon}</span>
                  <span>{category.name}</span>
                  <span
                    className={`ml-2 px-3 py-1 rounded-full text-xs font-bold ${
                      activeTab === category.id
                        ? "bg-white bg-opacity-30 text-white"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {category.count}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* State Filter */}
          <div className="mb-8">
            <h3
              className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              <FaGlobe className="text-green-600" />
              Filter by State
            </h3>

            <div className="flex flex-wrap gap-3">
              {(showAllStates ? states : states.slice(0, 10)).map((state) => (
                <motion.button
                  key={state}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedState(state)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedState === state
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                      : darkMode
                      ? "bg-gray-700 text-gray-200 hover:bg-gray-600 shadow-md border border-gray-600"
                      : "bg-white text-gray-700 hover:bg-gray-50 shadow-md border border-gray-200"
                  }`}
                >
                  <FaCity className="text-sm" />
                  {state === "all" ? "All States" : state}
                  {/* Show location count for each state */}
                  <span className="text-xs opacity-75">
                    ({state === "all"
                      ? safeLocations.length
                      : safeLocations.filter(l => l && l.state && l.state.trim() === state.trim()).length
                    })
                  </span>
                </motion.button>
              ))}
              {states.length > 10 && !showAllStates && (
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAllStates(true)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    darkMode
                      ? "bg-gray-700 text-gray-200 hover:bg-gray-600 shadow-md border border-gray-600"
                      : "bg-white text-gray-700 hover:bg-gray-50 shadow-md border border-gray-200"
                  }`}
                >
                  +{states.length - 10} More
                </motion.button>
              )}
              {showAllStates && (
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAllStates(false)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    darkMode
                      ? "bg-gray-600 text-gray-200 hover:bg-gray-500 shadow-md border border-gray-500"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 shadow-md border border-gray-300"
                  }`}
                >
                  Show Less
                </motion.button>
              )}
            </div>
          </div>

          {/* View Options and Sort */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
              <h3 className={`text-lg font-semibold ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                View Options:
              </h3>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === "grid"
                      ? "bg-blue-600 text-white"
                      : darkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                >
                  <FaThumbsUp className="text-sm" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === "list"
                      ? "bg-blue-600 text-white"
                      : darkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                >
                  <FaEye className="text-sm" />
                </motion.button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <h3 className={`text-lg font-semibold ${darkMode ? "text-gray-200" : "text-gray-800"}`}>Sort by:</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? "bg-gray-700 text-gray-200 border-gray-600"
                    : "bg-white text-gray-800 border-gray-300"
                }`}
              >
                <option value="name">Name</option>
                <option value="rating">Rating</option>
                <option value="reviews">Reviews</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Places Grid */}
        <motion.div
          id="places-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-12"
        >
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className={`text-3xl font-bold mb-2 flex items-center gap-3 ${
                  darkMode ? "text-gray-100" : "text-gray-800"
                }`}>
                  <FaAward className="text-yellow-500" />
                  Popular Destinations
                </h2>
                <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  {sortedLocations.length > 0
                    ? `Found ${sortedLocations.length} amazing places across India`
                    : "No places found matching your criteria"}
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                  title="Share"
                >
                  <FaShare className="text-sm" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBookmark}
                  className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                  title="Bookmark"
                >
                  <FaBookmark className="text-sm" />
                </motion.button>
              </div>
            </div>
          </div>

          {sortedLocations.length > 0 ? (
            <div
              className={`grid gap-8 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {sortedLocations.map((place, index) => (
                <motion.div
                  key={place.id || index}
                  id={`location-${place.id || index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                  className="transition-all duration-300"
                >
                  <LocationCard
                    place={place}
                    onGetDirections={() => handleGetDirections(place)}
                    onViewDetails={() => handleViewDetails(place)}
                    onFavorite={() => handleFavorite(place.id)}
                    isFavorited={favorites.includes(place.id)}
                    darkMode={darkMode}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-8xl mb-6">🔍</div>
              <h3 className={`text-2xl font-bold mb-4 ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}>
                No places found
              </h3>
              <p className={`mb-6 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}>
                Try adjusting your search or category filters
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearFilters}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Map Section - Now after the location cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mb-12"
        >
          <div className={`rounded-2xl shadow-xl overflow-hidden border ${
            darkMode 
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-100"
          }`}>
            <div className={`p-6 border-b ${
              darkMode 
                ? "border-gray-700 bg-gradient-to-r from-gray-700 to-gray-800"
                : "border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50"
            }`}>
              <h2 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}>
                <FaMapMarkedAlt className="text-blue-600" />
                Interactive Map of India
              </h2>
              <p className={`mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                Explore the locations you discovered above on our interactive
                map
              </p>
              <p className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}>
                Click on markers to see details and get directions
              </p>
            </div>
            <MapView />
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          id="features-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${
              darkMode ? "text-gray-100" : "text-gray-800"
            }`}>
              Why Choose Our Platform?
            </h2>
            <p className={`max-w-2xl mx-auto ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}>
              Discover the features that make us the best choice for exploring
              India's amazing destinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className={`text-center p-6 rounded-2xl shadow-lg border ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-100"
              }`}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMapPin className="text-white text-2xl" />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}>
                Offline Maps
              </h3>
              <p className={`${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                Download maps and guides for offline use, perfect for areas with
                limited connectivity.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className={`text-center p-6 rounded-2xl shadow-lg border ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-100"
              }`}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCamera className="text-white text-2xl" />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}>
                AR Navigation
              </h3>
              <p className={`${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                Use augmented reality to navigate through historical sites and
                landmarks.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className={`text-center p-6 rounded-2xl shadow-lg border ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-100"
              }`}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-white text-2xl" />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}>
                Local Guides
              </h3>
              <p className={`${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                Connect with local experts and get authentic insights about each
                destination.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-8 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="text-6xl mb-6"
              >
                🚀
              </motion.div>
              <h3 className="text-3xl font-bold mb-4">
                Ready to Start Your Adventure?
              </h3>
              <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
                Download our mobile app for offline maps, audio guides, and
                exclusive features
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGetStarted}
                  className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-2"
                >
                  <FaRocket className="text-sm" />
                  Get Started
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLearnMore}
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center gap-2"
                >
                  <FaGift className="text-sm" />
                  Learn More
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}