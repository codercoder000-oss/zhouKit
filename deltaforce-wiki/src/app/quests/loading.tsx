// [A2] 任务页面骨架屏

import { Skeleton, ListSkeleton } from "@/components/ui";

export default function QuestsLoading() {
  return (
    <div className="min-h-screen bg-page-bg py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 页面标题骨架 */}
        <div className="mb-8">
          <Skeleton variant="text" className="h-10 w-48 mb-2" />
          <Skeleton variant="text" className="w-96" />
        </div>

        {/* 任务列表骨架 */}
        <ListSkeleton count={6} />
      </div>
    </div>
  );
}
