// [A] Card 卡片组件 - 暗色主题卡片容器

import * as React from "react";
import { cn } from "@/lib/utils";

// [A] 卡片变体类型
export type CardVariant = "default" | "elevated" | "outlined";

// [A] 卡片组件 Props 接口
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 卡片变体 */
  variant?: CardVariant;
  /** 是否启用悬停效果 */
  hover?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 子元素 */
  children: React.ReactNode;
}

/**
 * [A] Card 卡片组件
 * 暗色主题卡片，支持多种变体和悬停效果
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { variant = "default", hover = false, className, children, ...props },
    ref
  ) => {
    // [A] 根据变体生成基础样式
    const variantStyles: Record<CardVariant, string> = {
      default: "bg-surface border border-surface-light",
      elevated:
        "bg-surface border border-surface-light shadow-lg shadow-black/20",
      outlined: "bg-transparent border border-surface-light",
    };

    return (
      <div
        ref={ref}
        className={cn(
          // [A] 基础样式
          "rounded-lg overflow-hidden",
          "transition-all duration-200 ease-in-out",
          // [A] 变体样式
          variantStyles[variant],
          // [A] 悬停效果
          hover && "hover:border-accent/30 hover:shadow-accent/5",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

// [A] 卡片头部组件
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("px-6 py-4 border-b border-surface-light", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = "CardHeader";

// [A] 卡片内容组件
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("px-6 py-4", className)} {...props}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = "CardContent";

// [A] 卡片底部组件
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "px-6 py-4 border-t border-surface-light flex items-center gap-3",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = "CardFooter";
