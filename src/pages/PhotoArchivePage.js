import React, {useContext, useMemo, useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./PhotoArchivePage.scss";
import LanguageContext from "../contexts/LanguageContext";
import {formatDate, getText} from "../utils/i18n";
import Photography from "../containers/photography/Photography";
import {getPhotos} from "../services/contentAPI";

export default function PhotoArchivePage() {
  const {language} = useContext(LanguageContext);
  const [activeTab, setActiveTab] = useState("years");
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const allPhotos = await getPhotos();
      if (mounted) setPhotos(allPhotos || []);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const yearHighlights = useMemo(() => {
    const byYear = new Map();
    photos.forEach(photo => {
      const year = (photo.captureDate || "").slice(0, 4);
      if (!year) return;
      const existing = byYear.get(year);
      if (!existing) {
        byYear.set(year, {
          year,
          count: 1,
          latestDate: photo.captureDate,
          coverImage: photo.thumbnail || photo.url
        });
        return;
      }
      existing.count += 1;
      if (
        new Date(photo.captureDate).getTime() >
        new Date(existing.latestDate).getTime()
      ) {
        existing.latestDate = photo.captureDate;
        existing.coverImage = photo.thumbnail || photo.url;
      }
    });
    return Array.from(byYear.values()).sort(
      (a, b) => Number(b.year) - Number(a.year)
    );
  }, [photos]);

  const copy = {
    title: {zh: "摄影档案", en: "Photo Archive"},
    subtitle: {
      zh: "按年份整理的影像故事，呈现城市、人像与自然记录。",
      en: "Year-by-year visual stories across urban, portrait, and nature themes."
    },
    tabs: {
      years: {zh: "年度精选", en: "Year Highlights"},
      collections: {zh: "分类合集", en: "Collections"}
    },
    explore: {zh: "进入该年度", en: "Explore Year"},
    count: {zh: "张作品", en: "photos"},
    latest: {zh: "最近拍摄", en: "Latest"},
    empty: {zh: "暂无年度影像，整理中。", en: "No yearly photos yet."}
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
          {yearHighlights.length === 0 && (
            <div className="photo-year-card">
              <div className="photo-year-content">
                <p>{getText(copy.empty, language)}</p>
              </div>
            </div>
          )}
          {yearHighlights.map(yearItem => (
            <div className="photo-year-card" key={yearItem.year}>
              <img src={yearItem.coverImage} alt={yearItem.year} />
              <div className="photo-year-content">
                <span className="photo-year-label">{yearItem.year}</span>
                <h3>
                  {yearItem.count} {getText(copy.count, language)}
                </h3>
                <p>
                  {getText(copy.latest, language)}:{" "}
                  {formatDate(yearItem.latestDate, language)}
                </p>
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
