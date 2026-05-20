// [B] 地图标记点组件

import type { MapMarker as MapMarkerType, MarkerType } from "@/types/map.types";
import { cn } from "@/lib/utils";

interface MapMarkerProps {
  marker: MapMarkerType;
  onClick?: () => void;
  className?: string;
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
 * [B] 获取标记点发光颜色
 */
function getMarkerGlow(type: MarkerType): string {
  const colors: Record<MarkerType, string> = {
    extract: "shadow-green-500/50",
    spawn: "shadow-blue-500/50",
    loot: "shadow-yellow-500/50",
    boss: "shadow-red-500/50",
    quest: "shadow-purple-500/50",
    danger: "shadow-red-600/50",
    camp: "shadow-gray-500/50",
  };
  return colors[type];
}

/**
 * [B] 地图标记点组件
 */
export function MapMarker({ marker, onClick, className }: MapMarkerProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group absolute -translate-x-1/2 -translate-y-1/2",
        "transition-all duration-200 hover:z-10 hover:scale-125",
        className
      )}
      style={{
        left: `${marker.x}%`,
        top: `${marker.y}%`,
      }}
      title={marker.label}
    >
      {/* [B] 标记点主体 */}
      <div
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full shadow-lg",
          getMarkerColor(marker.type),
          getMarkerGlow(marker.type),
          "ring-2 ring-white/20"
        )}
      >
        <span className="text-sm">{getMarkerIcon(marker.type)}</span>
      </div>

      {/* [B] 悬停提示 */}
      <div
        className={cn(
          "absolute left-1/2 top-full mt-1 -translate-x-1/2",
          "whitespace-nowrap rounded bg-black/80 px-2 py-1",
          "text-xs text-white opacity-0 transition-opacity",
          "group-hover:opacity-100 pointer-events-none z-20"
        )}
      >
        {marker.label}
      </div>

      {/* [B] 脉冲动画 */}
      <span
        className={cn(
          "absolute inset-0 rounded-full animate-ping opacity-75",
          getMarkerColor(marker.type)
        )}
        style={{ animationDuration: "2s" }}
      />
    </button>
  );
}
