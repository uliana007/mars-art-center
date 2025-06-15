import React, { useState, useEffect, useRef } from "react";

// Импортируй изображения как переменные
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

// Используй переменные в массиве данных
const exhibitions = [
  {
    id: 1,
    title: "SENSE. ГЕОМЕТРИЯ ЧУВСТВ",
    artist: "Иван Смирнов",
    style: "Иммерсия",
    type: ["Выставка", "Иммерсия"],
    dateStart: "2024-09-27",
    dateEnd: "2025-06-30",
    age: "0+",
    image: slide2,
  },
  {
    id: 2,
    title: "RE_MEMBER. ВСПОМНИ СЕБЯ",
    artist: "Алина Петрова",
    style: "Иммерсия",
    type: ["Выставка", "Иммерсия"],
    dateStart: "2025-02-22",
    dateEnd: "2025-06-30",
    age: "12+",
    image: slide3,
  },
  {
    id: 3,
    title: "РАСКРЫТИЕ ПОТЕНЦИАЛА ДУШИ",
    artist: "Ирина Умарова",
    style: "Мастер-класс",
    type: ["Спецпроект", "Семинар", "Мастер-класс"],
    dateStart: "2025-06-13",
    dateEnd: "2025-06-13",
    age: "18+",
    image: slide5,
  },
  {
    id: 4,
    title: "ПОЛЁТ КОЛИБРИ",
    artist: "Павел Лебедев",
    style: "Акция",
    type: ["Акция"],
    dateStart: "2025-04-02",
    dateEnd: "2025-06-15",
    age: "16+",
    image: slide6,
  },
  {
    id: 5,
    title: "СВЕТ И ТЕНЬ",
    artist: "Мария Волкова",
    style: "Иммерсия",
    type: ["Выставка"],
    dateStart: "2025-01-15",
    dateEnd: "2025-03-30",
    age: "14+",
    image: slide4,
  },
  {
    id: 6,
    title: "ПЕРФОРМАНС ВРЕМЕНИ",
    artist: "Дмитрий Орлов",
    style: "Перформанс",
    type: ["Перформанс"],
    dateStart: "2025-03-01",
    dateEnd: "2025-04-01",
    age: "16+",
    image: slide7,
  },
  {
    id: 7,
    title: "ВР-ИСКУССТВО",
    artist: "Екатерина Белая",
    style: "VR проект",
    type: ["VR проект"],
    dateStart: "2025-02-01",
    dateEnd: "2025-02-28",
    age: "6+",
    image: slide8,
  },
  {
    id: 8,
    title: "НОЧЬ МУЗЕЕВ",
    artist: "Артём Козлов",
    style: "Спектакль",
    type: ["Спектакль"],
    dateStart: "2025-05-18",
    dateEnd: "2025-05-18",
    age: "12+",
    image: slide9,
  },
  {
    id: 9,
    title: "КОНЦЕРТ ФОРМ",
    artist: "Юлия Соколова",
    style: "Концерт",
    type: ["Концерт"],
    dateStart: "2025-05-25",
    dateEnd: "2025-05-25",
    age: "6+",
    image: slide10,
  },
  {
    id: 10,
    title: "СЕМИНАР ПО ЦВЕТУ",
    artist: "Глеб Новиков",
    style: "Семинар",
    type: ["Семинар"],
    dateStart: "2025-04-15",
    dateEnd: "2025-04-15",
    age: "16+",
    image: slide11,
  },
];

const types = [
  "VR проект", "Спецпроект", "Выставка", "Иммерсия", "Перформанс",
  "Спектакль", "Акция", "Мастер-класс", "Семинар", "Концерт"
];
const artists = [...new Set(exhibitions.map(e => e.artist))];
const styles = [...new Set(exhibitions.map(e => e.style))];

const YANDEX_TICKETS_URL = "https://afisha.yandex.ru/moscow/party/sunset-party?source=place";

