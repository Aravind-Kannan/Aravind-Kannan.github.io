/* Hallmark · genre: modern-minimal · macrostructure: Letter · design-system: design.md · designed-as-app */
import { personalInfo } from "../data/info";
import { PageShell, PageHeader } from "../components/PageShell";

export default function About() {
  return (
    <PageShell>
      <PageHeader eyebrow="about / profile" title="About Me" />

      <div className="space-y-5 mb-16 sm:mb-20">
        {personalInfo.about.map((paragraph) => (
          <p
            key={paragraph.slice(0, 24)}
            className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-light"
          >
            {paragraph}
          </p>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-16">
        <section>
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">
            Principles
          </p>
          <ul className="space-y-3 border-t border-zinc-200 dark:border-zinc-800 pt-6">
            {personalInfo.principles.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400 font-light"
              >
                <span
                  className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0"
                  aria-hidden="true"
                />
                {p}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">
            Toolkit
          </p>
          <ul
            className="flex flex-wrap gap-2 border-t border-zinc-200 dark:border-zinc-800 pt-6"
            aria-label="Skills and technologies"
          >
            {personalInfo.toolkit.map((item) => (
              <li
                key={item}
                className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono tracking-wide text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/80"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageShell>
  );
}
