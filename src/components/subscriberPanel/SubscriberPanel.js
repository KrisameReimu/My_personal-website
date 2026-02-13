import React, {useContext, useState} from "react";
import LanguageContext from "../../contexts/LanguageContext";
import {subscribeEmail} from "../../services/siteOSAPI";
import "./SubscriberPanel.scss";

export default function SubscriberPanel({source = "community"}) {
  const {language} = useContext(LanguageContext);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const copy = {
    title: {zh: "订阅更新", en: "Subscribe"},
    subtitle: {
      zh: "获取每周实验日志与站点更新。",
      en: "Get weekly experiment logs and site updates."
    },
    placeholder: {zh: "输入你的邮箱", en: "Enter your email"},
    submit: {zh: "订阅", en: "Subscribe"},
    invalid: {
      zh: "请输入有效邮箱地址。",
      en: "Please enter a valid email address."
    },
    saved: {
      zh: "订阅成功，感谢关注。",
      en: "Subscribed successfully. Thank you."
    },
    exists: {zh: "你已经订阅过了。", en: "You are already subscribed."},
    failed: {
      zh: "订阅暂时不可用，请稍后再试。",
      en: "Subscription is temporarily unavailable. Please retry later."
    }
  };

  const onSubmit = async event => {
    event.preventDefault();
    const normalized = String(email || "")
      .trim()
      .toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(normalized)) {
      setStatus("error");
      setMessage(copy.invalid[language]);
      return;
    }

    setStatus("loading");
    setMessage("");

    const result = await subscribeEmail({
      email: normalized,
      locale: language,
      source
    });

    if (!result?.ok) {
      setStatus("error");
      setMessage(copy.failed[language]);
      return;
    }

    setStatus("success");
    setEmail("");
    setMessage(result.exists ? copy.exists[language] : copy.saved[language]);
  };

  return (
    <section className="subscriber-panel">
      <h3>{copy.title[language]}</h3>
      <p>{copy.subtitle[language]}</p>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          placeholder={copy.placeholder[language]}
          autoComplete="email"
        />
        <button type="submit" disabled={status === "loading"}>
          {copy.submit[language]}
        </button>
      </form>
      {message && <p className={`subscriber-hint ${status}`}>{message}</p>}
    </section>
  );
}
