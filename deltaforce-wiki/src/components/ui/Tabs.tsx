// [A] Tabs 标签页组件 - 支持受控和非受控模式

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// [A] Tab 项接口
export interface TabItem {
  /** 唯一标识 */
  id: string;
  /** 显示标签 */
  label: string;
  /** 禁用状态 */
  disabled?: boolean;
  /** 图标（可选） */
  icon?: React.ReactNode;
}

// [A] Tabs 组件 Props 接口（受控模式）
export interface TabsControlledProps {
  /** Tab 项数组 */
  items: TabItem[];
  /** 当前激活的 Tab ID（受控） */
  activeId: string;
  /** Tab 切换回调 */
  onChange: (id: string) => void;
  /** 自定义类名 */
  className?: string;
  /** 变体 */
  variant?: "default" | "pills" | "underline";
}

// [A] Tabs 组件 Props 接口（非受控模式）
export interface TabsUncontrolledProps {
  /** Tab 项数组 */
  items: TabItem[];
  /** 默认激活的 Tab ID（非受控） */
  defaultActiveId?: string;
  /** Tab 切换回调 */
  onChange?: (id: string) => void;
  /** 自定义类名 */
  className?: string;
  /** 变体 */
  variant?: "default" | "pills" | "underline";
}

export type TabsProps = TabsControlledProps | TabsUncontrolledProps;

/**
 * [A] 判断是否为受控模式
 */
function isControlledProps(props: TabsProps): props is TabsControlledProps {
  return "activeId" in props;
}

/**
 * [A] Tabs 标签页组件
 * 支持受控和非受控两种模式
 * 支持 default/pills/underline 三种变体
 */
export const Tabs: React.FC<TabsProps> = (props) => {
  const { items, className, variant = "default" } = props;

  // [A] 判断是否为受控模式
  const isControlled = isControlledProps(props);

  // [A] 非受控模式下的内部状态
  const uncontrolledProps = props as TabsUncontrolledProps;
  const [internalActiveId, setInternalActiveId] = React.useState(
    uncontrolledProps.defaultActiveId || (items[0]?.id ?? "")
  );

  // [A] 获取当前激活的 Tab ID
  const controlledProps = props as TabsControlledProps;
  const activeId = isControlled
    ? controlledProps.activeId
    : internalActiveId;

  // [A] 处理 Tab 切换
  const handleTabChange = (id: string) => {
    if (isControlled) {
      (props as TabsControlledProps).onChange(id);
    } else {
      setInternalActiveId(id);
      (props as TabsUncontrolledProps).onChange?.(id);
    }
  };

  // [A] 变体样式
  const variantStyles = {
    default: {
      container: "bg-surface-light/50 rounded-lg p-1",
      tab: "rounded-md",
      active: "bg-surface text-text-primary shadow-sm",
      inactive: "text-text-secondary hover:text-text-primary hover:bg-surface-light/50",
    },
    pills: {
      container: "gap-2",
      tab: "rounded-full",
      active: "bg-primary text-text-primary",
      inactive: "bg-surface text-text-secondary hover:text-text-primary border border-surface-light",
    },
    underline: {
      container: "border-b border-surface-light gap-0",
      tab: "rounded-none border-b-2 border-transparent -mb-px",
      active: "text-accent border-accent",
      inactive: "text-text-secondary hover:text-text-primary",
    },
  };

  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        // [A] 基础样式
        "flex items-center",
        styles.container,
        className
      )}
      role="tablist"
    >
      {items.map((item) => {
        const isActive = activeId === item.id;
        const isDisabled = item.disabled;

        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={isActive}
            aria-disabled={isDisabled}
            disabled={isDisabled}
            onClick={() => !isDisabled && handleTabChange(item.id)}
            className={cn(
              // [A] 基础样式
              "flex items-center gap-2 px-4 py-2 text-sm font-medium",
              "transition-all duration-200 ease-in-out",
              "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-0",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              // [A] 变体样式
              styles.tab,
              isActive ? styles.active : styles.inactive
            )}
          >
            {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

Tabs.displayName = "Tabs";
