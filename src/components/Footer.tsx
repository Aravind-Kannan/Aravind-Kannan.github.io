import { Mail } from "lucide-react";
import { Github, Linkedin } from "./Icons";
import { personalInfo } from "../data/info";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-mono font-semibold text-lg text-zinc-900 dark:text-zinc-100">
              {personalInfo.name}
            </span>
            <span className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Building robust systems.
            </span>
          </div>

          <div className="flex space-x-6">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={personalInfo.socials.email}
              className="text-zinc-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center md:text-left text-xs text-zinc-500 dark:text-zinc-500">
          &copy; {currentYear} {personalInfo.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
