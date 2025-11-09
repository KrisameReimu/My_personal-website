# CMS Backend (Strapi) Scaffold

本目录用于逐步分离并建立独立的后端内容管理系统（建议未来单独仓库）。当前仍在前端仓库中，便于记忆与迁移脚本开发。后续只需将整个 `cms-backend/` 拷贝到新仓库并运行 `npx create-strapi-app` 生成实际代码即可。

## 🎯 目标
- 提供内容模型定义（双语字段、奖项、里程碑）
- 统一环境变量规范与安全说明
- 可选 Docker 运行（PostgreSQL + Strapi）
- 迁移脚本模板（从现有 `src/data/*.js` 导出并写入 CMS）
- Webhook 与缓存失效策略预留

## 📂 结构
```
cms-backend/
  README.md              # 当前说明
  .env.example           # 环境变量示例（不提交真实值）
  docker-compose.yml     # Strapi + Postgres + Adminer 开发栈
  docs/
    models.md            # 内容模型详细定义
    migration-plan.md    # 分阶段迁移计划
  scripts/
    migrate-articles.js  # 文章迁移示例
    migrate-photos.js    # 摄影迁移示例
    migrate-videos.js    # 视频迁移示例
    migrate-game-projects.js # 游戏项目迁移示例
    export-backup.js     # 导出备份示例
```

## 🧱 初始创建命令（将来在独立仓库执行）
```powershell
pnpm dlx create-strapi-app cms --template quickstart
# 或
npx create-strapi-app@latest cms --quickstart
```

创建完成后将本目录中的 `docs/` 与 `scripts/` 合并到新项目根目录。然后根据 `models.md` 在 Strapi 管理面板中建立 Collection Types 与 Components。

## 🔐 环境变量约定
| 变量 | 用途 | 说明 |
|------|------|------|
| STRAPI_ADMIN_EMAIL | 初始管理员邮箱 | 初始化后端时设置 |
| STRAPI_ADMIN_PASSWORD | 初始管理员密码 | 不提交仓库，CI使用 Secret |
| CLOUDINARY_KEY | Cloudinary API Key | 上传图片（可选） |
| CLOUDINARY_SECRET | Cloudinary API Secret | 上传图片（可选） |
| CLOUDINARY_CLOUD_NAME | 云名称 | 前端也使用 REACT_APP_CLOUDINARY_CLOUD_NAME |
| FRONTEND_BASE_URL | 前端地址 | Webhook校验或CORS |
| WEBHOOK_SECRET | Webhook签名 | 触发前端缓存失效 |

前端使用：
```
REACT_APP_USE_CMS=true
REACT_APP_STRAPI_URL=https://your-strapi.example.com
REACT_APP_CLOUDINARY_CLOUD_NAME=your-cloud
```

## 🚀 运行（Docker 开发）
```powershell
docker compose up -d
# 初次启动后访问 http://localhost:1337/admin 完成注册
```

## 🧬 迁移脚本使用流程
1. 在前端仓库临时新增 `scripts/export-local-data.js` 导出 JSON
2. 将导出的 JSON 放入 `cms-backend/scripts/data-export/`
3. 设置 `.env` 中 `STRAPI_ADMIN_TOKEN`（通过 Strapi Settings → API Tokens 创建）
4. 运行示例：
```powershell
node scripts/migrate-articles.js
```

## 🔄 分阶段迁移
详见 `docs/migration-plan.md`。

## 🛡 安全要点
- Public Role 仅开放 `find` / `findOne`
- 所有写操作使用 API Token（Server Side）
- 启用 CORS 白名单：`localhost:3000` + 生产域名
- 富文本渲染前端使用 DOMPurify（已在前端规划）

## 🪝 Webhooks（预留）
发布内容后 POST → 前端 `/api/revalidate?type=article&id=123&secret=WEBHOOK_SECRET`。

## 🧪 后续测试建议
- 健康检查：`GET /api/articles?pagination[pageSize]=1`
- 草稿隔离：未登录只能看到 `published`
- 国际化扩展：将来若多语言增加 `titleFr` 等平铺字段

## 📦 备份策略（示例）
`node scripts/export-backup.js` → 输出 `backup-YYYYMMDD.json`，结合 cron / GitHub Action 存档。

## ✅ 快速检查清单
- [ ] 内容模型已全部创建
- [ ] Admin Token 已生成
- [ ] CORS 白名单配置
- [ ] 公共权限最小化
- [ ] 测试迁移脚本成功写入至少1条数据
- [ ] 前端切换 `REACT_APP_USE_CMS=true` 正常渲染

---
后续：独立仓库时可添加 CI（GitHub Actions）自动运行备份 + Lint（eslint + strapi lint plugin）。
