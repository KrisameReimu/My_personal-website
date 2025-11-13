import React, {useEffect, useState, useMemo} from "react";
import {useParams, Link} from "react-router-dom";
import {getArticleBySlug, getArticles} from "../services/contentAPI";
import DOMPurify from "dompurify";
import {marked} from "marked";
import "./ArticlePage.scss";

// Article detail page with bilingual toggle and markdown rendering.
// CMS future-proof: tries fields content_zh/content_en; falls back to excerpt.

const ArticlePage = () => {
  const {slug} = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lang, setLang] = useState("zh"); // 'zh' | 'en'
  const [siblings, setSiblings] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const item = await getArticleBySlug(slug);
        const all = await getArticles();
        if (mounted) {
          setArticle(item);
          setSiblings(all);
        }
      } catch (e) {
        if (mounted) setError(e.message || "Failed to load article");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [slug]);

  const currentIndex = useMemo(() => {
    if (!article || !siblings.length) return -1;
    return siblings.findIndex(
      a =>
        a.slug === slug || a.id === slug || (article.id && a.id === article.id)
    );
  }, [article, siblings, slug]);

  const prevArticle = currentIndex > 0 ? siblings[currentIndex - 1] : null;
  const nextArticle =
    currentIndex >= 0 && currentIndex < siblings.length - 1
      ? siblings[currentIndex + 1]
      : null;

  const safeHtml = useMemo(() => {
    if (!article) return "";
    const raw =
      (lang === "zh"
        ? article.content_zh || article.contentZh
        : article.content_en || article.contentEn) ||
      (lang === "zh"
        ? article.excerpt?.zh || article.excerpt_zh
        : article.excerpt?.en || article.excerpt_en) ||
      "";
    try {
      return DOMPurify.sanitize(marked.parse(raw));
    } catch {
      return DOMPurify.sanitize(raw);
    }
  }, [article, lang]);

  if (loading) return <div className="article-loading">Loading...</div>;
  if (error) return <div className="article-error">{error}</div>;
  if (!article) return <div className="article-empty">Article not found.</div>;

  const displayTitleZh =
    article.title_zh || article.title?.zh || article.titleZh;
  const displayTitleEn =
    article.title_en || article.title?.en || article.titleEn;

  return (
    <div className="article-page">
      <div className="article-header">
        <h1 className="article-title">
          {lang === "zh" ? displayTitleZh : displayTitleEn}
        </h1>
        <div className="article-meta">
          {article.publishedDate && (
            <span>
              <i className="far fa-calendar" /> {article.publishedDate}
            </span>
          )}
          {article.readingTime && (
            <span>
              <i className="far fa-clock" /> {article.readingTime} min
            </span>
          )}
          {article.category && (
            <span className="article-category">
              <i className="fas fa-tag" /> {article.category}
            </span>
          )}
        </div>
        <div className="lang-toggle" role="group" aria-label="Language toggle">
          <button
            onClick={() => setLang("zh")}
            className={lang === "zh" ? "active" : ""}
            aria-pressed={lang === "zh"}
          >
            中文
          </button>
          <button
            onClick={() => setLang("en")}
            className={lang === "en" ? "active" : ""}
            aria-pressed={lang === "en"}
          >
            EN
          </button>
        </div>
      </div>
      {article.coverImage && (
        <figure className="article-cover">
          <img
            src={article.coverImage}
            alt={displayTitleEn || displayTitleZh}
            loading="lazy"
          />
        </figure>
      )}
      <article
        className="article-body"
        dangerouslySetInnerHTML={{__html: safeHtml}}
      />
      {article.tags && article.tags.length > 0 && (
        <div className="article-tags" aria-label="Article tags">
          {article.tags.map((t, i) => (
            <span key={i} className="tag">
              #{t}
            </span>
          ))}
        </div>
      )}
      <nav className="article-nav" aria-label="Article navigation">
        {prevArticle && (
          <Link
            to={`/articles/${prevArticle.slug || prevArticle.id}`}
            className="prev-article"
          >
            ←{" "}
            {prevArticle.title?.zh ||
              prevArticle.title_zh ||
              prevArticle.titleZh}
          </Link>
        )}
        {nextArticle && (
          <Link
            to={`/articles/${nextArticle.slug || nextArticle.id}`}
            className="next-article"
          >
            {nextArticle.title?.zh ||
              nextArticle.title_zh ||
              nextArticle.titleZh}{" "}
            →
          </Link>
        )}
      </nav>
      <div className="back-link">
        <Link to="/writing">
          <i className="fas fa-arrow-left" /> 返回 Writing
        </Link>
      </div>
    </div>
  );
};

export default ArticlePage;
