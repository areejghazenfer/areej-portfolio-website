import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";

const services = [
  {
    title: "Interior Design",
    description:
      "Full-service interior design from concept through installation. We develop spatial layouts, material palettes, custom millwork, and furniture selections tailored to each client and site.",
  },
  {
    title: "Space Planning",
    description:
      "Thoughtful organisation of space to support how you live and work. We analyse flow, proportion, and function to create environments that feel both purposeful and effortless.",
  },
  {
    title: "Material and Finish Consultation",
    description:
      "Curated selections of finishes, textiles, and materials that reflect the character of the space and the people who inhabit it. We source locally and internationally to find the right fit.",
  },
  {
    title: "Concept and Narrative Development",
    description:
      "Every project begins with a story. We work closely with clients to define a clear design direction grounded in context, culture, and craft before a single line is drawn.",
  },
  {
    title: "FF and E Procurement",
    description:
      "Sourcing, specification, and coordination of all furniture, fixtures, and equipment. We manage vendor relationships and logistics so the process is seamless from selection to delivery.",
  },
  {
    title: "Project Coordination",
    description:
      "We collaborate with architects, contractors, and tradespeople to ensure the design intent is carried through every stage of construction and installation.",
  },
];

const Services = () => {
  return (
    <main className="pt-24 md:pt-32">
      <section className="px-6 md:px-12 pb-20 md:pb-32">
        <SectionHeader title="Services" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="space-y-4 border-t border-border/40 pt-8"
            >
              <h3 className="font-display text-lg tracking-wide uppercase text-foreground">
                {service.title}
              </h3>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Services;
