// [D] 配装模拟器页面
// [A2] 使用动态导入优化大型 Client Component 加载

import { Metadata } from "next";
import dynamic from "next/dynamic";
import { getAllWeapons } from "@/lib/weapons";
import { Wrench } from "lucide-react";
import { Skeleton } from "@/components/ui";

// [A2] 动态导入配装构建器
const LoadoutBuilder = dynamic(
  () =>
    import("@/components/tools").then((mod) => ({
      default: mod.LoadoutBuilder,
    })),
  {
    loading: () => (
      <div className="grid gap-6 lg:grid-cols-3">
        <Skeleton variant="card" className="h-96 lg:col-span-2" />
        <Skeleton variant="card" className="h-96" />
      </div>
    ),
  }
);

// [D] 页面元数据
export const metadata: Metadata = {
  title: "配装模拟器 - 三角洲行动攻略站",
  description: "在线模拟武器配装，实时查看属性变化，打造属于你的完美武器配置。",
};

export default function LoadoutPage() {
  const weapons = getAllWeapons();

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* [D2] 页面标题 - 使用主题色 */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <Wrench className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">配装模拟器</h1>
            <p className="text-text-secondary">
              选择武器和配件，实时预览属性变化
            </p>
          </div>
        </div>

        {/* [D2] 配装构建器 */}
        <LoadoutBuilder weapons={weapons} />
      </div>
    </main>
  );
}
