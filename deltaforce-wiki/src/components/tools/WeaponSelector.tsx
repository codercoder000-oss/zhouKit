"use client";

// [D] 武器选择组件

import { Weapon, WeaponCategoryLabels } from "@/types";
import { Card } from "@/components/ui";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface WeaponSelectorProps {
  weapons: Weapon[];
  selectedWeapon: Weapon | null;
  onSelect: (weapon: Weapon) => void;
}

export function WeaponSelector({
  weapons,
  selectedWeapon,
  onSelect,
}: WeaponSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  // [D] 按类别分组武器
  const groupedWeapons = weapons.reduce((acc, weapon) => {
    if (!acc[weapon.category]) {
      acc[weapon.category] = [];
    }
    acc[weapon.category].push(weapon);
    return acc;
  }, {} as Record<string, Weapon[]>);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-text-primary">选择武器</label>

      <Card
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-surface border-surface-light cursor-pointer hover:border-surface-light/80 transition-all"
      >
        {selectedWeapon ? (
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-text-primary">{selectedWeapon.name}</div>
              <div className="text-xs text-text-secondary">
                {WeaponCategoryLabels[selectedWeapon.category]} · {selectedWeapon.caliber}
              </div>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-text-secondary transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        ) : (
          <div className="flex items-center justify-between text-text-muted">
            <span>选择一把武器...</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        )}
      </Card>

      {/* [D2] 武器列表 - 使用主题色 */}
      {isOpen && (
        <div className="bg-surface rounded-xl border border-surface-light p-2 max-h-80 overflow-y-auto">
          {Object.entries(groupedWeapons).map(([category, categoryWeapons]) => (
            <div key={category} className="mb-3 last:mb-0">
              <div className="text-xs font-medium text-text-muted px-2 py-1">
                {WeaponCategoryLabels[category as keyof typeof WeaponCategoryLabels]}
              </div>
              {categoryWeapons.map((weapon) => (
                <button
                  key={weapon.id}
                  onClick={() => {
                    onSelect(weapon);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-2 rounded-lg transition-colors ${
                    selectedWeapon?.id === weapon.id
                      ? "bg-info/20 text-info"
                      : "hover:bg-surface-light text-text-secondary"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{weapon.name}</div>
                      <div className="text-xs text-text-muted">
                        伤害 {weapon.stats.damage} · 射速 {weapon.stats.fireRate}
                      </div>
                    </div>
                    <div
                      className={`text-xs px-2 py-0.5 rounded ${
                        weapon.tier === "S"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : weapon.tier === "A"
                          ? "bg-purple-500/20 text-purple-400"
                          : "bg-info/20 text-info"
                      }`}
                    >
                      {weapon.tier}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
