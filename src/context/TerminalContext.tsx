import { createContext, useContext, useState, useEffect } from "react";
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

  const openTerminal = () => setIsOpen(true);
  const closeTerminal = () => setIsOpen(false);
  const toggleTerminal = () => setIsOpen((prev) => !prev);

  // Prevent background scrolling when terminal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
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
