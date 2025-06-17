import React, { useState } from "react";
import { db } from "../db_firebase/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useTranslation } from "react-i18next";

export default function FeedbackForm({ showPushNotification }) {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Подсчет количества слов для textarea
  const descriptionWords = description.trim().split(/\s+/).filter(Boolean).length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (descriptionWords > 80) {
      alert(i18n.language === "ru"
        ? "Описание не должно превышать 80 слов."
        : "Description should not exceed 80 words.");
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, "requests"), {
        name,
        phone,
        email,
        description,
        createdAt: Timestamp.now(),
      });
      setName("");
      setPhone("");
      setEmail("");
      setDescription("");
      const message =
        i18n.language === "ru"
          ? "Спасибо за заявку! Мы свяжемся с вами."
          : "Thank you for your request! We'll contact you soon.";
      alert(message);
      if (showPushNotification) showPushNotification(message);
    } catch (error) {
      alert(i18n.language === "ru"
        ? "Ошибка при отправке заявки. Попробуйте еще раз."
        : "Error submitting request. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full md:w-auto max-w-md">
      <div className="font-semibold mb-3">
        {i18n.language === "ru" ? "Оставьте заявку на ивент/выставку" : "Leave a request"}
      </div>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={i18n.language === "ru" ? "Ваше имя" : "Your name"}
          className="rounded w-full h-12 px-4 py-2 bg-white text-black placeholder-gray-400 outline-accent border border-gray-300"
          required
          style={{ backgroundColor: "white", color: "#000" }}
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="tel"
          placeholder={i18n.language === "ru" ? "Телефон" : "Phone"}
          className="rounded w-full h-12 px-4 py-2 bg-white text-black placeholder-gray-400 outline-accent border border-gray-300"
          required
          style={{ backgroundColor: "white", color: "#000" }}
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <input
          type="email"
          placeholder={i18n.language === "ru" ? "E-mail (необязательно)" : "E-mail (optional)"}
          className="rounded w-full h-12 px-4 py-2 bg-white text-black placeholder-gray-400 outline-accent border border-gray-300"
          style={{ backgroundColor: "white", color: "#000" }}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <textarea
          placeholder={i18n.language === "ru" ? "Описание (до 80 слов)" : "Description (up to 80 words)"}
          className="rounded w-full min-h-20 px-4 py-2 bg-white text-black placeholder-gray-400 outline-accent border border-gray-300"
          style={{ backgroundColor: "white", color: "#000" }}
          value={description}
          required
          onChange={e => {
            const words = e.target.value.split(/\s+/).filter(Boolean);
            if (words.length <= 80) {
              setDescription(e.target.value);
            } else {
              setDescription(words.slice(0, 80).join(" "));
            }
          }}
        />
        <span className="text-xs text-gray-500">
          {i18n.language === "ru"
            ? `Слов: ${descriptionWords}/80`
            : `Words: ${descriptionWords}/80`}
        </span>
        <button
          type="submit"
          disabled={loading}
          className="mt-2 px-6 py-2 bg-blue-600 text-white border-2 border-white rounded-full font-semibold hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading
            ? (i18n.language === "ru" ? "Отправка..." : "Sending...")
            : (i18n.language === "ru" ? "Отправить" : "Send")}
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
  );
}