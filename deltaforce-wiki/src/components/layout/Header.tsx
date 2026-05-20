// [A] Header 顶部导航栏组件 - 包含 Logo、导航链接和移动端菜单

"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// [A] 导航项配置
const navItems = [
  { href: "/weapons", label: "武器库" },
  { href: "/maps", label: "地图" },
  { href: "/operators", label: "干员" },
  { href: "/quests", label: "任务" },
  { href: "/tools", label: "工具" },
  { href: "/guides", label: "指南" },
];

// [A] Header 组件 Props 接口
export interface HeaderProps {
  /** 自定义类名 */
  className?: string;
}

/**
 * [A] Header 顶部导航栏组件
 * 包含 Logo、桌面端导航链接、移动端汉堡菜单
 */
export const Header: React.FC<HeaderProps> = ({ className }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // [A] 判断导航项是否激活
  const isActive = (href: string) => pathname.startsWith(href);

  // [A] 切换移动端菜单
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  // [A] 关闭移动端菜单
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className={cn(
        // [A] 基础样式
        "sticky top-0 z-40 w-full",
        "bg-background/95 backdrop-blur-sm border-b border-surface-light",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* [A] Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-text-primary hover:text-accent transition-colors"
          >
            <svg
              className="w-8 h-8 text-accent"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <span>三角洲攻略站</span>
          </Link>

          {/* [A] 桌面端导航 */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  // [A] 基础样式
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "text-accent bg-accent/10"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-light"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* [A] 移动端汉堡菜单按钮 */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-light transition-colors"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "关闭菜单" : "打开菜单"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg
                className="w-6 h-6"
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
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* [A] 移动端导航菜单 */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-t border-surface-light">
          <nav className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={cn(
                  // [A] 基础样式
                  "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                  isActive(item.href)
                    ? "text-accent bg-accent/10"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-light"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

Header.displayName = "Header";
