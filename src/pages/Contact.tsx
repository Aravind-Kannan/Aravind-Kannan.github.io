import { useState, useId } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { Github, Linkedin } from "../components/Icons";
import { personalInfo } from "../data/info";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const formId = useId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setFormData({ name: "", email: "", message: "" });
    }, 500);
  };

  const contactLinks = [
    {
      title: "Email",
      info: personalInfo.socials.email.replace("mailto:", ""),
      icon: <Mail className="w-5 h-5" aria-hidden="true" />,
      link: personalInfo.socials.email,
      external: false,
    },
    {
      title: "GitHub",
      info: "github.com/Aravind-Kannan",
      icon: <Github className="w-5 h-5" aria-hidden="true" />,
      link: personalInfo.socials.github,
      external: true,
    },
    {
      title: "LinkedIn",
      info: "Let's connect",
      icon: <Linkedin className="w-5 h-5" aria-hidden="true" />,
      link: personalInfo.socials.linkedin,
      external: true,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full flex-grow relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4 sm:mb-6">
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-2xl">
            Have a question or want to work together? Whether it's about a potential project, open source collaboration, or just a technical discussion, I'm always open to talking.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 sm:gap-12 lg:gap-20">
          {/* Form Side */}
          <div className="lg:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                role="alert"
                aria-live="polite"
                className="bg-primary-50/50 dark:bg-primary-900/10 backdrop-blur-sm border border-primary-100 dark:border-primary-800/50 rounded-2xl sm:rounded-3xl p-8 sm:p-10 text-center shadow-lg shadow-primary-500/5"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white dark:bg-primary-950/50 rounded-2xl flex items-center justify-center mx-auto mb-5 sm:mb-6 text-primary-500 shadow-sm border border-primary-100 dark:border-primary-800/50">
                  <Send className="w-7 h-7 sm:w-8 sm:h-8 ml-1" aria-hidden="true" />
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-3">Message Sent!</h2>
                <p className="text-zinc-600 dark:text-zinc-400 font-light mb-7 sm:mb-8 max-w-sm mx-auto text-sm sm:text-base">
                  Thanks for reaching out. I'll get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full text-sm font-medium bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                aria-label="Contact form"
                className="space-y-5 sm:space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div className="space-y-1.5 sm:space-y-2">
                    <label htmlFor={`${formId}-name`} className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Name
                    </label>
                    <input
                      type="text"
                      id={`${formId}-name`}
                      name="name"
                      required
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-500/60 focus:border-primary-500/60 transition-all dark:text-white shadow-sm placeholder:text-zinc-400 text-sm sm:text-base"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <label htmlFor={`${formId}-email`} className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Email
                    </label>
                    <input
                      type="email"
                      id={`${formId}-email`}
                      name="email"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-500/60 focus:border-primary-500/60 transition-all dark:text-white shadow-sm placeholder:text-zinc-400 text-sm sm:text-base"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <label htmlFor={`${formId}-message`} className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Message
                  </label>
                  <textarea
                    id={`${formId}-message`}
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-500/60 focus:border-primary-500/60 transition-all resize-none dark:text-white shadow-sm placeholder:text-zinc-400 text-sm sm:text-base"
                    placeholder="How can I help you?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  aria-busy={loading}
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 w-full text-sm font-semibold text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
                >
                  <div className="absolute inset-0 bg-white/20 dark:bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" aria-hidden="true" />
                  <span className="relative">{loading ? "Sending…" : "Send Message"}</span>
                  <Send className="w-4 h-4 relative group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
                </button>
              </form>
            )}
          </div>

          {/* Contact Info Side */}
          <aside className="lg:col-span-2 flex flex-col justify-start space-y-3 sm:space-y-4">
            {contactLinks.map((contact) => (
              <a
                key={contact.title}
                href={contact.link}
                target={contact.external ? "_blank" : undefined}
                rel={contact.external ? "noopener noreferrer" : undefined}
                aria-label={contact.external ? `${contact.title} — opens in new tab` : contact.title}
                className="group flex items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/50 dark:bg-zinc-900/40 backdrop-blur-sm border border-zinc-200/60 dark:border-zinc-800/80 hover:shadow-md dark:hover:shadow-black/20 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-center text-zinc-500 dark:text-zinc-400 group-hover:bg-primary-50 dark:group-hover:bg-primary-500/10 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors shadow-sm flex-shrink-0">
                  {contact.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-semibold tracking-wide uppercase text-zinc-900 dark:text-zinc-100 mb-0.5">{contact.title}</p>
                  <p className="text-zinc-500 dark:text-zinc-400 font-light text-sm truncate">{contact.info}</p>
                </div>
              </a>
            ))}
          </aside>
        </div>
      </motion.div>
    </div>
  );
}
