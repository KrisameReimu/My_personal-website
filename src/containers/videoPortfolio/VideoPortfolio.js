import React, {useState, useContext, useEffect, useMemo} from "react";
import "./VideoPortfolio.scss";
import {Fade} from "react-reveal";
import {getVideoEmbedUrl} from "../../config/assets";
import LanguageContext from "../../contexts/LanguageContext";
import {formatDate, getText} from "../../utils/i18n";
import {getVideos} from "../../services/contentAPI";
import {
  fallbackVideoCategory,
  videoCategoryMeta
} from "../../config/contentTaxonomy";

const videoPortfolioSection = {
  display: true
};

const VideoPortfolio = () => {
  const {language} = useContext(LanguageContext);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const allVideos = await getVideos();
      if (mounted) setVideos(allVideos || []);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const copy = {
    title: {zh: "视频作品集", en: "Video Portfolio"},
    subtitle: {
      zh: "获奖作品与视觉叙事",
      en: "Awarded works and visual storytelling"
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

  const stats = useMemo(() => {
    const totalAwards = videos.reduce(
      (sum, video) => sum + (video.awards?.length || 0),
      0
    );
    const goldCount = videos.filter(video =>
      video.awards?.some(award => award.level === "gold")
    ).length;
    const silverCount = videos.filter(video =>
      video.awards?.some(award => award.level === "silver")
    ).length;
    const specialCount = videos.filter(video =>
      video.awards?.some(award => award.level === "special")
    ).length;
    return {totalAwards, goldCount, silverCount, specialCount};
  }, [videos]);

  const filteredVideos = useMemo(() => {
    if (selectedFilter === "all") return videos;
    return videos.filter(video =>
      video.awards?.some(award => award.level === selectedFilter)
    );
  }, [selectedFilter, videos]);

  const getAwardBadgeStyle = level => {
    const colors = {
      gold: "#d4af37",
      silver: "#c0c0c0",
      special: "#764ba2",
      bronze: "#cd7f32"
    };
    return {
      backgroundColor: colors[level] || colors.special,
      color: level === "silver" ? "#333" : "#fff"
    };
  };

  const getCategoryLabel = category => {
    const meta = videoCategoryMeta[category] || fallbackVideoCategory;
    return getText(meta.label, language);
  };

  if (!videoPortfolioSection.display) return null;

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="video-portfolio">
        <div className="video-portfolio-container">
          <div>
            <h1 className="video-portfolio-heading">
              {getText(copy.title, language)}
            </h1>
            <p className="subTitle video-portfolio-subtitle">
              {getText(copy.subtitle, language)}
            </p>
          </div>

          <div className="award-stats">
            <Fade bottom duration={1200} distance="20px">
              <div className="stats-grid">
                <div className="stat-card">
                  <i className="fas fa-trophy"></i>
                  <span className="stat-number">{stats.totalAwards}</span>
                  <span className="stat-label">
                    {getText(copy.stats.total, language)}
                  </span>
                </div>
                <div className="stat-card gold">
                  <i className="fas fa-medal"></i>
                  <span className="stat-number">{stats.goldCount}</span>
                  <span className="stat-label">
                    {getText(copy.stats.gold, language)}
                  </span>
                </div>
                <div className="stat-card silver">
                  <i className="fas fa-medal"></i>
                  <span className="stat-number">{stats.silverCount}</span>
                  <span className="stat-label">
                    {getText(copy.stats.silver, language)}
                  </span>
                </div>
                <div className="stat-card special">
                  <i className="fas fa-star"></i>
                  <span className="stat-number">{stats.specialCount}</span>
                  <span className="stat-label">
                    {getText(copy.stats.special, language)}
                  </span>
                </div>
              </div>
            </Fade>
          </div>

          <div className="filter-buttons">
            {["all", "gold", "silver", "special"].map(filter => (
              <button
                key={filter}
                className={`filter-btn ${
                  selectedFilter === filter ? "active" : ""
                }`}
                onClick={() => setSelectedFilter(filter)}
                type="button"
              >
                {getText(copy.filters[filter], language)}
              </button>
            ))}
          </div>

          <div className="video-portfolio-cards-div">
            {filteredVideos.length === 0 && (
              <div className="empty-state">
                <i className="fas fa-video-slash"></i>
                <p>{getText(copy.empty, language)}</p>
              </div>
            )}
            {filteredVideos.map(video => {
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
                  <Fade bottom duration={1200} distance="24px">
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
                            {getCategoryLabel(video.category)}
                          </span>
                          {video.duration && (
                            <span className="video-duration">
                              <i className="far fa-clock"></i>
                              {Math.floor(video.duration / 60)}:
                              {String(video.duration % 60).padStart(2, "0")}
                            </span>
                          )}
                          <span className="video-date">
                            <i className="far fa-calendar"></i>{" "}
                            {formatDate(video.publishedDate, language)}
                          </span>
                        </div>

                        {video.awards && video.awards.length > 0 && (
                          <div className="video-awards">
                            {video.awards.map((award, index) => (
                              <span
                                key={`${video.id}-${index}`}
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
                              {video.tags.map(tag => (
                                <span
                                  key={`${video.id}-${tag}`}
                                  className="video-tag"
                                >
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
