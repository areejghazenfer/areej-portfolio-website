import { motion } from "framer-motion";

const inputClass =
  "w-full bg-transparent border-b border-foreground/20 py-3 font-body text-xs md:text-sm focus:outline-none focus:border-foreground/60 transition-colors placeholder:text-foreground/30";

const labelClass =
  "block font-body text-xs tracking-widest uppercase text-foreground/50 mb-2";

const Contact = () => {
  return (
    <main className="pt-24 md:pt-32 pb-24 md:pb-40">
      {/* Intro */}
      <section className="px-6 md:px-16 lg:px-24 mb-16 md:mb-20 max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl md:text-5xl font-light mb-10 tracking-wide"
        >
          Contact
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-body text-xs md:text-sm leading-relaxed text-muted-foreground mb-8"
        >
          If you have a project in mind, a question about the process, or just want to start a conversation, send a message and we'll get back to you soon!
        </motion.p>

      </section>

      {/* Form */}
      <section className="px-6 md:px-16 lg:px-24 flex justify-center">
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-xl space-y-10"
        >
          <div>
            <label className={labelClass}>Name</label>
            <input type="text" className={inputClass} placeholder="Your name" required />
          </div>

          <div>
            <label className={labelClass}>Email</label>
            <input type="email" className={inputClass} placeholder="your@email.com" required />
          </div>

          <div>
            <label className={labelClass}>Phone Number</label>
            <input type="tel" className={inputClass} placeholder="(000) 000-0000" required />
          </div>

          <div>
            <label className={labelClass}>Service of Interest</label>
            <select className={inputClass + " cursor-pointer"} required defaultValue="">
              <option value="" disabled>Select a service</option>
              <option value="consultation">Design Consultation</option>
              <option value="full-design">Full Design</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Property Location</label>
            <input type="text" className={inputClass} placeholder="City, State" required />
          </div>

          <div>
            <label className={labelClass}>Property Square Footage</label>
            <input type="text" className={inputClass} placeholder="e.g. 1,200 sq ft" required />
          </div>

          <div>
            <label className={labelClass}>Estimated Furniture & Decor Budget</label>
            <input type="text" className={inputClass} placeholder="e.g. $15,000" required />
          </div>

          <div>
            <label className={labelClass}>What room(s) are you interested in?</label>
            <input type="text" className={inputClass} placeholder="e.g. Living room, primary bedroom" required />
          </div>

          <div>
            <label className={labelClass}>How did you hear about us?</label>
            <input type="text" className={inputClass} placeholder="Instagram, referral, etc." required />
          </div>

          <div>
            <label className={labelClass}>Anything else you'd like to share</label>
            <textarea
              rows={4}
              className={inputClass + " resize-none"}
              placeholder="Tell me more about your project or vision"
              required
            />
          </div>

          <button
            type="submit"
            className="font-body text-xs tracking-widest uppercase border border-foreground/30 px-10 py-3 hover:bg-foreground hover:text-background transition-all duration-300"
          >
            Send
          </button>
        </motion.form>
      </section>
    </main>
  );
};

export default Contact;
