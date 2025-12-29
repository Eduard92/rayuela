import mascotasImage from "@/assets/mascotas-nosotros.png";
import tituloImage from "@/assets/nosotros-titulo.png";
import logo from "@/assets/rayuela-logo.png";
import backgroundNosotros from "@/assets/background-nosotros.jpg";

const NosotrosSection = () => {
  return (
    <section 
      className="relative min-h-screen w-full overflow-hidden px-6 md:px-12"
      style={{ backgroundImage: `url(${backgroundNosotros})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Título - Top Right */}
      <div className="absolute top-8 right-6 md:right-12">
        <img 
          src={tituloImage} 
          alt="Nosotros" 
          className="w-[200px] md:w-[300px] lg:w-[350px] object-contain"
        />
      </div>

      {/* Content - Bottom */}
      <div className="absolute bottom-4 left-6 right-6 md:left-12 md:right-12 top-20 flex flex-col lg:flex-row items-center gap-2 lg:gap-12">
        {/* Mascotas - Left Side */}
        <div className="w-full lg:w-3/5 flex justify-center lg:justify-start">
          <img 
            src={mascotasImage} 
            alt="Ela y Ray - Mascotas de Rayuela" 
            className="h-[35vh] lg:h-[70vh] w-auto object-contain animate-fade-in"
          />
        </div>

        {/* Content - Right Side */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-6">

          {/* Card con texto */}
          <div 
            className="bg-rayuela-pink/50 p-8 md:p-12 max-w-xl overflow-hidden"
            style={{ clipPath: 'polygon(4% 0, 100% 0, 96% 100%, 0% 100%)' }}
          >
            <p className="text-foreground/80 text-sm md:text-base leading-relaxed uppercase tracking-wide text-center">
              ¡Hola, nosotros somos Ela y Ray y juntos celebraremos momentos mágicos! En Rayuela te ofrecemos un espacio divertido y seguro para tus fiestas. Contamos con áreas de juego, decoración temática y servicios personalizados para que tu evento sea inolvidable.
            </p>
            <p className="text-foreground/80 text-sm md:text-base leading-relaxed uppercase tracking-wide text-center mt-4">
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
