# Round 2 - Agent A：样式统一 + 动画系统 + 性能优化

你是三角洲行动攻略站的代码质量优化工程师。项目已经有了完整的功能实现，现在需要你做第二轮优化。

## 你的身份
- Agent A（Round 2），负责样式统一、动画系统和性能基础设施
- 注释格式：`// [A2] 说明`

## 工作目录
`deltaforce-wiki/`

## 问题诊断

当前代码存在以下问题：
1. Agent B/D 大量使用 `bg-slate-800`、`bg-gray-950`、`text-gray-400` 等硬编码色，没有使用 globals.css 中定义的主题变量（如 `bg-surface`、`text-text-secondary`）
2. 页面切换无过渡动画，卡片无入场效果，用户体验生硬
3. 缺少 loading.tsx 骨架屏
4. 大型 Client Component（互动地图、配装模拟器）未使用动态导入

## 任务清单

### 任务 1：安装动画依赖
```bash
pnpm add motion
```
注意：motion 是 framer-motion 的新版本（更轻量），直接用 `motion` 包。

### 任务 2：创建动画工具组件 `src/components/ui/AnimatedContainer.tsx`
```typescript
'use client'
// [A2] 通用动画容器 - 入场淡入+上移效果
import { motion } from 'motion/react'

interface AnimatedContainerProps {
  children: React.ReactNode
  className?: string
  delay?: number  // 延迟（秒）
}

// 用于列表项的 stagger 动画
// 用于页面区块的入场动画
```
实现 fadeInUp 动画，支持 delay 参数用于列表 stagger 效果。

### 任务 3：创建骨架屏组件 `src/components/ui/Skeleton.tsx`
```typescript
// [A2] 骨架屏组件 - 加载占位
interface SkeletonProps {
  className?: string
  variant?: 'text' | 'card' | 'circle' | 'image'
}
```
使用 Tailwind 的 `animate-pulse` + 主题色 `bg-surface-light`。

### 任务 4：为每个路由添加 loading.tsx
创建以下文件（使用骨架屏组件）：
- `src/app/weapons/loading.tsx` — 武器卡片网格骨架
- `src/app/maps/loading.tsx` — 地图卡片骨架
- `src/app/operators/loading.tsx` — 干员卡片骨架
- `src/app/quests/loading.tsx` — 任务列表骨架
- `src/app/guides/loading.tsx` — 指南列表骨架

每个 loading.tsx 模拟对应页面的布局结构。

### 任务 5：样式统一 — 全局替换硬编码色

在 globals.css 中补充缺失的语义色：
```css
:root {
  /* 补充 */
  --card-bg: #1E293B;        /* 卡片背景 */
  --card-border: #334155;    /* 卡片边框 */
  --page-bg: #0B1120;        /* 页面背景（比 background 更深） */
  --hover-bg: #2D3B4F;       /* hover 背景 */
}
```

然后在 @theme inline 中注册这些颜色。

创建一个样式映射参考文件 `src/styles/color-map.md`（给其他 Agent 参考）：
```
硬编码色 → 主题色 对照表：
bg-slate-950 / bg-gray-950  → bg-page-bg
bg-slate-900 / bg-gray-900  → bg-background
bg-slate-800 / bg-gray-800  → bg-surface 或 bg-card-bg
bg-slate-700 / bg-gray-700  → bg-surface-light 或 border-card-border
text-slate-300 / text-gray-300 → text-text-primary
text-slate-400 / text-gray-400 → text-text-secondary
text-slate-500 / text-gray-500 → text-text-muted
border-slate-700 / border-gray-700 → border-card-border
```

### 任务 6：动态导入大型组件

修改以下文件，将大型 Client Component 改为动态导入：

1. `src/app/maps/[id]/page.tsx` 中的 InteractiveMap：
```typescript
import dynamic from 'next/dynamic'
const InteractiveMap = dynamic(
  () => import('@/components/maps/InteractiveMap').then(mod => ({ default: mod.InteractiveMap })),
  { loading: () => <Skeleton variant="image" className="aspect-video" /> }
)
```

2. `src/app/tools/loadout/page.tsx` 中的 LoadoutBuilder
3. `src/app/tools/damage-calc/page.tsx` 中的 DamageCalculator

### 任务 7：页面过渡模板 `src/components/ui/PageTransition.tsx`
```typescript
'use client'
// [A2] 页面内容入场动画包装器
// 包裹页面主内容，提供统一的入场效果
```

### 任务 8：更新 UI 组件导出
在 `src/components/ui/index.ts` 中导出新组件：
- AnimatedContainer
- Skeleton
- PageTransition

### 任务 9：验证
```bash
pnpm tsc --noEmit
pnpm build
```

## 编码规范
- 注释：`// [A2] 说明`
- 动画要轻量，不影响 FCP/LCP
- 骨架屏要匹配实际页面布局
- 所有新颜色通过 CSS 变量定义，不硬编码

## 不要做的事
- 不要修改其他 Agent 的业务组件内容
- 不要改变现有功能逻辑
- 不要添加不必要的依赖
