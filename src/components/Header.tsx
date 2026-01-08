import { useState } from "react";
import { X } from "lucide-react";
import logo from "@/assets/rayuela-logo.png";
import menuIcon from "@/assets/menu-icon.png";
import instagramIcon from "@/assets/instagram-icon.png";
import facebookIcon from "@/assets/facebook-icon.png";

// Importar imágenes de títulos
import cotizaTitulo from "@/assets/cotiza-titulo.png";
import nosotrosTitulo from "@/assets/nosotros-titulo.png";
import paquetesTitulo from "@/assets/paquetes-encabezado.png";
import calendarioTitulo from "@/assets/calendario-titulo.png";
import fotosTitulo from "@/assets/fotos-titulo.png";
import contactoTitulo from "@/assets/contacto-titulo.png";

const menuItems = [
  { label: "Cotiza", href: "#cotiza", img: cotizaTitulo, position: "top-left" },
  { label: "Nosotros", href: "#nosotros", img: nosotrosTitulo, position: "top-right" },
  { label: "Paquetes", href: "#paquetes", img: paquetesTitulo, position: "middle-left" },
  { label: "Calendario", href: "#calendario", img: calendarioTitulo, position: "middle-right" },
  { label: "Fotos", href: "#fotos", img: fotosTitulo, position: "bottom-left" },
  { label: "Contacto", href: "#contacto", img: contactoTitulo, position: "bottom-right" },
];

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

      {/* Menu Overlay con tablero de colores */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-start justify-start pt-20 pl-4 md:pt-24 md:pl-8">
          {/* Botón cerrar */}
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 text-white hover:scale-110 transition-transform z-10"
            aria-label="Cerrar menú"
          >
            <X size={32} />
          </button>
          
          {/* Tablero de menú */}
          <div className="grid grid-cols-2 grid-rows-3 w-[300px] md:w-[400px] aspect-[2/3] shadow-2xl animate-scale-in">
            {/* Fila 1 */}
            <div className="bg-[#e8b4d4] relative flex items-center justify-center">
              <button
                onClick={() => handleMenuClick("#cotiza")}
                className="absolute inset-0 flex items-center justify-center hover:scale-105 transition-transform"
              >
                <img 
                  src={cotizaTitulo} 
                  alt="Cotiza" 
                  className="w-[80%] h-auto transform -rotate-3 hover:rotate-0 transition-transform"
                />
              </button>
            </div>
            <div className="bg-[#f5a849] relative flex items-center justify-center">
              <button
                onClick={() => handleMenuClick("#nosotros")}
                className="absolute inset-0 flex items-center justify-center hover:scale-105 transition-transform"
              >
                <img 
                  src={nosotrosTitulo} 
                  alt="Nosotros" 
                  className="w-[80%] h-auto transform rotate-2 hover:rotate-0 transition-transform"
                />
              </button>
            </div>
            
            {/* Fila 2 */}
            <div className="bg-[#7eb0c4] relative flex items-center justify-center">
              <button
                onClick={() => handleMenuClick("#paquetes")}
                className="absolute inset-0 flex items-center justify-center hover:scale-105 transition-transform"
              >
                <img 
                  src={paquetesTitulo} 
                  alt="Paquetes" 
                  className="w-[80%] h-auto transform rotate-1 hover:rotate-0 transition-transform"
                />
              </button>
            </div>
            <div className="bg-[#a5a145] relative flex items-center justify-center">
              <button
                onClick={() => handleMenuClick("#calendario")}
                className="absolute inset-0 flex items-center justify-center hover:scale-105 transition-transform"
              >
                <img 
                  src={calendarioTitulo} 
                  alt="Calendario" 
                  className="w-[80%] h-auto transform -rotate-2 hover:rotate-0 transition-transform"
                />
              </button>
            </div>
            
            {/* Fila 3 */}
            <div className="bg-[#e07c4f] relative flex items-center justify-center">
              <button
                onClick={() => handleMenuClick("#fotos")}
                className="absolute inset-0 flex items-center justify-center hover:scale-105 transition-transform"
              >
                <img 
                  src={fotosTitulo} 
                  alt="Fotos" 
                  className="w-[80%] h-auto transform rotate-3 hover:rotate-0 transition-transform"
                />
              </button>
            </div>
            <div className="bg-[#e8b4d4] relative flex items-center justify-center">
              <button
                onClick={() => handleMenuClick("#contacto")}
                className="absolute inset-0 flex items-center justify-center hover:scale-105 transition-transform"
              >
                <img 
                  src={contactoTitulo} 
                  alt="Contacto" 
                  className="w-[80%] h-auto transform -rotate-1 hover:rotate-0 transition-transform"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
