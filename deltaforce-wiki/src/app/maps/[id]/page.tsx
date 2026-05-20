// [B] 地图详情页 - Server Component
// [A2] 使用动态导入优化大型 Client Component 加载

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { getMapById, generateMapParams } from "@/lib/maps";
import { Badge, Skeleton } from "@/components/ui";
import type { MapSize } from "@/types/map.types";

// [A2] 动态导入互动地图组件
const InteractiveMap = dynamic(
  () =>
    import("@/components/maps/InteractiveMap").then((mod) => ({
      default: mod.InteractiveMap,
    })),
  {
    loading: () => (
      <Skeleton variant="image" className="aspect-video" />
    ),
  }
);

// [B] 生成静态参数
export async function generateStaticParams() {
  return generateMapParams();
}

// [B] 生成动态 metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const map = getMapById(id);

  if (!map) {
    return {
      title: "地图未找到 - 三角洲行动攻略",
    };
  }

  return {
    title: `${map.name} - 地图攻略 - 三角洲行动攻略`,
    description: map.description,
  };
}

/**
 * [B] 获取大小显示文本
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
 * [B] 获取大小颜色
 */
function getSizeColor(size: MapSize): string {
  const colors: Record<MapSize, string> = {
    small: "bg-green-500",
    medium: "bg-yellow-500",
    large: "bg-red-500",
  };
  return colors[size];
}

// [B] 地图详情页
export default async function MapDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const map = getMapById(id);

  // [B] 不存在的 ID 调用 notFound()
  if (!map) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-950 pb-12">
      {/* [B] 面包屑导航 */}
      <div className="border-b border-gray-800 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-white">
              首页
            </Link>
            <span>/</span>
            <Link href="/maps" className="hover:text-white">
              地图攻略
            </Link>
            <span>/</span>
            <span className="text-white">{map.name}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* [B] 地图头部信息 */}
        <div className="mb-8 rounded-lg border border-gray-800 bg-gray-900 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-white">{map.name}</h1>
                <Badge className={`${getSizeColor(map.size)} text-white`}>
                  {getSizeLabel(map.size)}
                </Badge>
              </div>
              <p className="mt-1 text-gray-500">{map.nameEn}</p>
              <p className="mt-2 max-w-2xl text-gray-300">{map.description}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">玩家数量</div>
              <div className="text-lg font-medium text-white">{map.playerCount}</div>
            </div>
          </div>

          {/* [B] 支持模式 */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-400">支持模式：</span>
            {map.mode.map((m) => (
              <Badge key={m} variant="secondary">
                {m}
              </Badge>
            ))}
          </div>
        </div>

        {/* [B] 互动地图 */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-bold text-white">互动地图</h2>
          <InteractiveMap map={map} />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* [B] 战术提示 */}
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">战术提示</h2>
            <ul className="space-y-3">
              {map.tips.map((tip, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-sm text-blue-400">
                    {index + 1}
                  </span>
                  <span className="text-gray-300">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* [B] 标记点列表 */}
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">
              标记点 ({map.markers.length})
            </h2>
            <div className="max-h-80 space-y-2 overflow-y-auto pr-2">
              {map.markers.map((marker) => (
                <div
                  key={marker.id}
                  className="flex items-start gap-3 rounded-lg bg-gray-800 p-3"
                >
                  <span
                    className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                    style={{
                      backgroundColor: getMarkerColor(marker.type),
                    }}
                  />
                  <div>
                    <div className="font-medium text-white">{marker.label}</div>
                    <div className="text-sm text-gray-500">
                      {marker.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
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
