import { motion } from "framer-motion";
import { journey } from "../data/journey";

export default function Journey() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full flex-grow">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4 font-sans">
          My Journey
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-16 text-lg">
          A timeline of my career, learning, and milestones.
        </p>

        <div className="relative border-l-2 border-zinc-200 dark:border-zinc-800 ml-4 pb-4">
          {journey.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-12 ml-8 relative"
            >
              {/* Timeline marker */}
              <span className="absolute -left-[41px] top-1.5 flex items-center justify-center w-5 h-5 rounded-full bg-zinc-50 dark:bg-zinc-950 border-2 border-primary-500 ring-4 ring-zinc-50 dark:ring-zinc-950"></span>
              
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  {item.title}
                </h3>
                <span className="text-sm font-mono text-primary-600 dark:text-primary-400">
                  {item.date}
                </span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed">
                {item.description}
              </p>
              
              <div className="mt-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 capitalize">
                  {item.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
