import React, { useState } from "react";

const projects = [
  {
    title: "Mars Academy",
    image: "/projects/mars-academy.jpg",
    desc: "Образовательная платформа для онлайн-курсов: сайт, брендинг, продвижение.",
    link: "#",
  },
  {
    title: "Kosmo Store",
    image: "/projects/kosmo-store.jpg",
    desc: "Интернет-магазин одежды. Дизайн, разработка, настройка рекламы.",
    link: "#",
  },
  {
    title: "Venus Beauty",
    image: "/projects/venus-beauty.jpg",
    desc: "Фирменный стиль и сайт для косметологической клиники.",
    link: "#",
  },
  {
    title: "Rocket SMM",
    image: "/projects/rocket-smm.jpg",
    desc: "Комплексное ведение соцсетей и таргетированная реклама.",
    link: "#",
  },
];

export default function ProjectsSection() {
  const [hovered, setHovered] = useState(null);

  return (
    <section
      id="projects"
      className="bg-secondary py-14 md:py-24"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
          Наши <span className="text-accent">проекты</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((proj, idx) => (
            <a
              key={proj.title}
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-all duration-200 flex flex-col"
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className={`w-full h-full object-cover transition-transform duration-500 ${hovered === idx ? "scale-105" : "scale-100"}`}
                />
                <div className={`absolute inset-0 bg-black/40 flex items-center justify-center text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  Смотреть проект
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold mb-2">{proj.title}</h3>
                <p className="text-gray-700 flex-1">{proj.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}