// [A] Badge 徽章组件 - 用于状态标签和分类标记

import * as React from "react";
import { cn } from "@/lib/utils";

// [A] 徽章变体类型
export type BadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "outline" | "secondary";

// [A] 徽章尺寸类型
export type BadgeSize = "sm" | "md" | "lg";

// [A] 徽章组件 Props 接口
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 徽章变体 */
  variant?: BadgeVariant;
  /** 徽章尺寸 */
  size?: BadgeSize;
  /** 自定义类名 */
  className?: string;
  /** 子元素（徽章文本） */
  children: React.ReactNode;
}

/**
 * [A] Badge 徽章组件
 * 用于显示状态、分类、标签等信息
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { variant = "default", size = "md", className, children, ...props },
    ref
  ) => {
    // [A] 根据变体生成背景色和文字色
    const variantStyles: Record<BadgeVariant, string> = {
      default: "bg-surface-light text-text-primary border-surface-light",
      success: "bg-success/20 text-success border-success/30",
      warning: "bg-warning/20 text-warning border-warning/30",
      danger: "bg-danger/20 text-danger border-danger/30",
      info: "bg-info/20 text-info border-info/30",
      outline: "bg-transparent text-text-secondary border-surface-light",
      secondary: "bg-surface text-text-secondary border-surface-light",
    };

    // [A] 根据尺寸生成样式
    const sizeStyles: Record<BadgeSize, string> = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-1 text-sm",
      lg: "px-4 py-1.5 text-base",
    };

    return (
      <span
        ref={ref}
        className={cn(
          // [A] 基础样式
          "inline-flex items-center font-medium rounded-full border",
          "transition-colors duration-200",
          // [A] 变体和尺寸样式
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
