// 导出备份：从各端点抓取数据合并到单一 JSON
import fs from 'fs';
import fetch from 'node-fetch';

const BASE_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const TOKEN = process.env.STRAPI_ADMIN_TOKEN; // 可选：若需要访问私有数据

async function fetchType(type) {
  const res = await fetch(`${BASE_URL}/api/${type}?pagination[pageSize]=100`, {
    headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}
  });
  if (!res.ok) throw new Error(`Failed to fetch ${type}`);
  return res.json();
}

async function run() {
  const types = ['articles', 'photos', 'videos', 'game-projects', 'work-experiences', 'education'];
  const output = {};
  for (const t of types) {
    try {
      const data = await fetchType(t);
      output[t] = data.data;
    } catch (e) {
      console.error('Error fetching', t, e.message);
    }
  }
  const filename = `backup-${new Date().toISOString().slice(0,10)}.json`;
  fs.writeFileSync(filename, JSON.stringify(output, null, 2));
  console.log('Backup written:', filename);
}

run();
