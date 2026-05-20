// [D2] 全局 404 页面 - 军事风格"任务失败"

import Link from "next/link";
import { Crosshair, AlertTriangle, Home, RotateCcw } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full text-center">
        {/* [D2] 警告图标 */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-danger/10 border-2 border-danger/30 animate-pulse">
            <AlertTriangle className="w-12 h-12 text-danger" />
          </div>
        </div>

        {/* [D2] 404 数字 - 军事风格 */}
        <div className="mb-6">
          <div className="text-8xl md:text-9xl font-black text-surface-light tracking-wider">
            404
          </div>
          <div className="text-lg font-mono text-danger tracking-[0.5em] mt-2">
            MISSION FAILED
          </div>
        </div>

        {/* [D2] 错误信息 */}
        <div className="bg-surface/50 border border-surface-light rounded-xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-4 text-text-secondary">
            <Crosshair className="w-5 h-5" />
            <span className="font-mono text-sm">ERROR CODE: PAGE_NOT_FOUND</span>
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            目标丢失
          </h1>
          <p className="text-text-secondary">
            目标页面可能已被转移、删除或从未存在。
            <br />
            请检查坐标（URL）或返回基地重新部署。
          </p>
        </div>

        {/* [D2] 操作按钮 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent hover:bg-accent/90 text-white rounded-md font-medium transition-colors"
          >
            <Home className="w-4 h-4" />
            返回基地
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-surface hover:bg-surface-light text-text-secondary border border-surface-light rounded-md font-medium transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            重新部署
          </Link>
        </div>

        {/* [D2] 装饰性代码 */}
        <div className="mt-12 font-mono text-xs text-text-muted space-y-1 opacity-60">
          <p>{`> SYSTEM STATUS: OPERATIONAL`}</p>
          <p>{`> LOCATION: UNKNOWN`}</p>
          <p>{`> RECOMMENDED ACTION: RETURN TO BASE`}</p>
        </div>
      </div>
    </main>
  );
}
