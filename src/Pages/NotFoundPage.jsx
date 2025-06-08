import React from "react";
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <section className="py-16 min-h-[60vh] flex flex-col items-center justify-center bg-cardLight dark:bg-cardDark">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-accentBlue dark:text-accentBlueDark font-mont">
        {t("not_found.title")}
      </h1>
      <p className="text-base md:text-lg text-lightText dark:text-darkText mb-4 max-w-2xl text-center font-sans">
        {t("not_found.desc")}
      </p>
    </section>
  );
}