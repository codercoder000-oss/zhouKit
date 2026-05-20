// [D] 指南相关类型定义

/**
 * [D] 指南分类
 */
export type GuideCategory = "beginner" | "advanced" | "tips" | "economy";

/**
 * [D] 指南分类显示名称
 */
export const GuideCategoryLabels: Record<GuideCategory, string> = {
  beginner: "新手入门",
  advanced: "进阶技巧",
  tips: "实用贴士",
  economy: "经济系统",
};

/**
 * [D] 指南分类颜色
 */
export const GuideCategoryColors: Record<GuideCategory, string> = {
  beginner: "bg-green-500/20 text-green-400 border-green-500/50",
  advanced: "bg-purple-500/20 text-purple-400 border-purple-500/50",
  tips: "bg-blue-500/20 text-blue-400 border-blue-500/50",
  economy: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
};

/**
 * [D] 指南接口
 */
export interface Guide {
  /** [D] URL 友好的标识 */
  slug: string;
  /** [D] 标题 */
  title: string;
  /** [D] 描述 */
  description: string;
  /** [D] 分类 */
  category: GuideCategory;
  /** [D] Markdown 内容 */
  content: string;
  /** [D] 作者 */
  author: string;
  /** [D] 发布日期 (ISO 格式) */
  publishedAt: string;
  /** [D] 更新日期 (ISO 格式) */
  updatedAt: string;
  /** [D] 阅读时间，如 '5分钟' */
  readTime: string;
  /** [D] 标签 */
  tags: string[];
}
