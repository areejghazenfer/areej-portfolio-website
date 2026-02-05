import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface ProjectCardProps {
  id: string;
  title: string;
  location: string;
  image: string;
  index: number;
}

const ProjectCard = ({ id, title, location, image, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link to={`/work/${id}`} className="group block">
        <div className="aspect-[4/5] overflow-hidden mb-4">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="space-y-1">
          <h3 className="font-display text-lg font-light tracking-wide">
            {title}
          </h3>
          <p className="font-body text-xs text-muted-foreground tracking-wider uppercase">
            {location}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
