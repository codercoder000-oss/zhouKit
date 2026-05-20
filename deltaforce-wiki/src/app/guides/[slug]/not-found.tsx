// [D2] 指南详情 404 页面

import Link from "next/link";
import { FileX, BookOpen, ArrowLeft } from "lucide-react";

export default function GuideNotFound() {
  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* [D2] 返回链接 */}
        <Link
          href="/guides"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          返回指南列表
        </Link>

        <div className="bg-surface/50 border border-surface-light rounded-xl p-12 text-center">
          {/* [D2] 图标 */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-warning/10 mb-6">
            <FileX className="w-10 h-10 text-warning" />
          </div>

          {/* [D2] 标题 */}
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            指南不存在
          </h1>
          <p className="text-text-secondary mb-6 max-w-md mx-auto">
            你正在寻找的指南可能已被删除、移动或从未存在过。
            请检查链接是否正确，或浏览其他指南。
          </p>

          {/* [D2] 操作按钮 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent hover:bg-accent/90 text-white rounded-md font-medium transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              浏览所有指南
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-surface hover:bg-surface-light text-text-secondary border border-surface-light rounded-md font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              返回首页
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
