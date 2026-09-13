/* Hallmark · genre: modern-minimal · macrostructure: Letter · design-system: design.md · designed-as-app */
import { ExternalLink } from "lucide-react";
import { Github } from "../components/Icons";
import { projects } from "../data/projects";
import { PageShell, PageHeader } from "../components/PageShell";

export default function Projects() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="projects / independent builds"
        title="Projects"
        lede="Independent builds that complement day-job work — AI systems, distributed architectures, and research — beyond the Kubernetes and platform stack."
      />

      <ul
        aria-label="Projects list"
        className="divide-y divide-zinc-200 dark:divide-zinc-800 border-y border-zinc-200 dark:border-zinc-800"
      >
        {projects.map((project) => (
          <li key={project.id} className="py-8 sm:py-10 first:pt-8">
            <article className="group">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 mb-3">
                <h2 className="text-base sm:text-lg font-medium tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors min-w-0 break-words [overflow-wrap:anywhere]">
                  {project.title}
                </h2>
                <div className="flex items-center gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} on GitHub`}
                      className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-sm"
                    >
                      <Github className="w-4 h-4" aria-hidden="true" />
                      <span className="font-mono text-xs">code</span>
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live demo`}
                      className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-sm"
                    >
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      <span className="font-mono text-xs">demo</span>
                    </a>
                  )}
                </div>
              </div>

              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed font-light max-w-2xl mb-4">
                {project.description}
              </p>

              <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono tracking-wide text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/80"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
