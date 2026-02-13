import React, {useContext, useEffect, useState} from "react";
import LanguageContext from "../contexts/LanguageContext";
import {formatDate, getText} from "../utils/i18n";
import {getNowLatest} from "../services/siteOSAPI";
import "./SiteOSPages.scss";

export default function NowPage() {
  const {language} = useContext(LanguageContext);
  const [snapshot, setSnapshot] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await getNowLatest();
      if (mounted) setSnapshot(data);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const copy = {
    title: {zh: "Now", en: "Now"},
    subtitle: {
      zh: "我当前在做的重点方向和下周行动。",
      en: "Current focus and next actions this week."
    },
    labels: {
      focus: {zh: "当前焦点", en: "Current Focus"},
      doing: {zh: "正在做", en: "Doing"},
      notDoing: {zh: "暂不做", en: "Not Doing"},
      blockers: {zh: "当前阻碍", en: "Blockers"},
      nextActions: {zh: "下一步", en: "Next Actions"},
      week: {zh: "周起始", en: "Week Of"}
    }
  };

  if (!snapshot) {
    return <div className="page-container siteos-page">Loading...</div>;
  }

  return (
    <div className="page-container siteos-page">
      <div className="page-hero siteos-hero">
        <h1 className="page-title">{getText(copy.title, language)}</h1>
        <p className="page-subtitle">{getText(copy.subtitle, language)}</p>
      </div>

      <div className="siteos-grid">
        <article className="siteos-card">
          <h3>{getText(copy.labels.week, language)}</h3>
          <p>{formatDate(snapshot.weekOf, language)}</p>
        </article>
        <article className="siteos-card">
          <h3>{getText(copy.labels.focus, language)}</h3>
          <p>{getText(snapshot.focus, language)}</p>
        </article>
        <article className="siteos-card">
          <h3>{getText(copy.labels.doing, language)}</h3>
          <p>{getText(snapshot.doing, language)}</p>
        </article>
        <article className="siteos-card">
          <h3>{getText(copy.labels.notDoing, language)}</h3>
          <p>{getText(snapshot.notDoing, language)}</p>
        </article>
        <article className="siteos-card">
          <h3>{getText(copy.labels.blockers, language)}</h3>
          <p>{getText(snapshot.blockers, language)}</p>
        </article>
        <article className="siteos-card">
          <h3>{getText(copy.labels.nextActions, language)}</h3>
          <p>{getText(snapshot.nextActions, language)}</p>
        </article>
      </div>
    </div>
  );
}
