import backgroundPattern from "@/assets/background-pattern.jpg";
import smileImage from "@/assets/smile.png";
import nosotrosImage from "@/assets/nosotros.png";
import fotosImage from "@/assets/fotos.png";
import paquetesImage from "@/assets/paquetes.png";
import contactoImage from "@/assets/contacto.png";
import calendarioImage from "@/assets/calendario.png";
import cotizaImage from "@/assets/cotiza.png";
import NavigationButton from "./NavigationButton";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundPattern})`,
        }}
      />

      {/* Content Overlay - Full Screen Grid */}
      <div className="relative z-10 min-h-screen w-full grid grid-cols-3 grid-rows-2 gap-2 p-4 pt-24">
        {/* Row 1: Nosotros, Fotos, Calendario */}
        <div className="flex items-center justify-center animate-fade-in-up-1">
          <NavigationButton
            to="/nosotros"
            image={nosotrosImage}
            alt="Nosotros"
            animationClass="float-animation"
            className="w-full max-w-[280px]"
          />
        </div>

        <div className="flex items-center justify-center animate-fade-in-up-2">
          <NavigationButton
            to="/fotos"
            image={fotosImage}
            alt="Fotos"
            animationClass="float-animation-delayed"
            className="w-full max-w-[280px]"
          />
        </div>

        <div className="flex items-center justify-center animate-fade-in-up-3">
          <NavigationButton
            to="/calendario"
            image={calendarioImage}
            alt="Calendario"
            animationClass="float-animation"
            className="w-full max-w-[280px]"
          />
        </div>

        {/* Row 2: Paquetes (con Smile), Cotiza, Contacto */}
        <div className="relative flex items-center justify-center animate-fade-in-up-4">
          {/* Smile overlapping Paquetes - top right */}
          <img
            src={smileImage}
            alt="Smile"
            className="absolute -top-8 -right-4 md:top-0 md:right-0 w-20 md:w-28 lg:w-32 h-auto object-contain wiggle-animation z-20"
          />
          <NavigationButton
            to="/paquetes"
            image={paquetesImage}
            alt="Paquetes"
            animationClass="float-animation-delayed"
            className="w-full max-w-[280px]"
          />
        </div>

        <div className="flex items-center justify-center animate-fade-in-up-5">
          <NavigationButton
            to="/cotiza"
            image={cotizaImage}
            alt="Cotiza"
            animationClass="float-animation"
            className="w-full max-w-[280px]"
          />
        </div>

        <div className="flex items-center justify-center animate-fade-in-up-6">
          <NavigationButton
            to="/contacto"
            image={contactoImage}
            alt="Contacto"
            animationClass="float-animation-delayed"
            className="w-full max-w-[280px]"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
