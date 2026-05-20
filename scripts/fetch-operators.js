/**
 * 从 B站 wiki CDN 下载三角洲行动干员真实图片
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'deltaforce-wiki', 'public', 'images', 'operators');
if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });

function download(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode !== 200) { file.close(); try{fs.unlinkSync(filepath)}catch(e){} reject(new Error(`HTTP ${res.statusCode}`)); return; }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (e) => { file.close(); reject(e); });
  });
}

const BASE = 'https://patchwiki.biligame.com/images/deltaoperation2024';

// 干员 ID 对应 B站 wiki CDN 路径
const operators = [
  { id: 'assault-001', name: '红狼', url: `${BASE}/b/b5/tays951l38qnq0vve5mp4jotnkhceoe.jpg` },
  { id: 'assault-002', name: '威龙', url: `${BASE}/1/18/4p6do7eath4r2bx5pfyua1sx2qhcsac.jpg` },
  { id: 'recon-001', name: '银翼', url: `${BASE}/5/5d/pq14vrqjrec43d5emx8pjv85g7se8jy.jpg` },
  { id: 'recon-002', name: '疾风', url: `${BASE}/f/fd/4cjyygm1rdcvushjjzptp6tgi9s2cvt.jpg` },
  { id: 'support-001', name: '蜂医', url: `${BASE}/0/0e/le921g6lb0nz1tc56ch2hh2jt7tmrb1.jpg` },
  { id: 'support-002', name: '深蓝', url: `${BASE}/7/7b/66fjl8mdgoo3w65juy71ymi85stum8w.jpg` },
  { id: 'engineer-001', name: '比特', url: `${BASE}/8/86/3r034acketar9jzpkstwmxag1r67kno.jpg` },
  { id: 'engineer-002', name: '牧羊人', url: `${BASE}/b/bf/6n8160gq0s2hmu5aat2114sort4hee9.jpg` },
];

async function main() {
  console.log('=== 从 B站 wiki 下载干员真实图片 ===\n');
  
  for (const op of operators) {
    const filepath = path.join(DIR, `${op.id}.jpg`);
    try {
      await download(op.url, filepath);
      const size = fs.statSync(filepath).size;
      console.log(`  OK: ${op.id}.jpg (${op.name}) - ${(size/1024).toFixed(0)} KB`);
    } catch (e) {
      console.log(`  FAIL: ${op.id} (${op.name}) - ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 500));
  }
  
  console.log('\nDone');
}

main();
