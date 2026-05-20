// [C2] 干员属性条形图组件 - Client Component

"use client";

import type { OperatorStats } from "@/types/operator.types";

// [C2] 属性条形图组件 Props
interface OperatorStatsProps {
  stats: OperatorStats;
  maxHealth?: number;      // [C2] 最大生命值用于计算百分比
  maxArmor?: number;       // [C2] 最大护甲值用于计算百分比
}

// [C2] 单个属性条 - 带渐变色和入场动画
function StatBar({
  label,
  value,
  max,
  gradientClass,
  delay = 0,
}: {
  label: string;
  value: number;
  max: number;
  gradientClass: string;
  delay?: number;
}) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-sm text-text-secondary">{label}</span>
        <span className="text-sm font-bold text-text-primary tabular-nums">{value}</span>
      </div>
      <div className="h-3 bg-surface-light rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${gradientClass}`}
          style={{
            width: `${percentage}%`,
            transitionDelay: `${delay}ms`,
            animation: `slideIn 0.7s ease-out ${delay}ms both`,
          }}
        />
      </div>
    </div>
  );
}

// [C2] 评级徽章组件
function RatingBadge({ rating, colorClass }: { rating: string; colorClass: string }) {
  return (
    <div className={`text-lg font-bold ${colorClass}`}>
      {rating}
    </div>
  );
}

// [C2] 干员属性展示组件
export function OperatorStats({
  stats,
  maxHealth = 200,
  maxArmor = 120,
}: OperatorStatsProps) {
  // [C2] 计算评级
  const survivalRating = stats.health >= 150 ? "S" : stats.health >= 120 ? "A" : "B";
  const defenseRating = stats.armor >= 80 ? "S" : stats.armor >= 60 ? "A" : "B";
  const mobilityRating = stats.speed >= 75 ? "S" : stats.speed >= 60 ? "A" : "B";

  // [C2] 评级颜色
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "S": return "text-success";
      case "A": return "text-warning";
      default: return "text-danger";
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-text-primary">属性数值</h3>

      {/* [C2] 属性条区域 - 带渐变色 */}
      <div className="space-y-4 bg-surface p-4 rounded-lg border border-surface-light">
        <StatBar
          label="生命值"
          value={stats.health}
          max={maxHealth}
          gradientClass="bg-gradient-to-r from-danger to-danger/70"
          delay={0}
        />
        <StatBar
          label="护甲值"
          value={stats.armor}
          max={maxArmor}
          gradientClass="bg-gradient-to-r from-warning to-warning/70"
          delay={100}
        />
        <StatBar
          label="移动速度"
          value={stats.speed}
          max={100}
          gradientClass="bg-gradient-to-r from-info to-info/70"
          delay={200}
        />
      </div>

      {/* [C2] 属性评级 */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-3 bg-surface rounded-lg border border-surface-light hover:border-success/50 transition-colors duration-200">
          <div className="text-xs text-text-secondary mb-1">生存能力</div>
          <RatingBadge rating={survivalRating} colorClass={getRatingColor(survivalRating)} />
        </div>
        <div className="p-3 bg-surface rounded-lg border border-surface-light hover:border-warning/50 transition-colors duration-200">
          <div className="text-xs text-text-secondary mb-1">防御能力</div>
          <RatingBadge rating={defenseRating} colorClass={getRatingColor(defenseRating)} />
        </div>
        <div className="p-3 bg-surface rounded-lg border border-surface-light hover:border-info/50 transition-colors duration-200">
          <div className="text-xs text-text-secondary mb-1">机动能力</div>
          <RatingBadge rating={mobilityRating} colorClass={getRatingColor(mobilityRating)} />
        </div>
      </div>

      {/* [C2] CSS 动画定义 */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            width: 0%;
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
