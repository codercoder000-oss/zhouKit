// [D] 更新日志组件

import { Card, Badge } from "@/components/ui";
import { Clock } from "lucide-react";

// [D] 更新日志数据
const updates = [
  {
    id: "1",
    version: "v1.2.0",
    date: "2024-05-15",
    type: "feature",
    title: "新增配装模拟器",
    description: "现在可以在线模拟武器配装，实时查看属性变化",
  },
  {
    id: "2",
    version: "v1.1.5",
    date: "2024-05-10",
    type: "update",
    title: "武器数据更新",
    description: "更新了所有武器的数值，适配最新版本",
  },
  {
    id: "3",
    version: "v1.1.0",
    date: "2024-05-05",
    type: "feature",
    title: "新增伤害计算器",
    description: "添加伤害计算器工具，支持不同护甲等级计算",
  },
  {
    id: "4",
    version: "v1.0.5",
    date: "2024-05-01",
    type: "fix",
    title: "Bug 修复",
    description: "修复了若干显示问题",
  },
  {
    id: "5",
    version: "v1.0.0",
    date: "2024-04-28",
    type: "release",
    title: "正式发布",
    description: "三角洲行动攻略站正式上线！",
  },
];

// [D] 更新类型标签
const typeLabels: Record<string, { label: string; variant: string }> = {
  feature: { label: "新功能", variant: "bg-green-500/20 text-green-400" },
  update: { label: "更新", variant: "bg-blue-500/20 text-blue-400" },
  fix: { label: "修复", variant: "bg-orange-500/20 text-orange-400" },
  release: { label: "发布", variant: "bg-purple-500/20 text-purple-400" },
};

export function UpdateLog() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Clock className="w-6 h-6 text-info" />
          <h2 className="text-2xl font-bold text-text-primary">最新更新</h2>
        </div>

        <div className="space-y-3">
          {updates.map((update) => {
            const typeInfo = typeLabels[update.type];
            return (
              <Card
                key={update.id}
                className="p-4 bg-surface/50 border-surface-light"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  {/* [D2] 版本和标签 */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-text-secondary">
                      {update.version}
                    </span>
                    <Badge className={`${typeInfo.variant} text-xs`}>
                      {typeInfo.label}
                    </Badge>
                  </div>

                  {/* [D2] 更新内容 */}
                  <div className="flex-1">
                    <h3 className="font-medium text-text-primary">{update.title}</h3>
                    <p className="text-sm text-text-secondary">
                      {update.description}
                    </p>
                  </div>

                  {/* [D2] 日期 */}
                  <span className="text-xs text-text-muted">{update.date}</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
