// [C] 任务数据获取函数

import questsData from "@/data/quests.json";
import type { Quest, QuestType, QuestDifficulty } from "@/types/quest.types";

// [C] 获取所有任务
export function getQuests(): Quest[] {
  return questsData.quests as Quest[];
}

// [C] 根据ID获取任务
export function getQuestById(id: string): Quest | undefined {
  return questsData.quests.find((q) => q.id === id) as Quest | undefined;
}

// [C] 根据类型获取任务
export function getQuestsByType(type: QuestType): Quest[] {
  return questsData.quests.filter((q) => q.type === type) as Quest[];
}

// [C] 根据难度获取任务
export function getQuestsByDifficulty(difficulty: QuestDifficulty): Quest[] {
  return questsData.quests.filter((q) => q.difficulty === difficulty) as Quest[];
}

// [C] 获取所有任务ID（用于generateStaticParams）
export function getQuestIds(): string[] {
  return questsData.quests.map((q) => q.id);
}

// [C] 获取主线任务（包含依赖关系）
export function getMainQuests(): Quest[] {
  return questsData.quests.filter((q) => q.type === "main") as Quest[];
}

// [C] 获取任务的直接前置任务
export function getPrerequisites(quest: Quest): Quest[] {
  if (!quest.prerequisites || quest.prerequisites.length === 0) {
    return [];
  }
  return quest.prerequisites
    .map((id) => getQuestById(id))
    .filter((q): q is Quest => q !== undefined);
}

// [C] 获取依赖于该任务的后续任务
export function getDependentQuests(questId: string): Quest[] {
  return questsData.quests.filter(
    (q) => q.prerequisites?.includes(questId)
  ) as Quest[];
}
