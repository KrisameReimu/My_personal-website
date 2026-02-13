import {communityAPI} from "./communityAPI";
import {getArticles, getGameProjects, getPhotos, getVideos} from "./contentAPI";

const fetchJson = async url => {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
};

const normalize = value =>
  String(value || "")
    .toLowerCase()
    .replace(/[\s\-_/]+/g, " ")
    .trim();

const scoreMatch = (query, fields) => {
  if (!query) return 0;
  const needle = normalize(query);
  if (!needle) return 0;

  let score = 0;
  fields.forEach(field => {
    const hay = normalize(field);
    if (!hay) return;
    if (hay.includes(needle)) {
      score += needle.length * 2;
    }
    const tokens = needle.split(" ");
    tokens.forEach(token => {
      if (token.length >= 2 && hay.includes(token)) score += token.length;
    });
  });

  return score;
};

const getFallbackNow = () => ({
  weekOf: "2026-02-09",
  focus: {
    zh: "把个人网站升级为 AI 时代的长期内容资产",
    en: "Upgrade this website into a long-term AI-era content asset"
  },
  doing: {
    zh: "完成 Now/Lab/Roadmap/Dashboard 的持续更新机制",
    en: "Build a sustainable update loop for Now/Lab/Roadmap/Dashboard"
  },
  notDoing: {
    zh: "不做泛流量型内容，不追热点堆叠",
    en: "No generic traffic content and no trend chasing"
  },
  blockers: {
    zh: "内容产能与功能迭代并行，需严格聚焦",
    en: "Balancing publishing and product iteration requires focus"
  },
  nextActions: {
    zh: "每周更新实验日志并迭代 Ask Echo 引用效果",
    en: "Publish weekly experiment logs and improve Ask Echo citations"
  }
});

const getFallbackRoadmap = () => [
  {
    id: "m1-core-pages",
    area: "foundation",
    title: {
      zh: "M1：上线 Now/Lab/Roadmap 页面",
      en: "M1: Launch Now/Lab/Roadmap"
    },
    status: "in-progress",
    priority: 1,
    targetMonth: "2026-02",
    progress: 65
  },
  {
    id: "m3-ask",
    area: "ai",
    title: {
      zh: "M3：Ask Echo v1（检索+引用）",
      en: "M3: Ask Echo v1 (retrieval + citation)"
    },
    status: "planned",
    priority: 1,
    targetMonth: "2026-04",
    progress: 0
  },
  {
    id: "m4-loop",
    area: "data",
    title: {
      zh: "M4：订阅+埋点+Dashboard",
      en: "M4: Subscription + Events + Dashboard"
    },
    status: "planned",
    priority: 2,
    targetMonth: "2026-05",
    progress: 0
  }
];

const getFallbackExperiments = () => [
  {
    id: "exp-ai-001",
    pillar: "ai-engineering",
    status: "building",
    title: {
      zh: "Ask Echo 引用式问答",
      en: "Ask Echo citation-based answers"
    },
    hypothesis: {
      zh: "附带来源的回答更容易获得信任",
      en: "Answers with explicit sources are more trusted"
    },
    method: {
      zh: "从站内内容索引召回并输出来源片段",
      en: "Retrieve from site content indexes and output citation snippets"
    },
    result: {
      zh: "已完成 v1 可用版本",
      en: "A usable v1 has been delivered"
    },
    failureNotes: {
      zh: "长尾查询召回率仍需提升",
      en: "Long-tail query recall still needs improvement"
    },
    decision: {
      zh: "先提升覆盖率再升级复杂检索",
      en: "Improve coverage first, then evolve retrieval complexity"
    },
    publishedAt: "2026-02-12"
  }
];

export const getNowLatest = async () => {
  if (communityAPI.isEnabled()) {
    try {
      const remote = await communityAPI.getNowLatest();
      if (remote?.ok && remote.now) return remote.now;
    } catch {
      // fall through
    }
  }
  const fileData = await fetchJson("/content/siteos/now.latest.json");
  return fileData || getFallbackNow();
};

export const getRoadmap = async () => {
  if (communityAPI.isEnabled()) {
    try {
      const remote = await communityAPI.getRoadmap();
      if (remote?.ok && Array.isArray(remote.roadmap)) return remote.roadmap;
    } catch {
      // fall through
    }
  }
  const fileData = await fetchJson("/content/siteos/roadmap.json");
  if (Array.isArray(fileData)) return fileData;
  return getFallbackRoadmap();
};

