import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <Preloader loading={loading} />
      <div className={`min-h-screen font-sans ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"} flex flex-col`}>
        <Header theme={theme} setTheme={setTheme} />
        <main className="flex-1">
          <Hero />
          <AboutSection />
          <ProjectsSection />
        </main>
        <Footer />
      </div>
    </>
  );
}