import React from "react";

export default function ThemeSwitcher({ theme, setTheme }) {
  const isLight = theme === "light";

  return (
    <button
      aria-label="Сменить тему"
      className={`w-10 h-10 flex items-center justify-center rounded-full 
        ${isLight ? "bg-[#1A1A1A] hover:bg-[#444]" : "bg-[#ffffff] hover:bg-[#f3f3f3a4]"}
        border ${isLight ? "border-black hover:border-white" : "border-white hover:border-black"}
        transition-colors duration-300`}
      onClick={() => setTheme(isLight ? "dark" : "light")}
    >
      {isLight ? (
        <span className="text-yellow-400 text-2xl" role="img" aria-label="Светлая тема">☀️</span>
      ) : (
        <span className="text-blue-400 text-2xl" role="img" aria-label="Тёмная тема">🌙</span>
      )}
    </button>
  );
}
