/**
 * 从 deltaforcedb.com 和官网下载三角洲行动真实图片
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'deltaforce-wiki', 'public', 'images');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function download(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        try { fs.unlinkSync(filepath); } catch(e) {}
        return download(res.headers.location, filepath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        try { fs.unlinkSync(filepath); } catch(e) {}
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (e) => { file.close(); reject(e); });
  });
}

// deltaforcedb.com 武器图片
const DB_BASE = 'https://deltaforcedb.com/assets/images';

const weapons = [
  { id: 'ak-47', url: `${DB_BASE}/weapons/akm.webp` },
  { id: 'm4a1', url: `${DB_BASE}/weapons/m4a1.webp` },
  { id: 'hk416', url: `${DB_BASE}/weapons/k416.webp` },
  { id: 'scar-l', url: `${DB_BASE}/weapons/scar-h.webp` },
  { id: 'mp5', url: `${DB_BASE}/weapons/mp5.webp` },
  { id: 'vector', url: `${DB_BASE}/weapons/vector.webp` },
  { id: 'p90', url: `${DB_BASE}/weapons/p90.webp` },
  { id: 'awm', url: `${DB_BASE}/weapons/awm.webp` },
  { id: 'm24', url: `${DB_BASE}/weapons/m700.webp` },
  { id: 'm870', url: `${DB_BASE}/weapons/m870.webp` },
  { id: 'm1911', url: `${DB_BASE}/weapons/m1911.webp` },
  { id: 'glock-18', url: `${DB_BASE}/weapons/g18.webp` },
  { id: 'rpk', url: `${DB_BASE}/weapons/pkm.webp` },
  { id: 'svd', url: `${DB_BASE}/weapons/svd.webp` },
];

// deltaforcedb.com 地图图片
const maps = [
  { id: 'zero-dam', url: `${DB_BASE}/maps/zerodam.webp` },
  { id: 'longbow-valley', url: `${DB_BASE}/maps/longbow-valley.webp` },
  { id: 'barkhesh', url: `${DB_BASE}/maps/brakkesh.webp` },
  { id: 'space-base', url: `${DB_BASE}/maps/space-city.webp` },
  { id: 'ouroboros', url: `${DB_BASE}/maps/tide-prison.webp` },
];

// 官网干员图片（从 universe 页面提取的 _astro 路径）
const OFFICIAL_BASE = 'https://www.playdeltaforce.com/_astro';
const operators = [
  { id: 'assault-001', url: `${OFFICIAL_BASE}/K416_Assault_Rifle.CDGdh9wF.webp` },
  { id: 'assault-002', url: `${OFFICIAL_BASE}/Vector_Submachine_Gun.8EdYv0-Z.webp` },
  { id: 'recon-001', url: `${OFFICIAL_BASE}/AWM_Sniper_Rifle.Cbxfifpm.webp` },
  { id: 'recon-002', url: `${OFFICIAL_BASE}/M7_Battle.CVjhQtEq.webp` },
  { id: 'support-001', url: `${OFFICIAL_BASE}/PKM_Light_Machine_Gun.mCHyc7bh.webp` },
  { id: 'support-002', url: `${OFFICIAL_BASE}/M250_General_Machine_Gun.B2xTKec_.webp` },
  { id: 'engineer-001', url: `${OFFICIAL_BASE}/Vector_Submachine_Gun.8EdYv0-Z.webp` },
  { id: 'engineer-002', url: `${OFFICIAL_BASE}/K416_Assault_Rifle.CDGdh9wF.webp` },
];

async function downloadBatch(items, category) {
  console.log(`\n[${category}]`);
  ensureDir(path.join(PUBLIC_DIR, category));
  
  let success = 0, fail = 0;
  for (const item of items) {
    const ext = item.url.split('.').pop().split('?')[0];
    const filepath = path.join(PUBLIC_DIR, category, `${item.id}.${ext}`);
    try {
      await download(item.url, filepath);
      const size = fs.statSync(filepath).size;
      if (size < 500) {
        fs.unlinkSync(filepath);
        throw new Error('File too small, likely error page');
      }
      console.log(`  OK: ${item.id}.${ext} (${(size/1024).toFixed(1)} KB)`);
      success++;
    } catch (e) {
      console.log(`  FAIL: ${item.id} - ${e.message}`);
      fail++;
    }
    await new Promise(r => setTimeout(r, 300));
  }
  console.log(`  ${category}: ${success} OK, ${fail} failed`);
}

async function main() {
  console.log('=== 下载三角洲行动真实图片 ===');
  
  await downloadBatch(weapons, 'weapons');
  await downloadBatch(maps, 'maps');
  await downloadBatch(operators, 'operators');
  
  console.log('\n=== 全部完成 ===');
}

main().catch(console.error);
