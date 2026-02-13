import React, {useContext} from "react";
import LanguageContext from "../contexts/LanguageContext";
import EngagementPanel from "../components/engagementPanel/EngagementPanel";
import DonatePanel from "../components/donatePanel/DonatePanel";
import SubscriberPanel from "../components/subscriberPanel/SubscriberPanel";
import "./CommunityPage.scss";

export default function CommunityPage() {
  const {language} = useContext(LanguageContext);

  const copy = {
    title: {zh: "互动留言区", en: "Community"},
    subtitle: {
      zh: "欢迎留言交流。系统会自动拦截明显广告和成人引流内容。",
      en: "Leave a message. The filter auto-blocks obvious spam and adult ads."
    }
  };

  return (
    <div className="community-page page-container">
      <div className="page-hero community-hero">
        <h1 className="page-title">{copy.title[language]}</h1>
        <p className="page-subtitle">{copy.subtitle[language]}</p>
      </div>
      <EngagementPanel
        resourceKey="site:guestbook"
        item={{
          key: "site:guestbook",
          title: language === "zh" ? "互动留言区" : "Community Guestbook",
          url: "/community"
        }}
      />
      <SubscriberPanel source="community_page" />
      <DonatePanel />
    </div>
  );
}
