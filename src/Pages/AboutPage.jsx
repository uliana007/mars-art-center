import React, { useRef, useState } from "react";

// Импортируйте фото центра
import aboutImage from "../assets/image/slide-12.png"; // замените путь на свой

export default function AboutPage() {
  // Для интерактивного проигрывания видео/анимации по клику
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);

  // Можно добавить видео для интерактива (замените ссылку если нужно)
  const VIDEO_SRC = "https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1";

  return (
    <section className="py-16 min-h-[60vh] bg-[#0e1d3c] flex flex-col items-center">
    <br></br> 
    <br></br>
    <br></br>
     <h1 className="text-4xl font-bold mb-10 text-white font-mont text-center">
        Центр М'АРС
      </h1>
      <div className="max-w-3xl w-full mx-auto text-left px-4">
        <p className="text-lg text-gray-200 font-semibold mb-4">
          <span className="font-bold">Центр современного искусства М'АРС</span> (M – Москва, ARS (лат.) – искусство) – одно из наиболее ярких и необычных мест на арт-карте Москвы.
        </p>
        <p className="text-base text-gray-300 mb-3">
          Группа молодых и дерзких художников, создавших в 1988 году первую в СССР частную галерею, заложила два принципа, ставших для М'АРСа неизменными: (1) знакомить публику с самым новым и передовым в современном искусстве и (2) предоставлять свои площадки широкому кругу современных художников, оставляя за Временем и Зрителем право судить и выбирать.
        </p>
        <p className="text-base text-gray-300 mb-3">
          Что творится сегодня в мире визуальной культуры? Мы видим, что традиционное искусство "теряет свою сакральность", что мощное визуальное удовольствие, предлагаемое графическим дизайном, вытесняет искусство с его позиций, а технологии виртуальной и дополненной реальности переключают на себя внимание зрителя.
        </p>
        <p className="text-base text-gray-300 mb-7">
          М'АРС стремится вернуть интерес публики к искусству, доказывая, что искусство и новые технологии – не взаимоисключающие понятия, и наоборот, использование новых технологий в искусстве создает ни с чем не сравнимый чувственный и эмоциональный опыт.
        </p>
        {/* Интерактивный блок с фото или видео */}
        <div className="flex flex-col items-center">
          {!showVideo ? (
            <div className="relative group cursor-pointer w-full max-w-xl mx-auto"
              onClick={() => setShowVideo(true)}
              tabIndex={0}
              aria-label="Воспроизвести видео о центре"
              onKeyDown={e => (e.key === "Enter" || e.key === " ") && setShowVideo(true)}
            >
              <img
                src={aboutImage}
                alt="Интерактивная инсталляция центра М'АРС"
                className="rounded-lg shadow-lg object-cover w-full transition group-hover:brightness-90"
                style={{ aspectRatio: "16/9", minHeight: 320, background: "#191919" }}
              />
              {/* Кнопка-плей поверх фото */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-black/40 rounded-full flex items-center justify-center group-hover:bg-black/60 transition">
                  <svg
                    width="52"
                    height="52"
                    viewBox="0 0 52 52"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="26" cy="26" r="26" fill="rgba(0,0,0,0.4)" />
                    <polygon
                      points="20,16 20,36 38,26"
                      fill="#56ffe0"
                      className="group-hover:scale-110 transition"
                    />
                  </svg>
                </div>
              </div>
              {/* Подпись к фото */}
              <div className="text-sm text-gray-400 mt-3 text-center">Фрагмент интерактивной инсталляции в Центре М'АРС</div>
              <div className="text-xs text-blue-400 mt-1 text-center opacity-80 select-none group-hover:underline">Нажмите для просмотра видео</div>
            </div>
          ) : (
            <div className="w-full max-w-xl aspect-video rounded-lg shadow-lg overflow-hidden mx-auto">
              <iframe
                ref={videoRef}
                src={VIDEO_SRC}
                title="О центре М'АРС"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full"
                style={{ minHeight: 320, background: "#191919" }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}