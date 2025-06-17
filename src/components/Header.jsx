import React, { useEffect, useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import iconMars from "../assets/image/logo_mars2.png";

const menu = [
  { key: "poster", href: "/" },
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

  // Тень всегда на одном месте, вне зависимости от open
  const glowStyle = {
    width: 68,
    height: 68,
    position: "absolute",
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
    pointerEvents: "none",
    filter: isDark
      ? "drop-shadow(0 0 25px white) blur(2px)"
      : "drop-shadow(0 0 18px #161616e6) blur(2px)",
    background: isDark
      ? "radial-gradient(circle, rgba(255,255,255,0.7) 35%, rgba(255,255,255,0.15) 80%, rgba(255,255,255,0) 100%)"
      : "radial-gradient(circle, rgba(16,16,16,0.30) 40%, rgba(16,16,16,0.10) 80%, rgba(16,16,16,0) 100%)",
    borderRadius: "30%",
  };

  // Стили для фиксированной верхней полосы, чтобы она не менялась при открытии меню
  const headerClass =
    "fixed top-0 left-0 w-full bg-white/90 dark:bg-[#121212]/90 backdrop-blur-xl z-50 border-b border-gray-200 dark:border-[#222] transition-shadow";

  // Блок логотипа и тени (используется и в хедере, и в мобильном меню)
  function LogoBlock() {
    return (
      <div className="relative flex items-center gap-3 font-bold text-2xl uppercase tracking-tight z-20">
        <div style={glowStyle} className="absolute left-0 top-1/2 -translate-y-1/2" aria-hidden />
        <img
          src={iconMars}
          alt="M’ARS"
          className="h-16 w-16 relative z-20 transition-all duration-300"
          style={{ objectFit: "contain" }}
        />
        <span className="text-[#163B74] dark:text-white transition-colors duration-300">
          M’ARS
        </span>
      </div>
    );
  }

  return (
    <header className={headerClass + (scrolled ? " shadow-[0_4px_0_0_#0055FF] dark:shadow-[0_4px_0_0_#3399FF]" : "")}>
      <div className="container mx-auto px-4 flex items-center justify-between h-20 relative">
        {/* ЛОГОТИП и ТЕНЬ */}
        <Link to="/" className="z-20 relative">
          <LogoBlock />
        </Link>
        {/* Меню для ПК */}
        <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-5 items-center z-10">
          {menu.map((item) => (
            <Link
              key={item.key}
              to={item.href}
              className="relative px-2 py-1 font-medium text-[#163B74] dark:text-[#E0E0E0] transition group"
            >
              {t(`menu.${item.key}`)}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-accentBlue dark:bg-accentBlueDark transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </nav>
        {/* Переключатели */}
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
          {/* Верхняя полоса: идентична основной, без изменений */}
          <div className={headerClass + " !static !h-20 !px-4"}>
            <div className="container mx-auto flex items-center justify-between h-20 relative">
              <Link to="/" className="z-20 relative" onClick={() => setOpen(false)}>
                <LogoBlock />
              </Link>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="z-20">
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="8" x2="24" y2="24" />
                  <line x1="24" y1="8" x2="8" y2="24" />
                </svg>
              </button>
            </div>
          </div>
          {/* Нижняя часть меню — ссылки */}
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