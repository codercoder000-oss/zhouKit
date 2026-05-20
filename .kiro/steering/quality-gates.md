# 代码质量门禁 - 质量把控规则

## 每个 Agent 提交前必须自检

### 1. TypeScript 编译检查
```bash
pnpm tsc --noEmit
```
- 零错误才能提交
- 不允许用 `// @ts-expect-error` 绕过（除非有充分理由并注释）

### 2. ESLint 检查
```bash
pnpm lint
```
- 零 error，warning 可接受但需注释说明

### 3. 构建检查
```bash
pnpm build
```
- 必须能成功构建

### 4. 文件所有权检查
- 只修改自己负责的文件
- 如果需要修改共享文件，在 commit message 中说明原因

---

## 代码审查清单（我作为质量把控者会检查）

### 类型安全
- [ ] 没有 `any` 类型
- [ ] 所有函数有明确的返回类型（简单箭头函数除外）
- [ ] Props 接口完整定义
- [ ] 数据文件有对应的类型定义

### 组件质量
- [ ] Server/Client Component 划分合理
- [ ] 没有不必要的 `use client`
- [ ] 组件职责单一，不超过 200 行
- [ ] Props 使用解构，有默认值的标注默认值

### 性能
- [ ] 图片使用 `next/image`
- [ ] 大列表有虚拟滚动或分页
- [ ] 没有在渲染中创建新对象/数组（避免不必要的 re-render）
- [ ] 动态导入用于大型组件（如地图、图表）

### SEO
- [ ] 每个页面有 `metadata` 导出
- [ ] 有合理的 `title` 和 `description`
- [ ] 使用语义化 HTML 标签

### 可访问性
- [ ] 图片有 alt 属性
- [ ] 按钮/链接有明确的文字或 aria-label
- [ ] 颜色对比度符合 WCAG AA 标准
- [ ] 键盘可导航

### 样式
- [ ] 移动端优先，响应式完整
- [ ] 使用主题色变量，不硬编码颜色
- [ ] 间距统一使用 Tailwind scale

---

## 共享组件接口契约

### UI 组件 API 约定（Agent 1 实现，其他 Agent 使用）

```typescript
// Button
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

// Card
interface CardProps {
  className?: string
  children: React.ReactNode
  hover?: boolean  // 是否有 hover 效果
}

// Badge
interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md'
  children: React.ReactNode
}

// Input
interface InputProps {
  label?: string
  placeholder?: string
  error?: string
  className?: string
  // 继承原生 input 属性
}

// Modal
interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

// Tabs
interface TabsProps {
  items: { key: string; label: string; content: React.ReactNode }[]
  defaultKey?: string
  onChange?: (key: string) => void
}
```

### 布局组件约定

```typescript
// Header 导航项
const NAV_ITEMS = [
  { label: '武器库', href: '/weapons' },
  { label: '地图', href: '/maps' },
  { label: '干员', href: '/operators' },
  { label: '任务', href: '/quests' },
  { label: '工具', href: '/tools' },
  { label: '指南', href: '/guides' },
]
```

---

## 数据文件格式契约

### 所有数据文件必须遵守的结构

```typescript
// 通用：每个实体必须有 id, name, nameEn
interface BaseEntity {
  id: string       // kebab-case
  name: string     // 中文名
  nameEn: string   // 英文名
}

// 通用：列表页数据需要的字段
interface ListItem extends BaseEntity {
  imageUrl: string
  category: string
  description: string
}
```

---

## 错误处理规范

```typescript
// 页面级错误 — 使用 Next.js error boundary
// src/app/weapons/error.tsx
'use client'
export default function WeaponsError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <h2 className="text-xl font-bold">加载失败</h2>
      <p className="text-gray-400 mt-2">{error.message}</p>
      <button onClick={reset} className="mt-4">重试</button>
    </div>
  )
}

// 数据获取错误 — early return null + 页面 notFound()
import { notFound } from 'next/navigation'

export default function WeaponPage({ params }: { params: { id: string } }) {
  const weapon = getWeaponById(params.id)
  if (!weapon) notFound()
  return <WeaponDetail weapon={weapon} />
}
```

---

## 合并前最终检查

当所有 Agent 完成后，合并到 main 前：
1. 运行完整构建 `pnpm build`
2. 检查所有页面路由是否正常
3. 检查跨模块引用是否正确（首页引用各模块数据）
4. 检查移动端响应式
5. 运行 Lighthouse 检查性能和 SEO 分数
