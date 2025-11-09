// 视频迁移脚本示例
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const TOKEN = process.env.STRAPI_ADMIN_TOKEN;
const BASE_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const inputPath = path.join(process.cwd(), 'cms-backend', 'scripts', 'data-export', 'videos.json');

async function run() {
  if (!TOKEN) throw new Error('Missing STRAPI_ADMIN_TOKEN');
  if (!fs.existsSync(inputPath)) throw new Error('Missing input file videos.json');
  const videos = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  for (const v of videos) {
    const payload = { data: {
      titleZh: v.title?.zh,
      titleEn: v.title?.en,
      descriptionZh: v.description?.zh,
      descriptionEn: v.description?.en,
      platform: v.platform,
      videoId: v.videoId,
      category: v.category,
      publishedDate: v.publishedDate,
      durationSeconds: v.duration,
      tags: v.tags,
      awards: v.awards // 若组件创建后需改成对应 relation / nested 格式
    }};
    const res = await fetch(`${BASE_URL}/api/videos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
      body: JSON.stringify(payload)
    });
    console.log(res.ok ? `Imported video: ${v.id}` : `Failed video: ${v.id}`);
  }
}

run();
