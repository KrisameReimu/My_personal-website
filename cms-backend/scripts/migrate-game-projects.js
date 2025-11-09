// 游戏项目迁移脚本示例
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const TOKEN = process.env.STRAPI_ADMIN_TOKEN;
const BASE_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const inputPath = path.join(process.cwd(), 'cms-backend', 'scripts', 'data-export', 'gamedev.json');

async function run() {
  if (!TOKEN) throw new Error('Missing STRAPI_ADMIN_TOKEN');
  if (!fs.existsSync(inputPath)) throw new Error('Missing input file gamedev.json');
  const data = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  const projects = data.projects || data; // 兼容不同结构
  for (const g of projects) {
    const payload = { data: {
      titleZh: g.title?.zh,
      titleEn: g.title?.en,
      descriptionZh: g.description?.zh,
      descriptionEn: g.description?.en,
      technologies: g.technologies,
      status: g.status,
      startDate: g.startDate,
      releaseDate: g.releaseDate,
      highlights: g.highlights,
      milestones: g.milestones // 若组件已定义，需要调整为 Strapi 组件结构
    }};
    const res = await fetch(`${BASE_URL}/api/game-projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
      body: JSON.stringify(payload)
    });
    console.log(res.ok ? `Imported game project: ${g.id}` : `Failed game project: ${g.id}`);
  }
}

run();
