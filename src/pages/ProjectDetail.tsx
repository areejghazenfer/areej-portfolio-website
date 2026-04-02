import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { projects, ProjectImage, ProjectDetail } from "@/data/projects";

const resolveImage = (img: string | ProjectImage) =>
  typeof img === "string" ? { src: img } : img;

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
      {/* ── Left column: 25% — sticky, non-scrollable ── */}
      <div
        className="hidden md:flex w-1/4 flex-shrink-0 h-full flex-col overflow-y-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{ padding: "48px 60px 48px 40px" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col h-full"
        >
          {/* Back link */}
          <Link
            to="/work"
            className="inline-flex items-center gap-2 font-body text-[11px] tracking-ultra-wide uppercase text-muted-foreground hover:text-primary transition-colors"
            style={{ marginBottom: "52px" }}
          >
            <ArrowLeft size={12} /> Back to Work
          </Link>

          {/* Category label */}
          <p
            className="font-body text-[10px] tracking-ultra-wide uppercase text-muted-foreground/60"
            style={{ marginBottom: "10px" }}
          >
            {project.category}
          </p>

          {/* Title — Neue Haas Grotesk */}
          <h1
            className="font-display font-light uppercase leading-tight"
            style={{ fontSize: "22px", letterSpacing: "0.06em", marginBottom: "28px" }}
          >
            {project.title}
          </h1>

          {/* Subtitle / Description */}
          {project.description && (
            <p
              className="font-body italic text-muted-foreground leading-snug"
              style={{ fontSize: "13px", marginBottom: "24px" }}
            >
              {project.description}
            </p>
          )}

          {/* Divider */}
          <div className="h-px bg-foreground/12" style={{ marginBottom: "24px" }} />

          {/* Project-specific details */}
          {project.details && project.details.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              {project.details.map(({ label, value }: ProjectDetail) => (
                <div
                  key={label}
                  style={{ paddingTop: "10px", paddingBottom: "10px", borderBottom: "1px solid hsl(var(--border) / 0.2)" }}
                >
                  <span className="font-body text-[10px] tracking-ultra-wide uppercase text-muted-foreground/55 block" style={{ marginBottom: "3px" }}>
                    {label}
                  </span>
                  <span className="font-body text-[12px] leading-snug text-foreground/75">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Bottom spacing */}
          <div style={{ paddingBottom: "50px" }} />
        </motion.div>
      </div>

      {/* ── Right column: 75% — horizontal scrolling image gallery ── */}
      <div className="flex-1 md:w-3/4 h-full overflow-y-auto overflow-x-hidden flex flex-col gap-4 px-4 pt-[48px] pb-[48px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {project.images.map((img, i) => {
          const resolved = resolveImage(img);
          const imgClass = "h-[calc(100vh-168px)] w-auto block mx-auto flex-shrink-0";
          const spreadClass = "h-[calc((100vh-168px)/2)] w-auto block mx-auto flex-shrink-0";
          const tallClass = "w-[calc((100vh-168px)*22/17)] h-auto block mx-auto flex-shrink-0";
          return resolved.pair ? (
            <div key={i} className="flex flex-col gap-4 w-full">
              <motion.img
                key={`${i}a`}
                src={resolved.src}
                alt={`${project.title} — View ${i + 1}a`}
                className={resolved.tallImage ? tallClass : imgClass}
                loading={i === 0 ? "eager" : "lazy"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
              />
              <motion.img
                key={`${i}b`}
                src={resolved.pair}
                alt={`${project.title} — View ${i + 1}b`}
                className={resolved.tallImage ? tallClass : imgClass}
                loading="lazy"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.05 + 0.05 }}
              />
            </div>
          ) : (
            <motion.img
              key={i}
              src={resolved.src}
              alt={`${project.title} — View ${i + 1}`}
              className={resolved.tallImage ? tallClass : resolved.fullSpread ? spreadClass : imgClass}
              loading={i === 0 ? "eager" : "lazy"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
            />
          );
        })}
      </div>
    </main>
  );
};

export default ProjectDetail;
