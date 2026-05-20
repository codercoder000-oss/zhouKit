// [C2] 干员列表页 - 改为客户端筛选（静态导出兼容）

import { Metadata } from "next";
import { getOperators } from "@/lib/operators";
import { OperatorCompare } from "@/components/operators/OperatorCompare";
import { OperatorsGrid } from "./OperatorsGrid";

// [C2] 页面元数据
export const metadata: Metadata = {
  title: "干员图鉴 - 三角洲行动攻略",
  description: "查看所有干员的详细信息、技能、属性，找到最适合你的战斗风格",
};

export default function OperatorsPage() {
  const allOperators = getOperators();

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-8">
      {/* [C2] 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">干员图鉴</h1>
        <p className="text-text-secondary">
          了解每位干员的特点，组建你的最强小队
        </p>
      </div>

      {/* [C2] 客户端筛选 + 网格 */}
      <OperatorsGrid operators={allOperators} />

      {/* [C2] 干员对比工具 */}
      <div className="mt-8">
        <OperatorCompare operators={allOperators} />
      </div>
    </div>
  );
}
