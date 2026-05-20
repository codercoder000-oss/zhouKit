// [B] 武器筛选组件 (Client Component)

"use client";

import { useState } from "react";
import { Button, Badge } from "@/components/ui";
import {
  WeaponCategory,
  WeaponCategoryLabels,
  WeaponTier,
} from "@/types/weapon.types";
import { cn } from "@/lib/utils";

interface WeaponFilterProps {
  onFilterChange: (filters: {
    category?: WeaponCategory;
    tier?: WeaponTier;
  }) => void;
}

const categories: WeaponCategory[] = [
  "assault-rifle",
  "smg",
  "sniper",
  "shotgun",
  "pistol",
  "lmg",
  "dmr",
];

const tiers: WeaponTier[] = ["S", "A", "B", "C", "D"];

/**
 * [B] 武器筛选组件
 */
export function WeaponFilter({ onFilterChange }: WeaponFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    WeaponCategory | undefined
  >();
  const [selectedTier, setSelectedTier] = useState<WeaponTier | undefined>();

  // [B] 处理类别选择
  const handleCategoryClick = (category: WeaponCategory) => {
    const newCategory = selectedCategory === category ? undefined : category;
    setSelectedCategory(newCategory);
    onFilterChange({ category: newCategory, tier: selectedTier });
  };

  // [B] 处理评级选择
  const handleTierClick = (tier: WeaponTier) => {
    const newTier = selectedTier === tier ? undefined : tier;
    setSelectedTier(newTier);
    onFilterChange({ category: selectedCategory, tier: newTier });
  };

  // [B] 清除筛选
  const clearFilters = () => {
    setSelectedCategory(undefined);
    setSelectedTier(undefined);
    onFilterChange({});
  };

  return (
    <div className="space-y-4 rounded-lg border border-surface bg-surface p-4">
      {/* [B2] 类别筛选 - 使用主题色 */}
      <div>
        <h3 className="mb-2 text-sm font-medium text-text-secondary">武器类别</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={cn(
                "rounded-full px-3 py-1 text-sm transition-colors",
                selectedCategory === category
                  ? "bg-accent text-white"
                  : "bg-surface-light text-text-secondary hover:bg-primary/50"
              )}
            >
              {WeaponCategoryLabels[category]}
            </button>
          ))}
        </div>
      </div>

      {/* [B2] 评级筛选 - 使用主题色 */}
      <div>
        <h3 className="mb-2 text-sm font-medium text-text-secondary">强度评级</h3>
        <div className="flex flex-wrap gap-2">
          {tiers.map((tier) => (
            <button
              key={tier}
              onClick={() => handleTierClick(tier)}
              className={cn(
                "h-8 w-8 rounded font-bold transition-colors",
                selectedTier === tier
                  ? tier === "S"
                    ? "bg-secondary text-background"
                    : tier === "A"
                      ? "bg-purple-500 text-white"
                      : tier === "B"
                        ? "bg-info text-white"
                        : tier === "C"
                          ? "bg-success text-white"
                          : "bg-text-muted text-white"
                  : "bg-surface-light text-text-muted hover:bg-surface-light/80"
              )}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* [B2] 清除筛选 - 使用主题色 */}
      {(selectedCategory || selectedTier) && (
        <div className="flex items-center justify-between border-t border-surface-light pt-3">
          <div className="flex gap-2">
            {selectedCategory && (
              <Badge
                variant="secondary"
                className="cursor-pointer"
                onClick={() => handleCategoryClick(selectedCategory)}
              >
                {WeaponCategoryLabels[selectedCategory]} ×
              </Badge>
            )}
            {selectedTier && (
              <Badge
                variant="secondary"
                className="cursor-pointer"
                onClick={() => handleTierClick(selectedTier)}
              >
                {selectedTier}级 ×
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            清除筛选
          </Button>
        </div>
      )}
    </div>
  );
}
