import React, {useContext, useMemo} from "react";
import {Link, useParams} from "react-router-dom";
import "./WritingYearPage.scss";
import {writingContent} from "../data/contentIndex";
import LanguageContext from "../contexts/LanguageContext";
import {formatDate, getText} from "../utils/i18n";

export default function WritingYearPage() {
  const {year} = useParams();
  const {language} = useContext(LanguageContext);

  const filtered = useMemo(() => {
    return writingContent.articles.filter(article =>
      article.publishedDate?.startsWith(year)
    );
  }, [year]);

  const copy = {
    title: {
      zh: `${year} 写作精选`,
      en: `${year} Writing Highlights`
    },
    subtitle: {
      zh: "这一年的思考、记录与技术观察。",
      en: "Essays, reflections, and technical notes from the year."
    },
    empty: {
      zh: "该年度文章正在整理中，敬请期待。",
      en: "This year's writing archive is being curated."
    },
    back: {
      zh: "返回写作主页",
      en: "Back to Writing"
    }
  };

  return (
    <div className="page-container">
      <div className="page-hero writing-year-hero">
        <h1 className="page-title">{getText(copy.title, language)}</h1>
        <p className="page-subtitle">{getText(copy.subtitle, language)}</p>
        <Link to="/writing" className="writing-year-back">
          {getText(copy.back, language)}
        </Link>
      </div>

      {filtered.length === 0 ? (
        <div className="writing-year-empty">
          <p>{getText(copy.empty, language)}</p>
        </div>
      ) : (
        <div className="writing-year-grid">
          {filtered.map(article => (
            <div className="writing-year-card" key={article.id}>
              <h3>{getText(article.title, language)}</h3>
              <p>{getText(article.excerpt, language)}</p>
              <span>{formatDate(article.publishedDate, language)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
