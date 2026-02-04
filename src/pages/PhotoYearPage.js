import React, {useContext, useMemo} from "react";
import {Link, useParams} from "react-router-dom";
import "./PhotoYearPage.scss";
import {photoContent} from "../data/contentIndex";
import LanguageContext from "../contexts/LanguageContext";
import {formatDate, getText} from "../utils/i18n";

export default function PhotoYearPage() {
  const {year} = useParams();
  const {language} = useContext(LanguageContext);

  const photos = useMemo(() => {
    const allPhotos = [
      ...photoContent.urbanPhotos,
      ...photoContent.portraitPhotos,
      ...photoContent.naturePhotos
    ];
    return allPhotos.filter(photo => photo.captureDate?.startsWith(year));
  }, [year]);

  const copy = {
    title: {
      zh: `${year} 摄影精选`,
      en: `${year} Photo Highlights`
    },
    subtitle: {
      zh: "这一年的城市、人物与自然片段。",
      en: "A selection of urban, portrait, and nature moments from the year."
    },
    empty: {
      zh: "该年度影像正在整理中，敬请期待。",
      en: "This year's archive is being curated. Stay tuned."
    },
    back: {
      zh: "返回摄影档案",
      en: "Back to Photo Archive"
    }
  };

  return (
    <div className="page-container">
      <div className="page-hero photo-year-hero">
        <h1 className="page-title">{getText(copy.title, language)}</h1>
        <p className="page-subtitle">{getText(copy.subtitle, language)}</p>
        <Link to="/photos" className="photo-year-back">
          {getText(copy.back, language)}
        </Link>
      </div>

      {photos.length === 0 ? (
        <div className="photo-year-empty">
          <p>{getText(copy.empty, language)}</p>
        </div>
      ) : (
        <div className="photo-year-grid">
          {photos.map(photo => (
            <div className="photo-year-item" key={photo.id}>
              <img src={photo.url} alt={getText(photo.title, language)} />
              <div className="photo-year-meta">
                <h3>{getText(photo.title, language)}</h3>
                <p>{formatDate(photo.captureDate, language)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
