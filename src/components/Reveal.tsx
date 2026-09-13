import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  amount?: number | "all" | "some";
}

const directionMap = {
  up:    { opacity: 0, y: 28 },
  down:  { opacity: 0, y: -28 },
  left:  { opacity: 0, x: -28 },
  right: { opacity: 0, x: 28 },
  none:  { opacity: 0 },
};

/**
 * Wraps children in a whileInView reveal animation.
 * Respects prefers-reduced-motion via CSS (animation-duration: 0.01ms).
 * Generous rootMargin so nested page transitions don't leave content stuck at opacity 0.
 */
export default function Reveal({
  children,
  delay = 0,
  duration = 0.65,
  direction = "up",
  className,
  amount = 0.05,
}: Props) {
  return (
    <motion.div
      initial={directionMap[direction]}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount, margin: "80px 0px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
