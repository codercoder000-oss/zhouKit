// [B2] 武器卡片组件 - 增强版

import Link from "next/link";
import { Badge } from "@/components/ui";
import { WeaponCategoryLabels, WeaponTier } from "@/types/weapon.types";
import type { Weapon } from "@/types/weapon.types";
import { cn } from "@/lib/utils";

interface WeaponCardProps {
  weapon: Weapon;
}

/**
 * [B2] 获取评级颜色 - 使用主题色
 * S=金色(secondary), A=紫色, B=蓝色(info), C=绿色(success), D=灰色
 */
function getTierColor(tier: WeaponTier): string {
  const colors: Record<WeaponTier, string> = {
    S: "bg-secondary text-background",
    A: "bg-purple-500 text-white",
    B: "bg-info text-white",
    C: "bg-success text-white",
    D: "bg-text-muted text-white",
  };
  return colors[tier];
}

/**
 * [B2] 武器卡片组件 - 展示武器基本信息
 * 添加 hover 动画和主题色
 */
export function WeaponCard({ weapon }: WeaponCardProps) {
  return (
    <Link href={`/weapons/${weapon.id}`}>
      <div className="group relative overflow-hidden rounded-lg border border-surface bg-surface transition-all duration-200 hover:scale-[1.02] hover:border-accent/50 hover:shadow-lg">
        {/* [B2] 武器图片 - 使用主题色 */}
        <div className="relative aspect-video overflow-hidden bg-surface-light">
          <div className="absolute inset-0 flex items-center justify-center text-text-muted">
            {/* [B2] 占位图，实际项目中使用真实图片 */}
            <svg
              className="h-16 w-16 transition-transform duration-200 group-hover:scale-110"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          {/* [B2] 评级徽章 - 使用主题色 */}
          <Badge
            className={cn(
              "absolute right-2 top-2 font-bold transition-transform duration-200 group-hover:scale-110",
              getTierColor(weapon.tier)
            )}
          >
            {weapon.tier} 级
          </Badge>
        </div>

        {/* [B2] 武器信息 - 使用主题色 */}
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-text-primary transition-colors group-hover:text-accent">
                {weapon.name}
              </h3>
              <p className="text-sm text-text-muted">{weapon.nameEn}</p>
            </div>
          </div>

          {/* [B2] 类别和口径 - 使用主题色 */}
          <div className="mt-2 flex items-center gap-2">
            <Badge variant="secondary" size="sm">
              {WeaponCategoryLabels[weapon.category]}
            </Badge>
            <span className="text-xs text-text-muted">{weapon.caliber}</span>
          </div>

          {/* [B2] 核心属性预览 - 使用主题色 */}
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded bg-surface-light p-1 transition-colors group-hover:bg-primary/20">
              <div className="text-text-muted">伤害</div>
              <div className="font-medium text-text-primary">{weapon.stats.damage}</div>
            </div>
            <div className="rounded bg-surface-light p-1 transition-colors group-hover:bg-primary/20">
              <div className="text-text-muted">射速</div>
              <div className="font-medium text-text-primary">
                {weapon.stats.fireRate}
              </div>
            </div>
            <div className="rounded bg-surface-light p-1 transition-colors group-hover:bg-primary/20">
              <div className="text-text-muted">精准度</div>
              <div className="font-medium text-text-primary">
                {weapon.stats.accuracy}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
