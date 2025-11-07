import React from "react";
import Greeting from "../containers/greeting/Greeting";
import HighlightSection from "../containers/highlightSection/HighlightSection";
import "./HomePage.scss";

export default function HomePage() {
  return (
    <div className="home-page">
      <Greeting />
      <HighlightSection />
    </div>
  );
}
