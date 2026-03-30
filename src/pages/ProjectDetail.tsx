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
    <main
      className="flex overflow-hidden"
      style={{ height: "calc(100vh - 72px)", marginTop: "72px" }}
    >
      {/* ── Left column: 25% — fixed, non-scrollable ── */}
      <div className="hidden md:flex w-1/4 flex-shrink-0 h-full flex-col px-10 py-12 border-r border-border/30 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col h-full"
        >
          {/* Back link */}
          <Link
            to="/work"
            className="inline-flex items-center gap-2 font-body text-xs tracking-ultra-wide uppercase text-muted-foreground hover:text-primary transition-colors mb-12"
          >
            <ArrowLeft size={13} /> Back to Work
          </Link>

          {/* Category label */}
          <p className="font-body text-xs tracking-ultra-wide uppercase text-muted-foreground/70 mb-3">
            {project.category}
          </p>

          {/* Title */}
          <h1 className="font-display text-2xl lg:text-3xl font-light tracking-wide uppercase leading-snug mb-8">
            {project.title}
          </h1>

          {/* Divider */}
          <div className="h-px bg-foreground/15 mb-6" />

          {/* Metadata rows */}
          <div className="space-y-3 mb-8">
            <div className="flex justify-between items-baseline">
              <span className="font-body text-xs tracking-ultra-wide uppercase text-muted-foreground/60">
                Location
              </span>
              <span className="font-body text-xs tracking-wide uppercase text-foreground/80">
                {project.location}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="font-body text-xs tracking-ultra-wide uppercase text-muted-foreground/60">
                Year
              </span>
              <span className="font-body text-xs tracking-wide uppercase text-foreground/80">
                {project.year}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="font-body text-xs tracking-ultra-wide uppercase text-muted-foreground/60">
                Type
              </span>
              <span className="font-body text-xs tracking-wide uppercase text-foreground/80">
                Residential
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-foreground/15 mb-8" />

          {/* Description */}
          <p className="font-body text-sm leading-relaxed text-muted-foreground mb-6">
            {project.description}
          </p>

          {/* Filler paragraphs */}
          <p className="font-body text-sm leading-relaxed text-muted-foreground/70 mb-6">
            The design draws from the regional vernacular, reinterpreting
            traditional forms through a contemporary lens. Each material was
            selected for its tactile quality and its resonance with the
            surrounding landscape.
          </p>

          <p className="font-body text-sm leading-relaxed text-muted-foreground/60">
            Natural light moves through the rooms in a deliberate choreography,
            dissolving the boundary between interior and exterior as the day
            progresses.
          </p>

          {/* Scroll hint pinned to bottom */}
          <div className="mt-auto pt-8">
            <p className="font-body text-xs tracking-ultra-wide uppercase text-muted-foreground/40">
              Scroll to explore ↓
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Right column: 75% — scrollable image gallery ── */}
      <div className="flex-1 md:w-3/4 h-full overflow-y-auto">
        {/* Mobile header (shown below md) */}
        <div className="md:hidden px-6 pt-8 pb-6">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 font-body text-xs tracking-ultra-wide uppercase text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft size={13} /> Back to Work
          </Link>
          <p className="font-body text-xs tracking-ultra-wide uppercase text-muted-foreground/70 mb-2">
            {project.category}
          </p>
          <h1 className="font-display text-3xl font-light tracking-wide uppercase leading-snug mb-4">
            {project.title}
          </h1>
          <div className="flex gap-6 text-xs font-body tracking-wider uppercase text-muted-foreground mb-4">
            <span>{project.location}</span>
            <span>{project.year}</span>
          </div>
          <p className="font-body text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>

        {/* Images */}
        {project.images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: i * 0.05 }}
          >
            <img
              src={img}
              alt={`${project.title} — View ${i + 1}`}
              className="w-full h-auto block"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </motion.div>
        ))}
      </div>
    </main>
  );
};

export default ProjectDetail;
