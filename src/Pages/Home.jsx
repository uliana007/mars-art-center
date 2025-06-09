import React from "react";
import { useTranslation } from "react-i18next";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <section className="relative min-h-[60vh] flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-[#1A1A1A] dark:text-[#E0E0E0] font-mont">
          {t("hero.title")}
        </h1>
        <p className="text-lg md:text-xl text-[#555] dark:text-[#BBB] mb-8 max-w-2xl mx-auto font-sans">
          {t("hero.subtitle")}
        </p>
        <a
          href="/tickets"
          className="inline-block px-8 py-3 bg-accentBlue dark:bg-accentBlueDark text-white text-lg font-semibold rounded-btn shadow-btn hover:bg-hoverBlue dark:hover:bg-hoverBlueDark transition-all uppercase"
        >
          {t("hero.cta")}
        </a>
      </section>

      {/* Проверочный текст ДО секции */}
      <div style={{
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 32,
        color: "red",
        margin: "40px 0"
      }}>
        ПРОВЕРКА: ЭТОТ ТЕКСТ ДОЛЖЕН БЫТЬ ВИДЕН НА ГЛАВНОЙ СТРАНИЦЕ
      </div>

      <AboutSection />
      <ProjectsSection />
    </>
  );
}