// [B2] 地图详情页 - Not Found

import Link from "next/link";
import { Button } from "@/components/ui";

/**
 * [B2] 地图未找到页面
 */
export default function MapNotFound() {
  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center rounded-lg border border-surface bg-surface py-24">
          {/* [B2] 404 图标 */}
          <div className="mb-6 text-6xl">🗺️</div>

          {/* [B2] 标题 */}
          <h1 className="mb-2 text-3xl font-bold text-text-primary">
            未找到该地图
          </h1>

          {/* [B2] 描述 */}
          <p className="mb-8 max-w-md text-center text-text-secondary">
            抱歉，我们找不到您请求的地图。可能该地图尚未添加到数据库，或者链接有误。
          </p>

          {/* [B2] 返回按钮 */}
          <div className="flex gap-4">
            <Link href="/maps">
              <Button variant="primary">返回地图列表</Button>
            </Link>
            <Link href="/">
              <Button variant="ghost">返回首页</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
