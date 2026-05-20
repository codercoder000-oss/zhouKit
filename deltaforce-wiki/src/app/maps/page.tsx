// [B2] 地图列表页 - Server Component

import { Metadata } from "next";
import Link from "next/link";
import { getMaps } from "@/lib/maps";
import { MapCard } from "@/components/maps/MapCard";
import { Badge } from "@/components/ui";
import type { MapSize } from "@/types/map.types";

// [B] 导出 metadata
export const metadata: Metadata = {
  title: "地图攻略 - 三角洲行动攻略",
  description: "三角洲行动全地图攻略，包含撤离点、物资点、Boss位置等详细标记",
};

// [B] 地图列表页
export default function MapsPage({
  searchParams,
}: {
  searchParams?: {
    size?: MapSize;
    mode?: string;
  };
}) {
  // [B] 获取所有地图
  const maps = getMaps();

  // [B] 应用筛选
  let filteredMaps = maps;
  if (searchParams?.size) {
    filteredMaps = filteredMaps.filter((m) => m.size === searchParams.size);
  }
  if (searchParams?.mode) {
    filteredMaps = filteredMaps.filter((m) =>
      m.mode.includes(searchParams.mode!)
    );
  }

  // [B] 获取所有游戏模式
  const allModes = Array.from(new Set(maps.flatMap((m) => m.mode)));

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* [B2] 页面头部 - 使用主题色 */}
      <div className="border-b border-surface bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">地图攻略</h1>
              <p className="mt-1 text-text-secondary">
                三角洲行动全地图数据 - 共 {maps.length} 张地图
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* [B2] 筛选栏 - 使用主题色 */}
        <div className="mb-6 rounded-lg border border-surface bg-surface p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-secondary">地图大小：</span>
              <div className="flex gap-1">
                {["small", "medium", "large"].map((size) => (
                  <Link
                    key={size}
                    href={
                      searchParams?.size === size
                        ? "/maps"
                        : `/maps?size=${size}`
                    }
                  >
                    <Badge
                      variant={
                        searchParams?.size === size ? "default" : "secondary"
                      }
                      className="cursor-pointer capitalize"
                    >
                      {size === "small"
                        ? "小型"
                        : size === "medium"
                          ? "中型"
                          : "大型"}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-text-secondary">游戏模式：</span>
              <div className="flex flex-wrap gap-1">
                {allModes.map((mode) => (
                  <Link
                    key={mode}
                    href={
                      searchParams?.mode === mode
                        ? "/maps"
                        : `/maps?mode=${encodeURIComponent(mode)}`
                    }
                  >
                    <Badge
                      variant={
                        searchParams?.mode === mode ? "default" : "secondary"
                      }
                      className="cursor-pointer"
                    >
                      {mode}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* [B2] 筛选结果提示 - 使用主题色 */}
        {(searchParams?.size || searchParams?.mode) && (
          <div className="mb-4 rounded-lg bg-primary/20 px-4 py-2 text-sm text-secondary">
            显示 {filteredMaps.length} 张地图
            {(searchParams?.size || searchParams?.mode) && "（已筛选）"}
          </div>
        )}

        {/* [B2] 地图网格 */}
        {filteredMaps.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMaps.map((map) => (
              <MapCard key={map.id} map={map} />
            ))}
          </div>
        ) : (
          <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-surface bg-surface">
            <p className="text-text-muted">没有找到符合条件的地图</p>
            <Link href="/maps" className="mt-2 text-secondary hover:underline">
              清除筛选
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
