// [D] 指南数据获取函数

import {
  Guide,
  GuideCategory,
  GuideCategoryLabels,
  GuideCategoryColors,
} from "@/types/guide.types";

// [D] 静态导入所有指南数据
import beginnerStart from "@/data/guides/beginner-start.json";
import weaponGuide from "@/data/guides/weapon-guide.json";
import mapTactics from "@/data/guides/map-tactics.json";
import economyTips from "@/data/guides/economy-tips.json";
import advancedMovement from "@/data/guides/advanced-movement.json";

// [D] 指南数据数组
const guides: Guide[] = [
  beginnerStart as Guide,
  weaponGuide as Guide,
  mapTactics as Guide,
  economyTips as Guide,
  advancedMovement as Guide,
];

/**
 * [D] 获取所有指南
 */
export function getAllGuides(): Guide[] {
  return guides;
}

/**
 * [D] 根据 slug 获取指南
 */
export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

/**
 * [D] 根据分类获取指南
 */
export function getGuidesByCategory(category: GuideCategory): Guide[] {
  return guides.filter((guide) => guide.category === category);
}

/**
 * [D] 获取分类标签
 */
export function getCategoryLabel(category: GuideCategory): string {
  return GuideCategoryLabels[category];
}

/**
 * [D] 获取分类颜色
 */
export function getCategoryColor(category: GuideCategory): string {
  return GuideCategoryColors[category];
}

/**
 * [D] 获取所有 slugs（用于 generateStaticParams）
 */
export function getAllGuideSlugs(): string[] {
  return guides.map((guide) => guide.slug);
}