// TimePad widget settings
const TIMEPAD_WIDGET_SCRIPT = "https://timepad.ru/js/tpwf/loader/min/loader.js";
const TIMEPAD_DATA = {
  'data-timepad-customized': '332719',
  'data-twf2s-event--id': '3412875',
  'data-timepad-widget-v2': 'event_register',
};
const TIMEPAD_EVENT_URL = "https://tssi-mars.timepad.ru/event/3412875/";

export default function ExhibitionsPage() {
  const [draftTypes, setDraftTypes] = useState([]);
  const [draftArtist, setDraftArtist] = useState("");
  const [draftStyle, setDraftStyle] = useState("");
  const [draftDateRange, setDraftDateRange] = useState({ from: "", to: "" });

  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  const filtered = exhibitions.filter(e => {
    if (selectedTypes.length && !selectedTypes.some(t => e.type.includes(t))) return false;
    if (selectedArtist && e.artist !== selectedArtist) return false;
    if (selectedStyle && e.style !== selectedStyle) return false;
    if (dateRange.from && new Date(e.dateEnd) < new Date(dateRange.from)) return false;
    if (dateRange.to && new Date(e.dateStart) > new Date(dateRange.to)) return false;
    return true;
  });

  const [showTypesDropdown, setShowTypesDropdown] = useState(false);

  // Для модального окна с покупкой билетов
  const [openModal, setOpenModal] = useState(false);

  // Для интеграции TimePad
  const timepadRef = useRef(null);

  // Динамическая загрузка и очистка скрипта TimePad
  useEffect(() => {
    if (openModal) {
      // Добавить скрипт только когда модалка открыта
      const script = document.createElement('script');
      script.type = "text/javascript";
      script.async = true;
      script.defer = true;
      script.charset = "UTF-8";
      script.src = TIMEPAD_WIDGET_SCRIPT;
      Object.entries(TIMEPAD_DATA).forEach(([k, v]) => script.setAttribute(k, v));
      // Добавить в контейнер
      if (timepadRef.current) {
        timepadRef.current.innerHTML = "";
        timepadRef.current.appendChild(script);
      }
      // Очистить при закрытии
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

  return (
    <section className="min-h-[100vh] bg-[#14213d] text-white px-2 pb-16">
      <div className="h-[80px] md:h-[96px]" />
      <h1 className="text-center text-3xl md:text-5xl font-mont font-bold py-8">
        Афиша выставок Центра М'АРС
      </h1>
      {/* Фильтры */}
      <form
        className="flex flex-col sm:flex-row flex-wrap justify-center items-stretch gap-3 sm:gap-4 mb-8 w-full max-w-5xl mx-auto"
        onSubmit={applyFilters}
      >
        <div className="relative w-full sm:w-auto">
          <button
            type="button"
            className="bg-[#353535] px-4 py-2 rounded flex items-center gap-2 font-semibold hover:bg-[#505050] transition w-full sm:w-auto justify-between"
            onClick={() => setShowTypesDropdown(v => !v)}
          >
            {draftTypes.length > 0
              ? `Типы (${draftTypes.length})`
              : "Типы"}
            <svg width="16" height="16" viewBox="0 0 20 20" className="ml-1"><path fill="white" d="M5 8l5 5 5-5z"/></svg>
          </button>
          {showTypesDropdown && (
            <>
              <div
                className="fixed inset-0 bg-black/50 z-40 sm:hidden"
                onClick={() => setShowTypesDropdown(false)}
              />
              <div
                className={`
                  absolute left-0 mt-2 z-50 bg-[#222] border border-[#353535] rounded shadow-lg p-3
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
                  Применить
                </button>
              </div>
            </>
          )}
        </div>
        {/* Художники */}
        <select
          className="bg-[#353535] text-white px-4 py-2 rounded w-full sm:w-auto"
          value={draftArtist}
          onChange={e => setDraftArtist(e.target.value)}
        >
          <option value="">Все художники</option>
          {artists.map(a => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
        {/* Стили */}
        <select
          className="bg-[#353535] text-white px-4 py-2 rounded w-full sm:w-auto"
          value={draftStyle}
          onChange={e => setDraftStyle(e.target.value)}
        >
          <option value="">Все стили</option>
          {styles.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {/* Даты */}
        <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
          <input
            type="date"
            className="bg-[#353535] text-white px-4 py-2 rounded w-full sm:w-40"
            value={draftDateRange.from}
            onChange={e => setDraftDateRange(r => ({ ...r, from: e.target.value }))}
            placeholder="От"
          />

        </div>
        {/* Кнопки действий */}
        <div className="flex gap-2 w-full mt-2 sm:mt-0">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-accentBlue rounded text-white font-semibold hover:bg-blue-600 transition w-full"
          >
            Применить фильтры
          </button>
          <button
            type="button"
            className="flex-1 px-4 py-2 bg-[#353535] rounded text-white font-semibold hover:bg-[#505050] transition border border-gray-700 w-full"
            onClick={resetFilters}
          >
            Сбросить фильтры
          </button>
        </div>
      </form>
      {/* Карточки выставок */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
        {filtered.map(card => (
          <div
            key={card.id}
            className="border border-accentBlue rounded-md overflow-hidden bg-[#181818] relative cursor-pointer transition-transform hover:scale-[1.02]"
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
              <span className="absolute top-2 right-2 bg-white text-black font-semibold rounded-full px-3 py-1 text-md shadow">{card.age}</span>
            </div>
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {card.dateStart === card.dateEnd ? (
                <div className="bg-black bg-opacity-80 text-white rounded px-2 py-1 text-sm font-semibold">
                  {new Date(card.dateStart).toLocaleDateString()}
                </div>
              ) : (
                <div className="bg-black bg-opacity-80 text-white rounded px-2 py-1 text-sm font-semibold">
                  {new Date(card.dateStart).toLocaleDateString()}<br/>-<br/>{new Date(card.dateEnd).toLocaleDateString()}
                </div>
              )}
            </div>
            <div className="absolute top-20 right-2 flex flex-col gap-1">
              {card.type.map(t => (
                <div
                  key={t}
                  className="bg-black bg-opacity-90 text-white rounded px-2 py-1 text-xs font-bold mb-1 text-center uppercase tracking-wider"
                >
                  {t}
                </div>
              ))}
            </div>
            <div className="pt-6 pb-3 px-3 min-h-[56px] flex items-end">
              <span className="font-bold text-lg md:text-xl uppercase tracking-tight text-white drop-shadow">
                {card.title}
              </span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-2 text-center text-gray-400 py-10">
            Нет выставок по выбранным фильтрам.
          </div>
        )}
      </div>
      {/* Модальное окно с интеграцией TimePad */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div
            className="
              relative w-full max-w-lg bg-[#181818] rounded-xl overflow-hidden flex flex-col p-6
              max-h-[90vh]
            "
            style={{
              boxSizing: "border-box",
              // Максимальная высота и скролл для контента модалки
              maxHeight: '90vh',
            }}
          >
            <button
              className="absolute right-4 top-4 z-10 text-white bg-[#353535] rounded-full px-3 py-1 font-bold text-lg hover:bg-[#505050] transition"
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
                // Для плавного скролла
                WebkitOverflowScrolling: 'touch',
              }}
            >
              <h2 className="text-2xl mb-4 text-center font-bold">Покупка билетов</h2>
              <div ref={timepadRef} style={{ width: "100%" }}>
                {/* TimePad виджет появится тут */}
                <noscript>
                  <a href={TIMEPAD_EVENT_URL} target="_blank" rel="noopener noreferrer">
                    Купить билет на TimePad
                  </a>
                </noscript>
              </div>
              <p className="text-gray-300 text-center max-w-xs text-base mt-4">
                Покупка билетов осуществляется через TimePad.<br />
                Если виджет не загрузился, вы можете <a href={TIMEPAD_EVENT_URL} target="_blank" rel="noopener noreferrer" className="text-accentBlue underline">перейти по прямой ссылке</a>.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}