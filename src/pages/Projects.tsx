import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Code2 } from "lucide-react";
import { Github } from "../components/Icons";
import { projects, projectCategories } from "../data/projects";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects.filter((project) =>
    activeCategory === "All" ? true : project.category === activeCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full flex-grow relative">
      {/* Background glow */}
      <div className="absolute top-20 right-20 w-[400px] h-[400px] bg-primary-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <div className="max-w-2xl mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 font-sans">
            Projects
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
            A selection of my recent work, side projects, and open source contributions.
            Building scalable solutions with modern infrastructure.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {projectCategories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? "text-zinc-900 dark:text-white"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="project-tab-indicator"
                    className="absolute inset-0 rounded-full bg-white dark:bg-zinc-800 shadow-[0_1px_3px_0_rgba(0,0,0,0.05)] border border-zinc-200/50 dark:border-zinc-700/50 -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            );
          })}
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
                className="group relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 bg-white/50 dark:bg-zinc-900/40 backdrop-blur-sm border border-zinc-200/60 dark:border-zinc-800/80 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 hover:border-zinc-300 dark:hover:border-zinc-700 text-left"
              >
                {/* Spot light effect placeholder if needed */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 flex items-center justify-center border border-primary-100 dark:border-primary-500/20 shadow-inner group-hover:scale-110 transition-transform duration-500">
                      <Code2 className="w-6 h-6" />
                    </div>
                    <div className="flex gap-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:scale-110 transition-all duration-300"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:scale-110 transition-all duration-300"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-8 font-light line-clamp-3 group-hover:line-clamp-none transition-all">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
