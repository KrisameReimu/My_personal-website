import React, { Component } from "react";
import "./VideoPortfolio.scss";
import { videoPortfolioSection } from "../../portfolio";
import { Fade } from "react-reveal";

class VideoPortfolio extends Component {
  render() {
    if (!videoPortfolioSection.display) {
      return null;
    }

    return (
      <Fade bottom duration={1000} distance="20px">
        <div className="main" id="video-portfolio">
          <div className="video-portfolio-container">
            <div>
              <h1 className="video-portfolio-heading">
                {videoPortfolioSection.title}
              </h1>
              <p className="subTitle video-portfolio-subtitle">
                {videoPortfolioSection.subtitle}
              </p>
            </div>
            <div className="video-portfolio-cards-div">
              {videoPortfolioSection.videos.map((video, i) => {
                return (
                  <div key={i} className="video-card">
                    <Fade bottom duration={2000} distance="40px">
                      <div className="video-card-content">
                        {video.videoUrl ? (
                          <div className="video-embed">
                            <iframe
                              src={video.videoUrl}
                              title={video.title}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        ) : (
                          <div className="video-thumbnail">
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="video-thumbnail-img"
                            />
                            <div className="video-overlay">
                              <i className="fas fa-play-circle play-icon"></i>
                            </div>
                          </div>
                        )}
                        <div className="video-info">
                          <h3 className="video-title">{video.title}</h3>
                          <p className="video-description">
                            {video.description}
                          </p>
                          <span className="video-category">
                            {video.category}
                          </span>
                          {video.awards && video.awards.length > 0 && (
                            <div className="video-awards">
                              {video.awards.map((award, index) => (
                                <span key={index} className="award-badge">
                                  <i className="fas fa-trophy"></i> {award}
                                </span>
                              ))}
                            </div>
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
  }
}

export default VideoPortfolio;
