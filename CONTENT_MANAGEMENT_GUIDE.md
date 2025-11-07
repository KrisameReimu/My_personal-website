# 内容管理完全指南

## 📋 快速开始

### 第一步：注册云服务账号

#### Cloudinary（图片托管 - 推荐）
1. 访问 https://cloudinary.com/users/register/free
2. 注册免费账号（10GB存储 + 25GB流量/月）
3. 获取您的 `Cloud Name`（在Dashboard顶部）
4. 更新 `src/config/assets.js` 第8行

#### YouTube（视频托管）
1. 上传视频到 https://studio.youtube.com
2. 获取视频ID（URL中的11位字符）
3. 在portfolio.js中使用：`videoId: "dQw4w9WgXcQ"`

---

## 📸 照片上传流程

### 方法1：Cloudinary Web界面（推荐新手）

```bash
1. 登录 Cloudinary Dashboard
2. 点击 "Media Library" → "Upload"
3. 创建文件夹：
   - photography/urban
   - photography/portrait
   - photography/nature
4. 拖拽照片到对应文件夹
5. 复制图片的 Public ID（例如：photography/urban/photo1）
```

### 方法2：批量上传工具

安装Cloudinary CLI：
```bash
npm install -g cloudinary-cli
cld config

# 批量上传
cld uploader upload ./my-photos/urban/*.jpg folder=photography/urban
```

### 更新portfolio.js：

```javascript
import {getPhotoGallery} from './config/assets';

const photographySection = {
  categories: [
    {
      name: "Urban Photography",
      photos: getPhotoGallery('urban', [
        'hongkong-001.jpg',  // 只写文件名
        'hongkong-002.jpg',
        'tokyo-night.jpg'
      ])
    }
  ]
};
```

---

## 🎬 视频管理流程

### YouTube嵌入示例：

```javascript
import {getVideoEmbedUrl} from './config/assets';

const videoPortfolioSection = {
  videos: [
    {
      title: "Gold Award作品",
      videoUrl: getVideoEmbedUrl('youtube', 'YOUR_VIDEO_ID'),
      thumbnail: getImageUrl('videos/thumbnails/gold-award.jpg')
    }
  ]
};
```

### 获取YouTube视频ID：
```
完整URL: https://www.youtube.com/watch?v=dQw4w9WgXcQ
视频ID:  dQw4w9WgXcQ （问号后面的部分）
```

---

## ✍️ 文章迁移方案

### 选项A：本地Markdown文件

1. 在 `public/articles/` 创建文件：

```markdown
---
title: "我的第一篇技术文章"
titleEn: "My First Tech Article"
date: "2024-11-07"
category: "Tech Insights"
---

# 标题

从微信公众号复制过来的内容...
```

2. 在portfolio.js中引用：

```javascript
const writingShowcaseSection = {
  articles: [
    {
      title: "我的第一篇技术文章",
      filePath: "/articles/my-first-article.md"
    }
  ]
};
```

### 选项B：GitHub独立仓库

1. 创建新仓库：`website-articles`
2. 上传所有文章Markdown文件
3. 在assets.js中更新URL
4. 使用GitHub Raw链接访问

---

## 🎨 项目截图管理

### 推荐结构：

```
Cloudinary文件夹：
/projects
  /melina-game
    cover.jpg          (1200x675 封面)
    screenshot-1.jpg   (1920x1080 截图)
    screenshot-2.jpg
  /genai-feedback
    cover.jpg
    demo.gif          (可以存GIF动图)
```

### 在portfolio.js中使用：

```javascript
import {getImageUrl} from './config/assets';

const bigProjects = {
  projects: [
    {
      projectName: "Melina Dream of Hero",
      image: getImageUrl('projects/melina-game/cover.jpg'),
      screenshots: [
        getImageUrl('projects/melina-game/screenshot-1.jpg'),
        getImageUrl('projects/melina-game/screenshot-2.jpg')
      ]
    }
  ]
};
```

---

## 📊 资源大小参考

