import { Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border px-6 md:px-12 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <Link to="/" className="font-display text-lg font-light tracking-ultra-wide uppercase">
          Areej Ghazenfer
        </Link>
        <p className="font-body text-xs text-muted-foreground tracking-wide">
          Interior Design Studio
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://instagram.com/areej.instudio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={18} />
          </a>
          <span className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
