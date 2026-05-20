// [B] 地图数据获取函数

import mapsData from "@/data/maps.json";
import type { GameMap, MapSize, MarkerType } from "@/types/map.types";

// [B] 类型断言确保数据正确
const maps = mapsData.maps as GameMap[];

/**
 * [B] 获取所有地图列表
 * @returns 地图数组
 */
export function getMaps(): GameMap[] {
  return maps;
}

/**
 * [B] 根据ID获取单个地图
 * @param id 地图ID
 * @returns 地图对象或undefined
 */
export function getMapById(id: string): GameMap | undefined {
  return maps.find((map) => map.id === id);
}

/**
 * [B] 按大小筛选地图
 * @param size 地图大小
 * @returns 筛选后的地图数组
 */
export function getMapsBySize(size: MapSize): GameMap[] {
  return maps.filter((map) => map.size === size);
}

/**
 * [B] 按游戏模式筛选地图
 * @param mode 游戏模式
 * @returns 筛选后的地图数组
 */
export function getMapsByMode(mode: string): GameMap[] {
  return maps.filter((map) => map.mode.includes(mode));
}

/**
 * [B] 综合筛选地图
 * @param filters 筛选条件
 * @returns 筛选后的地图数组
 */
export function filterMaps(filters: {
  size?: MapSize;
  mode?: string;
  search?: string;
}): GameMap[] {
  return maps.filter((map) => {
    // [B] 按大小筛选
    if (filters.size && map.size !== filters.size) {
      return false;
    }

    // [B] 按模式筛选
    if (filters.mode && !map.mode.includes(filters.mode)) {
      return false;
    }

    // [B] 按搜索词筛选
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const nameMatch = map.name.toLowerCase().includes(searchLower);
      const nameEnMatch = map.nameEn.toLowerCase().includes(searchLower);
      const descMatch = map.description?.toLowerCase().includes(searchLower);

      if (!nameMatch && !nameEnMatch && !descMatch) {
        return false;
      }
    }

    return true;
  });
}

/**
 * [B] 获取所有地图大小类型
 * @returns 大小类型数组
 */
export function getAllMapSizes(): MapSize[] {
  return ["small", "medium", "large"];
}

/**
 * [B] 获取所有游戏模式
 * @returns 模式数组
 */
export function getAllModes(): string[] {
  const modes = new Set<string>();
  maps.forEach((map) => {
    map.mode.forEach((m) => modes.add(m));
  });
  return Array.from(modes);
}

/**
 * [B] 获取地图标记类型颜色
 * @param type 标记类型
 * @returns 颜色代码
 */
export function getMarkerColor(type: MarkerType): string {
  const colorMap: Record<MarkerType, string> = {
    extract: "#22c55e", // [B] 绿色 - 撤离点
    spawn: "#3b82f6", // [B] 蓝色 - 出生点
    loot: "#f59e0b", // [B] 橙色 - 战利品
    boss: "#ef4444", // [B] 红色 - Boss
    quest: "#8b5cf6", // [B] 紫色 - 任务
    danger: "#dc2626", // [B] 深红 - 危险
    camp: "#6b7280", // [B] 灰色 - 蹲点
  };
  return colorMap[type];
}

/**
 * [B] 生成静态参数（用于 generateStaticParams）
 * @returns 参数数组
 */
export function generateMapParams(): { id: string }[] {
  return maps.map((map) => ({ id: map.id }));
}
