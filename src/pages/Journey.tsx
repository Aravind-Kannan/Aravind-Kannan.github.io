/* Hallmark · genre: modern-minimal · macrostructure: Letter · design-system: design.md · designed-as-app */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  journey,
  journeyCategories,
  type JourneyCategory,
} from "../data/journey";
import { PageShell, PageHeader } from "../components/PageShell";

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
    <PageShell>
      <PageHeader
        eyebrow="journey / timeline"
        title="My Journey"
        lede="Backend and product engineering → integrations and workflows → infrastructure and platforms → developer tooling → distributed data processing."
      />

      <div
        role="group"
        aria-label="Filter journey by category"
        className="flex flex-wrap gap-x-6 gap-y-2 mb-12 sm:mb-16 border-b border-zinc-200 dark:border-zinc-800"
      >
        {journeyCategories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={isActive}
              className={`relative pb-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-sm ${
                isActive
                  ? "text-zinc-900 dark:text-zinc-50"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
              }`}
            >
              {categoryLabel(category)}
              {isActive && (
                <motion.span
                  layoutId="journey-tab-underline"
                  className="absolute inset-x-0 -bottom-px h-px bg-primary-500"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <ol aria-label="Career timeline" className="relative space-y-0 pl-8 sm:pl-12">
        <div
          className="absolute left-[16px] sm:left-[24px] top-3 bottom-3 w-px bg-zinc-200 dark:bg-zinc-800 -translate-x-1/2"
          aria-hidden="true"
        />

        <AnimatePresence mode="popLayout">
          {filtered.map((item, index) => {
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
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative pb-10 sm:pb-12 last:pb-0"
              >
                <div
                  className="absolute -left-8 sm:-left-12 top-1.5 w-8 sm:w-12 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <div className="relative flex items-center justify-center">
                    {isLatest && (
                      <span className="absolute inline-flex h-3.5 w-3.5 rounded-full bg-primary-400/30 animate-ping" />
                    )}
                    <span
                      className={`relative z-10 flex h-3.5 w-3.5 rounded-full border-2 ${
                        isLatest
                          ? "border-primary-500 bg-primary-50 dark:bg-zinc-950"
                          : "border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-950"
                      }`}
                    />
                  </div>
                </div>

                <article className="pl-1 sm:pl-2">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1.5">
                    <time
                      className="text-xs font-mono tracking-wide text-zinc-500"
                      dateTime={item.date}
                    >
                      {item.date}
                    </time>
                    {item.kind && (
                      <span className="text-[10px] sm:text-xs font-medium uppercase tracking-widest text-primary-600 dark:text-primary-400">
                        {item.kind}
                      </span>
                    )}
                  </div>

                  <h2 className="text-base sm:text-lg font-medium tracking-tight text-zinc-900 dark:text-zinc-100 leading-snug break-words [overflow-wrap:anywhere]">
                    {item.role}
                  </h2>

                  {item.org && (
                    <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                      {item.org}
                    </p>
                  )}

                  <p className="mt-2.5 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed font-light max-w-2xl">
                    {item.description}
                  </p>
                </article>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ol>

      {filtered.length === 0 && (
        <p className="text-zinc-500 dark:text-zinc-500 font-light py-8">
          No milestones in this category.
        </p>
      )}
    </PageShell>
  );
}
