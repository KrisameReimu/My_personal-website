import React, {useContext} from "react";
import Photography from "../containers/photography/Photography";
import LanguageContext from "../contexts/LanguageContext";
import {getText} from "../utils/i18n";
import "./PhotographyPage.scss";

export default function PhotographyPage() {
  const {language} = useContext(LanguageContext);
  const copy = {
    title: {zh: "摄影作品", en: "Photography"},
    subtitle: {
      zh: "记录光影与情绪的长期影像档案",
      en: "A long-term visual archive of light, places, and emotions."
    }
  };
  return (
    <div className="page-container">
      <div className="page-hero photography-hero">
        <h1 className="page-title">{getText(copy.title, language)}</h1>
        <p className="page-subtitle">{getText(copy.subtitle, language)}</p>
      </div>
      <Photography />
    </div>
  );
}
