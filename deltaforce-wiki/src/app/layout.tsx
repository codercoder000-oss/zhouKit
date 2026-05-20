// [A] 根布局组件 - 所有页面的基础布局

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// [A] 加载 Geist 字体
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// [A] 站点元数据配置
// [D2] 增强 SEO 元数据
export const metadata: Metadata = {
  metadataBase: new URL("https://deltaforce-wiki.vercel.app"),
  title: {
    default: "三角洲行动攻略站 - 武器数据库/地图攻略/配装模拟器",
    template: "%s | 三角洲行动攻略站",
  },
  description:
    "为三角洲行动玩家提供全面的游戏攻略、武器数据、地图信息、干员技能和任务指南。包含伤害计算器、配装推荐等实用工具。",
  keywords: [
    "三角洲行动",
    "游戏攻略",
    "武器数据",
    "地图",
    "干员",
    "任务",
    "配装模拟器",
    "伤害计算器",
    "三角洲",
    "FPS",
  ],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "三角洲行动攻略站",
    title: "三角洲行动攻略站",
    description:
      "最全面的三角洲行动游戏攻略站，包含武器数据库、地图攻略、配装模拟器与伤害计算器。",
  },
  twitter: {
    card: "summary_large_image",
    title: "三角洲行动攻略站",
    description: "最全面的三角洲行动游戏攻略站",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    // [D2] 可以在这里添加搜索引擎验证代码
  },
};

/**
 * [A] RootLayout 根布局组件
 * 包含全局字体、Header、Footer 等共享布局元素
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-text-primary">
        {/* [A] 顶部导航栏 */}
        <Header />

        {/* [A] 主内容区域 */}
        <main className="flex-1">{children}</main>

        {/* [A] 底部信息栏 */}
        <Footer />
      </body>
    </html>
  );
}
