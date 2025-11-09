# 内容模型定义（Strapi）

> 保持与前端 `types/content.types.js` 一致，并平铺双语字段 `titleZh/titleEn` 等，避免复杂 i18n 方案过早引入。

## Components
### Award
| 字段 | 类型 | 说明 |
|------|------|------|
| name | string | 奖项名称 |
| level | enum(gold,silver,special,bronze) | 奖项级别 |
| organization | string | 机构 |
| year | string | 年份 |

### Milestone
| 字段 | 类型 | 说明 |
|------|------|------|
| title | string | 标题 |
| description | text | 描述 |
| completedDate | date | 完成日期 |
| status | enum(completed,in-progress,planned) | 状态 |

## Collection Types

### Article
| 字段 | 类型 | 说明 |
|------|------|------|
| titleZh / titleEn | string | 双语标题 |
| excerptZh / excerptEn | string | 双语摘要 |
| contentMarkdown | richtext/markdown | 正文（Markdown） |
| coverImage | media | 封面图 |
| tags | repeatable string | 标签 |
| category | enum(essay,tech,creative,reflection) | 分类 |
| readingTime | integer | 阅读时长（估算） |
| publishedDate | datetime | 发布时间 |
| featured | boolean | 精选标识 |
| externalUrl | string | 外部链接（可选） |
| slug | uid(titleEn) | 唯一访问标识 |
| status | draft/published | 发布状态 |

### Photo
| 字段 | 类型 | 说明 |
|------|------|------|
| titleZh / titleEn | string | 标题 |
| descriptionZh / descriptionEn | text | 描述 |
| image | media | 原图 |
| thumbnail | media | 缩略图（可自动生成） |
| category | enum(urban,portrait,nature) | 分类 |
| captureDate | date | 拍摄日期 |
| exifCamera | string | 相机 |
| exifLens | string | 镜头 |
| exifSettings | string | 参数组合 |
| tags | repeatable string | 标签 |
| width / height | integer | 尺寸（后台任务填充） |
| status | draft/published | 状态 |

### Video
| 字段 | 类型 | 说明 |
|------|------|------|
| titleZh / titleEn | string | 标题 |
| descriptionZh / descriptionEn | text | 描述 |
| platform | enum(youtube,bilibili,vimeo) | 平台 |
| videoId | string | 平台视频ID |
| thumbnail | media | 缩略图 |
| category | enum(promotional,short-film,documentary) | 分类 |
| awards | component(Award, repeatable) | 奖项数组 |
| publishedDate | date | 发布时间 |
| durationSeconds | integer | 时长（秒） |
| tags | repeatable string | 标签 |
| status | draft/published | 状态 |

### GameProject
| 字段 | 类型 | 说明 |
|------|------|------|
| titleZh / titleEn | string | 标题 |
| descriptionZh / descriptionEn | text | 描述 |
| coverImage | media | 封面图 |
| screenshots | media repeatable | 截图 |
| demoVideoUrl | string | 演示视频 URL |
| downloadLink | string | 下载链接 |
| technologies | repeatable string | 技术栈 |
| status | enum(planning,in-development,completed,published) | 状态 |
| milestones | component(Milestone, repeatable) | 里程碑 |
| startDate | date | 开始日期 |
| releaseDate | date | 发布日期 |
| highlights | repeatable string | 亮点 |
| status | draft/published | 发布状态 |

### WorkExperience
| 字段 | 类型 | 说明 |
|------|------|------|
| role | string | 职位 |
| company | string | 公司 |
| companyLogo | media | Logo |
| startDate | date | 开始时间 |
| endDate | date | 结束时间（可空） |
| description | text | 描述 |
| highlights | repeatable string | 亮点 |
| technologies | repeatable string | 技术 |

### Education
| 字段 | 类型 | 说明 |
|------|------|------|
| schoolName | string | 学校 |
| logo | media | Logo |
| degree | string | 学位 |
| major | string | 专业 |
| startDate | date | 开始 |
| endDate | date | 结束 |
| description | text | 描述 |
| highlights | repeatable string | 成就 |
| gpa | decimal | GPA（可选） |

### SiteSettings (可选后期)
| showWritingSection | boolean |
| showPhotographySection | boolean |
| showVideoSection | boolean |
| showGameDevSection | boolean |
| themeOverrides | json | CSS变量覆盖 |

## 索引与优化建议
- Article: index on `slug`, `publishedDate`, `featured`
- Video: index on `category`, `publishedDate`
- GameProject: index on `status`
- Photo: index on `category`, `captureDate`

## 版本与历史（后期）
可添加 `revision` integer + `history` relation（单独 ContentHistory 类型）用于审计。
