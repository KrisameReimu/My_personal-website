/**
 * 视频作品数据配置
 * 按奖项级别组织：Gold（金奖）/ Silver（银奖）/ Special（特别奖）
 *
 * 设计特色：
 * - 奖项徽章展示
 * - YouTube/Bilibili嵌入支持
 * - 分类标签系统
 * - 双语标题与描述
 */

import {getImageUrl} from "../config/assets";
import {AwardLevels} from "../types/content.types";

export const videoConfig = {
  sectionTitle: {
    zh: "视频作品",
    en: "Video Portfolio"
  },
  subtitle: {
    zh: "获奖作品集 - 用影像讲述故事",
    en: "Award-Winning Works - Storytelling Through Moving Images"
  },
  awardBadgeColors: {
    gold: "#d4af37",
    silver: "#c0c0c0",
    special: "#764ba2",
    bronze: "#cd7f32"
  }
};

export const videos = [
  {
    id: "promo-video-2024",
    title: {
      zh: "PolyU互联网与多媒体宣传片",
      en: "PolyU IMT Promotional Video"
    },
    description: {
      zh: "为香港理工大学互联网与多媒体技术系制作的宣传视频，展现学系特色与学生风采。该作品获得全人发展基金学生自主项目金奖。",
      en: "Promotional video for PolyU Internet and Multimedia Technologies department, showcasing department features and student life. Awarded Gold Award in Whole-person Development Fund Student-initiated Project."
    },
    platform: "youtube", // or 'bilibili'
    videoId: "YOUR_VIDEO_ID", // 替换为实际视频ID
    thumbnailUrl: getImageUrl("videos/thumbnails/promo-2024.jpg", {
      width: 1280
    }),
    category: "promotional",
    awards: [
      {
        name: "全人发展基金学生自主项目 - 金奖",
        level: AwardLevels.GOLD,
        organization: "The Hong Kong Polytechnic University",
        year: "2024"
      }
    ],
    publishedDate: "2024-05-15",
    duration: 180, // 3分钟
    tags: ["宣传片", "PolyU", "教育", "Promotional"]
  },
  {
    id: "short-film-2023",
    title: {
      zh: "《光影之间》创意短片",
      en: "Between Light and Shadow - Creative Short Film"
    },
    description: {
      zh: "探索城市生活中的孤独与连接，通过光影对比表现现代人的内心世界。获得视频制作项目银奖。",
      en: "Exploring solitude and connection in urban life, expressing the inner world of modern people through light and shadow contrasts. Awarded Silver Award in Video Production Programme."
    },
    platform: "youtube",
    videoId: "YOUR_VIDEO_ID_2",
    thumbnailUrl: getImageUrl("videos/thumbnails/short-film-2023.jpg", {
      width: 1280
    }),
    category: "short-film",
    awards: [
      {
        name: "视频制作项目 - 银奖",
        level: AwardLevels.SILVER,
        organization: "The Hong Kong Polytechnic University",
        year: "2023"
      }
    ],
    publishedDate: "2023-11-20",
    duration: 420, // 7分钟
    tags: ["短片", "艺术", "创意", "Short Film", "Art"]
  },
  {
    id: "documentary-2024",
    title: {
      zh: "《数字时代的人文关怀》纪录片",
      en: "Humanism in Digital Era - Documentary"
    },
    description: {
      zh: "记录科技发展背景下，人与人之间情感连接的变化。深入采访多位教授和学生，探讨技术与人性的平衡。获得特别奖。",
      en: "Documenting the changes in emotional connections between people in the context of technological development. In-depth interviews with professors and students exploring the balance between technology and humanity. Awarded Special Award."
    },
    platform: "youtube",
    videoId: "YOUR_VIDEO_ID_3",
    thumbnailUrl: getImageUrl("videos/thumbnails/documentary-2024.jpg", {
      width: 1280
    }),
    category: "documentary",
    awards: [
      {
        name: "视频制作项目 - 特别奖",
        level: AwardLevels.SPECIAL,
        organization: "The Hong Kong Polytechnic University",
        year: "2024"
      }
    ],
    publishedDate: "2024-03-10",
    duration: 900, // 15分钟
    tags: ["纪录片", "人文", "科技", "Documentary", "Technology"]
  },
  {
    id: "campus-life-2023",
    title: {
      zh: "《我们的PolyU》校园生活记录",
      en: "Our PolyU - Campus Life Documentary"
    },
    description: {
      zh: "记录香港理工大学学生的日常学习与生活，展现多元文化交融的校园氛围。",
      en: "Recording the daily study and life of PolyU students, showcasing the multicultural campus atmosphere."
    },
    platform: "youtube",
    videoId: "YOUR_VIDEO_ID_4",
    thumbnailUrl: getImageUrl("videos/thumbnails/campus-life-2023.jpg", {
      width: 1280
    }),
    category: "documentary",
    awards: [],
    publishedDate: "2023-09-15",
    duration: 300, // 5分钟
    tags: ["校园", "纪录", "Campus", "Documentary"]
  },
  {
    id: "game-dev-vlog",
    title: {
      zh: "《Melina》游戏开发Vlog",
      en: "Melina Game Development Vlog"
    },
    description: {
      zh: "记录Melina游戏的开发过程，分享设计思路、技术挑战和创作心得。",
      en: "Recording the development process of Melina, sharing design concepts, technical challenges, and creative insights."
    },
    platform: "youtube",
    videoId: "YOUR_VIDEO_ID_5",
    thumbnailUrl: getImageUrl("videos/thumbnails/game-vlog.jpg", {width: 1280}),
    category: "promotional",
    awards: [],
    publishedDate: "2024-08-20",
    duration: 600, // 10分钟
    tags: ["游戏开发", "Vlog", "Unity", "Game Dev"]
  }
];

