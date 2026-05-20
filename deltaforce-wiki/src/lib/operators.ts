// [C] 干员数据获取函数

import operatorsData from "@/data/operators.json";
import type { Operator, OperatorRole } from "@/types/operator.types";

// [C] 获取所有干员
export function getOperators(): Operator[] {
  return operatorsData.operators as Operator[];
}

// [C] 根据ID获取干员
export function getOperatorById(id: string): Operator | undefined {
  return operatorsData.operators.find((op) => op.id === id) as Operator | undefined;
}

// [C] 根据角色类型获取干员
export function getOperatorsByRole(role: OperatorRole): Operator[] {
  return operatorsData.operators.filter((op) => op.role === role) as Operator[];
}

// [C] 获取所有干员ID（用于generateStaticParams）
export function getOperatorIds(): string[] {
  return operatorsData.operators.map((op) => op.id);
}
