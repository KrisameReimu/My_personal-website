import React, {useContext} from "react";
import GameDevShowcase from "../containers/gameDevShowcase/GameDevShowcase";
import Projects from "../containers/projects/Projects";
import Achievement from "../containers/achievement/Achievement";
import LanguageContext from "../contexts/LanguageContext";
import {getText} from "../utils/i18n";
import "./GameDevPage.scss";

export default function GameDevPage() {
  const {language} = useContext(LanguageContext);
  const copy = {
    title: {zh: "游戏开发", en: "Game Development"},
    subtitle: {
      zh: "从研究到交互体验的项目实践",
      en: "Projects from research to interactive experience"
    }
  };
  const relatedLabel = {
    zh: "相关项目",
    en: "Related Projects"
  };
  return (
    <div className="page-container">
      <div className="page-hero">
        <h1 className="page-title">{getText(copy.title, language)}</h1>
        <p className="page-subtitle">{getText(copy.subtitle, language)}</p>
      </div>
      <GameDevShowcase />
      <div className="related-section">
        <h2 className="section-title">{getText(relatedLabel, language)}</h2>
        <Projects />
      </div>
      <Achievement />
    </div>
  );
}
