// [D] 指南卡片组件

import { Card, Badge } from "@/components/ui";
import { Guide, GuideCategoryLabels, GuideCategoryColors } from "@/types/guide.types";
import { Clock, Calendar } from "lucide-react";
import Link from "next/link";

interface GuideCardProps {
  guide: Guide;
}

export function GuideCard({ guide }: GuideCardProps) {
  return (
    <Link href={`/guides/${guide.slug}`}>
      <Card className="h-full p-5 bg-slate-800 border-slate-700 hover:border-slate-600 hover:bg-slate-800/80 transition-all cursor-pointer group">
        {/* [D] 分类标签 */}
        <div className="flex items-center justify-between mb-3">
          <Badge
            variant="outline"
            className={`${GuideCategoryColors[guide.category]} text-xs`}
          >
            {GuideCategoryLabels[guide.category]}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Clock className="w-3 h-3" />
            {guide.readTime}
          </div>
        </div>

        {/* [D] 标题 */}
        <h3 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">
          {guide.title}
        </h3>

        {/* [D] 描述 */}
        <p className="text-sm text-slate-400 mb-4 line-clamp-2">
          {guide.description}
        </p>

        {/* [D] 底部信息 */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {guide.publishedAt}
          </div>
          <div className="flex gap-1">
            {guide.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-slate-600">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
}
