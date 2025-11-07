import React from "react";
import Skills from "../containers/skills/Skills";
import StackProgress from "../containers/skillProgress/skillProgress";
import Education from "../containers/education/Education";
import WorkExperience from "../containers/workExperience/WorkExperience";
import Achievement from "../containers/achievement/Achievement";
import "./AboutPage.scss";

export default function AboutPage() {
  return (
    <div className="page-container">
      <div className="page-hero about-hero">
        <h1 className="page-title">About Me</h1>
        <p className="page-subtitle">
          My journey, skills, and experiences in tech and creativity
        </p>
      </div>
      <Skills />
      <StackProgress />
      <Education />
      <WorkExperience />
      <Achievement />
    </div>
  );
}
