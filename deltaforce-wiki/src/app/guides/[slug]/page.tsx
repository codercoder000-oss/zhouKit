// [D] 指南详情页

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideContent } from "@/components/guides";
import { Badge } from "@/components/ui";
import { getAllGuides, getGuideBySlug } from "@/lib/guides";
import {
  GuideCategoryLabels,
  GuideCategoryColors,
} from "@/types/guide.types";
import {
  Clock,
  Calendar,
  User,
  ArrowLeft,
  Tag,
} from "lucide-react";
import Link from "next/link";

// [D] 生成静态参数
export function generateStaticParams() {
  const guides = getAllGuides();
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

// [D] 生成元数据
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const guide = getGuideBySlug(params.slug);
  if (!guide) {
    return {
      title: "指南不存在 - 三角洲行动攻略站",
    };
  }
  return {
    title: `${guide.title} - 三角洲行动攻略站`,
    description: guide.description,
  };
}

interface GuidePageProps {
  params: {
    slug: string;
  };
}

export default function GuidePage({ params }: GuidePageProps) {
  const guide = getGuideBySlug(params.slug);

  // [D] 如果指南不存在，返回 404
  if (!guide) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* [D] 返回链接 */}
        <Link
          href="/guides"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          返回指南列表
        </Link>

        {/* [D] 文章头部 */}
        <header className="mb-8">
          {/* [D] 分类标签 */}
          <Badge
            variant="outline"
            className={`${GuideCategoryColors[guide.category]} mb-4`}
          >
            {GuideCategoryLabels[guide.category]}
          </Badge>

          {/* [D] 标题 */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {guide.title}
          </h1>

          {/* [D] 描述 */}
          <p className="text-lg text-slate-400 mb-6">{guide.description}</p>

          {/* [D] 元信息 */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {guide.author}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              发布于 {guide.publishedAt}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              阅读时间 {guide.readTime}
            </div>
          </div>

          {/* [D] 标签 */}
          <div className="flex items-center gap-2 mt-4">
            <Tag className="w-4 h-4 text-slate-500" />
            {guide.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* [D] 分隔线 */}
        <hr className="border-slate-800 mb-8" />

        {/* [D] 文章内容 */}
        <GuideContent content={guide.content} />

        {/* [D] 底部导航 */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            查看更多指南
          </Link>
        </div>
      </div>
    </main>
  );
}
