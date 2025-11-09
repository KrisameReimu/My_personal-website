# 迁移计划（Phased Migration）

## Phase 0 — 准备
- 创建 Strapi 基础项目（快速启动）
- 配置 Cloudinary Provider（如需）
- 建立 Article / Photo 两个最小模型

## Phase 1 — 文章迁移
- 导出 `data/writings.js` -> JSON
- 使用 `migrate-articles.js` 写入
- 前端切换 `REACT_APP_USE_CMS=true` 仅在开发分支验证
- 验证 slug 路由 & 回退逻辑

## Phase 2 — 摄影 + 视频
- 添加 Photo / Video 模型完整字段
- 迁移缩略图策略：缩略图为空则前端用占位符
- 奖项组件(Award)创建并测试过滤 `awardLevel`

## Phase 3 — GameProject
- 创建 Milestone 组件
- 迁移时间线；确认历史里程碑保留
- 添加技术栈枚举可选（或自由文本）

## Phase 4 — Work & Education
- 从 `portfolio.js` 提取结构化数据
- 保留前端 fallback 避免内容空窗

## Phase 5 — Settings & Webhook
- 创建 SiteSettings 类型
- 发布 Hook -> 前端 revalidate/清缓存

## Phase 6 — 搜索与分析
- 接入 Meilisearch / 简单关键词 LIKE 查询
- 统计 endpoint `/dashboard/summary`

## 回退策略验证
- 人为关闭 CMS：前端自动回退本地
- CMS 超时：`contentAPI` 捕获 + fallback

## 成功判定
- 所有显示 section 在 CMS 模式下加载来源均正确
- 至少一条数据每种类型完成迁移
- Webhook 能触发前端重新读取
