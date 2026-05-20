"use client";

// [D] 计算结果展示组件

import { DamageCalcResult } from "@/lib/damage-calc";
import { Card } from "@/components/ui";
import { Target, Clock, Zap, Crosshair } from "lucide-react";

interface DamageResultProps {
  result: DamageCalcResult | null;
}

export function DamageResult({ result }: DamageResultProps) {
  if (!result) {
    return (
      <Card className="p-6 bg-surface/50 border-surface-light text-center">
        <p className="text-text-muted">选择武器和参数后查看计算结果</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* [D] 主要结果卡片 */}
      <div className="grid grid-cols-2 gap-4">
        {/* [D2] 单发伤害 */}
        <Card className="p-4 bg-gradient-to-br from-red-900/30 to-red-800/20 border-red-500/30">
          <div className="flex items-center gap-2 text-red-400 mb-2">
            <Target className="w-5 h-5" />
            <span className="text-sm font-medium">单发伤害</span>
          </div>
          <div className="text-3xl font-bold text-text-primary">
            {result.damagePerShot}
          </div>
          <p className="text-xs text-text-secondary mt-1">
            {result.damageMultiplier}
          </p>
        </Card>

        {/* [D2] 击杀命中次数 */}
        <Card className="p-4 bg-gradient-to-br from-orange-900/30 to-orange-800/20 border-orange-500/30">
          <div className="flex items-center gap-2 text-orange-400 mb-2">
            <Crosshair className="w-5 h-5" />
            <span className="text-sm font-medium">击杀命中</span>
          </div>
          <div className="text-3xl font-bold text-text-primary">
            {result.shotsToKill}
          </div>
          <p className="text-xs text-text-secondary mt-1">命中次数</p>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* [D2] TTK */}
        <Card className="p-4 bg-gradient-to-br from-purple-900/30 to-purple-800/20 border-purple-500/30">
          <div className="flex items-center gap-2 text-purple-400 mb-2">
            <Clock className="w-5 h-5" />
            <span className="text-sm font-medium">TTK</span>
          </div>
          <div className="text-2xl font-bold text-text-primary">
            {result.ttk}
            <span className="text-sm font-normal text-text-secondary ml-1">ms</span>
          </div>
          <p className="text-xs text-text-secondary mt-1">击杀时间</p>
        </Card>

        {/* [D2] 弹匣击杀数 */}
        <Card className="p-4 bg-gradient-to-br from-green-900/30 to-green-800/20 border-green-500/30">
          <div className="flex items-center gap-2 text-green-400 mb-2">
            <Zap className="w-5 h-5" />
            <span className="text-sm font-medium">弹匣击杀</span>
          </div>
          <div className="text-2xl font-bold text-text-primary">
            {result.magazineKills}
          </div>
          <p className="text-xs text-text-secondary mt-1">可击杀人数</p>
        </Card>
      </div>
    </div>
  );
}
