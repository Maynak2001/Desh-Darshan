import React from "react";
import { motion } from "framer-motion";
import {
  FaCode,
  FaHeart,
  FaGraduationCap,
  FaLaptopCode,
  FaRocket,
  FaMapMarkedAlt,
  FaQuoteLeft,
  FaGithub,
  FaLinkedin,
  FaEnvelope
} from "react-icons/fa";

export default function AboutMe({ darkMode }) {
  const skills = [
    { name: "React.js", level: 90, color: "from-blue-500 to-cyan-500" },
    { name: "JavaScript", level: 85, color: "from-yellow-500 to-orange-500" },
    { name: "Node.js", level: 80, color: "from-green-500 to-emerald-500" },
    { name: "UI/UX Design", level: 75, color: "from-purple-500 to-pink-500" }
  ];

  const journey = [
    {
      year: "2020",
      title: "Started Learning",
      description: "Began my journey into web development",
      icon: "🌱"
    },
    {
      year: "2021",
      title: "First Projects",
      description: "Built my first web applications",
      icon: "🚀"
    },
    {
      year: "2022",
      title: "Advanced Skills",
      description: "Mastered React and modern frameworks",
      icon: "⚡"
    },
    {
      year: "2023",
      title: "Desh Darshan",
      description: "Created this travel platform for India",
      icon: "🏛️"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
        : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
    }`}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`relative overflow-hidden py-20 ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 via-purple-900 to-indigo-900"
            : "bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700"
        } text-white`}
      >
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white opacity-10 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-8xl mb-8"
          >
            👨💻
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">Me</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto"
          >
            🚀 Full-Stack Developer & Travel Enthusiast
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Introduction Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`rounded-3xl p-8 shadow-2xl ${
                darkMode
                  ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700"
                  : "bg-gradient-to-br from-white to-gray-50 border border-gray-200"
              }`}
            >
              <div className="text-center">
                <div className="text-6xl mb-6">🇮🇳</div>
                <h3 className={`text-2xl font-bold mb-4 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}>
                  Passionate Developer
                </h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className={`text-3xl font-bold ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    }`}>3+</div>
                    <div className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}>Years Experience</div>
                  </div>
                  <div>
                    <div className={`text-3xl font-bold ${
                      darkMode ? "text-green-400" : "text-green-600"
                    }`}>10+</div>
                    <div className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}>Projects Built</div>
                  </div>
                  <div>
                    <div className={`text-3xl font-bold ${
                      darkMode ? "text-purple-400" : "text-purple-600"
                    }`}>∞</div>
                    <div className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}>Learning</div>
                  </div>
                  <div>
                    <div className={`text-3xl font-bold ${
                      darkMode ? "text-orange-400" : "text-orange-600"
                    }`}>❤️</div>
                    <div className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}>For India</div>
                  </div>
                </div>
              </div>
            </motion.div>
            <div>
              <h2 className={`text-4xl font-bold mb-6 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}>
                🎯 Hello, I'm a Developer!
              </h2>
              <p className={`text-lg leading-relaxed mb-6 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                I'm a passionate full-stack developer with a deep love for creating beautiful, 
                functional web applications. My journey in tech started with curiosity and has 
                evolved into a mission to build meaningful digital experiences.
              </p>
              <p className={`text-lg leading-relaxed ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                🌟 Desh Darshan is my tribute to India's incredible beauty and diversity. 
                Through this platform, I aim to help travelers discover the magic of our 
                incredible country, one destination at a time.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-6 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}>
              💻 Technical Skills
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}>
              Technologies I work with to bring ideas to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-6 rounded-2xl shadow-lg border ${
                  darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-xl font-bold ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}>
                    {skill.name}
                  </h3>
                  <span className={`text-lg font-semibold ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}>
                    {skill.level}%
                  </span>
                </div>
                <div className={`w-full bg-gray-200 rounded-full h-3 ${
                  darkMode ? "bg-gray-700" : "bg-gray-200"
                }`}>
                  <motion.div
                    className={`h-3 rounded-full bg-gradient-to-r ${skill.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Journey Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-6 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}>
              🛤️ My Journey
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}>
              The path that led me to create Desh Darshan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {journey.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`text-center p-8 rounded-3xl shadow-xl border ${
                  darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="text-6xl mb-6">{step.icon}</div>
                <div className={`text-2xl font-bold mb-2 ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}>
                  {step.year}
                </div>
                <h3 className={`text-xl font-bold mb-4 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}>
                  {step.title}
                </h3>
                <p className={`${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className={`rounded-3xl p-12 text-center relative overflow-hidden ${
            darkMode
              ? "bg-gradient-to-br from-gray-800 to-gray-900"
              : "bg-gradient-to-br from-blue-50 to-purple-50"
          }`}>
            <div className="absolute top-8 left-8 text-6xl opacity-20">
              <FaQuoteLeft />
            </div>
            <div className="relative z-10">
              <p className={`text-2xl font-light mb-8 italic ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}>
                "Code is like poetry - it should be beautiful, meaningful, and inspire others. 
                Desh Darshan is my poem dedicated to India's incredible beauty."
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="text-4xl">👨💻</div>
                <div>
                  <div className={`font-bold text-lg ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}>
                    Developer & Creator
                  </div>
                  <div className={`${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}>
                    Desh Darshan
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-6xl mb-6"
              >
                🤝
              </motion.div>
              <h3 className="text-4xl font-bold mb-6">
                Let's Connect!
              </h3>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Have questions about Desh Darshan or want to collaborate? I'd love to hear from you!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="mailto:contact@deshdarshan.com"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-2 justify-center"
                >
                  <FaEnvelope />
                  Email Me
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-blue-600 transition-colors flex items-center gap-2 justify-center"
                >
                  <FaGithub />
                  GitHub
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}