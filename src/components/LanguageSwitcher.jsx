import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language.startsWith("ru") ? "ru" : "en";

  const handleSwitch = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
  };

  return (
    <div className="flex items-center gap-2 select-none">
      <button
        onClick={() => handleSwitch("ru")}
        aria-label="Русский"
        className={`px-2 py-1 rounded-btn font-semibold transition-colors duration-200 text-sm flex items-center gap-1
          ${current === "ru"
            ? "bg-accentBlue text-white shadow-btn"
            : "bg-transparent text-accentBlue hover:bg-accentBlue/10"}
        `}
      >
        <span role="img" aria-label="Русский">🇷🇺</span> RU
      </button>
      <button
        onClick={() => handleSwitch("en")}
        aria-label="English"
        className={`px-2 py-1 rounded-btn font-semibold transition-colors duration-200 text-sm flex items-center gap-1
          ${current === "en"
            ? "bg-accentBlue text-white shadow-btn"
            : "bg-transparent text-accentBlue hover:bg-accentBlue/10"}
        `}
      >
        <span role="img" aria-label="English">en</span> EN
      </button>
    </div>
  );
}