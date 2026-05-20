// [C2] 干员详情页 - Server Component

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getOperatorById, getOperatorIds, getOperators } from "@/lib/operators";
import { OperatorSkills } from "@/components/operators/OperatorSkills";
import { OperatorStats } from "@/components/operators/OperatorStats";
import { Card, CardContent, Badge } from "@/components/ui";
import {
  OperatorRoleLabels,
  SkillTypeLabels,
} from "@/types/operator.types";

// [C2] 生成静态参数
export function generateStaticParams() {
  const ids = getOperatorIds();
  return ids.map((id) => ({ id }));
}

// [C2] 生成元数据
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const operator = getOperatorById(params.id);
  if (!operator) {
    return { title: "干员未找到 - 三角洲行动攻略" };
  }
  return {
    title: `${operator.name} - 干员详情 - 三角洲行动攻略`,
    description: operator.description,
  };
}

// [C2] 渲染难度星级 - 使用 SVG 星星图标
function DifficultyStars({ level }: { level: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 transition-all duration-200 ${
            i < level ? "text-warning fill-warning" : "text-text-muted"
          }`}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          fill={i < level ? "currentColor" : "none"}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

// [C2] 相关干员卡片 - 增强版带图标和颜色
function RelatedOperatorCard({
  operatorId,
  type,
}: {
  operatorId: string;
  type: "synergy" | "counter";
}) {
  const operator = getOperatorById(operatorId);
  if (!operator) return null;

  const roleLabel = OperatorRoleLabels[operator.role];

  return (
    <Link href={`/operators/${operator.id}`} className="group">
      <Card
        hover
        variant="outlined"
        className={`cursor-pointer transition-all duration-200 group-hover:-translate-y-0.5 ${
          type === "synergy"
            ? "group-hover:border-success/50 group-hover:shadow-success/10"
            : "group-hover:border-danger/50 group-hover:shadow-danger/10"
        }`}
      >
        <CardContent className="p-3 flex items-center gap-3">
          {/* [C2] 干员头像 */}
          <div className="w-12 h-12 rounded-lg bg-surface-light flex items-center justify-center text-2xl overflow-hidden">
            {operator.imageUrl ? (
              <img
                src={operator.imageUrl}
                alt={operator.name}
                className="w-full h-full object-cover"
              />
            ) : (
              "👤"
            )}
          </div>

          {/* [C2] 干员信息 */}
          <div className="flex-1 min-w-0">
            <div className="font-bold text-text-primary group-hover:text-accent transition-colors truncate">
              {operator.name}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <Badge
                size="sm"
                variant={type === "synergy" ? "success" : "danger"}
                className="flex items-center gap-1"
              >
                {type === "synergy" ? (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )}
                {type === "synergy" ? "配合" : "克制"}
              </Badge>
              <span className="text-xs text-text-secondary">{roleLabel}</span>
            </div>
          </div>

          {/* [C2] 箭头图标 */}
          <svg
            className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </CardContent>
      </Card>
    </Link>
  );
}

// [C2] 使用技巧项 - 带编号和图标
function TipItem({ tip, index }: { tip: string; index: number }) {
  const tipNumber = index + 1;

  return (
    <li className="flex items-start gap-3 group">
      {/* [C2] 编号圆圈 */}
      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-bold flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors duration-200">
        {tipNumber}
      </span>

      {/* [C2] 技巧内容 */}
      <span className="text-text-secondary group-hover:text-text-primary transition-colors duration-200 pt-0.5">
        {tip}
      </span>
    </li>
  );
}

// [C2] 干员详情页组件
export default function OperatorDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const operator = getOperatorById(params.id);

  // [C2] 干员不存在时返回 404
  if (!operator) {
    notFound();
  }

  const allOperators = getOperators();
  const roleLabel = OperatorRoleLabels[operator.role];

  return (
    <div className="space-y-6">
      {/* [C2] 返回链接 */}
      <Link
        href="/operators"
        className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        返回干员列表
      </Link>

      {/* [C2] 干员头部信息 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* [C2] 左侧：头像和基础信息 */}
        <div className="lg:col-span-1">
          <Card className="overflow-hidden">
            <div className="aspect-square bg-surface-light relative">
              {operator.imageUrl ? (
                <img
                  src={operator.imageUrl}
                  alt={operator.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-8xl">👤</span>
                </div>
              )}
              <div className="absolute top-4 right-4">
                <Badge variant="info" size="md">
                  {roleLabel}
                </Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* [C2] 右侧：详细信息 */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-1">
              {operator.name}
            </h1>
            <p className="text-lg text-text-secondary uppercase tracking-wider">
              {operator.nameEn}
            </p>
          </div>

          {/* [C2] 难度 */}
          <div className="flex items-center gap-3">
            <span className="text-text-secondary">操作难度:</span>
            <DifficultyStars level={operator.difficulty} />
          </div>

          {/* [C2] 描述 */}
          <Card variant="outlined">
            <CardContent className="p-4">
              <h3 className="font-bold text-text-primary mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                简介
              </h3>
              <p className="text-text-secondary">{operator.description}</p>
            </CardContent>
          </Card>

          {/* [C2] 背景故事 */}
          <Card variant="outlined">
            <CardContent className="p-4">
              <h3 className="font-bold text-text-primary mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                背景故事
              </h3>
              <p className="text-text-secondary">{operator.backstory}</p>
            </CardContent>
          </Card>

          {/* [C2] 使用技巧 - 编号列表 + 图标 */}
          <Card variant="outlined">
            <CardContent className="p-4">
              <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                使用技巧
              </h3>
              <ul className="space-y-3">
                {operator.tips.map((tip, index) => (
                  <TipItem key={index} tip={tip} index={index} />
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* [C2] 技能和属性 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <OperatorSkills skills={operator.skills} />
        </div>
        <div>
          <OperatorStats stats={operator.stats} />
        </div>
      </div>

      {/* [C2] 配合与克制关系 - 卡片链接展示 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* [C2] 配合干员 */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            推荐配合
          </h3>
          {operator.synergy.length > 0 ? (
            <div className="grid gap-2">
              {operator.synergy.map((id) => (
                <RelatedOperatorCard key={id} operatorId={id} type="synergy" />
              ))}
            </div>
          ) : (
            <div className="p-4 bg-surface rounded-lg border border-surface-light text-center">
              <span className="text-2xl">🤝</span>
              <p className="text-text-secondary mt-2">暂无推荐配合干员</p>
            </div>
          )}
        </div>

        {/* [C2] 克制干员 */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <svg className="w-5 h-5 text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            克制关系
          </h3>
          {operator.counters.length > 0 ? (
            <div className="grid gap-2">
              {operator.counters.map((id) => (
                <RelatedOperatorCard key={id} operatorId={id} type="counter" />
              ))}
            </div>
          ) : (
            <div className="p-4 bg-surface rounded-lg border border-surface-light text-center">
              <span className="text-2xl">⚖️</span>
              <p className="text-text-secondary mt-2">暂无特定克制关系</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
