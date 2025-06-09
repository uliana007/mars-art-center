import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import "../styles/PosterCarousel.css";

// Пример данных карточек (замените на API или props)
const posters = [
  {
    id: 1,
    date: "18.06.2025",
    time: "19:00",
    title: "ОМ-ЧАНТИНГ: Внутренний Храм",
    subtitle: "Практика и живой концерт-медитация. Билеты в продаже!",
    image: "/assets/posters/om-chanting.jpg",
    authors: "МАША ВИВО, ИЛЬДАР ГИРИДХАРИ",
    tag: "MEMBER",
  },
  // Добавьте еще объекты по необходимости
];

export default function PosterCarousel() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const total = posters.length;

  // Для swipe на мобильных
  const startX = useRef(null);

  function prev() {
    setCurrent((c) => (c - 1 + total) % total);
  }
  function next() {
    setCurrent((c) => (c + 1) % total);
  }

  function handleTouchStart(e) {
    startX.current = e.touches[0].clientX;
  }
  function handleTouchEnd(e) {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx > 60) prev();
    if (dx < -60) next();
    startX.current = null;
  }

  return (
    <section className="poster-carousel-bg">
      <div className="carousel-inner">
        <button className="carousel-arrow left" onClick={prev} aria-label="Prev">
          <span>&#8592;</span>
        </button>

        <div
          className="carousel-card-wrapper"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={posters[current].id}
              className="carousel-card"
              initial={{ opacity: 0, y: 60, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -60, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 70, damping: 18 }}
              whileHover={{ scale: 1.025, boxShadow: "0 0 0 6px #2D37FF, 0 0 24px #2d37ff44" }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="carousel-card-imgblock">
                <img
                  src={posters[current].image}
                  alt={posters[current].title}
                  className="carousel-card-img"
                  draggable={false}
                />
                <div className="carousel-card-authors">{posters[current].authors}</div>
                <div className="carousel-card-tag">{posters[current].tag}</div>
                <div className="carousel-card-date">
                  {posters[current].date}
                  <span style={{ fontWeight: 400, fontSize: 18, marginLeft: 8 }}>
                    {posters[current].time}
                  </span>
                </div>
              </div>
              <div className="carousel-card-info">
                <div className="carousel-card-title">{posters[current].title}</div>
                <div className="carousel-card-subtitle">{posters[current].subtitle}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button className="carousel-arrow right" onClick={next} aria-label="Next">
          <span>&#8594;</span>
        </button>
      </div>

      <div className="carousel-dots">
        {posters.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot${current === i ? " active" : ""}`}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
      <div className="carousel-top-week">{t("poster.top_week") || "ТОП недели"}</div>
    </section>
  );
}