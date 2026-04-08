import { motion } from "framer-motion";

const inputClass =
  "w-full bg-transparent border-b border-foreground/20 py-3 font-body text-xs md:text-sm focus:outline-none focus:border-foreground/60 transition-colors placeholder:text-foreground/30";

const labelClass =
  "block font-body text-xs tracking-widest uppercase text-foreground/50 mb-2";

const Contact = () => {
  return (
    <main className="pt-24 md:pt-32 pb-24 md:pb-40">
      {/* Intro */}
      <section className="px-6 md:px-16 lg:px-24 mb-16 md:mb-20 max-w-3xl">
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
          If you have a project in mind, a question about the process, or just want to start a conversation, send a message and I'll get back to you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="flex flex-col gap-2"
        >
          <a
            href="mailto:aghazenfer1@gmail.com"
            className="font-body text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors border-b border-foreground/10 inline-block w-fit pb-0.5"
          >
            aghazenfer1@gmail.com
          </a>
          <a
            href="https://instagram.com/areej.instudio"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors border-b border-foreground/10 inline-block w-fit pb-0.5"
          >
            @areej.instudio
          </a>
        </motion.div>
      </section>

      {/* Form */}
      <section className="px-6 md:px-16 lg:px-24">
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          onSubmit={(e) => e.preventDefault()}
          className="max-w-2xl space-y-10"
        >
          {/* Row: Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <label className={labelClass}>Name</label>
              <input type="text" className={inputClass} placeholder="Your name" required />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input type="email" className={inputClass} placeholder="your@email.com" required />
            </div>
          </div>

          {/* Row: Phone + Service */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
          </div>

          {/* Row: Location + Square Footage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <label className={labelClass}>Property Location</label>
              <input type="text" className={inputClass} placeholder="City, State" required />
            </div>
            <div>
              <label className={labelClass}>Property Square Footage</label>
              <input type="text" className={inputClass} placeholder="e.g. 1,200 sq ft" required />
            </div>
          </div>

          {/* Row: Design Budget + FF&E Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <label className={labelClass}>Estimated Design Budget</label>
              <input type="text" className={inputClass} placeholder="e.g. $10,000" required />
            </div>
            <div>
              <label className={labelClass}>Estimated Furniture & Decor Budget</label>
              <input type="text" className={inputClass} placeholder="e.g. $15,000" required />
            </div>
          </div>

          {/* Rooms */}
          <div>
            <label className={labelClass}>What room(s) are you interested in?</label>
            <input type="text" className={inputClass} placeholder="e.g. Living room, primary bedroom" required />
          </div>

          {/* How did you hear */}
          <div>
            <label className={labelClass}>How did you hear about us?</label>
            <input type="text" className={inputClass} placeholder="Instagram, referral, etc." required />
          </div>

          {/* Message */}
          <div>
            <label className={labelClass}>Anything else you'd like to share</label>
            <textarea
              rows={4}
              className={inputClass + " resize-none"}
              placeholder="Tell me more about your project or vision"
            />
          </div>

          {/* Submit */}
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
