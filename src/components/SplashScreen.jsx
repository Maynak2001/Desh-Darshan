import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import animationData from '../assets/Welcome.json'; // Make sure the path is correct

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate the progress bar from 0 to 100 over 3 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500); // Slight delay for smooth transition
          return 100;
        }
        return prev + 1.67; // ~60fps for 3 seconds
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: progress >= 100 ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#FFDEE9] via-[#B5FFFC] to-[#E6FFB8]"
    >
      {/* Lottie Animation */}
      <div className="w-[300px] md:w-[400px]">
        <Lottie animationData={animationData} loop autoplay />
      </div>

      {/* "to" text */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-xl md:text-2xl text-gray-700 mt-2"
      >
       to
      </motion.p>

      {/* App Name */}
      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold text-[#1F2937] mt-1"
      >
        DeshDarshan
      </motion.h1>

      {/* Progress Bar */}
      <div className="w-64 mt-10 h-2 bg-white/40 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.05, ease: 'linear' }}
          className="h-full bg-[#1F2937] rounded-full"
        />
      </div>
    </motion.div>
  );
};

export default SplashScreen;
