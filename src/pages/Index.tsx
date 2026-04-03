import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "@/assets/project1-images/ADU LIVING ROOM WATERCOLOR.png";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

const Index = () => {
  const featuredProjects = projects.filter((p) => p.category === "interiors").slice(0, 3);

  return (
    <main>
      {/* Hero — Boutlier inspired full-screen */}
      <section className="relative h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Interior design showcase"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/30" />
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 pb-16 md:pb-20">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-mega-wide uppercase text-primary-foreground"
          >
            Areej Ghazenfer
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-4 flex flex-wrap items-center gap-6"
          >
            <p className="font-body text-xs md:text-sm tracking-ultra-wide uppercase text-primary-foreground/80">
              Interior Design Studio
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Work — Agathus-inspired section */}
      <section className="px-6 md:px-12 py-20 md:py-32">
        <SectionHeader title="Our Work" subtitle="Selected projects from the studio" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {featuredProjects.map((project, i) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              location={project.location}
              image={project.image}
              index={i}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Link
            to="/work"
            className="font-body text-xs tracking-ultra-wide uppercase border-b border-foreground/30 pb-1 hover:border-primary hover:text-primary transition-colors duration-300"
          >
            View All Projects
          </Link>
        </motion.div>
      </section>

      {/* About teaser */}
      <section className="px-6 md:px-12 py-20 md:py-32 bg-secondary/40">
        <div className="max-w-2xl">
          <SectionHeader title="Studio" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-body text-base md:text-lg leading-relaxed text-muted-foreground"
          >
            We create spaces that honor the dialogue between material and memory. 
            Rooted in craft and guided by restraint, each project is a study in 
            warmth, texture, and quiet beauty.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8"
          >
            <Link
              to="/about"
              className="font-body text-xs tracking-ultra-wide uppercase border-b border-foreground/30 pb-1 hover:border-primary hover:text-primary transition-colors duration-300"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Index;