| 类型 | 建议尺寸 | 文件大小 | 格式 |
|------|---------|---------|------|
| 项目封面 | 1200×675 | 100-300KB | JPG |
| 照片作品 | 1920×1280 | 300-800KB | JPG |
| 视频缩略图 | 1280×720 | 100-200KB | JPG |
| 文章封面 | 1200×630 | 100-200KB | JPG |
| Logo | 200×200 | 10-30KB | PNG |

**Cloudinary会自动优化，您只需上传高质量原图！**

---

## ⚡ 性能优化技巧

### 1. 响应式图片尺寸

```javascript
// 缩略图（节省流量）
getImageUrl('photo.jpg', {width: 400})

// 全屏查看
getImageUrl('photo.jpg', {width: 1920})
```

### 2. 懒加载

```javascript
// 在Photography组件中
import {LazyLoadImage} from 'react-lazy-load-image-component';

<LazyLoadImage
  src={photo}
  effect="blur"
  threshold={300}
/>
```

### 3. WebP自动转换

Cloudinary自动转换，无需手动处理：
```javascript
getImageUrl('photo.jpg', {format: 'auto'}) 
// 会根据浏览器支持自动返回WebP或JPG
```

---

## 🔄 内容更新工作流

### 日常添加新照片：

```bash
# 1. 上传到Cloudinary的对应文件夹
# 2. 打开 src/portfolio.js
# 3. 在对应数组中添加文件名：

const photographySection = {
  categories: [
    {
      name: "Urban",
      photos: getPhotoGallery('urban', [
        // ... 现有照片
        'new-photo-2024-11-07.jpg'  // 👈 添加这一行
      ])
    }
  ]
};

# 4. git commit & push
# 5. Vercel自动部署
```

### 发布新视频：

```bash
# 1. 上传到YouTube
# 2. 获取视频ID
# 3. 在portfolio.js添加：

videos: [
  // ... 现有视频
  {
    title: "新视频标题",
    videoUrl: getVideoEmbedUrl('youtube', 'NEW_VIDEO_ID'),
    awards: ["Special Award"]
  }
]
```

---

## 💡 进阶技巧

### 自动化脚本（可选）

创建 `scripts/upload-photos.js`：

```javascript
// 批量生成portfolio配置
const fs = require('fs');
const path = require('path');

const photosDir = './photos/urban';
const files = fs.readdirSync(photosDir);

const config = files
  .filter(f => f.endsWith('.jpg'))
  .map(f => `'${f}'`)
  .join(',\n        ');

console.log(`photos: [\n        ${config}\n      ]`);
```

运行：
```bash
node scripts/upload-photos.js
# 复制输出到portfolio.js
```

---

## 📞 常见问题

**Q: Cloudinary免费额度够用吗？**
A: 10GB存储约可容纳2000张高质量照片，25GB流量约支持25,000次访问。对个人网站完全够用。

**Q: 视频一定要用YouTube吗？**
A: 不是。国内可用Bilibili，专业可用Vimeo。只需修改assets.js中的平台配置。

**Q: 如何备份资源？**
A: Cloudinary有导出功能；YouTube可下载原视频；建议本地保留一份高清原件。

**Q: 如何批量替换占位符？**
A: 上传真实资源后，在portfolio.js中找到对应的数组，替换文件名即可。

---

## ✅ 检查清单

上线前确认：

- [ ] Cloudinary账号创建并获取Cloud Name
- [ ] 更新 `src/config/assets.js` 第8行
- [ ] 测试图片链接是否正常访问
- [ ] YouTube视频设置为"公开"或"不公开（链接可访问）"
- [ ] 检查所有外部链接是否有效
- [ ] 测试移动端加载速度

---

## 🚀 下一步行动

1. 立即注册Cloudinary账号
2. 上传5-10张最佳作品测试
3. 更新assets.js配置
4. 在portfolio.js中引用
5. 本地测试 `npm start`
6. 推送到GitHub → Vercel自动部署

**需要帮助？** 参考本指南或随时询问！
