import React from 'react';
import { motion } from 'framer-motion';

const PageLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 flex items-center justify-center bg-white/80 backdrop-blur-sm"
    >
      <div className="text-center">
        {/* Spinning Logo */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 mx-auto mb-4"
        >
          <div className="w-full h-full border-4 border-blue-500 border-t-transparent rounded-full" />
        </motion.div>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg font-medium text-gray-700"
        >
          Loading...
        </motion.p>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-1 mt-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
              className="w-2 h-2 bg-blue-500 rounded-full"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PageLoader; 