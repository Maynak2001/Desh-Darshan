import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaPause, FaVolumeUp, FaHeadphones } from "react-icons/fa";

export default function AudioGuide({ text }) {
  const [voice, setVoice] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const voices = speechSynthesis.getVoices();
    const indianVoice = voices.find(v => v.lang === "en-IN") || voices.find(v => v.name.includes("Google"));
    setVoice(indianVoice);
  }, []);

  const handleSpeak = () => {
    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    if (voice) utterance.voice = voice;
    utterance.rate = 0.9; // a bit slower
    utterance.pitch = 1.1; // slight pitch for natural feel
    
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    
    speechSynthesis.speak(utterance);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleSpeak}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
        isPlaying
          ? "bg-green-100 text-green-700 border border-green-300"
          : "bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100"
      }`}
    >
      <motion.div
        animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
      >
        {isPlaying ? (
          <FaPause className="text-sm" />
        ) : (
          <FaPlay className="text-sm" />
        )}
      </motion.div>
      
      <span className="flex items-center gap-1">
        <FaHeadphones className="text-xs" />
        {isPlaying ? "Playing..." : "Audio Guide"}
      </span>
      
      {isHovered && !isPlaying && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
        >
          Click to listen
        </motion.div>
      )}
    </motion.button>
  );
}
