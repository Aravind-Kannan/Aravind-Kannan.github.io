import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";

interface TerminalContextType {
  isOpen: boolean;
  openTerminal: () => void;
  closeTerminal: () => void;
  toggleTerminal: () => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export const TerminalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openTerminal = useCallback(() => setIsOpen(true), []);
  const closeTerminal = useCallback(() => setIsOpen(false), []);
  const toggleTerminal = useCallback(() => setIsOpen((prev) => !prev), []);

  // Global Keyboard Listener (always active once Provider mounts)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle on Ctrl+Backtick, Cmd+Backtick, or Alt+Backtick
      // Supports standard backtick (`) and variants (§ / ± / Backquote code)
      const isConsoleKey = e.key === '`' || e.key === '§' || e.key === '±' || e.code === 'Backquote';
      
      if ((e.ctrlKey || e.metaKey || e.altKey) && isConsoleKey) {
        e.preventDefault();
        e.stopImmediatePropagation(); // Ensure no other listener catches this
        setIsOpen((prev) => !prev);
      }
      
      // Also allow Escape to close the terminal if it's open
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown, true); // Capture phase to be sure
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [isOpen]);

  // Prevent background scrolling when terminal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  return (
    <TerminalContext.Provider value={{ isOpen, openTerminal, closeTerminal, toggleTerminal }}>
      {children}
    </TerminalContext.Provider>
  );
};

export const useTerminal = () => {
  const context = useContext(TerminalContext);
  if (context === undefined) {
    throw new Error("useTerminal must be used within a TerminalProvider");
  }
  return context;
};
