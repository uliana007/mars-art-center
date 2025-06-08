import React from "react";
import { motion } from "framer-motion";

export default function ThemeSwitcher({ theme, setTheme }) {
  return (
    <button
      aria-label="Сменить тему"
      className="relative w-12 h-6 bg-gray-200 dark:bg-[#222] rounded-full flex items-center px-1 transition-all"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <motion.div
        layout
        className="w-5 h-5 rounded-full shadow flex items-center justify-center text-lg"
        style={{ background: theme === "light" ? "#fff" : "#1E1E1E", color: theme === "light" ? "#FFD700" : "#3399FF" }}
        animate={{ x: theme === "light" ? 0 : 24 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      >
        {theme === "light" ? "☀️" : "🌙"}
      </motion.div>
    </button>
  );
}