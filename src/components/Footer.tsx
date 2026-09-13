import { Mail } from "lucide-react";
import { Github, Linkedin } from "./Icons";
import { personalInfo } from "../data/info";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-auto relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
              {personalInfo.name}
            </span>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 font-light">
              Building robust systems.
            </p>
          </div>

          <div className="flex items-center gap-1">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socials.email}
              className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="text-xs text-zinc-400 dark:text-zinc-500 font-light">
            &copy; {currentYear} {personalInfo.name}
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">
            Available for work
          </p>
        </div>
      </div>
    </footer>
  );
}
