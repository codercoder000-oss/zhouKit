// [C2] 任务列表页 - Server Component

import { Metadata } from "next";
import { getQuests, getMainQuests } from "@/lib/quests";
import { QuestCard } from "@/components/quests/QuestCard";
import { Card, CardContent } from "@/components/ui";
import Link from "next/link";
import type { QuestType } from "@/types/quest.types";
import { QuestTypeLabels } from "@/types/quest.types";

// [C2] 页面元数据
export const metadata: Metadata = {
  title: "任务攻略 - 三角洲行动攻略",
  description: "查看所有任务攻略，包括主线、支线、日常、周常任务",
};

// [C2] 任务类型 Tab 配置 - 带颜色映射
const questTabs: { id: string; label: string; type?: QuestType; colorClass: string }[] = [
  { id: "all", label: "全部任务", colorClass: "bg-accent" },
  { id: "main", label: QuestTypeLabels.main, type: "main", colorClass: "bg-danger" },
  { id: "side", label: QuestTypeLabels.side, type: "side", colorClass: "bg-info" },
  { id: "daily", label: QuestTypeLabels.daily, type: "daily", colorClass: "bg-success" },
  { id: "weekly", label: QuestTypeLabels.weekly, type: "weekly", colorClass: "bg-warning" },
  { id: "event", label: QuestTypeLabels.event, type: "event", colorClass: "bg-secondary" },
];

// [C2] 根据类型筛选任务
function filterQuestsByType(
  quests: ReturnType<typeof getQuests>,
  type: string
) {
  if (type === "all") return quests;
  return quests.filter((q) => q.type === type);
}

// [C2] 主线任务流程图
function MainQuestFlow() {
  const mainQuests = getMainQuests().sort((a, b) => {
    // [C2] 按前置关系排序
    if (a.prerequisites.includes(b.id)) return 1;
    if (b.prerequisites.includes(a.id)) return -1;
    return 0;
  });

  if (mainQuests.length === 0) return null;

  return (
    <Card variant="outlined">
      <CardContent className="p-4">
        <h3 className="text-lg font-bold text-text-primary mb-4">主线任务流程</h3>
        <div className="flex flex-wrap items-center gap-2">
          {mainQuests.map((quest, index) => (
            <div key={quest.id} className="flex items-center gap-2">
              <Link href={`/quests/${quest.id}`}>
                <div className="px-3 py-2 bg-surface rounded-lg border border-surface-light hover:border-accent transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
                  <div className="font-medium text-text-primary text-sm">{quest.name}</div>
                  <div className="text-xs text-text-secondary">{QuestTypeLabels[quest.type]}</div>
                </div>
              </Link>
              {index < mainQuests.length - 1 && (
                <span className="text-text-secondary">→</span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// [C2] 任务列表页组件
export default function QuestsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // [C2] 获取所有任务
  const allQuests = getQuests();

  // [C2] 获取当前筛选条件
  const currentType = (searchParams?.type as string) || "all";

  // [C2] 筛选后的任务
  const filteredQuests = filterQuestsByType(allQuests, currentType);

  // [C2] 统计各类型任务数量
  const typeCounts = {
    all: allQuests.length,
    main: allQuests.filter((q) => q.type === "main").length,
    side: allQuests.filter((q) => q.type === "side").length,
    daily: allQuests.filter((q) => q.type === "daily").length,
    weekly: allQuests.filter((q) => q.type === "weekly").length,
    event: allQuests.filter((q) => q.type === "event").length,
  };

  return (
    <div className="space-y-6">
      {/* [C2] 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">任务攻略</h1>
        <p className="text-text-secondary">
          查看完整任务流程、步骤提示和奖励信息
        </p>
      </div>

      {/* [C2] 主线任务流程图 */}
      {currentType === "all" || currentType === "main" ? (
        <MainQuestFlow />
      ) : null}

      {/* [C2] 任务类型筛选 - 不同类型不同颜色 */}
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-sm text-text-secondary">按类型筛选:</span>
        <div className="flex flex-wrap gap-2">
          {questTabs.map((tab) => {
            const isActive = currentType === tab.id;
            const count = typeCounts[tab.id as keyof typeof typeCounts];
            return (
              <Link
                key={tab.id}
                href={`/quests?type=${tab.id}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? `${tab.colorClass} text-white shadow-lg`
                    : "bg-surface text-text-secondary hover:text-text-primary hover:bg-surface-light"
                }`}
              >
                {tab.label}
                <span className="ml-1 text-xs opacity-70">({count})</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* [C2] 任务网格 */}
      {filteredQuests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredQuests.map((quest) => (
            <QuestCard
              key={quest.id}
              quest={quest}
              showPrerequisites={quest.type === "main"}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-text-secondary">该类型暂无任务</p>
        </div>
      )}
    </div>
  );
}
