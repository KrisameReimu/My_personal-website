// 摄影作品迁移脚本示例
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const TOKEN = process.env.STRAPI_ADMIN_TOKEN;
const BASE_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const inputPath = path.join(process.cwd(), 'cms-backend', 'scripts', 'data-export', 'photos.json');

async function run() {
  if (!TOKEN) throw new Error('Missing STRAPI_ADMIN_TOKEN');
  if (!fs.existsSync(inputPath)) throw new Error('Missing input file photos.json');
  const photos = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  for (const p of photos) {
    const payload = { data: {
      titleZh: p.title?.zh,
      titleEn: p.title?.en,
      descriptionZh: p.description?.zh,
      descriptionEn: p.description?.en,
      category: p.category,
      captureDate: p.captureDate,
      exifCamera: p.exifData?.camera,
      exifLens: p.exifData?.lens,
      exifSettings: p.exifData?.settings,
      tags: p.tags,
      width: p.width,
      height: p.height
    }};
    const res = await fetch(`${BASE_URL}/api/photos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
      body: JSON.stringify(payload)
    });
    console.log(res.ok ? `Imported photo: ${p.id}` : `Failed photo: ${p.id}`);
  }
}

run();
