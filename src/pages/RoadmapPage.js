import React, {useContext, useEffect, useMemo, useState} from "react";
import LanguageContext from "../contexts/LanguageContext";
import {getRoadmap} from "../services/siteOSAPI";
import {getText} from "../utils/i18n";
import "./SiteOSPages.scss";

const STATUS_ORDER = ["in-progress", "planned", "done", "blocked"];

export default function RoadmapPage() {
  const {language} = useContext(LanguageContext);
  const [roadmap, setRoadmap] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await getRoadmap();
      if (mounted) setRoadmap(data || []);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const sorted = useMemo(
    () =>
      [...roadmap].sort((a, b) => {
        const statusWeight =
          STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status);
        if (statusWeight !== 0) return statusWeight;
        return Number(a.priority || 9) - Number(b.priority || 9);
      }),
    [roadmap]
  );

  const copy = {
    title: {zh: "Roadmap", en: "Roadmap"},
    subtitle: {
      zh: "公开当前建设进度与下一步计划。",
      en: "Public build progress and the next milestones."
    },
    labels: {
      status: {zh: "状态", en: "Status"},
      target: {zh: "目标月份", en: "Target Month"},
      progress: {zh: "进度", en: "Progress"}
    }
  };

  return (
    <div className="page-container siteos-page">
      <div className="page-hero siteos-hero">
        <h1 className="page-title">{getText(copy.title, language)}</h1>
        <p className="page-subtitle">{getText(copy.subtitle, language)}</p>
      </div>

      <div className="siteos-stack">
        {sorted.map(item => (
          <article className="siteos-card" key={item.id}>
            <h3>{getText(item.title, language)}</h3>
            <p>
              <strong>{getText(copy.labels.status, language)}:</strong>{" "}
              {item.status}
            </p>
            <p>
              <strong>{getText(copy.labels.target, language)}:</strong>{" "}
              {item.targetMonth}
            </p>
            <p>
              <strong>{getText(copy.labels.progress, language)}:</strong>{" "}
              {item.progress}%
            </p>
            <div className="siteos-progress">
              <span
                style={{width: `${Math.min(100, Number(item.progress || 0))}%`}}
              ></span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
