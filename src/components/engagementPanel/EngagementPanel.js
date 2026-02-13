import React, {useContext, useEffect, useMemo, useState} from "react";
import AuthContext from "../../contexts/AuthContext";
import CommunityContext from "../../contexts/CommunityContext";
import LanguageContext from "../../contexts/LanguageContext";
import {formatDate} from "../../utils/i18n";
import "./EngagementPanel.scss";

export default function EngagementPanel({item, resourceKey}) {
  const {language} = useContext(LanguageContext);
  const {user} = useContext(AuthContext);
  const {toggleFavorite, isFavorite, loadComments, getComments, submitComment} =
    useContext(CommunityContext);
  const [content, setContent] = useState("");
  const [hint, setHint] = useState("");

  const comments = useMemo(
    () => getComments(resourceKey),
    [getComments, resourceKey]
  );
  const favored = isFavorite(item.key);

  const copy = {
    favorite: {zh: "收藏", en: "Favorite"},
    unfavorite: {zh: "已收藏", en: "Saved"},
    leaveComment: {zh: "留言", en: "Comment"},
    placeholder: {
      zh: "写点想法吧（屏蔽广告/黄赌内容）",
      en: "Leave a message (spam/adult ads are blocked)"
    },
    submit: {zh: "发布", en: "Post"},
    loginFirst: {zh: "请先登录后留言", en: "Please login before commenting"},
    empty: {zh: "还没有留言，欢迎第一个发言。", en: "No comments yet."},
    tooFast: {
      zh: "发言太快了，请稍后再试。",
      en: "You're posting too fast. Try again shortly."
    },
    blocked: {
      zh: "留言被过滤器拦截（疑似广告或成人引流）。",
      en: "Your message was blocked by anti-spam filters."
    },
    networkError: {
      zh: "网络波动，留言失败，请重试。",
      en: "Network issue, failed to post. Please try again."
    },
    posted: {zh: "留言已发布。", en: "Comment posted."}
  };

  useEffect(() => {
    loadComments(resourceKey);
  }, [resourceKey, loadComments]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!user) {
      setHint(copy.loginFirst[language]);
      return;
    }
    const result = await submitComment({
      resourceKey,
      userId: user.id,
      displayName: user.displayName,
      provider: user.provider,
      content
    });
    if (!result.ok) {
      if (result.reason === "too_fast") setHint(copy.tooFast[language]);
      else if (result.reason === "blocked_by_filter")
        setHint(copy.blocked[language]);
      else if (result.reason === "network_error")
        setHint(copy.networkError[language]);
      else setHint(copy.loginFirst[language]);
      return;
    }
    setContent("");
    setHint(copy.posted[language]);
  };

  return (
    <section className="engagement-panel">
      <div className="engagement-actions">
        <button
          className={favored ? "active" : ""}
          onClick={() => toggleFavorite(item)}
          type="button"
        >
          <i className={favored ? "fas fa-heart" : "far fa-heart"}></i>{" "}
          {favored ? copy.unfavorite[language] : copy.favorite[language]}
        </button>
      </div>

      <div className="comment-section">
        <h3>{copy.leaveComment[language]}</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder={copy.placeholder[language]}
            rows={4}
            maxLength={800}
          />
          <button type="submit">{copy.submit[language]}</button>
        </form>
        {hint && <p className="comment-hint">{hint}</p>}

        <div className="comment-list">
          {comments.length === 0 && (
            <p className="comment-empty">{copy.empty[language]}</p>
          )}
          {comments.map(comment => (
            <article className="comment-item" key={comment.id}>
              <header>
                <strong>{comment.displayName}</strong>
                <span>{formatDate(comment.createdAt, language)}</span>
              </header>
              <p>{comment.content}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
