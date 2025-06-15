import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// Импорт изображений отдельными переменными
import imgArticle1 from "../assets/image/slide-10.png";
import imgArticle2 from "../assets/image/slide-11.png";
import imgArticle3 from "../assets/image/slide-12.png";
import imgArticle4 from "../assets/image/slide-2.png";
import imgArticle5 from "../assets/image/slide-7.png";
import imgArticle6 from "../assets/image/slode-9.png";

// Массив статей с импортированными изображениями
const articles = [
  {
    id: 1,
    date: "13 06 2025",
    title: "Раскрытие потенциала души через работу с Архетипами",
    image: imgArticle1,
    preview: "RE_MEMBER. Ирина Умарова. Мастер-класс 13 июня 19:00",
    type: "НОВОСТИ",
    content: (
      <>
        <h2 className="text-2xl font-bold mb-4">Раскрытие потенциала души через работу с Архетипами</h2>
        <p className="mb-4">
          13 июня в Центре М'АРС прошёл уникальный мастер-класс «RE_MEMBER: Раскрытие потенциала души через работу с Архетипами». Ведущая — известный психолог и арт-терапевт Ирина Умарова — провела участников через глубокий путь самопознания, использовав современные техники работы с личными и коллективными архетипами.
        </p>
        <h3 className="text-xl font-semibold mb-2">Программа мероприятия</h3>
        <ul className="mb-4 list-disc ml-5">
          <li>Теоретический блок: что такое архетипы, их роль в нашей жизни</li>
          <li>Практическая часть: медитативные и арт-упражнения</li>
          <li>Групповая работа и обсуждение личных инсайтов</li>
        </ul>
        <p className="mb-4">
          В атмосфере поддержки и творчества каждый смог погрузиться в исследование собственных внутренних образов, выявить ресурсы и преодолеть внутренние препятствия. После основной части все желающие смогли задать вопросы Ирине и получить индивидуальные рекомендации.
        </p>
        <h3 className="text-xl font-semibold mb-2">Отзывы участников</h3>
        <blockquote className="italic mb-2">«Это был удивительный опыт, я почувствовала внутреннюю ясность и прилив сил!» — Анастасия</blockquote>
        <blockquote className="italic mb-4">«Методы работы с архетипами оказались неожиданно эффективными. Спасибо за вдохновение!» — Дмитрий</blockquote>
        <p>
          Подобные мастер-классы проходят в Центре М'АРС регулярно. Следите за расписанием на нашем сайте и присоединяйтесь к новым событиям, чтобы раскрыть свой потенциал!
        </p>
        <hr className="my-6" />
        <div className="text-sm text-gray-400">
          <p>Дата: 13 июня 2025</p>
          <p>Время: 19:00</p>
          <p>Место: Центр М'АРС, Москва</p>
        </div>
      </>
    )
  },
  {
    id: 2,
    date: "14 06 2025",
    title: "SUNSET PARTY DJ-CET",
    image: imgArticle2,
    preview: "DJ-сет на закате, лучшие треки и атмосфера",
    type: "НОВОСТИ",
    content: (
      <>
        <h2 className="text-2xl font-bold mb-4">SUNSET PARTY DJ-CET</h2>
        <p className="mb-4">
          14 июня на летней террасе Центра М'АРС прошла яркая музыкальная вечеринка SUNSET PARTY. В этот вечер гостей ожидал эксклюзивный DJ-сет от резидента популярных столичных клубов.
        </p>
        <h3 className="text-xl font-semibold mb-2">Музыка, закат и атмосфера</h3>
        <p className="mb-4">
          В программе прозвучали лучшие треки в стиле house, chillout и deep electronic. Потрясающий закат, световые инсталляции и живая энергия танцпола создали неповторимую атмосферу праздника для всех гостей.
        </p>
        <h3 className="text-xl font-semibold mb-2">Впечатления гостей</h3>
        <blockquote className="italic mb-2">«Это был лучший музыкальный вечер сезона!» — Елена</blockquote>
        <blockquote className="italic mb-4">«Спасибо за атмосферу свободы и вдохновения. Ждём продолжения!» — Андрей</blockquote>
        <p>
          Следите за нашими анонсами — уже скоро новые вечеринки и DJ-сеты в М'АРСе!
        </p>
        <hr className="my-6" />
        <div className="text-sm text-gray-400">
          <p>Дата: 14 июня 2025</p>
          <p>Время: 20:00</p>
          <p>Адрес: Центр М'АРС, Москва</p>
        </div>
      </>
    )
  },
  {
    id: 3,
    date: "14 06 2025",
    title: "ПРАКТИКА ЙОГА-НИДРЫ НА МАРСе",
    image: imgArticle3,
    preview: "Закатная Нидра на Марсе. Практика для всех",
    type: "НОВОСТИ",
    content: (
      <>
        <h2 className="text-2xl font-bold mb-4">ПРАКТИКА ЙОГА-НИДРЫ НА МАРСе</h2>
        <p className="mb-4">
          Вечером 14 июня в Центре М'АРС прошла расслабляющая и восстанавливающая практика йога-нидры. Участники смогли погрузиться в глубокое состояние осознанного расслабления под руководством опытного инструктора.
        </p>
        <h3 className="text-xl font-semibold mb-2">Что такое йога-нидра?</h3>
        <p className="mb-4">
          Йога-нидра — это древняя техника медитативного расслабления, которая позволяет восстановить силы, снизить уровень стресса и обрести внутренний покой. Практика сочетала дыхательные упражнения, визуализации и работу с аффирмациями.
        </p>
        <h3 className="text-xl font-semibold mb-2">Отзывы</h3>
        <blockquote className="italic mb-2">«Я почувствовал глубокое расслабление и лёгкость во всём теле!» — Вера</blockquote>
        <blockquote className="italic mb-4">«Практика помогла мне снять усталость после рабочей недели» — Михаил</blockquote>
        <p>
          Следите за расписанием новых практик в Центре М'АРС и приходите восстановить свой баланс!
        </p>
        <hr className="my-6" />
        <div className="text-sm text-gray-400">
          <p>Дата: 14 июня 2025</p>
          <p>Время: 19:30</p>
          <p>Место: Центр М'АРС, Москва</p>
        </div>
      </>
    )
  },
  {
    id: 4,
    date: "06 06 2025",
    title: "SUMMERTIME",
    image: imgArticle4,
    preview: "Концерт джазовой музыки",
    type: "НОВОСТИ",
    content: (
      <>
        <h2 className="text-2xl font-bold mb-4">SUMMERTIME</h2>
        <p className="mb-4">
          6 июня в Центре М'АРС прозвучали знаменитые джазовые стандарты в исполнении приглашённого ансамбля. Концерт «Summertime» собрал поклонников живой музыки и стал настоящим праздником для ценителей джаза.
        </p>
        <h3 className="text-xl font-semibold mb-2">Программа концерта</h3>
        <ul className="mb-4 list-disc ml-5">
          <li>Summertime — Джордж Гершвин</li>
          <li>Take Five — Дейв Брубек</li>
          <li>Autumn Leaves — Жозеф Косма</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2">Отзывы</h3>
        <blockquote className="italic mb-2">«Невероятная энергетика музыкантов, живой звук и отличная атмосфера!» — Тимур</blockquote>
        <blockquote className="italic mb-4">«Рада, что посетила этот концерт! Жду новых музыкальных встреч» — Мария</blockquote>
        <p>
          Следите за афишей Центра М'АРС — впереди ещё много музыкальных сюрпризов.
        </p>
        <hr className="my-6" />
        <div className="text-sm text-gray-400">
          <p>Дата: 6 июня 2025</p>
          <p>Время: 19:00</p>
          <p>Место: Центр М'АРС, Москва</p>
        </div>
      </>
    )
  },
  {
    id: 5,
    date: "05 06 2025",
    title: "КОНЦЕРТ АВТОРСКОЙ МУЗЫКИ АРТЕМА ЛАЛАЯНА",
    image: imgArticle5,
    preview: "Концерт Артема Лалаяна",
    type: "НОВОСТИ",
    content: (
      <>
        <h2 className="text-2xl font-bold mb-4">КОНЦЕРТ АВТОРСКОЙ МУЗЫКИ АРТЕМА ЛАЛАЯНА</h2>
        <p className="mb-4">
          5 июня на сцене Центра М'АРС выступил известный композитор и пианист Артем Лалаян с программой авторской музыки. В этот вечер зрители услышали как новые композиции, так и уже полюбившиеся произведения.
        </p>
        <h3 className="text-xl font-semibold mb-2">О программе вечера</h3>
        <p className="mb-4">
          Концерт был построен как музыкальное путешествие — от лирических баллад до динамичных джазовых импровизаций. Артем делился историями создания своих произведений и отвечал на вопросы слушателей.
        </p>
        <h3 className="text-xl font-semibold mb-2">Отзывы</h3>
        <blockquote className="italic mb-2">«Талантливый музыкант, который умеет трогать душу своими мелодиями» — Наталья</blockquote>
        <blockquote className="italic mb-4">«Благодарю за атмосферу и вдохновение!» — Олег</blockquote>
        <p>
          Следите за расписанием концертов, чтобы не пропустить следующие выступления Артема Лалаяна и других замечательных музыкантов!
        </p>
        <hr className="my-6" />
        <div className="text-sm text-gray-400">
          <p>Дата: 5 июня 2025</p>
          <p>Время: 20:00</p>
          <p>Место: Центр М'АРС, Москва</p>
        </div>
      </>
    )
  },
  {
    id: 6,
    date: "04 06 2025",
    title: "ПУЛЬС ЗЕМЛИ",
    image: imgArticle6,
    preview: "Медитация под звуки гонга, бубна, диджериду и варгана",
    type: "НОВОСТИ",
    content: (
      <>
        <h2 className="text-2xl font-bold mb-4">ПУЛЬС ЗЕМЛИ</h2>
        <p className="mb-4">
          4 июня в Центре М'АРС прошла уникальная медитация «Пульс Земли». Участники погрузились в глубокое состояние гармонии и сосредоточенности под звуки древних музыкальных инструментов — гонга, бубна, диджериду и варганы.
        </p>
        <h3 className="text-xl font-semibold mb-2">Как проходила практика</h3>
        <p className="mb-4">
          В первой части ведущий познакомил гостей с традициями звукового исцеления. После этого началась медитация: каждый мог удобно устроиться и позволить вибрациям инструментов проникнуть в глубины сознания.
        </p>
        <h3 className="text-xl font-semibold mb-2">Впечатления участников</h3>
        <blockquote className="italic mb-2">«Потрясающее ощущение единения с собой и окружающим миром» — Алексей</blockquote>
        <blockquote className="italic mb-4">«Звук гонга буквально растворяет тревоги. Спасибо за опыт!» — Ксения</blockquote>
        <p>
          Приглашаем на следующие практики звукового и телесного исцеления в нашем центре!
        </p>
        <hr className="my-6" />
        <div className="text-sm text-gray-400">
          <p>Дата: 4 июня 2025</p>
          <p>Время: 20:00</p>
          <p>Место: Центр М'АРС, Москва</p>
        </div>
      </>
    )
  }
];

export default function MediaPage() {
  const { t } = useTranslation();
  const [openedArticle, setOpenedArticle] = useState(null);

  return (
    <section className="py-16 min-h-[60vh] flex flex-col items-center bg-[#0e1d3c] relative">
      <br></br>
      <br></br>
      <br></br>
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
              {openedArticle.content}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}