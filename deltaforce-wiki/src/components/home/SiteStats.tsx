// [D] 站点数据统计组件

import { Card } from "@/components/ui";
import { Weapon, MapData, Operator, Quest } from "@/types";
import { Crosshair, Map, Users, FileText } from "lucide-react";

interface SiteStatsProps {
  weapons: Weapon[];
  maps?: MapData[];
  operators?: Operator[];
  quests?: Quest[];
}

export function SiteStats({
  weapons,
  maps = [],
  operators = [],
  quests = [],
}: SiteStatsProps) {
  // [D] 统计数据
  const stats = [
    {
      id: "weapons",
      label: "武器数量",
      value: weapons.length,
      icon: Crosshair,
      color: "text-red-400",
      bgColor: "bg-red-400/10",
    },
    {
      id: "maps",
      label: "地图数量",
      value: maps.length || 8,
      icon: Map,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
    {
      id: "operators",
      label: "干员数量",
      value: operators.length || 12,
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      id: "guides",
      label: "攻略数量",
      value: 5,
      icon: FileText,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
    },
  ];

  return (
    <section className="py-12 px-4 bg-surface/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">
          站点数据
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.id}
                className="p-6 bg-surface border-surface-light text-center"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center mx-auto mb-3`}
                >
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-text-secondary">{stat.label}</div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
