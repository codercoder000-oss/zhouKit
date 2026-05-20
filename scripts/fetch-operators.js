const https = require('https');
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'deltaforce-wiki', 'public', 'images', 'operators');
if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });

function download(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode !== 200) { file.close(); reject(new Error(`HTTP ${res.statusCode}`)); return; }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', reject);
  });
}

const operators = [
  { id: 'assault-001', name: 'd-wolf' },
  { id: 'assault-002', name: 'vyron' },
  { id: 'recon-001', name: 'luna' },
  { id: 'recon-002', name: 'stinger' },
  { id: 'support-001', name: 'hackclaw' },
  { id: 'support-002', name: 'sineva' },
  { id: 'engineer-001', name: 'shepherd' },
  { id: 'engineer-002', name: 'uluru' },
];

async function main() {
  console.log('Downloading operator images from official site...\n');
  for (const op of operators) {
    const url = `https://www.playdeltaforce.com/_astro/${op.name}.webp`;
    const filepath = path.join(DIR, `${op.id}.webp`);
    try {
      await download(url, filepath);
      const size = fs.statSync(filepath).size;
      console.log(`  OK: ${op.id}.webp (${op.name}) - ${(size/1024).toFixed(1)} KB`);
    } catch (e) {
      console.log(`  FAIL: ${op.id} (${op.name}) - ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 200));
  }
  console.log('\nDone');
}

main();
