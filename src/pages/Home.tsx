import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Terminal, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { personalInfo } from "../data/info";

const BOOT_LINES = [
  { text: `Initializing AravindOS v2.0...`, delay: 0 },
  { text: `Loading infrastructure knowledge... ✓`, delay: 600 },
  { text: `Mounting experience volumes... ✓`, delay: 1200 },
  { text: `Spinning up distributed skills... ✓`, delay: 1800 },
  { text: `Configuring platform stack... ✓`, delay: 2400 },
  { text: `All systems nominal. Ready.`, delay: 3000 },
];

const PROGRESS_BARS = [
  { label: "Infrastructure Knowledge", pct: 92, delay: 600 },
  { label: "Cloud Platforms", pct: 87, delay: 1000 },
  { label: "Automation & CI/CD", pct: 95, delay: 1400 },
];

function ProgressBar({ label, pct, delay }: { label: string; pct: number; delay: number }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), delay);
    return () => clearTimeout(t);
  }, [pct, delay]);

  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1 font-mono">
        <span className="text-zinc-400">{label}</span>
        <span className="text-primary-400">{width > 0 ? `${pct}%` : "..."}</span>
      </div>
      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

function BootLine({ text, delay }: { text: string; delay: number }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-start gap-2 font-mono text-sm"
    >
      <ChevronRight className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
      <span className={text.includes("Ready") ? "text-primary-400 font-bold" : "text-zinc-400"}>
        {text}
      </span>
    </motion.div>
  );
}

export default function Home() {
  const [booted, setBooted] = useState(false);

  // Transition out of boot screen after all lines have loaded
  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 3800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex-grow flex flex-col relative">
      <AnimatePresence mode="wait">
        {!booted ? (
          /* ─────────── BOOT SCREEN ─────────── */
          <motion.div
            key="boot"
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex-grow flex items-center justify-center min-h-[90vh] px-4"
          >
            <div className="w-full max-w-2xl">
              {/* Terminal window chrome */}
              <div className="bg-zinc-950 rounded-2xl border border-zinc-800 shadow-2xl shadow-black/50 overflow-hidden">
                {/* Title bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  </div>
                  <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono tracking-wide">
                    <Terminal className="w-3.5 h-3.5" />
                    AravindOS — bash — 80x24
                  </div>
                  <div className="w-12" />
                </div>

                {/* Terminal body */}
                <div className="p-6 sm:p-8 space-y-2 min-h-[320px]">
                  {BOOT_LINES.map((line) => (
                    <BootLine key={line.text} text={line.text} delay={line.delay} />
                  ))}

                  {/* Progress bars appear after initial boot lines */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="pt-4 pb-2"
                  >
                    {PROGRESS_BARS.map((bar) => (
                      <ProgressBar key={bar.label} {...bar} />
                    ))}
                  </motion.div>

                  {/* Blinking cursor at end */}
                  <div className="flex items-center gap-2 font-mono text-sm pt-1">
                    <ChevronRight className="w-4 h-4 text-primary-500" />
                    <span className="text-zinc-300">cd ~/portfolio</span>
                    <span className="inline-block w-2 h-4 bg-primary-500 animate-blink ml-1" />
                  </div>
                </div>
              </div>

              <p className="text-center text-xs text-zinc-600 mt-4 font-mono tracking-widest uppercase">
                Loading portfolio experience...
              </p>
            </div>
          </motion.div>
        ) : (
          /* ─────────── MAIN HERO (reveals after boot) ─────────── */
          <motion.div
            key="hero"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-grow flex flex-col"
          >
            {/* Glow background */}
            <div className="absolute top-0 inset-x-0 h-[600px] pointer-events-none -z-10">
              <div className="absolute top-[-5%] left-[15%] w-[700px] h-[700px] rounded-full bg-primary-500/5 dark:bg-primary-500/10 blur-[120px]" />
            </div>

            {/* Hero section */}
            <section className="flex-grow flex flex-col justify-center min-h-[85vh] px-4 sm:px-8">
              <div className="max-w-4xl mx-auto w-full">
                {/* Breadcrumb shell prompt */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2 font-mono text-sm text-zinc-500 mb-10"
                >
                  <span className="text-primary-500 font-bold">aravind@portfolio</span>
                  <span className="text-zinc-600">:</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-zinc-600">$</span>
                  <span className="ml-1 text-zinc-400">./introduce.sh</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 leading-[0.9] mb-8"
                >
                  Hi, I'm <br />
                  <span className="text-primary-500">{personalInfo.name}.</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                  className="text-xl sm:text-2xl text-zinc-500 dark:text-zinc-400 font-light leading-relaxed max-w-2xl mb-12"
                >
                  Building <span className="text-zinc-900 dark:text-zinc-100 font-medium">robust infrastructure</span>,{" "}
                  <span className="text-zinc-900 dark:text-zinc-100 font-medium">platforms</span>, and{" "}
                  <span className="text-zinc-900 dark:text-zinc-100 font-medium">distributed systems</span>.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link
                    to="/projects"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-white bg-primary-600 hover:bg-primary-500 rounded-2xl shadow-lg shadow-primary-500/20 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    Explore My Work
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/journey"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all shadow-sm"
                  >
                    My Journey
                  </Link>
                </motion.div>
              </div>
            </section>

            {/* About strip */}
            <section className="border-t border-zinc-200/50 dark:border-zinc-800/50 py-16 px-4">
              <div className="max-w-3xl mx-auto text-center">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="text-xl sm:text-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-light"
                >
                  {personalInfo.aboutPreview}
                </motion.p>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
