import React from "react";

const LanguageContext = React.createContext({
  language: "en",
  setLanguage: () => {},
  toggleLanguage: () => {}
});

export default LanguageContext;
