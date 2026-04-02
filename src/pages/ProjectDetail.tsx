import { useParams, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Instagram, Linkedin, X, ChevronLeft, ChevronRight } from "lucide-react";
import { projects, ProjectImage, ProjectDetail } from "@/data/projects";

const resolveImage = (img: string | ProjectImage) =>
  typeof img === "string" ? { src: img } : img;

const ImageWithOverlay = ({
  src, alt, className, caption, delay, eager, flatIndex, onOpen,
}: {
  src: string; alt: string; className: string; caption?: string;
  delay: number; eager?: boolean; flatIndex: number; onOpen: (i: number) => void;
}) => (
  <motion.div
    className="relative group flex-shrink-0 mx-auto cursor-zoom-in"
    data-flat-index={flatIndex}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    onClick={() => onOpen(flatIndex)}
  >
    <img src={src} alt={alt} className={className} loading={eager ? "eager" : "lazy"} />
    {caption && (
      <div className="absolute inset-0 bg-background/75 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
        <p className="font-display text-base font-semibold tracking-wide text-foreground text-center px-6">
          {caption}
        </p>
      </div>
    )}
  </motion.div>
);

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  const navigate = useNavigate();
  const currentIndex = projects.findIndex((p) => p.id === id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const goTo = (projectId: string) => {
    if (mainRef.current) mainRef.current.scrollTop = 0;
    navigate(`/work/${projectId}`);
  };

  // Flatten all images into a single array for lightbox navigation
  const allImages: string[] = project
    ? project.images.flatMap((img) => {
        const r = resolveImage(img);
        return r.pair ? [r.src, r.pair] : [r.src];
      })
    : [];

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const openedAtIndex = useRef<number | null>(null);
  const savedScrollTop = useRef<number>(0);

  const lightboxPrev = useCallback(() =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + allImages.length) % allImages.length)), [allImages.length]);
  const lightboxNext = useCallback(() =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % allImages.length)), [allImages.length]);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    requestAnimationFrame(() => {
      if (mainRef.current && openedAtIndex.current !== null) {
        const el = mainRef.current.querySelector(`[data-flat-index="${openedAtIndex.current}"]`) as HTMLElement | null;
        if (el) {
          const mainRect = mainRef.current.getBoundingClientRect();
          const elRect = el.getBoundingClientRect();
          const elTopInMain = elRect.top - mainRect.top + mainRef.current.scrollTop;
          const containerH = mainRef.current.clientHeight;
          mainRef.current.scrollTop = elTopInMain - containerH / 2 + elRect.height / 2;
        }
      }
    });
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") lightboxPrev();
      else if (e.key === "ArrowRight") lightboxNext();
      else if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, lightboxPrev, lightboxNext, closeLightbox]);

  const mainRef = useRef<HTMLDivElement>(null);
  const leftInnerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (mainRef.current) mainRef.current.scrollTop = 0;
    if (leftInnerRef.current) leftInnerRef.current.style.transform = "translateY(0px)";
  }, [id]);

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
      key={id}
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
        {(() => {
          let flatIdx = 0;
          return project.images.map((img, i) => {
          const resolved = resolveImage(img);
          const myFlatIdx = flatIdx;
          flatIdx += resolved.pair ? 2 : 1;
          const imgClass = "h-[calc(100vh-168px)] w-auto block mx-auto flex-shrink-0";
          const spreadClass = "h-[calc((100vh-168px)/2)] w-auto block mx-auto flex-shrink-0";
          const tallClass = "w-[calc((100vh-168px)*22/17)] h-auto block mx-auto flex-shrink-0";
          const handleOpen = (flatIndex: number) => {
            openedAtIndex.current = flatIndex;
            savedScrollTop.current = mainRef.current?.scrollTop ?? 0;
            setLightboxIndex(flatIndex);
          };

          return resolved.pair ? (
            <div key={i} className="flex flex-col gap-4 w-full">
              <ImageWithOverlay
                src={resolved.src}
                alt={`${project.title} — View ${i + 1}a`}
                className={(resolved.tallImage ? tallClass : imgClass) + " block"}
                caption={resolved.caption}
                delay={i * 0.05}
                eager={i === 0}
                flatIndex={myFlatIdx}
                onOpen={handleOpen}
              />
              <ImageWithOverlay
                src={resolved.pair}
                alt={`${project.title} — View ${i + 1}b`}
                className={(resolved.tallImage ? tallClass : imgClass) + " block"}
                caption={resolved.captionPair ?? resolved.caption}
                delay={i * 0.05 + 0.05}
                flatIndex={myFlatIdx + 1}
                onOpen={handleOpen}
              />
            </div>
          ) : (
            <ImageWithOverlay
              key={i}
              src={resolved.src}
              alt={`${project.title} — View ${i + 1}`}
              className={(resolved.tallImage ? tallClass : resolved.fullSpread ? spreadClass : imgClass) + " block"}
              caption={resolved.caption}
              delay={i * 0.05}
              eager={i === 0}
              flatIndex={myFlatIdx}
              onOpen={handleOpen}
            />
          );
        });
        })()}
      </div>
      </div>{/* ── end columns row ── */}

      {/* ── Next Project Bar — full width ── */}
      {nextProject && (
        <div
          className="flex items-end justify-between gap-6 w-full flex-shrink-0"
          style={{ paddingTop: "50px", paddingBottom: "50px", borderTop: "1px solid hsl(var(--border) / 0.2)" }}
        >
          {/* Prev project + social icons — left side */}
          <div className="flex items-end gap-6" style={{ paddingLeft: "50px" }}>
            {currentIndex > 0 ? (
              <div className="flex items-end gap-4">
                <img
                  src={projects[currentIndex - 1].image}
                  alt={projects[currentIndex - 1].title}
                  onClick={() => goTo(projects[currentIndex - 1].id)}
                  className="object-cover flex-shrink-0 cursor-pointer"
                  style={{ width: "220px", height: "150px" }}
                />
                <button
                  onClick={() => goTo(projects[currentIndex - 1].id)}
                  className="font-body text-[11px] tracking-ultra-wide uppercase text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
                >
                  ← {projects[currentIndex - 1].title}
                </button>
              </div>
            ) : <div />}
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

          {/* Next project — right side */}
          <div className="flex items-end gap-6">
            <button
              onClick={() => goTo(nextProject.id)}
              className="font-body text-[11px] tracking-ultra-wide uppercase text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
            >
              Next Project: {nextProject.title} →
            </button>
            <img
              src={nextProject.image}
              alt={nextProject.title}
              onClick={() => goTo(nextProject.id)}
              className="object-cover flex-shrink-0 cursor-pointer"
              style={{ width: "220px", height: "150px", marginRight: "50px" }}
            />
          </div>
        </div>
      )}

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.8)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* X button */}
            <button
              className="absolute top-6 right-6 text-white hover:text-white/60 transition-colors z-10"
              onClick={closeLightbox}
            >
              <X size={28} />
            </button>

            {/* Prev arrow */}
            <button
              className="absolute left-6 text-white hover:text-white/60 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
            >
              <ChevronLeft size={40} />
            </button>

            {/* Image + counter */}
            <div className="flex flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={lightboxIndex}
                src={allImages[lightboxIndex]}
                alt="Enlarged view"
                className="max-h-[85vh] max-w-[85vw] object-contain"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              />
              <p className="text-white/60 text-sm font-body tracking-widest">
                {lightboxIndex + 1} / {allImages.length}
              </p>
            </div>

            {/* Next arrow */}
            <button
              className="absolute right-6 text-white hover:text-white/60 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
            >
              <ChevronRight size={40} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default ProjectDetail;
