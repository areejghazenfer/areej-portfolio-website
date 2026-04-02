import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Instagram } from "lucide-react";
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

      {/* ── Right column: 75% — scrollable image gallery + footer ── */}
      <div className="flex-1 md:w-3/4 h-full overflow-y-auto">
        {/* Mobile header */}
        <div className="md:hidden px-6 pt-8 pb-6 border-b border-border/30">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 font-body text-xs tracking-ultra-wide uppercase text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft size={13} /> Back to Work
          </Link>
          <p className="font-body text-[10px] tracking-ultra-wide uppercase text-muted-foreground/60 mb-2">
            {project.category}
          </p>
          <h1 className="font-display text-2xl font-light tracking-wide uppercase leading-snug mb-4">
            {project.title}
          </h1>
          <div className="flex gap-6 font-body text-[11px] tracking-wider uppercase text-muted-foreground mb-4">
            <span>{project.location}</span>
            <span>{project.year}</span>
          </div>
          <p className="font-body text-[13px] leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>

        {/* Images — 15px padding on all sides of each image block */}
        <div style={{ paddingTop: "48px", paddingLeft: "15px", paddingRight: "15px", paddingBottom: "15px" }}>
          {project.images.map((img, i) => {
            const resolved = resolveImage(img);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, delay: i * 0.05 }}
                style={{ marginBottom: "15px" }}
              >
                {resolved.pair ? (
                  <div className="grid grid-cols-2 gap-[15px]">
                    <img
                      src={resolved.src}
                      alt={`${project.title} — View ${i + 1}a`}
                      className="w-full h-auto block"
                      loading="lazy"
                    />
                    <img
                      src={resolved.pair}
                      alt={`${project.title} — View ${i + 1}b`}
                      className="w-full h-auto block"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <img
                    src={resolved.src}
                    alt={`${project.title} — View ${i + 1}`}
                    className="w-full h-auto block"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                )}
                {resolved.caption && (
                  <p
                    className="font-body text-[10px] tracking-wider uppercase text-muted-foreground/60"
                    style={{ marginTop: "8px" }}
                  >
                    {resolved.caption}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Footer — only reachable by scrolling through images */}
        <footer className="border-t border-border px-8 md:px-12 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link
              to="/"
              className="font-display text-lg font-light tracking-ultra-wide uppercase"
            >
              Areej Ghazenfer
            </Link>
            <p className="font-body text-xs text-muted-foreground tracking-wide">
              Interior Design Studio
            </p>
            <div className="flex items-center gap-6">
              <a
                href="https://instagram.com/areej.instudio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <span className="font-display text-xs text-muted-foreground">
                © {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default ProjectDetail;
