// [D] Markdown 内容渲染组件

import { cn } from "@/lib/utils";

interface GuideContentProps {
  content: string;
  className?: string;
}

/**
 * [D] 简单的 Markdown 渲染器
 * 支持：标题、段落、列表、粗体、斜体、代码块
 */
export function GuideContent({ content, className }: GuideContentProps) {
  // [D] 将 Markdown 转换为 HTML
  const renderMarkdown = (md: string): string => {
    let html = md
      // [D] 代码块
      .replace(/```(\w+)?\n([\s\S]*?)```/g, "<pre class=\"bg-slate-900 p-4 rounded-lg overflow-x-auto mb-4\"><code class=\"text-sm text-slate-300\">$2</code></pre>")
      // [D] 行内代码
      .replace(/`([^`]+)`/g, "<code class=\"bg-slate-800 px-1.5 py-0.5 rounded text-sm text-blue-400\">$1</code>")
      // [D] 标题 h1
      .replace(/^# (.+)$/gm, "<h1 class=\"text-3xl font-bold text-white mb-6 mt-8\">$1</h1>")
      // [D] 标题 h2
      .replace(/^## (.+)$/gm, "<h2 class=\"text-2xl font-semibold text-white mb-4 mt-6\">$1</h2>")
      // [D] 标题 h3
      .replace(/^### (.+)$/gm, "<h3 class=\"text-xl font-medium text-white mb-3 mt-5\">$1</h3>")
      // [D] 粗体
      .replace(/\*\*([^*]+)\*\*/g, "<strong class=\"font-semibold text-white\">$1</strong>")
      // [D] 斜体
      .replace(/\*([^*]+)\*/g, "<em class=\"italic text-slate-300\">$1</em>")
      // [D] 无序列表
      .replace(/^- (.+)$/gm, "<li class=\"ml-4 text-slate-300\">$1</li>")
      // [D] 有序列表
      .replace(/^\d+\. (.+)$/gm, "<li class=\"ml-4 text-slate-300\">$1</li>")
      // [D] 引用块
      .replace(/^\> (.+)$/gm, "<blockquote class=\"border-l-4 border-blue-500 pl-4 italic text-slate-400 my-4\">$1</blockquote>")
      // [D] 分隔线
      .replace(/^---$/gm, "<hr class=\"border-slate-700 my-6\">");

    // [D] 将连续的列表项包裹在 ul/ol 中
    html = html
      .replace(/(<li[^>]*>.*<\/li>\n?)+/g, (match) => `<ul class="space-y-2 mb-4">${match}</ul>`);

    // [D] 将段落包裹在 p 标签中
    html = html
      .split("\n\n")
      .map((block) => {
        block = block.trim();
        if (!block) return "";
        if (block.startsWith("<") && !block.startsWith("<li")) return block;
        if (block.startsWith("<ul") || block.startsWith("<ol")) return block;
        return `<p class="text-slate-300 mb-4 leading-relaxed">${block}</p>`;
      })
      .join("\n");

    return html;
  };

  return (
    <article
      className={cn("prose prose-invert max-w-none", className)}
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  );
}
