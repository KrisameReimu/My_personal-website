import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ScrollToTop from "../components/ScrollToTop";
import ScrollToTopButton from "./topbutton/Top";
import SplashScreen from "./splashScreen/SplashScreen";
import HomePage from "../pages/HomePage";
import GameDevPage from "../pages/GameDevPage";
import VideoPage from "../pages/VideoPage";
import PhotographyPage from "../pages/PhotographyPage";
import WritingPage from "../pages/WritingPage";
import AboutPage from "../pages/AboutPage";
import Contact from "./contact/Contact";
import {splashScreen} from "../portfolio";
import {StyleProvider} from "../contexts/StyleContext";
import {useLocalStorage} from "../hooks/useLocalStorage";
import "./Main.scss";

const Main = () => {
  const darkPref = window.matchMedia("(prefers-color-scheme: dark)");
  const [isDark, setIsDark] = useLocalStorage("isDark", darkPref.matches);
  const [isShowingSplashAnimation, setIsShowingSplashAnimation] =
    useState(true);

  useEffect(() => {
    if (splashScreen.enabled) {
      const splashTimer = setTimeout(
        () => setIsShowingSplashAnimation(false),
        splashScreen.duration
      );
      return () => {
        clearTimeout(splashTimer);
      };
    }
  }, []);

  const changeTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={isDark ? "dark-mode" : null}>
      <StyleProvider value={{isDark: isDark, changeTheme: changeTheme}}>
        {isShowingSplashAnimation && splashScreen.enabled ? (
          <SplashScreen />
        ) : (
          <Router>
            <ScrollToTop />
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/game-dev" element={<GameDevPage />} />
              <Route path="/videos" element={<VideoPage />} />
              <Route path="/photography" element={<PhotographyPage />} />
              <Route path="/writing" element={<WritingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
            <Footer />
            <ScrollToTopButton />
          </Router>
        )}
      </StyleProvider>
    </div>
  );
};

export default Main;
