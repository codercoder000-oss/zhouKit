// [B2] 武器属性展示组件 - 增强版

import { cn } from "@/lib/utils";
import type { WeaponStats as WeaponStatsType } from "@/types/weapon.types";

interface WeaponStatsProps {
  stats: WeaponStatsType;
  variant?: "bars" | "radar";
}

/**
 * [B2] 获取渐变色 - 根据数值返回从红到绿的颜色
 */
function getGradientColor(percentage: number): string {
  // 低值红色 → 中值黄色 → 高值绿色
  if (percentage < 30) {
    return "from-danger to-danger/70";
  } else if (percentage < 60) {
    return "from-warning to-warning/70";
  } else {
    return "from-success to-success/70";
  }
}

/**
 * [B2] 属性条形图组件 - 带渐变色和动画
 */
function StatBar({
  label,
  value,
  max = 100,
  unit = "",
}: {
  label: string;
  value: number;
  max?: number;
  unit?: string;
}) {
  const percentage = Math.min((value / max) * 100, 100);
  const gradientClass = getGradientColor(percentage);

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-text-secondary">{label}</span>
        <span className="font-medium text-text-primary">
          {value}{unit}
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-surface-light">
        {/* [B2] 渐变条形图 - 使用 CSS transition 实现入场动画 */}
        <div
          className={cn(
            "h-full rounded-full bg-gradient-to-r transition-all duration-1000 ease-out",
            gradientClass
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

/**
 * [B] 武器属性展示组件
 */
export function WeaponStats({ stats, variant = "bars" }: WeaponStatsProps) {
  if (variant === "radar") {
    // [B] 简化的雷达图（使用SVG）
    const attributes = [
      { label: "伤害", value: stats.damage, max: 100 },
      { label: "射速", value: stats.fireRate / 12, max: 100 }, // [B] 归一化
      { label: "精准", value: stats.accuracy, max: 100 },
      { label: "机动", value: stats.mobility, max: 100 },
      { label: "控制", value: 100 - stats.recoil, max: 100 }, // [B] 后坐力越低控制越好
    ];

    const centerX = 100;
    const centerY = 100;
    const radius = 80;
    const angleStep = (2 * Math.PI) / attributes.length;

    // [B] 计算各点坐标
    const points = attributes.map((attr, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const r = (attr.value / attr.max) * radius;
      return {
        x: centerX + r * Math.cos(angle),
        y: centerY + r * Math.sin(angle),
        label: attr.label,
      };
    });

    return (
      <div className="relative">
        <svg viewBox="0 0 200 200" className="w-full max-w-[200px]">
          {/* [B] 背景网格 */}
          {[0.2, 0.4, 0.6, 0.8, 1].map((scale) => (
            <polygon
              key={scale}
              points={attributes
                .map((_, i) => {
                  const angle = i * angleStep - Math.PI / 2;
                  const r = radius * scale;
                  const x = centerX + r * Math.cos(angle);
                  const y = centerY + r * Math.sin(angle);
                  return `${x},${y}`;
                })
                .join(" ")}
              fill="none"
              stroke="var(--surface-light)"
              strokeWidth="1"
            />
          ))}

          {/* [B] 轴线 */}
          {attributes.map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            return (
              <line
                key={i}
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                stroke="var(--surface-light)"
                strokeWidth="1"
              />
            );
          })}

          {/* [B2] 数据区域 - 使用主题色 */}
          <polygon
            points={points.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="rgba(232, 93, 4, 0.3)"
            stroke="var(--accent)"
            strokeWidth="2"
          />

          {/* [B2] 数据点 - 使用主题色 */}
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="3" fill="var(--accent)" />
          ))}
        </svg>

        {/* [B2] 标签 - 使用主题色 */}
        <div className="mt-2 grid grid-cols-5 gap-1 text-center text-xs">
          {attributes.map((attr) => (
            <div key={attr.label} className="text-text-secondary">
              {attr.label}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // [B2] 条形图模式 - 使用渐变色和动画
  return (
    <div className="space-y-4">
      <StatBar label="伤害" value={stats.damage} max={100} />
      <StatBar
        label="射速"
        value={stats.fireRate}
        max={1200}
        unit=" RPM"
      />
      <StatBar
        label="精准度"
        value={stats.accuracy}
        max={100}
      />
      <StatBar
        label="后坐力控制"
        value={100 - stats.recoil}
        max={100}
      />
      <StatBar
        label="机动性"
        value={stats.mobility}
        max={100}
      />
      <StatBar
        label="有效射程"
        value={stats.range}
        max={500}
        unit="m"
      />
      <StatBar
        label="弹匣容量"
        value={stats.magazineSize}
        max={100}
      />
      <StatBar
        label="换弹时间"
        value={stats.reloadTime}
        max={6}
        unit="s"
      />
    </div>
  );
}
