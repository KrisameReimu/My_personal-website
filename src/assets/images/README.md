# 图片资源说明

## 需要添加的图片列表

### 1. 公司/学校 Logo (200x200px 或更大，PNG格式)
- [ ] `polyuLogo.png` - 香港理工大学Logo
- [ ] `oxfordLogo.png` - 牛津大学Logo
- [ ] `ietLogo.png` - IET Logo
- [ ] `bornteaLogo.png` - BornTea Logo

### 2. 奖项图片 (200x200px)
- [ ] `polyuAward.png` - 理工大学奖项图标

### 3. 项目封面图 (1200x675px, 16:9)
- [ ] `genai-feedback.png` - GenAI反馈系统项目
- [ ] `melina-game.png` - Melina Dream of Hero游戏
- [ ] `ecommerce-web.png` - 电商平台项目
- [ ] `multimedia-portfolio.png` - 多媒体作品集

### 4. 游戏开发 (1920x1080px)
- [ ] `melina-game.png` - 游戏主截图
- [ ] `game-placeholder.png` - 未来项目占位符

### 5. 视频缩略图 (1280x720px, 16:9)
- [ ] `video1-thumb.png` - 金奖视频缩略图
- [ ] `video2-thumb.png` - 银奖视频缩略图
- [ ] `video3-thumb.png` - 特别奖视频缩略图

### 6. 摄影作品封面 (1200x800px, 3:2)
- [ ] `urban-cover.png` - 城市摄影封面
- [ ] `portrait-cover.png` - 人像摄影封面
- [ ] `nature-cover.png` - 自然风光封面

### 7. 写作/博客图片 (1200x800px)
- [ ] `blog-ai-creator.png` - AI创作者文章配图
- [ ] `blog-game-journey.png` - 游戏开发之路配图
- [ ] `blog-fullstack-ux.png` - 全栈开发UX文章配图
- [ ] `blog-hk-story.png` - 香港故事配图

## 临时占位符资源

在准备真实图片之前，可以使用以下占位符服务：

1. **via.placeholder.com**
   ```
   https://via.placeholder.com/1200x675/667eea/ffffff?text=Project+Image
   ```

2. **placeholder.com**
   ```
   https://placeholder.com/1200x675
   ```

3. **Unsplash Source (免费高质量图片)**
   ```
   https://source.unsplash.com/1200x675/?technology
   ```

## 快速生成占位符

运行以下命令创建简单的纯色占位符：
```bash
# 需要安装 ImageMagick
convert -size 1200x675 xc:#667eea -gravity center -pointsize 48 -fill white -annotate +0+0 "Project Image" genai-feedback.png
```
