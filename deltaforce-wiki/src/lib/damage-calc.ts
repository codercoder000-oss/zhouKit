// [D] 伤害计算逻辑

import { WeaponStats } from "@/types";

/**
 * [D] 伤害计算输入参数
 */
export interface DamageCalcInput {
  /** [D] 武器基础伤害 */
  baseDamage: number;
  /** [D] 武器射速 (RPM) */
  fireRate: number;
  /** [D] 护甲等级 1-5 */
  armorLevel: number;
  /** [D] 射击距离 (米) */
  distance: number;
  /** [D] 命中部位 */
  hitZone: "head" | "chest" | "limb";
  /** [D] 武器有效射程 (米) */
  effectiveRange: number;
  /** [D] 弹匣容量 */
  magazineSize: number;
}

/**
 * [D] 伤害计算结果
 */
export interface DamageCalcResult {
  /** [D] 单发伤害 */
  damagePerShot: number;
  /** [D] 击杀所需命中次数 */
  shotsToKill: number;
  /** [D] 击杀时间 (毫秒) */
  ttk: number;
  /** [D] 一个弹匣可击杀人数 */
  magazineKills: number;
  /** [D] 伤害倍率说明 */
  damageMultiplier: string;
}

/**
 * [D] 部位倍率
 */
const hitZoneMultipliers: Record<string, number> = {
  head: 4.0, // [D] 头部 4 倍
  chest: 1.0, // [D] 胸部 1 倍
  limb: 0.7, // [D] 四肢 0.7 倍
};

/**
 * [D] 护甲减伤百分比
 */
const armorReductions: Record<number, number> = {
  1: 0.1, // [D] 1级 10% 减伤
  2: 0.2, // [D] 2级 20% 减伤
  3: 0.35, // [D] 3级 35% 减伤
  4: 0.45, // [D] 4级 45% 减伤
  5: 0.55, // [D] 5级 55% 减伤
};

/**
 * [D] 计算伤害
 * 公式：实际伤害 = 基础伤害 * 部位倍率 * 距离衰减 * (1 - 护甲减伤)
 */
export function calculateDamage(input: DamageCalcInput): DamageCalcResult {
  const {
    baseDamage,
    fireRate,
    armorLevel,
    distance,
    hitZone,
    effectiveRange,
    magazineSize,
  } = input;

  // [D] 部位倍率
  const zoneMultiplier = hitZoneMultipliers[hitZone];

  // [D] 距离衰减：每超过有效射程 10m，伤害 -5%
  const distanceOverRange = Math.max(0, distance - effectiveRange);
  const distancePenalty = Math.floor(distanceOverRange / 10) * 0.05;
  const distanceMultiplier = Math.max(0.1, 1 - distancePenalty);

  // [D] 护甲减伤
  const armorReduction = armorReductions[armorLevel] || 0;

  // [D] 计算实际伤害
  const rawDamage = baseDamage * zoneMultiplier * distanceMultiplier;
  const damagePerShot = Math.max(1, Math.round(rawDamage * (1 - armorReduction)));

  // [D] 击杀所需命中次数（假设敌人 100 血）
  const enemyHealth = 100;
  const shotsToKill = Math.ceil(enemyHealth / damagePerShot);

  // [D] 击杀时间（毫秒）
  // TTK = (命中次数 - 1) * (60 / 射速) * 1000
  const timePerShot = (60 / fireRate) * 1000;
  const ttk = Math.round((shotsToKill - 1) * timePerShot);

  // [D] 一个弹匣可击杀人数
  const magazineKills = Math.floor(magazineSize / shotsToKill);

  // [D] 伤害倍率说明
  const multipliers: string[] = [];
  if (zoneMultiplier !== 1) {
    multipliers.push(`部位 ${zoneMultiplier}x`);
  }
  if (distanceMultiplier < 1) {
    multipliers.push(`距离 ${(distanceMultiplier * 100).toFixed(0)}%`);
  }
  if (armorReduction > 0) {
    multipliers.push(`护甲 -${(armorReduction * 100).toFixed(0)}%`);
  }
  const damageMultiplier = multipliers.join(" · ") || "无倍率";

  return {
    damagePerShot,
    shotsToKill,
    ttk,
    magazineKills,
    damageMultiplier,
  };
}

/**
 * [D] 获取护甲名称
 */
export function getArmorLabel(level: number): string {
  const labels: Record<number, string> = {
    1: "1级甲 (轻甲)",
    2: "2级甲 (标准甲)",
    3: "3级甲 (重型甲)",
    4: "4级甲 (精英甲)",
    5: "5级甲 (顶级甲)",
  };
  return labels[level] || "未知护甲";
}

/**
 * [D] 获取部位名称
 */
export function getHitZoneLabel(zone: string): string {
  const labels: Record<string, string> = {
    head: "头部",
    chest: "胸部",
    limb: "四肢",
  };
  return labels[zone] || "未知部位";
}
