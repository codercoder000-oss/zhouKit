"use client";

// [D2] 首页 Hero 区域组件 - 带真实搜索功能

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui";
import { Search, Crosshair, Map, Users, ClipboardList } from "lucide-react";
import { getWeapons } from "@/lib/weapons";
import { getMaps } from "@/lib/maps";
import { getOperators } from "@/lib/operators";
import { getQuests } from "@/lib/quests";

// [D2] 搜索数据结构
interface SearchItem {
  id: string;
  name: string;
  type: "weapon" | "map" | "operator" | "quest";
  href: string;
}

// [D2] 类型图标映射
const typeIcons = {
  weapon: Crosshair,
  map: Map,
  operator: Users,
  quest: ClipboardList,
};

// [D2] 类型标签映射
const typeLabels = {
  weapon: "武器",
  map: "地图",
  operator: "干员",
  quest: "任务",
};

// [D2] 类型颜色映射
const typeColors = {
  weapon: "text-red-400 bg-red-400/10",
  map: "text-green-400 bg-green-400/10",
  operator: "text-blue-400 bg-blue-400/10",
  quest: "text-yellow-400 bg-yellow-400/10",
};

export function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // [D2] 构建搜索索引
  const searchIndex: SearchItem[] = useMemo(() => {
    const items: SearchItem[] = [];

    // [D2] 添加武器
    getWeapons().forEach((weapon) => {
      items.push({
        id: weapon.id,
        name: weapon.name,
        type: "weapon",
        href: `/weapons/${weapon.id}`,
      });
    });

    // [D2] 添加地图
    getMaps().forEach((map) => {
      items.push({
        id: map.id,
        name: map.name,
        type: "map",
        href: `/maps/${map.id}`,
      });
    });

    // [D2] 添加干员
    getOperators().forEach((operator) => {
      items.push({
        id: operator.id,
        name: operator.name,
        type: "operator",
        href: `/operators/${operator.id}`,
      });
    });

    // [D2] 添加任务
    getQuests().forEach((quest) => {
      items.push({
        id: quest.id,
        name: quest.name,
        type: "quest",
        href: `/quests/${quest.id}`,
      });
    });

    return items;
  }, []);

  // [D2] 过滤搜索结果
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return searchIndex
      .filter((item) => item.name.toLowerCase().includes(query))
      .slice(0, 8); // [D2] 最多显示8条结果
  }, [searchQuery, searchIndex]);

  // [D2] 处理搜索输入
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsOpen(e.target.value.length > 0);
  };

  // [D2] 处理结果点击
  const handleResultClick = (href: string) => {
    setSearchQuery("");
    setIsOpen(false);
    router.push(href);
  };

  // [D2] 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
    if (e.key === "Enter" && filteredResults.length > 0) {
      handleResultClick(filteredResults[0].href);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-background via-surface to-background py-20 px-4">
      {/* [D2] 背景装饰 - 使用主题色 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* [D2] 大标题 */}
        <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
          三角洲行动
          <span className="block text-2xl md:text-3xl mt-2 text-info">
            攻略站
          </span>
        </h1>

        {/* [D2] 副标题 */}
        <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
          最全面的武器数据库、地图攻略、配装模拟器与伤害计算器
          <br />
          助你成为战场上的精英
        </p>

        {/* [D2] 搜索框 - 真实功能 */}
        <div className="max-w-lg mx-auto relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <Input
              type="text"
              placeholder="搜索武器、地图、干员、任务..."
              className="w-full pl-10 pr-4 py-3 bg-surface/80 border-surface-light text-text-primary placeholder:text-text-muted rounded-xl"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => searchQuery && setIsOpen(true)}
            />
          </div>

          {/* [D2] 搜索结果下拉框 */}
          {isOpen && filteredResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-surface rounded-xl border border-surface-light shadow-xl z-50 overflow-hidden">
              <div className="max-h-80 overflow-y-auto py-2">
                {filteredResults.map((item) => {
                  const Icon = typeIcons[item.type];
                  return (
                    <button
                      key={`${item.type}-${item.id}`}
                      onClick={() => handleResultClick(item.href)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-light transition-colors text-left"
                    >
                      <div
                        className={`w-8 h-8 rounded-lg ${typeColors[item.type].split(" ")[1]} flex items-center justify-center`}
                      >
                        <Icon
                          className={`w-4 h-4 ${typeColors[item.type].split(" ")[0]}`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-text-primary text-sm">
                          {item.name}
                        </div>
                      </div>
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${typeColors[item.type]}`}
                      >
                        {typeLabels[item.type]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* [D2] 无结果提示 */}
          {isOpen && searchQuery && filteredResults.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-surface rounded-xl border border-surface-light shadow-xl z-50 p-4 text-center">
              <p className="text-text-muted text-sm">未找到相关结果</p>
            </div>
          )}

          <p className="text-xs text-text-muted mt-2">
            支持武器、地图、干员、任务搜索
          </p>
        </div>
      </div>
    </section>
  );
}
