import React from "react";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

export default function VictorsPage() {
  const { t } = useTranslation();

  return (
    <section className="min-h-[100vh] bg-[#f1f7fc] dark:bg-[#0a0c46] text-[#1A1A1A] dark:text-white px-4 py-12 flex flex-col items-center transition-colors duration-300">
      <div className="max-w-3xl w-full mx-auto">
        <br />
        <br />
        <br />
        <h1 className="text-center text-4xl md:text-5xl font-bold font-mont mb-10">
          {t("rules.title")}
        </h1>
        <div className="space-y-5 text-base md:text-lg text-black dark:text-white font-sans">
          <p>{t("rules.p1")}</p>

          <p>
            <Trans
              i18nKey="rules.p2"
              components={{
                ticketsLink: (
                  <Link
                    to="/tickets"
                    className="text-blue-600 dark:text-blue-400 underline hover:text-blue-400 dark:hover:text-blue-300 transition"
                  />
                ),
              }}
            />
          </p>

          <p>
            <Trans
              i18nKey="rules.p3"
              components={{
                vrLink: (
                  <Link
                    to="/vr-projects"
                    className="text-blue-600 dark:text-blue-400 underline hover:text-blue-400 dark:hover:text-blue-300 transition"
                  />
                ),
                refundLink: (
                  <a
                    href="https://marscenter.ru/refund"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 underline hover:text-blue-400 dark:hover:text-blue-300 transition"
                  />
                ),
              }}
            />
          </p>

          <p>{t("rules.p4")}</p>

          <div>
            <p className="mb-2">{t("rules.forbidden_title")}</p>
            <ul className="list-disc pl-6 space-y-1">
              {t("rules.forbidden_list", { returnObjects: true }).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <p>{t("rules.p5")}</p>
        </div>
      </div>
    </section>
  );
}
