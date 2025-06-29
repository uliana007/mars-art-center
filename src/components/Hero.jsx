import React, { useEffect, useState } from "react";
import AnimatedBackground from "./AnimatedBackground";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../styles/Hero.css";
import heroVideo from "../assets/video/video-back.mp4";

import lightImage from "../assets/image/planeta-2.png";
import darkImage from "../assets/image/planeta-white.png";

const linkVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: i => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.3 + i * 0.18, duration: 0.7, type: "spring", stiffness: 70 }
  }),
  hover: {
    scale: 1.04,
    boxShadow: "0 8px 32px 0 rgba(51,153,255,0.3), 0 0 0 3px #3399FF",
    borderColor: "#3399FF",
    backgroundColor: "rgba(51,153,255,0.08)",
    transition: { type: "spring", stiffness: 220, damping: 12 }
  }
};

const videoVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.9, delay: 0.15, type: "spring", stiffness: 80 } },
  hover: { scale: 1.03, boxShadow: "0 0 40px 8px #3399FF50", transition: { type: "spring", stiffness: 300 } }
};

function getTheme() {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export default function Hero() {
  const { t } = useTranslation();
  const [theme, setTheme] = useState(getTheme());

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(getTheme());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });

    return () => observer.disconnect();
  }, []);

  const heroCardImage = theme === "dark" ? darkImage : lightImage;

  return (
    <>
      <section className="relative hero-video-bg-section flex flex-col justify-center items-center text-center overflow-hidden min-h-[80vh]">
        {/* 🔥 Фоновое видео */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
        />

        <AnimatedBackground />

        {/* Контент поверх видео */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{ position: "relative", zIndex: 2 }}
        >
          {t("hero.title")}
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{ position: "relative", zIndex: 2 }}
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          style={{ position: "relative", zIndex: 2 }}
        >
          <Link to="/tickets" className="hero-cta-btn flex items-center justify-center">
            {t("hero.cta")}
          </Link>
        </motion.div>
      </section>

      {/* --- Новый блок "визитка + ссылки" --- */}
      <section className="w-full flex flex-col md:flex-row justify-center items-center gap-8 my-16">
        {/* Левая часть: КАРТИНКА с анимацией */}
        <div className="flex-1 flex justify-center items-center">
          <motion.div
            className="relative group"
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={videoVariants}
          >
            <div className="absolute inset-0 rounded-[40px] border-4 border-accentBlue animate-spin-slow pointer-events-none" />
            {/* Картинка с анимацией */}
            <motion.img
              src={heroCardImage}
              alt="Hero Card"
              className="hero-video object-cover rounded-[40px]
                         shadow-[inset_0_0_40px_rgba(255,255,255,0.3)]
                         dark:shadow-[inset_0_0_60px_rgba(255,255,255,0.6)]"
              style={{
                width: "100%",
                height: "100%",
                boxShadow: "0 0 30px 4px rgba(40,40,60,0.15)"
              }}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={videoVariants}
              draggable={false}
            />
          </motion.div>
        </div>

        {/* Правая часть: ссылки */}
        <div className="flex-1 flex flex-col gap-8 items-center md:items-end w-full max-w-md hero-links-shift">
          {[
            {
              href: "#tickets",
              title: t("menu.tickets"),
              subtitle: t("hero.links.tickets_subtitle")
            },
            {
              href: "#about",
              title: t("menu.about"),
              subtitle: t("hero.links.about_subtitle")
            },
            {
              href: "#contacts",
              title: t("menu.contacts"),
              subtitle: t("footer.contacts")
            }
          ].map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="w-full border-2 border-white hover:border-accentBlue transition shadow-lg rounded-lg px-8 py-6 bg-black/70 hover:bg-accentBlue/10 text-white flex flex-col group"
              custom={i}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={linkVariants}
            >
              <span className="text-2xl md:text-3xl font-myfont uppercase tracking-wide group-hover:text-accentBlue transition">
                {item.title}
              </span>
              <span className="text-base mt-2 opacity-80 font-myfont">
                {item.subtitle}
              </span>
            </motion.a>
          ))}
        </div>
      </section>
    </>
  );
}
