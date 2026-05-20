// [A] Modal 模态框组件 - 带遮罩层和动画

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

// [A] 模态框尺寸类型
export type ModalSize = "sm" | "md" | "lg" | "xl";

// [A] 模态框组件 Props 接口
export interface ModalProps {
  /** 是否打开 */
  open: boolean;
  /** 关闭回调 */
  onClose: () => void;
  /** 模态框标题 */
  title?: string;
  /** 模态框尺寸 */
  size?: ModalSize;
  /** 自定义类名 */
  className?: string;
  /** 子元素（模态框内容） */
  children: React.ReactNode;
  /** 是否显示关闭按钮 */
  showCloseButton?: boolean;
  /** 点击遮罩层是否关闭 */
  closeOnOverlayClick?: boolean;
  /** 按 ESC 键是否关闭 */
  closeOnEsc?: boolean;
}

/**
 * [A] Modal 模态框组件
 * 支持动画效果，可通过 open/onClose 控制显示状态
 */
export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  size = "md",
  className,
  children,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEsc = true,
}) => {
  // [A] 模态框尺寸样式
  const sizeStyles: Record<ModalSize, string> = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  // [A] 处理 ESC 键关闭
  React.useEffect(() => {
    if (!closeOnEsc || !open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeOnEsc, open, onClose]);

  // [A] 禁止背景滚动
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // [A] 如果未打开则不渲染
  if (!open) return null;

  return (
    // [A] 遮罩层
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      {/* [A] 背景遮罩 */}
      <div
        className={cn(
          "absolute inset-0 bg-black/60 backdrop-blur-sm",
          "transition-opacity duration-200"
        )}
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      {/* [A] 模态框内容 */}
      <div
        className={cn(
          // [A] 基础样式
          "relative w-full bg-surface rounded-lg shadow-xl",
          "border border-surface-light",
          "transform transition-all duration-200",
          "animate-in fade-in zoom-in-95",
          // [A] 尺寸样式
          sizeStyles[size],
          className
        )}
      >
        {/* [A] 头部 */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-surface-light">
            {title && (
              <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
            )}
            {showCloseButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="ml-auto"
                aria-label="关闭"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            )}
          </div>
        )}

        {/* [A] 内容区域 */}
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
};

Modal.displayName = "Modal";
