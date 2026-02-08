import React, {useContext} from "react";
import {Link} from "react-router-dom";
import Headroom from "react-headroom";
import "./Header.scss";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import LanguageSwitch from "../LanguageSwitch/LanguageSwitch";
import StyleContext from "../../contexts/StyleContext";
import LanguageContext from "../../contexts/LanguageContext";
import {
  greeting,
  gameDevSection,
  videoPortfolioSection,
  photographySection
} from "../../portfolio";
import {writingShowcaseSection} from "../../containers/writingShowcase/WritingShowcase";

function Header() {
  const {isDark} = useContext(StyleContext);
  const {language} = useContext(LanguageContext);
  const viewGameDev = gameDevSection.display;
  const viewVideoPortfolio = videoPortfolioSection.display;
  const viewPhotography = photographySection.display;
  const viewWriting = writingShowcaseSection.display;
  const navLabels = {
    home: language === "zh" ? "首页" : "Home",
    gameDev: language === "zh" ? "游戏开发" : "Game Dev",
    videos: language === "zh" ? "视频作品" : "Videos",
    photography: language === "zh" ? "摄影" : "Photography",
    writing: language === "zh" ? "写作" : "Writing",
    about: language === "zh" ? "关于我" : "About",
    contact: language === "zh" ? "联系" : "Contact"
  };

  return (
    <Headroom>
      <header className={isDark ? "dark-menu header" : "header"}>
        <Link to="/" className="logo">
          <span className="grey-color"> &lt;</span>
          <span className="logo-name">{greeting.username}</span>
          <span className="grey-color">/&gt;</span>
        </Link>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label
          className="menu-icon"
          htmlFor="menu-btn"
          style={{color: "white"}}
        >
          <span className={isDark ? "navicon navicon-dark" : "navicon"}></span>
        </label>
        <ul className={isDark ? "dark-menu menu" : "menu"}>
          <li>
            <Link to="/">{navLabels.home}</Link>
          </li>
          {viewGameDev && (
            <li>
              <Link to="/game-dev">{navLabels.gameDev}</Link>
            </li>
          )}
          {viewVideoPortfolio && (
            <li>
              <Link to="/videos">{navLabels.videos}</Link>
            </li>
          )}
          {viewPhotography && (
            <li>
              <Link to="/photos">{navLabels.photography}</Link>
            </li>
          )}
          {viewWriting && (
            <li>
              <Link to="/writing">{navLabels.writing}</Link>
            </li>
          )}
          <li>
            <Link to="/about">{navLabels.about}</Link>
          </li>
          <li>
            <Link to="/contact">{navLabels.contact}</Link>
          </li>
          <li>
            <LanguageSwitch />
          </li>
          <li>
            <ToggleSwitch />
          </li>
        </ul>
      </header>
    </Headroom>
  );
}

export default Header;
