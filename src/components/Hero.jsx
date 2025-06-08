import React from "react";
import AnimatedBackground from "./AnimatedBackground";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-[60vh] flex flex-col justify-center items-center text-center overflow-hidden">
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
  );
}