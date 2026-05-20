// [B2] 武器列表页 - Server Component

import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { getWeapons } from "@/lib/weapons";
import { WeaponsContent } from "./WeaponsContent";
import { Button } from "@/components/ui";

// [B] 导出 metadata
export const metadata: Metadata = {
  title: "武器数据库 - 三角洲行动攻略",
  description: "三角洲行动全武器数据库，包含武器属性、配件推荐、强度评级等详细数据",
};

// [B] 武器列表页
export default function WeaponsPage() {
  // [B] 获取所有武器
  const weapons = getWeapons();

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* [B2] 页面头部 - 使用主题色 */}
      <div className="border-b border-surface bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">武器数据库</h1>
              <p className="mt-1 text-text-secondary">
                三角洲行动全武器数据 - 共 {weapons.length} 把武器
              </p>
            </div>
            <div className="flex gap-2">
              <Link href="/weapons/compare">
                <Button variant="secondary">对比武器</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="text-center py-8 text-text-muted">加载中...</div>}>
          <WeaponsContent weapons={weapons} />
        </Suspense>
      </div>
    </div>
  );
}
