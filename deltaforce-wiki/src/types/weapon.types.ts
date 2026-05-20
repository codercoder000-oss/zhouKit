// [A] 武器相关类型定义
// [B] 添加 Agent B 要求的武器数据库类型
// [D] 保留兼容性类型

import { BaseEntity } from "./common.types";

/**
 * [A] 武器类别枚举
 * [B] 调整为 kebab-case 格式以符合 URL 和 API 规范
 */
export type WeaponCategory =
  | "assault-rifle" // [B] 突击步枪
  | "smg" // [B] 冲锋枪
  | "sniper" // [B] 狙击枪
  | "shotgun" // [B] 霰弹枪
  | "pistol" // [B] 手枪
  | "lmg" // [B] 轻机枪
  | "dmr"; // [B] 精确射手步枪

/**
 * [A] 武器类别显示名称映射
 * [B] 更新为新的类别格式
 */
export const WeaponCategoryLabels: Record<WeaponCategory, string> = {
  "assault-rifle": "突击步枪",
  smg: "冲锋枪",
  sniper: "狙击枪",
  shotgun: "霰弹枪",
  pistol: "手枪",
  lmg: "轻机枪",
  dmr: "精确射手步枪",
};

/**
 * [A] 武器属性统计接口
 * [B] 调整为 Agent B 要求的格式
 */
export interface WeaponStats {
  /** [B] 基础伤害 */
  damage: number;
  /** [B] 射速 (发/分钟) */
  fireRate: number;
  /** [B] 精准度 (0-100) */
  accuracy: number;
  /** [B] 后坐力 (0-100, 越低越好) */
  recoil: number;
  /** [B] 机动性 (0-100) */
  mobility: number;
  /** [B] 有效射程 (米) */
  range: number;
  /** [B] 弹匣容量 */
  magazineSize: number;
  /** [B] 换弹时间 (秒) */
  reloadTime: number;
  /** [A] 控制性 (0-100) - 保留兼容性 */
  control?: number;
  /** [A] 备弹量 - 保留兼容性 */
  reserveAmmo?: number;
  /** [A] 射击模式 - 保留兼容性 */
  fireModes?: FireMode[];
}

/**
 * [A] 射击模式类型
 */
export type FireMode = "single" | "burst" | "auto";

/**
 * [A] 射击模式显示名称映射
 */
export const FireModeLabels: Record<FireMode, string> = {
  single: "单发",
  burst: "点射",
  auto: "全自动",
};

/**
 * [B] 配件槽位类型（Agent B 格式）
 */
export type AttachmentSlotType =
  | "muzzle" // [B] 枪口
  | "barrel" // [B] 枪管
  | "scope" // [B] 瞄准镜
  | "grip" // [B] 握把
  | "stock" // [B] 枪托
  | "magazine" // [B] 弹匣
  | "laser"; // [B] 激光

/**
 * [B] 配件槽位显示名称映射
 */
export const AttachmentSlotTypeLabels: Record<AttachmentSlotType, string> = {
  muzzle: "枪口",
  barrel: "枪管",
  scope: "瞄准镜",
  grip: "握把",
  stock: "枪托",
  magazine: "弹匣",
  laser: "激光",
};

/**
 * [B] 配件槽位定义
 */
export interface WeaponAttachmentSlot {
  /** [B] 槽位类型 */
  type: AttachmentSlotType;
  /** [B] 兼容的配件 ID 列表 */
  compatible: string[];
}

/**
 * [A] 武器强度评级
 */
export type WeaponTier = "S" | "A" | "B" | "C" | "D";

/**
 * [B] 武器接口（Agent B 扩展版本）
 */
export interface Weapon extends BaseEntity {
  /** [B] 英文名 */
  nameEn: string;
  /** [A/B] 类别 */
  category: WeaponCategory;
  /** [B] 口径 */
  caliber: string;
  /** [A/B] 属性统计 */
  stats: WeaponStats;
  /** [B] 配件槽位定义 */
  attachments: WeaponAttachmentSlot[];
  /** [B] 武器图片 URL */
  imageUrl: string;
  /** [B] 强度评级 S/A/B/C/D */
  tier: WeaponTier;
  /** [A/B] 解锁等级 */
  unlockLevel?: number;
}

/**
 * [A] 武器配装接口
 */
export interface WeaponLoadout {
  /** 唯一标识符 */
  id: string;
  /** 名称 */
  name: string;
  /** 武器 ID */
  weaponId: string;
  /** 已装备配件 */
  attachments: Record<string, unknown>;
  /** 配装说明 */
  description?: string;
  /** 适用场景标签 */
  tags?: string[];
}
