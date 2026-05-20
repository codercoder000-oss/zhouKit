// [C2] 干员卡片组件 - 展示干员基本信息

import Link from "next/link";
import { Card, CardContent } from "@/components/ui";
import { Badge } from "@/components/ui";
import type { Operator, OperatorRole } from "@/types/operator.types";
import { OperatorRoleLabels } from "@/types/operator.types";

// [C2] 干员卡片组件 Props
interface OperatorCardProps {
  operator: Operator;
}

// [C2] 角色类型对应的颜色映射
const roleColorMap: Record<OperatorRole, string> = {
  assault: "accent",
  recon: "info",
  support: "success",
  engineer: "warning",
} as const;

// [C2] 角色类型对应的背景渐变
const roleGradientMap: Record<OperatorRole, string> = {
  assault: "from-accent/20 to-transparent",
  recon: "from-info/20 to-transparent",
  support: "from-success/20 to-transparent",
  engineer: "from-warning/20 to-transparent",
} as const;

// [C2] 渲染难度星级 - 使用实心/空心星星图标
function DifficultyStars({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 transition-all duration-200 ${
            i < level ? "text-warning fill-warning" : "text-text-muted"
          }`}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          fill={i < level ? "currentColor" : "none"}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

// [C2] 干员卡片组件
export function OperatorCard({ operator }: OperatorCardProps) {
  const roleLabel = OperatorRoleLabels[operator.role];
  const roleVariant = roleColorMap[operator.role];
  const roleGradient = roleGradientMap[operator.role];

  return (
    <Link href={`/operators/${operator.id}`} className="group">
      <Card
        hover
        className="h-full cursor-pointer transition-all duration-200 group-hover:-translate-y-1 group-hover:border-accent/50 group-hover:shadow-lg group-hover:shadow-accent/10"
      >
        <CardContent className="p-4">
          {/* [C2] 头像区域 */}
          <div className={`relative aspect-square mb-3 rounded-lg overflow-hidden bg-surface-light bg-gradient-to-b ${roleGradient}`}>
            {operator.imageUrl ? (
              <img
                src={operator.imageUrl}
                alt={operator.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-secondary">
                <span className="text-4xl">👤</span>
              </div>
            )}
            {/* [C2] 角色类型徽章 - 使用对应颜色 */}
            <div className="absolute top-2 right-2">
              <Badge
                variant={roleVariant as any}
                size="sm"
                className="shadow-md"
              >
                {roleLabel}
              </Badge>
            </div>
            {/* [C2] Hover 时显示的遮罩 */}
            <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-200" />
          </div>

          {/* [C2] 信息区域 */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-text-primary group-hover:text-accent transition-colors duration-200">
              {operator.name}
            </h3>
            <p className="text-xs text-text-secondary uppercase tracking-wider">
              {operator.nameEn}
            </p>

            {/* [C2] 难度显示 - 使用星星图标 */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-text-secondary">难度:</span>
              <DifficultyStars level={operator.difficulty} />
            </div>

            {/* [C2] 核心属性预览 */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-surface-light">
              <div className="text-center">
                <div className="text-xs text-text-secondary">生命</div>
                <div className="text-sm font-semibold text-danger">
                  {operator.stats.health}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-text-secondary">护甲</div>
                <div className="text-sm font-semibold text-warning">
                  {operator.stats.armor}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-text-secondary">移速</div>
                <div className="text-sm font-semibold text-info">
                  {operator.stats.speed}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
