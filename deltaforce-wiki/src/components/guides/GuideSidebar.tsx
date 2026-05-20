// [D] 指南分类侧边栏组件

"use client";

import { cn } from "@/lib/utils";
import {
  GuideCategory,
  GuideCategoryLabels,
  GuideCategoryColors,
} from "@/types/guide.types";

interface GuideSidebarProps {
  currentCategory?: GuideCategory | "all";
  onCategoryChange?: (category: GuideCategory | "all") => void;
  counts?: Record<GuideCategory | "all", number>;
}

// [D] 分类列表
const categories: (GuideCategory | "all")[] = [
  "all",
  "beginner",
  "advanced",
  "tips",
  "economy",
];

export function GuideSidebar({
  currentCategory = "all",
  onCategoryChange,
  counts = { all: 0, beginner: 0, advanced: 0, tips: 0, economy: 0 },
}: GuideSidebarProps) {
  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h3 className="font-semibold text-white mb-4 px-2">分类筛选</h3>
        <nav className="space-y-1">
          {categories.map((category) => {
            const isActive = currentCategory === category;
            const label =
              category === "all" ? "全部指南" : GuideCategoryLabels[category];
            const colorClass =
              category === "all"
                ? ""
                : GuideCategoryColors[category as GuideCategory];

            return (
              <button
                key={category}
                onClick={() => onCategoryChange?.(category)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                  isActive
                    ? "bg-slate-700 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                )}
              >
                <span>{label}</span>
                {category !== "all" && (
                  <span
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      colorClass
                    )}
                  >
                    {counts[category] || 0}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
