// [D] 配件数据获取函数

import attachmentsData from "@/data/attachments.json";
import {
  Attachment,
  AttachmentType,
  AttachmentTypeLabels,
} from "@/types/attachment.types";

// [D] 配件数据
const attachments: Attachment[] = attachmentsData as Attachment[];

/**
 * [D] 获取所有配件
 */
export function getAllAttachments(): Attachment[] {
  return attachments;
}

/**
 * [D] 根据 ID 获取配件
 */
export function getAttachmentById(id: string): Attachment | undefined {
  return attachments.find((a) => a.id === id);
}

/**
 * [D] 根据类型获取配件
 */
export function getAttachmentsByType(type: AttachmentType): Attachment[] {
  return attachments.filter((a) => a.type === type);
}

/**
 * [D] 获取配件类型标签
 */
export function getAttachmentTypeLabel(type: AttachmentType): string {
  return AttachmentTypeLabels[type];
}

/**
 * [D] 获取所有配件类型
 */
export function getAllAttachmentTypes(): AttachmentType[] {
  return ["muzzle", "barrel", "scope", "grip", "stock", "magazine", "laser"];
}
