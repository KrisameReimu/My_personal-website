import React, {useState, useMemo, useContext} from "react";
import "./WritingShowcase.scss";
import {Fade} from "react-reveal";
import {writingContent} from "../../data/contentIndex";
import {getArticleUrl} from "../../config/assets";
import LanguageContext from "../../contexts/LanguageContext";
import {formatDate, getText} from "../../utils/i18n";

// Backwards compatibility export (legacy shape used elsewhere)
// Maps new data layer into previous "writingShowcaseSection" structure so existing imports won't break.
const writingShowcaseSection = {
  title: "✍️ Written Words",
  subtitle: "THOUGHTS, STORIES, AND INSIGHTS FROM MY JOURNEY",
  description:
    "Exploring the intersection of technology, creativity, and human experience through words.",
  categories: writingContent.categories.map(c => ({
    name: c.name.en || c.id,
    icon: "fas fa-book", // Unified icon; can specialize later
    color: c.color,
    description: c.description.en
  })),
  featuredArticles: writingContent.featuredArticles.map(a => ({
    title: a.title.zh, // Maintain bilingual emphasis (zh primary display here)
    subtitle: a.title.en,
    category:
      writingContent.categories.find(c => c.id === a.category)?.name.en ||
      a.category,
    date: a.publishedDate,
    readTime: `${a.readingTime} min read`,
    excerpt: a.excerpt.zh,
    image: a.coverImage,
    tags: a.tags,
    link: getArticleUrl(a.id)
  })),
  display: true
};

// Functional component refactor using hook-friendly state.
// Future enhancement: integrate useContent('article') to fetch from CMS when enabled.
const WritingShowcase = () => {
  const {language} = useContext(LanguageContext);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredArticle, setHoveredArticle] = useState(null);

  const copy = {
    title: writingContent.config.sectionTitle,
    subtitle: writingContent.config.subtitle,
    description: {
      zh: "探索技术、创意与人文的交汇，让文字成为理解世界的方式。",
      en: "Exploring the intersection of technology, creativity, and human experience through words."
    },
    allStories: {
      zh: "全部文章",
      en: "All Stories"
    },
    readArticle: {
      zh: "阅读文章",
      en: "Read Article"
    },
    continueReading: {
      zh: "继续阅读",
      en: "Continue Reading"
    },
    emptyState: {
      zh: "该分类暂时还没有文章，敬请期待。",
      en: "No articles yet for this category. Stay tuned."
    },
    ctaTitle: {
      zh: "想继续阅读？",
      en: "Want to read more?"
    },
    ctaSubtitle: {
      zh: "订阅获取最新文章与作品更新",
      en: "Subscribe to get notified about new articles and stories"
    },
    ctaButton: {
      zh: "订阅更新",
      en: "Subscribe to Newsletter"
    }
  };

  const getCategoryName = category => getText(category.name, language);

  const filteredWithCategories = useMemo(() => {
    if (selectedCategory === "all") return writingContent.featuredArticles;
    return writingContent.featuredArticles.filter(
      article => article.category === selectedCategory
    );
  }, [selectedCategory]);

  if (!writingShowcaseSection.display) return null;

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main writing-showcase" id="writing">
        <div className="writing-container">
          {/* Header Section */}
          <div className="writing-header">
            <h1 className="writing-heading">{getText(copy.title, language)}</h1>
            <p className="subTitle writing-subtitle">
              {getText(copy.subtitle, language)}
            </p>
            <p className="writing-description">
              {getText(copy.description, language)}
            </p>
          </div>

          {/* Category Pills */}
          <div className="category-filter">
            <button
              className={`category-pill ${
                selectedCategory === "all" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("all")}
            >
              <i className="fas fa-th"></i> {getText(copy.allStories, language)}
            </button>
            {writingContent.categories.map((category, index) => (
              <button
                key={index}
                className={`category-pill ${
                  selectedCategory === category.id ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
                style={
                  selectedCategory === category.id
                    ? {
                        backgroundColor: category.color,
                        color: "white"
                      }
                    : {}
                }
              >
                <i className="fas fa-book"></i> {getCategoryName(category)}
              </button>
            ))}
          </div>

          {/* Featured Articles Grid */}
          <div className="articles-grid">
            {filteredWithCategories.length === 0 && (
              <div className="empty-state">
                <p>{getText(copy.emptyState, language)} ✨</p>
              </div>
            )}
            {filteredWithCategories.map((article, index) => (
              <Fade key={index} bottom duration={1500} distance="40px">
                <div
                  className={`article-card ${
                    hoveredArticle === index ? "hovered" : ""
                  }`}
                  onMouseEnter={() => setHoveredArticle(index)}
                  onMouseLeave={() => setHoveredArticle(null)}
                >
                  <div className="article-image-container">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="article-image"
                      loading="lazy"
                    />
                    <div className="article-overlay">
                      <span className="read-more-btn">
                        <i className="fas fa-book-open"></i>{" "}
                        {getText(copy.readArticle, language)}
                      </span>
                    </div>
                  </div>

                  <div className="article-content">
                    <div className="article-meta">
                      <span className="article-category">
                        {getCategoryName(
                          writingContent.categories.find(
                            c => c.id === article.category
                          )
                        )}
                      </span>
                      <span className="article-date">
                        <i className="far fa-calendar"></i>{" "}
                        {formatDate(article.publishedDate, language)}
                      </span>
                      <span className="article-read-time">
                        <i className="far fa-clock"></i> {article.readingTime}{" "}
                        min
                      </span>
                    </div>

                    <h3 className="article-title">
                      {getText(article.title, language)}
                    </h3>

                    <p className="article-excerpt">
                      {getText(article.excerpt, language)}
                    </p>

                    <div className="article-tags">
                      {article.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="article-tag">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={getArticleUrl(article.id)}
                      className="article-link"
                    >
                      {getText(copy.continueReading, language)}{" "}
                      <i className="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </Fade>
            ))}
          </div>

          {/* Call to Action */}
          <div className="writing-cta">
            <Fade bottom duration={1500}>
              <h3>{getText(copy.ctaTitle, language)}</h3>
              <p>{getText(copy.ctaSubtitle, language)}</p>
              <button className="subscribe-btn">
                <i className="fas fa-envelope"></i>{" "}
                {getText(copy.ctaButton, language)}
              </button>
            </Fade>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default WritingShowcase;
export {writingShowcaseSection};
