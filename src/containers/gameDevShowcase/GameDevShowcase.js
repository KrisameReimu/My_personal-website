import React, { Component } from "react";
import "./GameDevShowcase.scss";
import { gameDevSection } from "../../portfolio";
import { Fade } from "react-reveal";

class GameDevShowcase extends Component {
  render() {
    if (!gameDevSection.display) {
      return null;
    }

    return (
      <Fade bottom duration={1000} distance="20px">
        <div className="main" id="game-showcase">
          <div className="game-dev-container">
            <div>
              <h1 className="game-dev-heading">{gameDevSection.title}</h1>
              <p className="subTitle game-dev-subtitle">
                {gameDevSection.subtitle}
              </p>
            </div>
            <div className="games-grid">
              {gameDevSection.games.map((game, i) => {
                return (
                  <Fade key={i} bottom duration={2000} distance="40px">
                    <div className="game-card">
                      <div className="game-image-container">
                        <img
                          src={game.image}
                          alt={game.title}
                          className="game-image"
                        />
                        <div className="game-status-badge" data-status={game.status}>
                          {game.status}
                        </div>
                      </div>
                      <div className="game-content">
                        <h3 className="game-title">{game.title}</h3>
                        <p className="game-description">{game.description}</p>
                        
                        <div className="game-tech-stack">
                          <strong>Technologies:</strong>
                          <div className="tech-tags">
                            {game.technologies.map((tech, index) => (
                              <span key={index} className="tech-tag">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {game.highlights && (
                          <div className="game-highlights">
                            <strong>Highlights:</strong>
                            <ul>
                              {game.highlights.map((highlight, index) => (
                                <li key={index}>{highlight}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="game-actions">
                          {game.demoVideo && (
                            <a
                              href={game.demoVideo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="game-action-btn"
                            >
                              <i className="fas fa-play"></i> Watch Demo
                            </a>
                          )}
                          {game.downloadLink && (
                            <a
                              href={game.downloadLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="game-action-btn"
                            >
                              <i className="fas fa-download"></i> Download
                            </a>
                          )}
                          {!game.demoVideo && !game.downloadLink && (
                            <span className="coming-soon">
                              <i className="fas fa-clock"></i> Coming Soon
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Fade>
                );
              })}
            </div>

            {/* Add Game Development Process Section */}
            <div className="dev-process-section">
              <Fade bottom duration={1500} distance="30px">
                <h2 className="process-heading">Development Process</h2>
                <div className="process-timeline">
                  <div className="timeline-item">
                    <div className="timeline-icon">
                      <i className="fas fa-lightbulb"></i>
                    </div>
                    <div className="timeline-content">
                      <h4>Concept & Design</h4>
                      <p>
                        Brainstorming game mechanics, story, and visual style
                      </p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-icon">
                      <i className="fas fa-code"></i>
                    </div>
                    <div className="timeline-content">
                      <h4>Development</h4>
                      <p>
                        Programming gameplay systems and implementing features
                      </p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-icon">
                      <i className="fas fa-paint-brush"></i>
                    </div>
                    <div className="timeline-content">
                      <h4>Art & Audio</h4>
                      <p>Creating visual assets and sound design</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-icon">
                      <i className="fas fa-bug"></i>
                    </div>
                    <div className="timeline-content">
                      <h4>Testing & Polish</h4>
                      <p>
                        Playtesting, bug fixing, and refining the experience
                      </p>
                    </div>
                  </div>
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </Fade>
    );
  }
}

export default GameDevShowcase;
