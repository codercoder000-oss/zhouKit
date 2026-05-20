# Round 2 优化总览

## 整体目标
第一轮 4 个 Agent 已完成功能搭建，但代码质量有以下系统性问题需要解决：

| 问题类别 | 现状 | 目标 |
|---------|------|------|
| 样式统一 | 大量硬编码色（slate/gray） | 全部用主题变量 |
| 视觉细节 | 静态、无动画、无反馈 | 入场动画、hover 效果、过渡 |
| 加载体验 | 白屏等待 | 骨架屏 + 流式渲染 |
| SEO | 只有基础 metadata | sitemap + robots + JSON-LD |
| 错误处理 | 没有 not-found | 各模块有 not-found 页面 |
| 性能 | 大组件直接打包 | 动态导入、代码分割 |

## 启动顺序

### 必须先启动 Agent A（Round 2）
原因：A 要建立动画系统、骨架屏组件、补充主题色变量。其他 Agent 可能引用 A 创建的组件。

等 A 完成 5-10 分钟后，再启动 B/C/D 并行。

### 同时启动（A 完成后）
- Agent B (Round 2) — 武器+地图样式修复
- Agent C (Round 2) — 干员+任务样式修复
- Agent D (Round 2) — SEO + 工具+首页+指南样式修复

## 4 个 Agent 的任务文件

```
prompts/
├── round2-agent-a.md  → 动画系统 + 骨架屏 + 主题色补充 + 动态导入
├── round2-agent-b.md  → 武器/地图样式 + 互动地图增强
├── round2-agent-c.md  → 干员/任务样式 + 时间线优化
└── round2-agent-d.md  → SEO + 首页搜索 + 工具/指南样式
```

## 文件冲突避免

每个 Agent 的所有权清单（Round 2）：

### Agent A（Round 2）独占
- `src/app/globals.css`（补充主题色）
- `src/components/ui/AnimatedContainer.tsx`（新建）
- `src/components/ui/Skeleton.tsx`（新建）
- `src/components/ui/PageTransition.tsx`（新建）
- `src/components/ui/index.ts`（更新导出）
- `src/app/*/loading.tsx`（所有路由的 loading）
- `src/styles/color-map.md`（颜色对照表，给其他 Agent 参考）
- `package.json`（安装 motion）

### Agent B（Round 2）独占
- `src/app/weapons/**`（除了 loading.tsx）
- `src/app/maps/**`（除了 loading.tsx）
- `src/components/weapons/**`
- `src/components/maps/**`
- `src/app/weapons/[id]/not-found.tsx`
- `src/app/maps/[id]/not-found.tsx`

### Agent C（Round 2）独占
- `src/app/operators/**`（除了 loading.tsx）
- `src/app/quests/**`（除了 loading.tsx）
- `src/components/operators/**`
- `src/components/quests/**`
- `src/app/operators/[id]/not-found.tsx`
- `src/app/quests/[id]/not-found.tsx`

### Agent D（Round 2）独占
- `src/app/sitemap.ts`（新建）
- `src/app/robots.ts`（新建）
- `src/app/layout.tsx`（只改 metadata 对象）
- `src/app/not-found.tsx`（全局 404）
- `src/app/(home)/**`
- `src/app/tools/**`
- `src/app/guides/**`
- `src/components/home/**`
- `src/components/tools/**`
- `src/components/guides/**`

## 共同规范（所有 Agent 必须遵守）

### 1. 颜色替换强制规则
任何 `slate-*`、`gray-*`、硬编码色都必须替换。
参考 `src/styles/color-map.md`（Agent A 创建后）。

### 2. 注释标记
- A2 → `// [A2] 说明`
- B2 → `// [B2] 说明`
- C2 → `// [C2] 说明`
- D2 → `// [D2] 说明`

### 3. 不破坏现有功能
- 不修改 Props 接口
- 不修改数据结构
- 不修改 Server/Client 边界

### 4. 验证标准
每个 Agent 完成后必须通过：
```bash
pnpm tsc --noEmit  # 零错误
pnpm build         # 构建成功
```

## 启动命令

我已准备好 4 个提示词，按以下方式发给对应 Agent：

```
[Agent A 终端]
请阅读并执行 prompts/round2-agent-a.md 中的所有任务

[Agent B 终端] (等 A 完成后)
请阅读并执行 prompts/round2-agent-b.md 中的所有任务

[Agent C 终端] (等 A 完成后)
请阅读并执行 prompts/round2-agent-c.md 中的所有任务

[Agent D 终端] (等 A 完成后)
请阅读并执行 prompts/round2-agent-d.md 中的所有任务
```

## 我的把关检查清单

Round 2 完成后，我会检查：

1. ✅ 全文搜索 `slate-` `gray-` 是否还有残留（应该 0 个或极少）
2. ✅ 所有路由有对应的 loading.tsx
3. ✅ sitemap.xml 和 robots.txt 可访问
4. ✅ 武器/地图/干员/任务的 not-found 工作正常
5. ✅ 首页搜索框可以真实搜索
6. ✅ 互动地图有网格背景
7. ✅ pnpm build 通过
8. ✅ Lighthouse SEO 分数提升
