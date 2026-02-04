import React, {useState, useContext} from "react";
import "./VideoPortfolio.scss";
import {Fade} from "react-reveal";
import {videoContent} from "../../data/contentIndex";
import {getVideoEmbedUrl} from "../../config/assets";
import LanguageContext from "../../contexts/LanguageContext";
import {formatDate, getText} from "../../utils/i18n";

// Backwards compatibility: maintain videoPortfolioSection export shape
const videoPortfolioSection = {
  display: true,
  title: "Video Portfolio",
  subtitle: "AWARD-WINNING WORKS - STORYTELLING THROUGH MOVING IMAGES",
  videos: videoContent.videos.map(video => ({
    title: video.title.en,
    description: video.description.en,
    videoUrl: video.videoId
      ? getVideoEmbedUrl(video.platform, video.videoId)
      : "",
    thumbnail: video.thumbnailUrl,
    category:
      videoContent.categories.find(c => c.id === video.category)?.name.en ||
      video.category,
    awards: video.awards.map(a => a.name)
  }))
};

const VideoPortfolio = () => {
  const {language} = useContext(LanguageContext);
  const [selectedFilter, setSelectedFilter] = useState("all"); // 'all', 'gold', 'silver', 'special'
  const [hoveredVideo, setHoveredVideo] = useState(null);

  if (!videoPortfolioSection.display) return null;

  const copy = {
    title: {
      zh: "视频作品集",
      en: "Video Portfolio"
    },
    subtitle: {
      zh: "获奖作品 · 用影像讲述故事",
      en: "Award-winning works · Storytelling through moving images"
    },
    filters: {
      all: {zh: "全部作品", en: "All Videos"},
      gold: {zh: "金奖", en: "Gold Awards"},
      silver: {zh: "银奖", en: "Silver Awards"},
      special: {zh: "特别奖", en: "Special Awards"}
    },
    stats: {
      total: {zh: "奖项总数", en: "Total Awards"},
      gold: {zh: "金奖", en: "Gold"},
      silver: {zh: "银奖", en: "Silver"},
      special: {zh: "特别奖", en: "Special"}
    },
    empty: {
      zh: "该分类暂时没有作品。",
      en: "No videos found in this category yet."
    }
  };

  // Filter videos based on selected award level
  const filteredVideos =
    selectedFilter === "all"
      ? videoContent.videos
      : videoContent.videosByAwardLevel[selectedFilter] || [];

  // Get award badge styling
  const getAwardBadgeStyle = level => {
    const colors = videoContent.config.awardBadgeColors;
    return {
      backgroundColor: colors[level] || colors.special,
      color: level === "silver" ? "#333" : "#fff"
    };
  };

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="video-portfolio">
        <div className="video-portfolio-container">
          {/* Header */}
          <div>
            <h1 className="video-portfolio-heading">
              {getText(copy.title, language)}
            </h1>
            <p className="subTitle video-portfolio-subtitle">
              {getText(copy.subtitle, language)}
            </p>
          </div>

          {/* Award Statistics */}
          <div className="award-stats">
            <Fade bottom duration={1500} distance="20px">
              <div className="stats-grid">
                <div className="stat-card">
                  <i className="fas fa-trophy"></i>
                  <span className="stat-number">
                    {videoContent.awardStats.totalAwards}
                  </span>
                  <span className="stat-label">
                    {getText(copy.stats.total, language)}
                  </span>
                </div>
                <div className="stat-card gold">
                  <i className="fas fa-medal"></i>
                  <span className="stat-number">
                    {videoContent.awardStats.goldCount}
                  </span>
                  <span className="stat-label">
                    {getText(copy.stats.gold, language)}
                  </span>
                </div>
                <div className="stat-card silver">
                  <i className="fas fa-medal"></i>
                  <span className="stat-number">
                    {videoContent.awardStats.silverCount}
                  </span>
                  <span className="stat-label">
                    {getText(copy.stats.silver, language)}
                  </span>
                </div>
                <div className="stat-card special">
                  <i className="fas fa-star"></i>
                  <span className="stat-number">
                    {videoContent.awardStats.specialCount}
                  </span>
                  <span className="stat-label">
                    {getText(copy.stats.special, language)}
                  </span>
                </div>
              </div>
            </Fade>
          </div>

          {/* Filter Buttons */}
          <div className="filter-buttons">
            <button
              className={`filter-btn ${
                selectedFilter === "all" ? "active" : ""
              }`}
              onClick={() => setSelectedFilter("all")}
            >
              <i className="fas fa-th"></i>{" "}
              {getText(copy.filters.all, language)}
            </button>
            <button
              className={`filter-btn ${
                selectedFilter === "gold" ? "active" : ""
              }`}
              onClick={() => setSelectedFilter("gold")}
            >
              <i className="fas fa-trophy"></i>{" "}
              {getText(copy.filters.gold, language)}
            </button>
            <button
              className={`filter-btn ${
                selectedFilter === "silver" ? "active" : ""
              }`}
              onClick={() => setSelectedFilter("silver")}
            >
              <i className="fas fa-medal"></i>{" "}
              {getText(copy.filters.silver, language)}
            </button>
            <button
              className={`filter-btn ${
                selectedFilter === "special" ? "active" : ""
              }`}
              onClick={() => setSelectedFilter("special")}
            >
              <i className="fas fa-star"></i>{" "}
              {getText(copy.filters.special, language)}
            </button>
          </div>

          {/* Video Cards */}
          <div className="video-portfolio-cards-div">
            {filteredVideos.length === 0 && (
              <div className="empty-state">
                <i className="fas fa-video-slash"></i>
                <p>{getText(copy.empty, language)}</p>
              </div>
            )}
            {filteredVideos.map((video, i) => {
              const embedUrl = video.videoId
                ? getVideoEmbedUrl(video.platform, video.videoId)
                : null;

              return (
                <div
                  key={video.id}
                  className="video-card"
                  onMouseEnter={() => setHoveredVideo(video.id)}
                  onMouseLeave={() => setHoveredVideo(null)}
                >
                  <Fade bottom duration={2000} distance="40px">
                    <div className="video-card-content">
                      {embedUrl ? (
                        <div className="video-embed">
                          <iframe
                            src={embedUrl}
                            title={getText(video.title, language)}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                          ></iframe>
                        </div>
                      ) : (
                        <div className="video-thumbnail">
                          <img
                            src={video.thumbnailUrl}
                            alt={getText(video.title, language)}
                            className="video-thumbnail-img"
                            loading="lazy"
                          />
                          <div className="video-overlay">
                            <i className="fas fa-play-circle play-icon"></i>
                          </div>
                        </div>
                      )}

                      <div className="video-info">
                        <h3 className="video-title">
                          {getText(video.title, language)}
                        </h3>
                        <p className="video-description">
                          {getText(video.description, language)}
                        </p>

                        <div className="video-meta">
                          <span className="video-category">
                            <i className="fas fa-tag"></i>
                            {videoContent.categories.find(
                              c => c.id === video.category
                            )?.name
                              ? getText(
                                  videoContent.categories.find(
                                    c => c.id === video.category
                                  ).name,
                                  language
                                )
                              : video.category}
                          </span>
                          <span className="video-duration">
                            <i className="far fa-clock"></i>
                            {Math.floor(video.duration / 60)}:
                            {String(video.duration % 60).padStart(2, "0")}
                          </span>
                          <span className="video-date">
                            <i className="far fa-calendar"></i>{" "}
                            {formatDate(video.publishedDate, language)}
                          </span>
                        </div>

                        {video.awards && video.awards.length > 0 && (
                          <div className="video-awards">
                            {video.awards.map((award, index) => (
                              <span
                                key={index}
                                className={`award-badge ${award.level}`}
                                style={getAwardBadgeStyle(award.level)}
                              >
                                <i className="fas fa-trophy"></i> {award.name}
                              </span>
                            ))}
                          </div>
                        )}

                        {hoveredVideo === video.id && video.tags && (
                          <Fade>
                            <div className="video-tags">
                              {video.tags.map((tag, idx) => (
                                <span key={idx} className="video-tag">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </Fade>
                        )}
                      </div>
                    </div>
                  </Fade>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default VideoPortfolio;
export {videoPortfolioSection};
