// [A2] 指南页面骨架屏

import { Skeleton, ListSkeleton } from "@/components/ui";

export default function GuidesLoading() {
  return (
    <div className="min-h-screen bg-page-bg py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* 侧边栏骨架 */}
          <div className="hidden lg:block">
            <div className="rounded-lg border border-card-border bg-card-bg p-4">
              <Skeleton variant="text" className="mb-4 h-6 w-24" />
              <div className="space-y-2">
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
              </div>
            </div>
          </div>

          {/* 指南列表骨架 */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <Skeleton variant="text" className="h-8 w-48 mb-2" />
            </div>
            <ListSkeleton count={5} />
          </div>
        </div>
      </div>
    </div>
  );
}
