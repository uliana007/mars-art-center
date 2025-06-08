import React from "react";
import { useTranslation } from "react-i18next";

export default function AboutSection() {
  const { t } = useTranslation();
  return (
    <section className="py-16 bg-cardLight dark:bg-cardDark">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-accentBlue dark:text-accentBlueDark font-mont">
          {t("about.title")}
        </h2>
        <p className="text-base md:text-lg text-lightText dark:text-darkText font-sans max-w-2xl">
          {t("about.desc")}
        </p>
      </div>
    </section>
  );
}