import React from "react";
import AnimatedBackground from "./AnimatedBackground";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import "../styles/Hero.css";

const linkVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.2 + i * 0.15,
      duration: 0.8,
      type: "spring",
      stiffness: 70,
      damping: 12,
    },
  }),
  hover: {
    scale: 1.04,
    boxShadow: "0 0 24px 2px #3af0ff66",
    backgroundColor: "rgba(50,160,255,0.13)",
    borderColor: "#3af0ff",
    color: "#3af0ff",
    transition: { duration: 0.22 },
  },
  tap: {
    scale: 0.97,
    transition: { duration: 0.08 },
  },
};

export default function Hero() {
  const { t } = useTranslation();

  return (
    <>
      <section className="relative min-h-[60vh] flex flex-col justify-center items-center text-center overflow-hidden">
        {/* ПРОВЕРОЧНЫЙ ТЕКСТ: ЭТОТ ТЕКСТ ДОЛЖЕН БЫТЬ ВИДЕН */}
        <div
          style={{
            color: "red",
            fontWeight: "bold",
            fontSize: 28,
            letterSpacing: 2,
            marginBottom: 16,
          }}
        >
          ПРОВЕРОЧНЫЙ ТЕКСТ: ЭТОТ ТЕКСТ ДОЛЖЕН БЫТЬ ВИДЕН
        </div>
        <AnimatedBackground />
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-[#1A1A1A] dark:text-[#E0E0E0]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {t("hero.title")}
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-[#555] dark:text-[#BBB] mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {t("hero.subtitle")}
        </motion.p>
        <motion.a
          href="#events"
          className="inline-block px-8 py-3 bg-accent dark:bg-[#3399FF] text-white text-lg font-semibold rounded-full shadow hover:bg-[#0048CC] dark:hover:bg-[#2288EE] transition-all uppercase"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          {t("hero.cta")}
        </motion.a>
      </section>

      {/* --- Новый блок "визитка + ссылки" --- */}
      <section className="w-full flex flex-col md:flex-row justify-center items-center gap-8 my-16">
        {/* Левая часть: Видео с анимацией */}
        <motion.div
          className="flex-1 flex justify-center items-center"
          initial={{ opacity: 0, x: -40, scale: 0.92 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 60 }}
        >
          <div className="relative group">
            <div className="absolute inset-0 rounded-[40px] border-4 border-accentBlue animate-spin-slow pointer-events-none" />
            <video
              src="/assets/video/your-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-80 h-80 object-cover rounded-[40px] border-4 border-white shadow-xl relative z-10"
              style={{
                boxShadow: "0 0 30px 4px rgba(40,40,60,0.15)",
              }}
            />
          </div>
        </motion.div>
        {/* Правая часть: ссылки */}
        <div className="flex-1 flex flex-col gap-8 items-center md:items-end w-full max-w-md hero-links-shift">
          {[
            {
              href: "#poster",
              title: "АФИША",
              subtitle: "выставки, VR, перформансы",
            },
            {
              href: "#about",
              title: "О МУЗЕЕ",
              subtitle: "искусство, технологии",
            },
            {
              href: "#tickets",
              title: "БИЛЕТЫ",
              subtitle: "купи прямо сейчас",
            },
          ].map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="w-full border-2 border-white hover:border-accentBlue transition shadow-lg rounded-lg px-8 py-6 bg-black/70 hover:bg-accentBlue/10 text-white flex flex-col group"
              custom={i}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              whileTap="tap"
              variants={linkVariants}
              viewport={{ once: true, amount: 0.2 }}
            >
              <span className="text-2xl md:text-3xl font-mont uppercase tracking-wide group-hover:text-accentBlue transition">
                {item.title}
              </span>
              <span className="text-base mt-2 opacity-80">
                {item.subtitle}
              </span>
            </motion.a>
          ))}
        </div>
      </section>
      {/* --- конец нового блока --- */}
    </>
  );
}