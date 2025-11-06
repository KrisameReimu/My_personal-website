import React, { Component } from "react";
import "./WritingShowcase.scss";
import { Fade } from "react-reveal";

// 这个组件专门展示你的个人写作作品
const writingShowcaseSection = {
  title: "✍️ Written Words",
  subtitle: "THOUGHTS, STORIES, AND INSIGHTS FROM MY JOURNEY",
  description: "Exploring the intersection of technology, creativity, and human experience through words.",
  
  categories: [
    {
      name: "Tech Insights",
      icon: "fas fa-code",
      color: "#4285f4",
      description: "Technical deep-dives and industry observations"
    },
    {
      name: "Creative Narratives", 
      icon: "fas fa-pen-nib",
      color: "#ea4335",
      description: "Stories, reflections, and creative explorations"
    },
    {
      name: "Game Dev Diaries",
      icon: "fas fa-gamepad",
      color: "#34a853",
      description: "Behind-the-scenes of game development"
    },
    {
      name: "Life & Learning",
      icon: "fas fa-lightbulb",
      color: "#fbbc04",
      description: "Personal growth and life lessons"
    }
  ],

  featuredArticles: [
    {
      title: "AI时代的创作者：如何保持独特性",
      subtitle: "Staying Unique in the Age of AI",
      category: "Tech Insights",
      date: "2024-11-01",
      readTime: "8 min read",
      excerpt: "在AI工具泛滥的今天，真正的创作者不是使用最多工具的人，而是最能保持个人独特视角的人。本文探讨如何在AI辅助下，打造真正属于自己的创作风格...",
      image: "https://source.unsplash.com/1200x800/?artificial-intelligence,creativity",
      tags: ["AI", "Creativity", "Personal Branding"],
      link: "/articles/ai-creator-uniqueness"
    },
    {
      title: "从玩家到创造者：我的游戏开发之路",
      subtitle: "From Player to Creator: My Game Dev Journey",
      category: "Game Dev Diaries",
      date: "2024-10-15",
      readTime: "10 min read",
      excerpt: "从第一次接触《空洞骑士》到决定开发自己的2D动作冒险游戏，这段旅程充满了挑战、学习和成长。让我分享在PolyU开发Melina Dream of Hero的故事...",
      image: "https://source.unsplash.com/1200x800/?game,development",
      tags: ["Game Development", "Unity", "Personal Story"],
      link: "/articles/game-dev-journey"
    },
    {
      title: "用代码讲故事：全栈开发中的用户体验思考",
      subtitle: "Storytelling Through Code: UX in Full-Stack Development",
      category: "Tech Insights",
      date: "2024-09-20",
      readTime: "6 min read",
      excerpt: "在BornTea实习期间，我意识到好的代码不仅要运行正确，更要讲好用户的故事。本文探讨如何在全栈开发中融入用户体验设计思维...",
      image: "https://source.unsplash.com/1200x800/?web,design",
      tags: ["Full-Stack", "UX Design", "Web Development"],
      link: "/articles/fullstack-storytelling"
    },
    {
      title: "城市的数字诗人：用摄影和文字记录香港",
      subtitle: "Digital Poet of the City: Capturing Hong Kong",
      category: "Creative Narratives",
      date: "2024-08-10",
      readTime: "5 min read",
      excerpt: "香港这座城市，既传统又现代，既快节奏又充满温情。通过镜头和文字，我记录下这座城市的多面性，以及作为一个创作者在这里的感受...",
      image: "https://source.unsplash.com/1200x800/?hongkong,city",
      tags: ["Photography", "Hong Kong", "Creative Writing"],
      link: "/articles/hongkong-digital-poet"
    }
  ],

  display: true
};

class WritingShowcase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: "All",
      hoveredArticle: null
    };
  }

  filterArticles = () => {
    const { selectedCategory } = this.state;
    if (selectedCategory === "All") {
      return writingShowcaseSection.featuredArticles;
    }
    return writingShowcaseSection.featuredArticles.filter(
      article => article.category === selectedCategory
    );
  };

  render() {
    if (!writingShowcaseSection.display) {
      return null;
    }

    const { selectedCategory, hoveredArticle } = this.state;
    const filteredArticles = this.filterArticles();

    return (
      <Fade bottom duration={1000} distance="20px">
        <div className="main writing-showcase" id="writing">
          <div className="writing-container">
            {/* Header Section */}
            <div className="writing-header">
              <h1 className="writing-heading">{writingShowcaseSection.title}</h1>
              <p className="subTitle writing-subtitle">
                {writingShowcaseSection.subtitle}
              </p>
              <p className="writing-description">
                {writingShowcaseSection.description}
              </p>
            </div>

            {/* Category Pills */}
            <div className="category-filter">
              <button
                className={`category-pill ${selectedCategory === "All" ? "active" : ""}`}
                onClick={() => this.setState({ selectedCategory: "All" })}
              >
                <i className="fas fa-th"></i> All Stories
              </button>
              {writingShowcaseSection.categories.map((category, index) => (
                <button
                  key={index}
                  className={`category-pill ${selectedCategory === category.name ? "active" : ""}`}
                  onClick={() => this.setState({ selectedCategory: category.name })}
                  style={selectedCategory === category.name ? {
                    backgroundColor: category.color,
                    color: 'white'
                  } : {}}
                >
                  <i className={category.icon}></i> {category.name}
                </button>
              ))}
            </div>

            {/* Featured Articles Grid */}
            <div className="articles-grid">
              {filteredArticles.map((article, index) => (
                <Fade key={index} bottom duration={1500} distance="40px">
                  <div
                    className={`article-card ${hoveredArticle === index ? "hovered" : ""}`}
                    onMouseEnter={() => this.setState({ hoveredArticle: index })}
                    onMouseLeave={() => this.setState({ hoveredArticle: null })}
                  >
                    <div className="article-image-container">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="article-image"
                      />
                      <div className="article-overlay">
                        <span className="read-more-btn">
                          <i className="fas fa-book-open"></i> Read Article
                        </span>
                      </div>
                    </div>
                    
                    <div className="article-content">
                      <div className="article-meta">
                        <span className="article-category">
                          {article.category}
                        </span>
                        <span className="article-date">
                          <i className="far fa-calendar"></i> {article.date}
                        </span>
                        <span className="article-read-time">
                          <i className="far fa-clock"></i> {article.readTime}
                        </span>
                      </div>

                      <h3 className="article-title">{article.title}</h3>
                      <h4 className="article-subtitle">{article.subtitle}</h4>
                      
                      <p className="article-excerpt">{article.excerpt}</p>

                      <div className="article-tags">
                        {article.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="article-tag">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <a href={article.link} className="article-link">
                        Continue Reading <i className="fas fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </Fade>
              ))}
            </div>

            {/* Call to Action */}
            <div className="writing-cta">
              <Fade bottom duration={1500}>
                <h3>Want to read more?</h3>
                <p>Subscribe to get notified about new articles and stories</p>
                <button className="subscribe-btn">
                  <i className="fas fa-envelope"></i> Subscribe to Newsletter
                </button>
              </Fade>
            </div>
          </div>
        </div>
      </Fade>
    );
  }
}

export default WritingShowcase;
export { writingShowcaseSection };
