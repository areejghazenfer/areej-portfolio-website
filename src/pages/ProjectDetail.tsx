import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { projects, ProjectImage } from "@/data/projects";

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

  const resolveImage = (img: string | ProjectImage) =>
    typeof img === "string" ? { src: img } : img;

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

      {/* Images with 20-80 layout: left gutter for captions, right for images */}
      <section className="px-6 md:px-12 pb-20 md:pb-32 space-y-6 md:space-y-8">
        {project.images.map((img, i) => {
          const resolved = resolveImage(img);

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
              className="flex gap-6"
            >
              {/* Left gutter — ~20% */}
              <div className="hidden md:flex w-[18%] flex-shrink-0 items-end pb-4">
                {resolved.caption && (
                  <p className="font-body text-xs text-muted-foreground tracking-wider uppercase">
                    {resolved.caption}
                  </p>
                )}
              </div>

              {/* Right image area — ~80% */}
              <div className="w-full md:w-[82%]">
                {resolved.pair ? (
                  <div className="grid grid-cols-2 gap-3">
                    <img
                      src={resolved.src}
                      alt={`${project.title} — View ${i + 1}a`}
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                    <img
                      src={resolved.pair}
                      alt={`${project.title} — View ${i + 1}b`}
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <img
                    src={resolved.src}
                    alt={`${project.title} — View ${i + 1}`}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </section>
    </main>
  );
};

export default ProjectDetail;
