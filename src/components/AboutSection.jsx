import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/PosterCarousel.css"; // CSS для кастомной стилизации

// Пример данных (замени на реальные, если нужно)
const exhibitions = [
  {
    date: "18.06.2025",
    time: "19:00",
    img: "/assets/exhibitions/om-chanting.jpg", // путь к картинке постера
    title: {
      ru: "ОМ-ЧАНТИНГ: Внутренний Храм",
      en: "OM-CHANTING: Inner Temple"
    },
    subtitle: {
      ru: "Практика и живой концерт-медитация. Билеты в продаже!",
      en: "Practice and live concert-meditation. Tickets available!"
    }
  },
  {
    date: "24.06.2025",
    time: "20:00",
    img: "/assets/exhibitions/art-night.jpg",
    title: {
      ru: "Ночь Искусств",
      en: "Art Night"
    },
    subtitle: {
      ru: "Экспериментальная выставка и перформанс.",
      en: "Experimental exhibition and performance."
    }
  },
  {
    date: "30.06.2025",
    time: "18:00",
    img: "/assets/exhibitions/digital-future.jpg",
    title: {
      ru: "Цифровое Будущее",
      en: "Digital Future"
    },
    subtitle: {
      ru: "VR-выставка, лекции, мастер-классы.",
      en: "VR exhibition, lectures, workshops."
    }
  }
];

export default function AboutSection() {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0); // 1 – next, -1 – prev

  const showPrev = () => {
    setDirection(-1);
    setActive((prev) => (prev === 0 ? exhibitions.length - 1 : prev - 1));
  };
  const showNext = () => {
    setDirection(1);
    setActive((prev) => (prev === exhibitions.length - 1 ? 0 : prev + 1));
  };

  // Для swipe на мобильном
  let touchStartX = null;
  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (diff > 60) showPrev();
    if (diff < -60) showNext();
    touchStartX = null;
  };

  // Варианты анимации для плавного слайдера
  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.96
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 90, damping: 18 },
        opacity: { duration: 0.34 }
      }
    },
    exit: (dir) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: "spring", stiffness: 90, damping: 18 },
        opacity: { duration: 0.32 }
      }
    })
  };

  return (
    <section className="py-16 bg-cardLight dark:bg-cardDark">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-accentBlue dark:text-accentBlueDark font-mont">
          {t("about.title")}
        </h2>
        <p className="text-base md:text-lg text-lightText dark:text-darkText font-sans max-w-2xl">
          {t("about.desc")}
        </p>

        {/* Карусель выставок */}
        <div className="ex-carousel-outer mt-12">
          <button className="ex-nav ex-nav-left" onClick={showPrev} aria-label="Предыдущая выставка">
            <span>&#8592;</span>
          </button>
          <div
            className="ex-carousel-card-wrap"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence custom={direction} initial={false} mode="wait">
              <motion.div
                key={active}
                className="ex-card"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                whileHover={{ scale: 1.04, boxShadow: "0 0 0 3px #2f4cff, 0 0 22px 2px #2f4cffcc" }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  x: { type: "spring", stiffness: 40, damping: 18 },
                  opacity: { duration: 0.32 }
                }}
              >
                <div className="ex-card-img-block">
                  <img
                    src={exhibitions[active].img}
                    alt={exhibitions[active].title[i18n.language] || exhibitions[active].title.ru}
                    className="ex-card-img"
                    draggable="false"
                  />
                </div>
                <div className="ex-card-info">
                  <div className="ex-card-date">
                    {exhibitions[active].date}
                    <span className="ex-card-time"> {exhibitions[active].time}</span>
                  </div>
                  <div className="ex-card-title">
                    {exhibitions[active].title[i18n.language] || exhibitions[active].title.ru}
                  </div>
                  <div className="ex-card-subtitle">
                    {exhibitions[active].subtitle[i18n.language] || exhibitions[active].subtitle.ru}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <button className="ex-nav ex-nav-right" onClick={showNext} aria-label="Следующая выставка">
            <span>&#8594;</span>
          </button>
        </div>
        {/* Индикаторы */}
        <div className="ex-dots mt-5 flex justify-center gap-3">
          {exhibitions.map((_, idx) => (
            <button
              key={idx}
              className={`ex-dot ${active === idx ? "ex-dot-active" : ""}`}
              onClick={() => {
                setDirection(idx > active ? 1 : -1);
                setActive(idx);
              }}
              aria-label={`Показать выставку ${idx + 1}`}
            />
          ))}
        </div>
        <div className="ex-carousel-footer text-center text-white/80 mt-6 tracking-widest font-mont text-lg">
          ТОП недели
        </div>
      </div>
      {/* These Image numbers: 1 apply to this user message and may be referenced by subsequent user messages. */}
    </section>
  );
}