import React from "react";
import EventCard from "../components/EventCard";
import { useTranslation } from "react-i18next";

const events = [
  {
    id: 1,
    image: "/assets/events/vr-art.webp",
    badge: "VR",
    title_ru: "Виртуальная реальность: Новые горизонты",
    title_en: "Virtual Reality: New Horizons",
    desc_ru: "Уникальное иммерсивное шоу с использованием VR-технологий. Погрузитесь в цифровое искусство.",
    desc_en: "A unique immersive show using VR technology. Dive into digital art.",
    date: "12.06.2025",
    type: "VR",
  },
  {
    id: 2,
    image: "/assets/events/performance.webp",
    badge: "IMMERSE",
    title_ru: "Иммерсивный перформанс «Пульс города»",
    title_en: "Immersive Performance 'City Pulse'",
    desc_ru: "Современное искусство в формате полного погружения: звук, свет, движение.",
    desc_en: "Contemporary art in a full-immersion format: sound, light, movement.",
    date: "23.06.2025",
    type: "Impression",
  },
  // ...еще события
];

export default function Events() {
  const { t } = useTranslation();
  return (
    <section id="events" className="py-16 bg-[#F5F5F5] dark:bg-[#1E1E1E]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">{t("events.title")}</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}