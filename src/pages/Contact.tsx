/* Hallmark · genre: modern-minimal · macrostructure: Letter · design-system: design.md · designed-as-app */
import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { personalInfo } from "../data/info";
import { PageShell, PageHeader } from "../components/PageShell";

const email = personalInfo.socials.email.replace("mailto:", "");

const channels = [
  {
    label: "GitHub",
    href: personalInfo.socials.github,
    detail: "code & experiments",
    external: true,
  },
  {
    label: "LinkedIn",
    href: personalInfo.socials.linkedin,
    detail: "work history",
    external: true,
  },
  {
    label: "Resume",
    href: personalInfo.resume,
    detail: "PDF — view or save",
    external: true,
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — mailto still works */
    }
  };

  return (
    <PageShell>
      <PageHeader eyebrow="contact / open channel" title="Hello —" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-7 max-w-[36rem]">
          <div className="space-y-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
            <p>
              If you want to talk platforms, distributed systems, open source, or
              a role that needs someone who enjoys the messy middle between code
              and operations — write me.
            </p>
            <p>
              Email is the surest path. I read it. GitHub and LinkedIn are open
              if you prefer those doors.
            </p>
          </div>

          <div
            className="my-10 sm:my-12 flex items-center gap-3 text-zinc-300 dark:text-zinc-700"
            aria-hidden="true"
          >
            <span className="h-px flex-1 bg-current" />
            <span className="font-mono text-[10px] tracking-[0.3em]">***</span>
            <span className="h-px flex-1 bg-current" />
          </div>

          <p className="text-sm text-zinc-500 dark:text-zinc-500 font-light mb-1">
            — {personalInfo.name}
          </p>
          <p className="text-sm text-zinc-400 dark:text-zinc-600 font-light">
            {personalInfo.title}
          </p>
        </div>

        <aside className="lg:col-span-5">
          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 space-y-10">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">
                Preferred
              </p>
              <a
                href={personalInfo.socials.email}
                className="group block focus-visible:outline-none"
              >
                <span className="block font-mono text-base sm:text-lg text-zinc-900 dark:text-zinc-100 break-all group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                  {email}
                </span>
                <span className="mt-2 inline-flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                  Open mail client
                  <ArrowUpRight
                    className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>
              </a>

              <button
                type="button"
                onClick={copyEmail}
                aria-live="polite"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-primary-500" aria-hidden="true" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    Copy email
                  </>
                )}
              </button>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">
                Elsewhere
              </p>
              <ul className="divide-y divide-zinc-200 dark:divide-zinc-800 border-y border-zinc-200 dark:border-zinc-800">
                {channels.map((channel) => (
                  <li key={channel.label}>
                    <a
                      href={channel.href}
                      {...(channel.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      aria-label={`${channel.label} — opens in new tab`}
                      className="group flex items-baseline justify-between gap-4 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset rounded-sm"
                    >
                      <span>
                        <span className="block text-sm font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {channel.label}
                        </span>
                        <span className="block text-xs font-light text-zinc-500 dark:text-zinc-500 mt-0.5">
                          {channel.detail}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="w-4 h-4 text-zinc-300 dark:text-zinc-600 group-hover:text-primary-500 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0 mt-1"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
