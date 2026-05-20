# 编码规范 - 所有 Agent 必须遵守

## 命名规范

### 文件命名
- 组件文件：PascalCase（如 `WeaponCard.tsx`）
- 工具函数/hooks：camelCase（如 `useWeaponFilter.ts`）
- 类型文件：camelCase + `.types.ts` 后缀（如 `weapon.types.ts`）
- 常量文件：camelCase（如 `constants.ts`）
- 页面文件：Next.js 约定（`page.tsx`, `layout.tsx`, `loading.tsx`）

### 变量命名
- 组件：PascalCase
- 函数/变量：camelCase
- 常量：UPPER_SNAKE_CASE
- 类型/接口：PascalCase，接口不加 I 前缀
- 枚举值：PascalCase

## TypeScript 规范

```typescript
// 好 — 明确类型，early return
export function getWeaponById(id: string): Weapon | null {
  const weapon = weapons.find(w => w.id === id)
  if (!weapon) return null
  return weapon
}

// 坏 — any 类型，嵌套 if
export function getWeaponById(id: any) {
  if (id) {
    const weapon = weapons.find(w => w.id === id)
    if (weapon) {
      return weapon
    }
  }
}
```

### 禁止事项
- 禁止使用 `any`，用 `unknown` + 类型守卫代替
- 禁止使用 `@ts-ignore`，用 `@ts-expect-error` + 注释说明原因
- 禁止导出未使用的类型
- 禁止在组件中直接写内联样式

## React/Next.js 规范

### 组件结构
```typescript
// 1. 导入
import { type FC } from 'react'
import { cn } from '@/lib/utils'

// 2. 类型定义
interface WeaponCardProps {
  weapon: Weapon
  className?: string
  onSelect?: (id: string) => void
}

// 3. 组件实现
export const WeaponCard: FC<WeaponCardProps> = ({ weapon, className, onSelect }) => {
  return (
    <div className={cn('rounded-lg border p-4', className)}>
      {/* 内容 */}
    </div>
  )
}
```

### 规则
- Server Component 优先，只在需要交互时用 Client Component
- Client Component 文件顶部必须有 `'use client'`
- 数据获取放在 Server Component 或 Route Handler 中
- 使用 `next/image` 处理图片
- 使用 `next/link` 处理导航

## 样式规范

### Tailwind CSS
- 使用 `cn()` 工具函数合并 className
- 响应式断点顺序：默认(mobile) → sm → md → lg → xl
- 颜色使用 CSS 变量（通过 Tailwind 主题配置）
- 间距使用 Tailwind 的 spacing scale，不写任意值

### 主题色
```
primary: 军事绿 (#2D5016)
secondary: 沙漠黄 (#C4A35A)
accent: 战术橙 (#E85D04)
background: 深灰 (#0F1419)
surface: 中灰 (#1A2332)
text: 浅灰白 (#E8EAED)
```

## 数据规范

### JSON 数据文件
- 放在 `src/data/` 目录下
- 每个数据类型一个文件（如 `weapons.json`, `maps.json`）
- 必须有对应的 TypeScript 类型定义
- ID 使用 kebab-case（如 `ak-47`, `m4a1-carbine`）

### 数据结构示例
```typescript
// src/types/weapon.types.ts
export interface Weapon {
  id: string                    // kebab-case 唯一标识
  name: string                  // 中文名
  nameEn: string                // 英文名
  category: WeaponCategory      // 武器类别
  caliber: string               // 口径
  stats: WeaponStats            // 属性数据
  attachments: AttachmentSlot[] // 配件槽位
  imageUrl: string              // 图片路径
  description: string           // 描述
}
```

## Git 规范

### 分支命名
- feature/agent{N}-{模块名}（如 `feature/agent1-weapons`）
- fix/agent{N}-{描述}
- 每个 agent 只在自己的分支上工作

### Commit 格式
```
feat(weapons): 添加武器列表页面
fix(maps): 修复地图缩放问题
style(ui): 统一按钮样式
data(weapons): 更新 AK-47 数据
```

## 导入路径规范

使用路径别名，统一用 `@/` 前缀：
```typescript
import { Weapon } from '@/types/weapon.types'
import { WeaponCard } from '@/components/weapons/WeaponCard'
import { getWeapons } from '@/lib/db/weapons'
import { cn } from '@/lib/utils'
```

## 注释规范
- 代码注释用中文
- 复杂逻辑必须写注释说明意图
- 组件 Props 用 JSDoc 注释
- TODO 格式：`// TODO(agent1): 描述`
