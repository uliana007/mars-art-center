import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language === "ru" ? "RU" : "EN";
  return (
    <button
      aria-label="Switch language"
      className="ml-2 px-3 py-1 rounded bg-accent dark:bg-[#3399FF] text-white uppercase text-xs font-semibold hover:bg-[#0048CC] dark:hover:bg-[#2288EE] transition"
      onClick={() => i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru")}
    >
      {current}
    </button>
  );
}