// 按奖项级别分类
export const videosByAwardLevel = {
  gold: videos.filter(v => v.awards.some(a => a.level === AwardLevels.GOLD)),
  silver: videos.filter(v =>
    v.awards.some(a => a.level === AwardLevels.SILVER)
  ),
  special: videos.filter(v =>
    v.awards.some(a => a.level === AwardLevels.SPECIAL)
  ),
  other: videos.filter(v => v.awards.length === 0)
};

// 按分类组织
export const videosByCategory = {
  promotional: videos.filter(v => v.category === "promotional"),
  "short-film": videos.filter(v => v.category === "short-film"),
  documentary: videos.filter(v => v.category === "documentary")
};

// 获奖视频（有任何奖项的视频）
export const awardedVideos = videos.filter(v => v.awards.length > 0);

// 分类元数据
export const categories = [
  {
    id: "promotional",
    name: {zh: "宣传片", en: "Promotional"},
    description: {
      zh: "品牌宣传与活动推广",
      en: "Brand Promotion and Event Marketing"
    },
    icon: "📣",
    color: "#3498db"
  },
  {
    id: "short-film",
    name: {zh: "创意短片", en: "Short Films"},
    description: {
      zh: "艺术创作与故事叙述",
      en: "Artistic Creation and Storytelling"
    },
    icon: "🎬",
    color: "#e74c3c"
  },
  {
    id: "documentary",
    name: {zh: "纪录片", en: "Documentary"},
    description: {
      zh: "真实记录与深度访谈",
      en: "Real Documentation and In-depth Interviews"
    },
    icon: "🎥",
    color: "#27ae60"
  }
];

// 奖项统计
export const awardStats = {
  totalAwards: videos.reduce((sum, v) => sum + v.awards.length, 0),
  goldCount: videosByAwardLevel.gold.length,
  silverCount: videosByAwardLevel.silver.length,
  specialCount: videosByAwardLevel.special.length
};

const videosData = {
  videoConfig,
  videos,
  videosByAwardLevel,
  videosByCategory,
  awardedVideos,
  categories,
  awardStats
};

export default videosData;
