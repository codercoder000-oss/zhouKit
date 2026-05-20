# [A2] 颜色映射参考表

本文档为其他 Agent 提供硬编码颜色到主题变量的映射参考。

## 背景色映射

| 硬编码色 | 主题变量 | 说明 |
|---------|---------|------|
| `bg-slate-950` / `bg-gray-950` | `bg-page-bg` | 最深页面背景 |
| `bg-slate-900` / `bg-gray-900` | `bg-background` | 主背景色 |
| `bg-slate-800` / `bg-gray-800` | `bg-surface` / `bg-card-bg` | 卡片/浮层背景 |
| `bg-slate-700` / `bg-gray-700` | `bg-surface-light` / `border-card-border` | hover状态或边框 |

## 文字色映射

| 硬编码色 | 主题变量 | 说明 |
|---------|---------|------|
| `text-white` | `text-text-primary` | 主要文字（白色） |
| `text-slate-200` / `text-gray-200` | `text-text-primary` | 主要文字 |
| `text-slate-300` / `text-gray-300` | `text-text-primary` | 主要文字 |
| `text-slate-400` / `text-gray-400` | `text-text-secondary` | 次要文字 |
| `text-slate-500` / `text-gray-500` | `text-text-muted` | 弱化文字 |
| `text-slate-600` / `text-gray-600` | `text-text-muted` | 最弱文字 |

## 边框色映射

| 硬编码色 | 主题变量 | 说明 |
|---------|---------|------|
| `border-slate-700` / `border-gray-700` | `border-card-border` | 卡片边框 |
| `border-slate-800` / `border-gray-800` | `border-surface` | 分隔线/浅边框 |

## Hover 背景映射

| 硬编码色 | 主题变量 | 说明 |
|---------|---------|------|
| `hover:bg-slate-700` | `hover:bg-hover-bg` | 悬停背景 |
| `hover:bg-slate-800` | `hover:bg-surface` | 卡片悬停 |

## 使用示例

```tsx
// 不推荐
<div className="bg-slate-800 border-slate-700 text-gray-400">

// 推荐
<div className="bg-card-bg border-card-border text-text-secondary">
```

## CSS 变量定义

所有主题色定义在 `globals.css` 的 `:root` 中：

```css
:root {
  --card-bg: #1E293B;
  --card-border: #334155;
  --page-bg: #0B1120;
  --hover-bg: #2D3B4F;
  /* ... 其他变量 */
}
```

并在 `@theme inline` 中注册为 Tailwind 类：

```css
@theme inline {
  --color-card-bg: var(--card-bg);
  --color-card-border: var(--card-border);
  /* ... */
}
```
