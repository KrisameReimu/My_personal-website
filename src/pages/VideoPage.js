import React, {useContext, useState} from "react";
import VideoPortfolio from "../containers/videoPortfolio/VideoPortfolio";
import Achievement from "../containers/achievement/Achievement";
import {Link} from "react-router-dom";
import LanguageContext from "../contexts/LanguageContext";
import {getText} from "../utils/i18n";
import {videoContent} from "../data/contentIndex";
import "./VideoPage.scss";

export default function VideoPage() {
  const {language} = useContext(LanguageContext);
  const [activeTab, setActiveTab] = useState("highlights");
  const copy = {
    tabs: {
      highlights: {
        zh: "精选作品",
        en: "Highlights"
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
      <div className="page-hero video-hero">
        <h1 className="page-title">
          {getText(videoContent.config.sectionTitle, language)}
        </h1>
        <p className="page-subtitle">
          {getText(videoContent.config.subtitle, language)}
        </p>
      </div>
      <div className="archive-tabs">
        <button
          className={activeTab === "highlights" ? "active" : ""}
          onClick={() => setActiveTab("highlights")}
          type="button"
        >
          {getText(copy.tabs.highlights, language)}
        </button>
        <button
          className={activeTab === "years" ? "active" : ""}
          onClick={() => setActiveTab("years")}
          type="button"
        >
          {getText(copy.tabs.years, language)}
        </button>
      </div>

      {activeTab === "highlights" ? (
        <>
          <VideoPortfolio />
          <div className="achievements-section">
            <Achievement />
          </div>
        </>
      ) : (
        <div className="archive-grid">
          {videoContent.years.map(item => (
            <div className="archive-card" key={item.year}>
              <img src={item.coverImage} alt={getText(item.title, language)} />
              <div className="archive-content">
                <span className="archive-label">{item.year}</span>
                <h3>{getText(item.title, language)}</h3>
                <p>{getText(item.description, language)}</p>
                <Link to={`/videos/${item.year}`} className="archive-link">
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
