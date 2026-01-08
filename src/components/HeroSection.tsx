import backgroundPattern from "@/assets/background-pattern.jpg";
import nosotrosImage from "@/assets/nosotros.png";
import fotosImage from "@/assets/fotos.png";
import paquetesImage from "@/assets/paquetes.png";
import contactoImage from "@/assets/contacto.png";
import calendarioImage from "@/assets/calendario.png";
import cotizaImage from "@/assets/cotiza-titulo.png";
import smilePaquetes from "@/assets/smile-paquetes.png";
import NavigationButton from "./NavigationButton";

const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-screen w-full overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundPattern})`,
        }}
      />

      {/* Content Overlay - Full Screen Grid */}
      <div className="relative z-10 min-h-screen w-full grid grid-cols-1 grid-rows-6 sm:grid-cols-2 sm:grid-rows-3 md:grid-cols-3 md:grid-rows-2 gap-2 sm:gap-4 p-2 sm:p-6 pt-20 sm:pt-28">
        {/* Row 1: Nosotros, Paquetes, Fotos */}
        <div className="flex items-center justify-center animate-fade-in-up-1">
          <NavigationButton
            to="#nosotros"
            image={nosotrosImage}
            alt="Nosotros"
            animationClass="float-animation"
            className="w-full max-w-[180px] sm:max-w-[280px] md:max-w-[80%]"
          />
        </div>

        <div className="flex items-end justify-start animate-fade-in-up-2 relative overflow-hidden">
          <img 
            src={smilePaquetes} 
            alt="Smile" 
            className="absolute top-1/2 -translate-y-1/2 right-0 w-32 h-32 md:w-48 md:h-48 z-10"
          />
          <NavigationButton
            to="#paquetes"
            image={paquetesImage}
            alt="Paquetes"
            animationClass="float-animation-delayed"
            className="w-full max-w-[180px] sm:max-w-[280px] md:max-w-[80%]"
          />
        </div>

        <div className="flex items-start justify-center animate-fade-in-up-3">
          <NavigationButton
            to="#fotos"
            image={fotosImage}
            alt="Fotos"
            animationClass="float-animation"
            className="w-full max-w-[180px] sm:max-w-[280px] md:max-w-[80%]"
          />
        </div>

        {/* Row 2: Calendario, Cotiza, Contacto */}
        <div className="flex items-start justify-center animate-fade-in-up-4">
          <NavigationButton
            to="#calendario"
            image={calendarioImage}
            alt="Calendario"
            animationClass="float-animation-delayed"
            className="w-full max-w-[180px] sm:max-w-[280px] md:max-w-[80%]"
          />
        </div>

        <div className="flex items-center justify-center animate-fade-in-up-5">
          <NavigationButton
            to="#cotiza"
            image={cotizaImage}
            alt="Cotiza"
            animationClass="float-animation"
            className="w-full max-w-[180px] sm:max-w-[280px] md:max-w-[80%]"
          />
        </div>

        <div className="flex items-start justify-start animate-fade-in-up-6">
          <NavigationButton
            to="#contacto"
            image={contactoImage}
            alt="Contacto"
            animationClass="float-animation-delayed"
            className="w-full max-w-[180px] sm:max-w-[280px] md:max-w-[80%]"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
