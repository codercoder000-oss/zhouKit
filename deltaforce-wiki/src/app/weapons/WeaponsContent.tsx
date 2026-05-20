"use client";

// [B] 武器列表页内容 - Client Component

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { WeaponCard } from "@/components/weapons/WeaponCard";
import { WeaponFilter } from "@/components/weapons/WeaponFilter";
import { Button } from "@/components/ui";
import type { Weapon, WeaponCategory, WeaponTier } from "@/types/weapon.types";

interface WeaponsContentProps {
  weapons: Weapon[];
}

export function WeaponsContent({ weapons }: WeaponsContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filteredWeapons, setFilteredWeapons] = useState(weapons);

  // [B] 处理筛选变化
  const handleFilterChange = (filters: {
    category?: WeaponCategory;
    tier?: WeaponTier;
  }) => {
    let result = weapons;

    if (filters.category) {
      result = result.filter((w) => w.category === filters.category);
    }

    if (filters.tier) {
      result = result.filter((w) => w.tier === filters.tier);
    }

    setFilteredWeapons(result);

    // [B] 更新 URL
    const params = new URLSearchParams();
    if (filters.category) params.set("category", filters.category);
    if (filters.tier) params.set("tier", filters.tier);
    const url = params.toString() ? `/weapons?${params.toString()}` : "/weapons";
    router.push(url, { scroll: false });
  };

  // [B] 检查是否有筛选
  const hasFilters =
    searchParams.has("category") || searchParams.has("tier");

  return (
    <div className="grid gap-6 lg:grid-cols-4">
      {/* [B] 左侧筛选栏 */}
      <div className="lg:col-span-1">
        <WeaponFilter onFilterChange={handleFilterChange} />
      </div>

      {/* [B] 右侧武器网格 */}
      <div className="lg:col-span-3">
        {/* [B2] 筛选结果提示 - 使用主题色 */}
        {hasFilters && (
          <div className="mb-4 rounded-lg bg-primary/20 px-4 py-2 text-sm text-secondary">
            显示 {filteredWeapons.length} 把武器（已筛选）
          </div>
        )}

        {/* [B] 武器网格 - 响应式布局 */}
        {filteredWeapons.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredWeapons.map((weapon) => (
              <WeaponCard key={weapon.id} weapon={weapon} />
            ))}
          </div>
        ) : (
          <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-surface bg-surface">
            <p className="text-text-muted">没有找到符合条件的武器</p>
            <Link
              href="/weapons"
              className="mt-2 text-secondary hover:underline"
              onClick={() => {
                setFilteredWeapons(weapons);
              }}
            >
              清除筛选
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
