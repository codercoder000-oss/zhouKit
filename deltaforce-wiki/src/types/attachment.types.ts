// [D] 配件相关类型定义

/**
 * [D] 配件类型
 */
export type AttachmentType =
  | "muzzle"
  | "barrel"
  | "scope"
  | "grip"
  | "stock"
  | "magazine"
  | "laser";

/**
 * [D] 配件类型显示名称
 */
export const AttachmentTypeLabels: Record<AttachmentType, string> = {
  muzzle: "枪口",
  barrel: "枪管",
  scope: "瞄准镜",
  grip: "握把",
  stock: "枪托",
  magazine: "弹匣",
  laser: "激光",
};

/**
 * [D] 属性修改器
 * [C] 扩展以包含所有 WeaponStats 可能的属性
 */
export interface StatsModifier {
  damage?: number;
  fireRate?: number;
  accuracy?: number;
  recoil?: number;
  mobility?: number;
  range?: number;
  magazineSize?: number;
  reloadTime?: number;
  control?: number;
  reserveAmmo?: number;
  // [C] 注意：fireModes 是数组类型，不参与数值计算
}

/**
 * [D] 配件接口
 */
export interface Attachment {
  /** [D] 唯一标识符 */
  id: string;
  /** [D] 名称 */
  name: string;
  /** [D] 类型 */
  type: AttachmentType;
  /** [D] 属性修改值 */
  statsModifier: StatsModifier;
  /** [D] 描述 */
  description: string;
}

/**
 * [D] 当前配装状态
 */
export interface LoadoutState {
  weaponId: string | null;
  attachments: Record<AttachmentType, Attachment | null>;
}
