import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight, Terminal, Box, Cpu, Globe, Database } from "lucide-react";
import { Link } from "react-router-dom";
import { personalInfo } from "../data/info";

export default function Home() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <div className="flex-grow flex flex-col relative py-20 sm:py-32">
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-[700px] overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[10%] w-[800px] h-[800px] rounded-full bg-primary-500/5 dark:bg-primary-500/10 blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6"
        >
          {/* Main Hero Card - Spans 8 columns */}
          <motion.div
            variants={item}
            className="md:col-span-8 bg-white/50 dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/50 rounded-[2.5rem] p-8 sm:p-12 flex flex-col justify-between min-h-[400px] relative overflow-hidden group"
          >
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
                Available for New Challenges
              </div>
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 leading-[0.9] mb-6">
                Hi, I'm <br /> {personalInfo.name}.
              </h1>
              <p className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 max-w-xl font-light leading-relaxed">
                Building <span className="text-zinc-900 dark:text-zinc-100 font-medium">robust infrastructure</span>, 
                <span className="text-zinc-900 dark:text-zinc-100 font-medium"> platforms</span>, and 
                <span className="text-zinc-900 dark:text-zinc-100 font-medium"> distributed systems</span>.
              </p>
            </div>
            <div className="absolute bottom-[-20px] right-[-20px] opacity-5 dark:opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-700">
              <Terminal size={300} strokeWidth={0.5} />
            </div>
          </motion.div>

          {/* Quick Stats / Tech Card - Spans 4 columns */}
          <motion.div
            variants={item}
            className="md:col-span-4 bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 text-zinc-100 rounded-[2.5rem] p-8 flex flex-col justify-center gap-8 relative overflow-hidden"
          >
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-zinc-800 dark:bg-zinc-200">
                  <Box className="w-6 h-6 text-primary-400 dark:text-primary-600" />
                </div>
                <div>
                  <div className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-bold">Containers</div>
                  <div className="text-sm font-mono">k8s.io / docker</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-zinc-800 dark:bg-zinc-200">
                  <Globe className="w-6 h-6 text-primary-400 dark:text-primary-600" />
                </div>
                <div>
                  <div className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-bold">Cloud</div>
                  <div className="text-sm font-mono">aws / gcp / azure</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-zinc-800 dark:bg-zinc-200">
                  <Cpu className="w-6 h-6 text-primary-400 dark:text-primary-600" />
                </div>
                <div>
                  <div className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-bold">Automation</div>
                  <div className="text-sm font-mono">terraform / ansible</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Journey Link - Spans 4 columns */}
          <motion.div
            variants={item}
            className="md:col-span-4 group bg-white/50 dark:bg-zinc-900/40 backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-800/50 rounded-[2.5rem] p-8 flex flex-col justify-between hover:bg-white dark:hover:bg-zinc-900 transition-all duration-300 pointer-cursor"
          >
            <Link to="/journey" className="h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-100 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                  <Globe className="w-6 h-6" />
                </div>
                <ArrowRight className="w-6 h-6 text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 -rotate-45 group-hover:rotate-0 transition-all" />
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Career Journey</h3>
                <p className="text-zinc-500 text-sm mt-2">Scale and evolution.</p>
              </div>
            </Link>
          </motion.div>

          {/* Projects Link - Spans 8 columns */}
          <motion.div
            variants={item}
            className="md:col-span-8 group relative bg-primary-500 rounded-[2.5rem] p-8 sm:p-10 text-white overflow-hidden shadow-2xl shadow-primary-500/20"
          >
            <Link to="/projects" className="relative z-10 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start mb-12 sm:mb-20">
                <div className="p-4 rounded-3xl bg-white/20 backdrop-blur-md">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="text-xs font-bold uppercase tracking-widest opacity-70">Latest Project</div>
                  <div className="text-base font-mono">v1.2.0 deployed</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                  <h3 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Technical Projects</h3>
                  <p className="text-white/80 font-light max-w-md">Solutions for infrastructure automation, distributed databases, and high-availability systems.</p>
                </div>
                <div className="flex items-center gap-3 bg-white text-primary-600 px-6 py-3 rounded-2xl font-bold text-sm hover:scale-105 active:scale-95 transition-all">
                  Browse Grid <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
            <div className="absolute top-[-50px] right-[-50px] w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          </motion.div>
        </motion.div>
      </div>

      {/* Mini About Detail */}
      <section className="mt-32 border-t border-zinc-200/50 dark:border-zinc-800/50 py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-xl sm:text-2xl text-zinc-700 dark:text-zinc-300 leading-relaxed font-light"
          >
            {personalInfo.aboutPreview}
          </motion.p>
        </div>
      </section>
    </div>
  );
}
