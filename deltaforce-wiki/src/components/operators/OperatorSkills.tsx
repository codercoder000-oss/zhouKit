// [C2] 干员技能展示组件

import { Card, CardContent, CardHeader } from "@/components/ui";
import { Badge } from "@/components/ui";
import type { OperatorSkill, SkillType } from "@/types/operator.types";
import { SkillTypeLabels } from "@/types/operator.types";

// [C2] 技能展示组件 Props
interface OperatorSkillsProps {
  skills: OperatorSkill[];
}

// [C2] 技能类型对应的样式映射
const skillTypeStyleMap: Record<SkillType, { border: string; iconBg: string; glow?: string }> = {
  active: {
    border: "border-info",
    iconBg: "bg-info/20 text-info",
  },
  passive: {
    border: "border-success",
    iconBg: "bg-success/20 text-success",
  },
  ultimate: {
    border: "border-warning",
    iconBg: "bg-warning/20 text-warning",
    glow: "shadow-lg shadow-warning/20",
  },
} as const;

// [C2] 技能类型标签颜色
const skillTypeBadgeMap: Record<SkillType, string> = {
  active: "info",
  passive: "success",
  ultimate: "warning",
} as const;

// [C2] 技能图标
function SkillIcon({ type }: { type: SkillType }) {
  const icons = {
    active: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    passive: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    ultimate: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  };
  return icons[type];
}

// [C2] 冷却时间进度条
function CooldownBar({ cooldown }: { cooldown: number }) {
  const maxCooldown = 120; // [C2] 假设最大冷却时间为120秒
  const percentage = Math.min((cooldown / maxCooldown) * 100, 100);

  // [C2] 根据冷却时间返回颜色
  const getColorClass = (cd: number) => {
    if (cd <= 15) return "bg-success";
    if (cd <= 45) return "bg-info";
    if (cd <= 90) return "bg-warning";
    return "bg-danger";
  };

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-text-secondary">冷却:</span>
      <div className="flex-1 h-1.5 bg-surface-light rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${getColorClass(cooldown)}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="font-medium text-text-primary min-w-[3rem] text-right">
        {cooldown}秒
      </span>
    </div>
  );
}

// [C2] 单个技能卡片
function SkillCard({ skill }: { skill: OperatorSkill }) {
  const typeLabel = SkillTypeLabels[skill.type];
  const typeVariant = skillTypeBadgeMap[skill.type];
  const styles = skillTypeStyleMap[skill.type];

  return (
    <Card
      variant="outlined"
      className={`overflow-hidden transition-all duration-200 hover:border-opacity-100 ${styles.border} ${styles.glow || ""}`}
    >
      <div className="flex">
        {/* [C2] 技能图标 - 不同类型不同颜色 */}
        <div className={`w-20 h-20 flex-shrink-0 flex items-center justify-center transition-colors duration-200 ${styles.iconBg}`}>
          {skill.imageUrl ? (
            <img
              src={skill.imageUrl}
              alt={skill.name}
              className="w-16 h-16 object-contain"
            />
          ) : (
            <SkillIcon type={skill.type} />
          )}
        </div>

        {/* [C2] 技能信息 */}
        <CardContent className="flex-1 p-3 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-text-primary">{skill.name}</h4>
            <Badge variant={typeVariant as any} size="sm">
              {typeLabel}
            </Badge>
          </div>

          <p className="text-sm text-text-secondary mb-2">
            {skill.description}
          </p>

          {/* [C2] 冷却时间显示 - 进度条样式 */}
          {skill.cooldown > 0 && (
            <CooldownBar cooldown={skill.cooldown} />
          )}
        </CardContent>
      </div>
    </Card>
  );
}

// [C2] 干员技能展示组件
export function OperatorSkills({ skills }: OperatorSkillsProps) {
  // [C2] 按类型排序：主动 -> 被动 -> 终极
  const sortedSkills = [...skills].sort((a, b) => {
    const typeOrder = { active: 0, passive: 1, ultimate: 2 };
    return typeOrder[a.type] - typeOrder[b.type];
  });

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-text-primary">技能详情</h3>
      <div className="grid gap-3">
        {sortedSkills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  );
}
