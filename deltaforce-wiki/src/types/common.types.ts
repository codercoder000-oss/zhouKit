// [A] 通用类型定义 - 项目中共享的基础类型

/**
 * [A] 基础实体接口
 * 所有数据实体的基础字段
 */
export interface BaseEntity {
  /** 唯一标识符 */
  id: string;
  /** 创建时间 */
  createdAt?: string;
  /** 更新时间 */
  updatedAt?: string;
  /** 名称 */
  name: string;
  /** 描述 */
  description?: string;
}

/**
 * [A] 列表项接口
 * 用于下拉选择、导航菜单等场景
 */
export interface ListItem {
  /** 值 */
  value: string;
  /** 显示标签 */
  label: string;
  /** 图标 */
  icon?: string;
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * [A] 分页参数接口
 */
export interface PaginationParams {
  /** 页码，从 1 开始 */
  page: number;
  /** 每页数量 */
  pageSize: number;
}

/**
 * [A] 分页结果接口
 */
export interface PaginationResult<T> {
  /** 数据列表 */
  list: T[];
  /** 总数量 */
  total: number;
  /** 当前页码 */
  page: number;
  /** 每页数量 */
  pageSize: number;
  /** 总页数 */
  totalPages: number;
}

/**
 * [A] API 响应基础接口
 */
export interface ApiResponse<T> {
  /** 是否成功 */
  success: boolean;
  /** 数据 */
  data?: T;
  /** 错误信息 */
  error?: string;
  /** 错误码 */
  code?: number;
}

/**
 * [A] 排序方向类型
 */
export type SortDirection = "asc" | "desc";

/**
 * [A] 排序参数接口
 */
export interface SortParams {
  /** 排序字段 */
  field: string;
  /** 排序方向 */
  direction: SortDirection;
}

/**
 * [A] 过滤条件类型
 */
export type FilterOperator = "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "contains" | "in";

/**
 * [A] 过滤条件接口
 */
export interface FilterCondition {
  /** 字段名 */
  field: string;
  /** 操作符 */
  operator: FilterOperator;
  /** 值 */
  value: unknown;
}

/**
 * [A] 查询参数接口
 */
export interface QueryParams {
  /** 分页参数 */
  pagination?: PaginationParams;
  /** 排序参数 */
  sort?: SortParams;
  /** 过滤条件 */
  filters?: FilterCondition[];
  /** 搜索关键词 */
  search?: string;
}
