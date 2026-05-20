"use client";

// [D] 护甲等级选择组件

import { getArmorLabel } from "@/lib/damage-calc";
import { Shield } from "lucide-react";

interface ArmorSelectorProps {
  value: number;
  onChange: (level: number) => void;
}

export function ArmorSelector({ value, onChange }: ArmorSelectorProps) {
  const levels = [1, 2, 3, 4, 5];

  // [D] 护甲颜色
  const getArmorColor = (level: number): string => {
    const colors: Record<number, string> = {
      1: "from-slate-600 to-slate-500",
      2: "from-green-600 to-green-500",
      3: "from-blue-600 to-blue-500",
      4: "from-purple-600 to-purple-500",
      5: "from-orange-600 to-orange-500",
    };
    return colors[level] || "from-slate-600 to-slate-500";
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-text-secondary" />
        <label className="text-sm font-medium text-text-primary">目标护甲</label>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => onChange(level)}
            className={`aspect-square rounded-xl flex flex-col items-center justify-center transition-all ${
              value === level
                ? `bg-gradient-to-br ${getArmorColor(level)} text-white shadow-lg scale-105`
                : "bg-surface border border-surface-light text-text-secondary hover:border-surface-light/80"
            }`}
          >
            <span className="text-lg font-bold">{level}</span>
            <span className="text-[10px]">级</span>
          </button>
        ))}
      </div>

      <p className="text-xs text-text-muted">{getArmorLabel(value)}</p>
    </div>
  );
}
