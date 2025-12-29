import { Facebook, Instagram } from "lucide-react";
import logo from "@/assets/rayuela-logo.png";
import menuIcon from "@/assets/menu-icon.png";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 bg-white/95 backdrop-blur-sm shadow-sm">
      {/* Menu icon */}
      <div>
        <img src={menuIcon} alt="Menu" className="h-8 w-auto cursor-pointer hover:scale-105 transition-transform" />
      </div>

      {/* Logo */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <img
          src={logo}
          alt="Rayuela"
          className="h-10 md:h-14 w-auto object-contain"
        />
      </div>

      {/* Social Icons */}
      <div className="flex items-center gap-4">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/70 hover:text-rayuela-orange transition-colors duration-300"
          aria-label="Facebook"
        >
          <Facebook size={22} />
        </a>
        <a
          href="https://pinterest.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/70 hover:text-rayuela-orange transition-colors duration-300"
          aria-label="Pinterest"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 12a4 4 0 1 0 8 0 4 4 0 1 0-8 0" />
            <path d="M12 2v4" />
            <path d="M12 18v4" />
            <path d="m4.93 4.93 2.83 2.83" />
            <path d="m16.24 16.24 2.83 2.83" />
            <path d="M2 12h4" />
            <path d="M18 12h4" />
            <path d="m4.93 19.07 2.83-2.83" />
            <path d="m16.24 7.76 2.83-2.83" />
          </svg>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/70 hover:text-rayuela-orange transition-colors duration-300"
          aria-label="Instagram"
        >
          <Instagram size={22} />
        </a>
      </div>
    </header>
  );
};

export default Header;
