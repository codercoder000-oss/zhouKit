// [A] 地图相关类型定义
// [B] 添加 Agent B 要求的地图系统类型

import { BaseEntity } from "./common.types";

/**
 * [C] 地图数据类型别名
 */
export type MapData = GameMap;

/**
 * [B] 地图标记类型（Agent B 格式）
 */
export type MarkerType =
  | "extract" // [B] 撤离点
  | "spawn" // [B] 出生点
  | "loot" // [B] 战利品
  | "boss" // [B] Boss 位置
  | "quest" // [B] 任务点
  | "danger" // [B] 危险区域
  | "camp"; // [B] 常用蹲点

/**
 * [B] 标记类型显示名称映射
 */
export const MarkerTypeLabels: Record<MarkerType, string> = {
  extract: "撤离点",
  spawn: "出生点",
  loot: "战利品",
  boss: "Boss",
  quest: "任务点",
  danger: "危险区域",
  camp: "常用蹲点",
};

/**
 * [B] 地图标记接口（Agent B 格式）
 */
export interface MapMarker {
  /** [B] 唯一标识符 */
  id: string;
  /** [B] 标记类型 */
  type: MarkerType;
  /** [B] 标签/名称 */
  label: string;
  /** [B] 描述 */
  description: string;
  /** [B] X 坐标（百分比 0-100） */
  x: number;
  /** [B] Y 坐标（百分比 0-100） */
  y: number;
}

/**
 * [B] 地图大小类型
 */
export type MapSize = "small" | "medium" | "large";

/**
 * [A] 地图接口 - [B] 扩展为 Agent B 格式
 */
export interface GameMap extends BaseEntity {
  /** [B] 英文名 */
  nameEn: string;
  /** [B] 详细地图图片（用于互动地图） */
  mapImageUrl: string;
  /** [A] 地图图片 URL - [B] 用作概览图 */
  imageUrl: string;
  /** [B] 地图大小 small/medium/large */
  size: MapSize;
  /** [B] 玩家数量（如 '32v32'） */
  playerCount: string;
  /** [B] 支持的游戏模式 */
  mode: string[];
  /** [A/B] 地图标记列表 */
  markers: MapMarker[];
  /** [B] 战术提示 */
  tips: string[];
  /** [A] 地图尺寸（米）- 保留兼容性 */
  sizeMeters?: {
    width: number;
    height: number;
  };
  /** [A] 玩家数量上限 - 保留兼容性 */
  maxPlayers?: number;
  /** [A] 平均对战时长（分钟）- 保留兼容性 */
  averageDuration?: number;
  /** [A] 推荐等级 - 保留兼容性 */
  recommendedLevel?: string;
  /** [A] 地图特性 - 保留兼容性 */
  features?: string[];
  /** [A] 是否支持夜战模式 - 保留兼容性 */
  hasNightMode?: boolean;
}
