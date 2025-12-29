import mascotasImage from "@/assets/mascotas-nosotros.png";
import tituloImage from "@/assets/nosotros-titulo.png";
import logo from "@/assets/rayuela-logo.png";

const NosotrosSection = () => {
  return (
    <section className="relative min-h-screen w-full bg-white overflow-hidden py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {/* Mascotas - Left Side */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
          <img 
            src={mascotasImage} 
            alt="Ela y Ray - Mascotas de Rayuela" 
            className="w-full max-w-md lg:max-w-lg object-contain animate-fade-in"
          />
        </div>

        {/* Content - Right Side */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end gap-6">
          {/* Título con imagen */}
          <div className="w-full max-w-md">
            <img 
              src={tituloImage} 
              alt="Nosotros" 
              className="w-full max-w-[280px] md:max-w-[350px] object-contain"
            />
          </div>

          {/* Card con texto */}
          <div className="bg-rayuela-pink/40 p-6 md:p-8 rounded-sm max-w-md">
            <p className="text-foreground/80 text-sm md:text-base leading-relaxed uppercase tracking-wide text-center lg:text-right">
              ¡Hola, nosotros somos Ela y Ray y juntos celebraremos momentos mágicos! En Rayuela te ofrecemos un espacio divertido y seguro para tus fiestas. Contamos con áreas de juego, decoración temática y servicios personalizados para que tu evento sea inolvidable.
            </p>
            <p className="text-foreground/80 text-sm md:text-base leading-relaxed uppercase tracking-wide text-center lg:text-right mt-4">
              ¿Listo para la diversión? Contáctanos y reserva tu fecha hoy mismo.
            </p>

            {/* Logo y slogan */}
            <div className="mt-6 flex flex-col items-center">
              <img 
                src={logo} 
                alt="Rayuela" 
                className="h-12 md:h-16 w-auto object-contain"
              />
              <p className="text-foreground/70 text-xs md:text-sm mt-2 text-center italic">
                El lugar donde tus sueños se hacen fiesta!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NosotrosSection;
