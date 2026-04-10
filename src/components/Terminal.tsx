import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minimize2, Maximize2 } from "lucide-react";
import { useTerminal } from "../context/TerminalContext";
import { executeCommand } from "../utils/terminalEngine";
import type { TerminalState } from "../utils/terminalEngine";
import { personalInfo } from "../data/info";
import { projects } from "../data/projects";
import { journey } from "../data/journey";

export default function Terminal() {
  const { isOpen, closeTerminal } = useTerminal();
  const [isFullScreen, setIsFullScreen] = useState(true);
  const [inputVal, setInputVal] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [cursorPos, setCursorPos] = useState(0);

  const [state, setState] = useState<TerminalState>({
    cwd: "~",
    history: [
      { type: "system", text: `Welcome to AravindOS v1.0.0` },
      { type: "system", text: `Type 'help' to see available commands.` },
    ],
  });

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of terminal output
  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [state.history, isOpen]);

  const updateCursor = () => {
    if (inputRef.current) {
      setCursorPos(inputRef.current.selectionStart || 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const parts = inputVal.trim().split(" ");
      const lastPart = parts[parts.length - 1] || "";
      
      const commands = ["help", "cat", "cd", "ls", "whoami", "projects", "journey", "contact", "clear", "exit"];
      
      // Basic autocomplete for commands if it's the first word
      if (parts.length <= 1) {
        const matches = commands.filter(c => c.startsWith(lastPart.toLowerCase()));
        if (matches.length === 1) {
          setInputVal(matches[0]);
          setCursorPos(matches[0].length);
        }
      } else if (parts.length === 2) {
        // Autocomplete for files/dirs if after cat/cd/ls
        const cmd = parts[0].toLowerCase();
        if (["cat", "cd", "ls"].includes(cmd)) {
          let files: string[] = [];
          if (state.cwd === "~") {
            files = ["projects/", "journey/", "about.txt", "contact.txt", "skills.txt"];
          } else if (state.cwd === "~/projects") {
            files = projects.map(p => `${p.id}.md`);
          } else if (state.cwd === "~/journey") {
            files = journey.map(j => `${j.id}.md`);
          }
          
          const matches = files.filter(f => f.startsWith(lastPart.toLowerCase()));
          if (matches.length === 1) {
            setInputVal(`${parts[0]} ${matches[0]}`);
            setCursorPos(`${parts[0]} ${matches[0]}`.length);
          }
        }
      }
    } else if (e.key === "Enter") {
      const cmd = inputVal;
      if (!cmd.trim()) {
        setState((prev) => ({
          ...prev,
          history: [...prev.history, { type: "input", text: `${prev.cwd} $ ` } as const],
        }));
        return;
      }
      
      const newHistory: TerminalState["history"] = [...state.history, { type: "input", text: `${state.cwd} $ ${cmd}` }];
      const res = executeCommand(cmd, state);
      
      if (res.exit) {
        closeTerminal();
        setInputVal("");
        setCursorPos(0);
        return;
      }

      if (res.clear) {
        setState({ cwd: state.cwd, history: [] });
      } else {
        const nextHistory = [...newHistory];
        if (res.output) {
          nextHistory.push({ type: "output", text: res.output, isHtml: res.isHtml });
        }
        setState({ cwd: res.newCwd || state.cwd, history: nextHistory });
      }
      setInputVal("");
      setHistoryIndex(-1);
      setCursorPos(0);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const inputHistory = state.history.filter(h => h.type === "input");
      if (inputHistory.length > 0) {
        const ni = historyIndex < inputHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(ni);
        const cmdText = inputHistory[inputHistory.length - 1 - ni].text.split("$ ")[1] || "";
        setInputVal(cmdText);
        setCursorPos(cmdText.length);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const ni = historyIndex - 1;
        setHistoryIndex(ni);
        const inputHistory = state.history.filter(h => h.type === "input");
        const cmdText = inputHistory[inputHistory.length - 1 - ni].text.split("$ ")[1] || "";
        setInputVal(cmdText);
        setCursorPos(cmdText.length);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal("");
        setCursorPos(0);
      }
    } else {
      setTimeout(updateCursor, 0);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%", transition: { duration: 0.3, ease: "easeInOut" } }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`fixed z-[100] bg-black/95 backdrop-blur-2xl border-zinc-800 shadow-2xl flex flex-col overflow-hidden font-mono text-xs sm:text-sm ${
            isFullScreen 
              ? "inset-0 border-0" 
              : "top-4 inset-x-3 sm:inset-x-12 md:inset-x-20 bottom-4 rounded-2xl border"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Interactive terminal"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Mac-style Terminal Header */}
          <div className="flex-shrink-0 h-12 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4 select-none">
            <div className="flex items-center gap-2">
              <button 
                onClick={closeTerminal}
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
                aria-label="Close Terminal"
              />
              <button 
                className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"
              />
              <button 
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors flex items-center justify-center p-0.5"
                aria-label="Toggle Fullscreen"
              >
              </button>
            </div>
            <div className="text-zinc-400 text-xs font-semibold tracking-wider">
              aravind — bash — 80x24
            </div>
            <div className="flex items-center gap-4 text-zinc-500">
              <button onClick={() => setIsFullScreen(!isFullScreen)} className="hover:text-zinc-300 transition-colors hidden sm:block">
                {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button onClick={closeTerminal} className="hover:text-zinc-300 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Terminal Output Body */}
          <div className="flex-grow p-4 sm:p-6 overflow-y-auto overflow-x-hidden scrollbar-none custom-scrollbar-dark">
            <div className="max-w-4xl mx-auto space-y-1">
              {state.history.map((line, i) => (
                <div key={i} className="leading-relaxed">
                  {line.type === "input" && (
                    <div className="text-zinc-300">
                      <span className="text-primary-500 font-bold">{personalInfo.name.toLowerCase().split(' ')[0]}@portfolio</span>
                      <span className="text-zinc-500">:</span>
                      <span className="text-blue-400 font-bold">{line.text.split(" $")[0]}</span>
                      <span className="text-zinc-500">$</span>
                      <span className="ml-2 text-zinc-200">{line.text.split("$ ")[1]}</span>
                    </div>
                  )}
                  {line.type === "system" && (
                    <div className="text-zinc-500">{line.text}</div>
                  )}
                  {line.type === "output" && line.isHtml ? (
                    <div className="text-zinc-300 mb-4 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: line.text }} />
                  ) : line.type === "output" ? (
                    <div className="text-zinc-300 mb-4 whitespace-pre-wrap">{line.text}</div>
                  ) : null}
                </div>
              ))}
              
              {/* Active Prompt Line */}
              <div className="flex items-center mt-2 group relative">
                <span className="text-primary-500 font-bold">{personalInfo.name.toLowerCase().split(' ')[0]}@portfolio</span>
                <span className="text-zinc-500">:</span>
                <span className="text-blue-400 font-bold">{state.cwd}</span>
                <span className="text-zinc-500 mr-2">$</span>
                
                {/* Fake visually rendered block cursor */}
                <div className="relative flex-grow flex items-center font-mono overflow-hidden">
                  <span className="text-zinc-200 whitespace-pre pointer-events-none">
                    {inputVal.slice(0, cursorPos)}
                  </span>
                  
                  {/* True terminal block cursor that overlays the character */}
                  <div className="relative inline-flex flex-shrink-0 min-w-[8px]">
                    <div className="absolute inset-0 bg-primary-500 animate-blink shadow-[0_0_8px_rgba(var(--color-primary-500),0.3)]" />
                    <span className="relative z-10 text-black bg-transparent whitespace-pre">
                      {inputVal[cursorPos] || " "}
                    </span>
                  </div>

                  <span className="text-zinc-200 whitespace-pre pointer-events-none">
                    {inputVal.slice(cursorPos + 1)}
                  </span>
                  
                  {/* Real hidden interactive input */}
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => {
                      setInputVal(e.target.value);
                      setTimeout(updateCursor, 0);
                    }}
                    onKeyDown={handleKeyDown}
                    onKeyUp={updateCursor}
                    onSelect={updateCursor}
                    onBlur={() => {
                      // Keep focus if terminal is open
                      if (isOpen) inputRef.current?.focus();
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 text-transparent bg-transparent outline-none border-none ring-0 cursor-text"
                    autoComplete="off"
                    spellCheck="false"
                    autoFocus
                  />
                </div>
              </div>
              <div ref={bottomRef} className="h-4" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
