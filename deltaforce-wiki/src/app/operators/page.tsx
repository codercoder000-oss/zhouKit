// [C2] 干员列表页 - Server Component

import { Metadata } from "next";
import { getOperators } from "@/lib/operators";
import { OperatorCard } from "@/components/operators/OperatorCard";
import { OperatorCompare } from "@/components/operators/OperatorCompare";
import type { OperatorRole } from "@/types/operator.types";
import { OperatorRoleLabels } from "@/types/operator.types";

// [C2] 页面元数据
export const metadata: Metadata = {
  title: "干员图鉴 - 三角洲行动攻略",
  description: "查看所有干员的详细信息、技能、属性，找到最适合你的战斗风格",
};

// [C2] 角色类型 Tab 配置 - 带颜色映射
const roleTabs: { id: string; label: string; role?: OperatorRole; colorClass: string }[] = [
  { id: "all", label: "全部干员", colorClass: "bg-accent" },
  { id: "assault", label: OperatorRoleLabels.assault, role: "assault", colorClass: "bg-accent" },
  { id: "recon", label: OperatorRoleLabels.recon, role: "recon", colorClass: "bg-info" },
  { id: "support", label: OperatorRoleLabels.support, role: "support", colorClass: "bg-success" },
  { id: "engineer", label: OperatorRoleLabels.engineer, role: "engineer", colorClass: "bg-warning" },
];

// [C2] 根据角色类型筛选干员
function filterOperatorsByRole(
  operators: ReturnType<typeof getOperators>,
  role: string
) {
  if (role === "all") return operators;
  return operators.filter((op) => op.role === role);
}

// [C2] 干员列表页组件
export default function OperatorsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // [C2] 获取所有干员
  const allOperators = getOperators();

  // [C2] 获取当前筛选条件
  const currentRole = (searchParams?.role as string) || "all";

  // [C2] 筛选后的干员
  const filteredOperators = filterOperatorsByRole(allOperators, currentRole);

  return (
    <div className="space-y-6">
      {/* [C2] 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">干员图鉴</h1>
        <p className="text-text-secondary">
          了解每位干员的特点，组建你的最强小队
        </p>
      </div>

      {/* [C2] 角色类型筛选 - 不同角色类型用不同颜色 */}
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-sm text-text-secondary">按角色筛选:</span>
        <div className="flex flex-wrap gap-2">
          {roleTabs.map((tab) => {
            const isActive = currentRole === tab.id;
            return (
              <a
                key={tab.id}
                href={`/operators?role=${tab.id}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? `${tab.colorClass} text-white shadow-lg shadow-${tab.colorClass}/30`
                    : "bg-surface text-text-secondary hover:text-text-primary hover:bg-surface-light"
                }`}
              >
                {tab.label}
                {tab.id !== "all" && (
                  <span className="ml-1 text-xs opacity-70">(
                    {
                      allOperators.filter((op) => op.role === tab.id).length
                    }
                    )
                  </span>
                )}
              </a>
            );
          })}
        </div>
      </div>

      {/* [C2] 干员网格 */}
      {filteredOperators.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredOperators.map((operator) => (
            <OperatorCard key={operator.id} operator={operator} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-text-secondary">该角色类型暂无干员</p>
        </div>
      )}

      {/* [C2] 干员对比工具 */}
      <div className="mt-8">
        <OperatorCompare operators={allOperators} />
      </div>
    </div>
  );
}
