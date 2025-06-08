import React from "react";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-14 md:py-24 bg-secondary overflow-hidden"
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Мы создаём digital-решения <span className="text-accent">для роста вашего бизнеса</span>
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Центр Mars — digital-агентство полного цикла. Мы разрабатываем сайты, брендинг, дизайн, ведём социальные сети, настраиваем рекламу и помогаем компаниям расти в интернете.
          </p>
          <ul className="space-y-2 text-gray-800 font-semibold">
            <li className="flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-accent mr-3" />
              Современный дизайн и удобный интерфейс
            </li>
            <li className="flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-accent mr-3" />
              Комплексный подход к продвижению
            </li>
            <li className="flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-accent mr-3" />
              Реальные кейсы и довольные клиенты
            </li>
          </ul>
        </div>
        <div className="flex-1 flex justify-center">
          {/* Место для иллюстрации или mockup */}
          <div className="relative w-[320px] h-[320px] rounded-2xl bg-gradient-to-tr from-yellow-100 via-yellow-300 to-yellow-50 shadow-xl flex items-center justify-center">
            <img
              src="/about-mars.png"
              alt="Диджитал агентство"
              className="w-56 h-auto drop-shadow-xl animate-float"
            />
          </div>
        </div>
      </div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
      `}</style>
    </section>
  );
}