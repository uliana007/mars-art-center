import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

// Импорт изображений
import slide2 from '../assets/image/slide-2.png';
import slide3 from '../assets/image/slide-3.png';
import slide4 from '../assets/image/slide-12.png';
import slide5 from '../assets/image/slide-5.png';
import slide6 from '../assets/image/slide-6.png';
import slide7 from '../assets/image/slide-7.png';
import slide8 from '../assets/image/slide-8.png';
import slide9 from '../assets/image/slode-9.png';
import slide10 from '../assets/image/slide-10.png';
import slide11 from '../assets/image/slide-11.png';
import calendarIconLight from '../assets/image/event-white.png'; // для светлой темы
import calendarIconDark from '../assets/image/event-black.png';   // для темной темы

// FIREBASE
import { db } from "../db_firebase/firebase"; // путь поправь под себя
import { collection, getDocs } from "firebase/firestore";

const isDarkTheme = /* логика определения темы, например из i18n, context или useState */;

// Картинки по id выставки (id в базе - строки!)
const imageMap = {
  "1": slide2,
  "2": slide3,
  "3": slide5,
  "4": slide6,
  "5": slide4,
  "6": slide7,
  "7": slide8,
  "8": slide9,
  "9": slide10,
  "10": slide11,
};

const TIMEPAD_WIDGET_SCRIPT = "https://timepad.ru/js/tpwf/loader/min/loader.js";
const TIMEPAD_DATA = {
  'data-timepad-customized': '332719',
  'data-twf2s-event--id': '3412875',
  'data-timepad-widget-v2': 'event_register',
};
const TIMEPAD_EVENT_URL = "https://tssi-mars.timepad.ru/event/3412875/";

