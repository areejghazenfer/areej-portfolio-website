import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface ProjectCardProps {
  id: string;
  title: string;
  location: string;
  image: string;
  index: number;
}

const ProjectCard = ({ id, title, image, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link to={`/work/${id}`} className="group block">
        <div className="aspect-[4/3] overflow-hidden mb-4 relative">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <h3 className="font-display text-2xl font-medium tracking-wide text-foreground text-center px-4">
              {title}
            </h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
