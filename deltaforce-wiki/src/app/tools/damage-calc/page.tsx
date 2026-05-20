// [D] 伤害计算器页面
// [A2] 使用动态导入优化大型 Client Component 加载

import { Metadata } from "next";
import dynamic from "next/dynamic";
import { getAllWeapons } from "@/lib/weapons";
import { Calculator } from "lucide-react";
import { Skeleton } from "@/components/ui";

// [A2] 动态导入伤害计算器
const DamageCalculator = dynamic(
  () =>
    import("@/components/tools").then((mod) => ({
      default: mod.DamageCalculator,
    })),
  {
    loading: () => (
      <div className="grid gap-6 lg:grid-cols-3">
        <Skeleton variant="card" className="h-80" />
        <Skeleton variant="card" className="h-80 lg:col-span-2" />
      </div>
    ),
  }
);

// [D] 页面元数据
export const metadata: Metadata = {
  title: "伤害计算器 - 三角洲行动攻略站",
  description: "计算武器在不同距离、不同护甲等级下的伤害表现，优化你的战术选择。",
};

export default function DamageCalcPage() {
  const weapons = getAllWeapons();

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* [D2] 页面标题 - 使用主题色 */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
            <Calculator className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">伤害计算器</h1>
            <p className="text-text-secondary">
              精确计算武器在各种条件下的伤害输出
            </p>
          </div>
        </div>

        {/* [D2] 伤害计算器 */}
        <DamageCalculator weapons={weapons} />
      </div>
    </main>
  );
}
