import { motion } from "framer-motion";
import { Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const Contact = () => {
  return (
    <main className="pt-24 md:pt-32">
      <section className="px-6 md:px-12 pb-20 md:pb-32">
        <SectionHeader title="Contact" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Info column — 2/3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 space-y-8"
          >
            <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground">
              For inquiries about new projects, collaborations, or just to say hello, we would love to hear from you.
            </p>

            <div className="space-y-4">
              <a
                href="mailto:aghazenfer1@gmail.com"
                className="flex items-center gap-3 font-body text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail size={16} />
                aghazenfer1@gmail.com
              </a>
              <a
                href="https://instagram.com/areej.instudio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-body text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram size={16} />
                @areej.instudio
              </a>
              <a
                href="https://www.linkedin.com/in/areej-ghazenfer/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-body text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin size={16} />
                Areej Ghazenfer
              </a>
              <div className="flex items-center gap-3 font-body text-sm text-muted-foreground">
                <MapPin size={16} />
                Based in Washington, DC
              </div>
            </div>
          </motion.div>

          {/* Message form — 1/3 */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label className="font-body text-xs tracking-wider uppercase text-muted-foreground block mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-b border-border py-3 font-body text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="font-body text-xs tracking-wider uppercase text-muted-foreground block mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full bg-transparent border-b border-border py-3 font-body text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="font-body text-xs tracking-wider uppercase text-muted-foreground block mb-2">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full bg-transparent border-b border-border py-3 font-body text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="Tell me about your project"
              />
            </div>
            <button
              type="submit"
              className="font-body text-xs tracking-ultra-wide uppercase border border-foreground/30 px-8 py-3 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </section>
    </main>
  );
};

export default Contact;
