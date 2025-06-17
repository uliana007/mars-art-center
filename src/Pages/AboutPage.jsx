import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import aboutVideo from "../assets/video/video-2.mp4"; // 🎬 локальное видео

export default function AboutPage() {
  const { t } = useTranslation();
  const videoRef = useRef(null);

  return (
    <section className="py-16 min-h-[60vh] flex flex-col items-center bg-[#f1f7fc] dark:bg-[#0a0c46] transition-colors duration-300">
      <br />
      <br />
      <br />
      <h1 className="text-4xl font-bold mb-10 text-[#191970] dark:text-white font-mont text-center">
        {t("about.title")}
      </h1>
      <div className="max-w-3xl w-full mx-auto text-left px-4">
        <p className="text-lg text-[#222] dark:text-gray-200 font-semibold mb-4">
          <span className="font-bold">{t("about.name")}</span> {t("about.desc1")}
        </p>
        <p className="text-base text-[#333] dark:text-gray-300 mb-3">{t("about.desc2")}</p>
        <p className="text-base text-[#333] dark:text-gray-300 mb-3">{t("about.desc3")}</p>
        <p className="text-base text-[#333] dark:text-gray-300 mb-7">{t("about.desc4")}</p>

        <div className="w-full max-w-xl aspect-video rounded-lg shadow-lg overflow-hidden mx-auto">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            controls
            className="w-full h-full object-cover rounded-lg"
            style={{ minHeight: 320, background: "#191919" }}
          >
            <source src={aboutVideo} type="video/mp4" />
            {t("about.videoUnsupported")}
          </video>
        </div>
      </div>
    </section>
  );
}
