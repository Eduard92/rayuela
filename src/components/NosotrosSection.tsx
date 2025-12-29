import mascotasImage from "@/assets/mascotas-nosotros.png";
import tituloImage from "@/assets/nosotros-titulo.png";
import logo from "@/assets/rayuela-logo.png";
import backgroundNosotros from "@/assets/background-nosotros.jpg";

const NosotrosSection = () => {
  return (
    <section 
      className="relative min-h-screen w-full overflow-hidden px-6 md:px-12 flex flex-col"
      style={{ backgroundImage: `url(${backgroundNosotros})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Título - Top Right */}
      <div className="flex justify-end pt-8">
        <img 
          src={tituloImage} 
          alt="Nosotros" 
          className="w-[200px] md:w-[300px] lg:w-[350px] object-contain"
        />
      </div>

      {/* Content - Fill remaining space */}
      <div className="flex-1 flex flex-col lg:flex-row items-end justify-between pb-8 gap-4 lg:gap-8">
        {/* Mascotas - Left Side */}
        <div className="flex-1 flex justify-center lg:justify-start items-end">
          <img 
            src={mascotasImage} 
            alt="Ela y Ray - Mascotas de Rayuela" 
            className="h-[45vh] md:h-[55vh] lg:h-[75vh] w-auto object-contain animate-fade-in"
          />
        </div>

        {/* Content - Right Side */}
        <div className="flex flex-col items-center lg:items-end justify-end">

          {/* Card con texto */}
          <div 
            className="bg-rayuela-pink/50 p-8 md:p-10 max-w-md overflow-hidden"
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
