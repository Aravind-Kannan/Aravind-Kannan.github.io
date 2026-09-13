/* Hallmark · genre: modern-minimal · design-system: design.md · designed-as-app */
import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageShellProps {
  children: ReactNode;
  className?: string;
}

/** Shared content-page chrome: width, padding, enter motion. */
export function PageShell({ children, className = "" }: PageShellProps) {
  return (
    <div
      className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 sm:pb-16 w-full min-w-0 flex-grow relative ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface PageHeaderProps {
  /** Mono path label, e.g. "journey / timeline" */
  eyebrow: string;
  title: string;
  lede?: string;
}

/** Letter-family page header: mono eyebrow + semibold title + optional lede. */
export function PageHeader({ eyebrow, title, lede }: PageHeaderProps) {
  return (
    <header className="mb-8 sm:mb-10">
      <p className="font-mono text-xs tracking-wide text-primary-600 dark:text-primary-400 mb-3">
        {eyebrow}
      </p>
      <h1
        className={`text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 min-w-0 break-words [overflow-wrap:anywhere] ${
          lede ? "mb-3" : ""
        }`}
      >
        {title}
      </h1>
      {lede && (
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-light max-w-2xl">
          {lede}
        </p>
      )}
    </header>
  );
}

export default PageShell;
