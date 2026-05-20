# 合并检查提示词 — 给你（主控）用

当 4 个 Agent 都完成后，你用这个提示词做最终质量检查。

## 检查步骤

### 1. 编译和构建
```bash
cd deltaforce-wiki
pnpm tsc --noEmit
pnpm build
```

### 2. 检查注释标记
搜索所有 `[A]` `[B]` `[C]` `[D]` 注释，确认：
- 每个 Agent 只改了自己的文件
- 注释清晰说明了代码意图

### 3. 跨模块引用检查
- 首页（Agent D）是否正确引用了武器数据（Agent B）
- 配装模拟器（Agent D）是否正确读取 weapons.json
- 任务攻略（Agent C）的 relatedMapIds 是否和地图数据（Agent B）对应

### 4. 路由完整性
确认以下路由都能正常构建：
- / 
- /weapons
- /weapons/[id]
- /maps
- /maps/[id]
- /operators
- /operators/[id]
- /quests
- /quests/[id]
- /guides
- /guides/[slug]
- /tools
- /tools/loadout
- /tools/damage-calc

### 5. 类型一致性
- weapon.types.ts 的接口和 weapons.json 数据结构一致
- map.types.ts 和 maps.json 一致
- operator.types.ts 和 operators.json 一致
- quest.types.ts 和 quests.json 一致

### 6. UI 一致性
- 所有页面使用相同的 Card/Badge/Button 组件
- 颜色方案统一（主题色）
- 响应式断点一致

### 7. 需要你补充的部分
Agent 完成基础实现后，你负责：
- 微调样式细节
- 添加页面过渡动画
- 优化 SEO metadata
- 添加 sitemap.xml
- 添加 robots.txt
- 性能优化（图片懒加载、代码分割）
- 最终的视觉打磨
