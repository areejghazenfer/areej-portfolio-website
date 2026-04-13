import { Link, useLocation } from "react-router-dom";
import { Instagram, Linkedin, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Work", path: "/work" },
  { label: "Services", path: "/services" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border/40">
      <nav className="flex items-center justify-between px-6 md:px-12 py-5">
        <Link to="/" onClick={() => window.scrollTo(0, 0)} className="font-display text-xl md:text-2xl font-light tracking-ultra-wide uppercase">
          Areej Ghazenfer
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => window.scrollTo(0, 0)}
              className={`font-body text-xs tracking-ultra-wide uppercase transition-colors duration-300 hover:text-primary ${
                location.pathname === link.path ? "text-primary" : "text-foreground/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://instagram.com/areej.instudio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 hover:text-primary transition-colors duration-300"
            aria-label="Instagram"
          >
            <Instagram size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/areej-ghazenfer/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 hover:text-primary transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border px-6 py-8 animate-fade-in">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => { setMobileOpen(false); window.scrollTo(0, 0); }}
                className={`font-body text-sm tracking-ultra-wide uppercase ${
                  location.pathname === link.path ? "text-primary" : "text-foreground/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://instagram.com/areej.instudio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 flex items-center gap-2 text-sm tracking-ultra-wide uppercase"
            >
              <Instagram size={16} /> Instagram
            </a>
            <a
              href="https://www.linkedin.com/in/areej-ghazenfer/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 flex items-center gap-2 text-sm tracking-ultra-wide uppercase"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
