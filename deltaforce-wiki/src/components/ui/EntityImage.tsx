"use client";

// [优化] 智能图片组件 - 真实图片 + 优雅占位降级

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// [优化] 占位主题 - 不同类别用不同渐变
export type EntityType = "weapon" | "map" | "operator" | "quest" | "guide" | "skill";

interface EntityImageProps {
  /** 图片路径，加载失败会显示占位 */
  src?: string;
  /** alt 文本 */
  alt: string;
  /** 实体类型（决定占位渐变和图标） */
  type: EntityType;
  /** 实体名称（用于占位首字符） */
  name?: string;
  /** 自定义渐变 class（覆盖 type 默认） */
  gradient?: string;
  /** 自定义图标 */
  icon?: ReactNode;
  /** 容器 className */
  className?: string;
  /** 图片 className */
  imgClassName?: string;
}

// [优化] 各类型默认渐变（用主题色变量）
const typeGradients: Record<EntityType, string> = {
  weapon: "from-accent/30 via-accent/10 to-transparent",
  map: "from-success/30 via-success/10 to-transparent",
  operator: "from-info/30 via-info/10 to-transparent",
  quest: "from-warning/30 via-warning/10 to-transparent",
  guide: "from-primary/30 via-primary/10 to-transparent",
  skill: "from-secondary/30 via-secondary/10 to-transparent",
};

// [优化] 各类型默认图标（SVG）
const typeIcons: Record<EntityType, ReactNode> = {
  weapon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
    </svg>
  ),
  map: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7m0 0L9 4" />
    </svg>
  ),
  operator: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  quest: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
  guide: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  skill: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
};

/**
 * [优化] 智能实体图片组件
 * - 优先加载真实图片
 * - 失败时显示渐变背景 + 类别图标 + 首字符
 * - 静态导出兼容（用原生 img）
 */
export function EntityImage({
  src,
  alt,
  type,
  name,
  gradient,
  icon,
  className,
  imgClassName,
}: EntityImageProps) {
  // [优化] 跟踪图片加载状态
  const [errored, setErrored] = useState(false);

  // [优化] 获取首字符（用于占位）
  const initial = name ? name.trim().charAt(0).toUpperCase() : "";

  // [优化] 是否显示占位
  const showPlaceholder = !src || errored;

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-surface-light",
        className
      )}
    >
      {/* [优化] 真实图片层 */}
      {!errored && src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setErrored(true)}
          className={cn(
            "h-full w-full object-cover transition-opacity duration-300",
            imgClassName
          )}
        />
      )}

      {/* [优化] 占位层 - 加载失败时显示 */}
      {showPlaceholder && (
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center",
            "bg-gradient-to-br",
            gradient || typeGradients[type]
          )}
        >
          {/* [优化] 大首字符（背景水印） */}
          {initial && (
            <div className="absolute font-black text-text-primary/5 text-[12rem] leading-none select-none pointer-events-none">
              {initial}
            </div>
          )}

          {/* [优化] 图标 */}
          <div className="relative z-10 h-12 w-12 text-text-secondary/60">
            {icon || typeIcons[type]}
          </div>

          {/* [优化] 名称（如果有） */}
          {name && (
            <div className="relative z-10 mt-2 px-2 text-center text-xs text-text-secondary/80 line-clamp-1">
              {name}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
