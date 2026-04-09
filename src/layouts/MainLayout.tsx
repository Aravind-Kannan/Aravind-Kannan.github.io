import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Terminal from "../components/Terminal";
import CustomCursor from "../components/CustomCursor";
import { useTerminal } from "../context/TerminalContext";

export default function MainLayout() {
  const location = useLocation();
  const { toggleTerminal } = useTerminal();

  // Global shortcut (Ctrl + ` or Cmd + `) to toggle Terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        toggleTerminal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTerminal]);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary-500/30 overflow-x-hidden">
      {/* Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-xl focus:font-medium focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Ambient dot-grid overlay (css-only, no JS) */}
      <div className="dot-grid" aria-hidden="true" />

      {/* Ambient gradient orbs that drift slowly */}
      <div className="ambient-orbs" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* Custom cursor — hidden on touch devices via CSS */}
      <CustomCursor />

      <Navbar />

      <main id="main-content" className="flex-grow flex flex-col relative z-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, filter: "blur(4px)", y: 12 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(4px)", y: -8, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex-grow flex flex-col w-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <Terminal />
    </div>
  );
}
