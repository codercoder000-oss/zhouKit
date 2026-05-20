"use client";

// [修复] 干员筛选 + 网格 - 客户端组件（静态导出兼容）

import { useState } from "react";
import { OperatorCard } from "@/components/operators/OperatorCard";
import type { Operator, OperatorRole } from "@/types/operator.types";
import { OperatorRoleLabels } from "@/types/operator.types";

interface OperatorsGridProps {
  operators: Operator[];
}

const roleTabs: { id: string; label: string; colorClass: string }[] = [
  { id: "all", label: "全部干员", colorClass: "bg-accent" },
  { id: "assault", label: OperatorRoleLabels.assault, colorClass: "bg-accent" },
  { id: "recon", label: OperatorRoleLabels.recon, colorClass: "bg-info" },
  { id: "support", label: OperatorRoleLabels.support, colorClass: "bg-success" },
  { id: "engineer", label: OperatorRoleLabels.engineer, colorClass: "bg-warning" },
];

export function OperatorsGrid({ operators }: OperatorsGridProps) {
  const [currentRole, setCurrentRole] = useState("all");

  const filtered = currentRole === "all"
    ? operators
    : operators.filter((op) => op.role === currentRole);

  return (
    <>
      {/* 筛选按钮 */}
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-sm text-text-secondary">按角色筛选:</span>
        <div className="flex flex-wrap gap-2">
          {roleTabs.map((tab) => {
            const isActive = currentRole === tab.id;
            const count = tab.id === "all"
              ? operators.length
              : operators.filter((op) => op.role === tab.id).length;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentRole(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? `${tab.colorClass} text-white shadow-lg`
                    : "bg-surface text-text-secondary hover:text-text-primary hover:bg-surface-light"
                }`}
              >
                {tab.label}
                <span className="ml-1 text-xs opacity-70">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 干员网格 */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((operator) => (
            <OperatorCard key={operator.id} operator={operator} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-text-secondary">该角色类型暂无干员</p>
        </div>
      )}
    </>
  );
}
