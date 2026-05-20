// [A2] 骨架屏组件 - 加载占位

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "card" | "circle" | "image" | "button";
}

// [A2] 骨架屏基础样式
const baseStyles = "animate-pulse bg-surface-light rounded";

// [A2] 变体预设样式
const variantStyles: Record<string, string> = {
  text: "h-4 w-full",
  card: "h-32 w-full rounded-lg",
  circle: "h-12 w-12 rounded-full",
  image: "h-48 w-full rounded-lg",
  button: "h-10 w-24 rounded-md",
};

export function Skeleton({ className, variant = "text" }: SkeletonProps) {
  return (
    <div
      className={cn(baseStyles, variantStyles[variant], className)}
      aria-hidden="true"
    />
  );
}

// [A2] 卡片骨架屏 - 用于武器、地图、干员卡片
interface CardSkeletonProps {
  className?: string;
}

export function CardSkeleton({ className }: CardSkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-card-border bg-card-bg p-4",
        className
      )}
    >
      <Skeleton variant="image" className="mb-4 aspect-video" />
      <Skeleton variant="text" className="mb-2 w-3/4" />
      <Skeleton variant="text" className="w-1/2" />
    </div>
  );
}

// [A2] 列表骨架屏 - 用于任务、指南列表
interface ListSkeletonProps {
  count?: number;
  className?: string;
}

export function ListSkeleton({ count = 5, className }: ListSkeletonProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-lg border border-card-border bg-card-bg p-4"
        >
          <div className="flex items-center gap-4">
            <Skeleton variant="circle" className="h-10 w-10" />
            <div className="flex-1">
              <Skeleton variant="text" className="mb-2 w-1/3" />
              <Skeleton variant="text" className="w-2/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// [A2] 网格骨架屏 - 用于卡片网格布局
interface GridSkeletonProps {
  columns?: number;
  count?: number;
  className?: string;
}

export function GridSkeleton({
  columns = 3,
  count = 6,
  className,
}: GridSkeletonProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        columns === 2 && "grid-cols-1 sm:grid-cols-2",
        columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

// [A2] 详情页骨架屏 - 用于详情页内容
interface DetailSkeletonProps {
  className?: string;
}

export function DetailSkeleton({ className }: DetailSkeletonProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* 头部 */}
      <div className="rounded-lg border border-card-border bg-card-bg p-6">
        <div className="flex items-start gap-4">
          <Skeleton variant="circle" className="h-16 w-16" />
          <div className="flex-1">
            <Skeleton variant="text" className="mb-2 h-8 w-48" />
            <Skeleton variant="text" className="w-96" />
          </div>
        </div>
      </div>

      {/* 内容区 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-card-border bg-card-bg p-6">
          <Skeleton variant="text" className="mb-4 h-6 w-24" />
          <div className="space-y-3">
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </div>
        </div>
        <div className="rounded-lg border border-card-border bg-card-bg p-6">
          <Skeleton variant="text" className="mb-4 h-6 w-24" />
          <div className="space-y-3">
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </div>
        </div>
      </div>
    </div>
  );
}
