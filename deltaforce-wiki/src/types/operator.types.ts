// [C] 干员相关类型定义

import { BaseEntity } from "./common.types";

// [C] 干员角色类型
export type OperatorRole = 'assault' | 'recon' | 'support' | 'engineer'

// [C] 干员角色类型显示名称映射
export const OperatorRoleLabels: Record<OperatorRole, string> = {
  assault: "突击",
  recon: "侦察",
  support: "支援",
  engineer: "工程",
}

// [C] 技能类型
export type SkillType = 'active' | 'passive' | 'ultimate'

// [C] 技能类型标签映射
export const SkillTypeLabels: Record<SkillType, string> = {
  active: "主动",
  passive: "被动",
  ultimate: "终极",
}

/**
 * [A] 干员类型
 * @deprecated 使用 OperatorRole 替代
 */
export type OperatorType = "assault" | "support" | "recon" | "engineer";

/**
 * [A] 干员类型显示名称映射
 */
export const OperatorTypeLabels: Record<OperatorType, string> = {
  assault: "突击",
  support: "支援",
  recon: "侦察",
  engineer: "工程",
};

/**
 * [C] 干员技能接口
 */
export interface OperatorSkill {
  id: string
  name: string
  description: string
  cooldown: number      // [C] 冷却时间（秒）
  type: SkillType
  imageUrl: string
}

/**
 * [A] 干员技能接口
 * @deprecated 使用新的 OperatorSkill 接口
 */
export interface OperatorSkillLegacy {
  /** 技能名称 */
  name: string;
  /** 技能描述 */
  description: string;
  /** 冷却时间（秒） */
  cooldown?: number;
  /** 持续时间（秒） */
  duration?: number;
  /** 使用次数限制 */
  charges?: number;
  /** 技能图标 URL */
  iconUrl?: string;
}

/**
 * [C] 干员属性接口
 */
export interface OperatorStats {
  health: number      // [C] 生命值
  armor: number       // [C] 护甲
  speed: number       // [C] 移速 (0-100)
}

/**
 * [A] 干员属性接口
 * @deprecated 使用新的 OperatorStats 接口
 */
export interface OperatorStatsLegacy {
  /** 生命值 */
  health: number;
  /** 移动速度 (0-100) */
  speed: number;
  /** 护甲值 */
  armor: number;
}

/**
 * [C] 干员接口
 */
export interface Operator {
  id: string
  name: string
  nameEn: string
  role: OperatorRole
  description: string
  backstory: string     // [C] 背景故事
  imageUrl: string
  skills: OperatorSkill[]
  stats: OperatorStats
  difficulty: 1 | 2 | 3 | 4 | 5  // [C] 操作难度
  tips: string[]        // [C] 使用技巧
  synergy: string[]     // [C] 配合好的干员 ID
  counters: string[]    // [C] 克制的干员 ID
}

/**
 * [A] 干员接口
 * @deprecated 使用新的 Operator 接口
 */
export interface OperatorLegacy extends BaseEntity {
  /** 干员类型 */
  type: OperatorType;
  /** 所属阵营 */
  faction?: string;
  /** 干员头像 URL */
  portraitUrl?: string;
  /** 属性统计 */
  stats: OperatorStatsLegacy;
  /** 主动技能 */
  activeSkill: OperatorSkillLegacy;
  /** 被动技能 */
  passiveSkill?: OperatorSkillLegacy;
  /** 终极技能 */
  ultimateSkill?: OperatorSkillLegacy;
  /** 推荐武器类型 */
  recommendedWeapons?: string[];
  /** 难度等级 (1-5) */
  difficulty?: number;
  /** 是否默认解锁 */
  isDefault?: boolean;
}
