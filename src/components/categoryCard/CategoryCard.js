import React, {useContext} from "react";
import {Link} from "react-router-dom";
import "./CategoryCard.scss";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function CategoryCard({category}) {
  const {isDark} = useContext(StyleContext);

  return (
    <Fade bottom duration={1000} distance="20px">
      <Link 
        to={category.route}
        className={isDark ? "category-card-dark category-card-link" : "category-card category-card-link"}
        style={{textDecoration: "none"}}
      >
        <div className="category-icon-wrapper">
          <i className={`fas ${category.icon} category-icon`}></i>
        </div>
        <div className="category-content">
          <h3 className="category-title">{category.title}</h3>
          <p className="category-description">{category.description}</p>
          <div className="category-stats">
            <span className="category-count">{category.count}</span>
          </div>
        </div>
        <div className="category-arrow">
          <i className="fas fa-arrow-right"></i>
        </div>
      </Link>
    </Fade>
  );
}
