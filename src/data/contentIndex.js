import {
  writingConfig,
  articles,
  featuredArticles,
  categories as writingCategories
} from "./writings";
import {
  videoConfig,
  videos,
  videosByAwardLevel,
  categories as videoCategories,
  awardStats
} from "./videos";
import {
  photographyConfig,
  categories as photoCategories,
  photosByCategory,
  urbanPhotos,
  portraitPhotos,
  naturePhotos,
  photoYearHighlights
} from "./photography";
import {writingYearHighlights, videoYearHighlights} from "./contentYears";

export const writingContent = {
  config: writingConfig,
  articles,
  featuredArticles,
  categories: writingCategories,
  years: writingYearHighlights
};

export const videoContent = {
  config: videoConfig,
  videos,
  videosByAwardLevel,
  categories: videoCategories,
  awardStats,
  years: videoYearHighlights
};

export const photoContent = {
  config: photographyConfig,
  categories: photoCategories,
  photosByCategory,
  urbanPhotos,
  portraitPhotos,
  naturePhotos,
  years: photoYearHighlights
};

export const contentIndex = {
  writing: writingContent,
  video: videoContent,
  photo: photoContent
};

export default contentIndex;
