"use client";

// [D] 指南列表页

import { GuideCard, GuideSidebar } from "@/components/guides";
import { getAllGuides } from "@/lib/guides";
import { GuideCategory, GuideCategoryLabels } from "@/types/guide.types";
import { BookOpen } from "lucide-react";
import { useState, useMemo } from "react";

export default function GuidesPage() {
  // [D] 获取所有指南
  const guides = getAllGuides();

  // [D] 当前选中的分类
  const [currentCategory, setCurrentCategory] = useState<GuideCategory | "all">(
    "all"
  );

  // [D] 根据分类过滤指南
  const filteredGuides = useMemo(() => {
    if (currentCategory === "all") return guides;
    return guides.filter((g) => g.category === currentCategory);
  }, [guides, currentCategory]);

  // [D] 计算各分类数量
  const counts = {
    all: guides.length,
    beginner: guides.filter((g) => g.category === "beginner").length,
    advanced: guides.filter((g) => g.category === "advanced").length,
    tips: guides.filter((g) => g.category === "tips").length,
    economy: guides.filter((g) => g.category === "economy").length,
  };

  return (
    <main className="min-h-screen bg-slate-950 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* [D] 页面标题 */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">攻略指南</h1>
            <p className="text-slate-400">
              从新手入门到进阶技巧，助你成为战场精英
            </p>
          </div>
        </div>

        {/* [D] 分类筛选标签（移动端） */}
        <div className="lg:hidden flex gap-2 mb-6 overflow-x-auto pb-2">
          {(["all", "beginner", "advanced", "tips", "economy"] as const).map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setCurrentCategory(cat)}
                className={`px-4 py-2 rounded-full border text-sm whitespace-nowrap transition-colors ${
                  currentCategory === cat
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {cat === "all" ? "全部" : GuideCategoryLabels[cat]}
                <span className="ml-1 text-slate-500">({counts[cat]})</span>
              </button>
            )
          )}
        </div>

        {/* [D] 主内容区 */}
        <div className="flex gap-8">
          {/* [D] 侧边栏（桌面端） */}
          <div className="hidden lg:block">
            <GuideSidebar
              counts={counts}
              currentCategory={currentCategory}
              onCategoryChange={setCurrentCategory}
            />
          </div>

          {/* [D] 指南列表 */}
          <div className="flex-1">
            <div className="grid md:grid-cols-2 gap-4">
              {filteredGuides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>

            {/* [D] 空状态 */}
            {filteredGuides.length === 0 && (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">该分类暂无指南</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
