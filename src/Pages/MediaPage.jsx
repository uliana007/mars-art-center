import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// Импорт изображений
import imgArticle1 from "../assets/image/slide-10.png";
import imgArticle2 from "../assets/image/slide-11.png";
import imgArticle3 from "../assets/image/slide-12.png";
import imgArticle4 from "../assets/image/slide-2.png";
import imgArticle5 from "../assets/image/slide-7.png";
import imgArticle6 from "../assets/image/slode-9.png";
import imgArticle7 from "../assets/image/slide-13.jpg";
import imgArticle8 from "../assets/image/slide-14.png";
import imgArticle9 from "../assets/image/slide-15.jpeg";
import imgArticle10 from "../assets/image/slide-16.png";
import imgArticle11 from "../assets/image/slide-17.png";
import imgArticle12 from "../assets/image/slide-18.png";

// Firebase
import { db } from "../db_firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const imageMap = {
  "1": imgArticle1,
  "2": imgArticle2,
  "3": imgArticle3,
  "4": imgArticle4,
  "5": imgArticle5,
  "6": imgArticle6,
  "7": imgArticle7,
  "8": imgArticle8,
  "9": imgArticle9,
  "10": imgArticle10,
  "11": imgArticle11,
  "12": imgArticle12,
};

export default function MediaPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "ru";
  const [articles, setArticles] = useState([]);
  const [openedArticle, setOpenedArticle] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    async function fetchArticles() {
      try {
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
            dateInfo: data.dateInfo?.[lang] || data.dateInfo || "",
          });
        });
        fetched.sort((a, b) => b.date.localeCompare(a.date));
        setArticles(fetched);
      } catch (e) {
        console.error("Ошибка загрузки статей:", e);
      }
    }
    fetchArticles();
  }, [lang]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const visibleArticles = articles.slice(0, visibleCount);

  return (
    <section className="py-16 min-h-[60vh] flex flex-col items-center bg-[#f1f7fc] dark:bg-[#191970] transition-colors duration-300 relative">
      <br />
      <br />
      <br />
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[#0a0c46] dark:text-white font-mont">
        {t("media.title")}
      </h1>
      <div className="max-w-[1200px] w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visibleArticles.map((art) => (
            <div
              key={art.id}
              className="bg-white dark:bg-black hover:bg-[#f0f4fa] dark:hover:bg-[#121212] cursor-pointer border border-[#DFE7F1] dark:border-[#222] shadow-xl transition p-0 rounded-lg flex flex-col group"
              onClick={() => setOpenedArticle(art)}
            >
              <div className="relative">
                <img
                  src={art.image}
                  alt={art.title}
                  className="aspect-[1.6/1] w-full h-56 object-cover object-center rounded-t-lg group-hover:brightness-90"
                />
                <div className="absolute left-2 top-2 bg-[#fff] dark:bg-white px-3 py-1 rounded font-bold text-xs text-[#191970] uppercase tracking-widest shadow">
                  {art.type}
                </div>
                <div className="absolute right-2 top-2 bg-[#fff] dark:bg-white px-3 py-1 rounded font-bold text-xs text-[#191970] tracking-widest shadow">
                  {art.date} г.
                </div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-end px-3 py-5">
                <div className="text-center text-accentBlue dark:text-accentBlueDark font-mont font-bold text-base leading-tight mb-2 group-hover:underline uppercase">
                  {art.title}
                </div>
                <div className="text-center text-[#222] dark:text-white text-sm mt-auto">
                  {art.preview}
                </div>
              </div>
            </div>
          ))}
        </div>
        {visibleCount < articles.length && (
          <div className="flex justify-center mt-8">
            <button
              className="px-7 py-2 border border-accentBlue dark:border-accentBlueDark text-accentBlue dark:text-accentBlueDark bg-transparent hover:bg-accentBlue hover:text-white dark:hover:bg-accentBlueDark dark:hover:text-white transition rounded font-mont"
              onClick={handleShowMore}
            >
              {t("media.show_more")}
            </button>
          </div>
        )}
      </div>

      {openedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 dark:bg-black/90 backdrop-blur-sm p-4">
          <div className="bg-[#f1f7fc] dark:bg-[#161616] text-[#222] dark:text-white max-w-2xl w-full rounded-xl shadow-2xl relative p-8 overflow-y-auto max-h-[90vh] transition-colors duration-300">
            <button
              className="absolute top-4 right-5 text-2xl text-accentBlue dark:text-accentBlueDark hover:text-white transition"
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
            <div className="text-xs text-accentBlue dark:text-accentBlueDark mb-2 font-semibold tracking-wider">
              {openedArticle.type} • {openedArticle.date} г.
            </div>
            <div className="text-base leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: openedArticle.contentHtml }} />
            </div>
            <div className="mt-6 text-[15px] text-black dark:text-white font-normal whitespace-pre-line">
              {openedArticle.dateInfo}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
