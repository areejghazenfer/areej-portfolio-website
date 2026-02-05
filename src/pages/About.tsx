import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";

const About = () => {
  return (
    <main className="pt-24 md:pt-32">
      <section className="px-6 md:px-12 pb-20 md:pb-32">
        <SectionHeader title="About" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground">
              Areej Ghazenfer is an interior designer whose work sits at the 
              intersection of craft, material research, and spatial storytelling. 
              Based in the Gulf region, the studio draws from a rich tradition of 
              craftsmanship while embracing contemporary design sensibilities.
            </p>
            <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground">
              Each project begins with a deep understanding of place—its light, 
              its textures, its rhythms. We believe that thoughtful interiors 
              don't impose; they listen. The result is spaces that feel both 
              intentional and effortless, where every material choice serves 
              a larger narrative.
            </p>
            <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground">
              The studio works across residential, hospitality, and cultural 
              projects, with a particular interest in how traditional materials 
              can find new expression in modern contexts.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-display text-lg tracking-wide mb-2">Services</h3>
              <div className="h-px bg-foreground/20 mb-4" />
              <ul className="space-y-2 font-body text-sm text-muted-foreground">
                <li>Residential Interior Design</li>
                <li>Hospitality & Commercial Spaces</li>
                <li>Material & Furniture Sourcing</li>
                <li>Art Curation & Styling</li>
                <li>Design Research & Consultation</li>
              </ul>
            </div>

            <div>
              <h3 className="font-display text-lg tracking-wide mb-2">Education</h3>
              <div className="h-px bg-foreground/20 mb-4" />
              <p className="font-body text-sm text-muted-foreground">
                Bachelor of Interior Design<br />
                Placeholder University, 2020
              </p>
            </div>

            <div>
              <h3 className="font-display text-lg tracking-wide mb-2">Recognition</h3>
              <div className="h-px bg-foreground/20 mb-4" />
              <ul className="space-y-2 font-body text-sm text-muted-foreground">
                <li>Emerging Designer Award, 2024</li>
                <li>Design Week Feature, 2023</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default About;
