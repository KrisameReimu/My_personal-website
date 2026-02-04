import React, {useContext, useMemo, useState} from "react";
import {Link} from "react-router-dom";
import "./AskEcho.scss";
import LanguageContext from "../../contexts/LanguageContext";
import {getText} from "../../utils/i18n";
import {
  writingContent,
  videoContent,
  photoContent
} from "../../data/contentIndex";
import {projects as gameProjects} from "../../data/gamedev";

const normalize = value =>
  value
    .toLowerCase()
    .replace(/[\s\-_/]+/g, " ")
    .trim();

const AskEcho = () => {
  const {language} = useContext(LanguageContext);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const copy = {
    button: {zh: "Ask Echo", en: "Ask Echo"},
    title: {zh: "Ask Echo", en: "Ask Echo"},
    subtitle: {
      zh: "搜索我的文章、影像与项目",
      en: "Search my writing, visuals, and projects"
    },
    placeholder: {
      zh: "输入关键词，例如 AI、摄影、纪录片…",
      en: "Search keywords like AI, photography, documentary..."
    },
    empty: {
      zh: "暂时没有匹配结果。",
      en: "No results yet."
    },
    close: {zh: "关闭", en: "Close"},
    viewAll: {zh: "查看全部", en: "View All"},
    sections: {
      writing: {zh: "写作", en: "Writing"},
      video: {zh: "影像", en: "Video"},
      photo: {zh: "摄影", en: "Photography"},
      game: {zh: "游戏", en: "Game Dev"}
    }
  };

  const items = useMemo(() => {
    const writingItems = writingContent.articles.map(article => ({
      id: article.id,
      type: "writing",
      title: getText(article.title, language),
      description: getText(article.excerpt, language),
      link: `/articles/${article.id}`,
      tags: article.tags || []
    }));

    const videoItems = videoContent.videos.map(video => ({
      id: video.id,
      type: "video",
      title: getText(video.title, language),
      description: getText(video.description, language),
      link: "/videos",
      tags: video.tags || []
    }));

    const photoItems = [
      ...photoContent.urbanPhotos,
      ...photoContent.portraitPhotos,
      ...photoContent.naturePhotos
    ].map(photo => ({
      id: photo.id,
      type: "photo",
      title: getText(photo.title, language),
      description: getText(photo.description, language),
      link: "/photos",
      tags: photo.tags || []
    }));

    const gameItems = gameProjects.map(project => ({
      id: project.id,
      type: "game",
      title: getText(project.title, language),
      description: getText(project.description, language),
      link: "/game-dev",
      tags: project.technologies || []
    }));

    return [...writingItems, ...videoItems, ...photoItems, ...gameItems];
  }, [language]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const needle = normalize(query);
    return items
      .map(item => {
        const haystack = normalize(
          `${item.title} ${item.description} ${(item.tags || []).join(" ")}`
        );
        const score = haystack.includes(needle) ? needle.length : 0;
        return {...item, score};
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }, [items, query]);

  return (
    <>
      <button
        className="ask-echo-fab"
        type="button"
        onClick={() => setOpen(true)}
        aria-label={getText(copy.button, language)}
      >
        <span>{getText(copy.button, language)}</span>
        <i className="fas fa-star" aria-hidden="true"></i>
      </button>

      {open && (
        <div className="ask-echo-overlay" onClick={() => setOpen(false)}>
          <div
            className="ask-echo-panel"
            onClick={event => event.stopPropagation()}
          >
            <div className="ask-echo-header">
              <div>
                <h2>{getText(copy.title, language)}</h2>
                <p>{getText(copy.subtitle, language)}</p>
              </div>
              <button
                className="ask-echo-close"
                type="button"
                onClick={() => setOpen(false)}
              >
                {getText(copy.close, language)}
              </button>
            </div>

            <div className="ask-echo-input">
              <i className="fas fa-search" aria-hidden="true"></i>
              <input
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder={getText(copy.placeholder, language)}
              />
            </div>

            <div className="ask-echo-results">
              {query.trim() && results.length === 0 && (
                <p className="ask-echo-empty">
                  {getText(copy.empty, language)}
                </p>
              )}
              {results.map(item => (
                <Link
                  to={item.link}
                  key={`${item.type}-${item.id}`}
                  className="ask-echo-result"
                  onClick={() => setOpen(false)}
                >
                  <span className={`result-tag ${item.type}`}>
                    {getText(copy.sections[item.type], language)}
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="ask-echo-footer">
              <Link to="/writing" onClick={() => setOpen(false)}>
                {getText(copy.sections.writing, language)} ·{" "}
                {getText(copy.viewAll, language)}
              </Link>
              <Link to="/videos" onClick={() => setOpen(false)}>
                {getText(copy.sections.video, language)} ·{" "}
                {getText(copy.viewAll, language)}
              </Link>
              <Link to="/photos" onClick={() => setOpen(false)}>
                {getText(copy.sections.photo, language)} ·{" "}
                {getText(copy.viewAll, language)}
              </Link>
              <Link to="/game-dev" onClick={() => setOpen(false)}>
                {getText(copy.sections.game, language)} ·{" "}
                {getText(copy.viewAll, language)}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AskEcho;
