import React, {useContext} from "react";
import Skills from "../containers/skills/Skills";
import StackProgress from "../containers/skillProgress/skillProgress";
import Education from "../containers/education/Education";
import WorkExperience from "../containers/workExperience/WorkExperience";
import Achievement from "../containers/achievement/Achievement";
import LanguageContext from "../contexts/LanguageContext";
import {getText} from "../utils/i18n";
import {greeting} from "../portfolio";
import "./AboutPage.scss";

export default function AboutPage() {
  const {language} = useContext(LanguageContext);
  const copy = {
    title: {
      zh: "关于我",
      en: "About Me"
    },
    subtitle: {
      zh: "我的成长、技能与在科技和创意之间的旅程",
      en: "My journey, skills, and experiences in tech and creativity"
    },
    resumeTitle: {
      zh: "简历与经历",
      en: "Resume & Experience"
    },
    resumeSubtitle: {
      zh: "下载简历，了解我的学习与工作经历。",
      en: "Download my CV for a detailed overview of my education and work."
    },
    resumeButton: {
      zh: "下载简历",
      en: "Download Resume"
    }
  };
  return (
    <div className="page-container">
      <div className="page-hero about-hero">
        <h1 className="page-title">{getText(copy.title, language)}</h1>
        <p className="page-subtitle">{getText(copy.subtitle, language)}</p>
      </div>
      {greeting.resumeLink && (
        <div className="about-resume-card">
          <div>
            <h2>{getText(copy.resumeTitle, language)}</h2>
            <p>{getText(copy.resumeSubtitle, language)}</p>
          </div>
          <a
            href={greeting.resumeLink}
            target="_blank"
            rel="noreferrer"
            className="about-resume-button"
          >
            {getText(copy.resumeButton, language)}
          </a>
        </div>
      )}
      <Skills />
      <StackProgress />
      <Education />
      <WorkExperience />
      <Achievement />
    </div>
  );
}
