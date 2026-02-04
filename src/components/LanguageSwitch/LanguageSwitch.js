import React, {useContext} from "react";
import LanguageContext from "../../contexts/LanguageContext";
import "./LanguageSwitch.scss";

const LanguageSwitch = () => {
  const {language, toggleLanguage} = useContext(LanguageContext);

  return (
    <button
      className="language-switch"
      onClick={toggleLanguage}
      aria-label="Toggle language"
      type="button"
    >
      <span className={language === "zh" ? "active" : ""}>中文</span>
      <span className="divider">/</span>
      <span className={language === "en" ? "active" : ""}>EN</span>
    </button>
  );
};

export default LanguageSwitch;
