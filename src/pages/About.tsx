import { motion } from "framer-motion";
import { personalInfo } from "../data/info";
import Reveal from "../components/Reveal";

const principles = [
  "Automation over repetition",
  "Simplicity over complexity",
  "Observability is not optional",
  "Documentation is code",
];

const toolkit = [
  "Kubernetes", "Rust", "Go", "Distributed Systems",
  "Platform Engineering", "AWS", "Terraform", "Docker",
];

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full flex-grow relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="mb-12 sm:mb-16">
          <Reveal>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4 sm:mb-6">
              About Me
            </h1>
          </Reveal>
        </header>

        <div className="space-y-5 mb-16 sm:mb-20">
          {personalInfo.about.map((paragraph, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
          <Reveal direction="left" delay={0.1}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative bg-white/50 dark:bg-zinc-900/40 backdrop-blur-sm border border-zinc-200/60 dark:border-zinc-800/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:shadow-xl dark:hover:shadow-black/20 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 h-full"
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl pointer-events-none"
                aria-hidden="true"
              />
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-5 sm:mb-6 relative z-10">
                Principles
              </h2>
              <ul className="space-y-3 text-zinc-600 dark:text-zinc-400 font-light relative z-10">
                {principles.map((p, i) => (
                  <motion.li
                    key={p}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.07 }}
                    className="flex items-center gap-3 text-sm sm:text-base"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" aria-hidden="true" />
                    {p}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </Reveal>

          <Reveal direction="right" delay={0.2}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative bg-white/50 dark:bg-zinc-900/40 backdrop-blur-sm border border-zinc-200/60 dark:border-zinc-800/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:shadow-xl dark:hover:shadow-black/20 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 h-full"
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl pointer-events-none"
                aria-hidden="true"
              />
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-5 sm:mb-6 relative z-10">
                Toolkit
              </h2>
              <div className="flex flex-wrap gap-2 sm:gap-2.5 relative z-10" role="list" aria-label="Skills and technologies">
                {toolkit.map((item, i) => (
                  <motion.span
                    key={item}
                    role="listitem"
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-zinc-100/80 dark:bg-zinc-800/80 rounded-xl text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50 shadow-sm transition-colors hover:border-primary-500/40 hover:text-primary-700 dark:hover:text-primary-300"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </Reveal>
        </div>
      </motion.div>
    </div>
  );
}
