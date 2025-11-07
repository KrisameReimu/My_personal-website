import React from "react";
import VideoPortfolio from "../containers/videoPortfolio/VideoPortfolio";
import Achievement from "../containers/achievement/Achievement";
import "./VideoPage.scss";

export default function VideoPage() {
  return (
    <div className="page-container">
      <div className="page-hero video-hero">
        <h1 className="page-title">Video Production 🎬</h1>
        <p className="page-subtitle">
          Award-winning multimedia content and creative storytelling
        </p>
      </div>
      <VideoPortfolio />
      <div className="achievements-section">
        <Achievement />
      </div>
    </div>
  );
}
