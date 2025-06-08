import React from "react";

export default function ThemeSwitcher({ theme, setTheme }) {
  return (
    <button
      aria-label="Сменить тему"
      className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-cardLight dark:hover:bg-cardDark transition-colors"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <span className="text-yellow-400 text-2xl" role="img" aria-label="Светлая тема">☀️</span>
      ) : (
        <span className="text-blue-400 text-2xl" role="img" aria-label="Тёмная тема">🌙</span>
      )}
    </button>
  );
}