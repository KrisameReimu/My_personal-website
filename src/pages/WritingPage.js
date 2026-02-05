import React, {useContext, useState} from "react";
import WritingShowcase from "../containers/writingShowcase/WritingShowcase";
import {Link} from "react-router-dom";
import LanguageContext from "../contexts/LanguageContext";
import {getText} from "../utils/i18n";
import {writingContent} from "../data/contentIndex";
import "./WritingPage.scss";

export default function WritingPage() {
  const {language} = useContext(LanguageContext);
  const [activeTab, setActiveTab] = useState("latest");
  const copy = {
    tabs: {
      latest: {
        zh: "最新内容",
        en: "Latest"
      },
      years: {
        zh: "按年份",
        en: "By Year"
      }
    },
    explore: {
      zh: "进入该年度",
      en: "Explore Year"
    }
  };
  return (
    <div className="page-container">
      <div className="page-hero writing-hero">
        <h1 className="page-title">
          {getText(writingContent.config.sectionTitle, language)}
        </h1>
        <p className="page-subtitle">
          {getText(writingContent.config.subtitle, language)}
        </p>
      </div>
      <div className="archive-tabs">
        <button
          className={activeTab === "latest" ? "active" : ""}
          onClick={() => setActiveTab("latest")}
          type="button"
        >
          {getText(copy.tabs.latest, language)}
        </button>
        <button
          className={activeTab === "years" ? "active" : ""}
          onClick={() => setActiveTab("years")}
          type="button"
        >
          {getText(copy.tabs.years, language)}
        </button>
      </div>

      {activeTab === "latest" ? (
        <WritingShowcase />
      ) : (
        <div className="archive-grid">
          {writingContent.years.map(item => (
            <div className="archive-card" key={item.year}>
              <img src={item.coverImage} alt={getText(item.title, language)} />
              <div className="archive-content">
                <span className="archive-label">{item.year}</span>
                <h3>{getText(item.title, language)}</h3>
                <p>{getText(item.description, language)}</p>
                <Link to={`/writing/${item.year}`} className="archive-link">
                  {getText(copy.explore, language)} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
