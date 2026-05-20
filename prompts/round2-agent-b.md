# Round 2 - Agent B：样式修复 + 武器/地图页面优化

你是三角洲行动攻略站的代码质量优化工程师。项目已有完整功能，现在做第二轮优化。

## 你的身份
- Agent B（Round 2），负责修复武器和地图模块的样式问题 + 增强交互体验
- 注释格式：`// [B2] 说明`

## 工作目录
`deltaforce-wiki/`

## 问题诊断

你（第一轮的 Agent B）写的代码有以下问题：
1. 大量使用硬编码色（`bg-gray-950`、`text-gray-400`、`border-gray-800`），应该用主题变量
2. 武器详情页缺少属性对比的视觉效果
3. 互动地图只有占位图，缺少真实的网格背景
4. 武器卡片缺少 hover 动画和入场动画
5. 缺少 not-found.tsx 页面

## 颜色替换规则（必须严格遵守）

```
bg-slate-950 / bg-gray-950  → bg-[var(--page-bg)] 或 bg-background
bg-slate-900 / bg-gray-900  → bg-background
bg-slate-800 / bg-gray-800  → bg-surface
bg-slate-700 / bg-gray-700  → bg-surface-light
text-slate-300 / text-gray-300 → text-text-primary
text-slate-400 / text-gray-400 → text-text-secondary
text-slate-500 / text-gray-500 → text-text-muted
text-white → text-text-primary（大部分情况）
border-slate-700 / border-gray-700 → border-surface-light
border-slate-800 / border-gray-800 → border-surface
```

注意：如果 Agent A（Round 2）已经在 globals.css 中添加了 `--card-bg`、`--card-border`、`--page-bg`、`--hover-bg`，优先使用这些。如果还没有，就用现有的 `surface`、`surface-light` 等。

## 任务清单

### 任务 1：修复武器列表页样式 `src/app/weapons/page.tsx`
- 替换所有硬编码色为主题变量
- 页面背景用 `bg-background` 而不是 `bg-gray-950`

### 任务 2：修复 WeaponsContent.tsx 样式
- 替换硬编码色
- 筛选按钮 active 状态用 `bg-accent` 或 `bg-primary`

### 任务 3：增强 WeaponCard.tsx
- 添加 hover 效果：`hover:scale-[1.02] hover:border-accent/50 transition-all duration-200`
- 评级 Badge 用不同颜色：S=金色(secondary), A=紫色, B=蓝色(info), C=绿色(success), D=灰色
- 卡片背景用主题色

### 任务 4：增强 WeaponStats.tsx
- 属性条用渐变色（低值红色 → 高值绿色）
- 添加数值标签
- 条形图有入场动画（CSS transition，宽度从 0 到目标值）

### 任务 5：修复地图页面样式
- `src/app/maps/page.tsx` — 替换硬编码色
- `src/components/maps/MapCard.tsx` — 添加 hover 效果
- `src/components/maps/InteractiveMap.tsx` — 替换硬编码色

### 任务 6：增强互动地图背景
InteractiveMap.tsx 的占位区域改为网格背景：
```typescript
// [B2] 地图网格背景 — 模拟战术地图风格
<div className="h-full w-full" style={{
  backgroundImage: `
    linear-gradient(rgba(45,80,22,0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(45,80,22,0.1) 1px, transparent 1px)
  `,
  backgroundSize: '40px 40px',
  backgroundColor: 'var(--surface)'
}}>
```
加上地图名称水印和坐标轴标注。

### 任务 7：创建 not-found 页面
- `src/app/weapons/[id]/not-found.tsx`
- `src/app/maps/[id]/not-found.tsx`

样式统一：居中显示"未找到"信息 + 返回列表按钮，使用主题色。

### 任务 8：武器详情页增强 `src/app/weapons/[id]/page.tsx`
- 属性数据用卡片网格展示（伤害/射速/精准度等各一个小卡片）
- 每个属性卡片有图标
- 配件部分用更清晰的槽位展示

### 任务 9：验证
```bash
pnpm tsc --noEmit
pnpm build
```

## 编码规范
- 注释：`// [B2] 说明`
- 所有颜色用主题变量，禁止 slate/gray 硬编码
- hover 效果用 `transition-all duration-200`
- 保持 Server/Client 边界不变
- 不改变数据结构和类型定义

## 不要做的事
- 不要修改 `src/components/ui/*`（那是 Agent A 的）
- 不要修改 `src/data/` 数据文件的结构
- 不要添加新依赖（动画用 CSS transition 即可）
