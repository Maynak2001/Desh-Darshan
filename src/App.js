import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';
import SplashScreen from './components/SplashScreen';
import PageLoader from './components/PageLoader';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // 👉 Detect if the page was reloaded (hard reload like F5)
  const isHardReload = performance.getEntriesByType("navigation")[0]?.type === "reload";

  const [showSplash, setShowSplash] = useState(() => {
    // ✅ Show splash if it's not a hard reload
    return !isHardReload;
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handlePageLoad = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <Router>
      <div className={`App ${darkMode ? 'dark' : ''}`}>
        {isLoading && <PageLoader />}
        <ScrollToTop />
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route 
            path="/" 
            element={<Home darkMode={darkMode} onPageLoad={handlePageLoad} />} 
          />
          <Route 
            path="/explore" 
            element={<Explore darkMode={darkMode} onPageLoad={handlePageLoad} />} 
          />
          <Route 
            path="/favorites" 
            element={<Favorites darkMode={darkMode} onPageLoad={handlePageLoad} />} 
          />
          <Route 
            path="*" 
            element={<NotFound darkMode={darkMode} onPageLoad={handlePageLoad} />} 
          />
        </Routes>
        <Footer darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </Router>
  );
}

export default App;
