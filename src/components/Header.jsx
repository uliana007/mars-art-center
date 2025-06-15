import React, { useEffect, useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import iconMars from "../assets/image/logo_mars2.png";

const menu = [
  { key: "poster", href: "/poster" },
  { key: "tickets", href: "/tickets" },
  { key: "visitors", href: "/visitors" },
  { key: "media", href: "/media" },
  { key: "about", href: "/about" }
];

export default function Header({ theme, setTheme }) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Подсветка для темы
  const isDark = theme === "dark";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Glow style: более темное свечение в светлой теме, чуть правее и уменьшенный радиус
  const glowStyle = {
    width: 68,
    height: 68,
    position: "absolute",
    left: 15, // чуть правее логотипа
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
    pointerEvents: "none",
    filter: isDark
      ? "drop-shadow(0 0 25px white) blur(2px)"
      : "drop-shadow(0 0 18px #161616e6) blur(2px)", // гораздо темнее и насыщеннее glow
    background: isDark
      ? "radial-gradient(circle, rgba(255,255,255,0.7) 35%, rgba(255,255,255,0.15) 80%, rgba(255,255,255,0) 100%)"
      : "radial-gradient(circle, rgba(16,16,16,0.30) 40%, rgba(16,16,16,0.10) 80%, rgba(16,16,16,0) 100%)", // темный и плотный центр
    borderRadius: "30%",
  };

  return (
    <header className={`fixed top-0 left-0 w-full bg-white/90 dark:bg-[#121212]/90 backdrop-blur-xl z-50 border-b border-gray-200 dark:border-[#222] transition-shadow
      ${scrolled ? "shadow-[0_4px_0_0_#0055FF] dark:shadow-[0_4px_0_0_#3399FF]" : ""}
    `}>
      <div className="container mx-auto px-4 flex items-center justify-between h-20 relative">
        {/* Подсветка за логотипом, но чуть правее */}
        <div style={glowStyle} aria-hidden />
        {/* Logo (левый край, увеличен размер иконки) */}
    <Link
  to="/"
  className="flex items-center gap-3 font-bold text-2xl uppercase tracking-tight z-20 relative"
>
  <img
    src={iconMars}
    alt="M’ARS"
    className="h-16 w-16 relative z-20 transition-all duration-300"
    style={{ objectFit: "contain" }}
  />
  <span className="text-[#163B74] dark:text-white transition-colors duration-300">
    M’ARS
  </span>
</Link>
        {/* Центрированное меню для ПК */}
        <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-5 items-center z-10">
          {menu.map((item) => (
            <Link
              key={item.key}
              to={item.href}
              className="relative px-2 py-1 font-medium text-[#1A1A1A] dark:text-[#E0E0E0] transition group"
            >
              {t(`menu.${item.key}`)}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-accentBlue dark:bg-accentBlueDark transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </nav>
        {/* Переключатели (правый край) */}
        <div className="hidden md:flex gap-3 items-center z-20">
          <LanguageSwitcher />
          <ThemeSwitcher theme={theme} setTheme={setTheme} />
        </div>
        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 z-30"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <span className="block w-7 h-0.5 bg-accentBlue dark:bg-accentBlueDark"></span>
          <span className="block w-5 h-0.5 bg-accentBlue dark:bg-accentBlueDark"></span>
          <span className="block w-7 h-0.5 bg-accentBlue dark:bg-accentBlueDark"></span>
        </button>
        {/* Mobile menu drawer */}
        <motion.div
          className={`fixed inset-0 z-50 transition-all duration-300 flex flex-col ${
            open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          initial={false}
          animate={open ? { opacity: 1 } : { opacity: 0 }}
        >
          {/* Верхняя полоса: логотип + крестик (без изменения цвета) */}
          <div className="flex justify-between items-center p-6 bg-white/90 dark:bg-[#121212]/90 backdrop-blur-xl border-b border-gray-200 dark:border-[#222] z-20 relative">
            {/* Glow для мобильного меню */}
            <div
              style={glowStyle}
              aria-hidden
            />
            <Link to="/" className="flex items-center gap-3 font-bold text-2xl uppercase tracking-tight text-accentBlue dark:text-accentBlueDark z-20 relative">
              <img
                src={iconMars}
                alt="M’ARS"
                className="h-16 w-16 relative z-20 transition-all duration-300"
                style={{ objectFit: "contain" }}
              />
              M’ARS
            </Link>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="z-20">
              <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="8" x2="24" y2="24" />
                <line x1="24" y1="8" x2="8" y2="24" />
              </svg>
            </button>
          </div>
          {/* Нижняя часть меню — ссылки с полупрозрачным синим фоном */}
          <nav
            className="flex flex-col items-center gap-6 mt-0 p-8 flex-1 overflow-auto backdrop-blur-md min-h-[420px]"
            style={{ backgroundColor: "var(--menu-bg-color)" }}
          >
            {menu.map((item) => (
              <Link
                key={item.key}
                to={item.href}
                onClick={() => setOpen(false)}
                className="text-2xl font-semibold text-white hover:text-accentBlue transition"
              >
                {t(`menu.${item.key}`)}
              </Link>
            ))}
            <LanguageSwitcher />
            <ThemeSwitcher theme={theme} setTheme={setTheme} />
          </nav>
        </motion.div>
      </div>
    </header>
  );
}