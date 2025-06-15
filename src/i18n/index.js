import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ru from "./ru.json";
import en from "./en.json";

// Автоматическое определение языка браузера
const getDefaultLang = () => {
  const lang = localStorage.getItem("i18nextLng") || navigator.language || navigator.userLanguage;
  if (lang.startsWith("ru")) return "ru";
  if (lang.startsWith("en")) return "en";
  return "ru";
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ru: { translation: ru },
      en: { translation: en },
    },
    lng: getDefaultLang(),
    fallbackLng: "ru",
    interpolation: { escapeValue: false },
  });

export default i18n;


