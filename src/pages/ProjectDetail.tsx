import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/data/projects";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <main className="pt-32 px-6 md:px-12 text-center">
        <p className="text-muted-foreground">Project not found.</p>
        <Link to="/work" className="text-primary underline mt-4 inline-block">
          Back to Work
        </Link>
      </main>
    );
  }

  return (
    <main className="pt-24 md:pt-32">
      {/* Header */}
      <section className="px-6 md:px-12 mb-12">
        <Link
          to="/work"
          className="inline-flex items-center gap-2 font-body text-xs tracking-ultra-wide uppercase text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Back to Work
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-4xl md:text-5xl font-light tracking-ultra-wide uppercase">
            {project.title}
          </h1>
          <div className="h-px bg-foreground/20 mt-4 mb-6" />
          <div className="flex flex-wrap gap-8 text-xs font-body tracking-wider uppercase text-muted-foreground">
            <span>{project.location}</span>
            <span>{project.year}</span>
            <span>{project.category}</span>
          </div>
          <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </motion.div>
      </section>

      {/* Scrolling images — Omedezin inspired */}
      <section className="px-6 md:px-12 pb-20 md:pb-32 space-y-6 md:space-y-8">
        {project.images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="w-full"
          >
            <img
              src={img}
              alt={`${project.title} — View ${i + 1}`}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </motion.div>
        ))}
      </section>
    </main>
  );
};

export default ProjectDetail;
