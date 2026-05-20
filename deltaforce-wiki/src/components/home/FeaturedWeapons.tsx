// [D] 热门武器展示组件

import { Card, Badge } from "@/components/ui";
import { Weapon, WeaponCategoryLabels } from "@/types";
import { TrendingUp } from "lucide-react";
import Link from "next/link";

interface FeaturedWeaponsProps {
  weapons: Weapon[];
}

// [D] 评级颜色映射
// [D2] 评级颜色映射 - 使用主题兼容色
const tierColors: Record<string, string> = {
  S: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
  A: "bg-purple-500/20 text-purple-400 border-purple-500/50",
  B: "bg-info/20 text-info border-info/50",
  C: "bg-green-500/20 text-green-400 border-green-500/50",
  D: "bg-surface-light/50 text-text-muted border-surface-light",
};

export function FeaturedWeapons({ weapons }: FeaturedWeaponsProps) {
  // [D] 只展示 S 和 A 级武器
  const featuredWeapons = weapons
    .filter((w) => w.tier === "S" || w.tier === "A")
    .slice(0, 6);

  return (
    <section className="py-12 px-4 bg-surface/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-bold text-text-primary">热门武器</h2>
          </div>
          <Link
            href="/weapons"
            className="text-sm text-info hover:text-info/80 transition-colors"
          >
            查看全部 →
          </Link>
        </div>

        {/* [D2] 横向滚动容器 */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-surface-light scrollbar-track-transparent">
          {featuredWeapons.map((weapon) => (
            <Link key={weapon.id} href={`/weapons/${weapon.id}`}>
              <Card className="flex-shrink-0 w-64 p-4 bg-surface border-surface-light hover:border-surface-light/80 transition-all cursor-pointer group">
                {/* [D2] 武器图片占位 */}
                <div className="aspect-video bg-surface-light rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                  <div className="text-text-muted text-sm">武器图片</div>
                </div>

                {/* [D2] 武器信息 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-text-primary group-hover:text-info transition-colors">
                      {weapon.name}
                    </h3>
                    <Badge
                      variant="outline"
                      className={`${tierColors[weapon.tier]} text-xs`}
                    >
                      {weapon.tier}级
                    </Badge>
                  </div>

                  <p className="text-xs text-text-secondary">
                    {WeaponCategoryLabels[weapon.category]}
                  </p>

                  {/* [D2] 关键属性 */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-text-secondary">
                      伤害: <span className="text-text-primary">{weapon.stats.damage}</span>
                    </div>
                    <div className="text-text-secondary">
                      射速: <span className="text-text-primary">{weapon.stats.fireRate}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
