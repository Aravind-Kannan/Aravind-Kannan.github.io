import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import { personalInfo } from "../data/info";

export default function Home() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <div className="flex-grow flex flex-col relative">
      {/* Abstract Animated Background Glow */}
      <div className="absolute top-0 inset-x-0 h-[500px] overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] rounded-full bg-primary-500/5 dark:bg-primary-500/10 blur-[120px] opacity-70 animate-pulse-slow mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-indigo-500/5 dark:bg-indigo-500/10 blur-[100px] opacity-50 mix-blend-multiply dark:mix-blend-screen" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-32 flex flex-col items-center justify-center min-h-[85vh]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center w-full">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center"
          >
            <motion.div variants={item} className="mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm text-sm font-medium">
                <div className="relative flex h-2 w-2 mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </div>
                <span className="text-zinc-700 dark:text-zinc-300">Status: Online & Building</span>
              </div>
            </motion.div>
            
            <motion.div variants={item} className="overflow-hidden mb-6">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 leading-tight">
                Hi, I'm {personalInfo.name}.
              </h1>
            </motion.div>
            
            <motion.div variants={item}>
              <p className="text-lg sm:text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                {personalInfo.subtitle}
              </p>
            </motion.div>
            
            <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto">
              <Link
                to="/projects"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 w-full sm:w-auto text-sm font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
              >
                <div className="absolute inset-0 bg-white/20 dark:bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative">View Projects</span>
                <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/journey"
                className="inline-flex items-center justify-center px-8 py-3.5 w-full sm:w-auto text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 rounded-xl transition-all duration-300 hover:shadow-sm"
              >
                My Journey
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mini About Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mx-auto mb-8 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm">
              <Terminal className="w-6 h-6 text-primary-500" />
            </div>
            <p className="text-xl sm:text-2xl text-zinc-700 dark:text-zinc-300 leading-relaxed font-light">
              {personalInfo.aboutPreview}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
