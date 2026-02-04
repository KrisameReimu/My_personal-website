import React, {useContext, useMemo} from "react";
import {Link, useParams} from "react-router-dom";
import "./VideoYearPage.scss";
import {videoContent} from "../data/contentIndex";
import LanguageContext from "../contexts/LanguageContext";
import {formatDate, getText} from "../utils/i18n";

export default function VideoYearPage() {
  const {year} = useParams();
  const {language} = useContext(LanguageContext);

  const filtered = useMemo(() => {
    return videoContent.videos.filter(video =>
      video.publishedDate?.startsWith(year)
    );
  }, [year]);

  const copy = {
    title: {
      zh: `${year} 影像精选`,
      en: `${year} Video Highlights`
    },
    subtitle: {
      zh: "这一年的影像作品与视觉实验。",
      en: "A selection of visual works and experiments from the year."
    },
    empty: {
      zh: "该年度影像正在整理中，敬请期待。",
      en: "This year's video archive is being curated."
    },
    back: {
      zh: "返回影像主页",
      en: "Back to Videos"
    }
  };

  return (
    <div className="page-container">
      <div className="page-hero video-year-hero">
        <h1 className="page-title">{getText(copy.title, language)}</h1>
        <p className="page-subtitle">{getText(copy.subtitle, language)}</p>
        <Link to="/videos" className="video-year-back">
          {getText(copy.back, language)}
        </Link>
      </div>

      {filtered.length === 0 ? (
        <div className="video-year-empty">
          <p>{getText(copy.empty, language)}</p>
        </div>
      ) : (
        <div className="video-year-grid">
          {filtered.map(video => (
            <div className="video-year-card" key={video.id}>
              <img
                src={video.thumbnailUrl}
                alt={getText(video.title, language)}
              />
              <div className="video-year-meta">
                <h3>{getText(video.title, language)}</h3>
                <p>{formatDate(video.publishedDate, language)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
