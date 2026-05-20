// [C2] 任务详情页 Not Found

import Link from "next/link";
import { Button } from "@/components/ui";

// [C2] 任务未找到页面
export default function QuestNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4"
    >
      {/* [C2] 图标 */}
      <div className="text-6xl mb-4"
      >📋❓
      </div>

      {/* [C2] 标题 */}
      <h1 className="text-3xl font-bold text-text-primary mb-2"
      >
        未找到该任务
      </h1>

      {/* [C2] 描述 */}
      <p className="text-text-secondary max-w-md mb-6"
      >
        抱歉，您查找的任务不存在或已被移除。请返回任务列表查看所有可用任务。
      </p>

      {/* [C2] 返回按钮 */}
      <Link href="/quests"
      >
        <Button variant="primary" size="md"
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回任务列表
        </Button>
      </Link>
    </div>
  );
}
