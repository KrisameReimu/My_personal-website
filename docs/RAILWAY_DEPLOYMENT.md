# Railway 后端部署指南 (Backend Deployment Guide)

## 📋 概述 (Overview)

本指南将帮助你使用 **Railway** 部署个人作品集的后端服务（Strapi CMS + PostgreSQL）。

**Railway 优势**：
- ✅ 免费额度充足（$5/月）
- ✅ 一键部署模板
- ✅ 自动HTTPS证书
- ✅ GitHub自动部署
- ✅ 内置PostgreSQL数据库

---

## 🚀 快速部署步骤

### 步骤1：创建Railway账户

1. 访问 [Railway.app](https://railway.app)
2. 使用GitHub账号登录（推荐）
3. 验证邮箱后获取 $5 免费额度

### 步骤2：部署Strapi CMS

#### 方式A：使用Railway模板（推荐）

```bash
# 1. 在Railway仪表板点击 "New Project"
# 2. 选择 "Deploy from Template"
# 3. 搜索 "Strapi" 并选择官方模板
# 4. 配置以下环境变量：

DATABASE_CLIENT=postgres
DATABASE_HOST=${PGHOST}
DATABASE_PORT=${PGPORT}
DATABASE_NAME=${PGDATABASE}
DATABASE_USERNAME=${PGUSER}
DATABASE_PASSWORD=${PGPASSWORD}
DATABASE_SSL=true

APP_KEYS=生成的密钥1,生成的密钥2
API_TOKEN_SALT=生成的密钥3
ADMIN_JWT_SECRET=生成的密钥4
JWT_SECRET=生成的密钥5

NODE_ENV=production
```

**生成密钥命令**（在本地终端运行）：
```bash
# 安装Strapi CLI
npm install -g @strapi/strapi

# 生成密钥（运行5次获取不同密钥）
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

#### 方式B：从GitHub仓库部署

1. 创建新的GitHub仓库存放Strapi项目
2. 在Railway中选择 "Deploy from GitHub"
3. 选择你的Strapi仓库
4. Railway会自动检测并部署

### 步骤3：添加PostgreSQL数据库

```bash
# 在Railway项目中：
# 1. 点击 "New Service"
# 2. 选择 "Database" → "PostgreSQL"
# 3. Railway会自动生成数据库凭据并注入环境变量
```

**自动生成的变量**：
- `PGHOST` - 数据库主机
- `PGPORT` - 端口（默认5432）
- `PGDATABASE` - 数据库名
- `PGUSER` - 用户名
- `PGPASSWORD` - 密码

### 步骤4：配置自定义域名（可选）

```bash
# 在Railway项目设置中：
# 1. 进入 "Settings" → "Domains"
# 2. 点击 "Generate Domain" 获取免费子域名
#    例如：your-cms.railway.app
# 
# 3. 或添加自定义域名：
#    - 输入你的域名（例如 api.yourdomain.com）
#    - 在域名DNS设置中添加CNAME记录：
#      类型: CNAME
#      名称: api
#      值: your-project.railway.app
```

### 步骤5：初始化Strapi管理员

1. 访问你的Railway域名：`https://your-cms.railway.app/admin`
2. 创建第一个管理员账户
3. 完成Strapi初始化向导

---

## 🏗️ Strapi项目结构配置

如果你要创建自定义Strapi项目（而非使用模板）：

### 本地创建Strapi项目

```bash
# 创建新的Strapi项目
npx create-strapi-app@latest my-portfolio-cms --quickstart

# 进入项目目录
cd my-portfolio-cms

# 安装PostgreSQL依赖
npm install pg
```

### 配置数据库连接

编辑 `config/database.js`：

```javascript
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'strapi'),
      user: env('DATABASE_USERNAME', 'strapi'),
      password: env('DATABASE_PASSWORD', 'strapi'),
      ssl: env.bool('DATABASE_SSL', false) && {
        rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
      },
    },
    debug: false,
  },
});
```

### 创建内容类型（Content Types）

在Strapi管理界面中创建以下Collection Types：

#### 1. Article（文章）
```yaml
字段：
  - title_zh (Text, 必填)
  - title_en (Text, 必填)
  - slug (UID, 基于title_en)
  - excerpt_zh (Text)
  - excerpt_en (Text)
  - content_zh (Rich Text)
  - content_en (Rich Text)
  - coverImage (Media)
  - category (Enumeration: essay, tech, creative, reflection)
  - tags (JSON)
  - publishedDate (Date)
  - readingTime (Number)
  - featured (Boolean)
```

#### 2. Photo（照片）
```yaml
字段：
  - title_zh (Text, 必填)
  - title_en (Text, 必填)
  - description_zh (Text)
  - description_en (Text)
  - image (Media, 必填)
  - thumbnail (Media)
  - category (Enumeration: urban, portrait, nature)
  - captureDate (Date)
  - camera (Text)
  - lens (Text)
  - settings (Text)
  - tags (JSON)
  - width (Number)
  - height (Number)
```

#### 3. Video（视频）
```yaml
字段：
  - title_zh (Text, 必填)
  - title_en (Text, 必填)
  - description_zh (Text)
  - description_en (Text)
  - platform (Enumeration: youtube, bilibili)
  - videoId (Text, 必填)
  - thumbnailUrl (Text)
  - category (Enumeration: promotional, short-film, documentary)
  - awards (Component, 可重复)
  - publishedDate (Date)
  - duration (Number)
  - tags (JSON)
```

#### 4. Game Project（游戏项目）
```yaml
字段：
  - title_zh (Text, 必填)
  - title_en (Text, 必填)
  - description_zh (Rich Text)
  - description_en (Rich Text)
  - coverImage (Media)
  - screenshots (Media, 多选)
  - technologies (JSON)
  - status (Enumeration: In Development, Completed, Published, Planning)
  - startDate (Date)
  - releaseDate (Date)
  - milestones (Component, 可重复)
  - highlights (JSON)
```

---

## 🔌 连接前端与后端

### 更新前端环境变量

在 `.env.local` 中添加：

```bash
# CMS配置
REACT_APP_USE_CMS=true
REACT_APP_CMS_PROVIDER=strapi
REACT_APP_STRAPI_URL=https://your-cms.railway.app

# Cloudinary配置（媒体资源）
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name
REACT_APP_CLOUDINARY_API_KEY=your_api_key
```

### 配置Strapi API权限

1. 进入Strapi管理界面
2. 设置 → Roles & Permissions → Public
3. 为以下Content Types启用 `find` 和 `findOne` 权限：
   - Article
   - Photo
   - Video
   - Game-project

### 测试API连接

```bash
# 测试获取文章列表
curl https://your-cms.railway.app/api/articles

# 测试获取单篇文章
curl https://your-cms.railway.app/api/articles/1
```

---

## 📊 Railway监控与维护

### 查看日志

```bash
# 在Railway仪表板：
# 1. 选择你的服务
# 2. 点击 "Deployments"
# 3. 查看实时日志输出
```

### 数据库备份

```bash
# Railway自动提供数据库备份功能
# 在PostgreSQL服务设置中：
# Settings → Backups → Enable Automated Backups
```

### 成本监控

```bash
# 免费额度监控：
# Dashboard → Usage → 查看当月使用量
# 
# 估算成本：
# - Strapi实例：~$5/月（512MB RAM）
# - PostgreSQL：~$5/月（共享实例）
# 总计约 $10/月（超出免费额度后）
```

---

## 🔄 CI/CD自动部署

Railway支持GitHub自动部署：

1. **触发条件**：推送到主分支自动部署
2. **部署流程**：
   - Railway检测到新提交
   - 自动构建Docker镜像
   - 运行健康检查
   - 无缝切换到新版本

**配置自动部署**：
```bash
# Railway会自动监听你的GitHub仓库
# 无需额外配置，每次push即触发部署
```

---

## 🛡️ 安全配置

### 环境变量保护

```bash
# 在Railway中设置：
# Settings → Environment Variables → Add Variable

# 关键变量（不要提交到Git）：
DATABASE_PASSWORD=xxxxxxx
ADMIN_JWT_SECRET=xxxxxxx
JWT_SECRET=xxxxxxx
```

### CORS配置

编辑 `config/middlewares.js`：

```javascript
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https://res.cloudinary.com'],
          'media-src': ["'self'", 'data:', 'blob:', 'https://res.cloudinary.com'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'https://yourdomain.com',
        'https://your-vercel-app.vercel.app',
        'http://localhost:3000' // 开发环境
      ],
      credentials: true,
    },
  },
  // ... 其他中间件
];
```

---

## 🎨 集成Cloudinary媒体库

### 安装Cloudinary插件

```bash
npm install @strapi/provider-upload-cloudinary
```

### 配置上传提供商

创建 `config/plugins.js`：

```javascript
module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});
```

在Railway环境变量中添加：
```bash
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
```

---

## 📝 故障排查

### 问题1：数据库连接失败
```bash
# 检查：
# 1. DATABASE_SSL=true 是否设置
# 2. Railway PostgreSQL服务是否正常运行
# 3. 查看日志中的具体错误信息
```

### 问题2：构建超时
```bash
# 解决：
# 1. 增加Railway实例内存（Settings → Resources）
# 2. 优化依赖（移除不必要的包）
```

### 问题3：API返回403错误
```bash
# 检查：
# 1. Strapi权限设置（Public角色是否开启find权限）
# 2. CORS配置是否正确
# 3. API Token是否有效
```

---

## 🎯 下一步行动

- [ ] 部署Strapi到Railway
- [ ] 创建内容类型
- [ ] 配置API权限
- [ ] 集成Cloudinary
- [ ] 更新前端环境变量
- [ ] 测试API连接
- [ ] 迁移现有数据到CMS

---

## 📚 相关资源

- [Railway官方文档](https://docs.railway.app/)
- [Strapi文档](https://docs.strapi.io/)
- [Cloudinary文档](https://cloudinary.com/documentation)
- [PostgreSQL最佳实践](https://www.postgresql.org/docs/current/index.html)

---

## 💰 成本估算总结

| 服务 | 免费额度 | 付费后成本 |
|------|---------|-----------|
| Railway | $5/月 | $5-10/月 |
| Cloudinary | 25GB存储 + 25GB流量/月 | $0（免费层足够） |
| YouTube/Bilibili | 完全免费 | $0 |
| **总计** | **前期免费** | **~$5-10/月** |

---

**祝部署顺利！如有问题随时查看Railway日志或Strapi社区。** 🚀
