// [B2] 武器配件树组件 - 增强版

import {
  WeaponAttachmentSlot,
  AttachmentSlotTypeLabels,
  AttachmentSlotType,
} from "@/types/weapon.types";

interface AttachmentTreeProps {
  attachments: WeaponAttachmentSlot[];
}

/**
 * [B2] 获取槽位图标
 */
function getSlotIcon(type: AttachmentSlotType): string {
  const icons: Record<AttachmentSlotType, string> = {
    muzzle: "🔇",
    barrel: "🔫",
    scope: "👁️",
    grip: "✋",
    stock: "💪",
    magazine: "📦",
    laser: "🔴",
  };
  return icons[type];
}

/**
 * [B2] 获取槽位颜色
 */
function getSlotColor(type: AttachmentSlotType): string {
  const colors: Record<AttachmentSlotType, string> = {
    muzzle: "border-danger/30 hover:border-danger/50",
    barrel: "border-primary/30 hover:border-primary/50",
    scope: "border-info/30 hover:border-info/50",
    grip: "border-warning/30 hover:border-warning/50",
    stock: "border-success/30 hover:border-success/50",
    magazine: "border-secondary/30 hover:border-secondary/50",
    laser: "border-accent/30 hover:border-accent/50",
  };
  return colors[type];
}

/**
 * [B2] 武器配件槽位展示组件 - 更清晰的槽位展示
 */
export function AttachmentTree({ attachments }: AttachmentTreeProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-text-primary">可用配件槽位</h2>
        <span className="text-sm text-text-muted">
          共 {attachments.length} 个槽位
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
        {attachments.map((slot) => (
          <div
            key={slot.type}
            className={`group rounded-lg border bg-surface p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${getSlotColor(slot.type)}`}
          >
            {/* [B2] 槽位头部 - 图标和名称 */}
            <div className="flex flex-col items-center text-center">
              <span className="text-3xl transition-transform duration-200 group-hover:scale-110">
                {getSlotIcon(slot.type)}
              </span>
              <span className="mt-2 font-medium text-text-primary">
                {AttachmentSlotTypeLabels[slot.type]}
              </span>
            </div>

            {/* [B2] 兼容配件数量 */}
            <div className="mt-3 text-center text-sm text-text-muted">
              <span className="inline-flex items-center gap-1 rounded-full bg-surface-light px-2 py-0.5">
                <span className="text-accent">{slot.compatible.length}</span>
                <span>个配件</span>
              </span>
            </div>

            {/* [B2] 兼容配件预览（悬停显示） */}
            <div className="mt-3 hidden border-t border-surface-light pt-2 group-hover:block">
              <div className="space-y-1">
                {slot.compatible.slice(0, 3).map((attachment: string) => (
                  <div
                    key={attachment}
                    className="truncate text-xs text-text-secondary"
                  >
                    {attachment}
                  </div>
                ))}
                {slot.compatible.length > 3 && (
                  <div className="text-xs text-text-muted">
                    +{slot.compatible.length - 3} 更多...
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* [B2] 提示信息 */}
      <p className="text-sm text-text-muted">
        💡 鼠标悬停在槽位上可查看兼容配件列表。配件会影响武器的各项属性。
      </p>
    </div>
  );
}
