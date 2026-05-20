// [C2] 干员详情页 Not Found

import Link from "next/link";
import { Button } from "@/components/ui";

// [C2] 干员未找到页面
export default function OperatorNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4"
    >
      {/* [C2] 图标 */}
      <div className="text-6xl mb-4"
      >👤❓
      </div>

      {/* [C2] 标题 */}
      <h1 className="text-3xl font-bold text-text-primary mb-2"
      >
        未找到该干员
      </h1>

      {/* [C2] 描述 */}
      <p className="text-text-secondary max-w-md mb-6"
      >
        抱歉，您查找的干员不存在或已被移除。请返回干员列表查看所有可用干员。
      </p>

      {/* [C2] 返回按钮 */}
      <Link href="/operators"
      >
        <Button variant="primary" size="md"
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回干员列表
        </Button>
      </Link>
    </div>
  );
}
