import React from "react";
import GameDevShowcase from "../containers/gameDevShowcase/GameDevShowcase";
import Projects from "../containers/projects/Projects";
import Achievement from "../containers/achievement/Achievement";
import "./GameDevPage.scss";

export default function GameDevPage() {
  return (
    <div className="page-container">
      <div className="page-hero">
        <h1 className="page-title">Game Development 🎮</h1>
        <p className="page-subtitle">
          Creating immersive worlds and memorable gaming experiences
        </p>
      </div>
      <GameDevShowcase />
      <div className="related-section">
        <h2 className="section-title">Related Projects</h2>
        <Projects />
      </div>
      <Achievement />
    </div>
  );
}
