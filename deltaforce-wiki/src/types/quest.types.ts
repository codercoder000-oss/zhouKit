// [C] 任务相关类型定义

import { BaseEntity } from "./common.types";

// [C] 任务类型
export type QuestType = 'main' | 'side' | 'daily' | 'weekly' | 'event'

// [C] 任务难度
export type QuestDifficulty = 'easy' | 'medium' | 'hard' | 'extreme'

/**
 * [C] 任务类型显示名称映射
 */
export const QuestTypeLabels: Record<QuestType, string> = {
  main: "主线任务",
  side: "支线任务",
  daily: "每日任务",
  weekly: "每周任务",
  event: "活动任务",
}

/**
 * [C] 任务难度标签映射
 */
export const QuestDifficultyLabels: Record<QuestDifficulty, string> = {
  easy: "简单",
  medium: "中等",
  hard: "困难",
  extreme: "极限",
}

/**
 * [C] 任务步骤接口
 */
export interface QuestStep {
  order: number
  description: string
  tips?: string
  mapId?: string        // [C] 关联地图
  imageUrl?: string
}

/**
 * [A] 任务奖励类型
 */
export type RewardType = "experience" | "currency" | "item" | "unlock" | "reputation";

// [C] 任务奖励类型
export type QuestRewardType = 'exp' | 'money' | 'item' | 'weapon' | 'skin'

/**
 * [C] 任务奖励接口
 */
export interface QuestReward {
  type: QuestRewardType
  name: string
  amount?: number
  imageUrl?: string
}

/**
 * [C] 任务接口
 */
export interface Quest {
  id: string
  name: string
  nameEn: string
  type: QuestType
  difficulty: QuestDifficulty
  description: string
  prerequisites: string[]   // [C] 前置任务 ID
  steps: QuestStep[]
  rewards: QuestReward[]
  estimatedTime: string     // [C] 预计耗时，如 '15-20分钟'
  tips: string[]
  relatedMapIds: string[]   // [C] 涉及的地图
}

/**
 * [A] 任务类型 - 保留兼容性
 * @deprecated 使用新的 QuestType
 */
export type QuestTypeLegacy = "main" | "side" | "daily" | "weekly" | "event";

/**
 * [A] 任务步骤接口 - 保留兼容性
 * @deprecated 使用新的 QuestStep
 */
export interface QuestStepLegacy {
  /** 步骤序号 */
  order: number;
  /** 步骤描述 */
  description: string;
  /** 完成条件 */
  objective: string;
  /** 目标数量 */
  targetCount?: number;
  /** 当前进度 */
  currentProgress?: number;
  /** 目标地图 */
  targetMap?: string;
  /** 目标物品/敌人 */
  targetEntity?: string;
  /** 是否可选步骤 */
  isOptional?: boolean;
  /** 奖励（仅该步骤） */
  rewards?: QuestRewardLegacy[];
}

/**
 * [A] 任务奖励接口 - 保留兼容性
 * @deprecated 使用新的 QuestReward
 */
export interface QuestRewardLegacy {
  /** 奖励类型 */
  type: RewardType;
  /** 奖励物品/货币名称 */
  name: string;
  /** 数量 */
  amount: number;
  /** 图标 URL */
  iconUrl?: string;
}

/**
 * [A] 任务接口 - 保留兼容性
 * @deprecated 使用新的 Quest
 */
export interface QuestLegacy extends BaseEntity {
  /** 任务类型 */
  type: QuestTypeLegacy;
  /** 任务发布者 */
  giver?: string;
  /** 前置任务 ID 列表 */
  prerequisites?: string[];
  /** 任务步骤 */
  steps: QuestStepLegacy[];
  /** 任务奖励 */
  rewards: QuestRewardLegacy[];
  /** 推荐等级 */
  recommendedLevel?: number;
  /** 相关地图 */
  relatedMaps?: string[];
  /** 任务图片 URL */
  imageUrl?: string;
  /** 是否可重复完成 */
  isRepeatable?: boolean;
  /** 任务期限（活动任务用） */
  expiryDate?: string;
}
