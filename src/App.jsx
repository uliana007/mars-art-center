import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";

// Новые страницы
import PosterPage from "./Pages/PosterPage";
import TicketsPage from "./Pages/TicketsPage";
import VisitorsPage from "./Pages/VisitorsPage";
import MediaPage from "./Pages/MediaPage";
import PartnersPage from "./Pages/PartnersPage";
import AboutPage from "./Pages/AboutPage";
import PhotoVideoPage from "./Pages/PhotoVideoPage";
import NotFoundPage from "./Pages/NotFoundPage";

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
    <Router>
      <Preloader loading={loading} />
      <div className={`min-h-screen font-sans ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"} flex flex-col`}>
        <Header theme={theme} setTheme={setTheme} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <AboutSection />
                <ProjectsSection />
              </>
            } />
            <Route path="/poster" element={<PosterPage />} />
            <Route path="/tickets" element={<TicketsPage />} />
            <Route path="/visitors" element={<VisitorsPage />} />
            <Route path="/media" element={<MediaPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/photo-video" element={<PhotoVideoPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}