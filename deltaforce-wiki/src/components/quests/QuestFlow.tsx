// [C2] 任务步骤流程图组件 - 纵向时间线样式增强版

"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui";
import { Badge } from "@/components/ui";
import type { QuestStep } from "@/types/quest.types";
import Link from "next/link";

// [C2] 任务流程组件 Props
interface QuestFlowProps {
  steps: QuestStep[];
}

// [C2] 单个步骤节点
function StepNode({
  step,
  index,
  totalSteps,
  isActive,
  onClick,
}: {
  step: QuestStep;
  index: number;
  totalSteps: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const isFirst = index === 0;
  const isLast = index === totalSteps - 1;

  return (
    <div className="flex gap-4 group">
      {/* [C2] 时间线左侧 - 渐变竖线 + 节点 */}
      <div className="flex flex-col items-center">
        {/* [C2] 步骤编号圆点 - 不同状态不同样式 */}
        <button
          onClick={onClick}
          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm z-10
            transition-all duration-300 cursor-pointer
            ${isActive
              ? "bg-accent text-white shadow-lg shadow-accent/40 scale-110"
              : isFirst
              ? "bg-success text-white shadow-lg shadow-success/30"
              : isLast
              ? "bg-warning text-white shadow-lg shadow-warning/30"
              : "bg-surface-light text-text-primary border-2 border-surface group-hover:border-accent/50"
            }`}
        >
          {step.order}
        </button>

        {/* [C2] 连接线 - 带渐变色和动画 */}
        {!isLast && (
          <div className="w-0.5 flex-1 min-h-[2rem] relative overflow-hidden my-1">
            {/* [C2] 渐变背景 */}
            <div className="absolute inset-0 bg-gradient-to-b from-accent via-primary to-success opacity-30" />
            {/* [C2] 动画流光 */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-accent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300"
              style={{
                animation: isActive ? 'flowDown 2s ease-in-out infinite' : 'none'
              }}
            />
          </div>
        )}
      </div>

      {/* [C2] 步骤内容 */}
      <div className="flex-1 pb-6">
        <Card
          variant="outlined"
          className={`overflow-hidden transition-all duration-300 cursor-pointer
            ${isActive ? 'border-accent/50 shadow-lg shadow-accent/10' : 'hover:border-surface-light'}`}
          onClick={onClick}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h4 className={`font-bold transition-colors duration-200 ${
                isActive ? 'text-accent' : 'text-text-primary'
              }`}>
                步骤 {step.order}
              </h4>
              {step.mapId && (
                <Link href={`/maps/${step.mapId}`} onClick={(e) => e.stopPropagation()}>
                  <Badge size="sm" variant="info" className="hover:bg-accent transition-colors">
                    <svg className="w-3 h-3 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    地图
                  </Badge>
                </Link>
              )}
            </div>

            <p className="text-text-primary mb-3">{step.description}</p>

            {/* [C2] 提示信息 */}
            {step.tips && (
              <div className="p-3 bg-info/10 rounded-lg border border-info/20">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-info flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <p className="text-sm text-info">{step.tips}</p>
                </div>
              </div>
            )}

            {/* [C2] 步骤图片 */}
            {step.imageUrl && (
              <div className="mt-3 rounded-lg overflow-hidden">
                <img
                  src={step.imageUrl}
                  alt={`步骤 ${step.order}`}
                  className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// [C2] 任务流程图组件
export function QuestFlow({ steps }: QuestFlowProps) {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  // [C2] 按顺序排序
  const sortedSteps = [...steps].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-text-primary">任务流程</h3>
        <span className="text-sm text-text-secondary">
          共 {steps.length} 个步骤
        </span>
      </div>

      <div className="pl-2">
        {sortedSteps.map((step, index) => (
          <StepNode
            key={step.order}
            step={step}
            index={index}
            totalSteps={sortedSteps.length}
            isActive={activeStep === step.order}
            onClick={() => setActiveStep(activeStep === step.order ? null : step.order)}
          />
        ))}
      </div>

      {/* [C2] CSS 动画定义 */}
      <style jsx>{`
        @keyframes flowDown {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `}</style>
    </div>
  );
}
