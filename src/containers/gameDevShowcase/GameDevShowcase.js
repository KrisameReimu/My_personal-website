import React, {useState, useContext} from "react";
import "./GameDevShowcase.scss";
import {Fade} from "react-reveal";
import {projects, calculateProgress} from "../../data/gamedev";
import LanguageContext from "../../contexts/LanguageContext";
import {formatDate, getText} from "../../utils/i18n";

// Backwards compatibility: maintain gameDevSection export shape for legacy imports
const gameDevSection = {
  display: true,
  title: "Game Development",
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
  const {language} = useContext(LanguageContext);
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredMilestone, setHoveredMilestone] = useState(null);

  if (!gameDevSection.display) return null;

  const copy = {
    title: {zh: "游戏开发", en: "Game Development"},
    subtitle: {
      zh: "创造沉浸式世界与难忘体验",
      en: "Creating immersive worlds and memorable experiences"
    },
    watchDemo: {zh: "观看演示", en: "Watch Demo"},
    download: {zh: "下载", en: "Download"},
    comingSoon: {zh: "即将推出", en: "Coming Soon"},
    milestones: {zh: "开发里程碑", en: "Development Milestones"},
    process: {zh: "开发流程", en: "Development Process"},
    processSteps: [
      {
        title: {zh: "概念与设计", en: "Concept & Design"},
        desc: {
          zh: "构思玩法、故事与视觉风格",
          en: "Brainstorming game mechanics, story, and visual style"
        }
      },
      {
        title: {zh: "开发实现", en: "Development"},
        desc: {
          zh: "实现系统功能与核心玩法",
          en: "Programming gameplay systems and implementing features"
        }
      },
      {
        title: {zh: "美术与音频", en: "Art & Audio"},
        desc: {
          zh: "制作视觉资源与声音设计",
          en: "Creating visual assets and sound design"
        }
      },
      {
        title: {zh: "测试与打磨", en: "Testing & Polish"},
        desc: {
          zh: "测试、修复与体验优化",
          en: "Playtesting, bug fixing, and refining the experience"
        }
      }
    ]
  };

  // Get milestone icon based on status
  const getMilestoneIcon = status => {
    switch (status) {
      case "completed":
        return "fas fa-check-circle";
      case "in-progress":
        return "fas fa-spinner";
      case "planned":
        return "far fa-circle";
      default:
        return "far fa-circle";
    }
  };

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="game-showcase">
        <div className="game-dev-container">
          {/* Header */}
          <div>
            <h1 className="game-dev-heading">
              {getText(copy.title, language)}
            </h1>
            <p className="subTitle game-dev-subtitle">
              {getText(copy.subtitle, language)}
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
                    onClick={() =>
                      setSelectedProject(
                        selectedProject === project.id ? null : project.id
                      )
                    }
                  >
                    <div className="game-image-container">
                      <img
                        src={project.coverImage}
                        alt={getText(project.title, language)}
                        className="game-image"
                        loading="lazy"
                      />
                      <div
                        className="game-status-badge"
                        data-status={project.status}
                      >
                        {project.status}
                      </div>
                      {project.status === "In Development" && (
                        <div className="progress-overlay">
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{width: `${progress}%`}}
                            />
                          </div>
                          <span className="progress-text">
                            {progress}% Complete
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="game-content">
                      <h3 className="game-title">
                        {getText(project.title, language)}
                      </h3>
                      <p className="game-description">
                        {getText(project.description, language)}
                      </p>

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
                              <li key={index}>
                                {getText(highlight, language) || highlight.zh}
                              </li>
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
                            <i className="fas fa-play"></i>{" "}
                            {getText(copy.watchDemo, language)}
                          </a>
                        )}
                        {project.downloadLink && (
                          <a
                            href={project.downloadLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="game-action-btn"
                          >
                            <i className="fas fa-download"></i>{" "}
                            {getText(copy.download, language)}
                          </a>
                        )}
                        {!project.demoVideo && !project.downloadLink && (
                          <span className="coming-soon">
                            <i className="fas fa-clock"></i>{" "}
                            {getText(copy.comingSoon, language)}
                          </span>
                        )}
                      </div>

                      {/* Expandable Milestone Timeline */}
                      {selectedProject === project.id && project.milestones && (
                        <Fade>
                          <div className="milestones-section">
                            <h4 className="milestones-heading">
                              <i className="fas fa-flag-checkered"></i>{" "}
                              {getText(copy.milestones, language)}
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
                                    <i
                                      className={getMilestoneIcon(
                                        milestone.status
                                      )}
                                    ></i>
                                  </div>
                                  <div className="milestone-content">
                                    <h5 className="milestone-title">
                                      {milestone.title}
                                    </h5>
                                    {hoveredMilestone === idx && (
                                      <p className="milestone-description">
                                        {milestone.description}
                                      </p>
                                    )}
                                    {milestone.completedDate && (
                                      <span className="milestone-date">
                                        <i className="far fa-calendar-check"></i>{" "}
                                        {formatDate(
                                          milestone.completedDate,
                                          language
                                        )}
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
              <h2 className="process-heading">
                {getText(copy.process, language)}
              </h2>
              <div className="process-timeline">
                <div className="timeline-item">
                  <div className="timeline-icon">
                    <i className="fas fa-lightbulb"></i>
                  </div>
                  <div className="timeline-content">
                    <h4>{getText(copy.processSteps[0].title, language)}</h4>
                    <p>{getText(copy.processSteps[0].desc, language)}</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-icon">
                    <i className="fas fa-code"></i>
                  </div>
                  <div className="timeline-content">
                    <h4>{getText(copy.processSteps[1].title, language)}</h4>
                    <p>{getText(copy.processSteps[1].desc, language)}</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-icon">
                    <i className="fas fa-paint-brush"></i>
                  </div>
                  <div className="timeline-content">
                    <h4>{getText(copy.processSteps[2].title, language)}</h4>
                    <p>{getText(copy.processSteps[2].desc, language)}</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-icon">
                    <i className="fas fa-bug"></i>
                  </div>
                  <div className="timeline-content">
                    <h4>{getText(copy.processSteps[3].title, language)}</h4>
                    <p>{getText(copy.processSteps[3].desc, language)}</p>
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
export {gameDevSection};
