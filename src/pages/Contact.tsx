import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { Github, Linkedin } from "../components/Icons";
import { personalInfo } from "../data/info";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }, 500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full flex-grow relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-2xl mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 font-sans">
            Get in Touch
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
            Have a question or want to work together? Whether it's about a potential project, open source collaboration, or just a technical discussion, I'm always open to talking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Form Side */}
          <div className="lg:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-primary-50/50 dark:bg-primary-900/10 backdrop-blur-sm border border-primary-100 dark:border-primary-800/50 rounded-3xl p-10 text-center shadow-lg shadow-primary-500/5"
              >
                <div className="w-16 h-16 bg-white dark:bg-primary-950/50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary-500 shadow-sm border border-primary-100 dark:border-primary-800/50">
                  <Send className="w-8 h-8 ml-1" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-3">Message Sent</h3>
                <p className="text-zinc-600 dark:text-zinc-400 font-light mb-8 max-w-sm mx-auto">
                  Thanks for reaching out! I've received your message and will get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full text-sm font-medium bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:shadow-sm transition-all"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all dark:text-white shadow-sm placeholder:text-zinc-400"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all dark:text-white shadow-sm placeholder:text-zinc-400"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all resize-none dark:text-white shadow-sm placeholder:text-zinc-400"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 w-full text-sm font-semibold text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-lg active:scale-95"
                >
                  <div className="absolute inset-0 bg-white/20 dark:bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative">Send Message</span>
                  <Send className="w-4 h-4 relative group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            )}
          </div>

          {/* Contact Info Side */}
          <div className="lg:col-span-2 flex flex-col justify-start space-y-4 pt-2">
            {[
              { title: "Email", info: personalInfo.socials.email.replace('mailto:', ''), icon: <Mail className="w-5 h-5" />, link: personalInfo.socials.email },
              { title: "GitHub", info: "github.com/Aravind-Kannan", icon: <Github className="w-5 h-5" />, link: personalInfo.socials.github },
              { title: "LinkedIn", info: "Let's connect", icon: <Linkedin className="w-5 h-5" />, link: personalInfo.socials.linkedin },
            ].map((contact) => (
              <a
                key={contact.title}
                href={contact.link}
                target={contact.title !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex items-center gap-5 p-5 rounded-3xl bg-white/50 dark:bg-zinc-900/40 backdrop-blur-sm border border-zinc-200/60 dark:border-zinc-800/80 hover:shadow-md dark:hover:shadow-black/20 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-center text-zinc-500 dark:text-zinc-400 group-hover:bg-primary-50 dark:group-hover:bg-primary-500/10 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors shadow-sm">
                  {contact.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-wide uppercase text-zinc-900 dark:text-zinc-100 mb-0.5">{contact.title}</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 font-light truncate max-w-[200px] sm:max-w-xs">{contact.info}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
