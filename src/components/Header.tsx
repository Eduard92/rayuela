import { useState } from "react";
import { X } from "lucide-react";
import logo from "@/assets/rayuela-logo.png";
import menuIcon from "@/assets/menu-icon.png";
import instagramIcon from "@/assets/instagram-icon.png";
import facebookIcon from "@/assets/facebook-icon.png";

// Imágenes del menú modal
import modalBackground from "@/assets/menu/modal_background.png";
import cotizaModal from "@/assets/menu/cotiza_modal.png";
import nosotrosModal from "@/assets/menu/nosotros_modal.png";
import paquetesModal from "@/assets/menu/paquetes_modal.png";
import calendarioModal from "@/assets/menu/calendario_modal.png";
import fotosModal from "@/assets/menu/fotos_modal.png";
import contactoModal from "@/assets/menu/contacto_modal.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = (href: string) => {
    setIsMenuOpen(false);
    
    setTimeout(() => {
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
    }, 100);
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
            className="h-10 md:h-14 w-auto object-contain cursor-pointer hover:scale-105 transition-transform"
            onClick={() => handleMenuClick("#inicio")}
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
        <div 
          className="fixed inset-0 z-[999] flex items-start justify-start"
          style={{ background: "rgb(179 175 175 / 80%)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsMenuOpen(false);
          }}
        >
          {/* Botón cerrar */}
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 text-white hover:scale-110 transition-transform z-10"
            aria-label="Cerrar menú"
          >
            <X size={32} />
          </button>
          
          {/* Tablero del menú */}
          <div 
            className="grid grid-cols-2 grid-rows-3 mt-[5rem] md:mt-[10rem] ml-[1rem] md:ml-[5rem] w-[360px] md:w-[500px] h-[440px] md:h-[610px] justify-items-center items-center animate-scale-in"
            style={{
              backgroundImage: `url(${modalBackground})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Cotiza */}
            <div className="flex items-center justify-center">
              <a 
                href="#cotiza" 
                onClick={(e) => { e.preventDefault(); handleMenuClick("#cotiza"); }}
                className="hover:scale-110 transition-transform"
              >
                <img 
                  src={cotizaModal} 
                  alt="Cotiza" 
                  className="relative -right-[20px] -bottom-[21px] md:-right-[20px] md:-bottom-[21px]"
                />
              </a>
            </div>
            
            {/* Nosotros */}
            <div className="flex items-center justify-center">
              <a 
                href="#nosotros" 
                onClick={(e) => { e.preventDefault(); handleMenuClick("#nosotros"); }}
                className="hover:scale-110 transition-transform"
              >
                <img 
                  src={nosotrosModal} 
                  alt="Nosotros" 
                  className="relative -left-[18px] -bottom-[8px] md:-left-[18px] md:-bottom-[8px]"
                />
              </a>
            </div>
            
            {/* Paquetes */}
            <div className="flex items-center justify-center">
              <a 
                href="#paquetes" 
                onClick={(e) => { e.preventDefault(); handleMenuClick("#paquetes"); }}
                className="hover:scale-110 transition-transform"
              >
                <img 
                  src={paquetesModal} 
                  alt="Paquetes" 
                  className="relative -right-[2px] -bottom-[3px] md:-right-[2px] md:-bottom-[3px]"
                />
              </a>
            </div>
            
            {/* Calendario */}
            <div className="flex items-center justify-center">
              <a 
                href="#calendario" 
                onClick={(e) => { e.preventDefault(); handleMenuClick("#calendario"); }}
                className="hover:scale-110 transition-transform"
              >
                <img 
                  src={calendarioModal} 
                  alt="Calendario" 
                  className="relative -left-[20px] md:-left-[20px]"
                />
              </a>
            </div>
            
            {/* Fotos */}
            <div className="flex items-center justify-center">
              <a 
                href="#fotos" 
                onClick={(e) => { e.preventDefault(); handleMenuClick("#fotos"); }}
                className="hover:scale-110 transition-transform"
              >
                <img 
                  src={fotosModal} 
                  alt="Fotos" 
                  className="relative -right-[20px] -bottom-[21px] md:-right-[20px] md:-bottom-[21px]"
                />
              </a>
            </div>
            
            {/* Contacto */}
            <div className="flex items-center justify-center">
              <a 
                href="#contacto" 
                onClick={(e) => { e.preventDefault(); handleMenuClick("#contacto"); }}
                className="hover:scale-110 transition-transform"
              >
                <img 
                  src={contactoModal} 
                  alt="Contacto" 
                  className="relative -left-[20px] md:-left-[20px]"
                />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
