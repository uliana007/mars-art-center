import React from "react";
import { useTranslation } from "react-i18next";
import iconMars from "../assets/image/icon-mars.png";

export default function Footer() {
  const { t, i18n } = useTranslation();

  // Пуш-уведомление
  function showPushNotification(message) {
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification(message);
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            new Notification(message);
          }
        });
      }
    }
  }

  return (
    <footer
      id="footer"
      className="bg-primary text-dark dark:text-white pt-14 pb-8 relative z-10"
    >
      {/* Белая разделяющая полоса сверху */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-white" style={{zIndex: 20}} />
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between gap-8 border-b border-white/10 pb-8 mb-8">
          {/* Контакты */}
          <div>
            <a
              href="/"
              className="flex items-center gap-2 font-bold text-xl uppercase tracking-widest mb-3"
            >
              <img
                src={iconMars}
                alt="M’ARS"
                className="h-12 w-12 z-30 relative transition-all duration-300 border-2 border-black"
              />
              {i18n.language === "ru" ? "Центр Mars" : "Mars Center"}
            </a>
            <div className="text-gray-600 dark:text-gray-200 mb-2">
              <span>
                {i18n.language === "ru"
                  ? "Digital-агентство полного цикла"
                  : "Full cycle digital agency"}
              </span>
            </div>
            <div className="text-gray-500 dark:text-gray-300 text-sm">
              {t("footer.copyright")}
            </div>
          </div>
          {/* Форма обратной связи */}
          <div className="w-full md:w-auto max-w-md">
            <div className="font-semibold mb-3">
              {i18n.language === "ru" ? "Оставьте заявку на ивент/выставку" : "Leave a request"}
            </div>
            <form
              className="flex flex-col gap-3"
              onSubmit={e => {
                e.preventDefault();
                const message =
                  i18n.language === "ru"
                    ? "Спасибо за заявку! Мы свяжемся с вами."
                    : "Thank you for your request! We'll contact you soon.";
                alert(message);
                showPushNotification(message);
              }}
            >
              <input
                type="text"
                placeholder={i18n.language === "ru" ? "Ваше имя" : "Your name"}
                className="rounded w-full h-12 px-4 py-2 bg-white text-black placeholder-gray-400 outline-accent border border-gray-300"
                required
                style={{
                  backgroundColor: "white",
                  color: "#000"
                }}
              />
              <input
                type="tel"
                placeholder={i18n.language === "ru" ? "Телефон" : "Phone"}
                className="rounded w-full h-12 px-4 py-2 bg-white text-black placeholder-gray-400 outline-accent border border-gray-300"
                required
                style={{
                  backgroundColor: "white",
                  color: "#000"
                }}
              />
              <input
                type="email"
                placeholder={
                  i18n.language === "ru"
                    ? "E-mail (необязательно)"
                    : "E-mail (optional)"
                }
                className="rounded w-full h-12 px-4 py-2 bg-white text-black placeholder-gray-400 outline-accent border border-gray-300"
                style={{
                  backgroundColor: "white",
                  color: "#000"
                }}
              />
              <button
                type="submit"
                className="mt-2 px-6 py-2 bg-blue-600 text-white border-2 border-white rounded-full font-semibold hover:bg-blue-700 transition"
              >
                {i18n.language === "ru" ? "Отправить" : "Send"}
              </button>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {i18n.language === "ru"
                  ? (
                    <>Нажимая «Отправить», вы соглашаетесь с <a href="#" className="underline hover:text-accent">политикой конфиденциальности</a>.</>
                  )
                  : (
                    <>By clicking "Send", you agree with our <a href="#" className="underline hover:text-accent">privacy policy</a>.</>
                  )}
              </span>
            </form>
          </div>
          {/* Контактная информация */}
          <div>
            <div className="font-semibold mb-3">{t("footer.contacts")}</div>
            <div className="mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-accent inline" fill="none" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h2.28a2 2 0 011.7.95l1.54 2.6a2 2 0 01-.24 2.32l-1.27 1.53a16.06 16.06 0 006.58 6.58l1.53-1.27a2 2 0 012.32-.24l2.6 1.54a2 2 0 01.95 1.7V19a2 2 0 01-2 2h-1C8.06 21 3 15.94 3 9V5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
              <a href="tel:+79991234567" className="hover:underline">
                +7 999 123-45-67
              </a>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-accent inline" fill="none" viewBox="0 0 24 24"><path d="M4 4h16v16H4V4zm0 0l8 8 8-8" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
              <a href="mailto:info@centermars.ru" className="hover:underline">
                {t("footer.email")}
              </a>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-accent inline" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M16 8c0 1.656-1.343 3-3 3-1.656 0-3-1.344-3-3s1.344-3 3-3c1.657 0 3 1.344 3 3zm-3 3v5"></path></svg>
              <span>{t("footer.address")}</span>
            </div>
            <div className="flex gap-3 mt-3">
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-accent" aria-label="VK">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.488 2 12.023c0 4.986 3.657 9.12 8.438 9.876.617.114.844-.267.844-.595 0-.292-.01-1.067-.016-2.094-3.338.726-4.042-1.608-4.042-1.608-.562-1.437-1.375-1.82-1.375-1.82-1.125-.771.084-.756.084-.756 1.25.087 1.906 1.285 1.906 1.285 1.106 1.902 2.901 1.352 3.609 1.035.112-.805.434-1.353.79-1.664-2.665-.304-5.467-1.334-5.467-5.932 0-1.312.469-2.384 1.235-3.224-.123-.304-.535-1.526.117-3.181 0 0 1.007-.323 3.3 1.23a11.397 11.397 0 013.003-.403c1.019.005 2.047.138 3.004.404 2.292-1.553 3.297-1.23 3.297-1.23.654 1.655.242 2.877.119 3.181.77.84 1.234 1.912 1.234 3.224 0 4.61-2.807 5.625-5.479 5.921.447.385.845 1.146.845 2.31 0 1.668-.015 3.016-.015 3.426 0 .33.224.713.85.592C18.345 21.14 22 17.007 22 12.023 22 6.488 17.523 2 12 2z"/>
                </svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-accent" aria-label="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="5"/>
                  <circle cx="17.5" cy="6.5" r="1.5"/>
                </svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-accent" aria-label="Telegram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21.43 3.58c-.29-.23-.68-.19-.92 0L2.36 12.47c-.29.19-.33.53-.08.74l3.85 3.4c.23.19.57.18.79-.03l2.69-2.53 3.46 3.01c.29.25.8.19.97-.17l6.02-13.13c.1-.21.06-.46-.15-.61z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        {/* Можно добавить дополнительную строку, если потребуется */}
      </div>
    </footer>
  );
}