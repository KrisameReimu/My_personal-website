import React, { useState } from "react";
import "./GameDevShowcase.scss";
import { Fade } from "react-reveal";
import { gameDevConfig, projects, calculateProgress } from "../../data/gamedev";

// Backwards compatibility: maintain gameDevSection export shape for legacy imports
const gameDevSection = {
  display: true,
  title: "🎮 Game Development",
  subtitle: "CREATING IMMERSIVE WORLDS AND MEMORABLE EXPERIENCES",
  games: projects.map(project => ({
    title: project.title.en,
    description: project.description.en,
    image: project.coverImage,
    status: project.status,
    technologies: project.technologies,
    highlights: project.highlights.map(h => h.en),
    demoVideo: project.demoVideo,
    downloadLink: project.downloadLink
  }))
};

const GameDevShowcase = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredMilestone, setHoveredMilestone] = useState(null);

  if (!gameDevSection.display) return null;

  // Get milestone icon based on status
  const getMilestoneIcon = (status) => {
    switch (status) {
      case 'completed': return 'fas fa-check-circle';
      case 'in-progress': return 'fas fa-spinner';
      case 'planned': return 'far fa-circle';
      default: return 'far fa-circle';
    }
  };

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="game-showcase">
        <div className="game-dev-container">
          {/* Header */}
          <div>
            <h1 className="game-dev-heading">{gameDevSection.title}</h1>
            <p className="subTitle game-dev-subtitle">
              {gameDevSection.subtitle}
            </p>
          </div>

          {/* Games Grid */}
          <div className="games-grid">
            {projects.map((project, i) => {
              const progress = calculateProgress(project);
              return (
                <Fade key={project.id} bottom duration={2000} distance="40px">
                  <div 
                    className="game-card"
                    onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                  >
                    <div className="game-image-container">
                      <img
                        src={project.coverImage}
                        alt={project.title.en}
                        className="game-image"
                        loading="lazy"
                      />
                      <div className="game-status-badge" data-status={project.status}>
                        {project.status}
                      </div>
                      {project.status === 'In Development' && (
                        <div className="progress-overlay">
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <span className="progress-text">{progress}% Complete</span>
                        </div>
                      )}
                    </div>

                    <div className="game-content">
                      <h3 className="game-title">{project.title.zh}</h3>
                      <h4 className="game-title-en">{project.title.en}</h4>
                      <p className="game-description">{project.description.zh}</p>
                      
                      <div className="game-tech-stack">
                        <strong>Technologies:</strong>
                        <div className="tech-tags">
                          {project.technologies.map((tech, index) => (
                            <span key={index} className="tech-tag">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {project.highlights && project.highlights.length > 0 && (
                        <div className="game-highlights">
                          <strong>Highlights:</strong>
                          <ul>
                            {project.highlights.map((highlight, index) => (
                              <li key={index}>{highlight.zh}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="game-actions">
                        {project.demoVideo && (
                          <a
                            href={project.demoVideo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="game-action-btn"
                          >
                            <i className="fas fa-play"></i> Watch Demo
                          </a>
                        )}
                        {project.downloadLink && (
                          <a
                            href={project.downloadLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="game-action-btn"
                          >
                            <i className="fas fa-download"></i> Download
                          </a>
                        )}
                        {!project.demoVideo && !project.downloadLink && (
                          <span className="coming-soon">
                            <i className="fas fa-clock"></i> Coming Soon
                          </span>
                        )}
                      </div>

                      {/* Expandable Milestone Timeline */}
                      {selectedProject === project.id && project.milestones && (
                        <Fade>
                          <div className="milestones-section">
                            <h4 className="milestones-heading">
                              <i className="fas fa-flag-checkered"></i> Development Milestones
                            </h4>
                            <div className="milestones-timeline">
                              {project.milestones.map((milestone, idx) => (
                                <div
                                  key={idx}
                                  className={`milestone-item ${milestone.status}`}
                                  onMouseEnter={() => setHoveredMilestone(idx)}
                                  onMouseLeave={() => setHoveredMilestone(null)}
                                >
                                  <div className="milestone-marker">
                                    <i className={getMilestoneIcon(milestone.status)}></i>
                                  </div>
                                  <div className="milestone-content">
                                    <h5 className="milestone-title">{milestone.title}</h5>
                                    {hoveredMilestone === idx && (
                                      <p className="milestone-description">
                                        {milestone.description}
                                      </p>
                                    )}
                                    {milestone.completedDate && (
                                      <span className="milestone-date">
                                        <i className="far fa-calendar-check"></i> {milestone.completedDate}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Fade>
                      )}
                    </div>
                  </div>
                </Fade>
              );
            })}
          </div>

          {/* Development Process Section - Generic Timeline */}
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
                    <p>Brainstorming game mechanics, story, and visual style</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-icon">
                    <i className="fas fa-code"></i>
                  </div>
                  <div className="timeline-content">
                    <h4>Development</h4>
                    <p>Programming gameplay systems and implementing features</p>
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
                    <p>Playtesting, bug fixing, and refining the experience</p>
                  </div>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default GameDevShowcase;
export { gameDevSection };
