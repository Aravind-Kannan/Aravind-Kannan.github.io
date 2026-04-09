import { Mail } from "lucide-react";
import { Github, Linkedin } from "./Icons";
import { personalInfo } from "../data/info";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md mt-auto relative z-10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Brand/Logo Area */}
          <div className="flex flex-col items-center md:items-start group cursor-default">
            <span className="font-mono font-bold text-xl text-zinc-900 dark:text-zinc-100 tracking-tight relative">
              {personalInfo.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
            </span>
            <span className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 font-medium">
              Building robust systems.
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6 sm:gap-8">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:-translate-y-1 transition-all duration-300 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:-translate-y-1 transition-all duration-300 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href={personalInfo.socials.email}
              className="p-2.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:-translate-y-1 transition-all duration-300 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-zinc-200/50 dark:border-zinc-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
            &copy; {currentYear} {personalInfo.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500">
            <span>Designed with</span>
            <span className="text-red-500 animate-pulse">♥</span>
            <span>in React</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
