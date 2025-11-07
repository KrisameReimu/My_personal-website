// 占位符图片配置文件
// 在没有真实图片时，可以使用这些在线占位符URL

const placeholderImages = {
  // 个人照片 - 600x600 (用于首页Hero区)
  // 使用专业的头像占位符（可以用unsplash的portrait照片）
  profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",

  // 公司Logo - 200x200
  polyuLogo: "https://via.placeholder.com/200x200/1a1a2e/ffffff?text=PolyU",
  oxfordLogo: "https://via.placeholder.com/200x200/002147/ffffff?text=Oxford",
  ietLogo: "https://via.placeholder.com/200x200/e21836/ffffff?text=IET",
  bornteaLogo: "https://via.placeholder.com/200x200/8B4513/ffffff?text=BornTea",
  polyuAward: "https://via.placeholder.com/200x200/FFD700/000000?text=Award",

  // 项目封面 - 1200x675
  genaiFeedback: "https://via.placeholder.com/1200x675/667eea/ffffff?text=GenAI+Feedback+System",
  melinaGame: "https://via.placeholder.com/1200x675/764ba2/ffffff?text=Melina+Dream+of+Hero",
  ecommerceWeb: "https://via.placeholder.com/1200x675/55198b/ffffff?text=BornTea+eCommerce",
  multimediaPortfolio: "https://via.placeholder.com/1200x675/ea4335/ffffff?text=Multimedia+Works",
  gamePlaceholder: "https://via.placeholder.com/1200x675/4285f4/ffffff?text=Future+Game+Project",

  // 视频缩略图 - 1280x720
  video1Thumb: "https://via.placeholder.com/1280x720/FFD700/000000?text=Gold+Award+Video",
  video2Thumb: "https://via.placeholder.com/1280x720/C0C0C0/000000?text=Silver+Award+Video",
  video3Thumb: "https://via.placeholder.com/1280x720/CD7F32/ffffff?text=Special+Award+Video",

  // 摄影封面 - 1200x800
  urbanCover: "https://source.unsplash.com/1200x800/?city,architecture",
  portraitCover: "https://source.unsplash.com/1200x800/?portrait,people",
  natureCover: "https://source.unsplash.com/1200x800/?nature,landscape",

  // 博客文章图片 - 1200x800
  blogAiCreator: "https://source.unsplash.com/1200x800/?artificial-intelligence,creativity",
  blogGameJourney: "https://source.unsplash.com/1200x800/?game,development",
  blogFullstackUx: "https://source.unsplash.com/1200x800/?web,design",
  blogHkStory: "https://source.unsplash.com/1200x800/?hongkong,city"
};

// 导出配置
export default placeholderImages;

// 使用说明：
// 在 portfolio.js 中，可以这样使用：
// import placeholderImages from './placeholderImages';
// 
// 然后替换 require() 为 placeholderImages 中的对应URL：
// image: placeholderImages.melinaGame
