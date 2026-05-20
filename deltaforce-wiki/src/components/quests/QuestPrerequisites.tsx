// [C] 前置任务链展示组件

import Link from "next/link";
import { Card, CardContent } from "@/components/ui";
import { Badge } from "@/components/ui";
import type { Quest } from "@/types/quest.types";
import { QuestTypeLabels } from "@/types/quest.types";

// [C] 前置任务链组件 Props
interface QuestPrerequisitesProps {
  prerequisites: Quest[];
  currentQuestId: string;
}

// [C] 前置任务节点
function PrereqNode({
  quest,
  isCompleted = false,
}: {
  quest: Quest;
  isCompleted?: boolean;
}) {
  const typeLabel = QuestTypeLabels[quest.type];

  return (
    <Link href={`/quests/${quest.id}`}>
      <Card
        hover
        variant={isCompleted ? "outlined" : "default"}
        className="cursor-pointer"
      >
        <CardContent className="p-3">
          <div className="flex items-center gap-3">
            {/* [C] 完成状态指示 */}
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                isCompleted
                  ? "bg-success text-white"
                  : "bg-surface-light text-text-secondary"
              }`}
            >
              {isCompleted ? "✓" : "○"}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-text-primary truncate">
                  {quest.name}
                </span>
                <Badge size="sm" variant="default">
                  {typeLabel}
                </Badge>
              </div>
              <p className="text-xs text-text-secondary line-clamp-1">
                {quest.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// [C] 前置任务链组件
export function QuestPrerequisites({
  prerequisites,
  currentQuestId,
}: QuestPrerequisitesProps) {
  if (!prerequisites || prerequisites.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-text-primary">前置任务</h3>
        <div className="p-4 bg-surface rounded-lg border border-surface-light text-center">
          <span className="text-success text-2xl">✓</span>
          <p className="text-text-secondary mt-2">该任务无前置要求</p>
          <p className="text-xs text-text-secondary">可以直接接取</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-text-primary">
        前置任务
        <span className="ml-2 text-sm font-normal text-text-secondary">
          需先完成以下 {prerequisites.length} 个任务
        </span>
      </h3>

      {/* [C] 前置任务链 */}
      <div className="space-y-3">
        {prerequisites.map((quest, index) => (
          <div key={quest.id} className="flex items-center gap-3">
            <div className="flex-1">
              <PrereqNode quest={quest} isCompleted={false} />
            </div>
            {/* [C] 箭头连接 */}
            {index < prerequisites.length - 1 && (
              <div className="text-text-secondary text-xl">↓</div>
            )}
          </div>
        ))}
      </div>

      {/* [C] 当前任务提示 */}
      <div className="flex items-center gap-3">
        <div className="flex-1 p-3 bg-accent/10 rounded-lg border border-accent/30">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-sm">
              →
            </span>
            <span className="font-bold text-accent">当前任务</span>
          </div>
        </div>
      </div>
    </div>
  );
}
