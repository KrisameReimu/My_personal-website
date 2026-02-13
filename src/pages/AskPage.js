import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import LanguageContext from "../contexts/LanguageContext";
import {askEchoQuery} from "../services/siteOSAPI";
import {getText} from "../utils/i18n";
import "./SiteOSPages.scss";

export default function AskPage() {
  const {language} = useContext(LanguageContext);
  const {user} = useContext(AuthContext);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const copy = {
    title: {zh: "Ask Echo", en: "Ask Echo"},
    subtitle: {
      zh: "基于站内内容检索并返回带来源的回答。",
      en: "Retrieve answers from site content with explicit citations."
    },
    placeholder: {
      zh: "例如：你最近在做哪些 AI 项目？",
      en: "Example: What AI projects are you currently building?"
    },
    submit: {zh: "提问", en: "Ask"},
    answer: {zh: "回答", en: "Answer"},
    citations: {zh: "引用来源", en: "Citations"},
    confidence: {zh: "置信度", en: "Confidence"},
    empty: {zh: "请输入问题。", en: "Please enter a question."}
  };

  const onSubmit = async event => {
    event.preventDefault();
    const text = String(query || "").trim();
    if (!text) {
      setResult({
        answer: copy.empty[language],
        citations: [],
        confidence: 0,
        fallback: true
      });
      return;
    }

    setLoading(true);
    const next = await askEchoQuery({
      query: text,
      language,
      userId: user?.id
    });
    setResult(next);
    setLoading(false);
  };

  return (
    <div className="page-container siteos-page">
      <div className="page-hero siteos-hero">
        <h1 className="page-title">{getText(copy.title, language)}</h1>
        <p className="page-subtitle">{getText(copy.subtitle, language)}</p>
      </div>

      <section className="siteos-card">
        <form className="ask-page-form" onSubmit={onSubmit}>
          <input
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder={getText(copy.placeholder, language)}
          />
          <button type="submit" disabled={loading}>
            {getText(copy.submit, language)}
          </button>
        </form>

        {result && (
          <div className="ask-page-result">
            <h3>{getText(copy.answer, language)}</h3>
            <p>{result.answer}</p>
            <p>
              {getText(copy.confidence, language)}:{" "}
              {Math.round(Number(result.confidence || 0) * 100)}%
            </p>
            <h4>{getText(copy.citations, language)}</h4>
            {result.citations?.length ? (
              <ul>
                {result.citations.map((item, index) => (
                  <li key={`${item.url}-${index}`}>
                    <Link to={item.url}>{item.title}</Link>
                    {item.snippet && <p>{item.snippet}</p>}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No citations yet.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
