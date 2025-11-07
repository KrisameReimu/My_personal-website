import React from "react";
import Photography from "../containers/photography/Photography";
import "./PhotographyPage.scss";

export default function PhotographyPage() {
  return (
    <div className="page-container">
      <div className="page-hero photography-hero">
        <h1 className="page-title">Photography 📸</h1>
        <p className="page-subtitle">
          Capturing moments and telling visual stories through the lens
        </p>
      </div>
      <Photography />
    </div>
  );
}
