import React, { useState, useMemo } from "react";
import "./WritingShowcase.scss";
import { Fade } from "react-reveal";
import { featuredArticles, categories } from "../../data/writings";
import { getArticleUrl } from "../../config/assets";

// Backwards compatibility export (legacy shape used elsewhere)
// Maps new data layer into previous "writingShowcaseSection" structure so existing imports won't break.
const writingShowcaseSection = {
  title: "✍️ Written Words",
  subtitle: "THOUGHTS, STORIES, AND INSIGHTS FROM MY JOURNEY",
  description: "Exploring the intersection of technology, creativity, and human experience through words.",
  categories: categories.map(c => ({
    name: c.name.en || c.id,
    icon: "fas fa-book", // Unified icon; can specialize later
    color: c.color,
    description: c.description.en
  })),
  featuredArticles: featuredArticles.map(a => ({
    title: a.title.zh, // Maintain bilingual emphasis (zh primary display here)
    subtitle: a.title.en,
    category: categories.find(c => c.id === a.category)?.name.en || a.category,
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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredArticle, setHoveredArticle] = useState(null);

  // Memoize filtered articles to avoid unnecessary re-renders.
  const filteredArticles = useMemo(() => {
    if (selectedCategory === "All") return writingShowcaseSection.featuredArticles;
    return writingShowcaseSection.featuredArticles.filter(
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
            <h1 className="writing-heading">{writingShowcaseSection.title}</h1>
            <p className="subTitle writing-subtitle">
              {writingShowcaseSection.subtitle}
            </p>
            <p className="writing-description">
              {writingShowcaseSection.description}
            </p>
          </div>

          {/* Category Pills */}
          <div className="category-filter">
            <button
              className={`category-pill ${selectedCategory === "All" ? "active" : ""}`}
              onClick={() => setSelectedCategory("All")}
            >
              <i className="fas fa-th"></i> All Stories
            </button>
            {writingShowcaseSection.categories.map((category, index) => (
              <button
                key={index}
                className={`category-pill ${selectedCategory === category.name ? "active" : ""}`}
                onClick={() => setSelectedCategory(category.name)}
                style={selectedCategory === category.name ? {
                  backgroundColor: category.color,
                  color: 'white'
                } : {}}
              >
                <i className={category.icon}></i> {category.name}
              </button>
            ))}
          </div>

          {/* Featured Articles Grid */}
          <div className="articles-grid">
            {filteredArticles.length === 0 && (
              <div className="empty-state">
                <p>No articles found for this category yet. Stay tuned ✨</p>
              </div>
            )}
            {filteredArticles.map((article, index) => (
              <Fade key={index} bottom duration={1500} distance="40px">
                <div
                  className={`article-card ${hoveredArticle === index ? "hovered" : ""}`}
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
                        <i className="fas fa-book-open"></i> Read Article
                      </span>
                    </div>
                  </div>
                  
                  <div className="article-content">
                    <div className="article-meta">
                      <span className="article-category">
                        {article.category}
                      </span>
                      <span className="article-date">
                        <i className="far fa-calendar"></i> {article.date}
                      </span>
                      <span className="article-read-time">
                        <i className="far fa-clock"></i> {article.readTime}
                      </span>
                    </div>

                    <h3 className="article-title">{article.title}</h3>
                    <h4 className="article-subtitle">{article.subtitle}</h4>
                    
                    <p className="article-excerpt">{article.excerpt}</p>

                    <div className="article-tags">
                      {article.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="article-tag">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <a href={article.link} className="article-link">
                      Continue Reading <i className="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </Fade>
            ))}
          </div>

          {/* Call to Action */}
          <div className="writing-cta">
            <Fade bottom duration={1500}>
              <h3>Want to read more?</h3>
              <p>Subscribe to get notified about new articles and stories</p>
              <button className="subscribe-btn">
                <i className="fas fa-envelope"></i> Subscribe to Newsletter
              </button>
            </Fade>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default WritingShowcase;
export { writingShowcaseSection };
