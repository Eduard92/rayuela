import { useEffect, useRef, useState } from "react";
import mascotasImage from "@/assets/mascotas-nosotros.png";
import tituloImage from "@/assets/nosotros-titulo.png";
import logo from "@/assets/rayuela-logo.png";
import backgroundNosotros from "@/assets/background-nosotros.jpg";
const NosotrosSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  return (
    <section
      id="nosotros"
      ref={sectionRef}
      className="relative w-full overflow-hidden px-4 md:px-12 pt-24 pb-10 lg:min-h-screen lg:pt-0 lg:pb-0"
      style={{ backgroundImage: `url(${backgroundNosotros})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Título - Top Right */}
      <div className="absolute top-6 right-4 md:right-12 z-10">
        <img src={tituloImage} alt="Nosotros" className="w-[160px] md:w-[300px] lg:w-[350px] object-contain" />
      </div>
      {/* Content */}
      <div className="flex flex-col lg:absolute lg:bottom-4 lg:left-12 lg:right-12 lg:top-20 lg:flex-row items-center gap-6 lg:gap-12">
        {/* Mascotas - Left Side */}
        <div className="w-full lg:w-3/5 flex justify-center lg:justify-start">
          <img
            src={mascotasImage}
            alt="Ela y Ray - Mascotas de Rayuela"
            className={`h-[35vh] lg:h-[70vh] w-auto object-contain transition-transform mascotas-slide ${
              isVisible ? "scale-105" : "scale-100"
            }`}
          />
        </div>
        {/* Content - Right Side */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-6">
          {/* Card con texto */}
          <div
            className="bg-white/80 p-6 md:p-12 mx-2 md:mx-0 w-full max-w-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:brightness-110 hover:drop-shadow-xl"
            style={{ clipPath: "polygon(4% 0, 100% 0, 96% 100%, 0% 100%)" }}
          >
            <p className="text-center text-base sm:text-lg md:text-xl text-rayuela-blue font-medium leading-relaxed uppercase">
              ¡ Hola, nosotros somos Ela y Ra y juntos celebraremos momentos mágicos !
              <br/>
              En Rayuela te ofrecemos un espacio divertido y seguro para tus fiestas.
              <br/> Contamos con áreas de juego, decoración temática y servicios personalizados para que tu evento sea inolvidable.
            </p>
            <p className="text-center text-base sm:text-lg md:text-xl text-rayuela-blue font-medium leading-relaxed uppercase mt-4">
              ¿Listo para la diversión? Contáctanos y reserva tu fecha hoy mismo.
            </p>
            {/* Logo y slogan */}
            <div className="mt-6 flex flex-col items-center">
              <img src={logo} alt="Rayuela" className="h-12 md:h-16 w-auto object-contain" />
              <p className="text-xs md:text-sm mt-2 text-center font-medium uppercase" style={{ color: '#76B3D0' }}>
                ! El lugar donde tus sueños se hacen fiesta !
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default NosotrosSection;
