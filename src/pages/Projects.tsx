import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ExternalLink, Code2 } from "lucide-react";
import { Github } from "../components/Icons";
import { projects, projectCategories } from "../data/projects";
import Reveal from "../components/Reveal";

/** 3D tilt card — mouse position drives rotateX/rotateY via springs */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects.filter((project) =>
    activeCategory === "All" ? true : project.category === activeCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full flex-grow relative">
      {/* Background glow */}
      <div
        className="absolute top-20 right-0 sm:right-20 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-primary-500/5 blur-[100px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <header className="mb-12 sm:mb-16">
          <Reveal>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4 sm:mb-6">
              Projects
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light max-w-2xl">
              A selection of my recent work, side projects, and open source contributions.
              Building scalable solutions with modern infrastructure.
            </p>
          </Reveal>
        </header>

        {/* Filters */}
        <Reveal delay={0.1}>
          <div
            role="group"
            aria-label="Filter projects by category"
            className="flex flex-wrap gap-2 mb-10 sm:mb-12"
          >
            {projectCategories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
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
                      layoutId="project-tab-indicator"
                      className="absolute inset-0 rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-zinc-200/60 dark:border-zinc-700/60 -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Project Grid */}
        <motion.ul
          layout
          aria-label="Projects list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.li
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.97, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <TiltCard className="h-full group relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 transition-shadow duration-300 bg-white/50 dark:bg-zinc-900/40 backdrop-blur-sm border border-zinc-200/60 dark:border-zinc-800/80 hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-black/30 hover:border-zinc-300 dark:hover:border-zinc-700">
                  {/* Spotlight gradient follows tilt */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/10 to-transparent dark:from-white/5 dark:via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
                    aria-hidden="true"
                  />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6 sm:mb-8 gap-4">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 flex items-center justify-center border border-primary-100 dark:border-primary-500/20 group-hover:scale-110 transition-transform duration-500 flex-shrink-0" style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}>
                        <Code2 className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                      </div>
                      <div className="flex gap-3 sm:gap-4">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} on GitHub`}
                            className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
                          >
                            <Github className="w-5 h-5" aria-hidden="true" />
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} live demo`}
                            className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
                          >
                            <ExternalLink className="w-5 h-5" aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6 sm:mb-8 font-light">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-medium tracking-wide bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </TiltCard>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {filteredProjects.length === 0 && (
          <p className="text-center text-zinc-500 py-20">No projects in this category yet.</p>
        )}
      </motion.div>
    </div>
  );
}
