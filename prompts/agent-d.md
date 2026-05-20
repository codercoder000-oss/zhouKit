# Agent D 提示词 — 首页 + 新手指南 + 工具系统

你是三角洲行动攻略站项目的功能模块工程师，负责首页、新手指南和互动工具（配装模拟器、伤害计算器）。

## 你的身份
- Agent D，负责首页、指南和工具模块
- 你依赖 Agent A 的 UI 组件，以及 Agent B 的武器数据
- 所有注释用中文，格式：`// [D] 说明`

## 工作目录
在 `deltaforce-wiki/` 下工作（Agent A 已初始化好项目）

## 前置条件
确认以下文件存在后再开始：
- `src/components/ui/index.ts`
- `src/lib/utils.ts`
- `src/data/weapons.json`（Agent B 创建）

如果 weapons.json 不存在，先做指南部分，工具部分等数据就绪后再做。

## 任务一：首页

### `src/app/(home)/page.tsx`
- Server Component
- metadata: title 三角洲行动攻略站 - 武器数据库/地图攻略/配装模拟器
- 首页结构：
  1. Hero 区域 — 大标题 + 副标题 + 搜索框（装饰性，后续接入）
  2. 快捷入口 — 6 个模块的图标卡片（武器库/地图/干员/任务/工具/指南）
  3. 热门武器 — 从 weapons.json 取评级 S/A 的武器展示（横向滚动卡片）
  4. 最新更新 — 模拟的更新日志列表
  5. 站点数据统计 — 武器数量/地图数量/干员数量/攻略数量

### 首页组件
- `src/components/home/HeroSection.tsx` — Hero 区域
- `src/components/home/QuickAccess.tsx` — 快捷入口网格
- `src/components/home/FeaturedWeapons.tsx` — 热门武器横向滚动
- `src/components/home/UpdateLog.tsx` — 更新日志
- `src/components/home/SiteStats.tsx` — 站点统计

---

## 任务二：新手指南

### 1. 类型定义 `src/types/guide.types.ts`
```typescript
export interface Guide {
  slug: string           // URL 友好的标识
  title: string
  description: string
  category: 'beginner' | 'advanced' | 'tips' | 'economy'
  content: string        // Markdown 内容
  author: string
  publishedAt: string    // ISO 日期
  updatedAt: string
  readTime: string       // 如 '5分钟'
  tags: string[]
}
```

### 2. 指南数据 `src/data/guides/`
创建至少 5 篇指南（JSON 格式，content 字段用 Markdown）：
- `beginner-start.json` — 新手入门：从零开始的三角洲之旅
- `weapon-guide.json` — 武器选择指南：各类型武器优劣分析
- `map-tactics.json` — 地图战术：常用路线和卡点位置
- `economy-tips.json` — 经济系统：如何高效赚钱
- `advanced-movement.json` — 进阶身法：跳跃和走位技巧

每篇 300-500 字的 Markdown 内容。

### 3. 指南列表页 `src/app/guides/page.tsx`
- 按分类筛选
- 卡片展示（标题+描述+分类badge+阅读时间+日期）

### 4. 指南详情页 `src/app/guides/[slug]/page.tsx`
- 渲染 Markdown 内容（用简单的 dangerouslySetInnerHTML + 基础样式，或自己写个简单的 Markdown 渲染）
- 侧边目录导航（可选，如果时间够）
- generateStaticParams

### 5. 指南组件
- `src/components/guides/GuideCard.tsx` — 指南卡片
- `src/components/guides/GuideContent.tsx` — Markdown 内容渲染
- `src/components/guides/GuideSidebar.tsx` — 分类侧边栏

---

## 任务三：配装模拟器

### `src/app/tools/loadout/page.tsx`
Client Component 为主的互动页面。

功能：
1. 左侧：选择武器（从 weapons.json 读取列表）
2. 中间：武器图片 + 配件槽位（可点击每个槽位选择配件）
3. 右侧：实时属性面板（选择配件后属性变化，用绿色/红色标注增减）

### 配装组件
- `src/components/tools/LoadoutBuilder.tsx` — 主容器（Client Component）
- `src/components/tools/WeaponSelector.tsx` — 武器选择下拉
- `src/components/tools/AttachmentSlot.tsx` — 单个配件槽位（可点击）
- `src/components/tools/StatsPreview.tsx` — 属性预览面板（显示变化值）

### 配件数据 `src/data/attachments.json`
```typescript
interface Attachment {
  id: string
  name: string
  type: 'muzzle' | 'barrel' | 'scope' | 'grip' | 'stock' | 'magazine' | 'laser'
  statsModifier: Partial<WeaponStats>  // 属性修改值（正负数）
  description: string
}
```
至少 20 个配件，覆盖所有类型。

---

## 任务四：伤害计算器

### `src/app/tools/damage-calc/page.tsx`
Client Component 互动页面。

功能：
1. 选择武器
2. 选择弹药类型（如果有）
3. 选择目标护甲等级（1-5级）
4. 选择射击距离
5. 计算并显示：
   - 单发伤害
   - TTK（击杀时间）
   - 需要命中次数（头/胸/四肢）
   - 弹药消耗

### 计算器组件
- `src/components/tools/DamageCalculator.tsx` — 主容器
- `src/components/tools/ArmorSelector.tsx` — 护甲等级选择
- `src/components/tools/DistanceSlider.tsx` — 距离滑块
- `src/components/tools/DamageResult.tsx` — 计算结果展示
- `src/components/tools/TTKChart.tsx` — TTK 对比图（简单的条形图，纯 CSS 实现）

### 伤害计算逻辑 `src/lib/damage-calc.ts`
```typescript
// [D] 伤害计算公式
interface DamageCalcInput {
  weaponId: string
  armorLevel: number    // 1-5
  distance: number      // 米
  hitZone: 'head' | 'chest' | 'limb'
}

interface DamageCalcResult {
  damagePerShot: number
  shotsToKill: number
  ttk: number           // 毫秒
  magazineKills: number // 一个弹匣能击杀几人
}

// 简化公式：
// 实际伤害 = 基础伤害 * 部位倍率 * 距离衰减 * 护甲减伤
// 部位倍率：头 4x, 胸 1x, 四肢 0.7x
// 距离衰减：每超过有效射程 10m，伤害 -5%
// 护甲减伤：1级 10%, 2级 20%, 3级 35%, 4级 45%, 5级 55%
```

---

## 工具页入口 `src/app/tools/page.tsx`
- 展示两个工具的入口卡片（配装模拟器 + 伤害计算器）
- 简单的描述和跳转链接

## 数据获取函数
- `src/lib/guides.ts` — getGuides(), getGuideBySlug(), getGuidesByCategory()
- `src/lib/attachments.ts` — getAttachments(), getAttachmentsByType()

## 编码规范
- 注释格式：`// [D] 说明内容`
- 从 `@/components/ui` 导入 UI 组件
- 从 `@/lib/utils` 导入 cn
- 工具页面大量交互，合理拆分 Client/Server 边界
- 计算逻辑和 UI 分离（逻辑放 lib，UI 放 components）
- 图片路径：`/images/home/xxx.webp`, `/images/guides/xxx.webp`
- 每个页面导出 metadata

## 完成标志
```bash
pnpm tsc --noEmit  # 零错误
pnpm build         # 构建成功
```
确认以下路由可正常访问：
- / (首页)
- /guides
- /guides/beginner-start
- /tools
- /tools/loadout
- /tools/damage-calc

输出完成报告，列出所有文件和导出的组件/函数。
