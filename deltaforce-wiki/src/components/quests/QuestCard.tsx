// [C] 任务卡片组件 - 展示任务基本信息

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui";
import { Badge } from "@/components/ui";
import type { Quest, QuestType, QuestDifficulty } from "@/types/quest.types";
import {
  QuestTypeLabels,
  QuestDifficultyLabels,
} from "@/types/quest.types";

// [C] 任务卡片组件 Props
interface QuestCardProps {
  quest: Quest;
  showPrerequisites?: boolean;  // [C] 是否显示前置关系
}

// [C] 任务类型对应的颜色映射
const typeColorMap: Record<QuestType, string> = {
  main: "danger",
  side: "info",
  daily: "success",
  weekly: "warning",
  event: "default",
} as const;

// [C] 难度对应的颜色映射
const difficultyColorMap: Record<QuestDifficulty, string> = {
  easy: "success",
  medium: "warning",
  hard: "danger",
  extreme: "danger",
} as const;

// [C] 难度显示星级
function DifficultyDisplay({ difficulty }: { difficulty: QuestDifficulty }) {
  const stars = { easy: 1, medium: 2, hard: 3, extreme: 4 };
  return (
    <span className="text-yellow-400">
      {"★".repeat(stars[difficulty])}
      {"☆".repeat(4 - stars[difficulty])}
    </span>
  );
}

// [C] 任务卡片组件
export function QuestCard({ quest, showPrerequisites = false }: QuestCardProps) {
  const typeLabel = QuestTypeLabels[quest.type];
  const typeVariant = typeColorMap[quest.type];
  const difficultyLabel = QuestDifficultyLabels[quest.difficulty];
  const difficultyVariant = difficultyColorMap[quest.difficulty];

  // [C] 格式化奖励显示
  const formatReward = (quest: Quest) => {
    const mainReward = quest.rewards[0];
    if (!mainReward) return "无奖励";
    const more = quest.rewards.length > 1 ? ` +${quest.rewards.length - 1}` : "";
    return `${mainReward.name}${mainReward.amount ? ` x${mainReward.amount}` : ""}${more}`;
  };

  return (
    <Link href={`/quests/${quest.id}`}>
      <Card hover className="h-full cursor-pointer">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-text-primary">
                {quest.name}
              </h3>
              <p className="text-xs text-text-secondary uppercase">
                {quest.nameEn}
              </p>
            </div>
            <Badge variant={typeVariant as any} size="sm">
              {typeLabel}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* [C] 难度和耗时 */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="text-text-secondary">难度:</span>
              <Badge variant={difficultyVariant as any} size="sm">
                {difficultyLabel}
              </Badge>
              <DifficultyDisplay difficulty={quest.difficulty} />
            </div>
            <div className="text-text-secondary">
              ⏱ {quest.estimatedTime}
            </div>
          </div>

          {/* [C] 任务描述 */}
          <p className="text-sm text-text-secondary line-clamp-2">
            {quest.description}
          </p>

          {/* [C] 步骤预览 */}
          <div className="text-xs text-text-secondary">
            共 {quest.steps.length} 个步骤
          </div>

          {/* [C] 奖励预览 */}
          <div className="flex items-center gap-2 pt-2 border-t border-surface-light">
            <span className="text-xs text-text-secondary">奖励:</span>
            <span className="text-sm text-accent font-medium">
              {formatReward(quest)}
            </span>
          </div>

          {/* [C] 前置任务提示 */}
          {showPrerequisites && quest.prerequisites.length > 0 && (
            <div className="text-xs text-warning">
              前置: {quest.prerequisites.length} 个任务
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
