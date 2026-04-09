import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

/**
 * Custom magnetic cursor — desktop/fine-pointer only.
 * Renders a small dot + lagging ring. Scales on interactive elements.
 * Hidden automatically on touch/coarse-pointer devices via CSS.
 */
export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [visible, setVisible] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  // The ring lags behind the dot with spring physics
  const rx = useSpring(mx, { stiffness: 220, damping: 28, mass: 0.5 });
  const ry = useSpring(my, { stiffness: 220, damping: 28, mass: 0.5 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!visible) setVisible(true);

      const el = e.target as HTMLElement;
      const style = window.getComputedStyle(el);
      setIsPointer(
        style.cursor === "pointer" ||
          el.tagName === "A" ||
          el.tagName === "BUTTON" ||
          el.closest("a, button") !== null
      );
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [mx, my, visible]);

  return (
    <div className="cursor-none-container" aria-hidden="true">
      {/* Sharp dot follows cursor exactly */}
      <motion.div
        className="custom-cursor-dot fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-primary-500"
        style={{
          x: mx,
          y: my,
          translateX: "-50%",
          translateY: "-50%",
          width: isPointer ? 10 : 6,
          height: isPointer ? 10 : 6,
          opacity: visible ? 1 : 0,
        }}
        transition={{ width: { duration: 0.15 }, height: { duration: 0.15 } }}
      />
      {/* Lagging ring */}
      <motion.div
        className="custom-cursor-ring fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border border-primary-500/50"
        style={{
          x: rx,
          y: ry,
          translateX: "-50%",
          translateY: "-50%",
          width: isPointer ? 44 : 32,
          height: isPointer ? 44 : 32,
          opacity: visible ? 0.7 : 0,
        }}
        transition={{ width: { duration: 0.2 }, height: { duration: 0.2 } }}
      />
    </div>
  );
}
