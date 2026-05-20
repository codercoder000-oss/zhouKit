// [B] 地图图例组件

import { MarkerType, MarkerTypeLabels } from "@/types/map.types";
import { cn } from "@/lib/utils";

interface MapLegendProps {
  className?: string;
}

/**
 * [B] 获取标记点颜色
 */
function getMarkerColor(type: MarkerType): string {
  const colors: Record<MarkerType, string> = {
    extract: "bg-green-500",
    spawn: "bg-blue-500",
    loot: "bg-yellow-500",
    boss: "bg-red-500",
    quest: "bg-purple-500",
    danger: "bg-red-600",
    camp: "bg-gray-500",
  };
  return colors[type];
}

/**
 * [B] 获取标记点图标
 */
function getMarkerIcon(type: MarkerType): string {
  const icons: Record<MarkerType, string> = {
    extract: "🚁",
    spawn: "🏁",
    loot: "📦",
    boss: "👹",
    quest: "📍",
    danger: "⚠️",
    camp: "👁️",
  };
  return icons[type];
}

/**
 * [B] 地图图例组件
 */
export function MapLegend({ className }: MapLegendProps) {
  const types: MarkerType[] = [
    "extract",
    "spawn",
    "loot",
    "boss",
    "quest",
    "danger",
    "camp",
  ];

  return (
    <div
      className={cn(
        "rounded-lg border border-gray-800 bg-gray-900 p-4",
        className
      )}
    >
      <h3 className="mb-3 text-sm font-medium text-gray-400">图例说明</h3>
      <div className="flex flex-wrap gap-3">
        {types.map((type) => (
          <div key={type} className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full",
                getMarkerColor(type)
              )}
            >
              <span className="text-xs">{getMarkerIcon(type)}</span>
            </div>
            <span className="text-sm text-gray-300">
              {MarkerTypeLabels[type]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
