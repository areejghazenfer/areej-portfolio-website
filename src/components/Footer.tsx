import { Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#6C2915" }} className="px-6 md:px-12 py-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <Link
          to="/contact"
          className="font-body text-xs tracking-widest uppercase text-white/80 hover:text-white transition-colors"
        >
          Contact
        </Link>

        <div className="flex items-center gap-5">
          <a
            href="https://instagram.com/areej.instudio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={17} />
          </a>
          <a
            href="https://www.linkedin.com/in/areej-ghazenfer/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={17} />
          </a>
          <span className="font-body text-xs text-white/50">
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
