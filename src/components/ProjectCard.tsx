import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface ProjectCardProps {
  id: string;
  title: string;
  location: string;
  image: string;
  index: number;
  aspectClass?: string;
  fixedHeight?: number;
  cropY?: number;
}

const ProjectCard = ({ id, title, image, index, aspectClass = "aspect-[4/3]", fixedHeight, cropY = 0 }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link to={`/work/${id}`} className="group block">
        <div
          className={`${fixedHeight ? "" : aspectClass} overflow-hidden mb-4 relative`}
          style={fixedHeight ? { height: fixedHeight } : undefined}
        >
          <img
            src={image}
            alt={title}
            className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={cropY ? { height: `calc(100% + ${cropY * 2}px)`, marginTop: `-${cropY}px` } : { height: "100%" }}
            loading="lazy"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <h3 className="font-display text-2xl font-medium tracking-wide text-white text-center px-4">
              {title}
            </h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
