// [D] 首页 Server Component

import { Metadata } from "next";
import {
  HeroSection,
  QuickAccess,
  FeaturedWeapons,
  UpdateLog,
  SiteStats,
} from "@/components/home";
import { getAllWeapons } from "@/lib/weapons";

// [D] 页面元数据
export const metadata: Metadata = {
  title: "三角洲行动攻略站 - 武器数据库/地图攻略/配装模拟器",
  description:
    "最全面的三角洲行动攻略站，提供武器数据库、地图攻略、配装模拟器、伤害计算器、干员介绍和任务攻略。",
};

export default function HomePage() {
  // [D] 获取武器数据
  const weapons = getAllWeapons();

  return (
    <main className="min-h-screen bg-slate-950">
      {/* [D] Hero 区域 */}
      <HeroSection />

      {/* [D] 快捷入口 */}
      <QuickAccess />

      {/* [D] 热门武器 */}
      <FeaturedWeapons weapons={weapons} />

      {/* [D] 更新日志 */}
      <UpdateLog />

      {/* [D] 站点统计 */}
      <SiteStats weapons={weapons} />
    </main>
  );
}
