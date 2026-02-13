import React, {useContext, useEffect, useMemo, useState} from "react";
import {Link} from "react-router-dom";
import LanguageContext from "../contexts/LanguageContext";
import {formatDate, getText} from "../utils/i18n";
import {getExperiments} from "../services/siteOSAPI";
import "./SiteOSPages.scss";

const PILLARS = ["ai-engineering", "investment-systems", "creative-tech"];

export default function LabPage() {
  const {language} = useContext(LanguageContext);
  const [experiments, setExperiments] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await getExperiments({limit: 60});
      if (mounted) setExperiments(data || []);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const grouped = useMemo(() => {
    const map = new Map();
    PILLARS.forEach(pillar => map.set(pillar, []));
    experiments.forEach(item => {
      if (!map.has(item.pillar)) map.set(item.pillar, []);
      map.get(item.pillar).push(item);
    });
    return map;
  }, [experiments]);

  const copy = {
    title: {zh: "Lab", en: "Lab"},
    subtitle: {
      zh: "围绕 AI 工程、投资系统和创作技术的实验轨道。",
      en: "Experiment tracks across AI engineering, investment systems, and creative tech."
    },
    pillarName: {
      "ai-engineering": {zh: "AI 工程", en: "AI Engineering"},
      "investment-systems": {zh: "投资系统", en: "Investment Systems"},
      "creative-tech": {zh: "创作技术", en: "Creative Tech"}
    },
    latest: {zh: "最新实验", en: "Latest Logs"},
    viewAll: {zh: "查看全部", en: "View All"},
    empty: {zh: "暂无实验记录", en: "No logs yet"}
  };

  return (
    <div className="page-container siteos-page">
      <div className="page-hero siteos-hero">
        <h1 className="page-title">{getText(copy.title, language)}</h1>
        <p className="page-subtitle">{getText(copy.subtitle, language)}</p>
      </div>

      <div className="siteos-stack">
        {PILLARS.map(pillar => {
          const logs = (grouped.get(pillar) || []).slice(0, 3);
          return (
            <section className="siteos-card" key={pillar}>
              <div className="siteos-row-head">
                <h3>{getText(copy.pillarName[pillar], language)}</h3>
                <Link to={`/lab/${pillar}`}>
                  {getText(copy.viewAll, language)} →
                </Link>
              </div>
              <p className="muted-label">{getText(copy.latest, language)}</p>
              {logs.length === 0 && <p>{getText(copy.empty, language)}</p>}
              {logs.map(log => (
                <article className="siteos-log" key={log.id}>
                  <h4>{getText(log.title, language)}</h4>
                  <p>{getText(log.result, language)}</p>
                  <span>{formatDate(log.publishedAt, language)}</span>
                </article>
              ))}
            </section>
          );
        })}
      </div>
    </div>
  );
}
