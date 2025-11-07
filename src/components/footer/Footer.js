import React, {useContext} from "react";
import "./Footer.scss";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";
import {socialMediaLinks} from "../../portfolio";

export default function Footer() {
  const {isDark} = useContext(StyleContext);
  return (
    <Fade bottom duration={1000} distance="5px">
      <div className="footer-div">
        <p className={isDark ? "dark-mode footer-text" : "footer-text"}>
          © 2025 Echo Chen (陈琛)
        </p>
        <div className="footer-social-links">
          {socialMediaLinks.github && (
            <a
              href={socialMediaLinks.github}
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <i className="fab fa-github"></i>
            </a>
          )}
          {socialMediaLinks.linkedin && (
            <a
              href={socialMediaLinks.linkedin}
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          )}
          {socialMediaLinks.instagram && (
            <a
              href={socialMediaLinks.instagram}
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
          )}
          {socialMediaLinks.twitter && (
            <a
              href={socialMediaLinks.twitter}
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter/X"
            >
              <i className="fab fa-x-twitter"></i>
            </a>
          )}
          {socialMediaLinks.youtube && (
            <a
              href={socialMediaLinks.youtube}
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <i className="fab fa-youtube"></i>
            </a>
          )}
          {socialMediaLinks.gmail && (
            <a
              href={`mailto:${socialMediaLinks.gmail}`}
              className="footer-link"
              aria-label="Email"
            >
              <i className="fas fa-envelope"></i>
            </a>
          )}
        </div>
        <p className={isDark ? "dark-mode footer-text footer-tagline" : "footer-text footer-tagline"}>
          AI Developer × Game Creator × Digital Storyteller
        </p>
      </div>
    </Fade>
  );
}
