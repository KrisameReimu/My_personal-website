import React, {useContext} from "react";
import {Fade} from "react-reveal";
import "./Greeting.scss";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Button from "../../components/button/Button";
import {greeting} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";
import LanguageContext from "../../contexts/LanguageContext";
import placeholderImages from "../../placeholderImages";
import {getText} from "../../utils/i18n";

export default function Greeting() {
  const {isDark} = useContext(StyleContext);
  const {language} = useContext(LanguageContext);
  const primaryCta = {
    zh: "查看最新文章",
    en: "Read Latest Writing"
  };
  const secondaryCta = {
    zh: "联系我",
    en: "Contact Me"
  };
  if (!greeting.displayGreeting) {
    return null;
  }
  return (
    <Fade bottom duration={1000} distance="40px">
      <div className="greet-main" id="greeting">
        <div className="greeting-main">
          <div className="greeting-text-div">
            <div>
              <h1
                className={isDark ? "dark-mode greeting-text" : "greeting-text"}
              >
                {getText(greeting.title, language)}
              </h1>
              <p className="greeting-tagline">
                {getText(greeting.tagline, language)}
              </p>
              <p
                className={
                  isDark
                    ? "dark-mode greeting-text-p"
                    : "greeting-text-p subTitle"
                }
              >
                {getText(greeting.subTitle, language)}
              </p>
              {greeting.story && (
                <p className="greeting-story">
                  {getText(greeting.story, language)}
                </p>
              )}
              <div id="resume" className="empty-div"></div>
              <SocialMedia />
              <div className="button-greeting-div">
                <Button text={getText(primaryCta, language)} href="/writing" />
                <Button
                  text={getText(secondaryCta, language)}
                  href="/contact"
                />
              </div>
            </div>
          </div>
          <div className="greeting-image-div">
            <div className="profile-image-wrapper">
              <img
                className="profile-image"
                alt="Echo Chen Portrait"
                src={greeting.profileImage || placeholderImages.profilePhoto}
              />
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}
