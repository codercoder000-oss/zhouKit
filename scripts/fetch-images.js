/**
 * 三角洲行动攻略站 - 图片抓取脚本
 * 从 B站 wiki 和官方资源抓取武器/地图/干员图片
 * 
 * 使用方法：node scripts/fetch-images.js
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// 图片保存目录
const PUBLIC_DIR = path.join(__dirname, '..', 'deltaforce-wiki', 'public', 'images');

// 确保目录存在
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// 下载图片
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);
    
    protocol.get(url, { 
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://wiki.biligame.com/'
      } 
    }, (response) => {
      // 处理重定向
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode} for ${url}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`  OK: ${path.basename(filepath)}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// 生成占位 SVG（当真实图片无法获取时）
function generatePlaceholderSVG(name, type, color) {
  const colors = {
    weapon: { bg: '#1a2332', accent: '#E85D04', icon: 'M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121' },
    map: { bg: '#1a2332', accent: '#16A34A', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7' },
    operator: { bg: '#1a2332', accent: '#3B82F6', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  };
  const c = colors[type] || colors.weapon;
  
  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${c.bg}"/>
      <stop offset="100%" style="stop-color:#0f1419"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#bg)"/>
  <text x="200" y="240" text-anchor="middle" fill="${c.accent}" font-size="16" font-family="sans-serif">${name}</text>
  <text x="200" y="140" text-anchor="middle" fill="${c.accent}" font-size="80" font-family="sans-serif" opacity="0.3">${name.charAt(0)}</text>
  <path d="${c.icon}" transform="translate(176, 80) scale(2)" fill="none" stroke="${c.accent}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/>
</svg>`;
}

// 武器数据（对应 weapons.json 中的 ID）
const weapons = [
  { id: 'ak-47', name: 'AK-47' },
  { id: 'm4a1', name: 'M4A1' },
  { id: 'hk416', name: 'HK416' },
  { id: 'scar-l', name: 'SCAR-L' },
  { id: 'mp5', name: 'MP5' },
  { id: 'vector', name: 'Vector' },
  { id: 'p90', name: 'P90' },
  { id: 'awm', name: 'AWM' },
  { id: 'm24', name: 'M24' },
  { id: 'm870', name: 'M870' },
  { id: 'm1911', name: 'M1911' },
  { id: 'glock-18', name: 'Glock-18' },
  { id: 'rpk', name: 'RPK' },
  { id: 'svd', name: 'SVD' },
];

// 地图数据
const maps = [
  { id: 'zero-dam', name: '零号大坝' },
  { id: 'longbow-valley', name: '长弓溪谷' },
  { id: 'barkhesh', name: '巴克什' },
  { id: 'space-base', name: '航天基地' },
  { id: 'ouroboros', name: '衔尾蛇' },
];

// 干员数据
const operators = [
  { id: 'assault-001', name: '红狼' },
  { id: 'assault-002', name: '威龙' },
  { id: 'recon-001', name: '银翼' },
  { id: 'recon-002', name: '疾风' },
  { id: 'support-001', name: '蜂医' },
  { id: 'support-002', name: '深蓝' },
  { id: 'engineer-001', name: '比特' },
  { id: 'engineer-002', name: '牧羊人' },
];

async function main() {
  console.log('=== 三角洲行动攻略站 - 图片生成 ===\n');

  // 创建目录
  ensureDir(path.join(PUBLIC_DIR, 'weapons'));
  ensureDir(path.join(PUBLIC_DIR, 'maps'));
  ensureDir(path.join(PUBLIC_DIR, 'operators'));

  // 生成武器占位图
  console.log('[武器图片]');
  for (const weapon of weapons) {
    const svg = generatePlaceholderSVG(weapon.name, 'weapon');
    const filepath = path.join(PUBLIC_DIR, 'weapons', `${weapon.id}.svg`);
    fs.writeFileSync(filepath, svg);
    console.log(`  OK: ${weapon.id}.svg`);
  }

  // 生成地图占位图
  console.log('\n[地图图片]');
  for (const map of maps) {
    const svg = generatePlaceholderSVG(map.name, 'map');
    const filepath = path.join(PUBLIC_DIR, 'maps', `${map.id}.svg`);
    fs.writeFileSync(filepath, svg);
    console.log(`  OK: ${map.id}.svg`);
  }

  // 生成干员占位图
  console.log('\n[干员图片]');
  for (const op of operators) {
    const svg = generatePlaceholderSVG(op.name, 'operator');
    const filepath = path.join(PUBLIC_DIR, 'operators', `${op.id}.svg`);
    fs.writeFileSync(filepath, svg);
    console.log(`  OK: ${op.id}.svg`);
  }

  console.log('\n=== 完成 ===');
  console.log(`共生成 ${weapons.length + maps.length + operators.length} 张图片`);
  console.log('\n提示：这些是 SVG 占位图，风格统一。');
  console.log('将来获取到真实游戏截图后，替换为 .webp 格式即可。');
  console.log('图片路径格式：/images/weapons/{id}.svg');
}

main().catch(console.error);
