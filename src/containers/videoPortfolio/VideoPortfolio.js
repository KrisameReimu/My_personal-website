import React, {useState} from "react";
import "./VideoPortfolio.scss";
import {Fade} from "react-reveal";
import {
  videoConfig,
  videos,
  videosByAwardLevel,
  categories,
  awardStats
} from "../../data/videos";
import {getVideoEmbedUrl} from "../../config/assets";

// Backwards compatibility: maintain videoPortfolioSection export shape
const videoPortfolioSection = {
  display: true,
  title: "🎬 Video Portfolio",
  subtitle: "AWARD-WINNING WORKS - STORYTELLING THROUGH MOVING IMAGES",
  videos: videos.map(video => ({
    title: video.title.en,
    description: video.description.en,
    videoUrl: video.videoId
      ? getVideoEmbedUrl(video.platform, video.videoId)
      : "",
    thumbnail: video.thumbnailUrl,
    category:
      categories.find(c => c.id === video.category)?.name.en || video.category,
    awards: video.awards.map(a => a.name)
  }))
};

const VideoPortfolio = () => {
  const [selectedFilter, setSelectedFilter] = useState("all"); // 'all', 'gold', 'silver', 'special'
  const [hoveredVideo, setHoveredVideo] = useState(null);

  if (!videoPortfolioSection.display) return null;

  // Filter videos based on selected award level
  const filteredVideos =
    selectedFilter === "all"
      ? videos
      : videosByAwardLevel[selectedFilter] || [];

  // Get award badge styling
  const getAwardBadgeStyle = level => {
    const colors = videoConfig.awardBadgeColors;
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
              {videoPortfolioSection.title}
            </h1>
            <p className="subTitle video-portfolio-subtitle">
              {videoPortfolioSection.subtitle}
            </p>
          </div>

          {/* Award Statistics */}
          <div className="award-stats">
            <Fade bottom duration={1500} distance="20px">
              <div className="stats-grid">
                <div className="stat-card">
                  <i className="fas fa-trophy"></i>
                  <span className="stat-number">{awardStats.totalAwards}</span>
                  <span className="stat-label">Total Awards</span>
                </div>
                <div className="stat-card gold">
                  <i className="fas fa-medal"></i>
                  <span className="stat-number">{awardStats.goldCount}</span>
                  <span className="stat-label">Gold</span>
                </div>
                <div className="stat-card silver">
                  <i className="fas fa-medal"></i>
                  <span className="stat-number">{awardStats.silverCount}</span>
                  <span className="stat-label">Silver</span>
                </div>
                <div className="stat-card special">
                  <i className="fas fa-star"></i>
                  <span className="stat-number">{awardStats.specialCount}</span>
                  <span className="stat-label">Special</span>
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
              <i className="fas fa-th"></i> All Videos
            </button>
            <button
              className={`filter-btn ${
                selectedFilter === "gold" ? "active" : ""
              }`}
              onClick={() => setSelectedFilter("gold")}
            >
              <i className="fas fa-trophy"></i> Gold Awards
            </button>
            <button
              className={`filter-btn ${
                selectedFilter === "silver" ? "active" : ""
              }`}
              onClick={() => setSelectedFilter("silver")}
            >
              <i className="fas fa-medal"></i> Silver Awards
            </button>
            <button
              className={`filter-btn ${
                selectedFilter === "special" ? "active" : ""
              }`}
              onClick={() => setSelectedFilter("special")}
            >
              <i className="fas fa-star"></i> Special Awards
            </button>
          </div>

          {/* Video Cards */}
          <div className="video-portfolio-cards-div">
            {filteredVideos.length === 0 && (
              <div className="empty-state">
                <i className="fas fa-video-slash"></i>
                <p>No videos found in this category yet.</p>
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
                            title={video.title.en}
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
                            alt={video.title.en}
                            className="video-thumbnail-img"
                            loading="lazy"
                          />
                          <div className="video-overlay">
                            <i className="fas fa-play-circle play-icon"></i>
                          </div>
                        </div>
                      )}

                      <div className="video-info">
                        <h3 className="video-title">{video.title.zh}</h3>
                        <h4 className="video-title-en">{video.title.en}</h4>
                        <p className="video-description">
                          {video.description.zh}
                        </p>

                        <div className="video-meta">
                          <span className="video-category">
                            <i className="fas fa-tag"></i>
                            {
                              categories.find(c => c.id === video.category)
                                ?.name.zh
                            }
                          </span>
                          <span className="video-duration">
                            <i className="far fa-clock"></i>
                            {Math.floor(video.duration / 60)}:
                            {String(video.duration % 60).padStart(2, "0")}
                          </span>
                          <span className="video-date">
                            <i className="far fa-calendar"></i>{" "}
                            {video.publishedDate}
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
