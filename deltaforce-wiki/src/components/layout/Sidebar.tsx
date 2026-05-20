// [A] Sidebar 侧边栏组件 - 用于详情页的目录导航

"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// [A] 侧边栏项接口
export interface SidebarItem {
  /** 唯一标识 */
  id: string;
  /** 显示文本 */
  label: string;
  /** 链接地址 */
  href: string;
  /** 图标（可选） */
  icon?: React.ReactNode;
  /** 子项 */
  children?: SidebarItem[];
}

// [A] Sidebar 组件 Props 接口
export interface SidebarProps {
  /** 侧边栏标题 */
  title?: string;
  /** 侧边栏项数组 */
  items: SidebarItem[];
  /** 自定义类名 */
  className?: string;
  /** 当前活动项 ID（可选，用于滚动监听） */
  activeId?: string;
}

/**
 * [A] Sidebar 侧边栏组件
 * 用于详情页的目录导航，支持多级菜单
 */
export const Sidebar: React.FC<SidebarProps> = ({
  title,
  items,
  className,
  activeId,
}) => {
  const pathname = usePathname();

  // [A] 判断项是否激活
  const isItemActive = (item: SidebarItem) => {
    if (activeId) {
      return item.id === activeId;
    }
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  // [A] 递归渲染侧边栏项
  const renderItems = (
    items: SidebarItem[],
    depth: number = 0
  ): React.ReactNode => {
    return items.map((item) => {
      const active = isItemActive(item);
      const hasChildren = item.children && item.children.length > 0;

      return (
        <li key={item.id} className="space-y-1">
          <Link
            href={item.href}
            className={cn(
              // [A] 基础样式
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm",
              "transition-colors duration-200",
              // [A] 缩进
              depth > 0 && "ml-4",
              // [A] 激活状态
              active
                ? "bg-accent/10 text-accent font-medium"
                : "text-text-secondary hover:text-text-primary hover:bg-surface-light"
            )}
          >
            {item.icon && (
              <span className="flex-shrink-0 w-4 h-4">{item.icon}</span>
            )}
            <span className="truncate">{item.label}</span>
          </Link>

          {/* [A] 递归渲染子项 */}
          {hasChildren && (
            <ul className="space-y-1">{renderItems(item.children!, depth + 1)}</ul>
          )}
        </li>
      );
    });
  };

  return (
    <aside
      className={cn(
        // [A] 基础样式
        "w-64 flex-shrink-0",
        "hidden lg:block sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto",
        className
      )}
    >
      <nav className="space-y-4">
        {title && (
          <h2 className="text-text-primary font-semibold px-3">{title}</h2>
        )}
        <ul className="space-y-1">{renderItems(items)}</ul>
      </nav>
    </aside>
  );
};

// [A] 移动端侧边栏抽屉组件
export interface MobileSidebarProps extends SidebarProps {
  /** 是否打开 */
  open: boolean;
  /** 关闭回调 */
  onClose: () => void;
}

/**
 * [A] MobileSidebar 移动端侧边栏抽屉
 */
export const MobileSidebar: React.FC<MobileSidebarProps> = ({
  open,
  onClose,
  title,
  items,
  activeId,
}) => {
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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* [A] 遮罩层 */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* [A] 侧边栏内容 */}
      <div className="absolute left-0 top-0 h-full w-64 bg-surface border-r border-surface-light p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          {title && <h2 className="text-text-primary font-semibold">{title}</h2>}
          <button
            onClick={onClose}
            className="p-1 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-light"
            aria-label="关闭"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <Sidebar items={items} activeId={activeId} className="w-full static h-auto" />
      </div>
    </div>
  );
};

MobileSidebar.displayName = "MobileSidebar";
Sidebar.displayName = "Sidebar";
