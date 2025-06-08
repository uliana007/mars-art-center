import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const menu = [
  { title: "menu.events", href: "#events" },
  { title: "menu.exhibitions", href: "#exhibitions" },
  { title: "menu.about", href: "#about" },
  { title: "menu.contacts", href: "#contacts" },
];

export default function Header({ theme, setTheme }) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 dark:bg-[#121212]/90 backdrop-blur-xl z-50 border-b border-gray-200 dark:border-[#222]">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 font-bold text-xl uppercase tracking-tight text-accent dark:text-[#3399FF]">
          <img src="/logo.svg" alt="M’ARS" className="h-8 w-8" />
          M’ARS
        </a>
        {/* Desktop menu */}
        <nav className="hidden md:flex gap-6 items-center">
          {menu.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="relative px-2 py-1 font-medium text-[#1A1A1A] dark:text-[#E0E0E0] transition group"
            >
              {t(item.title)}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-accent dark:bg-[#3399FF] transition-all group-hover:w-full"></span>
            </a>
          ))}
          <LanguageSwitcher />
          <ThemeSwitcher theme={theme} setTheme={setTheme} />
        </nav>
        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <span className="block w-7 h-0.5 bg-accent"></span>
          <span className="block w-5 h-0.5 bg-accent"></span>
          <span className="block w-7 h-0.5 bg-accent"></span>
        </button>
        {/* Mobile menu drawer */}
        <motion.div
          className={`fixed inset-0 z-50 bg-white dark:bg-[#121212] transition-all duration-300 ${
            open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          initial={false}
          animate={open ? { opacity: 1 } : { opacity: 0 }}
        >
          <div className="flex justify-end p-6">
            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="8" x2="24" y2="24"/><line x1="24" y1="8" x2="8" y2="24"/></svg>
            </button>
          </div>
          <nav className="flex flex-col items-center gap-6 mt-6">
            {menu.map((item) => (
              <a
                key={item.title}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-2xl font-semibold text-[#1A1A1A] dark:text-[#E0E0E0] hover:text-accent transition"
              >
                {t(item.title)}
              </a>
            ))}
            <LanguageSwitcher />
            <ThemeSwitcher theme={theme} setTheme={setTheme} />
          </nav>
        </motion.div>
      </div>
    </header>
  );
}