import { motion } from "framer-motion";
import { journey } from "../data/journey";

export default function Journey() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full flex-grow relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-2xl mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 font-sans">
            My Journey
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
            A timeline of my career, learning, and fundamental milestones.
          </p>
        </div>

        <div className="relative pt-6">
          {/* Main glowing line */}
          <div className="absolute left-[20px] md:left-[39px] top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-primary-500/30 to-transparent dark:via-primary-500/50" />
          
          <div className="space-y-12 md:space-y-16">
            {journey.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex flex-col md:flex-row items-start gap-6 md:gap-12"
              >
                {/* Visual Marker */}
                <div className="absolute left-[13px] md:relative md:left-0 md:flex flex-shrink-0 z-10 w-4 h-4 md:w-20 md:justify-center mt-1.5 md:mt-6">
                  <div className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400/50 opacity-75"></span>
                    <span className="relative flex h-4 w-4 rounded-full bg-primary-50 dark:bg-zinc-950 border-2 border-primary-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]"></span>
                  </div>
                </div>
                
                {/* Content Card */}
                <div className="ml-12 md:ml-0 flex-grow group relative bg-white/50 dark:bg-zinc-900/40 backdrop-blur-sm border border-zinc-200/60 dark:border-zinc-800/80 rounded-3xl p-6 md:p-8 hover:shadow-xl dark:hover:shadow-black/20 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-4">
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                        {item.title}
                      </h3>
                      <span className="text-sm font-mono tracking-wider font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10 px-3 py-1 rounded-full whitespace-nowrap">
                        {item.date}
                      </span>
                    </div>
                    
                    <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed mb-6 font-light">
                      {item.description}
                    </p>
                    
                    <div>
                      <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium uppercase tracking-widest bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-700/50 shadow-sm">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
