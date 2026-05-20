// [A] UI 组件统一导出入口

export { Button } from "./Button";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./Button";

export { Card, CardHeader, CardContent, CardFooter } from "./Card";
export type { CardProps, CardHeaderProps, CardContentProps, CardFooterProps, CardVariant } from "./Card";

export { Badge } from "./Badge";
export type { BadgeProps, BadgeVariant, BadgeSize } from "./Badge";

export { Input } from "./Input";
export type { InputProps } from "./Input";

export { Modal } from "./Modal";
export type { ModalProps, ModalSize } from "./Modal";

export { Tabs } from "./Tabs";
export type { TabsProps, TabItem, TabsControlledProps, TabsUncontrolledProps } from "./Tabs";

// [A2] 动画组件
export {
  AnimatedContainer,
  AnimatedListItem,
  AnimatedSection,
} from "./AnimatedContainer";
export {
  PageTransition,
  PageSection,
  AnimatedItem,
} from "./PageTransition";

// [A2] 骨架屏组件
export {
  Skeleton,
  CardSkeleton,
  ListSkeleton,
  GridSkeleton,
  DetailSkeleton,
} from "./Skeleton";
