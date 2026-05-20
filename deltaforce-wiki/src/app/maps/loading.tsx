// [A2] 地图页面骨架屏

import { Skeleton, GridSkeleton } from "@/components/ui";

export default function MapsLoading() {
  return (
    <div className="min-h-screen bg-page-bg py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 页面标题骨架 */}
        <div className="mb-8">
          <Skeleton variant="text" className="h-10 w-48 mb-2" />
          <Skeleton variant="text" className="w-80" />
        </div>

        {/* 地图卡片网格骨架 */}
        <GridSkeleton columns={2} count={6} />
      </div>
    </div>
  );
}
