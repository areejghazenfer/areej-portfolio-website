import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Instagram, Linkedin } from "lucide-react";
import { projects, ProjectImage, ProjectDetail } from "@/data/projects";

const resolveImage = (img: string | ProjectImage) =>
  typeof img === "string" ? { src: img } : img;

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  const currentIndex = projects.findIndex((p) => p.id === id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const mainRef = useRef<HTMLDivElement>(null);
  const leftInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const main = mainRef.current;
    const leftInner = leftInnerRef.current;
    if (!main || !leftInner) return;

    const onScroll = () => {
      const viewH = main.clientHeight;
      const leftContentH = leftInner.scrollHeight;
      const maxOffset = Math.max(0, leftContentH - viewH);
      const offset = Math.min(main.scrollTop, maxOffset);
      leftInner.style.transform = `translateY(-${offset}px)`;
    };

    main.addEventListener("scroll", onScroll);
    return () => main.removeEventListener("scroll", onScroll);
  }, []);

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
      ref={mainRef}
      className="flex flex-col overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      style={{ height: "calc(100vh - 72px)", marginTop: "72px" }}
    >
      <div className="flex flex-1">
      {/* ── Left column: 25% — clips and translates on scroll ── */}
      <div
        className="hidden md:block w-1/4 flex-shrink-0 overflow-hidden"
        style={{ position: "sticky", top: 0, height: "calc(100vh - 72px)" }}
      >
        <div ref={leftInnerRef} style={{ padding: "48px 60px 48px 40px" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
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

            {/* Title */}
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

          </motion.div>
        </div>
      </div>

      {/* ── Right column: 75% — scrolls naturally with main ── */}
      <div className="flex-1 md:w-3/4 flex flex-col gap-4 px-4 pt-[48px] pb-[50px]">
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
      </div>{/* ── end columns row ── */}

      {/* ── Next Project Bar — full width ── */}
      {nextProject && (
        <div
          className="flex items-end justify-between gap-6 w-full flex-shrink-0"
          style={{ paddingTop: "50px", paddingBottom: "50px", borderTop: "1px solid hsl(var(--border) / 0.2)" }}
        >
          {/* Social icons — left side */}
          <div className="flex items-end gap-4" style={{ paddingLeft: "50px" }}>
            <a
              href="https://www.instagram.com/areej.instudio/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/areej-ghazenfer/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin size={16} />
            </a>
          </div>

          <div className="flex items-end gap-6">
            <Link
              to={`/work/${nextProject.id}`}
              className="font-body text-[11px] tracking-ultra-wide uppercase text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
            >
              Next Project: {nextProject.title} →
            </Link>
            <img
              src={nextProject.image}
              alt={nextProject.title}
              className="object-cover flex-shrink-0"
              style={{ width: "220px", height: "150px", marginRight: "50px" }}
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default ProjectDetail;
