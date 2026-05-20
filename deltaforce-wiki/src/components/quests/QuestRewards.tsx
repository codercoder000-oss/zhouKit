// [C2] 任务奖励展示组件

import { Card, CardContent } from "@/components/ui";
import { Badge } from "@/components/ui";
import type { QuestReward, QuestRewardType } from "@/types/quest.types";

// [C2] 奖励展示组件 Props
interface QuestRewardsProps {
  rewards: QuestReward[];
}

// [C2] 奖励类型图标映射 - SVG 图标
const rewardTypeIcons: Record<QuestRewardType, React.ReactNode> = {
  exp: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  money: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  item: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  weapon: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21h18M4 18h16M6 10v8m4-8v8m4-8v8m4-8v8M9 6h6v4H9V6zM4 10h16l-1.5-4h-13L4 10z" />
    </svg>
  ),
  skin: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
};

// [C2] 奖励类型标签映射
const rewardTypeLabels: Record<QuestRewardType, string> = {
  exp: "经验",
  money: "货币",
  item: "道具",
  weapon: "武器",
  skin: "皮肤",
};

// [C2] 奖励类型颜色映射 - 更鲜明的颜色
const rewardTypeColors: Record<QuestRewardType, { badge: string; bg: string; text: string; border: string }> = {
  exp: {
    badge: "purple",
    bg: "bg-purple-500/20",
    text: "text-purple-400",
    border: "border-purple-500/30",
  },
  money: {
    badge: "warning",
    bg: "bg-warning/20",
    text: "text-warning",
    border: "border-warning/30",
  },
  item: {
    badge: "info",
    bg: "bg-info/20",
    text: "text-info",
    border: "border-info/30",
  },
  weapon: {
    badge: "danger",
    bg: "bg-danger/20",
    text: "text-danger",
    border: "border-danger/30",
  },
  skin: {
    badge: "success",
    bg: "bg-success/20",
    text: "text-success",
    border: "border-success/30",
  },
};

// [C2] 单个奖励卡片
function RewardCard({ reward, index }: { reward: QuestReward; index: number }) {
  const label = rewardTypeLabels[reward.type];
  const colors = rewardTypeColors[reward.type];
  const Icon = rewardTypeIcons[reward.type];

  return (
    <Card
      variant="outlined"
      className={`overflow-hidden transition-all duration-200 hover:border-opacity-100 hover:shadow-lg`}
      style={{
        borderColor: reward.type === 'exp' ? 'rgba(168, 85, 247, 0.3)' : undefined,
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className="flex">
        {/* [C2] 奖励图标区域 - 不同类型不同颜色背景 */}
        <div className={`w-16 h-16 flex-shrink-0 flex items-center justify-center transition-colors duration-200 ${colors.bg} ${colors.text}`}>
          {reward.imageUrl ? (
            <img
              src={reward.imageUrl}
              alt={reward.name}
              className="w-12 h-12 object-contain"
            />
          ) : (
            Icon
          )}
        </div>

        {/* [C2] 奖励信息 */}
        <CardContent className="flex-1 p-3 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant={colors.badge as any} size="sm">
              {label}
            </Badge>
          </div>
          <div className="font-bold text-text-primary">{reward.name}</div>
          {reward.amount && reward.amount > 1 && (
            <div className="text-sm text-accent font-medium">
              x{reward.amount}
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
}

// [C2] 任务奖励展示组件
export function QuestRewards({ rewards }: QuestRewardsProps) {
  if (!rewards || rewards.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-text-primary">任务奖励</h3>
        <p className="text-text-secondary">该任务没有奖励</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-text-primary">
        任务奖励
        <span className="ml-2 text-sm font-normal text-text-secondary">
          共 {rewards.length} 项
        </span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {rewards.map((reward, index) => (
          <RewardCard key={`${reward.name}-${index}`} reward={reward} index={index} />
        ))}
      </div>
    </div>
  );
}
