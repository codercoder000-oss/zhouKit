# Round 2 - Agent D：SEO 完善 + 首页/工具/指南优化

你是三角洲行动攻略站的代码质量优化工程师。项目已有完整功能，现在做第二轮优化。

## 你的身份
- Agent D（Round 2），负责 SEO 基础设施、首页优化、工具和指南模块的样式修复
- 注释格式：`// [D2] 说明`

## 工作目录
`deltaforce-wiki/`

## 问题诊断

1. 缺少 sitemap.ts 和 robots.ts（SEO 基础）
2. 缺少 JSON-LD 结构化数据
3. 首页搜索框是假的，应该做成客户端过滤跳转
4. 工具页面硬编码色需要替换
5. 指南页面 Markdown 渲染样式不够好
6. 缺少 Open Graph 图片配置

## 颜色替换规则（必须严格遵守）

```
bg-slate-950 / bg-gray-950  → bg-background
bg-slate-900 / bg-gray-900  → bg-background
bg-slate-800 / bg-gray-800  → bg-surface
bg-slate-800/50             → bg-surface/50
bg-slate-700 / bg-gray-700  → bg-surface-light
text-slate-300 / text-gray-300 → text-text-primary
text-slate-400 / text-gray-400 → text-text-secondary
text-slate-500 / text-gray-500 → text-text-muted
text-white → text-text-primary
border-slate-700 / border-gray-700 → border-surface-light
bg-blue-600 → bg-accent 或 bg-info
hover:bg-blue-500 → hover:bg-accent/90
```

## 任务清单

### 任务 1：创建 sitemap.ts `src/app/sitemap.ts`
```typescript
// [D2] 动态生成 sitemap
import { MetadataRoute } from 'next'
import { getWeapons } from '@/lib/weapons'
import { getMaps } from '@/lib/maps'
import { getOperators } from '@/lib/operators'
import { getQuests } from '@/lib/quests'
import { getGuides } from '@/lib/guides'

const BASE_URL = 'https://deltaforce-wiki.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  // 静态页面
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/weapons`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/maps`, ... },
    { url: `${BASE_URL}/operators`, ... },
    { url: `${BASE_URL}/quests`, ... },
    { url: `${BASE_URL}/tools`, ... },
    { url: `${BASE_URL}/guides`, ... },
  ]

  // 动态页面（武器/地图/干员/任务/指南详情）
  const weapons = getWeapons().map(w => ({
    url: `${BASE_URL}/weapons/${w.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
  // ... 同理其他

  return [...staticPages, ...weapons, ...maps, ...operators, ...quests, ...guides]
}
```

### 任务 2：创建 robots.ts `src/app/robots.ts`
```typescript
// [D2] robots.txt 配置
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: 'https://deltaforce-wiki.vercel.app/sitemap.xml',
  }
}
```

### 任务 3：增强根布局 metadata `src/app/layout.tsx`
在现有 metadata 中补充：
```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://deltaforce-wiki.vercel.app'),
  title: {
    default: '三角洲行动攻略站 - 武器数据库/地图攻略/配装模拟器',
    template: '%s | 三角洲行动攻略站',
  },
  description: '...',
  keywords: [...],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: '三角洲行动攻略站',
    title: '三角洲行动攻略站',
    description: '...',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}
```

注意：不要改动 layout.tsx 的 JSX 结构，只改 metadata 对象。

### 任务 4：首页搜索功能 — 改造 HeroSection.tsx
把假搜索框改成真的客户端搜索：
- 输入关键词后，下方显示匹配结果（武器/地图/干员名称模糊匹配）
- 点击结果跳转到对应详情页
- 使用 `useRouter` 跳转
- 数据源：从 weapons.json + maps.json + operators.json 读取名称列表
- 搜索逻辑：简单的 includes 匹配，不需要 Meilisearch

```typescript
// [D2] 搜索数据结构
interface SearchItem {
  id: string
  name: string
  type: 'weapon' | 'map' | 'operator' | 'quest'
  href: string
}
```

### 任务 5：修复工具页面样式
修复以下文件的硬编码色：
- `src/app/tools/page.tsx`
- `src/app/tools/loadout/page.tsx`
- `src/app/tools/damage-calc/page.tsx`
- `src/components/tools/DamageCalculator.tsx`
- `src/components/tools/LoadoutBuilder.tsx`
- `src/components/tools/WeaponSelector.tsx`
- `src/components/tools/ArmorSelector.tsx`
- `src/components/tools/DistanceSlider.tsx`
- `src/components/tools/DamageResult.tsx`
- `src/components/tools/TTKChart.tsx`
- `src/components/tools/AttachmentSlot.tsx`
- `src/components/tools/StatsPreview.tsx`

全部替换为主题变量色。

### 任务 6：修复首页组件样式
- `src/components/home/HeroSection.tsx` — 背景渐变用主题色
- `src/components/home/QuickAccess.tsx` — 替换硬编码色
- `src/components/home/FeaturedWeapons.tsx` — 替换硬编码色
- `src/components/home/UpdateLog.tsx` — 替换硬编码色
- `src/components/home/SiteStats.tsx` — 替换硬编码色

### 任务 7：增强指南详情页 Markdown 样式
在 `src/app/globals.css` 末尾添加 Markdown 内容样式（如果 GuideContent 组件用了 prose 类就不需要）：
```css
/* [D2] Markdown 内容样式 */
.guide-content h2 { ... }
.guide-content h3 { ... }
.guide-content p { ... }
.guide-content ul { ... }
.guide-content code { ... }
.guide-content blockquote { ... }
```
使用主题色，确保暗色主题下可读性好。

### 任务 8：创建 not-found 页面
- `src/app/guides/[slug]/not-found.tsx`
- `src/app/not-found.tsx`（全局 404）

全局 404 页面要有特色：
- 军事风格的"任务失败"主题
- 大号 404 数字
- "返回基地"按钮（回首页）
- 使用主题色

### 任务 9：验证
```bash
pnpm tsc --noEmit
pnpm build
```

## 编码规范
- 注释：`// [D2] 说明`
- 所有颜色用主题变量
- SEO 相关文件放在 `src/app/` 根目录
- 搜索组件保持轻量，不引入搜索库
- 不改变现有组件的 Props 接口

## 不要做的事
- 不要修改 `src/components/ui/*`（Agent A 的）
- 不要修改武器/地图/干员/任务的数据文件
- 不要修改 layout.tsx 的 JSX 结构（只改 metadata）
- 不要添加重型依赖
