/**
 * 更新数据文件中的 imageUrl 路径，从 .webp 改为 .svg
 */
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'deltaforce-wiki', 'src', 'data');

function updateFile(filename, key) {
  const filepath = path.join(DATA_DIR, filename);
  const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  
  const items = data[key];
  if (!items) {
    console.log(`  跳过 ${filename}：没有 ${key} 字段`);
    return;
  }

  let count = 0;
  for (const item of items) {
    if (item.imageUrl && item.imageUrl.endsWith('.webp')) {
      item.imageUrl = item.imageUrl.replace('.webp', '.svg');
      count++;
    }
    // 处理地图的 mapImageUrl
    if (item.mapImageUrl && item.mapImageUrl.endsWith('.webp')) {
      item.mapImageUrl = item.mapImageUrl.replace('.webp', '.svg');
    }
    // 处理干员技能图片
    if (item.skills) {
      for (const skill of item.skills) {
        if (skill.imageUrl && skill.imageUrl.endsWith('.webp')) {
          skill.imageUrl = skill.imageUrl.replace('.webp', '.svg');
        }
      }
    }
  }

  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`  ${filename}: 更新了 ${count} 条 imageUrl`);
}

console.log('更新 imageUrl 路径 (.webp -> .svg):\n');
updateFile('weapons.json', 'weapons');
updateFile('maps.json', 'maps');
updateFile('operators.json', 'operators');
console.log('\n完成');
