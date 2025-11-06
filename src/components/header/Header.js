import React, {useContext} from "react";
import Headroom from "react-headroom";
import "./Header.scss";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import StyleContext from "../../contexts/StyleContext";
import {
  greeting,
  workExperiences,
  skillsSection,
  openSource,
  talkSection,
  achievementSection,
  resumeSection,
  gameDevSection,
  videoPortfolioSection,
  photographySection
} from "../../portfolio";
import { writingShowcaseSection } from "../../containers/writingShowcase/WritingShowcase";

function Header() {
  const {isDark} = useContext(StyleContext);
  const viewExperience = workExperiences.display;
  const viewOpenSource = openSource.display;
  const viewSkills = skillsSection.display;
  const viewAchievement = achievementSection.display;
  const viewWriting = writingShowcaseSection.display;
  const viewTalks = talkSection.display;
  const viewResume = resumeSection.display;
  const viewGameDev = gameDevSection.display;
  const viewVideoPortfolio = videoPortfolioSection.display;
  const viewPhotography = photographySection.display;

  return (
    <Headroom>
      <header className={isDark ? "dark-menu header" : "header"}>
        <a href="/" className="logo">
          <span className="grey-color"> &lt;</span>
          <span className="logo-name">{greeting.username}</span>
          <span className="grey-color">/&gt;</span>
        </a>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label
          className="menu-icon"
          htmlFor="menu-btn"
          style={{color: "white"}}
        >
          <span className={isDark ? "navicon navicon-dark" : "navicon"}></span>
        </label>
        <ul className={isDark ? "dark-menu menu" : "menu"}>
          {viewSkills && (
            <li>
              <a href="#skills">Skills</a>
            </li>
          )}
          {viewExperience && (
            <li>
              <a href="#experience">Experience</a>
            </li>
          )}
          {viewOpenSource && (
            <li>
              <a href="#opensource">Projects</a>
            </li>
          )}
          {viewGameDev && (
            <li>
              <a href="#game-showcase">Games</a>
            </li>
          )}
          {viewVideoPortfolio && (
            <li>
              <a href="#video-portfolio">Videos</a>
            </li>
          )}
          {viewPhotography && (
            <li>
              <a href="#photography">Photography</a>
            </li>
          )}
          {viewWriting && (
            <li>
              <a href="#writing">✍️ Writing</a>
            </li>
          )}
          {viewAchievement && (
            <li>
              <a href="#achievements">Achievements</a>
            </li>
          )}
          {viewResume && (
            <li>
              <a href="#resume">Resume</a>
            </li>
          )}
          <li>
            <a href="#contact">Contact</a>
          </li>
          <li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>
              <ToggleSwitch />
            </a>
          </li>
        </ul>
      </header>
    </Headroom>
  );
}
export default Header;
