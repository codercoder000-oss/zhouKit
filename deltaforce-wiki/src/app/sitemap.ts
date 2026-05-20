// [D2] 动态生成 sitemap
import { MetadataRoute } from "next";
import { getWeapons } from "@/lib/weapons";
import { getMaps } from "@/lib/maps";
import { getOperators } from "@/lib/operators";
import { getQuests } from "@/lib/quests";
import { getAllGuides } from "@/lib/guides";

const BASE_URL = "https://deltaforce-wiki.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  // [D2] 静态页面
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/weapons`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/maps`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/operators`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/quests`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tools/loadout`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/tools/damage-calc`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/guides`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // [D2] 动态页面 - 武器详情
  const weapons = getWeapons().map((weapon) => ({
    url: `${BASE_URL}/weapons/${weapon.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // [D2] 动态页面 - 地图详情
  const maps = getMaps().map((map) => ({
    url: `${BASE_URL}/maps/${map.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // [D2] 动态页面 - 干员详情
  const operators = getOperators().map((operator) => ({
    url: `${BASE_URL}/operators/${operator.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // [D2] 动态页面 - 任务详情
  const quests = getQuests().map((quest) => ({
    url: `${BASE_URL}/quests/${quest.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // [D2] 动态页面 - 指南详情
  const guides = getAllGuides().map((guide) => ({
    url: `${BASE_URL}/guides/${guide.slug}`,
    lastModified: new Date(guide.updatedAt || guide.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...weapons, ...maps, ...operators, ...quests, ...guides];
}
