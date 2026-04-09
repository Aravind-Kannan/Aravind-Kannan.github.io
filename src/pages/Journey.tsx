import { motion } from "framer-motion";
import { journey } from "../data/journey";

export default function Journey() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full flex-grow relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4 sm:mb-6">
            My Journey
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
            A timeline of my career, learning, and fundamental milestones.
          </p>
        </header>

        {/* Timeline */}
        <ol aria-label="Career timeline" className="relative pl-8 sm:pl-16">
          {/* Vertical glow line — positioned relative to the ol's padding */}
          <div
            className="absolute left-3 sm:left-7 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-primary-500/40 to-transparent dark:via-primary-500/60"
            aria-hidden="true"
          />

          <div className="space-y-10 sm:space-y-14">
            {journey.map((item, index) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.08, 0.4) }}
                className="relative"
              >
                {/* Node marker */}
                <div
                  className="absolute -left-8 sm:-left-16 top-5 sm:top-6 flex items-center justify-center w-6 h-6"
                  aria-hidden="true"
                >
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400/40 opacity-75" />
                  <span className="relative flex h-3.5 w-3.5 rounded-full bg-primary-50 dark:bg-zinc-950 border-2 border-primary-500 shadow-[0_0_8px_rgba(20,184,166,0.5)]" />
                </div>

                {/* Content Card */}
                <div className="group relative bg-white/50 dark:bg-zinc-900/40 backdrop-blur-sm border border-zinc-200/60 dark:border-zinc-800/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 hover:shadow-lg dark:hover:shadow-black/20 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300">
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl pointer-events-none"
                    aria-hidden="true"
                  />

                  <div className="relative z-10">
                    <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 mb-3 sm:mb-4">
                      <h2 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
                        {item.title}
                      </h2>
                      <time
                        className="text-xs sm:text-sm font-mono tracking-wider font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10 px-3 py-1 rounded-full whitespace-nowrap self-start xs:self-auto"
                        dateTime={item.date}
                      >
                        {item.date}
                      </time>
                    </div>

                    <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed mb-5 font-light">
                      {item.description}
                    </p>

                    <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-widest bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-700/50 shadow-sm">
                      {item.category}
                    </span>
                  </div>
                </div>
              </motion.li>
            ))}
          </div>
        </ol>
      </motion.div>
    </div>
  );
}
