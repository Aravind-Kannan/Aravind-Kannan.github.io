import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Terminal from "../components/Terminal";
import { useTerminal } from "../context/TerminalContext";

export default function MainLayout() {
  const location = useLocation();
  const { toggleTerminal } = useTerminal();

  // Global shortcut (Ctrl + ` or Cmd + `) to toggle Terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Support backtick standard shortcuts
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        toggleTerminal();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTerminal]);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary-500/30">
      <Navbar />
      <main className="flex-grow flex flex-col relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-grow flex flex-col w-full h-full"
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
