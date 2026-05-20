// [A] 工具函数库 - 提供常用的工具函数

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * [A] 合并 Tailwind CSS 类名
 * 使用 clsx 处理条件类名，再用 tailwind-merge 解决冲突
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
