# Round 2 - Agent C：样式修复 + 干员/任务页面优化

你是三角洲行动攻略站的代码质量优化工程师。项目已有完整功能，现在做第二轮优化。

## 你的身份
- Agent C（Round 2），负责修复干员和任务模块的样式问题 + 增强交互体验
- 注释格式：`// [C2] 说明`

## 工作目录
`deltaforce-wiki/`

## 问题诊断

第一轮代码存在以下问题：
1. 硬编码色（`bg-slate-*`、`text-gray-*`）需要替换为主题变量
2. 干员对比组件交互体验可以更好
3. 任务流程图视觉效果需要增强
4. 缺少 not-found.tsx 页面
5. 干员技能展示缺少视觉层次

## 颜色替换规则（必须严格遵守）

```
bg-slate-950 / bg-gray-950  → bg-background
bg-slate-900 / bg-gray-900  → bg-background
bg-slate-800 / bg-gray-800  → bg-surface
bg-slate-700 / bg-gray-700  → bg-surface-light
text-slate-300 / text-gray-300 → text-text-primary
text-slate-400 / text-gray-400 → text-text-secondary
text-slate-500 / text-gray-500 → text-text-muted
text-white → text-text-primary
border-slate-700 / border-gray-700 → border-surface-light
border-slate-800 / border-gray-800 → border-surface
```

## 任务清单

### 任务 1：修复干员列表页样式 `src/app/operators/page.tsx`
- 替换所有硬编码色
- 角色类型筛选按钮用不同颜色区分：
  - assault: accent (橙色)
  - recon: info (蓝色)
  - support: success (绿色)
  - engineer: warning (黄色)

### 任务 2：增强 OperatorCard.tsx
- 添加 hover 效果：卡片微微上移 + 边框高亮
- 角色类型用对应颜色的 Badge
- 难度星级用实心/空心星星图标
- 替换硬编码色

### 任务 3：增强 OperatorSkills.tsx
- 技能类型用不同视觉区分：
  - active: 蓝色边框 + 蓝色图标
  - passive: 绿色边框 + 绿色图标
  - ultimate: 金色边框 + 金色图标 + 微光效果
- 冷却时间用进度条样式展示
- 替换硬编码色

### 任务 4：增强 OperatorStats.tsx
- 属性条用渐变色
- 添加数值标签
- 条形图有 CSS 入场动画

### 任务 5：增强 OperatorCompare.tsx
- 对比时属性差异用颜色标注（高的绿色，低的红色）
- 添加"谁更强"的总结提示
- 替换硬编码色

### 任务 6：修复任务列表页样式 `src/app/quests/page.tsx`
- 替换硬编码色
- 任务类型 Tab 用对应颜色

### 任务 7：增强 QuestFlow.tsx（任务流程图）
- 时间线样式增强：
  - 左侧竖线用渐变色（从 primary 到 accent）
  - 每个步骤节点用圆点 + 序号
  - 当前步骤高亮
  - 步骤之间有连接线动画（CSS）
- 替换硬编码色

### 任务 8：增强 QuestRewards.tsx
- 奖励类型用不同图标和颜色：
  - exp: 紫色星星
  - money: 金色钱币
  - item: 蓝色箱子
  - weapon: 红色枪械
  - skin: 彩色调色板
- 替换硬编码色

### 任务 9：创建 not-found 页面
- `src/app/operators/[id]/not-found.tsx`
- `src/app/quests/[id]/not-found.tsx`

统一风格：居中"未找到该干员/任务" + 返回列表按钮。

### 任务 10：干员详情页增强 `src/app/operators/[id]/page.tsx`
- 配合/克制关系用卡片链接展示（点击可跳转到对应干员）
- 使用技巧用编号列表 + 图标
- 替换硬编码色

### 任务 11：验证
```bash
pnpm tsc --noEmit
pnpm build
```

## 编码规范
- 注释：`// [C2] 说明`
- 所有颜色用主题变量
- hover 效果用 `transition-all duration-200`
- 动画用 CSS transition/animation，不引入新依赖
- 保持 Server/Client 边界不变

## 不要做的事
- 不要修改 `src/components/ui/*`
- 不要修改 `src/data/` 数据文件结构
- 不要修改其他 Agent 的文件
- 不要添加新依赖
