"use client";

// [D] 属性预览面板组件

import { WeaponStats } from "@/types";
import { StatsModifier } from "@/types/attachment.types";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatsPreviewProps {
  baseStats: WeaponStats;
  modifiers: StatsModifier[];
}

// [D] 数值属性类型（排除数组类型 fireModes）
type NumericStatKey = keyof Omit<WeaponStats, "fireModes">;

// [D] 属性显示配置
const statConfig: { key: NumericStatKey; label: string; unit: string }[] = [
  { key: "damage", label: "伤害", unit: "" },
  { key: "fireRate", label: "射速", unit: " RPM" },
  { key: "accuracy", label: "精准度", unit: "" },
  { key: "recoil", label: "后坐力", unit: "" },
  { key: "mobility", label: "机动性", unit: "" },
  { key: "range", label: "射程", unit: "m" },
  { key: "magazineSize", label: "弹匣容量", unit: " 发" },
  { key: "reloadTime", label: "换弹时间", unit: "s" },
];

export function StatsPreview({ baseStats, modifiers }: StatsPreviewProps) {
  // [D] 计算最终属性
  const calculateStat = (key: NumericStatKey): number => {
    const baseValue = (baseStats[key] as number) || 0;
    const modifierValue = modifiers.reduce((sum, mod) => {
      const modValue = mod[key];
      return sum + (modValue || 0);
    }, 0);
    return Math.max(0, baseValue + modifierValue);
  };

  // [D] 计算属性变化
  const getStatChange = (key: NumericStatKey): number => {
    return modifiers.reduce((sum, mod) => {
      const modValue = mod[key];
      return sum + (modValue || 0);
    }, 0);
  };

  // [D] 获取变化指示器
  const getChangeIndicator = (change: number) => {
    if (change > 0) {
      return (
        <span className="flex items-center gap-0.5 text-green-400 text-xs">
          <TrendingUp className="w-3 h-3" />+{change}
        </span>
      );
    }
    if (change < 0) {
      return (
        <span className="flex items-center gap-0.5 text-red-400 text-xs">
          <TrendingDown className="w-3 h-3" />
          {change}
        </span>
      );
    }
    return (
      <span className="text-slate-600 text-xs">
        <Minus className="w-3 h-3 inline" />
      </span>
    );
  };

  return (
    <div className="bg-surface/50 rounded-xl p-4 border border-surface-light">
      <h3 className="font-semibold text-text-primary mb-4">属性预览</h3>

      <div className="space-y-3">
        {statConfig.map(({ key, label, unit }) => {
          const value = calculateStat(key);
          const change = getStatChange(key);
          const isPositive =
            change > 0 && !["recoil", "reloadTime"].includes(key as string);
          const isNegative =
            change < 0 && !["recoil", "reloadTime"].includes(key as string);

          return (
            <div key={key as string} className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">{label}</span>
              <div className="flex items-center gap-2">
                {getChangeIndicator(change)}
                <span
                  className={cn(
                    "text-sm font-medium",
                    change > 0 && isPositive && "text-success",
                    change < 0 && isNegative && "text-danger",
                    change === 0 && "text-text-primary"
                  )}
                >
                  {value}
                  {unit}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* [D2] 属性总结 - 使用主题色 */}
      {modifiers.length > 0 && (
        <div className="mt-4 pt-4 border-t border-surface-light">
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-muted">已装备配件</span>
            <span className="text-info">{modifiers.length} 个</span>
          </div>
        </div>
      )}
    </div>
  );
}
