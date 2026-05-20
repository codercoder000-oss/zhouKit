'use client'
// [A2] 页面内容入场动画包装器 - 提供统一的入场效果

import { motion, type Variants } from "motion/react";
import { type ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

// [A2] 页面入场动画变体
const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.05,
    },
  },
};

// [A2] 子元素动画变体
const itemVariants: Variants = {
  initial: {
    opacity: 0,
    y: 15,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// [A2] 页面过渡包装器 - 包裹页面主内容
export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.main
      initial="initial"
      animate="animate"
      variants={pageVariants}
      className={className}
    >
      {children}
    </motion.main>
  );
}

// [A2] 页面内容区块 - 用于页面内的内容区块动画
interface PageSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function PageSection({ children, className, delay = 0 }: PageSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// [A2] 子元素动画容器 - 与 PageTransition 配合使用
interface AnimatedItemProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedItem({ children, className }: AnimatedItemProps) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
