// [B2] 武器详情页 - Server Component - 增强版

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getWeaponById, generateWeaponParams } from "@/lib/weapons";
import { WeaponStats } from "@/components/weapons/WeaponStats";
import { AttachmentTree } from "@/components/weapons/AttachmentTree";
import { Button, Badge } from "@/components/ui";
import {
  WeaponCategoryLabels,
  WeaponTier,
} from "@/types/weapon.types";

// [B] 生成静态参数
export async function generateStaticParams() {
  return generateWeaponParams();
}

// [B] 生成动态 metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const weapon = getWeaponById(id);

  if (!weapon) {
    return {
      title: "武器未找到 - 三角洲行动攻略",
    };
  }

  return {
    title: `${weapon.name} - 武器详情 - 三角洲行动攻略`,
    description: weapon.description,
  };
}

/**
 * [B2] 获取评级颜色 - 使用主题色
 * S=金色(secondary), A=紫色, B=蓝色(info), C=绿色(success), D=灰色
 */
function getTierColor(tier: WeaponTier): string {
  const colors: Record<WeaponTier, string> = {
    S: "bg-secondary text-background",
    A: "bg-purple-500 text-white",
    B: "bg-info text-white",
    C: "bg-success text-white",
    D: "bg-text-muted text-white",
  };
  return colors[tier];
}

/**
 * [B2] 属性图标映射
 */
const statIcons: Record<string, string> = {
  damage: "💥",
  fireRate: "🔥",
  accuracy: "🎯",
  recoil: "📊",
  mobility: "🏃",
  range: "📏",
  magazineSize: "📦",
  reloadTime: "⏱️",
};

/**
 * [B2] 属性标签映射
 */
const statLabels: Record<string, string> = {
  damage: "伤害",
  fireRate: "射速",
  accuracy: "精准度",
  recoil: "后坐力",
  mobility: "机动性",
  range: "射程",
  magazineSize: "弹匣",
  reloadTime: "换弹",
};

// [B2] 武器详情页 - 增强版
export default async function WeaponDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const weapon = getWeaponById(id);

  // [B2] 不存在的 ID 调用 notFound()
  if (!weapon) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* [B2] 面包屑导航 - 使用主题色 */}
      <div className="border-b border-surface bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-text-secondary">
            <Link href="/" className="transition-colors hover:text-text-primary">
              首页
            </Link>
            <span>/</span>
            <Link href="/weapons" className="transition-colors hover:text-text-primary">
              武器数据库
            </Link>
            <span>/</span>
            <span className="text-text-primary">{weapon.name}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* [B2] 左侧：武器图片和基本信息 */}
          <div>
            {/* [B2] 武器图片占位 - 使用主题色 */}
            <div className="relative aspect-video overflow-hidden rounded-lg border border-surface bg-surface">
              <div className="absolute inset-0 flex items-center justify-center text-text-muted">
                <svg
                  className="h-24 w-24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              {/* [B2] 评级徽章 - 使用主题色 */}
              <Badge
                className={`absolute right-4 top-4 text-lg font-bold ${getTierColor(
                  weapon.tier
                )}`}
              >
                {weapon.tier} 级
              </Badge>
            </div>

            {/* [B2] 武器基本信息 - 使用主题色 */}
            <div className="mt-6 rounded-lg border border-surface bg-surface p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-text-primary">
                    {weapon.name}
                  </h1>
                  <p className="text-text-muted">{weapon.nameEn}</p>
                </div>
                <Badge variant="secondary" size="lg">
                  {WeaponCategoryLabels[weapon.category]}
                </Badge>
              </div>

              <p className="mt-4 text-text-secondary">{weapon.description}</p>

              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <div>
                  <span className="text-text-muted">口径：</span>
                  <span className="text-text-primary">{weapon.caliber}</span>
                </div>
                {weapon.unlockLevel && (
                  <div>
                    <span className="text-text-muted">解锁等级：</span>
                    <span className="text-text-primary">Lv.{weapon.unlockLevel}</span>
                  </div>
                )}
              </div>
            </div>

            {/* [B2] 属性卡片网格 - 新增 */}
            <h2 className="mb-4 mt-8 text-xl font-bold text-text-primary">核心属性</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {Object.entries(weapon.stats).slice(0, 8).map(([key, value]) => (
                <div
                  key={key}
                  className="flex flex-col items-center rounded-lg border border-surface bg-surface p-3 transition-colors hover:border-accent/30"
                >
                  <span className="text-2xl">{statIcons[key] || "📊"}</span>
                  <span className="mt-1 text-xs text-text-muted">{statLabels[key] || key}</span>
                  <span className="text-lg font-bold text-text-primary">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* [B2] 右侧：属性统计 */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-text-primary">属性条形图</h2>
            <div className="rounded-lg border border-surface bg-surface p-6">
              <WeaponStats stats={weapon.stats} variant="bars" />
            </div>

            {/* [B2] 属性雷达图 */}
            <h2 className="mb-4 mt-8 text-xl font-bold text-text-primary">属性雷达</h2>
            <div className="flex justify-center rounded-lg border border-surface bg-surface p-6">
              <WeaponStats stats={weapon.stats} variant="radar" />
            </div>
          </div>
        </div>

        {/* [B2] 配件槽位 */}
        <div className="mt-8">
          <AttachmentTree attachments={weapon.attachments} />
        </div>

        {/* [B2] 推荐配装（占位） - 使用主题色 */}
        <div className="mt-8 rounded-lg border border-surface bg-surface p-6">
          <h2 className="text-xl font-bold text-text-primary">推荐配装</h2>
          <p className="mt-2 text-text-muted">
            此武器的推荐配件组合将在后续版本中推出...
          </p>
        </div>
      </div>
    </div>
  );
}
