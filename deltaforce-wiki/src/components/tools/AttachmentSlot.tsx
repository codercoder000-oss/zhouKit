"use client";

// [D] 单个配件槽位组件

import { Card, Badge } from "@/components/ui";
import {
  Attachment,
  AttachmentType,
  AttachmentTypeLabels,
} from "@/types/attachment.types";
import { Plus, X } from "lucide-react";

interface AttachmentSlotProps {
  type: AttachmentType;
  selectedAttachment: Attachment | null;
  availableAttachments: Attachment[];
  onSelect: (attachment: Attachment | null) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function AttachmentSlot({
  type,
  selectedAttachment,
  availableAttachments,
  onSelect,
  isOpen,
  onToggle,
}: AttachmentSlotProps) {
  const typeLabel = AttachmentTypeLabels[type];

  return (
    <div className="space-y-2">
      {/* [D2] 槽位标题 */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-text-primary">{typeLabel}</span>
        {selectedAttachment && (
          <button
            onClick={() => onSelect(null)}
            className="text-xs text-danger hover:text-danger/80 flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            移除
          </button>
        )}
      </div>

      {/* [D2] 当前选择/空槽位 - 使用主题色 */}
      <Card
        onClick={onToggle}
        className={`p-3 cursor-pointer transition-all ${
          selectedAttachment
            ? "bg-surface border-info/50"
            : "bg-surface/50 border-surface-light hover:border-surface-light/80"
        }`}
      >
        {selectedAttachment ? (
          <div className="space-y-1">
            <div className="font-medium text-text-primary text-sm">
              {selectedAttachment.name}
            </div>
            <p className="text-xs text-text-secondary line-clamp-1">
              {selectedAttachment.description}
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-text-muted py-2">
            <Plus className="w-4 h-4" />
            <span className="text-sm">选择{typeLabel}</span>
          </div>
        )}
      </Card>

      {/* [D2] 选择列表 - 使用主题色 */}
      {isOpen && (
        <div className="bg-surface rounded-lg border border-surface-light p-2 space-y-1">
          {availableAttachments.length === 0 ? (
            <p className="text-xs text-text-muted text-center py-2">
              该武器不支持此类型的配件
            </p>
          ) : (
            availableAttachments.map((attachment) => (
              <button
                key={attachment.id}
                onClick={() => {
                  onSelect(attachment);
                }}
                className={`w-full text-left p-2 rounded-lg transition-colors text-sm ${
                  selectedAttachment?.id === attachment.id
                    ? "bg-info/20 text-info"
                    : "hover:bg-surface-light text-text-secondary"
                }`}
              >
                <div className="font-medium">{attachment.name}</div>
                <p className="text-xs text-text-muted line-clamp-1 mt-0.5">
                  {attachment.description}
                </p>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
