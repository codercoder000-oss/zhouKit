// [A] Footer 底部信息栏组件

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// [A] Footer 组件 Props 接口
export interface FooterProps {
  /** 自定义类名 */
  className?: string;
}

// [A] 链接分组配置
const linkGroups = [
  {
    title: "攻略内容",
    links: [
      { href: "/weapons", label: "武器库" },
      { href: "/maps", label: "地图" },
      { href: "/operators", label: "干员" },
      { href: "/quests", label: "任务" },
    ],
  },
  {
    title: "工具与资源",
    links: [
      { href: "/tools", label: "工具箱" },
      { href: "/guides", label: "新手指南" },
      { href: "/calculators", label: "伤害计算器" },
    ],
  },
];

/**
 * [A] Footer 底部信息栏组件
 * 包含网站信息、导航链接、版权信息
 */
export const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        // [A] 基础样式
        "w-full bg-surface border-t border-surface-light mt-auto",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* [A] 品牌信息 */}
          <div className="space-y-4">
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
            <p className="text-text-secondary text-sm max-w-xs">
              为三角洲行动玩家提供全面的游戏攻略、数据查询和实用工具。
            </p>
          </div>

          {/* [A] 链接分组 */}
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-text-primary font-semibold mb-4">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-text-secondary hover:text-accent transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* [A] 版权信息 */}
        <div className="mt-12 pt-8 border-t border-surface-light">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-text-muted text-sm">
              © {currentYear} 三角洲攻略站. 非官方网站，仅供学习交流。
            </p>
            <p className="text-text-muted text-sm">
              游戏数据仅供参考，请以游戏内实际数据为准。
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = "Footer";
