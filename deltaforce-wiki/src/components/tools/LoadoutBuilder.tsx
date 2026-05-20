"use client";

// [D] 配装构建器主组件

import { useState, useMemo } from "react";
import { Weapon } from "@/types";
import {
  Attachment,
  AttachmentType,
  LoadoutState,
} from "@/types/attachment.types";
import { WeaponSelector } from "./WeaponSelector";
import { AttachmentSlot } from "./AttachmentSlot";
import { StatsPreview } from "./StatsPreview";
import { getAllAttachments } from "@/lib/attachments";
import { Card } from "@/components/ui";
import { RotateCcw, Save, Share2 } from "lucide-react";

interface LoadoutBuilderProps {
  weapons: Weapon[];
}

// [D] 可用的配件类型
const attachmentTypes: AttachmentType[] = [
  "muzzle",
  "barrel",
  "scope",
  "grip",
  "stock",
  "magazine",
  "laser",
];

export function LoadoutBuilder({ weapons }: LoadoutBuilderProps) {
  const allAttachments = getAllAttachments();

  // [D] 配装状态
  const [loadout, setLoadout] = useState<LoadoutState>({
    weaponId: null,
    attachments: {
      muzzle: null,
      barrel: null,
      scope: null,
      grip: null,
      stock: null,
      magazine: null,
      laser: null,
    },
  });

  // [D] 当前展开的槽位
  const [openSlot, setOpenSlot] = useState<AttachmentType | null>(null);

  // [D] 获取当前选中的武器
  const selectedWeapon = useMemo(() => {
    if (!loadout.weaponId) return null;
    return weapons.find((w) => w.id === loadout.weaponId) || null;
  }, [loadout.weaponId, weapons]);

  // [D] 获取武器支持的配件类型
  const supportedAttachmentTypes = useMemo(() => {
    if (!selectedWeapon) return [];
    return selectedWeapon.attachments.map((a) => a.type);
  }, [selectedWeapon]);

  // [D] 获取某类型可用的配件
  const getAvailableAttachments = (type: AttachmentType): Attachment[] => {
    if (!selectedWeapon) return [];
    const weaponAttachment = selectedWeapon.attachments.find(
      (a) => a.type === type
    );
    if (!weaponAttachment) return [];

    return allAttachments.filter((a) =>
      weaponAttachment.compatible.includes(a.id)
    );
  };

  // [D] 选择武器
  const handleSelectWeapon = (weapon: Weapon) => {
    setLoadout({
      weaponId: weapon.id,
      attachments: {
        muzzle: null,
        barrel: null,
        scope: null,
        grip: null,
        stock: null,
        magazine: null,
        laser: null,
      },
    });
    setOpenSlot(null);
  };

  // [D] 选择配件
  const handleSelectAttachment = (
    type: AttachmentType,
    attachment: Attachment | null
  ) => {
    setLoadout((prev) => ({
      ...prev,
      attachments: {
        ...prev.attachments,
        [type]: attachment,
      },
    }));
    setOpenSlot(null);
  };

  // [D] 重置配装
  const handleReset = () => {
    setLoadout({
      weaponId: null,
      attachments: {
        muzzle: null,
        barrel: null,
        scope: null,
        grip: null,
        stock: null,
        magazine: null,
        laser: null,
      },
    });
    setOpenSlot(null);
  };

  // [D] 获取当前属性修改器
  const currentModifiers = useMemo(() => {
    return Object.values(loadout.attachments).filter(
      (a): a is Attachment => a !== null
    ).map((a) => a.statsModifier);
  }, [loadout.attachments]);

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* [D2] 左侧：武器选择 + 配件槽位 - 使用主题色 */}
      <div className="lg:col-span-2 space-y-6">
        {/* [D2] 武器选择 */}
        <WeaponSelector
          weapons={weapons}
          selectedWeapon={selectedWeapon}
          onSelect={handleSelectWeapon}
        />

        {/* [D2] 武器信息卡片 */}
        {selectedWeapon && (
          <Card className="p-4 bg-surface/50 border-surface-light">
            <div className="flex items-start gap-4">
              {/* [D2] 武器图片占位 */}
              <div className="w-24 h-24 bg-surface-light rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xs text-text-muted">武器图片</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-text-primary text-lg">
                  {selectedWeapon.name}
                </h3>
                <p className="text-sm text-text-secondary mt-1">
                  {selectedWeapon.description}
                </p>
                <div className="flex gap-4 mt-3 text-xs text-text-muted">
                  <span>口径: {selectedWeapon.caliber}</span>
                  <span>解锁等级: {selectedWeapon.unlockLevel}</span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* [D2] 配件槽位网格 */}
        {selectedWeapon && (
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-4">
              配件槽位
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {attachmentTypes.map((type) => (
                <AttachmentSlot
                  key={type}
                  type={type}
                  selectedAttachment={loadout.attachments[type]}
                  availableAttachments={getAvailableAttachments(type)}
                  onSelect={(attachment) =>
                    handleSelectAttachment(type, attachment)
                  }
                  isOpen={openSlot === type}
                  onToggle={() =>
                    setOpenSlot(openSlot === type ? null : type)
                  }
                />
              ))}
            </div>
          </div>
        )}

        {/* [D2] 操作按钮 */}
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface text-text-secondary hover:bg-surface-light transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            重置
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent/90 transition-colors">
            <Save className="w-4 h-4" />
            保存配装
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface text-text-secondary hover:bg-surface-light transition-colors"
          >
            <Share2 className="w-4 h-4" />
            分享
          </button>
        </div>
      </div>

      {/* [D2] 右侧：属性预览 */}
      <div className="lg:col-span-1">
        {selectedWeapon ? (
          <StatsPreview
            baseStats={selectedWeapon.stats}
            modifiers={currentModifiers}
          />
        ) : (
          <Card className="p-6 bg-surface/50 border-surface-light text-center">
            <p className="text-text-muted">
              选择武器后查看属性预览
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