export default function TicketsPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "ru";

  // Состояния для выставок
  const [exhibitions, setExhibitions] = useState([]);
  const [types, setTypes] = useState([]);
  const [artists, setArtists] = useState([]);
  const [styles, setStyles] = useState([]);

  // Фильтры
  const [draftTypes, setDraftTypes] = useState([]);
  const [draftArtist, setDraftArtist] = useState("");
  const [draftStyle, setDraftStyle] = useState("");
  const [draftDateRange, setDraftDateRange] = useState({ from: "", to: "" });

  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  const [showTypesDropdown, setShowTypesDropdown] = useState(false);

  // Для модального окна с покупкой билетов
  const [openModal, setOpenModal] = useState(false);

  // Для интеграции TimePad
  const timepadRef = useRef(null);

  // Для кастомного placeholder для даты
  const [fromFocused, setFromFocused] = useState(false);

  // Загрузка выставок из Firestore
  useEffect(() => {
    async function fetchExhibitions() {
      try {
        const querySnapshot = await getDocs(collection(db, "exhibitions"));
        const fetched = [];
        let allTypes = new Set();
        let allArtists = new Set();
        let allStyles = new Set();
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Для фильтров собираем уникальные значения
          if (data.type && data.type[lang]) {
            data.type[lang].forEach((t) => allTypes.add(t));
          }
          if (data.artist && data.artist[lang]) allArtists.add(data.artist[lang]);
          if (data.style && data.style[lang]) allStyles.add(data.style[lang]);
          fetched.push({
            ...data,
            id: data.id,
            title: data.title?.[lang] || "",
            artist: data.artist?.[lang] || "",
            style: data.style?.[lang] || "",
            type: data.type?.[lang] || [],
            image: imageMap[data.id] || null,
          });
        });
        setExhibitions(fetched);
        setTypes(Array.from(allTypes));
        setArtists(Array.from(allArtists));
        setStyles(Array.from(allStyles));
      } catch (e) {
        console.error("Ошибка загрузки выставок:", e);
      }
    }
    fetchExhibitions();
  }, [lang]);

  // Фильтрация карточек
  const filtered = exhibitions.filter(e => {
    if (selectedTypes.length && !selectedTypes.some(t => e.type.includes(t))) return false;
    if (selectedArtist && e.artist !== selectedArtist) return false;
    if (selectedStyle && e.style !== selectedStyle) return false;
    if (dateRange.from && new Date(e.dateEnd) < new Date(dateRange.from)) return false;
    if (dateRange.to && new Date(e.dateStart) > new Date(dateRange.to)) return false;
    return true;
  });

  // Динамическая загрузка и очистка скрипта TimePad
  useEffect(() => {
    if (openModal) {
      const script = document.createElement('script');
      script.type = "text/javascript";
      script.async = true;
      script.defer = true;
      script.charset = "UTF-8";
      script.src = TIMEPAD_WIDGET_SCRIPT;
      Object.entries(TIMEPAD_DATA).forEach(([k, v]) => script.setAttribute(k, v));
      if (timepadRef.current) {
        timepadRef.current.innerHTML = "";
        timepadRef.current.appendChild(script);
      }
      return () => {
        if (timepadRef.current) timepadRef.current.innerHTML = "";
      };
    }
  }, [openModal]);

  function resetFilters() {
    setDraftTypes([]);
    setDraftArtist("");
    setDraftStyle("");
    setDraftDateRange({ from: "", to: "" });
    setSelectedTypes([]);
    setSelectedArtist("");
    setSelectedStyle("");
    setDateRange({ from: "", to: "" });
    setShowTypesDropdown(false);
  }

  function applyFilters(e) {
    e && e.preventDefault();
    setSelectedTypes([...draftTypes]);
    setSelectedArtist(draftArtist);
    setSelectedStyle(draftStyle);
    setDateRange({ ...draftDateRange });
    setShowTypesDropdown(false);
  }

  useEffect(() => {
    setDraftTypes([...selectedTypes]);
    setDraftArtist(selectedArtist);
    setDraftStyle(selectedStyle);
    setDraftDateRange({ ...dateRange });
  }, [selectedTypes, selectedArtist, selectedStyle, dateRange]);

  function handleCardClick() {
    setOpenModal(true);
  }

  function closeModal() {
    setOpenModal(false);
  }

  // Тексты для локализации
  const texts = {
    ru: {
      title: "Афиша выставок Центра М'АРС",
      filterTypes: "Типы",
      allArtists: "Все художники",
      allStyles: "Все стили",
      apply: "Применить фильтры",
      reset: "Сбросить фильтры",
      noExhibitions: "Нет выставок по выбранным фильтрам.",
      buyTickets: "Покупка билетов",
      buyOnTimepad: "Купить билет на TimePad",
      ticketsViaTimepad: "Покупка билетов осуществляется через TimePad.\nЕсли виджет не загрузился, вы можете перейти по прямой ссылке.",
      showTypes: (n) => `Типы (${n})`,
      placeholderDate: "дд.мм.гггг",
    },
    en: {
      title: "Exhibitions at MARS Center",
      filterTypes: "Types",
      allArtists: "All artists",
      allStyles: "All styles",
      apply: "Apply filters",
      reset: "Reset filters",
      noExhibitions: "No exhibitions for selected filters.",
      buyTickets: "Buy tickets",
      buyOnTimepad: "Buy ticket on TimePad",
      ticketsViaTimepad: "Ticket purchase is via TimePad.\nIf the widget does not load, you can use the direct link.",
      showTypes: (n) => `Types (${n})`,
      placeholderDate: "dd.mm.yyyy",
    }
  }[lang];

  return (
    <section className="min-h-[100vh] bg-[#f1f7fc] dark:bg-[#0a0c46] text-[#1A1A1A] dark:text-white px-2 pb-16 transition-colors duration-300">
      <div className="h-[80px] md:h-[96px]" />
      <h1 className="text-center text-3xl md:text-5xl font-mont font-bold py-8">
        {texts.title}
      </h1>
      {/* Фильтры */}
      <form
        className="flex flex-col sm:flex-row flex-wrap justify-center items-stretch gap-3 sm:gap-4 mb-8 w-full max-w-5xl mx-auto"
        onSubmit={applyFilters}
      >
        {/* Типы */}
        <div className="relative w-full sm:w-auto">
          <button
            type="button"
            className="bg-[#e9eef7] dark:bg-[#353535] text-[#222] dark:text-white px-4 py-2 rounded flex items-center gap-2 font-semibold hover:bg-[#dae3f3] dark:hover:bg-[#505050] transition w-full sm:w-auto justify-between border border-black"
            onClick={() => setShowTypesDropdown(v => !v)}
          >
            {draftTypes.length > 0
              ? texts.showTypes(draftTypes.length)
              : texts.filterTypes}
            <svg width="16" height="16" viewBox="0 0 20 20" className="ml-1"><path fill="currentColor" d="M5 8l5 5 5-5z"/></svg>
          </button>
          {showTypesDropdown && (
            <>
              <div
                className="fixed inset-0 bg-black/50 z-40 sm:hidden"
                onClick={() => setShowTypesDropdown(false)}
              />
              <div
                className={`
                  absolute left-0 mt-2 z-50 bg-[#e9eef7] dark:bg-[#222] border border-[#dbe6f7] dark:border-[#353535] rounded shadow-lg p-3
                  w-[90vw] max-w-xs sm:w-60 sm:max-w-sm
                  ${showTypesDropdown ? "" : "hidden"}
                  sm:fixed sm:inset-0 sm:mt-0 sm:top-24 sm:left-1/2 sm:-translate-x-1/2
                `}
                style={{
                  ...(window.innerWidth < 640
                    ? { position: "fixed", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "90vw", maxWidth: 340 }
                    : {})
                }}
              >
                <div className="max-h-[60vh] overflow-auto flex flex-col">
                  {types.map(type => (
                    <label key={type} className="flex items-center py-1 cursor-pointer">
                      <input
                        type="checkbox"
                        className="accent-accentBlue mr-2"
                        checked={draftTypes.includes(type)}
                        onChange={e => {
                          setDraftTypes(val =>
                            e.target.checked
                              ? [...val, type]
                              : val.filter(t => t !== type)
                          );
                        }}
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
                <button
                  type="button"
                  className="mt-3 w-full bg-accentBlue text-white rounded px-3 py-2 font-semibold hover:bg-blue-600 transition"
                  onClick={applyFilters}
                >
                  {texts.apply}
                </button>
              </div>
            </>
          )}
        </div>
        {/* Художники */}
        <select
          className="bg-[#e9eef7] dark:bg-[#353535] text-[#222] dark:text-white px-4 py-2 rounded w-full sm:w-auto border border-black"
          value={draftArtist}
          onChange={e => setDraftArtist(e.target.value)}
        >
          <option value="">{texts.allArtists}</option>
          {artists.map(a => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
        {/* Стили */}
        <select
          className="bg-[#e9eef7] dark:bg-[#353535] text-[#222] dark:text-white px-4 py-2 rounded w-full sm:w-auto border border-black"
          value={draftStyle}
          onChange={e => setDraftStyle(e.target.value)}
        >
          <option value="">{texts.allStyles}</option>
          {styles.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {/* Даты */}
       <div className="relative w-full sm:w-40">
  <input
    type="date"
    id="date-from"
    className="bg-[#e9eef7] dark:bg-[#353535] text-[#222] dark:text-white px-4 py-2 rounded w-full peer appearance-none border border-black pr-12"
    value={draftDateRange.from}
    onChange={e => setDraftDateRange(r => ({ ...r, from: e.target.value }))}
    onFocus={() => setFromFocused(true)}
    onBlur={() => setFromFocused(false)}
    autoComplete="off"
  />
  {!(draftDateRange.from || fromFocused) && (
    <span
      className="pointer-events-none absolute left-4 top-1 -translate-y-1/2 text-gray-400 dark:text-gray-400 text-base select-none"
      style={{
        transition: "opacity 0.10s",
        opacity: (!draftDateRange.from && !fromFocused) ? 0 : 0,
      }}
    >
      {texts.placeholderDate}
    </span>
  )}
  {/* Иконка календаря - видна только на мобильных (до sm), размер больше (w-6 h-6) */}
  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none sm:hidden">
    <img
      src={isDarkTheme ? calendarIconDark : calendarIconLight}
      alt="Calendar"
      className="w-6 h-6"
    />
  </div>
</div>
        {/* Кнопки действий */}
        <div className="flex gap-2 w-full mt-2 sm:mt-0">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-accentBlue rounded text-white font-semibold hover:bg-blue-600 transition w-full border border-black"
          >
            {texts.apply}
          </button>
          <button
            type="button"
            className="flex-1 px-4 py-2 bg-[#e9eef7] dark:bg-[#353535] text-[#222] dark:text-white rounded font-semibold hover:bg-[#dae3f3] dark:hover:bg-[#505050] transition border border-black w-full"
            onClick={resetFilters}
          >
            {texts.reset}
          </button>
        </div>
      </form>
      {/* Карточки выставок */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
        {filtered.map(card => (
          <div
            key={card.id}
            className="border border-accentBlue rounded-md overflow-hidden bg-white dark:bg-[#181818] relative cursor-pointer transition-transform hover:scale-[1.02]"
            style={{ boxShadow: "0 0 0 2px #1e50ff" }}
            onClick={handleCardClick}
            tabIndex={0}
            role="button"
          >
            <div className="relative">
              <img
                src={card.image}
                alt={card.title}
                className="w-full object-cover h-56 sm:h-64"
                style={{ filter: "brightness(0.95)" }}
              />
              <span className="absolute top-2 right-2 bg-white dark:bg-gray-900 text-black dark:text-white font-semibold rounded-full px-3 py-1 text-md shadow">{card.age}</span>
            </div>
            {/* Изменено: фон с черного на белый, текст синим для лучшей видимости */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {card.dateStart === card.dateEnd ? (
                <div className="bg-white bg-opacity-95 text-accentBlue rounded px-2 py-1 text-sm font-semibold shadow">
                  {new Date(card.dateStart).toLocaleDateString(lang === "ru" ? "ru-RU" : "en-GB")}
                </div>
              ) : (
                <div className="bg-white bg-opacity-95 text-accentBlue rounded px-2 py-1 text-sm font-semibold shadow">
                  {new Date(card.dateStart).toLocaleDateString(lang === "ru" ? "ru-RU" : "en-GB")}<br/>-<br/>{new Date(card.dateEnd).toLocaleDateString(lang === "ru" ? "ru-RU" : "en-GB")}
                </div>
              )}
            </div>
            <div className="absolute top-20 right-2 flex flex-col gap-1">
              {card.type.map(t => (
                <div
                  key={t}
                  className="bg-white bg-opacity-95 text-accentBlue rounded px-2 py-1 text-xs font-bold mb-1 text-center uppercase tracking-wider shadow"
                >
                  {t}
                </div>
              ))}
            </div>
            <div className="pt-6 pb-3 px-3 min-h-[56px] flex items-end">
              <span className="font-bold text-lg md:text-xl uppercase tracking-tight text-[#1A1A1A] dark:text-white drop-shadow">
                {card.title}
              </span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-2 text-center text-gray-400 py-10">
            {texts.noExhibitions}
          </div>
        )}
      </div>
      {/* Модальное окно с интеграцией TimePad */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div
            className="
              relative w-full max-w-lg bg-white dark:bg-[#181818] rounded-xl overflow-hidden flex flex-col p-6
              max-h-[90vh] text-[#1A1A1A] dark:text-white
            "
            style={{
              boxSizing: "border-box",
              maxHeight: '90vh',
            }}
          >
            <button
              className="absolute right-4 top-4 z-10 text-[#1A1A1A] dark:text-white bg-[#e9eef7] dark:bg-[#353535] rounded-full px-3 py-1 font-bold text-lg hover:bg-[#dae3f3] dark:hover:bg-[#505050] transition"
              onClick={closeModal}
              aria-label="Закрыть"
            >
              ×
            </button>
            <div
              className="flex flex-col items-center py-6 w-full overflow-y-auto"
              style={{
                maxHeight: '80vh',
                minHeight: '180px',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              <h2 className="text-2xl mb-4 text-center font-bold">{texts.buyTickets}</h2>
              <div ref={timepadRef} style={{ width: "100%" }}>
                <noscript>
                  <a href={TIMEPAD_EVENT_URL} target="_blank" rel="noopener noreferrer">
                    {texts.buyOnTimepad}
                  </a>
                </noscript>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-center max-w-xs text-base mt-4">
                {texts.ticketsViaTimepad.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}
                <a href={TIMEPAD_EVENT_URL} target="_blank" rel="noopener noreferrer" className="text-accentBlue underline">
                  {TIMEPAD_EVENT_URL}
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}