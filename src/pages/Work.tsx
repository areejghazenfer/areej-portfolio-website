import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

const tabs = [
  { key: "interiors", label: "Interiors" },
  { key: "craft", label: "Craft" },
  { key: "research", label: "Research" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

const Work = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("interiors");

  const filtered = projects.filter((p) => p.category === activeTab);

  return (
    <main className="pt-24 md:pt-32">
      <section className="px-6 md:px-12 pb-20 md:pb-32">
        <SectionHeader title="Work" />

        {/* Tabs */}
        <div className="flex gap-8 mb-12 md:mb-16">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`font-body text-xs tracking-ultra-wide uppercase pb-2 border-b-2 transition-colors duration-300 ${
                activeTab === tab.key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Project Grid — 3 columns with generous gaps (Ro Rockett inspired) */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16"
        >
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              location={project.location}
              image={project.image}
              index={i}
            />
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground font-body text-sm mt-20">
            Projects coming soon.
          </p>
        )}
      </section>
    </main>
  );
};

export default Work;
