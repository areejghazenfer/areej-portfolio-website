import { useParams, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Instagram, Linkedin, X, ChevronLeft, ChevronRight } from "lucide-react";
import { projects, ProjectImage, ProjectImageGroup, ProjectImageEntry, ProjectDetail, ProjectPhase } from "@/data/projects";

const resolveImage = (img: string | ProjectImage) =>
  typeof img === "string" ? { src: img } : img;

const ImageWithOverlay = ({
  src, alt, className, caption, delay, eager, flatIndex, onOpen, imgRef,
}: {
  src: string; alt: string; className: string; caption?: string;
  delay: number; eager?: boolean; flatIndex: number; onOpen: (i: number) => void;
  imgRef?: React.RefObject<HTMLImageElement>;
}) => (
  <motion.div
    className="relative group flex-shrink-0 mx-auto cursor-zoom-in"
    data-flat-index={flatIndex}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    onClick={() => onOpen(flatIndex)}
  >
    <img ref={imgRef} src={src} alt={alt} className={className} loading={eager ? "eager" : "lazy"} />
    {caption && (
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
        <p className="font-display text-base font-semibold tracking-wide text-white text-center px-6">
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

  const [activePhase, setActivePhase] = useState(0);
  const [refImageWidth, setRefImageWidth] = useState<number | null>(null);
  const refImageRef = useRef<HTMLImageElement>(null);
  const [carouselPage, setCarouselPage] = useState(0);
  const [carouselLightboxIndex, setCarouselLightboxIndex] = useState<number | null>(null);
  const [carouselOffsetTop, setCarouselOffsetTop] = useState(0);
  const carouselRowRef = useRef<HTMLDivElement>(null);
  const [carousel2Page, setCarousel2Page] = useState(0);
  const [carousel2LightboxIndex, setCarousel2LightboxIndex] = useState<number | null>(null);

  // Reset phase + carousel when project changes
  useEffect(() => { setActivePhase(0); setRefImageWidth(null); setCarouselPage(0); setCarouselLightboxIndex(null); setCarouselOffsetTop(0); setCarousel2Page(0); setCarousel2LightboxIndex(null); }, [id]);

  // Measure carousel row's offsetTop relative to its group container
  useLayoutEffect(() => {
    const el = carouselRowRef.current;
    if (!el) return;
    const measure = () => setCarouselOffsetTop(el.offsetTop);
    measure();
    const obs = new ResizeObserver(measure);
    obs.observe(document.body);
    return () => obs.disconnect();
  }, [activePhase, id, refImageWidth]);

  // Measure the first non-group image's rendered width to align concept images
  useEffect(() => {
    const el = refImageRef.current;
    if (!el) return;
    const obs = new ResizeObserver(() => setRefImageWidth(el.offsetWidth));
    obs.observe(el);
    return () => obs.disconnect();
  }, [activePhase, id]);

  const goTo = (projectId: string) => {
    if (mainRef.current) mainRef.current.scrollTop = 0;
    navigate(`/work/${projectId}`);
  };

  // Use active phase images if phases exist, otherwise fall back to project.images
  const displayImages: ProjectImageEntry[] = project
    ? (project.phases ? project.phases[activePhase].images : project.images)
    : [];

  // Flatten display images for lightbox navigation (carousel images are separate)
  const allImages: string[] = displayImages.flatMap((img) => {
    if (typeof img === "object" && "type" in img && img.type === "group") {
      return (img as ProjectImageGroup).items.map((it) => it.src);
    }
    const r = resolveImage(img as string | ProjectImage);
    return r.pair ? [r.src, r.pair] : [r.src];
  });

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
        <div ref={leftInnerRef} style={{ padding: "48px 40px 48px 40px" }}>
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
              <div style={{ marginBottom: "24px" }}>
                {project.description.split("\n\n").map((para, i) => (
                  <p
                    key={i}
                    className="font-body italic text-muted-foreground leading-snug"
                    style={{ fontSize: "13px", marginBottom: "14px" }}
                  >
                    {para}
                  </p>
                ))}
              </div>
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

            {/* Body text */}
            {project.body && (
              <p
                className="font-body text-muted-foreground leading-relaxed"
                style={{ fontSize: "12px", marginTop: "24px" }}
              >
                {project.body}
              </p>
            )}

          </motion.div>
        </div>
      </div>

      {/* ── Right column: 75% — scrolls naturally with main ── */}
      <div className="flex-1 md:w-3/4 flex flex-col gap-4 px-4 pt-[48px] pb-[50px]">

        {/* Phase tabs — only shown if project has phases */}
        {project.phases && (
          <div className="flex gap-8 mb-4">
            {project.phases.map((phase: ProjectPhase, i: number) => (
              <button
                key={phase.label}
                onClick={() => { setActivePhase(i); setCarouselPage(0); if (mainRef.current) mainRef.current.scrollTop = 0; }}
                className={`font-body text-xs tracking-ultra-wide uppercase pb-2 border-b-2 transition-colors duration-300 ${
                  activePhase === i
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {phase.label}
              </button>
            ))}
          </div>
        )}

        {(() => {
          let flatIdx = 0;
          const imgClass = "h-[calc(100vh-168px)] w-auto block mx-auto flex-shrink-0";
          const spreadClass = "h-[calc((100vh-168px)/2)] w-auto block mx-auto flex-shrink-0";
          const tallClass = "w-[calc((100vh-168px)*22/17)] h-auto block mx-auto flex-shrink-0";
          const handleOpen = (flatIndex: number) => {
            openedAtIndex.current = flatIndex;
            savedScrollTop.current = mainRef.current?.scrollTop ?? 0;
            setLightboxIndex(flatIndex);
          };

          return displayImages.map((img, i) => {
            // ── Concept Group ──
            if (typeof img === "object" && "type" in img && img.type === "group") {
              const group = img as ProjectImageGroup;
              const groupStartIdx = flatIdx;
              flatIdx += group.items.length;
              return (
              <div key={`${activePhase}-group-${i}`} className="relative w-full flex flex-col gap-0">
                {/* Second carousel — books images, 4 per page — at top */}
                {group.carousel2 && group.carousel2.length > 0 && (() => {
                  const perPage2 = 4;
                  const totalPages2 = Math.ceil(group.carousel2.length / perPage2);
                  const pageItems2 = group.carousel2.slice(carousel2Page * perPage2, (carousel2Page + 1) * perPage2);
                  const carouselWidth2 = refImageWidth ? `${refImageWidth}px` : "calc((100vh - 168px) * 8.5 / 11)";
                  return (
                    <React.Fragment>
                    <div className="mx-auto mb-8 flex items-center gap-3" style={{ width: carouselWidth2 }}>
                      <button
                        onClick={() => setCarousel2Page(p => Math.max(0, p - 1))}
                        disabled={carousel2Page === 0}
                        className="flex-shrink-0 text-primary disabled:text-primary/20 transition-colors"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <div className="flex flex-1 gap-2">
                        {pageItems2.map((src, k) => {
                          const absoluteIdx = carousel2Page * perPage2 + k;
                          return (
                            <img
                              key={k}
                              src={src}
                              alt=""
                              className="flex-1 min-w-0 h-auto object-cover block cursor-zoom-in"
                              loading="lazy"
                              onClick={() => setCarousel2LightboxIndex(absoluteIdx)}
                            />
                          );
                        })}
                      </div>
                      <button
                        onClick={() => setCarousel2Page(p => Math.min(totalPages2 - 1, p + 1))}
                        disabled={carousel2Page === totalPages2 - 1}
                        className="flex-shrink-0 text-primary disabled:text-primary/20 transition-colors"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                    <p className="mx-auto mb-4 font-body text-[10px] tracking-ultra-wide text-muted-foreground/60 text-center" style={{ width: carouselWidth2 }}>
                      {carousel2Page * perPage2 + 1}–{Math.min((carousel2Page + 1) * perPage2, group.carousel2!.length)} / {group.carousel2!.length}
                    </p>
                    </React.Fragment>
                  );
                })()}

                {group.items.map((item, j) => (
                  <React.Fragment key={j}>
                    {/* Image — same centering & sizing as all other project images */}
                    <div
                      className="relative group cursor-zoom-in mx-auto flex-shrink-0"
                      style={{ outline: "1.5px solid hsl(var(--primary))", width: refImageWidth ? `${refImageWidth}px` : "calc((100vh - 168px) * 8.5 / 11)" }}
                      data-flat-index={groupStartIdx + j}
                      onClick={() => handleOpen(groupStartIdx + j)}
                    >
                      <img src={item.src} alt={item.caption} className="w-full h-auto block" loading="lazy" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
                        <p className="font-display text-sm font-semibold text-white text-center px-4">{item.caption}</p>
                      </div>
                    </div>
                    {j < group.items.length - 1 && (
                      <div className="flex items-center justify-center py-2 text-primary" style={{ fontSize: "20px", lineHeight: 1 }}>↓</div>
                    )}
                  </React.Fragment>
                ))}
                {/* Carousel beneath concept images */}
                {group.carousel && group.carousel.length > 0 && (() => {
                  const perPage = 3;
                  const totalPages = Math.ceil(group.carousel.length / perPage);
                  const pageItems = group.carousel.slice(carouselPage * perPage, (carouselPage + 1) * perPage);
                  const carouselWidth = refImageWidth ? `${refImageWidth}px` : "calc((100vh - 168px) * 8.5 / 11)";
                  return (
                    <React.Fragment>
                    <div ref={carouselRowRef} className="mx-auto mt-8 flex items-center gap-3" style={{ width: carouselWidth }}>
                      <button
                        onClick={() => setCarouselPage(p => Math.max(0, p - 1))}
                        disabled={carouselPage === 0}
                        className="flex-shrink-0 text-primary disabled:text-primary/20 transition-colors"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <div className="flex flex-1 gap-2">
                        {pageItems.map((src, k) => {
                          const absoluteIdx = carouselPage * perPage + k;
                          return (
                            <img
                              key={k}
                              src={src}
                              alt=""
                              className="flex-1 min-w-0 h-auto object-cover block cursor-zoom-in"
                              loading="lazy"
                              onClick={() => setCarouselLightboxIndex(absoluteIdx)}
                            />
                          );
                        })}
                      </div>
                      <button
                        onClick={() => setCarouselPage(p => Math.min(totalPages - 1, p + 1))}
                        disabled={carouselPage === totalPages - 1}
                        className="flex-shrink-0 text-primary disabled:text-primary/20 transition-colors"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                    <p className="mx-auto mt-2 font-body text-[10px] tracking-ultra-wide text-muted-foreground/60 text-center" style={{ width: carouselWidth }}>
                      {carouselPage * perPage + 1}–{Math.min((carouselPage + 1) * perPage, group.carousel!.length)} / {group.carousel!.length}
                    </p>
                    </React.Fragment>
                  );
                })()}

                {/* Divider beneath third image */}
                <div className="mx-auto mt-6 h-px" style={{ width: refImageWidth ? `${refImageWidth}px` : "calc((100vh - 168px) * 8.5 / 11)", background: "hsl(var(--primary) / 0.4)" }} />

                {/* Text — absolutely positioned to the right of the centred images */}
                <div
                  className="absolute flex flex-col"
                  style={{
                    top: 0,
                    left: refImageWidth ? `calc(50% + ${refImageWidth / 2}px + 16px)` : "calc(50% + (100vh - 168px) * 8.5 / 22 + 16px)",
                    width: refImageWidth ? `calc(50% - ${refImageWidth / 2}px - 32px)` : "180px",
                  }}
                >
                  {group.title && <h3 className="font-body text-[10px] tracking-ultra-wide uppercase text-primary mb-5">{group.title}</h3>}
                  <p className="font-body text-[12px] leading-relaxed text-muted-foreground">{group.text}</p>
                </div>
                {group.carouselText && (
                  <div
                    className="absolute"
                    style={{
                      top: carouselOffsetTop,
                      left: refImageWidth ? `calc(50% + ${refImageWidth / 2}px + 16px)` : "calc(50% + (100vh - 168px) * 8.5 / 22 + 16px)",
                      width: refImageWidth ? `calc(50% - ${refImageWidth / 2}px - 32px)` : "180px",
                    }}
                  >
                    <p className="font-body text-[12px] leading-relaxed text-muted-foreground">{group.carouselText}</p>
                  </div>
                )}
              </div>
              );
            }

            // ── Regular image ──
            const resolved = resolveImage(img as string | ProjectImage);
            const myFlatIdx = flatIdx;
            flatIdx += resolved.pair ? 2 : 1;

            // Attach ref to first non-group image for width measurement
            const isFirstRegular = !refImageWidth && i === displayImages.findIndex(im => !(typeof im === "object" && "type" in im && im.type === "group"));

            return resolved.pair ? (
              <div key={`${activePhase}-${i}`} className="flex flex-col gap-4 w-full">
                <ImageWithOverlay
                  src={resolved.src}
                  alt={`${project.title} — View ${i + 1}a`}
                  imgRef={isFirstRegular ? refImageRef : undefined}
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
                key={`${activePhase}-${i}`}
                src={resolved.src}
                alt={`${project.title} — View ${i + 1}`}
                className={(resolved.tallImage ? tallClass : resolved.fullSpread ? spreadClass : imgClass) + " block"}
                caption={resolved.caption}
                delay={i * 0.05}
                eager={i === 0}
                flatIndex={myFlatIdx}
                onOpen={handleOpen}
                imgRef={isFirstRegular ? refImageRef : undefined}
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

      {/* ── Carousel Lightbox ── */}
      <AnimatePresence>
        {carouselLightboxIndex !== null && (() => {
          const carouselImages: string[] = displayImages.flatMap((img) =>
            typeof img === "object" && "type" in img && img.type === "group"
              ? ((img as ProjectImageGroup).carousel ?? [])
              : []
          );
          const total = carouselImages.length;
          const prev = () => setCarouselLightboxIndex(i => i === null ? null : (i - 1 + total) % total);
          const next = () => setCarouselLightboxIndex(i => i === null ? null : (i + 1) % total);
          return (
            <motion.div
              className="fixed inset-0 z-[60] flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.9)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCarouselLightboxIndex(null)}
            >
              <button
                className="absolute top-6 right-6 text-white hover:text-white/60 transition-colors z-10"
                onClick={() => setCarouselLightboxIndex(null)}
              >
                <X size={28} />
              </button>
              <button
                className="absolute left-6 text-white hover:text-white/60 transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); prev(); }}
              >
                <ChevronLeft size={40} />
              </button>
              <div className="flex flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
                <motion.img
                  key={carouselLightboxIndex}
                  src={carouselImages[carouselLightboxIndex]}
                  alt="Enlarged view"
                  className="max-h-[85vh] max-w-[85vw] object-contain"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                />
                <p className="text-white/60 text-sm font-body tracking-widest">
                  {carouselLightboxIndex + 1} / {total}
                </p>
              </div>
              <button
                className="absolute right-6 text-white hover:text-white/60 transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); next(); }}
              >
                <ChevronRight size={40} />
              </button>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* ── Carousel 2 Lightbox ── */}
      <AnimatePresence>
        {carousel2LightboxIndex !== null && (() => {
          const carousel2Images: string[] = displayImages.flatMap((img) =>
            typeof img === "object" && "type" in img && img.type === "group"
              ? ((img as ProjectImageGroup).carousel2 ?? [])
              : []
          );
          const total = carousel2Images.length;
          const prev = () => setCarousel2LightboxIndex(i => i === null ? null : (i - 1 + total) % total);
          const next = () => setCarousel2LightboxIndex(i => i === null ? null : (i + 1) % total);
          return (
            <motion.div
              className="fixed inset-0 z-[60] flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.9)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCarousel2LightboxIndex(null)}
            >
              <button
                className="absolute top-6 right-6 text-white hover:text-white/60 transition-colors z-10"
                onClick={() => setCarousel2LightboxIndex(null)}
              >
                <X size={28} />
              </button>
              <button
                className="absolute left-6 text-white hover:text-white/60 transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); prev(); }}
              >
                <ChevronLeft size={40} />
              </button>
              <div className="flex flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
                <motion.img
                  key={carousel2LightboxIndex}
                  src={carousel2Images[carousel2LightboxIndex]}
                  alt="Enlarged view"
                  className="max-h-[85vh] max-w-[85vw] object-contain"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                />
                <p className="text-white/60 text-sm font-body tracking-widest">
                  {carousel2LightboxIndex + 1} / {total}
                </p>
              </div>
              <button
                className="absolute right-6 text-white hover:text-white/60 transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); next(); }}
              >
                <ChevronRight size={40} />
              </button>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </main>
  );
};

export default ProjectDetail;
