// [A2] 干员页面骨架屏

import { Skeleton, GridSkeleton } from "@/components/ui";

export default function OperatorsLoading() {
  return (
    <div className="min-h-screen bg-page-bg py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 页面标题骨架 */}
        <div className="mb-8">
          <Skeleton variant="text" className="h-10 w-48 mb-2" />
          <Skeleton variant="text" className="w-80" />
        </div>

        {/* 干员卡片网格骨架 - 4列 */}
        <GridSkeleton columns={4} count={8} />
      </div>
    </div>
  );
}
