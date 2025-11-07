import React from "react";
import WritingShowcase from "../containers/writingShowcase/WritingShowcase";
import "./WritingPage.scss";

export default function WritingPage() {
  return (
    <div className="page-container">
      <div className="page-hero writing-hero">
        <h1 className="page-title">Writing & Essays ✍️</h1>
        <p className="page-subtitle">
          Personal reflections blending tech insights and creative narratives
        </p>
      </div>
      <WritingShowcase />
    </div>
  );
}
