// [A2] 武器页面骨架屏

import { Skeleton, GridSkeleton } from "@/components/ui";

export default function WeaponsLoading() {
  return (
    <div className="min-h-screen bg-page-bg py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 页面标题骨架 */}
        <div className="mb-8">
          <Skeleton variant="text" className="h-10 w-64 mb-2" />
          <Skeleton variant="text" className="w-96" />
        </div>

        {/* 过滤器骨架 */}
        <div className="mb-6 flex flex-wrap gap-4">
          <Skeleton variant="button" className="w-32" />
          <Skeleton variant="button" className="w-32" />
          <Skeleton variant="button" className="w-32" />
        </div>

        {/* 武器卡片网格骨架 */}
        <GridSkeleton columns={3} count={9} />
      </div>
    </div>
  );
}
