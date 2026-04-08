import { useRef } from "react";
import { motion } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Design Consultation",
    body: [
      "The fastest way to get unstuck. If you have a space that isn't working and you're not sure why, or you know what you want but can't figure out how to get there, this is where we start.",
      "In one to two hours, we work through your specific problem together. Layout options, material direction, furniture arrangement, spatial flow. You leave with a clear point of view and a written summary of every recommendation so nothing gets lost.",
      "No commitment beyond the session. Just focused, useful work on your space.",
    ],
    meta: {
      label: "Format",
      value: "in-person or virtual · 1–2 hours · written follow-up included",
    },
  },
  {
    number: "02",
    title: "Full Design",
    body: [
      "For homeowners who are ready to do this properly. We work through the entire design process together, from the first conversation about how you live in your space to a complete set of documents ready for execution.",
      "That includes spatial layout, concept development, material and finish selections, furniture sourcing, and detailed drawings for all non-structural interior work. Everything your contractor needs to build the design correctly, organized and clearly communicated.",
      "The result is a home that was thought through, not assembled piece by piece and hoped for the best.",
    ],
    meta: {
      label: "Process",
      value:
        "discovery call → concept development → design development → FF&E + finish selections → documentation",
    },
  },
];

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main className="pt-24 md:pt-32 pb-24 md:pb-40">
      {/* Intro */}
      <section className="px-6 md:px-16 lg:px-24 mb-20 md:mb-28 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl md:text-5xl font-light mb-10 tracking-wide"
        >
          Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-body text-sm md:text-base leading-relaxed text-muted-foreground"
        >
          Every project starts with a question about how a space should work and
          what it should feel like to be inside it. The work is figuring out how
          to answer that question precisely, then building toward it.
        </motion.p>
      </section>

      {/* Timeline */}
      <section
        ref={containerRef}
        className="px-6 md:px-16 lg:px-24 relative"
      >
        {/* Vertical line */}
        <div className="absolute left-6 md:left-16 lg:left-24 top-0 bottom-0 w-px bg-foreground/15" />

        <div className="space-y-0">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="relative pl-10 md:pl-16 pb-20 md:pb-28"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-1.5 w-[9px] h-[9px] rounded-full bg-foreground/60 -translate-x-[4px]" />

              {/* Number */}
              <span className="block font-body text-xs tracking-widest text-muted-foreground mb-5 uppercase">
                {service.number}
              </span>

              {/* Heading */}
              <h2 className="font-display text-3xl md:text-4xl font-light mb-8 tracking-wide">
                {service.title}
              </h2>

              {/* Body */}
              <div className="max-w-2xl space-y-5 mb-10">
                {service.body.map((para, j) => (
                  <p
                    key={j}
                    className="font-body text-sm md:text-base leading-relaxed text-muted-foreground"
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Meta line */}
              <div className="border-t border-foreground/10 pt-5 max-w-2xl">
                <p className="font-body text-xs tracking-widest text-foreground/50 uppercase">
                  <span className="text-foreground/70 mr-2">
                    {service.meta.label}:
                  </span>
                  {service.meta.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative pl-10 md:pl-16 pt-4 border-t border-foreground/10 max-w-2xl"
        >
          {/* Final dot */}
          <div className="absolute left-0 top-4 w-[9px] h-[9px] rounded-full bg-foreground/30 -translate-x-[4px]" />
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            All services are inquiry-based. Reach out to start a conversation.
          </p>
        </motion.div>
      </section>
    </main>
  );
};

export default Services;
