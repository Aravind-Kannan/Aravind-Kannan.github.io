import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Terminal, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { personalInfo } from "../data/info";
import { useTerminal } from "../context/TerminalContext";

const BOOT_STEPS = [
  { type: "command", text: "docker pull aravind/portfolio-v2:latest", windowTitle: "aravind@portfolio — docker — 80x64" },
  { type: "progress", delay: 100 },
  { type: "response", text: "Status: Downloaded newer image for aravind/portfolio-v2:latest", delay: 1600 },
  { type: "command", text: "kubectl apply -f deployment.yaml", windowTitle: "aravind@portfolio — kubectl — 80x64" },
  { type: "response", text: "deployment.apps/aravind-portfolio created", delay: 400 },
  { type: "command", text: "kubectl logs deployment/aravind-portfolio", windowTitle: "aravind@portfolio — kubectl — 80x64" },
  { type: "response", text: "Starting Aravind-Platform-Engine v2.0.4...", delay: 300 },
  { type: "response", text: ":::'###::::'########:::::'###::::'##::::'##:'####:'##::: ##:'########::\n::'## ##::: ##.... ##:::'## ##::: ##:::: ##:. ##:: ###:: ##: ##.... ##:\n:'##:. ##:: ##:::: ##::'##:. ##:: ##:::: ##:: ##:: ####: ##: ##:::: ##:\n:##:::. ##: ########::'##:::. ##: ##:::: ##:: ##:: ## ## ##: ##:::: ##:\n:#########: ##.. ##::: #########:. ##:: ##::: ##:: ##. ####: ##:::: ##:\n:##.... ##: ##::. ##:: ##.... ##::. ## ##:::: ##:: ##:. ###: ##:::: ##:\n:##:::: ##: ##:::. ##: ##:::: ##:::. ###::::'####: ##::. ##: ########::\n:.:::::..::..:::::..::..:::::..:::::...:::::....::..::::..::........:::\n", delay: 200 },
  { type: "response", text: "[App] Initializing distributed modules... ✓", delay: 400 },
  { type: "response", text: "[App] Listening on port :8443", delay: 300 },
  { type: "command", text: "curl -I https://aravind.sh", windowTitle: "aravind@portfolio — curl — 80x64" },
  { type: "response", text: "HTTP/2 200 OK", delay: 400 },
  { type: "response", text: "cache-control: public, max-age=0, must-revalidate", delay: 100 },
  { type: "response", text: "Deployment verified. Initializing site rendering...", delay: 400 },
];

const PROGRESS_BARS = [
  { label: "ea724a1e: Pull complete", pct: 100, delay: 50, duration: 600 },
  { label: "36a281fb: Pull complete", pct: 100, delay: 150, duration: 1200 },
  { label: "9d1c0b7c: Pull complete", pct: 100, delay: 0, duration: 900 },
  { label: "f2e0a4d5: Pull complete", pct: 100, delay: 300, duration: 500 },
];
;

function ProgressBar({ label, pct, delay, duration = 1000 }: { label: string; pct: number; delay: number; duration?: number }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), delay);
    return () => clearTimeout(t);
  }, [pct, delay]);

  return (
    <div className="mb-2">
      <div className="flex justify-between text-[10px] mb-1 font-mono">
        <span className="text-zinc-500 uppercase tracking-tight">{label}</span>
        <span className="text-primary-400 font-bold">{width > 0 ? (width === 100 ? "Complete" : `${width}%`) : "Waiting..."}</span>
      </div>
      <div className="h-1 bg-zinc-800/50 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: duration / 1000, ease: "easeInOut" }}
          className="h-full bg-primary-500/80 rounded-full"
        />
      </div>
    </div>
  );
}

