// [A] Input 输入框组件 - 带标签和错误提示

import * as React from "react";
import { cn } from "@/lib/utils";

// [A] 输入框组件 Props 接口
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** 标签文本 */
  label?: string;
  /** 错误信息 */
  error?: string;
  /** 帮助文本 */
  helperText?: string;
  /** 自定义类名 */
  className?: string;
  /** 输入框类名 */
  inputClassName?: string;
}

/**
 * [A] Input 输入框组件
 * 包含标签、输入框、错误提示和帮助文本
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      className,
      inputClassName,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    // [A] 生成唯一 ID 用于 label 关联
    const inputId = id || React.useId();

    // [A] 是否有错误
    const hasError = !!error;

    return (
      <div className={cn("w-full", className)}>
        {label && (
          // [A] 标签
          <label
            htmlFor={inputId}
            className={cn(
              "block text-sm font-medium mb-1.5",
              disabled ? "text-text-muted" : "text-text-primary"
            )}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          className={cn(
            // [A] 基础样式
            "w-full px-3 py-2 rounded-md bg-surface border",
            "text-text-primary placeholder:text-text-muted",
            "transition-all duration-200 ease-in-out",
            "focus:outline-none focus:ring-2 focus:ring-accent/50",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            // [A] 错误状态样式
            hasError
              ? "border-danger focus:border-danger"
              : "border-surface-light focus:border-accent",
            inputClassName
          )}
          {...props}
        />
        {error && (
          // [A] 错误提示
          <p className="mt-1.5 text-sm text-danger">{error}</p>
        )}
        {!error && helperText && (
          // [A] 帮助文本
          <p className="mt-1.5 text-sm text-text-secondary">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
