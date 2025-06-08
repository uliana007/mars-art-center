import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function EventCard({ event, onClick }) {
  const { t, i18n } = useTranslation();
  return (
    <motion.div
      className="w-[300px] bg-[#F5F5F5] dark:bg-[#1E1E1E] rounded-xl shadow-lg p-4 flex flex-col cursor-pointer transition-transform hover:scale-105 hover:shadow-2xl relative"
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
      tabIndex={0}
      aria-label={event[`title_${i18n.language}`]}
    >
      <div className="w-full h-[200px] overflow-hidden rounded-lg mb-3 relative">
        <img
          src={event.image}
          alt={event[`title_${i18n.language}`]}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-accent dark:bg-[#3399FF] text-white">
          {event.badge}
        </span>
      </div>
      <h3 className="text-lg font-bold mb-2">{event[`title_${i18n.language}`]}</h3>
      <p className="text-[#555] dark:text-[#BBB] line-clamp-3 mb-4">{event[`desc_${i18n.language}`]}</p>
      <button
        className="px-4 py-2 rounded bg-accent dark:bg-[#3399FF] text-white uppercase text-xs font-semibold shadow hover:bg-[#0048CC] dark:hover:bg-[#2288EE] transition-all ripple"
        onClick={e => { e.stopPropagation(); onClick?.(event); }}
      >
        {t("event.more")}
      </button>
    </motion.div>
  );
}