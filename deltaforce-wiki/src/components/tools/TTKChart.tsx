"use client";

// [D] TTK 对比图表（纯 CSS 实现）

import { Weapon } from "@/types";
import { calculateDamage } from "@/lib/damage-calc";
import { Card } from "@/components/ui";

interface TTKChartProps {
  weapons: Weapon[];
  armorLevel: number;
  hitZone: "head" | "chest" | "limb";
}

export function TTKChart({ weapons, armorLevel, hitZone }: TTKChartProps) {
  // [D] 计算每把武器的 TTK（胸部，50米距离）
  const ttkData = weapons
    .map((weapon) => {
      const result = calculateDamage({
        baseDamage: weapon.stats.damage,
        fireRate: weapon.stats.fireRate,
        armorLevel,
        distance: 50,
        hitZone,
        effectiveRange: weapon.stats.range,
        magazineSize: weapon.stats.magazineSize,
      });
      return {
        weapon,
        ttk: result.ttk,
        shotsToKill: result.shotsToKill,
      };
    })
    .sort((a, b) => a.ttk - b.ttk)
    .slice(0, 8); // [D] 只显示前8把最快的

  // [D] 最大 TTK 用于计算比例
  const maxTTK = Math.max(...ttkData.map((d) => d.ttk), 1000);

  return (
    <Card className="p-4 bg-surface/50 border-surface-light">
      <h3 className="text-sm font-medium text-text-primary mb-4">
        TTK 排行榜 (50米 · {hitZone === "head" ? "头部" : hitZone === "chest" ? "胸部" : "四肢"})
      </h3>

      <div className="space-y-3">
        {ttkData.map(({ weapon, ttk, shotsToKill }) => {
          const percentage = (ttk / maxTTK) * 100;
          return (
            <div key={weapon.id} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-secondary">{weapon.name}</span>
                <span className="text-text-muted">
                  {ttk}ms · {shotsToKill}发
                </span>
              </div>
              <div className="h-2 bg-surface-light rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    weapon.tier === "S"
                      ? "bg-yellow-500"
                      : weapon.tier === "A"
                      ? "bg-purple-500"
                      : "bg-info"
                  }`}
                  style={{ width: `${100 - percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
