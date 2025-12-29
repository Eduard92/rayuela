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

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20 pb-8">
        <div className="w-full max-w-6xl mx-auto">
          {/* Navigation Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 items-center justify-items-center">
            {/* Nosotros - Top Left */}
            <div className="justify-self-start md:justify-self-center animate-fade-in-up-1">
              <NavigationButton
                to="/nosotros"
                image={nosotrosImage}
                alt="Nosotros"
                animationClass="float-animation"
              />
            </div>

            {/* Smile - Center Top (hidden on mobile, spans middle) */}
            <div className="hidden md:flex justify-center items-center animate-fade-in-up-2">
              <img
                src={smileImage}
                alt="Smile"
                className="w-32 lg:w-40 h-auto object-contain wiggle-animation"
              />
            </div>

            {/* Fotos - Top Right */}
            <div className="justify-self-end md:justify-self-center animate-fade-in-up-3">
              <NavigationButton
                to="/fotos"
                image={fotosImage}
                alt="Fotos"
                animationClass="float-animation-delayed"
              />
            </div>

            {/* Calendario - Middle Left */}
            <div className="justify-self-start md:justify-self-center animate-fade-in-up-4">
              <NavigationButton
                to="/calendario"
                image={calendarioImage}
                alt="Calendario"
                animationClass="float-animation-delayed"
              />
            </div>

            {/* Paquetes - Center */}
            <div className="flex justify-center items-center animate-fade-in-up-5">
              <NavigationButton
                to="/paquetes"
                image={paquetesImage}
                alt="Paquetes"
                animationClass="float-animation"
              />
            </div>

            {/* Contacto - Middle Right */}
            <div className="justify-self-end md:justify-self-center animate-fade-in-up-6">
              <NavigationButton
                to="/contacto"
                image={contactoImage}
                alt="Contacto"
                animationClass="float-animation"
              />
            </div>

            {/* Cotiza - Bottom Center (spans full width on mobile) */}
            <div className="col-span-2 md:col-span-3 flex justify-center mt-4 animate-fade-in-up-7">
              <NavigationButton
                to="/cotiza"
                image={cotizaImage}
                alt="Cotiza"
                animationClass="float-animation-delayed"
              />
            </div>
          </div>

          {/* Mobile Smile */}
          <div className="md:hidden flex justify-center mt-8 animate-fade-in-up">
            <img
              src={smileImage}
              alt="Smile"
              className="w-24 h-auto object-contain wiggle-animation"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
