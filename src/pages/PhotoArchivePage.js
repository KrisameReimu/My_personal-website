import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import "./PhotoArchivePage.scss";
import {photoContent} from "../data/contentIndex";
import LanguageContext from "../contexts/LanguageContext";
import {getText} from "../utils/i18n";
import Photography from "../containers/photography/Photography";

export default function PhotoArchivePage() {
  const {language} = useContext(LanguageContext);
  const [activeTab, setActiveTab] = useState("years");
  const copy = {
    title: {
      zh: "摄影档案",
      en: "Photo Archive"
    },
    subtitle: {
      zh: "按年份整理的影像故事，呈现我的城市、人像与自然记录。",
      en: "A year-by-year visual story across urban, portrait, and nature themes."
    },
    tabs: {
      years: {
        zh: "年度精选",
        en: "Year Highlights"
      },
      collections: {
        zh: "分类合集",
        en: "Collections"
      }
    },
    explore: {
      zh: "进入该年度",
      en: "Explore Year"
    }
  };

  return (
    <div className="page-container">
      <div className="page-hero photo-archive-hero">
        <h1 className="page-title">{getText(copy.title, language)}</h1>
        <p className="page-subtitle">{getText(copy.subtitle, language)}</p>
      </div>

      <div className="photo-archive-tabs">
        <button
          className={activeTab === "years" ? "active" : ""}
          onClick={() => setActiveTab("years")}
          type="button"
        >
          {getText(copy.tabs.years, language)}
        </button>
        <button
          className={activeTab === "collections" ? "active" : ""}
          onClick={() => setActiveTab("collections")}
          type="button"
        >
          {getText(copy.tabs.collections, language)}
        </button>
      </div>

      {activeTab === "years" ? (
        <div className="photo-archive-grid">
          {photoContent.years.map(yearItem => (
            <div className="photo-year-card" key={yearItem.year}>
              <img
                src={yearItem.coverImage}
                alt={getText(yearItem.title, language)}
              />
              <div className="photo-year-content">
                <span className="photo-year-label">{yearItem.year}</span>
                <h3>{getText(yearItem.title, language)}</h3>
                <p>{getText(yearItem.description, language)}</p>
                <Link
                  to={`/photos/${yearItem.year}`}
                  className="photo-year-link"
                >
                  {getText(copy.explore, language)} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="photo-archive-collections">
          <Photography />
        </div>
      )}
    </div>
  );
}
