import { motion } from "framer-motion";
import { personalInfo } from "../data/info";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full flex-grow">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-8 font-sans">
          About Me
        </h1>
        
        <div className="prose dark:prose-invert prose-lg prose-zinc max-w-none">
          {personalInfo.about.map((paragraph, index) => (
            <p key={index} className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Values</h3>
            <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
              <li>Automation over repetition</li>
              <li>Simplicity over complexity</li>
              <li>Observability is not optional</li>
              <li>Documentation is code</li>
            </ul>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Interests</h3>
            <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 flex flex-wrap gap-2">
              {["Kubernetes", "Rust", "Go", "Distributed Systems", "Platform Engineering", "Open Source"].map((item) => (
                <li key={item} className="px-3 py-1 bg-zinc-200/50 dark:bg-zinc-800/80 rounded-md text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
