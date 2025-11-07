import React, {useContext} from "react";
import "./HighlightSection.scss";
import {Fade} from "react-reveal";
import emoji from "react-easy-emoji";
import StyleContext from "../../contexts/StyleContext";
import CategoryCard from "../../components/categoryCard/CategoryCard";

export default function HighlightSection() {
  const {isDark} = useContext(StyleContext);

  const highlights = [
    {
      icon: "🎮",
      title: "Game Creator",
      description: "Crafting immersive 2D action-adventure worlds with Unity & C#"
    },
    {
      icon: "🤖",
      title: "AI Innovator",
      description: "Building intelligent systems with GPT-4 for education & creativity"
    },
    {
      icon: "🎬",
      title: "Digital Storyteller",
      description: "Award-winning multimedia producer blending video, photography & narrative"
    },
    {
      icon: "✍️",
      title: "Writer & Thinker",
      description: "Exploring tech, games, and life through bilingual creative writing"
    }
  ];

  const categories = [
    {
      title: "Game Development",
      description: "Explore my journey in creating immersive gaming experiences",
      icon: "fa-gamepad",
      count: "Featured Project: Melina",
      route: "/game-dev"
    },
    {
      title: "Video Production",
      description: "Award-winning multimedia content and creative storytelling",
      icon: "fa-video",
      count: "3 Awards",
      route: "/videos"
    },
    {
      title: "Photography",
      description: "Capturing moments across urban, portrait, and nature genres",
      icon: "fa-camera-retro",
      count: "3 Collections",
      route: "/photography"
    },
    {
      title: "Writing & Essays",
      description: "Personal reflections blending tech insights and creative narratives",
      icon: "fa-pen-fancy",
      count: "Bilingual Content",
      route: "/writing"
    }
  ];

  return (
    <div className="highlight-section-main" id="highlights">
      {/* Personal Brand Statement */}
      <Fade bottom duration={1000} distance="20px">
        <div className="brand-statement">
          <h2 className={isDark ? "dark-mode brand-title" : "brand-title"}>
            Where Technology Meets Creativity
          </h2>
          <p className={isDark ? "dark-mode brand-subtitle" : "brand-subtitle"}>
            I'm not just building software—I'm crafting experiences that bridge AI innovation, 
            interactive entertainment, and visual storytelling. Each project is a chapter in 
            exploring how technology can amplify human creativity.
          </p>
        </div>
      </Fade>

      {/* Core Highlights */}
      <div className="highlights-grid">
        {highlights.map((highlight, index) => (
          <Fade key={index} bottom duration={1000} delay={index * 100} distance="20px">
            <div className={isDark ? "highlight-card-dark" : "highlight-card"}>
              <div className="highlight-icon">{emoji(highlight.icon)}</div>
              <h3 className="highlight-title">{highlight.title}</h3>
              <p className="highlight-description">{highlight.description}</p>
            </div>
          </Fade>
        ))}
      </div>

      {/* Category Navigation */}
      <Fade bottom duration={1000} distance="20px">
        <div className="section-divider">
          <h2 className={isDark ? "dark-mode section-title" : "section-title"}>
            Explore My Work
          </h2>
          <p className={isDark ? "dark-mode section-subtitle" : "section-subtitle"}>
            Dive into different facets of my creative & technical journey
          </p>
        </div>
      </Fade>

      <div className="categories-grid">
        {categories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>
    </div>
  );
}
