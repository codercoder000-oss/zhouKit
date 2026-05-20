// [B2] 地图卡片组件 - 增强版

import Link from "next/link";
import { Badge } from "@/components/ui";
import type { GameMap, MapSize } from "@/types/map.types";
import { cn } from "@/lib/utils";

interface MapCardProps {
  map: GameMap;
}

/**
 * [B2] 获取大小显示文本
 */
function getSizeLabel(size: MapSize): string {
  const labels: Record<MapSize, string> = {
    small: "小型",
    medium: "中型",
    large: "大型",
  };
  return labels[size];
}

/**
 * [B2] 获取大小颜色 - 使用主题色
 */
function getSizeColor(size: MapSize): string {
  const colors: Record<MapSize, string> = {
    small: "bg-success",
    medium: "bg-warning",
    large: "bg-danger",
  };
  return colors[size];
}

/**
 * [B2] 地图卡片组件 - 添加 hover 效果
 */
export function MapCard({ map }: MapCardProps) {
  return (
    <Link href={`/maps/${map.id}`}>
      <div className="group relative overflow-hidden rounded-lg border border-surface bg-surface transition-all duration-200 hover:scale-[1.02] hover:border-accent/50 hover:shadow-lg">
        {/* [B2] 地图图片 - 使用主题色 */}
        <div className="relative aspect-video overflow-hidden bg-surface-light">
          <div className="absolute inset-0 flex items-center justify-center text-text-muted">
            {/* [B2] 占位图 */}
            <svg
              className="h-16 w-16 transition-transform duration-200 group-hover:scale-110"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7"
              />
            </svg>
          </div>
          {/* [B2] 大小标识 - 使用主题色 */}
          <div
            className={cn(
              "absolute left-2 top-2 rounded px-2 py-1 text-xs font-bold text-white",
              getSizeColor(map.size)
            )}
          >
            {getSizeLabel(map.size)}
          </div>
          {/* [B2] 标记点数量 */}
          <div className="absolute right-2 top-2 rounded bg-background/60 px-2 py-1 text-xs text-text-primary backdrop-blur">
            {map.markers.length} 个标记点
          </div>
        </div>

        {/* [B2] 地图信息 - 使用主题色 */}
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-text-primary transition-colors group-hover:text-accent">
                {map.name}
              </h3>
              <p className="text-sm text-text-muted">{map.nameEn}</p>
            </div>
          </div>

          {/* [B2] 模式和人数 - 使用主题色 */}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs text-text-secondary">{map.playerCount}</span>
            <span className="text-text-muted">•</span>
            {map.mode.slice(0, 2).map((m) => (
              <Badge key={m} variant="secondary" size="sm">
                {m}
              </Badge>
            ))}
            {map.mode.length > 2 && (
              <Badge variant="secondary" size="sm">
                +{map.mode.length - 2}
              </Badge>
            )}
          </div>

          {/* [B2] 描述 - 使用主题色 */}
          <p className="mt-2 line-clamp-2 text-sm text-text-secondary">
            {map.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
