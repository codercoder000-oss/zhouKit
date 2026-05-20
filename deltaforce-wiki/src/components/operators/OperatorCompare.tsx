// [C2] 干员对比组件 - Client Component

"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui";
import { Button } from "@/components/ui";
import { Badge } from "@/components/ui";
import type { Operator } from "@/types/operator.types";
import { OperatorRoleLabels, SkillTypeLabels } from "@/types/operator.types";

// [C2] 干员对比组件 Props
interface OperatorCompareProps {
  operators: Operator[];
}

// [C2] 属性对比条 - 带差异标注
function CompareBar({
  label,
  value1,
  value2,
  max = 100,
}: {
  label: string;
  value1: number;
  value2: number;
  max?: number;
}) {
  const p1 = (value1 / max) * 50; // [C2] 最大50%宽度
  const p2 = (value2 / max) * 50;
  const diff = value1 - value2;

  // [C2] 差异颜色标注
  const getValueClass = (v1: number, v2: number) => {
    if (v1 > v2) return "text-success";
    if (v1 < v2) return "text-danger";
    return "text-text-secondary";
  };

  return (
    <div className="space-y-1">
      <div className="text-xs text-center text-text-secondary">{label}</div>
      <div className="flex items-center gap-2">
        {/* [C2] 左侧数值 - 带差异颜色 */}
        <div className={`w-10 text-right text-sm font-bold ${getValueClass(value1, value2)}`}>
          {value1}
          {diff !== 0 && (
            <span className="text-xs ml-0.5">
              {diff > 0 ? "▲" : ""}
            </span>
          )}
        </div>
        <div className="flex-1 flex items-center">
          {/* [C2] 左侧条 */}
          <div className="flex-1 flex justify-end">
            <div
              className="h-2.5 bg-accent rounded-l transition-all duration-500"
              style={{ width: `${p1}%` }}
            />
          </div>
          {/* [C2] 中间分隔 */}
          <div className="w-px h-4 bg-surface-light" />
          {/* [C2] 右侧条 */}
          <div className="flex-1">
            <div
              className="h-2.5 bg-warning rounded-r transition-all duration-500"
              style={{ width: `${p2}%` }}
            />
          </div>
        </div>
        {/* [C2] 右侧数值 - 带差异颜色 */}
        <div className={`w-10 text-sm font-bold ${getValueClass(value2, value1)}`}>
          {value2}
          {diff !== 0 && (
            <span className="text-xs ml-0.5">
              {diff < 0 ? "▲" : ""}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// [C2] 谁更强总结组件
function WinnerSummary({ leftOp, rightOp }: { leftOp: Operator; rightOp: Operator }) {
  const stats1 = leftOp.stats;
  const stats2 = rightOp.stats;

  // [C2] 计算各属性得分
  const score1 = stats1.health + stats1.armor * 1.5 + stats1.speed * 1.2;
  const score2 = stats2.health + stats2.armor * 1.5 + stats2.speed * 1.2;

  // [C2] 计算各项优势
  const advantages1 = [
    stats1.health > stats2.health ? "生命值" : null,
    stats1.armor > stats2.armor ? "护甲" : null,
    stats1.speed > stats2.speed ? "移速" : null,
  ].filter(Boolean);

  const advantages2 = [
    stats2.health > stats1.health ? "生命值" : null,
    stats2.armor > stats1.armor ? "护甲" : null,
    stats2.speed > stats1.speed ? "移速" : null,
  ].filter(Boolean);

  const winner = score1 > score2 ? leftOp : score2 > score1 ? rightOp : null;
  const isTie = score1 === score2;

  return (
    <div className="p-4 bg-surface rounded-lg border border-surface-light">
      <h4 className="text-sm font-medium text-text-secondary text-center mb-3">
        对比总结
      </h4>

      {isTie ? (
        <div className="text-center text-text-primary">
          <span className="text-xl">🤝</span>
          <p className="mt-1">势均力敌</p>
        </div>
      ) : (
        <div className="space-y-3">
          {/* [C2] 获胜提示 */}
          <div className="text-center">
            <span className="text-2xl">🏆</span>
            <p className="text-lg font-bold text-accent mt-1">
              {winner?.name} 综合更强
            </p>
          </div>

          {/* [C2] 优势对比 */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="text-right">
              <p className="text-accent font-medium mb-1">{leftOp.name}</p>
              {advantages1.length > 0 ? (
                <p className="text-success">
                  优势: {advantages1.join("、")}
                </p>
              ) : (
                <p className="text-text-muted">无明显优势</p>
              )}
            </div>
            <div className="text-left">
              <p className="text-warning font-medium mb-1">{rightOp.name}</p>
              {advantages2.length > 0 ? (
                <p className="text-success">
                  优势: {advantages2.join("、")}
                </p>
              ) : (
                <p className="text-text-muted">无明显优势</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// [C2] 干员选择器
function OperatorSelector({
  operators,
  selectedId,
  onSelect,
  excludeId,
  label,
}: {
  operators: Operator[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  excludeId: string | null;
  label: string;
}) {
  const selected = operators.find((op) => op.id === selectedId);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-text-secondary">{label}</label>
      <select
        value={selectedId || ""}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full px-3 py-2 bg-surface border border-surface-light rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200"
      >
        <option value="">选择干员...</option>
        {operators
          .filter((op) => op.id !== excludeId)
          .map((op) => (
            <option key={op.id} value={op.id}>
              {op.name} ({OperatorRoleLabels[op.role]})
            </option>
          ))}
      </select>
      {selected && (
        <div className="p-2 bg-surface-light rounded text-xs text-text-secondary">
          {selected.description.slice(0, 50)}...
        </div>
      )}
    </div>
  );
}

// [C2] 干员对比组件
export function OperatorCompare({ operators }: OperatorCompareProps) {
  const [leftId, setLeftId] = useState<string | null>(null);
  const [rightId, setRightId] = useState<string | null>(null);

  const leftOp = operators.find((op) => op.id === leftId);
  const rightOp = operators.find((op) => op.id === rightId);

  const clearSelection = () => {
    setLeftId(null);
    setRightId(null);
  };

  return (
    <Card>
      <CardHeader className="border-b border-surface-light">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-text-primary">干员对比</h3>
          {(leftId || rightId) && (
            <Button variant="ghost" size="sm" onClick={clearSelection}>
              清除选择
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {/* [C2] 选择器区域 */}
        <div className="grid grid-cols-2 gap-4">
          <OperatorSelector
            operators={operators}
            selectedId={leftId}
            onSelect={setLeftId}
            excludeId={rightId}
            label="左侧干员"
          />
          <OperatorSelector
            operators={operators}
            selectedId={rightId}
            onSelect={setRightId}
            excludeId={leftId}
            label="右侧干员"
          />
        </div>

        {/* [C2] 对比结果区域 */}
        {leftOp && rightOp ? (
          <div className="space-y-4 pt-4 border-t border-surface-light">
            {/* [C2] 基本信息对比 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-surface rounded-lg border border-accent/30">
                <div className="text-lg font-bold text-accent">{leftOp.name}</div>
                <Badge size="sm" variant="secondary" className="bg-accent/20 text-accent">
                  {OperatorRoleLabels[leftOp.role]}
                </Badge>
                <div className="flex justify-center gap-0.5 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-xs ${
                        i < leftOp.difficulty ? "text-warning" : "text-text-muted"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-center p-3 bg-surface rounded-lg border border-warning/30">
                <div className="text-lg font-bold text-warning">
                  {rightOp.name}
                </div>
                <Badge size="sm" variant="warning">
                  {OperatorRoleLabels[rightOp.role]}
                </Badge>
                <div className="flex justify-center gap-0.5 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-xs ${
                        i < rightOp.difficulty ? "text-warning" : "text-text-muted"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* [C2] 属性对比 - 带差异标注 */}
            <div className="p-4 bg-surface rounded-lg space-y-3">
              <h4 className="text-sm font-medium text-text-secondary text-center">
                属性对比
              </h4>
              <CompareBar
                label="生命值"
                value1={leftOp.stats.health}
                value2={rightOp.stats.health}
                max={200}
              />
              <CompareBar
                label="护甲值"
                value1={leftOp.stats.armor}
                value2={rightOp.stats.armor}
                max={120}
              />
              <CompareBar
                label="移动速度"
                value1={leftOp.stats.speed}
                value2={rightOp.stats.speed}
                max={100}
              />
            </div>

            {/* [C2] 谁更强总结 */}
            <WinnerSummary leftOp={leftOp} rightOp={rightOp} />

            {/* [C2] 技能数量对比 */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h5 className="font-medium text-accent">技能</h5>
                {leftOp.skills.map((s) => (
                  <div key={s.id} className="text-text-secondary text-xs">
                    • {s.name} ({SkillTypeLabels[s.type]})
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <h5 className="font-medium text-warning">技能</h5>
                {rightOp.skills.map((s) => (
                  <div key={s.id} className="text-text-secondary text-xs">
                    • {s.name} ({SkillTypeLabels[s.type]})
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-text-secondary text-sm">
            请选择两个干员进行对比
          </div>
        )}
      </CardContent>
    </Card>
  );
}
