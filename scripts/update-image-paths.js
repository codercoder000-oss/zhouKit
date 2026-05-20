/**
 * 更新数据文件中的 imageUrl，优先使用 .webp（真实图），fallback 到 .svg
 */
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'deltaforce-wiki', 'src', 'data');
const PUBLIC_DIR = path.join(__dirname, '..', 'deltaforce-wiki', 'public', 'images');

function getImagePath(category, id) {
  // 优先 webp
  if (fs.existsSync(path.join(PUBLIC_DIR, category, `${id}.webp`))) {
    return `/images/${category}/${id}.webp`;
  }
  // 然后 jpg
  if (fs.existsSync(path.join(PUBLIC_DIR, category, `${id}.jpg`))) {
    return `/images/${category}/${id}.jpg`;
  }
  // fallback svg
  if (fs.existsSync(path.join(PUBLIC_DIR, category, `${id}.svg`))) {
    return `/images/${category}/${id}.svg`;
  }
  return `/images/${category}/${id}.webp`;
}

function updateFile(filename, key, category) {
  const filepath = path.join(DATA_DIR, filename);
  const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  const items = data[key];
  if (!items) return;

  let count = 0;
  for (const item of items) {
    const newPath = getImagePath(category, item.id);
    if (item.imageUrl !== newPath) {
      item.imageUrl = newPath;
      count++;
    }
  }

  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`${filename}: updated ${count} paths`);
}

console.log('Updating image paths to use real images where available:\n');
updateFile('weapons.json', 'weapons', 'weapons');
updateFile('maps.json', 'maps', 'maps');
updateFile('operators.json', 'operators', 'operators');
console.log('\nDone');
