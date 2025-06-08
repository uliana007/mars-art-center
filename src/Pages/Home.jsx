import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      {/* Видеоблок + три ссылки справа */}
      <section className="relative w-full min-h-[70vh] flex flex-col md:flex-row items-stretch justify-center bg-black">
        {/* Левая часть — видео и заголовок */}
        <div className="w-full md:w-1/2 flex flex-col items-start justify-center relative z-10 min-h-[320px] md:min-h-[480px]">
          <div className="w-full h-[320px] md:h-[480px] lg:h-[600px] flex items-center justify-center overflow-hidden">
            {/* Поменяйте src на ваш видеофайл! */}
            <video
              src="/mars-preview.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full h-full"
              poster="/mars-poster.jpg"
            />
          </div>
          <h1 className="absolute left-0 top-0 w-full h-full flex flex-col justify-center px-4 md:px-10 text-white font-mont text-3xl md:text-5xl font-bold leading-tight pointer-events-none select-none z-20">
            {t("hero.title")}
          </h1>
        </div>

        {/* Правая часть — три прямоугольных блока-ссылки */}
        <div className="w-full md:w-1/2 flex flex-col gap-8 items-center justify-center py-8 md:py-0 md:pr-12 z-20 bg-transparent">
          <HomeLinkBox
            to="/poster"
            title={t("menu.poster")}
            subtitle={t("hero.poster_sub")}
          />
          <HomeLinkBox
            to="/about"
            title={t("hero.museum")}
            subtitle={t("hero.museum_sub")}
          />
          <HomeLinkBox
            to="/tickets"
            title={t("menu.tickets")}
            subtitle={t("hero.tickets_sub")}
          />
        </div>
      </section>

      <AboutSection />
      <ProjectsSection />
    </>
  );
}

// Компонент для блока-ссылки
function HomeLinkBox({ to, title, subtitle }) {
  return (
    <Link
      to={to}
      className="group w-[90vw] max-w-[340px] md:max-w-[350px] border-2 border-white dark:border-[#bbb] p-6 flex flex-col items-start justify-center transition hover:bg-white/5 hover:scale-105 active:scale-100 duration-200"
      style={{ textDecoration: "none" }}
    >
      <div className="flex items-center w-full justify-between">
        <span className="font-mont text-2xl md:text-3xl font-bold text-white tracking-wide group-hover:text-accentBlue transition">
          {title}
        </span>
        <span className="text-white text-2xl group-hover:translate-x-2 transition">
          →
        </span>
      </div>
      <span className="mt-2 text-sm font-sans text-white group-hover:text-accentBlueDark transition">
        {subtitle}
      </span>
    </Link>
  );
}