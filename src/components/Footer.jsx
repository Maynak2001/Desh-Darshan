import React from "react";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

export default function Footer({ darkMode }) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={`w-full py-6 px-4 text-center transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-400" : "bg-gray-100 text-gray-600"
      }`}
    >
      <div className="flex justify-center items-center gap-4 mb-2">
        <a
          href="https://www.linkedin.com/in/maynak-sannigrahi" // 🔁 Replace with your real URL
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500 transition-colors"
        >
          <FaLinkedin size={20} />
        </a>
        <a
          href="https://github.com/maynak" // 🔁 Replace with your real URL
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-800 dark:hover:text-white transition-colors"
        >
          <FaGithub size={20} />
        </a>
        <a
          href="https://instagram.com/maynak" // 🔁 Replace with your real URL
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-500 transition-colors"
        >
          <FaInstagram size={20} />
        </a>
      </div>

      <p className="text-sm mb-1">
        © {year} DeshDarshan · Made with <span className="text-red-500">❤️</span> by{" "}
        <span className="font-semibold text-blue-500">Maynak Sannigrahi</span>
      </p>

      <p className="text-xs text-gray-400">
        Discover India&apos;s Hidden Gems
      </p>
    </footer>
  );
}
