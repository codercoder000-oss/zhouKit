// [D] 快捷入口网格组件

import { Card } from "@/components/ui";
import {
  Crosshair,
  Map,
  Users,
  ClipboardList,
  Wrench,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

// [D] 快捷入口数据
const quickAccessItems = [
  {
    id: "weapons",
    title: "武器库",
    description: "查看所有武器数据与评测",
    icon: Crosshair,
    href: "/weapons",
    color: "text-red-400",
    bgColor: "bg-red-400/10",
  },
  {
    id: "maps",
    title: "地图",
    description: "战术地图与点位攻略",
    icon: Map,
    href: "/maps",
    color: "text-green-400",
    bgColor: "bg-green-400/10",
  },
  {
    id: "operators",
    title: "干员",
    description: "干员技能与玩法解析",
    icon: Users,
    href: "/operators",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    id: "quests",
    title: "任务",
    description: "任务攻略与奖励一览",
    icon: ClipboardList,
    href: "/quests",
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
  },
  {
    id: "tools",
    title: "工具",
    description: "配装模拟与伤害计算",
    icon: Wrench,
    href: "/tools",
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
  },
  {
    id: "guides",
    title: "指南",
    description: "新手指南与进阶技巧",
    icon: BookOpen,
    href: "/guides",
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
  },
];

export function QuickAccess() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">
          快捷入口
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickAccessItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.id} href={item.href}>
                <Card className="h-full p-6 bg-surface/50 border-surface-light hover:border-surface-light/80 hover:bg-surface transition-all cursor-pointer group">
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <h3 className="font-semibold text-text-primary mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-text-secondary">{item.description}</p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
