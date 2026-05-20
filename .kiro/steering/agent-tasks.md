# Agent 任务分配 - 4 个 Agent 并行开发

## 核心原则
- 每个 Agent 负责独立模块，文件不交叉
- 共享依赖（types/ui组件/lib）由 Agent 1 先建好骨架，其他 Agent 在此基础上扩展
- 冲突区域（共享文件）通过明确的接口约定避免冲突

---

## Agent 1：基础架构 + 武器系统

### 职责
负责项目初始化、基础设施搭建、武器数据库模块

### 任务清单
1. 项目初始化（Next.js + TypeScript + Tailwind + ESLint + Prettier）
2. 创建 `src/lib/utils.ts`（cn 函数等通用工具）
3. 创建 `src/components/ui/` 基础组件（Button, Card, Input, Badge, Modal, Tabs）
4. 创建 `src/components/layout/`（Header, Footer, Sidebar, MainLayout）
5. 创建 `src/types/` 所有类型定义文件（weapon/map/operator/quest 的类型骨架）
6. 创建 `tailwind.config.ts` 主题配置
7. 创建 `src/app/layout.tsx` 根布局
8. 实现武器数据库模块：
   - `src/data/weapons.json`（至少 10 把武器的完整数据）
   - `src/app/weapons/page.tsx`（武器列表页）
   - `src/app/weapons/[id]/page.tsx`（武器详情页）
   - `src/components/weapons/WeaponCard.tsx`
   - `src/components/weapons/WeaponStats.tsx`
   - `src/components/weapons/WeaponFilter.tsx`
   - `src/components/weapons/AttachmentTree.tsx`

### 文件所有权
```
src/lib/utils.ts          ← 建好后其他 Agent 只读不改
src/components/ui/*       ← 建好后其他 Agent 只用不改
src/components/layout/*   ← 建好后其他 Agent 只用不改
src/types/*               ← 建好骨架，其他 Agent 可在自己的类型文件中扩展
src/app/layout.tsx        ← 独占
src/app/weapons/**        ← 独占
src/components/weapons/** ← 独占
src/data/weapons.json     ← 独占
tailwind.config.ts        ← 独占
```

---

## Agent 2：地图系统 + 互动地图

### 职责
负责地图攻略模块，包括互动地图功能

### 任务清单
1. 实现地图列表页 `src/app/maps/page.tsx`
2. 实现地图详情页 `src/app/maps/[id]/page.tsx`
3. 实现互动地图组件（基于 Leaflet.js）：
   - `src/components/maps/InteractiveMap.tsx`
   - `src/components/maps/MapMarker.tsx`
   - `src/components/maps/MapLegend.tsx`
   - `src/components/maps/MapControls.tsx`
4. 创建地图数据 `src/data/maps.json`
5. 创建地图标记点数据 `src/data/map-markers.json`
6. 实现地图相关类型 `src/types/map.types.ts`

### 文件所有权
```
src/app/maps/**           ← 独占
src/components/maps/**    ← 独占
src/data/maps.json        ← 独占
src/data/map-markers.json ← 独占
src/types/map.types.ts    ← 独占
```

### 依赖
- 等 Agent 1 完成 `src/components/ui/*` 和 `src/lib/utils.ts` 后开始页面开发
- 可以先并行开发数据文件和类型定义

---

## Agent 3：干员系统 + 任务攻略

### 职责
负责干员（角色）系统和任务攻略模块

### 任务清单
1. 实现干员列表页 `src/app/operators/page.tsx`
2. 实现干员详情页 `src/app/operators/[id]/page.tsx`
3. 实现干员组件：
   - `src/components/operators/OperatorCard.tsx`
   - `src/components/operators/OperatorSkills.tsx`
   - `src/components/operators/OperatorCompare.tsx`
4. 创建干员数据 `src/data/operators.json`
5. 实现任务攻略：
   - `src/app/quests/page.tsx`
   - `src/app/quests/[id]/page.tsx`
   - `src/components/quests/QuestCard.tsx`
   - `src/components/quests/QuestFlow.tsx`（任务流程图）
6. 创建任务数据 `src/data/quests.json`
7. 类型定义 `src/types/operator.types.ts` 和 `src/types/quest.types.ts`

### 文件所有权
```
src/app/operators/**        ← 独占
src/app/quests/**           ← 独占
src/components/operators/** ← 独占
src/components/quests/**    ← 独占
src/data/operators.json     ← 独占
src/data/quests.json        ← 独占
src/types/operator.types.ts ← 独占
src/types/quest.types.ts    ← 独占
```

### 依赖
- 等 Agent 1 完成 UI 组件后开始页面开发
- 类型定义和数据文件可以先并行

---

## Agent 4：工具系统 + 首页 + 新手指南

### 职责
负责配装模拟器、伤害计算器、首页和新手指南

### 任务清单
1. 实现首页 `src/app/(home)/page.tsx`
2. 实现新手指南：
   - `src/app/guides/page.tsx`
   - `src/app/guides/[slug]/page.tsx`
3. 创建指南内容 `src/data/guides/`（Markdown 文件）
4. 实现配装模拟器：
   - `src/app/tools/loadout/page.tsx`
   - `src/components/tools/LoadoutBuilder.tsx`
   - `src/components/tools/AttachmentSlot.tsx`
   - `src/components/tools/StatsPreview.tsx`
5. 实现伤害计算器：
   - `src/app/tools/damage-calc/page.tsx`
   - `src/components/tools/DamageCalculator.tsx`
   - `src/components/tools/ArmorSelector.tsx`
   - `src/components/tools/TTKChart.tsx`
6. 类型定义 `src/types/guide.types.ts` 和 `src/types/tool.types.ts`

### 文件所有权
```
src/app/(home)/**           ← 独占
src/app/guides/**           ← 独占
src/app/tools/**            ← 独占
src/components/tools/**     ← 独占
src/data/guides/**          ← 独占
src/types/guide.types.ts    ← 独占
src/types/tool.types.ts     ← 独占
```

### 依赖
- 首页需要引用其他模块的数据（武器/地图/干员），使用只读导入
- 配装模拟器需要读取 `src/data/weapons.json`（只读）
- 伤害计算器需要读取武器数据（只读）

---

## 共享文件冲突处理规则

### 只有 Agent 1 可以修改的文件
- `package.json`
- `tsconfig.json`
- `tailwind.config.ts`
- `next.config.ts`
- `src/lib/utils.ts`
- `src/components/ui/*`
- `src/components/layout/*`
- `src/app/layout.tsx`

### 其他 Agent 需要新增依赖时
- 在自己的任务文档中注明需要的依赖
- 由 Agent 1 统一安装，或在自己分支的 package.json 中添加

### 类型文件规则
- Agent 1 创建所有 `.types.ts` 文件的骨架（基础接口）
- 各 Agent 只能修改自己负责的类型文件
- 需要跨模块引用类型时，从对应的类型文件 import

---

## 启动顺序

```
时间线：
T0 ──────── T1 ──────── T2 ──────── T3
│            │            │            │
Agent1: 初始化项目+UI组件  │  武器模块    │  收尾
Agent2: 类型+数据文件 ────→  地图页面    │  互动地图
Agent3: 类型+数据文件 ────→  干员+任务页  │  收尾
Agent4: 指南内容 ─────────→  首页+工具页  │  计算器
```

- T0: Agent 1 先跑 5-10 分钟，把项目骨架和 UI 组件建好
- T1: 其他 Agent 开始页面开发（此时 UI 组件已可用）
- T2-T3: 各自完成复杂功能
