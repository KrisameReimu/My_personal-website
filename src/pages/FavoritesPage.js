import React, {useContext} from "react";
import {Link} from "react-router-dom";
import CommunityContext from "../contexts/CommunityContext";
import LanguageContext from "../contexts/LanguageContext";
import {formatDate} from "../utils/i18n";
import "./FavoritesPage.scss";

export default function FavoritesPage() {
  const {language} = useContext(LanguageContext);
  const {favorites} = useContext(CommunityContext);

  const copy = {
    title: {zh: "我的收藏", en: "My Favorites"},
    empty: {zh: "还没有收藏内容。", en: "No favorites yet."},
    open: {zh: "打开", en: "Open"},
    savedAt: {zh: "收藏时间", en: "Saved"},
    subtitle: {
      zh: "你标记过的内容会在这里集中管理。",
      en: "Your saved items are managed here."
    }
  };

  return (
    <div className="favorites-page page-container">
      <div className="page-hero favorites-hero">
        <h1 className="page-title">{copy.title[language]}</h1>
        <p className="page-subtitle">{copy.subtitle[language]}</p>
      </div>
      <div className="favorites-list">
        {favorites.length === 0 && (
          <article className="favorite-item empty">
            <p>{copy.empty[language]}</p>
          </article>
        )}
        {favorites.map(item => (
          <article
            key={item.key}
            className={`favorite-item ${item.coverImage ? "" : "no-image"}`}
          >
            {item.coverImage ? (
              <img src={item.coverImage} alt={item.title} />
            ) : (
              <div className="favorite-placeholder">
                <i className="far fa-bookmark" aria-hidden="true"></i>
              </div>
            )}
            <div className="favorite-content">
              <h3>{item.title}</h3>
              <p>
                {copy.savedAt[language]}: {formatDate(item.savedAt, language)}
              </p>
              <Link to={item.url}>{copy.open[language]} →</Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
