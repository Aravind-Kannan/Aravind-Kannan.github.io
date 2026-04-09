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
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full flex-grow">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4 font-sans">
          Get in Touch
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-12 text-lg">
          Have a question or want to work together? Leave a message.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form Side */}
          <div>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600 dark:text-primary-400">
                  <Send className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Message Sent!</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                  Thanks for reaching out. I'll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all dark:text-white"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all dark:text-white"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none dark:text-white"
                    placeholder="What's on your mind?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full relative inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-lg overflow-hidden transition-transform hover:scale-[1.02] active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Info Side */}
          <div className="flex flex-col justify-center space-y-8">
            <a
              href={personalInfo.socials.email}
              className="flex items-start gap-4 p-4 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-1">Email</h3>
                <p className="text-zinc-500 dark:text-zinc-400">{personalInfo.socials.email.replace('mailto:', '')}</p>
              </div>
            </a>
            
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-4 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                <Github className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-1">GitHub</h3>
                <p className="text-zinc-500 dark:text-zinc-400">github.com/Aravind-Kannan</p>
              </div>
            </a>

            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-4 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                <Linkedin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-1">LinkedIn</h3>
                <p className="text-zinc-500 dark:text-zinc-400">Let's connect</p>
              </div>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
