import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import { personalInfo } from "../data/info";

export default function Home() {
  return (
    <div className="flex-grow flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 flex items-center justify-center overflow-hidden">
        {/* Abstract Background pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-medium mb-8">
              <Terminal className="w-4 h-4" />
              <span>Status: Online & Building</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 font-sans">
              Hi, I'm {personalInfo.name}.
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              {personalInfo.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/projects"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-lg overflow-hidden transition-transform hover:scale-[1.02] active:scale-95"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/journey"
                className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              >
                My Journey
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mini About Section */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="prose dark:prose-invert prose-lg text-center mx-auto"
          >
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {personalInfo.aboutPreview}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
