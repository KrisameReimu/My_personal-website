// 文章迁移脚本示例：将本地导出 JSON 写入 Strapi
// 使用前准备：在同目录放置 data-export/articles.json
// 运行：node scripts/migrate-articles.js

import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const TOKEN = process.env.STRAPI_ADMIN_TOKEN;
const BASE_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const inputPath = path.join(process.cwd(), 'cms-backend', 'scripts', 'data-export', 'articles.json');

async function run() {
  if (!TOKEN) {
    console.error('Missing STRAPI_ADMIN_TOKEN');
    process.exit(1);
  }
  if (!fs.existsSync(inputPath)) {
    console.error('Missing input file:', inputPath);
    process.exit(1);
  }
  const articles = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  for (const a of articles) {
    const payload = { data: {
      titleZh: a.title?.zh,
      titleEn: a.title?.en,
      excerptZh: a.excerpt?.zh,
      excerptEn: a.excerpt?.en,
      contentMarkdown: a.content,
      category: a.category,
      tags: a.tags,
      readingTime: a.readingTime,
      publishedDate: a.publishedDate,
      featured: !!a.featured,
      slug: a.id || a.slug
    }};
    const res = await fetch(`${BASE_URL}/api/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`
      },
      body: JSON.stringify(payload)
    });
    const text = await res.text();
    console.log(res.ok ? `Imported article: ${payload.data.slug}` : `Failed article: ${payload.data.slug} => ${text}`);
  }
}

run();
