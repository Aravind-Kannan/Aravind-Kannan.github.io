import { motion } from "framer-motion";
import { personalInfo } from "../data/info";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full flex-grow relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-2xl mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 font-sans">
            About Me
          </h1>
        </div>
        
        <div className="prose dark:prose-invert prose-lg prose-zinc max-w-none text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
          {personalInfo.about.map((paragraph, index) => (
            <motion.p 
              key={index} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-6 last:mb-0"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            whileHover={{ y: -5 }}
            className="group relative bg-white/50 dark:bg-zinc-900/40 backdrop-blur-sm border border-zinc-200/60 dark:border-zinc-800/80 rounded-3xl p-8 hover:shadow-xl dark:hover:shadow-black/20 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
            <h3 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6 relative z-10">Principles</h3>
            <ul className="space-y-4 text-zinc-600 dark:text-zinc-400 font-light relative z-10">
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary-500" /> Automation over repetition</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary-500" /> Simplicity over complexity</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary-500" /> Observability is not optional</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary-500" /> Documentation is code</li>
            </ul>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="group relative bg-white/50 dark:bg-zinc-900/40 backdrop-blur-sm border border-zinc-200/60 dark:border-zinc-800/80 rounded-3xl p-8 hover:shadow-xl dark:hover:shadow-black/20 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
            <h3 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6 relative z-10">Toolkit</h3>
            <div className="flex flex-wrap gap-2.5 relative z-10">
              {["Kubernetes", "Rust", "Go", "Distributed Systems", "Platform Engineering", "AWS", "Terraform", "Docker"].map((item) => (
                <span key={item} className="px-4 py-2 bg-zinc-100/80 dark:bg-zinc-800/80 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50 shadow-sm transition-colors hover:border-primary-500/30">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
