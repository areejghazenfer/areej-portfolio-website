import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const paragraphs = [
  "We believe spaces should guide experience. Not just contain it.",
  "The way a room unfolds as you move through it, the details that register before you consciously notice them. That is what good interior design produces, and it is what we work toward in every project.",
  "Our approach is rooted in iteration. We don't arrive at a concept and execute it unchanged. We test it, question it, and refine it until the decisions hold up. That process extends to how we think about individual pieces within a space. Furniture, built-ins, and custom elements are not finishing touches. They are spatial decisions that determine how a room functions, how it feels to move through, and how closely it reflects the routines and habits of the person living in it.",
  "Good design is not about how a space photographs. It is about how it works on a Tuesday morning, how it absorbs the way you actually live, how it makes the ordinary feel considered. We design for that.",
  "Areej Ghazenfer studied interior design at a fine arts university and currently works in residential design. Outside of client work, she makes things. Woodworking, jewelry, sewing. It keeps her grounded in how materials behave and how things are put together in practice.",
  "We take on independent projects selectively. If yours sounds like a good fit, reach out.",
];

const About = () => {
  return (
    <main className="pt-24 md:pt-32 pb-24 md:pb-40">
      <section className="px-6 md:px-16 lg:px-24 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl md:text-5xl font-light mb-12 tracking-wide"
        >
          About
        </motion.h1>

        <div className="space-y-7">
          {paragraphs.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.07 }}
              className={`font-body text-xs md:text-sm leading-relaxed ${
                i === 0
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {para}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-12"
        >
          <Link
            to="/contact"
            className="inline-block font-body text-xs tracking-widest uppercase border border-foreground/30 px-10 py-3 hover:bg-foreground hover:text-background transition-all duration-300"
          >
            Get in Touch
          </Link>
        </motion.div>
      </section>
    </main>
  );
};

export default About;
