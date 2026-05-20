// [C] 任务详情页 - Server Component

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getQuestById, getQuestIds, getPrerequisites } from "@/lib/quests";
import { QuestFlow } from "@/components/quests/QuestFlow";
import { QuestRewards } from "@/components/quests/QuestRewards";
import { QuestPrerequisites } from "@/components/quests/QuestPrerequisites";
import { Card, CardContent, Badge } from "@/components/ui";
import {
  QuestTypeLabels,
  QuestDifficultyLabels,
} from "@/types/quest.types";
import type { QuestDifficulty } from "@/types/quest.types";

// [C] 生成静态参数
export function generateStaticParams() {
  const ids = getQuestIds();
  return ids.map((id) => ({ id }));
}

// [C] 生成元数据
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const quest = getQuestById(params.id);
  if (!quest) {
    return { title: "任务未找到 - 三角洲行动攻略" };
  }
  return {
    title: `${quest.name} - 任务攻略 - 三角洲行动攻略`,
    description: quest.description,
  };
}

// [C] 难度星级
function DifficultyStars({ difficulty }: { difficulty: QuestDifficulty }) {
  const stars = { easy: 1, medium: 2, hard: 3, extreme: 4 };
  return (
    <span className="text-yellow-400">
      {"★".repeat(stars[difficulty])}
      {"☆".repeat(4 - stars[difficulty])}
    </span>
  );
}

// [C] 难度颜色映射
const difficultyColorMap: Record<QuestDifficulty, string> = {
  easy: "success",
  medium: "warning",
  hard: "danger",
  extreme: "danger",
};

// [C] 相关地图组件
function RelatedMaps({ mapIds }: { mapIds: string[] }) {
  if (mapIds.length === 0) return null;

  return (
    <div className="space-y-2">
      <h4 className="font-bold text-text-primary">涉及地图</h4>
      <div className="flex flex-wrap gap-2">
        {mapIds.map((mapId) => (
          <Link key={mapId} href={`/maps/${mapId}`}>
            <Badge variant="info" size="sm" className="cursor-pointer hover:bg-accent">
              📍 {mapId}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}

// [C] 任务技巧组件
function QuestTips({ tips }: { tips: string[] }) {
  if (tips.length === 0) return null;

  return (
    <Card variant="outlined" className="bg-warning/5 border-warning/20">
      <CardContent className="p-4">
        <h4 className="font-bold text-warning mb-3">💡 攻略提示</h4>
        <ul className="space-y-2">
          {tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-2 text-text-secondary">
              <span className="text-warning flex-shrink-0">{index + 1}.</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

// [C] 任务详情页组件
export default function QuestDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const quest = getQuestById(params.id);

  // [C] 任务不存在时返回 404
  if (!quest) {
    notFound();
  }

  // [C] 获取前置任务详情
  const prerequisites = getPrerequisites(quest);

  const typeLabel = QuestTypeLabels[quest.type];
  const difficultyLabel = QuestDifficultyLabels[quest.difficulty];
  const difficultyVariant = difficultyColorMap[quest.difficulty];

  return (
    <div className="space-y-6">
      {/* [C] 返回链接 */}
      <Link
        href="/quests"
        className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
      >
        ← 返回任务列表
      </Link>

      {/* [C] 任务头部信息 */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-1">
              {quest.name}
            </h1>
            <p className="text-lg text-text-secondary uppercase tracking-wider">
              {quest.nameEn}
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant={difficultyVariant as any} size="md">
              {difficultyLabel}
            </Badge>
            <Badge size="md">{typeLabel}</Badge>
          </div>
        </div>

        {/* [C] 基本信息卡片 */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-sm text-text-secondary">难度</span>
                <div className="flex items-center gap-2">
                  <DifficultyStars difficulty={quest.difficulty} />
                  <span className="text-text-secondary">({difficultyLabel})</span>
                </div>
              </div>
              <div>
                <span className="text-sm text-text-secondary">预计耗时</span>
                <div className="text-text-primary font-medium">⏱ {quest.estimatedTime}</div>
              </div>
              <div>
                <span className="text-sm text-text-secondary">任务步骤</span>
                <div className="text-text-primary font-medium">共 {quest.steps.length} 步</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* [C] 任务描述 */}
        <Card variant="outlined">
          <CardContent className="p-4">
            <p className="text-text-primary">{quest.description}</p>
          </CardContent>
        </Card>
      </div>

      {/* [C] 主内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* [C] 左侧：步骤流程 */}
        <div className="lg:col-span-2 space-y-6">
          <QuestFlow steps={quest.steps} />
          <QuestTips tips={quest.tips} />
        </div>

        {/* [C] 右侧：奖励和前置 */}
        <div className="space-y-6">
          <QuestRewards rewards={quest.rewards} />
          <QuestPrerequisites
            prerequisites={prerequisites}
            currentQuestId={quest.id}
          />
          <RelatedMaps mapIds={quest.relatedMapIds} />
        </div>
      </div>
    </div>
  );
}
