"use client";

// [D] 伤害计算器主组件

import { useState, useMemo } from "react";
import { Weapon } from "@/types";
import { Card } from "@/components/ui";
import { WeaponSelector } from "./WeaponSelector";
import { ArmorSelector } from "./ArmorSelector";
import { DistanceSlider } from "./DistanceSlider";
import { DamageResult } from "./DamageResult";
import { TTKChart } from "./TTKChart";
import { calculateDamage, getHitZoneLabel } from "@/lib/damage-calc";
import { Target, RotateCcw } from "lucide-react";

interface DamageCalculatorProps {
  weapons: Weapon[];
}

export function DamageCalculator({ weapons }: DamageCalculatorProps) {
  // [D] 计算参数状态
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);
  const [armorLevel, setArmorLevel] = useState(3);
  const [distance, setDistance] = useState(50);
  const [hitZone, setHitZone] = useState<"head" | "chest" | "limb">("chest");

  // [D] 计算结果
  const result = useMemo(() => {
    if (!selectedWeapon) return null;
    return calculateDamage({
      baseDamage: selectedWeapon.stats.damage,
      fireRate: selectedWeapon.stats.fireRate,
      armorLevel,
      distance,
      hitZone,
      effectiveRange: selectedWeapon.stats.range,
      magazineSize: selectedWeapon.stats.magazineSize,
    });
  }, [selectedWeapon, armorLevel, distance, hitZone]);

  // [D] 重置
  const handleReset = () => {
    setSelectedWeapon(null);
    setArmorLevel(3);
    setDistance(50);
    setHitZone("chest");
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* [D2] 左侧：参数设置 - 使用主题色 */}
      <div className="lg:col-span-1 space-y-4">
        {/* [D2] 武器选择 */}
        <Card className="p-4 bg-surface/50 border-surface-light">
          <WeaponSelector
            weapons={weapons}
            selectedWeapon={selectedWeapon}
            onSelect={setSelectedWeapon}
          />
        </Card>

        {/* [D2] 护甲选择 */}
        <Card className="p-4 bg-surface/50 border-surface-light">
          <ArmorSelector value={armorLevel} onChange={setArmorLevel} />
        </Card>

        {/* [D2] 距离滑块 */}
        <Card className="p-4 bg-surface/50 border-surface-light">
          <DistanceSlider value={distance} onChange={setDistance} />
        </Card>

        {/* [D2] 命中部位 */}
        <Card className="p-4 bg-surface/50 border-surface-light">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-text-secondary" />
              <label className="text-sm font-medium text-text-primary">
                命中部位
              </label>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(["head", "chest", "limb"] as const).map((zone) => (
                <button
                  key={zone}
                  onClick={() => setHitZone(zone)}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    hitZone === zone
                      ? "bg-accent text-white"
                      : "bg-surface-light text-text-secondary hover:bg-surface-light/80"
                  }`}
                >
                  {getHitZoneLabel(zone)}
                </button>
              ))}
            </div>
            {/* [D2] 部位倍率提示 */}
            <p className="text-xs text-text-muted">
              {hitZone === "head" && "头部倍率: 4.0x · 一击伤害最高"}
              {hitZone === "chest" && "胸部倍率: 1.0x · 标准伤害"}
              {hitZone === "limb" && "四肢倍率: 0.7x · 需要更多命中次数"}
            </p>
          </div>
        </Card>

        {/* [D2] 重置按钮 */}
        <button
          onClick={handleReset}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-surface text-text-secondary hover:bg-surface-light transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          重置
        </button>
      </div>

      {/* [D2] 右侧：结果展示 */}
      <div className="lg:col-span-2 space-y-4">
        {/* [D2] 计算结果 */}
        <DamageResult result={result} />

        {/* [D2] TTK 对比图 */}
        <TTKChart
          weapons={weapons}
          armorLevel={armorLevel}
          hitZone={hitZone}
        />

        {/* [D2] 计算公式说明 - 使用主题色 */}
        <Card className="p-4 bg-surface/50 border-surface-light">
          <h3 className="text-sm font-medium text-text-primary mb-2">
            计算公式
          </h3>
          <div className="text-xs text-text-secondary space-y-1">
            <p>实际伤害 = 基础伤害 × 部位倍率 × 距离衰减 × (1 - 护甲减伤)</p>
            <ul className="list-disc list-inside ml-2 space-y-0.5">
              <li>部位倍率: 头部 4x / 胸部 1x / 四肢 0.7x</li>
              <li>距离衰减: 每超过有效射程 10m，伤害 -5%</li>
              <li>护甲减伤: 1级 10% / 2级 20% / 3级 35% / 4级 45% / 5级 55%</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
