// 资源配置中心 - 管理所有外部资源链接
// 便于统一管理和批量更新

// ===== 内容托管配置 =====
// 当前策略：R2 + YouTube
// 提示：将 R2 public bucket 的访问域名填到 imageBaseUrl

export const CONTENT_SOURCES = {
  imageProvider: "r2",
  imageBaseUrl: "https://img.chenchen-echo.com",
  videoProvider: "youtube"
};

// 图片URL生成器
export const getImageUrl = (path, options = {}) => {
  const {width, height} = options;
  if (CONTENT_SOURCES.imageProvider === "cloudflare-images") {
    const params = new URLSearchParams();
    if (width) params.append("width", width);
    if (height) params.append("height", height);
    return `${CONTENT_SOURCES.imageBaseUrl}/${path}${
      params.toString() ? `?${params.toString()}` : ""
    }`;
  }

  return `${CONTENT_SOURCES.imageBaseUrl}/${path}`;
};

// ===== 视频配置 =====
// 推荐使用 YouTube 或 Bilibili

export const VIDEO_PLATFORMS = {
  youtube: "https://www.youtube.com/embed/",
  bilibili: "https://player.bilibili.com/player.html?bvid=",
  vimeo: "https://player.vimeo.com/video/"
};

export const getVideoEmbedUrl = (platform, videoId) => {
  const provider = platform || CONTENT_SOURCES.videoProvider;
  return VIDEO_PLATFORMS[provider] + videoId;
};

// ===== 文章资源配置 =====

// 方案1: 使用独立GitHub仓库存储文章
export const ARTICLES_BASE_URL =
  "https://raw.githubusercontent.com/KrisameReimu/website-articles/main";

// 方案2: 使用本地public文件夹
export const LOCAL_ARTICLES_PATH = "/articles";

export const getArticleUrl = filename => {
  // 根据环境选择本地或远程
  return process.env.NODE_ENV === "development"
    ? `${LOCAL_ARTICLES_PATH}/${filename}`
    : `${ARTICLES_BASE_URL}/${filename}`;
};

// ===== 照片资源配置 =====

// Cloudinary文件夹结构
export const PHOTO_FOLDERS = {
  urban: "photography/urban",
  portrait: "photography/portrait",
  nature: "photography/nature"
};

// 批量生成照片URLs
export const getPhotoGallery = (category, photoNames) => {
  const folder = PHOTO_FOLDERS[category];
  return photoNames.map(name =>
    getImageUrl(`${folder}/${name}`, {width: 1200, quality: 85})
  );
};

// ===== 项目资源配置 =====

export const PROJECT_ASSETS = {
  melinaGame: {
    cover: "projects/melina/cover.jpg",
    screenshots: [
      "projects/melina/screenshot1.jpg",
      "projects/melina/screenshot2.jpg",
      "projects/melina/screenshot3.jpg"
    ]
  },
  genaiFeedback: {
    cover: "projects/genai/cover.jpg",
    screenshots: [
      "projects/genai/screenshot1.jpg",
      "projects/genai/screenshot2.jpg"
    ]
  }
};

// ===== 使用示例 =====

/*
在 portfolio.js 中使用：

import {getImageUrl, getVideoEmbedUrl, getPhotoGallery} from './config/assets';

const videoPortfolioSection = {
  videos: [
    {
      title: "获奖视频",
      videoUrl: getVideoEmbedUrl('youtube', 'dQw4w9WgXcQ'),
      thumbnail: getImageUrl('videos/thumbnails/video1.jpg', {width: 640})
    }
  ]
};

const photographySection = {
  categories: [
    {
      name: "Urban",
      photos: getPhotoGallery('urban', [
        'hongkong-night-001.jpg',
        'hongkong-night-002.jpg',
        'street-life-001.jpg'
      ])
    }
  ]
};
*/

// ===== 备选方案：其他图床 =====

// imgbb (免费，简单)
export const IMGBB_BASE = "https://i.ibb.co";

// imgur (适合作品集)
export const IMGUR_BASE = "https://i.imgur.com";

// GitHub Assets仓库（完全免费）
export const GITHUB_ASSETS =
  "https://raw.githubusercontent.com/KrisameReimu/website-assets/main";

const assetsConfig = {
  getImageUrl,
  getVideoEmbedUrl,
  getArticleUrl,
  getPhotoGallery
};

export default assetsConfig;
