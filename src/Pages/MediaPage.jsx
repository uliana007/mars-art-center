import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// Импорт изображений отдельными переменными (оставить как есть!)
import imgArticle1 from "../assets/image/slide-10.png";
import imgArticle2 from "../assets/image/slide-11.png";
import imgArticle3 from "../assets/image/slide-12.png";
import imgArticle4 from "../assets/image/slide-2.png";
import imgArticle5 from "../assets/image/slide-7.png";
import imgArticle6 from "../assets/image/slode-9.png";

// Импортируешь db из своего firebase.js (путь поправь по структуре своего проекта)
import { db } from "../db_firebase/firebase"; // или "../firebase" если у тебя так

import { collection, getDocs } from "firebase/firestore";

// Сопоставление id статьи и картинки
const imageMap = {
  "1": imgArticle1,
  "2": imgArticle2,
  "3": imgArticle3,
  "4": imgArticle4,
  "5": imgArticle5,
  "6": imgArticle6,
};

export default function MediaPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "ru"; // по умолчанию ru
  const [articles, setArticles] = useState([]);
  const [openedArticle, setOpenedArticle] = useState(null);

  // Загрузка данных из Firestore
  useEffect(() => {
    async function fetchArticles() {
      try {
        // Используй только импортированный db!
        const querySnapshot = await getDocs(collection(db, "media"));
        const fetched = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();

          fetched.push({
            ...data,
            id: data.id,
            title: data.title?.[lang] || "",
            type: data.type?.[lang] || "",
            preview: data.preview?.[lang] || "",
            image: imageMap[data.id] || null,
            contentHtml: data.content?.[lang] || "",
          });
        });
        // Сортировка по дате (по желанию)
        fetched.sort((a, b) => b.date.localeCompare(a.date));
        setArticles(fetched);
      } catch (e) {
        console.error("Ошибка загрузки статей:", e);
      }
    }
    fetchArticles();
  }, [lang]);

  return (
    <section className="py-16 min-h-[60vh] flex flex-col items-center bg-[#0e1d3c] relative">
      <br />
      <br />
      <br />
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-accentBlue dark:text-accentBlueDark font-mont">
        МЕДИА
      </h1>
      <div className="max-w-[1200px] w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <div
              key={art.id}
              className="bg-black hover:bg-[#121212] cursor-pointer border border-[#222] shadow-xl transition p-0 rounded-lg flex flex-col group"
              onClick={() => setOpenedArticle(art)}
            >
              <div className="relative">
                <img
                  src={art.image}
                  alt={art.title}
                  className="aspect-[1.6/1] w-full h-56 object-cover object-center rounded-t-lg group-hover:brightness-90"
                />
                {/* Новости */}
                <div className="absolute left-2 top-2 bg-white px-3 py-1 rounded font-bold text-xs text-[#191970] uppercase tracking-widest shadow">
                  {art.type}
                </div>
                {/* Дата */}
                <div className="absolute right-2 top-2 bg-white px-3 py-1 rounded font-bold text-xs text-[#191970] tracking-widest shadow">
                  {art.date} г.
                </div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-end px-3 py-5">
                <div className="text-center text-accentBlue font-mont font-bold text-base leading-tight mb-2 group-hover:underline uppercase">
                  {art.title}
                </div>
                <div className="text-center text-white text-sm mt-auto">
                  {art.preview}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button className="px-7 py-2 border border-accentBlue text-accentBlue bg-transparent hover:bg-accentBlue hover:text-white transition rounded font-mont">
            Показать еще...
          </button>
        </div>
      </div>

      {/* Модальное окно для статьи */}
      {openedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <div className="bg-[#161616] text-white max-w-2xl w-full rounded-xl shadow-2xl relative p-8 overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-4 right-5 text-2xl text-accentBlue hover:text-white transition"
              onClick={() => setOpenedArticle(null)}
              aria-label="Закрыть"
            >
              &times;
            </button>
            <img
              src={openedArticle.image}
              alt={openedArticle.title}
              className="w-full rounded mb-6 max-h-64 object-cover object-center"
            />
            <div className="text-xs text-accentBlue mb-2 font-semibold tracking-wider">
              {openedArticle.type} • {openedArticle.date} г.
            </div>
            <div className="font-bold text-xl mb-4">{openedArticle.title}</div>
            <div className="text-base leading-relaxed">
              {/* Отрисовка HTML из Firestore */}
              <div dangerouslySetInnerHTML={{ __html: openedArticle.contentHtml }} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}