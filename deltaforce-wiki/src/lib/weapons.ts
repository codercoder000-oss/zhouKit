// [B] 武器数据获取函数

import weaponsData from "@/data/weapons.json";
import type { Weapon, WeaponCategory, WeaponTier } from "@/types/weapon.types";

// [B] 类型断言确保数据正确
const weapons = weaponsData.weapons as Weapon[];

/**
 * [B] 获取所有武器列表
 * @returns 武器数组
 */
export function getWeapons(): Weapon[] {
  return weapons;
}

/**
 * [C] 获取所有武器列表（别名）
 * @returns 武器数组
 */
export const getAllWeapons = getWeapons;

/**
 * [B] 根据ID获取单个武器
 * @param id 武器ID
 * @returns 武器对象或undefined
 */
export function getWeaponById(id: string): Weapon | undefined {
  return weapons.find((weapon) => weapon.id === id);
}

/**
 * [B] 按类别筛选武器
 * @param category 武器类别
 * @returns 筛选后的武器数组
 */
export function getWeaponsByCategory(category: WeaponCategory): Weapon[] {
  return weapons.filter((weapon) => weapon.category === category);
}

/**
 * [B] 按评级筛选武器
 * @param tier 武器评级
 * @returns 筛选后的武器数组
 */
export function getWeaponsByTier(tier: WeaponTier): Weapon[] {
  return weapons.filter((weapon) => weapon.tier === tier);
}

/**
 * [B] 综合筛选武器
 * @param filters 筛选条件
 * @returns 筛选后的武器数组
 */
export function filterWeapons(filters: {
  category?: WeaponCategory;
  tier?: WeaponTier;
  search?: string;
}): Weapon[] {
  return weapons.filter((weapon) => {
    // [B] 按类别筛选
    if (filters.category && weapon.category !== filters.category) {
      return false;
    }

    // [B] 按评级筛选
    if (filters.tier && weapon.tier !== filters.tier) {
      return false;
    }

    // [B] 按搜索词筛选
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const nameMatch = weapon.name.toLowerCase().includes(searchLower);
      const nameEnMatch = weapon.nameEn.toLowerCase().includes(searchLower);
      const descMatch = weapon.description?.toLowerCase().includes(searchLower);

      if (!nameMatch && !nameEnMatch && !descMatch) {
        return false;
      }
    }

    return true;
  });
}

/**
 * [B] 获取所有武器类别
 * @returns 类别数组
 */
export function getAllCategories(): WeaponCategory[] {
  return ["assault-rifle", "smg", "sniper", "shotgun", "pistol", "lmg", "dmr"];
}

/**
 * [B] 获取所有武器评级
 * @returns 评级数组
 */
export function getAllTiers(): WeaponTier[] {
  return ["S", "A", "B", "C", "D"];
}

/**
 * [B] 生成静态参数（用于 generateStaticParams）
 * @returns 参数数组
 */
export function generateWeaponParams(): { id: string }[] {
  return weapons.map((weapon) => ({ id: weapon.id }));
}
