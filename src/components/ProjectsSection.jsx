import React from "react";
import { useTranslation } from "react-i18next";

export default function ProjectsSection() {
  const { t } = useTranslation();
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-accentBlue dark:text-accentBlueDark font-mont">
          {t("projects.title")}
        </h2>
        <p className="text-base md:text-lg text-lightText dark:text-darkText mb-8 font-sans max-w-2xl">
          {t("projects.desc")}
        </p>
        <div className="italic text-gray-400">{t("projects.coming_soon")}</div>
      </div>
    </section>
  );
}