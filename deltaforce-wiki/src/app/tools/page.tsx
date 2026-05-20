// [D] 工具页入口

import { Metadata } from "next";
import { Card } from "@/components/ui";
import { Wrench, Calculator, ArrowRight } from "lucide-react";
import Link from "next/link";

// [D] 页面元数据
export const metadata: Metadata = {
  title: "工具 - 三角洲行动攻略站",
  description: "配装模拟器、伤害计算器等实用工具，助你更好地体验游戏。",
};

// [D] 工具列表
const tools = [
  {
    id: "loadout",
    title: "配装模拟器",
    description: "在线模拟武器配装，选择配件并实时查看属性变化，打造属于你的完美配置。",
    icon: Wrench,
    href: "/tools/loadout",
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
  },
  {
    id: "damage-calc",
    title: "伤害计算器",
    description: "计算不同武器在各种情况下的伤害表现，包括护甲等级、射击距离等因素。",
    icon: Calculator,
    href: "/tools/damage-calc",
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
  },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* [D2] 页面标题 - 使用主题色 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-text-primary mb-4">实用工具</h1>
          <p className="text-text-secondary">
            各种辅助工具，助你深入理解游戏机制
          </p>
        </div>

        {/* [D2] 工具卡片网格 - 使用主题色 */}
        <div className="grid md:grid-cols-2 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.id} href={tool.href}>
                <Card className="h-full p-6 bg-surface border-surface-light hover:border-surface-light/80 hover:bg-surface/80 transition-all cursor-pointer group">
                  <div className="flex items-start gap-4">
                    {/* [D2] 图标 */}
                    <div
                      className={`w-14 h-14 rounded-xl ${tool.bgColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className={`w-7 h-7 ${tool.color}`} />
                    </div>

                    {/* [D2] 内容 */}
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-info transition-colors">
                        {tool.title}
                      </h2>
                      <p className="text-text-secondary text-sm mb-4">
                        {tool.description}
                      </p>
                      <div className="flex items-center text-sm text-info group-hover:text-info/80">
                        开始使用
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* [D2] 提示信息 - 使用主题色 */}
        <div className="mt-12 p-4 bg-surface/50 rounded-xl border border-surface-light">
          <p className="text-sm text-text-muted text-center">
            更多工具正在开发中，敬请期待...
          </p>
        </div>
      </div>
    </main>
  );
}
