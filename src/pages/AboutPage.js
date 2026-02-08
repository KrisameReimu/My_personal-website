import React, {useContext} from "react";
import {Link} from "react-router-dom";
import LanguageContext from "../contexts/LanguageContext";
import {getText} from "../utils/i18n";
import {greeting} from "../portfolio";
import "./AboutPage.scss";

export default function AboutPage() {
  const {language} = useContext(LanguageContext);
  const copy = {
    title: {
      zh: "关于我",
      en: "About Me"
    },
    subtitle: {
      zh: "不是一份参数列表，而是一个持续成长的人。",
      en: "Not a list of specs, but a person still in progress."
    },
    intro: {
      zh: "我在香港做研究与创作，也在长期经营自己的数字空间。技术对我来说不是终点，而是一种表达方式: 用它把思考、影像、文字和游戏连接起来，形成一个有温度、可持续更新的个人叙事。",
      en: "I work on research and creative projects in Hong Kong while building a long-term digital home. To me, technology is not the destination. It is a medium that connects writing, visuals, and interactive work into one evolving personal narrative."
    },
    chaptersTitle: {
      zh: "我在做什么",
      en: "What I Build"
    },
    chapters: [
      {
        title: {
          zh: "写作: 把复杂问题讲清楚",
          en: "Writing: clarity over noise"
        },
        body: {
          zh: "我写反思、社会观察和技术相关内容。目标不是制造情绪，而是留下可以被反复阅读、反复讨论的文字。",
          en: "I write reflections, social observations, and tech essays. The goal is not noise, but text worth revisiting."
        }
      },
      {
        title: {
          zh: "影像: 记录人与城市之间的情绪",
          en: "Visuals: emotion between people and cities"
        },
        body: {
          zh: "摄影和视频是我的另一种语言。我关注光线、关系和现场感，尝试让每个片段都能独立讲故事。",
          en: "Photography and video are another language for me. I focus on light, relationships, and atmosphere so each frame can stand as a story."
        }
      },
      {
        title: {
          zh: "交互项目: 把想法做成可体验的作品",
          en: "Interactive projects: ideas you can experience"
        },
        body: {
          zh: "我做游戏和多媒体项目，因为有些表达只有在互动里才能成立。作品是我的方法论，而不是我的标签。",
          en: "I build games and multimedia projects because some ideas only exist through interaction. Work is my method, not my label."
        }
      }
    ],
    nowTitle: {
      zh: "当前关注",
      en: "Current Focus"
    },
    nowItems: [
      {
        zh: "把过去五年的文章系统迁移到网站，形成双语长期档案",
        en: "Migrating five years of writing into a bilingual long-term archive"
      },
      {
        zh: "建立内容脚手架，让网站可以常年稳定更新",
        en: "Building content scaffolding for sustainable long-term updates"
      },
      {
        zh: "把研究、创作与个人叙事整合成统一的表达体系",
        en: "Unifying research, creative output, and personal narrative"
      }
    ],
    lifeTitle: {
      zh: "生活中的我",
      en: "Off-Screen"
    },
    lifeBody: {
      zh: "我喜欢动漫文化，也在现实世界里认真做长期主义。比起“完美人设”，我更在意持续创作、持续迭代，以及和真实的人建立长期连接。",
      en: "I love anime culture and practice long-term thinking in real life. Instead of a polished persona, I value steady creation, honest iteration, and lasting human connections."
    },
    navTitle: {
      zh: "从这里继续认识我",
      en: "Continue Exploring"
    },
    navWriting: {
      zh: "进入文字创作",
      en: "Go to Writing"
    },
    navPhotos: {
      zh: "进入摄影页面",
      en: "Go to Photos"
    },
    navVideos: {
      zh: "进入影像页面",
      en: "Go to Videos"
    },
    resumeHint: {
      zh: "如果你需要正式履历，也可以查看我的 CV。",
      en: "If you need the formal version, my CV is available."
    },
    resumeButton: {
      zh: "查看 CV",
      en: "View CV"
    }
  };

  return (
    <div className="page-container">
      <div className="page-hero about-hero">
        <h1 className="page-title">{getText(copy.title, language)}</h1>
        <p className="page-subtitle">{getText(copy.subtitle, language)}</p>
      </div>

      <section className="about-story">
        <p>{getText(copy.intro, language)}</p>
      </section>

      <section className="about-block">
        <h2>{getText(copy.chaptersTitle, language)}</h2>
        <div className="about-chapter-grid">
          {copy.chapters.map(item => (
            <article className="about-chapter-card" key={item.title.en}>
              <h3>{getText(item.title, language)}</h3>
              <p>{getText(item.body, language)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-block">
        <h2>{getText(copy.nowTitle, language)}</h2>
        <ul className="about-list">
          {copy.nowItems.map(item => (
            <li key={item.en}>{getText(item, language)}</li>
          ))}
        </ul>
      </section>

      <section className="about-block">
        <h2>{getText(copy.lifeTitle, language)}</h2>
        <p>{getText(copy.lifeBody, language)}</p>
      </section>

      <section className="about-block">
        <h2>{getText(copy.navTitle, language)}</h2>
        <div className="about-nav-links">
          <Link to="/writing">{getText(copy.navWriting, language)}</Link>
          <Link to="/photos">{getText(copy.navPhotos, language)}</Link>
          <Link to="/videos">{getText(copy.navVideos, language)}</Link>
        </div>
      </section>

      {greeting.resumeLink && (
        <div className="about-resume-card">
          <p>{getText(copy.resumeHint, language)}</p>
          <a
            href={greeting.resumeLink}
            target="_blank"
            rel="noreferrer"
            className="about-resume-button"
          >
            {getText(copy.resumeButton, language)}
          </a>
        </div>
      )}
    </div>
  );
}