export const getExperiments = async ({pillar, status, limit = 50} = {}) => {
  if (communityAPI.isEnabled()) {
    try {
      const remote = await communityAPI.getExperiments({pillar, status, limit});
      if (remote?.ok && Array.isArray(remote.experiments)) {
        return remote.experiments;
      }
    } catch {
      // fall through
    }
  }

  const fileData = await fetchJson("/content/siteos/experiments.json");
  let list = Array.isArray(fileData) ? fileData : getFallbackExperiments();
  if (pillar) list = list.filter(item => item.pillar === pillar);
  if (status) list = list.filter(item => item.status === status);
  return list.slice(0, limit);
};

export const getPublicDashboard = async () => {
  if (communityAPI.isEnabled()) {
    try {
      const remote = await communityAPI.getPublicDashboard();
      if (remote?.ok && remote.dashboard) return remote.dashboard;
    } catch {
      // fall through
    }
  }

  const fileData = await fetchJson("/content/siteos/dashboard.public.json");
  if (fileData) return fileData;

  return {
    totals: {
      comments: 0,
      favorites: 0,
      subscribers: 0,
      events: 0,
      askQueries: 0
    },
    updatedAt: new Date().toISOString()
  };
};

export const subscribeEmail = async ({
  email,
  locale = "en",
  source = "site"
}) => {
  if (!communityAPI.isEnabled()) {
    return {ok: false, reason: "api_not_enabled"};
  }
  try {
    return await communityAPI.subscribe({email, locale, source});
  } catch {
    return {ok: false, reason: "network_error"};
  }
};

export const trackSiteEvent = async payload => {
  if (!communityAPI.isEnabled()) return;
  try {
    await communityAPI.trackEvent(payload);
  } catch {
    // best effort
  }
};

const buildCorpus = async language => {
  const [articles, videos, photos, projects] = await Promise.all([
    getArticles(),
    getVideos(),
    getPhotos(),
    getGameProjects()
  ]);

  const pickText = value => {
    if (!value) return "";
    if (typeof value === "string") return value;
    return value[language] || value.en || value.zh || "";
  };

  const articleItems = (articles || []).map(item => ({
    id: `article:${item.slug || item.id}`,
    title: pickText(item.title),
    snippet: pickText(item.excerpt),
    url: `/articles/${item.slug || item.id}`,
    tags: item.tags || []
  }));

  const videoItems = (videos || []).map(item => ({
    id: `video:${item.id}`,
    title: pickText(item.title),
    snippet: pickText(item.description),
    url: "/videos",
    tags: item.tags || []
  }));

  const photoItems = (photos || []).map(item => ({
    id: `photo:${item.id}`,
    title: pickText(item.title),
    snippet: pickText(item.description),
    url: "/photos",
    tags: item.tags || []
  }));

  const projectItems = (projects || []).map(item => ({
    id: `game:${item.id}`,
    title: pickText(item.title),
    snippet: pickText(item.description),
    url: "/game-dev",
    tags: item.technologies || []
  }));

  return [...articleItems, ...videoItems, ...photoItems, ...projectItems];
};

export const askEchoQuery = async ({query, language = "en", userId}) => {
  const corpus = await buildCorpus(language);
  const ranked = corpus
    .map(item => {
      const score = scoreMatch(query, [
        item.title,
        item.snippet,
        (item.tags || []).join(" ")
      ]);
      return {...item, score};
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const candidates = ranked.map(item => ({
    title: item.title,
    url: item.url,
    snippet: item.snippet
  }));

  if (communityAPI.isEnabled()) {
    try {
      const remote = await communityAPI.askQuery({
        query,
        language,
        userId,
        candidates
      });
      if (remote?.ok) {
        return {
          ok: true,
          answer: remote.answer,
          citations: remote.citations || candidates,
          confidence: remote.confidence ?? 0,
          fallback: Boolean(remote.fallback)
        };
      }
    } catch {
      // fall through to local fallback
    }
  }

  if (!candidates.length) {
    return {
      ok: true,
      answer:
        language === "zh"
          ? "我暂时没有找到完全匹配的内容。建议先看 Writing、Lab 与 Roadmap。"
          : "I could not find strong matches yet. Start with Writing, Lab, and Roadmap.",
      citations: [],
      confidence: 0,
      fallback: true
    };
  }

  return {
    ok: true,
    answer:
      language === "zh"
        ? `我找到 ${candidates.length} 条与你问题最相关的站内内容，最推荐先看《${candidates[0].title}》。`
        : `I found ${candidates.length} relevant sources from your site. Start with "${candidates[0].title}" first.`,
    citations: candidates,
    confidence: Math.min(0.9, 0.45 + candidates.length * 0.15),
    fallback: false
  };
};

const siteOSAPI = {
  getNowLatest,
  getRoadmap,
  getExperiments,
  getPublicDashboard,
  subscribeEmail,
  trackSiteEvent,
  askEchoQuery
};

export default siteOSAPI;
