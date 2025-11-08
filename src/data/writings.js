/**
 * 写作内容数据配置
 * 保持个人IP特色：双语标题、紫色品牌色、叙事性散文
 * 
 * 数据结构设计：
 * - 支持双语（中英文）
 * - 分类：散文(essay)、技术(tech)、创意(creative)、思考(reflection)
 * - 标签系统便于筛选
 * - 支持外部链接（微信公众号等）
 */

import { getImageUrl } from '../config/assets';

export const writingConfig = {
  brandColor: {
    primary: '#764ba2',
    secondary: '#667eea',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  sectionTitle: {
    zh: '文字创作',
    en: 'Writing Showcase'
  },
  subtitle: {
    zh: '用文字记录思考，用故事传递温度',
    en: 'Recording Thoughts, Delivering Warmth Through Stories'
  }
};

export const articles = [
  {
    id: 'melina-dev-journey',
    title: {
      zh: '《Melina》开发日记：当代码遇见梦境',
      en: 'Melina Development Journey: When Code Meets Dreams'
    },
    excerpt: {
      zh: '记录一个独立游戏开发者的创作历程，从空白画布到完整世界的诞生...',
      en: 'Chronicles of an indie game developer\'s creative journey, from blank canvas to a complete world...'
    },
    content: '', // 实际内容可以从Markdown文件加载
    coverImage: getImageUrl('articles/melina-dev/cover.jpg', {width: 800}),
    tags: ['游戏开发', 'Unity', '创作日记', 'Game Dev'],
    category: 'creative',
    publishedDate: '2024-10-15',
    readingTime: 8,
    featured: true,
    externalUrl: '', // 如果发布在微信公众号，可以添加链接
  },
  {
    id: 'ai-education-reflection',
    title: {
      zh: 'AI时代的教育：个性化还是同质化？',
      en: 'Education in AI Era: Personalization or Homogenization?'
    },
    excerpt: {
      zh: '从GenAI反馈系统的开发经验，思考人工智能在教育领域的双刃剑效应...',
      en: 'Reflecting on the double-edged sword of AI in education through developing GenAI Feedback System...'
    },
    content: '',
    coverImage: getImageUrl('articles/ai-education/cover.jpg', {width: 800}),
    tags: ['人工智能', '教育科技', 'AI', 'EdTech'],
    category: 'tech',
    publishedDate: '2024-09-20',
    readingTime: 12,
    featured: true,
    externalUrl: '',
  },
  {
    id: 'city-loneliness',
    title: {
      zh: '城市中的孤独',
      en: 'Solitude in the City'
    },
    excerpt: {
      zh: '在香港的高楼林立中，我们每个人都是一座孤岛...',
      en: 'Among Hong Kong\'s skyscrapers, each of us is an island...'
    },
    content: '',
    coverImage: getImageUrl('articles/city-loneliness/cover.jpg', {width: 800}),
    tags: ['散文', '城市', '心灵', 'Essay'],
    category: 'essay',
    publishedDate: '2024-08-05',
    readingTime: 5,
    featured: false,
    externalUrl: '',
  },
  {
    id: 'photography-philosophy',
    title: {
      zh: '镜头背后的哲学',
      en: 'Philosophy Behind the Lens'
    },
    excerpt: {
      zh: '摄影不仅仅是按下快门，更是对世界的一种理解方式...',
      en: 'Photography is not just pressing the shutter, it\'s a way of understanding the world...'
    },
    content: '',
    coverImage: getImageUrl('articles/photography/cover.jpg', {width: 800}),
    tags: ['摄影', '艺术', '思考', 'Photography'],
    category: 'reflection',
    publishedDate: '2024-07-12',
    readingTime: 6,
    featured: true,
    externalUrl: '',
  },
  {
    id: 'creative-coding',
    title: {
      zh: '创意编程：技术与艺术的交汇点',
      en: 'Creative Coding: Where Technology Meets Art'
    },
    excerpt: {
      zh: '探索程序代码如何成为艺术创作的新媒介...',
      en: 'Exploring how code becomes a new medium for artistic creation...'
    },
    content: '',
    coverImage: getImageUrl('articles/creative-coding/cover.jpg', {width: 800}),
    tags: ['编程', '创意', '艺术', 'Creative Coding'],
    category: 'creative',
    publishedDate: '2024-06-18',
    readingTime: 10,
    featured: false,
    externalUrl: '',
  },
  {
    id: 'oxford-experience',
    title: {
      zh: '牛津夏日：AI与机器学习的学术之旅',
      en: 'Oxford Summer: An Academic Journey in AI and ML'
    },
    excerpt: {
      zh: '在Lady Margaret Hall的三周，不仅仅是知识的汲取，更是视野的开拓...',
      en: 'Three weeks at Lady Margaret Hall was not just about acquiring knowledge, but expanding horizons...'
    },
    content: '',
    coverImage: getImageUrl('articles/oxford/cover.jpg', {width: 800}),
    tags: ['牛津', '机器学习', '学习', 'Oxford', 'AI'],
    category: 'reflection',
    publishedDate: '2024-08-25',
    readingTime: 9,
    featured: true,
    externalUrl: '',
  },
];

// 按分类分组
export const articlesByCategory = {
  essay: articles.filter(a => a.category === 'essay'),
  tech: articles.filter(a => a.category === 'tech'),
  creative: articles.filter(a => a.category === 'creative'),
  reflection: articles.filter(a => a.category === 'reflection'),
};

// 精选文章
export const featuredArticles = articles.filter(a => a.featured);

// 分类元数据
export const categories = [
  {
    id: 'essay',
    name: { zh: '散文随笔', en: 'Essays' },
    description: { 
      zh: '生活的观察与感悟', 
      en: 'Observations and Reflections on Life' 
    },
    icon: '✍️',
    color: '#764ba2'
  },
  {
    id: 'tech',
    name: { zh: '技术洞察', en: 'Tech Insights' },
    description: { 
      zh: 'AI、游戏开发与编程思考', 
      en: 'Thoughts on AI, Game Dev, and Programming' 
    },
    icon: '💻',
    color: '#667eea'
  },
  {
    id: 'creative',
    name: { zh: '创意创作', en: 'Creative Works' },
    description: { 
      zh: '艺术与技术的融合探索', 
      en: 'Exploring the Fusion of Art and Technology' 
    },
    icon: '🎨',
    color: '#9d50bb'
  },
  {
    id: 'reflection',
    name: { zh: '深度思考', en: 'Deep Reflections' },
    description: { 
      zh: '对世界与自我的哲学思考', 
      en: 'Philosophical Thoughts on World and Self' 
    },
    icon: '🤔',
    color: '#6b5b95'
  },
];

const writingsData = {
  writingConfig,
  articles,
  articlesByCategory,
  featuredArticles,
  categories
};

export default writingsData;