function TypewriterCommand({ text, onComplete }: { text: string; onComplete: () => void }) {
  const [displayed, setDisplayed] = useState("");
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setTimeout(onComplete, 400); 
      }
    }, 25);
    return () => clearInterval(interval);
  }, [text, onComplete]);

  return (
    <div className="flex items-center gap-2 font-mono text-sm mb-1">
      <ChevronRight className="w-4 h-4 text-primary-500/80 flex-shrink-0" />
      <span className="text-zinc-300">$ {displayed}</span>
      <span className="inline-block w-1.5 h-4 bg-primary-500 animate-blink" />
    </div>
  );
}

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [windowTitle, setWindowTitle] = useState("aravind@portfolio — bash — 80x64");
  const { toggleTerminal } = useTerminal();

  // Sequential step controller
  useEffect(() => {
    if (stepIndex >= BOOT_STEPS.length) {
      const t = setTimeout(() => setBooted(true), 800); // Wait after all steps reach completion
      return () => clearTimeout(t);
    }

    const currentStep = BOOT_STEPS[stepIndex];

    if (currentStep.type === "command") {
      if (currentStep.windowTitle) {
        setWindowTitle(currentStep.windowTitle);
      }
      // Handled by TypewriterCommand's onComplete callback
    } else {
      const waitTime = currentStep.delay || 500;
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, stepIndex]);
        setStepIndex((prev) => prev + 1);
      }, waitTime);
      return () => clearTimeout(t);
    }
  }, [stepIndex]);

  return (
    <div className="flex-grow flex flex-col relative">
      <AnimatePresence mode="wait">
        {!booted ? (
          /* ─────────── BOOT SCREEN ─────────── */
          <motion.div
            key="boot"
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="flex-grow flex items-center justify-center min-h-screen pt-16 sm:pt-20 px-4 sm:px-6"
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
                    {windowTitle}
                  </div>
                  <div className="w-12" />
                </div>

                {/* Terminal body */}
                <div className="p-6 sm:p-8 space-y-2 min-h-[440px] font-mono select-none bg-[radial-gradient(circle_at_50%_0%,#18181b_0%,#09090b_100%)]">
                  {BOOT_STEPS.slice(0, stepIndex + 1).map((step, idx) => {
                    const isVisible = visibleLines.includes(idx);
                    
                    if (step.type === "command") {
                      if (idx === stepIndex && !isVisible && step.text) {
                        return (
                          <TypewriterCommand 
                            key={idx} 
                            text={step.text} 
                            onComplete={() => {
                              setVisibleLines(prev => [...prev, idx]);
                              setStepIndex(prev => prev + 1);
                            }} 
                          />
                        );
                      }
                      return (
                        <div key={idx} className="flex items-center gap-2 text-sm text-zinc-500/80 mb-1">
                          <ChevronRight className="w-4 h-4 text-primary-500/40 flex-shrink-0" />
                          <span>$ {step.text}</span>
                        </div>
                      );
                    }

                    if (step.type === "progress") {
                      if (!isVisible) return null;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="pt-2 pb-2"
                        >
                          {PROGRESS_BARS.map((bar) => (
                            <ProgressBar key={bar.label} {...bar} />
                          ))}
                        </motion.div>
                      );
                    }

                    if (!isVisible || !step.text) return null;
                    const IS_FIGLET = step.text.includes(":::'###");

                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`text-sm tracking-tight font-medium ${
                          IS_FIGLET ? "hidden sm:block whitespace-pre leading-none py-1" : "whitespace-pre-wrap leading-tight py-0.5"
                        } ${
                          step.text.includes("OK") || step.text.includes("verified") 
                            ? "text-primary-400 font-bold" 
                            : "text-zinc-400"
                        }`}
                      >
                        {step.text}
                      </motion.div>
                    );
                  })}
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
                  className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.1] mb-10 sm:mb-12"
                >
                  Hi, I'm <br />
                  <span className="text-primary-500 whitespace-nowrap">{personalInfo.name}.</span>
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
                  className="flex flex-col sm:flex-row flex-wrap gap-4"
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

                  <button
                    onClick={toggleTerminal}
                    className="group inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-mono font-medium text-zinc-500 dark:text-zinc-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                    aria-label="Open diagnostic terminal"
                  >
                    <Terminal className="w-4 h-4 group-hover:animate-pulse" />
                    <span>Launch Console</span>
                    <span className="hidden lg:inline text-[10px] opacity-40 ml-1 border border-current rounded px-1 group-hover:opacity-100 transition-opacity">
                      Ctrl + `
                    </span>
                  </button>
                </motion.div>
              </div>
            </section>


          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
