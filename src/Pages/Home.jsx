import React from "react";
import { useTranslation } from "react-i18next";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      {/* Новый верхний блок */}
      <section className="flex flex-col md:flex-row items-stretch justify-between min-h-[60vh] mb-12">
        {/* Видео слева */}
        <div className="md:w-2/3 w-full relative flex items-center justify-center bg-black">
          <video
            className="w-full h-full object-cover rounded-lg"
            src="/video/sample.mp4"
            autoPlay
            loop
            muted
            playsInline
            poster="/video/poster.jpg"
          />
          {/* Текст поверх видео */}
          <h1 className="absolute left-8 bottom-8 text-3xl md:text-5xl font-bold text-white z-10 drop-shadow-lg font-mont">
            {t("hero.title")}
          </h1>
        </div>
        {/* Три блока справа */}
        <div className="md:w-1/3 w-full flex flex-col justify-center gap-8 p-6 md:pl-10">
          <a
            href="#afisha"
            className="group border-2 border-white py-6 px-4 bg-transparent hover:bg-white/10 transition rounded-lg flex flex-col relative"
          >
            <span className="text-2xl md:text-3xl font-mont font-bold text-white group-hover:text-accentBlue transition">
              {t("main.afisha.title")}
            </span>
            <span className="text-md md:text-lg text-white/80 mt-2">
              {t("main.afisha.subtitle")}
            </span>
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-3xl text-white group-hover:text-accentBlue transition">
              →
            </span>
          </a>
          <a
            href="#about"
            className="group border-2 border-white py-6 px-4 bg-transparent hover:bg-white/10 transition rounded-lg flex flex-col relative"
          >
            <span className="text-2xl md:text-3xl font-mont font-bold text-white group-hover:text-accentBlue transition">
              {t("main.about.title")}
            </span>
            <span className="text-md md:text-lg text-white/80 mt-2">
              {t("main.about.subtitle")}
            </span>
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-3xl text-white group-hover:text-accentBlue transition">
              →
            </span>
          </a>
          <a
            href="/tickets"
            className="group border-2 border-white py-6 px-4 bg-transparent hover:bg-white/10 transition rounded-lg flex flex-col relative"
          >
            <span className="text-2xl md:text-3xl font-mont font-bold text-white group-hover:text-accentBlue transition">
              {t("main.tickets.title")}
            </span>
            <span className="text-md md:text-lg text-white/80 mt-2">
              {t("main.tickets.subtitle")}
            </span>
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-3xl text-white group-hover:text-accentBlue transition">
              →
            </span>
          </a>
        </div>
      </section>

      {/* Старая "геройская" секция можно убрать или оставить ниже */}

      <AboutSection />
      <ProjectsSection />
    </>
  );
}