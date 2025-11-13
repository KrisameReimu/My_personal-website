import React, {useContext} from "react";
import {Fade} from "react-reveal";
import "./Greeting.scss";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Button from "../../components/button/Button";
import {greeting} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";
import placeholderImages from "../../placeholderImages";

export default function Greeting() {
  const {isDark} = useContext(StyleContext);
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
                {greeting.title}
              </h1>
              <p className="greeting-tagline">{greeting.tagline}</p>
              <p
                className={
                  isDark
                    ? "dark-mode greeting-text-p"
                    : "greeting-text-p subTitle"
                }
              >
                {greeting.subTitle}
              </p>
              <div id="resume" className="empty-div"></div>
              <SocialMedia />
              <div className="button-greeting-div">
                <Button text="Explore My Work" href="#highlights" />
                <Button text="Contact Me" href="#contact" />
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
