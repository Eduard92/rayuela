import { useState } from "react";
import { X } from "lucide-react";
import logo from "@/assets/rayuela-logo.png";
import menuIcon from "@/assets/menu-icon.png";
import instagramIcon from "@/assets/instagram-icon.png";
import facebookIcon from "@/assets/facebook-icon.png";

const menuItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Paquetes", href: "#paquetes" },
  { label: "Fotos", href: "#fotos" },
  { label: "Calendario", href: "#calendario" },
  { label: "Cotiza", href: "#cotiza" },
  { label: "Contacto", href: "#contacto" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 bg-white/95 backdrop-blur-sm shadow-sm">
        {/* Menu icon */}
        <div>
          <img 
            src={menuIcon} 
            alt="Menu" 
            className="h-8 w-auto cursor-pointer hover:scale-105 transition-transform" 
            onClick={() => setIsMenuOpen(true)}
          />
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
            className="hover:scale-110 transition-transform duration-300"
            aria-label="Facebook"
          >
            <img src={facebookIcon} alt="Facebook" className="h-6 w-auto" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-300"
            aria-label="Instagram"
          >
            <img src={instagramIcon} alt="Instagram" className="h-6 w-auto" />
          </a>
        </div>
      </header>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white/98 backdrop-blur-md flex flex-col items-center justify-center">
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 text-rayuela-pink hover:scale-110 transition-transform"
            aria-label="Cerrar menú"
          >
            <X size={32} />
          </button>
          
          <nav className="flex flex-col items-center gap-6">
            {menuItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleMenuClick(item.href)}
                className="text-2xl md:text-3xl font-semibold text-rayuela-pink hover:text-rayuela-orange transition-colors uppercase tracking-wide"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
