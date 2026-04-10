import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";

interface TerminalContextType {
  isOpen: boolean;
  isBooting: boolean;
  openTerminal: () => void;
  closeTerminal: () => void;
  toggleTerminal: () => void;
  setIsBooting: (val: boolean) => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export const TerminalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBooting, setIsBooting] = useState(false);

  const openTerminal = useCallback(() => setIsOpen(true), []);
  const closeTerminal = useCallback(() => setIsOpen(false), []);
  const toggleTerminal = useCallback(() => setIsOpen((prev) => !prev), []);

  // Global Keyboard Listener (always active once Provider mounts)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Hardware-level key code detection for 'Backquote' (the key next to '1')
      // This is the most reliable way to catch the shortcut across different layouts
      const isBackquote = e.code === 'Backquote' || e.key === '`' || e.key === '§' || e.key === '±';
      const isModifier = e.ctrlKey || e.metaKey;
      const isAltT = (e.altKey || e.ctrlKey) && (e.key === 't' || e.key === 'T');
      
      if ((isModifier && isBackquote) || isAltT) {
        e.preventDefault();
        e.stopImmediatePropagation();
        toggleTerminal();
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
    <TerminalContext.Provider value={{ isOpen, isBooting, openTerminal, closeTerminal, toggleTerminal, setIsBooting }}>
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
