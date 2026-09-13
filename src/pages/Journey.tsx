import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  journey,
  journeyCategories,
  type JourneyCategory,
  type JourneyKind,
} from "../data/journey";

const careerStyles = {
  dot: "border-primary-500 bg-primary-50 dark:bg-zinc-950",
  ping: "bg-primary-400/30",
  label: "text-primary-600 dark:text-primary-400",
};

const kindStyles: Record<
  JourneyKind,
  { dot: string; ping: string; label: string }
> = {
  Degree: {
    dot: "border-sky-500 bg-sky-50 dark:bg-zinc-950",
    ping: "bg-sky-400/30",
    label: "text-sky-700 dark:text-sky-400",
  },
  School: {
    dot: "border-zinc-400 bg-zinc-50 dark:bg-zinc-950",
    ping: "bg-zinc-400/30",
    label: "text-zinc-500 dark:text-zinc-400",
  },
  Hackathon: {
    dot: "border-emerald-500 bg-emerald-50 dark:bg-zinc-950",
    ping: "bg-emerald-400/30",
    label: "text-emerald-700 dark:text-emerald-400",
  },
  Fellowship: {
    dot: "border-amber-500 bg-amber-50 dark:bg-zinc-950",
    ping: "bg-amber-400/30",
    label: "text-amber-700 dark:text-amber-400",
  },
  Teaching: {
    dot: "border-rose-400 bg-rose-50 dark:bg-zinc-950",
    ping: "bg-rose-400/30",
    label: "text-rose-700 dark:text-rose-400",
  },
};

function markerStyles(category: JourneyCategory, kind?: JourneyKind) {
  if (category === "career" || !kind) return careerStyles;
  return kindStyles[kind];
}

function categoryLabel(category: JourneyCategory | "All") {
  if (category === "All") return "All";
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export default function Journey() {
  const [activeCategory, setActiveCategory] = useState<"All" | JourneyCategory>(
    "All"
  );

  const filtered = journey.filter((item) =>
    activeCategory === "All" ? true : item.category === activeCategory
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full flex-grow relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="mb-10 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4 sm:mb-6">
            My Journey
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
            Backend and product engineering → integrations and workflows → infrastructure
            and platforms → developer tooling → distributed data processing.
          </p>
        </header>

        <div
          role="group"
          aria-label="Filter journey by category"
          className="flex flex-wrap gap-2 mb-10 sm:mb-12"
        >
          {journeyCategories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={isActive}
                className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                  isActive
                    ? "text-zinc-900 dark:text-white"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="journey-tab-indicator"
                    className="absolute inset-0 rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-zinc-200/60 dark:border-zinc-700/60 -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{categoryLabel(category)}</span>
              </button>
            );
          })}
        </div>

        <ol
          aria-label="Career timeline"
          className="relative space-y-0 pl-8 sm:pl-12"
        >
          <div
            className="absolute left-[16px] sm:left-[24px] top-3 bottom-3 w-px bg-gradient-to-b from-transparent via-zinc-300 dark:via-zinc-700 to-transparent -translate-x-1/2"
            aria-hidden="true"
          />

          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => {
              const styles = markerStyles(item.category, item.kind);
              const isLatest = index === 0 && activeCategory === "All";

              return (
                <motion.li
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{
                    duration: 0.35,
                    delay: Math.min(index * 0.05, 0.25),
                  }}
                  className="relative pb-10 sm:pb-12 last:pb-0"
                >
                  <div
                    className="absolute -left-8 sm:-left-12 top-1.5 w-8 sm:w-12 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <div className="relative flex items-center justify-center">
                      {isLatest && (
                        <span
                          className={`absolute inline-flex h-3.5 w-3.5 rounded-full ${styles.ping} animate-ping`}
                        />
                      )}
                      <span
                        className={`relative z-10 flex h-3.5 w-3.5 rounded-full border-2 ${styles.dot}`}
                      />
                    </div>
                  </div>

                  <article className="group relative pl-1 sm:pl-2">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1.5">
                      <time
                        className="text-xs sm:text-sm font-mono tracking-wide text-zinc-500 dark:text-zinc-500"
                        dateTime={item.date}
                      >
                        {item.date}
                      </time>
                      {item.kind && (
                        <span
                          className={`text-[10px] sm:text-xs font-semibold uppercase tracking-widest ${styles.label}`}
                        >
                          {item.kind}
                        </span>
                      )}
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-snug">
                      {item.role}
                    </h2>

                    {item.org && (
                      <p className="mt-0.5 text-sm sm:text-base text-zinc-500 dark:text-zinc-400 font-medium">
                        {item.org}
                      </p>
                    )}

                    <p className="mt-3 text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed font-light max-w-2xl">
                      {item.description}
                    </p>
                  </article>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ol>

        {filtered.length === 0 && (
          <p className="text-center text-zinc-500 py-16">
            No milestones in this category.
          </p>
        )}
      </motion.div>
    </div>
  );
}
