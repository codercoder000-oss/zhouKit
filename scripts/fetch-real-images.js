/**
 * 从 IMFDB 下载三角洲行动真实武器截图
 * 每把武器取 customization screen 截图（最清晰的全貌图）
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
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(filepath);
        return download(res.headers.location, filepath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(filepath);
        return reject(new Error(`HTTP ${res.statusCode}: ${url}`));
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (e) => { file.close(); reject(e); });
  });
}

// IMFDB 图片直链格式：/images/thumb/X/XX/filename/800px-filename
// 或者完整图：/images/X/XX/filename
const weapons = [
  { id: 'ak-47', file: 'DFHO_AKM.jpg' },
  { id: 'm4a1', file: 'DFHO_M4.jpg' },
  { id: 'hk416', file: 'DFHO_HK416.jpg' },
  { id: 'scar-l', file: 'DFHO_SCARH.jpg' },
  { id: 'mp5', file: 'DFHO_MP5A4.jpg' },
  { id: 'vector', file: 'DFHO_Vector.jpg' },
  { id: 'p90', file: 'DFHO_P90.jpg' },
  { id: 'awm', file: 'DFHO_AWM.jpg' },
  { id: 'm24', file: 'DFHO_R700.jpg' },
  { id: 'm870', file: 'DFHO_870.jpg' },
  { id: 'm1911', file: 'DFHO_M1911.jpg' },
  { id: 'glock-18', file: 'DFHO_G18.jpg' },
  { id: 'rpk', file: 'DFHO_M249.jpg' },
  { id: 'svd', file: 'DFHO_SVD.jpg' },
];

async function fetchImageUrl(filename) {
  // IMFDB File 页面 URL
  const pageUrl = `https://www.imfdb.org/wiki/File:${filename}`;
  return new Promise((resolve, reject) => {
    https.get(pageUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        // 从 HTML 中提取完整图片 URL
        const match = data.match(/fullImageLink.*?href="([^"]+)"/);
        if (match) {
          resolve('https://www.imfdb.org' + match[1]);
        } else {
          // 备用：直接构造 URL
          resolve(`https://www.imfdb.org/images/${filename}`);
        }
        resolve(null);
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('=== 下载三角洲行动武器真实截图 ===\n');
  ensureDir(path.join(PUBLIC_DIR, 'weapons'));

  for (const weapon of weapons) {
    const url = `https://www.imfdb.org/images/${weapon.file}`;
    const filepath = path.join(PUBLIC_DIR, 'weapons', `${weapon.id}.jpg`);
    
    try {
      console.log(`  下载 ${weapon.id}...`);
      await download(url, filepath);
      console.log(`  OK: ${weapon.id}.jpg (${fs.statSync(filepath).size} bytes)`);
    } catch (e) {
      console.log(`  FAIL: ${weapon.id} - ${e.message}`);
    }
    
    // 间隔 500ms 避免被封
    await new Promise(r => setTimeout(r, 500));
  }

  console.log('\n=== 完成 ===');
}

main().catch(console.error);
