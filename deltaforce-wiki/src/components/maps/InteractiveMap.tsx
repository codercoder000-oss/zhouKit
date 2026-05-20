"use client";

// [B2] 互动地图组件 (Client Component) - 增强版

import { useState, useRef } from "react";
import { Modal } from "@/components/ui";
import { MapMarker } from "./MapMarker";
import { MapLegend } from "./MapLegend";
import type { GameMap, MapMarker as MapMarkerType } from "@/types/map.types";
import { cn } from "@/lib/utils";

interface InteractiveMapProps {
  map: GameMap;
  className?: string;
}

/**
 * [B2] 互动地图组件 - 带网格背景和水印
 */
export function InteractiveMap({ map, className }: InteractiveMapProps) {
  const [scale, setScale] = useState(1);
  const [selectedMarker, setSelectedMarker] = useState<MapMarkerType | null>(
    null
  );
  const mapRef = useRef<HTMLDivElement>(null);

  // [B] 缩放控制
  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  };

  const handleReset = () => {
    setScale(1);
  };

  // [B] 点击标记点
  const handleMarkerClick = (marker: MapMarkerType) => {
    setSelectedMarker(marker);
  };

  return (
    <div className={cn("relative", className)}>
      {/* [B2] 地图容器 - 使用主题色 */}
      <div
        ref={mapRef}
        className="relative aspect-video overflow-hidden rounded-lg border border-surface bg-surface"
      >
        {/* [B] 地图图片 */}
        <div
          className="absolute inset-0 transition-transform duration-200"
          style={{ transform: `scale(${scale})` }}
        >
          {/* [B2] 地图网格背景 — 模拟战术地图风格 */}
          <div
            className="relative h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(45,80,22,0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(45,80,22,0.15) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              backgroundColor: 'var(--surface)'
            }}
          >
            {/* [B2] 地图名称水印 */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <span className="text-6xl font-black text-text-primary/5 uppercase tracking-widest">
                {map.name}
              </span>
            </div>

            {/* [B2] 坐标轴标注 */}
            <div className="absolute bottom-2 left-2 text-xs text-text-muted font-mono">
              0,0
            </div>
            <div className="absolute bottom-2 right-2 text-xs text-text-muted font-mono">
              100%,0
            </div>
            <div className="absolute top-2 left-2 text-xs text-text-muted font-mono">
              0,100%
            </div>
            <div className="absolute top-2 right-2 text-xs text-text-muted font-mono">
              100%,100%
            </div>

            {/* [B2] 地图边界框 */}
            <div className="absolute inset-4 border border-primary/20 rounded">
              {/* [B2] 中心标记 */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="h-4 w-4 border border-accent/30 rotate-45" />
              </div>
            </div>
          </div>

          {/* [B] 标记点 */}
          {map.markers.map((marker) => (
            <MapMarker
              key={marker.id}
              marker={marker}
              onClick={() => handleMarkerClick(marker)}
            />
          ))}
        </div>

        {/* [B2] 缩放控制 - 使用主题色 */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-1 rounded-lg border border-surface-light bg-surface/90 p-1 backdrop-blur">
          <button
            onClick={handleZoomIn}
            className="flex h-8 w-8 items-center justify-center rounded bg-surface-light text-text-primary hover:bg-primary/50 transition-colors"
            title="放大"
          >
            +
          </button>
          <button
            onClick={handleReset}
            className="flex h-8 w-8 items-center justify-center rounded bg-surface-light text-xs text-text-primary hover:bg-primary/50 transition-colors"
            title="重置"
          >
            {Math.round(scale * 100)}%
          </button>
          <button
            onClick={handleZoomOut}
            className="flex h-8 w-8 items-center justify-center rounded bg-surface-light text-text-primary hover:bg-primary/50 transition-colors"
            title="缩小"
          >
            -
          </button>
        </div>
      </div>

      {/* [B] 图例 */}
      <MapLegend className="mt-4" />

      {/* [B] 标记点详情弹窗 */}
      <Modal
        open={!!selectedMarker}
        onClose={() => setSelectedMarker(null)}
        title={selectedMarker?.label || ""}
        size="sm"
      >
        {selectedMarker && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: getMarkerColor(selectedMarker.type),
                }}
              />
              <span className="text-sm text-text-secondary">
                {getMarkerLabel(selectedMarker.type)}
              </span>
            </div>
            <p className="text-text-primary">{selectedMarker.description}</p>
            <div className="text-sm text-text-muted">
              坐标: ({selectedMarker.x}%, {selectedMarker.y}%)
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

/**
 * [B] 获取标记点颜色
 */
function getMarkerColor(type: string): string {
  const colors: Record<string, string> = {
    extract: "#22c55e",
    spawn: "#3b82f6",
    loot: "#f59e0b",
    boss: "#ef4444",
    quest: "#8b5cf6",
    danger: "#dc2626",
    camp: "#6b7280",
  };
  return colors[type] || "#6b7280";
}

/**
 * [B] 获取标记点标签
 */
function getMarkerLabel(type: string): string {
  const labels: Record<string, string> = {
    extract: "撤离点",
    spawn: "出生点",
    loot: "战利品",
    boss: "Boss",
    quest: "任务点",
    danger: "危险区域",
    camp: "常用蹲点",
  };
  return labels[type] || type;
}
