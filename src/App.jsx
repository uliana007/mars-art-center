import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ReviewsSection from "./components/ReviewsSection";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";

export default function App() {
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <>
      <Preloader loading={loading} />
      <div className={`min-h-screen ${theme === "dark" ? "bg-[#121212] text-[#E0E0E0]" : "bg-white text-[#1A1A1A]"} flex flex-col`}>
        <Header theme={theme} setTheme={setTheme} />
        <main className="flex-1">
          <Hero />
          <AboutSection />
          <ProjectsSection />
          <ReviewsSection />
        </main>
        <Footer />
      </div>
    </>
  );
}