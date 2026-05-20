// [A] Button 按钮组件 - 支持多种变体和尺寸

import * as React from "react";
import { cn } from "@/lib/utils";

// [A] 按钮变体类型
export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

// [A] 按钮尺寸类型
export type ButtonSize = "sm" | "md" | "lg";

// [A2] 扩展的按钮组件 Props 接口，支持 asChild 模式
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 按钮变体 */
  variant?: ButtonVariant;
  /** 按钮尺寸 */
  size?: ButtonSize;
  /** 是否显示加载状态 */
  loading?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 子元素 */
  children: React.ReactNode;
  /** [A2] 是否将子元素作为按钮根元素渲染（用于 Link 等场景） */
  asChild?: boolean;
}

/**
 * [A] Button 按钮组件
 * 支持 primary/secondary/ghost/danger 四种变体
 * 支持 sm/md/lg 三种尺寸
 * 支持加载状态和 asChild 模式
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      className,
      children,
      asChild = false,
      ...props
    },
    ref
  ) => {
    // [A] 根据变体生成基础样式
    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        "bg-primary text-text-primary hover:bg-primary/90 border border-primary",
      secondary:
        "bg-secondary text-background hover:bg-secondary/90 border border-secondary",
      ghost:
        "bg-transparent text-text-primary hover:bg-surface-light border border-transparent",
      danger:
        "bg-danger text-white hover:bg-danger/90 border border-danger",
    };

    // [A] 根据尺寸生成样式
    const sizeStyles: Record<ButtonSize, string> = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    const isDisabled = disabled || loading;

    // [A2] 基础类名
    const baseClasses = cn(
      // [A] 基础样式
      "inline-flex items-center justify-center rounded-md font-medium",
      "transition-colors duration-200 ease-in-out",
      "focus:outline-none focus:ring-2 focus:ring-accent/50",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      // [A] 变体和尺寸样式
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    // [A2] 加载指示器
    const loadingSpinner = loading && (
      // [A] 加载动画
      <svg
        className="animate-spin -ml-1 mr-2 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    // [A2] 如果 asChild 为 true，将样式克隆到子元素
    if (asChild && React.isValidElement(children)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const childElement = children as React.ReactElement<any>;
      const mergedProps = {
        ...childElement.props,
        className: cn(baseClasses, childElement.props.className),
      };
      // [A2] 使用 React.createElement 避免 ref 类型问题
      return React.createElement(
        childElement.type,
        mergedProps,
        loadingSpinner,
        childElement.props.children
      );
    }

    return (
      <button ref={ref} disabled={isDisabled} className={baseClasses} {...props}>
        {loadingSpinner}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
