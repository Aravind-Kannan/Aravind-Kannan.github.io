import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { prefersReducedMotion, shouldPlayBootOnLoad } from "../utils/bootPreference";

interface TerminalContextType {
  isOpen: boolean;
  isBooting: boolean;
  hasBooted: boolean;
  openTerminal: () => void;
  closeTerminal: () => void;
  toggleTerminal: () => void;
  setIsBooting: (val: boolean) => void;
  markBooted: () => void;
  /** Replay deploy/boot sequence (easter egg). */
  requestBootReplay: () => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export const TerminalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBooting, setIsBooting] = useState(false);
  // Default: already "booted" — animation is opt-in easter egg
  const [hasBooted, setHasBooted] = useState(() => !shouldPlayBootOnLoad());

  const openTerminal = useCallback(() => setIsOpen(true), []);
  const closeTerminal = useCallback(() => setIsOpen(false), []);
  const toggleTerminal = useCallback(() => setIsOpen((prev) => !prev), []);
  const markBooted = useCallback(() => {
    setHasBooted(true);
    setIsBooting(false);
  }, []);
  const requestBootReplay = useCallback(() => {
    if (prefersReducedMotion()) return;
    setIsOpen(false);
    setHasBooted(false);
    setIsBooting(true);
  }, []);

  // Global Keyboard Listener (always active once Provider mounts)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isBackquote = e.code === "Backquote" || e.key === "`" || e.key === "§" || e.key === "±";
      const isModifier = e.ctrlKey || e.metaKey;
      const isAltT = (e.altKey || e.ctrlKey) && (e.key === "t" || e.key === "T");

      if ((isModifier && isBackquote) || isAltT) {
        e.preventDefault();
        e.stopImmediatePropagation();
        toggleTerminal();
      }

      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [isOpen, toggleTerminal]);

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
    <TerminalContext.Provider
      value={{
        isOpen,
        isBooting,
        hasBooted,
        openTerminal,
        closeTerminal,
        toggleTerminal,
        setIsBooting,
        markBooted,
        requestBootReplay,
      }}
    >
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
