import React, {useContext, useEffect, useMemo, useState} from "react";
import {Link, useParams} from "react-router-dom";
import "./WritingYearPage.scss";
import {getArticles} from "../services/contentAPI";
import LanguageContext from "../contexts/LanguageContext";
import {formatDate, getText} from "../utils/i18n";

export default function WritingYearPage() {
  const {year} = useParams();
  const {language} = useContext(LanguageContext);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const filtered = useMemo(() => {
    return articles.filter(article => article.publishedDate?.startsWith(year));
  }, [articles, year]);

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
    loading: {
      zh: "加载中...",
      en: "Loading..."
    },
    back: {
      zh: "返回写作主页",
      en: "Back to Writing"
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setIsLoading(true);
        const all = await getArticles();
        if (mounted) setArticles(all || []);
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="page-container">
      <div className="page-hero writing-year-hero">
        <h1 className="page-title">{getText(copy.title, language)}</h1>
        <p className="page-subtitle">{getText(copy.subtitle, language)}</p>
        <Link to="/writing" className="writing-year-back">
          {getText(copy.back, language)}
        </Link>
      </div>

      {isLoading ? (
        <div className="writing-year-empty">
          <p>{getText(copy.loading, language)}</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="writing-year-empty">
          <p>{getText(copy.empty, language)}</p>
        </div>
      ) : (
        <div className="writing-year-grid">
          {filtered.map(article => (
            <div className="writing-year-card" key={article.id}>
              <h3>
                <Link to={`/articles/${article.id}`}>
                  {getText(article.title, language)}
                </Link>
              </h3>
              <p>{getText(article.excerpt, language)}</p>
              <span>{formatDate(article.publishedDate, language)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
