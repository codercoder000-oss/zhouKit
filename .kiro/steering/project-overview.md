# 三角洲行动攻略站 - 项目总览

## 项目名称
DeltaForce Wiki（三角洲行动攻略站）

## 技术栈
- 框架：Next.js 15 (App Router)
- 语言：TypeScript（strict mode）
- 样式：Tailwind CSS 4
- 数据库：PostgreSQL + Prisma ORM
- 搜索：Meilisearch
- 部署：Vercel（前端）+ Railway（后端服务）
- 包管理：pnpm
- 代码规范：ESLint + Prettier
- 测试：Vitest + Playwright（E2E）

## 项目结构

```
deltaforce-wiki/
├── src/
│   ├── app/                    # Next.js App Router 页面
│   │   ├── (home)/             # 首页
│   │   ├── weapons/            # 武器数据库
│   │   ├── maps/               # 地图攻略
│   │   ├── operators/          # 干员系统
│   │   ├── quests/             # 任务攻略
│   │   ├── economy/            # 经济系统
│   │   ├── guides/             # 新手指南
│   │   ├── tools/              # 工具（配装模拟器/伤害计算器）
│   │   └── api/                # API 路由
│   ├── components/
│   │   ├── ui/                 # 基础 UI 组件（Button/Card/Modal 等）
│   │   ├── layout/             # 布局组件（Header/Footer/Sidebar）
│   │   ├── weapons/            # 武器相关组件
│   │   ├── maps/               # 地图相关组件
│   │   ├── operators/          # 干员相关组件
│   │   └── shared/             # 跨模块共享组件
│   ├── lib/                    # 工具函数和配置
│   │   ├── db/                 # 数据库连接和查询
│   │   ├── api/                # API 客户端
│   │   └── utils/              # 通用工具函数
│   ├── types/                  # TypeScript 类型定义
│   ├── data/                   # 静态数据（JSON）
│   └── styles/                 # 全局样式
├── prisma/
│   └── schema.prisma           # 数据库 Schema
├── public/
│   ├── images/
│   │   ├── weapons/
│   │   ├── maps/
│   │   ├── operators/
│   │   └── icons/
│   └── fonts/
├── tests/
│   ├── unit/
│   └── e2e/
└── docs/                       # 项目文档
```

## 设计原则
1. 数据驱动 — 所有游戏数据存 JSON/DB，页面从数据渲染，不硬编码
2. 组件复用 — 相同 UI 模式抽成共享组件
3. 类型安全 — 所有数据结构必须有 TypeScript 类型定义
4. SEO 优先 — 静态生成为主，动态数据用 ISR
5. 移动端优先 — 响应式设计，移动端体验不能差
