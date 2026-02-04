import React, {useContext} from "react";
import Photography from "../containers/photography/Photography";
import LanguageContext from "../contexts/LanguageContext";
import {getText} from "../utils/i18n";
import {photoContent} from "../data/contentIndex";
import "./PhotographyPage.scss";

export default function PhotographyPage() {
  const {language} = useContext(LanguageContext);
  return (
    <div className="page-container">
      <div className="page-hero photography-hero">
        <h1 className="page-title">
          {getText(photoContent.config.sectionTitle, language)}
        </h1>
        <p className="page-subtitle">
          {getText(photoContent.config.subtitle, language)}
        </p>
      </div>
      <Photography />
    </div>
  );
}
