"use client";
// [A2] 通用动画容器 - 入场淡入+上移效果

import { motion, type Variants } from "motion/react";
import { type ReactNode } from "react";

interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

// [A2] 入场动画变体 - 淡入+上移
const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

// [A2] 通用动画容器组件
export function AnimatedContainer({
  children,
  className,
  delay = 0,
  duration = 0.4,
  once = true,
}: AnimatedContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={fadeInUp}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// [A2] 列表项动画容器 - 用于 stagger 效果
interface AnimatedListItemProps {
  children: ReactNode;
  className?: string;
  index?: number;
  staggerDelay?: number;
}

export function AnimatedListItem({
  children,
  className,
  index = 0,
  staggerDelay = 0.05,
}: AnimatedListItemProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      variants={fadeInUp}
      transition={{
        duration: 0.35,
        delay: index * staggerDelay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// [A2] 页面区块动画 - 用于页面主要内容区块
interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
